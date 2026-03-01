#!/usr/bin/env python3
"""
nd1-atlas.py — Pack individual AVF frame WebPs into grid sprite atlases.

For each AVF asset (e.g. "d28" with frames d28_000.webp..d28_158.webp), creates:
  - nd1_atlases/{name}.webp  — all frames in a grid atlas
  - nd1_atlases/manifest.json — { name: { w, h, cols, count } }

The engine loads one atlas per animation and extracts frames via drawImage() cropping:
  col = index % cols;  row = Math.floor(index / cols);
  sx = col * w;  sy = row * h;

This reduces ~23,000 individual HTTP requests to ~600 atlas files.

Usage: python3 nd1-atlas.py [frames_dir] [output_dir] [workers]
"""

import os, sys, json, re, math
from collections import defaultdict
from concurrent.futures import ProcessPoolExecutor, as_completed
from PIL import Image

MAX_DIM = 4096  # Stay within safe browser/GPU texture limits
QUALITY = 80
# Frames at or below this size are chroma-keyed sprites (fidgets, NPCs).
# Pre-process: remove green screen → transparent RGBA, save lossless.
CHROMA_MAX = 200  # max(width, height) threshold


def remove_chroma_key(img):
    """Remove green-screen pixels → transparent. Matches engine's removeChromaKey()."""
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if g > 100 and g > r * 1.4 and g > b * 1.4:
                pixels[x, y] = (0, 0, 0, 0)
    return img


def build_atlas(name, frame_paths, fw, fh, out_dir):
    """Build a single grid atlas. Returns (name, w, h, cols, count, out_size, keyed) or None."""
    count = len(frame_paths)
    use_chroma = max(fw, fh) <= CHROMA_MAX

    if count == 1:
        img = Image.open(frame_paths[0])
        if use_chroma:
            img = remove_chroma_key(img)
        out_path = os.path.join(out_dir, f"{name}.webp")
        if use_chroma:
            img.save(out_path, "WEBP", lossless=True)
        else:
            img.save(out_path, "WEBP", quality=QUALITY)
        return (name, fw, fh, 1, 1, os.path.getsize(out_path), use_chroma)

    # Calculate grid: roughly square, within MAX_DIM
    max_cols = max(1, MAX_DIM // fw)
    cols = min(max_cols, math.ceil(math.sqrt(count)))
    rows = math.ceil(count / cols)

    # If too tall, widen
    if rows * fh > MAX_DIM:
        cols = min(max_cols, math.ceil(count / (MAX_DIM // fh)))
        rows = math.ceil(count / cols)

    atlas_w, atlas_h = cols * fw, rows * fh
    mode = "RGBA" if use_chroma else "RGB"
    atlas = Image.new(mode, (atlas_w, atlas_h), (0, 0, 0, 0) if use_chroma else (0, 0, 0))

    for j, path in enumerate(frame_paths):
        frame = Image.open(path)
        if use_chroma:
            frame = remove_chroma_key(frame)
        c, r = j % cols, j // cols
        atlas.paste(frame, (c * fw, r * fh))

    out_path = os.path.join(out_dir, f"{name}.webp")
    if use_chroma:
        atlas.save(out_path, "WEBP", lossless=True)
    else:
        atlas.save(out_path, "WEBP", quality=QUALITY)
    return (name, fw, fh, cols, count, os.path.getsize(out_path), use_chroma)


def main():
    frames_dir = sys.argv[1] if len(sys.argv) > 1 else './nd1_avf_frames'
    out_dir = sys.argv[2] if len(sys.argv) > 2 else './nd1_atlases'
    workers = int(sys.argv[3]) if len(sys.argv) > 3 else 8

    if not os.path.isdir(frames_dir):
        print(f"Error: {frames_dir} not found")
        sys.exit(1)

    os.makedirs(out_dir, exist_ok=True)

    # Group frames by AVF prefix
    frame_re = re.compile(r'^(.+)_(\d{3})\.png$')
    assets = defaultdict(list)

    for fname in sorted(os.listdir(frames_dir)):
        m = frame_re.match(fname)
        if m:
            name, idx = m.group(1), int(m.group(2))
            assets[name].append((idx, os.path.join(frames_dir, fname)))

    print(f"Found {len(assets)} AVF assets, packing with {workers} workers...")

    # Sort frames and read dimensions
    jobs = []
    for name in sorted(assets.keys()):
        frames = sorted(assets[name], key=lambda x: x[0])
        paths = [f[1] for f in frames]
        img = Image.open(paths[0])
        fw, fh = img.size
        jobs.append((name, paths, fw, fh))

    manifest = {}
    total_out = 0
    done = 0

    with ProcessPoolExecutor(max_workers=workers) as pool:
        futures = {
            pool.submit(build_atlas, name, paths, fw, fh, out_dir): name
            for name, paths, fw, fh in jobs
        }

        for future in as_completed(futures):
            done += 1
            result = future.result()
            if result:
                name, w, h, cols, count, out_size, keyed = result
                entry = {"w": w, "h": h, "cols": cols, "count": count}
                if keyed:
                    entry["keyed"] = True
                manifest[name] = entry
                total_out += out_size
            else:
                print(f"  FAILED: {futures[future]}")

            if done % 50 == 0 or done == len(jobs):
                print(f"  {done}/{len(jobs)} atlases complete...")

    # Write manifest
    manifest_path = os.path.join(out_dir, 'manifest.json')
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, separators=(',', ':'))

    total_frames = sum(a['count'] for a in manifest.values())
    print(f"\nDone: {len(manifest)} atlases → {out_dir}/")
    print(f"Total size: {total_out / 1024 / 1024:.1f} MB")
    print(f"HTTP requests: {total_frames} individual files → {len(manifest)} atlas files")


if __name__ == '__main__':
    main()
