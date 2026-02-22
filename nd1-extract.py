#!/usr/bin/env python3
"""
Nancy Drew 1: Secrets Can Kill - CifTree.dat Extractor
Uses ShimmerFairy's V1 format spec (38-byte entries, no extra header bytes)
Converts PLAIN files (headerless RGB555 TGA) -> PNG
"""

import struct, os, sys
from PIL import Image

CIFTREE = './CifTree.dat'
OUT_DIR = './nd1_extracted'
IMG_DIR = './nd1_images'

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

print(f"CifTree.dat: {len(data):,} bytes")

# V1 header: 0x1E bytes, then 2048 bytes padding, then index
magic        = data[0x00:0x14].rstrip(b'\x00').decode()
version_byte = data[0x14:0x1C].hex()
num_entries  = struct.unpack('<H', data[0x1C:0x1E])[0]

print(f"Magic:    '{magic}'")
print(f"Version:  {version_byte}")
print(f"Entries:  {num_entries}")

INDEX_START = 0x1E + 2048   # 0x81E
ENTRY_SIZE  = 38             # 0x26

plain_count = 0
data_count  = 0
errors      = 0

print()
print(f"{'#':4s} {'Name':12s} {'Type':6s} {'W':5s} {'H':5s} {'CompSz':9s} {'DecompSz':9s}  Result")
print("─" * 75)

for i in range(num_entries):
    base  = INDEX_START + i * ENTRY_SIZE
    entry = data[base:base + ENTRY_SIZE]

    name      = entry[0x00:0x09].rstrip(b'\x00').decode('ascii', errors='replace')
    width     = struct.unpack('<H', entry[0x0B:0x0D])[0]
    height    = struct.unpack('<H', entry[0x0F:0x11])[0]
    bpp       = entry[0x11]
    offset    = struct.unpack('<I', entry[0x13:0x17])[0]
    decomp_sz = struct.unpack('<I', entry[0x17:0x1B])[0]
    comp_sz   = struct.unpack('<I', entry[0x1F:0x23])[0]
    ftype     = entry[0x23]

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

    # Convert PLAIN files to PNG
    if ftype == 0x02 and width > 0 and height > 0:
        plain_count += 1
        expected_pixels = width * height * 2
        if len(decompressed) >= expected_pixels:
            img = rgb555_to_image(decompressed, width, height)
            png_path = os.path.join(IMG_DIR, name + '.png')
            img.save(png_path)
            result += f"  → PNG {width}×{height}"
        else:
            result += f"  ⚠ short ({len(decompressed)} < {expected_pixels})"
    elif ftype == 0x03:
        data_count += 1
        result += "  (DATA)"

    print(f"{i:4d} {name:12s} {type_str:6s} {width:5d} {height:5d} {comp_sz:9,} {decomp_sz:9,}  {result}")

print()
print(f"Done: {plain_count} images, {data_count} data files, {errors} errors")
print(f"PNGs → {IMG_DIR}/")
