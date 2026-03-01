#!/usr/bin/env python3
"""
Nancy Drew 2: Stay Tuned for Danger - CifTree.dat Extractor
V2 format (70-byte entries) — same encryption, LZSS, and RGB555 as ND1.
Converts PLAIN files (headerless RGB555 TGA) -> PNG
"""

import struct, os, sys
from PIL import Image

CIFTREE = './StayTunedForDanger/CD/Game/CIFTREE.DAT'
OUT_DIR = './StayTunedForDanger/stfd_extracted'
IMG_DIR = './StayTunedForDanger/stfd_images'

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(IMG_DIR, exist_ok=True)

# ── LZSS decompressor ──────────────────────────────────────────────────────
def lzss_decompress(data, expected_size=None):
    WINDOW = 0x1000
    buf = bytearray(b'\x20' * WINDOW)
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
                b1, b2 = data[i], data[i+1]; i += 2
                ref = b1 | ((b2 & 0xF0) << 4)
                length = (b2 & 0x0F) + 3
                for _ in range(length):
                    byte = buf[ref & 0xFFF]
                    out.append(byte); buf[pos] = byte
                    pos = (pos + 1) & 0xFFF
                    ref += 1
            if expected_size and len(out) >= expected_size:
                return bytes(out)
    return bytes(out)

# ── Decrypt: subtract position ─────────────────────────────────────────────
def decrypt(data):
    return bytes((b - i) & 0xFF for i, b in enumerate(data))

# ── RGB555 -> PIL Image ────────────────────────────────────────────────────
def rgb555_to_image(data, width, height):
    img = Image.new('RGB', (width, height))
    pixels = []
    for i in range(0, min(len(data), width * height * 2), 2):
        if i + 1 >= len(data):
            pixels.append((0, 0, 0))
            continue
        word = data[i] | (data[i+1] << 8)
        r = ((word >> 10) & 0x1F) << 3
        g = ((word >>  5) & 0x1F) << 3
        b = ( word        & 0x1F) << 3
        pixels.append((r, g, b))
    # pad if short
    while len(pixels) < width * height:
        pixels.append((0, 0, 0))
    img.putdata(pixels)
    return img

# ── Parse archive ──────────────────────────────────────────────────────────
with open(CIFTREE, 'rb') as f:
    data = f.read()

print(f"CIFTREE.DAT: {len(data):,} bytes")

# V2 header: same 0x1E-byte header, then 2048 bytes padding, then index at 0x820
magic        = data[0x00:0x14].rstrip(b'\x00').decode()
version_byte = data[0x14:0x1C].hex()
num_entries  = struct.unpack('<H', data[0x1C:0x1E])[0]

print(f"Magic:    '{magic}'")
print(f"Version:  {version_byte}")
print(f"Entries:  {num_entries}")

INDEX_START = 0x820    # 0x1E + 2 + 2048 padding
ENTRY_SIZE  = 70       # 0x46 — V2 format

plain_count = 0
data_count  = 0
errors      = 0

print()
print(f"{'#':4s} {'Name':12s} {'Type':6s} {'W':5s} {'H':5s} {'CompSz':9s} {'DecompSz':9s}  Result")
print("─" * 75)

for i in range(num_entries):
    base  = INDEX_START + i * ENTRY_SIZE
    entry = data[base:base + ENTRY_SIZE]

    # V2 field layout (70 bytes):
    #   [0:9]    name (9 bytes, null-terminated)
    #   [9:11]   index (u16 LE)
    #   [19:21]  width (u16 LE)
    #   [23:25]  height (u16 LE)
    #   [49]     bpp (u8)
    #   [51:55]  offset (u32 LE)
    #   [55:59]  decomp_sz (u32 LE)
    #   [63:67]  comp_sz (u32 LE)
    #   [67]     type (u8: 0x02=PLAIN, 0x03=DATA)
    name      = entry[0x00:0x09].rstrip(b'\x00').decode('ascii', errors='replace').lower()
    width     = struct.unpack('<H', entry[19:21])[0]
    height    = struct.unpack('<H', entry[23:25])[0]
    bpp       = entry[49]
    offset    = struct.unpack('<I', entry[51:55])[0]
    decomp_sz = struct.unpack('<I', entry[55:59])[0]
    comp_sz   = struct.unpack('<I', entry[63:67])[0]
    ftype     = entry[67]

    type_str  = "PLAIN" if ftype == 0x02 else "DATA" if ftype == 0x03 else f"0x{ftype:02x}"

    if offset == 0 or comp_sz == 0 or offset + comp_sz > len(data):
        print(f"{i:4d} {name:12s} {type_str:6s} {width:5d} {height:5d} {comp_sz:9,} {decomp_sz:9,}  SKIP (bad offset)")
        continue

    # Extract and decrypt
    raw       = data[offset:offset + comp_sz]
    decrypted = decrypt(raw)

    # Decompress
    try:
        decompressed = lzss_decompress(decrypted, decomp_sz)
    except Exception as e:
        print(f"{i:4d} {name:12s} {type_str:6s} {width:5d} {height:5d} {comp_sz:9,} {decomp_sz:9,}  ERROR: {e}")
        errors += 1
        continue

    # Save raw bin
    bin_path = os.path.join(OUT_DIR, name + '.bin')
    with open(bin_path, 'wb') as f:
        f.write(decompressed)

    result = f"→ {len(decompressed):,} bytes"

    # Convert PLAIN files to PNG (width/height are stored as max coords, so add 1)
    if ftype == 0x02 and width > 0 and height > 0:
        plain_count += 1
        actual_w = width + 1
        actual_h = height + 1
        expected_pixels = actual_w * actual_h * 2
        if len(decompressed) >= expected_pixels:
            img = rgb555_to_image(decompressed, actual_w, actual_h)
            png_path = os.path.join(IMG_DIR, name + '.png')
            img.save(png_path)
            result += f"  → PNG {actual_w}×{actual_h}"
        else:
            result += f"  ⚠ short ({len(decompressed)} < {expected_pixels})"
    elif ftype == 0x03:
        data_count += 1
        result += "  (DATA)"

    print(f"{i:4d} {name:12s} {type_str:6s} {width:5d} {height:5d} {comp_sz:9,} {decomp_sz:9,}  {result}")

print()
print(f"Done: {plain_count} images, {data_count} data files, {errors} errors")
print(f"PNGs → {IMG_DIR}/")
