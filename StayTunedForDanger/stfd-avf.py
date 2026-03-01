#!/usr/bin/env python3
"""
Nancy Drew 2: Stay Tuned for Danger — AVF Video Decoder
Decodes AVF animation files (background scenes, conversation videos).
Same format as ND1 — "AVF WayneSikes" magic, positional decrypt, LZSS, RGB555.
"""

import struct, os, sys, glob
from PIL import Image

# ── LZSS decompressor ────────────────────────────────────────────────────
def lzss_decompress(data):
    buf = bytearray(b'\x20' * 0x1000)
    pos = 0xFEE
    out = bytearray()
    i = 0
    while i < len(data):
        flags = data[i]; i += 1
        for bit in range(8):
            if i >= len(data):
                break
            if flags & (1 << bit):
                out.append(data[i]); buf[pos] = data[i]
                pos = (pos + 1) & 0xFFF; i += 1
            else:
                if i + 1 >= len(data):
                    break
                b1, b2 = data[i], data[i + 1]; i += 2
                ref = b1 | ((b2 & 0xF0) << 4)
                length = (b2 & 0x0F) + 3
                for _ in range(length):
                    byte = buf[ref & 0xFFF]
                    out.append(byte); buf[pos] = byte
                    pos = (pos + 1) & 0xFFF
                    ref += 1
    return bytes(out)

# ── Positional decrypt ───────────────────────────────────────────────────
def decrypt(data):
    return bytes((b - i) & 0xFF for i, b in enumerate(data))

# ── RGB555 → PIL Image ──────────────────────────────────────────────────
def rgb555_to_image(data, width, height):
    img = Image.new('RGB', (width, height))
    pixels = []
    for i in range(0, min(len(data), width * height * 2), 2):
        if i + 1 >= len(data):
            pixels.append((0, 0, 0))
            continue
        word = data[i] | (data[i + 1] << 8)
        r = ((word >> 10) & 0x1F) << 3
        g = ((word >>  5) & 0x1F) << 3
        b = ( word        & 0x1F) << 3
        pixels.append((r, g, b))
    while len(pixels) < width * height:
        pixels.append((0, 0, 0))
    img.putdata(pixels)
    return img

# ── AVF decoder ─────────────────────────────────────────────────────────
def decode_avf(filepath):
    """Decode an AVF file, return dict with metadata + list of PIL Images."""
    with open(filepath, 'rb') as f:
        data = f.read()

    magic = data[0:0x0F]
    if magic != b'AVF WayneSikes\x00':
        raise ValueError(f"Bad AVF magic: {magic!r}")

    num_entries = struct.unpack_from('<H', data, 0x15)[0]
    width       = struct.unpack_from('<H', data, 0x17)[0]
    height      = struct.unpack_from('<H', data, 0x19)[0]

    entries = []
    for i in range(num_entries):
        base = 0x21 + i * 19
        frame_no = struct.unpack_from('<H', data, base)[0]
        offset   = struct.unpack_from('<I', data, base + 2)[0]
        length   = struct.unpack_from('<I', data, base + 6)[0]
        unk      = struct.unpack_from('<I', data, base + 10)[0]
        entries.append({
            'frame_no': frame_no,
            'offset': offset,
            'length': length,
            'unk': unk,
        })

    max_frame = max(e['frame_no'] for e in entries) if entries else 0
    frames = [None] * (max_frame + 1)
    for entry in entries:
        raw = data[entry['offset']:entry['offset'] + entry['length']]
        decrypted = decrypt(raw)
        decompressed = lzss_decompress(decrypted)
        img = rgb555_to_image(decompressed, width, height)
        frames[entry['frame_no']] = img

    return {
        'width': width,
        'height': height,
        'num_frames': num_entries,
        'entries': entries,
        'frames': frames,
    }

# ── Main ────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    if len(sys.argv) < 2:
        target = './StayTunedForDanger/CD/CDVideo'
        out_dir = './StayTunedForDanger/stfd_avf_frames'
        print(f"No args — using default: {target} → {out_dir}")
    else:
        target = sys.argv[1]
        out_dir = sys.argv[2] if len(sys.argv) > 2 else './StayTunedForDanger/stfd_avf_frames'

    # Collect AVF files
    avf_files = []
    if os.path.isdir(target):
        for ext in ('*.avf', '*.AVF', '*.bin'):
            for path in glob.glob(os.path.join(target, ext)):
                with open(path, 'rb') as f:
                    magic = f.read(15)
                if magic == b'AVF WayneSikes\x00':
                    avf_files.append(path)
    elif os.path.isfile(target):
        avf_files.append(target)

    if not avf_files:
        print(f"No AVF files found in: {target}")
        sys.exit(1)

    os.makedirs(out_dir, exist_ok=True)

    total_frames = 0
    for avf_path in sorted(avf_files):
        name = os.path.splitext(os.path.basename(avf_path))[0].lower()
        try:
            avf = decode_avf(avf_path)
            print(f"{name}: {avf['width']}×{avf['height']}, {avf['num_frames']} frames")

            for i, frame in enumerate(avf['frames']):
                if frame is None:
                    continue
                png_path = os.path.join(out_dir, f"{name}_{i:03d}.png")
                frame.save(png_path)
                total_frames += 1

            if avf['num_frames'] > 1:
                valid = [f for f in avf['frames'] if f is not None]
                if len(valid) > 1:
                    gif_path = os.path.join(out_dir, f"{name}.gif")
                    valid[0].save(
                        gif_path,
                        save_all=True,
                        append_images=valid[1:],
                        duration=100,
                        loop=1,
                    )
                    print(f"  → GIF: {gif_path} ({len(valid)} frames)")

        except Exception as e:
            print(f"{name}: ERROR — {e}")

    print(f"\nDone: {len(avf_files)} AVF files, {total_frames} frames → {out_dir}/")
