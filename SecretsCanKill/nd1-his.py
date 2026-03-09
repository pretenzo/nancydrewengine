#!/usr/bin/env python3
"""
nd1-his.py — Nancy Drew: Secrets Can Kill — HIS Audio Converter
Converts HER Interactive Sound (.his) files to standard WAV.

HIS header (44 bytes):
  [00-21]  22 bytes  "Her Interactive Sound\x1a"  (custom magic)
  [22-23]  u16 LE   Version = 1
  [24-27]  u32 LE   Sample rate (8000 / 11025 / 16384 / 22050 / 44100 Hz)
  [28-31]  u32 LE   file_size - 8  (RIFF-style remaining length)
  [32-33]  u16 LE   Bytes per sample (1 = 8-bit, 2 = 16-bit)
  [34-35]  u16 LE   Bits per sample (8 or 16)
  [36-39]  4 bytes  "data"
  [40-43]  u32 LE   PCM data size in bytes
  [44+]    bytes    Raw PCM (8-bit unsigned or 16-bit signed LE)

Note: All HIS files are mono. The field at [32-33] is bytes-per-sample
(NOT channel count). It mirrors [34-35]: bps=1 → bits=8, bps=2 → bits=16.
Trailing 82 bytes after audio (LIST/INFO chunk from GoldWave) are ignored.

Conversion: replace the 44-byte HIS header with a standard RIFF/WAV header.
"""

import struct, os, sys, glob

HIS_MAGIC = b'Her Interactive Sound\x1a'
HIS_HEADER_SIZE = 44


def parse_his(data):
    if data[:22] != HIS_MAGIC:
        raise ValueError(f"Not a HIS file (magic: {data[:22]!r})")
    version     = struct.unpack_from('<H', data, 22)[0]
    sample_rate = struct.unpack_from('<I', data, 24)[0]
    bytes_per   = struct.unpack_from('<H', data, 32)[0]  # bytes per sample (1 or 2), NOT channels
    bits        = struct.unpack_from('<H', data, 34)[0]
    data_tag    = data[36:40]
    data_size   = struct.unpack_from('<I', data, 40)[0]
    audio       = data[44:44 + data_size]
    return {
        'version': version,
        'sample_rate': sample_rate,
        'channels': 1,  # all HIS files are mono
        'bits_per_sample': bits,
        'data_size': data_size,
        'audio': audio,
    }


def his_to_wav(his_data):
    """Return WAV bytes for the given HIS data bytes."""
    h = parse_his(his_data)
    sr    = h['sample_rate']
    ch    = h['channels']
    bps   = h['bits_per_sample']
    audio = h['audio']

    block_align = ch * (bps // 8)
    byte_rate   = sr * block_align
    data_size   = len(audio)
    riff_size   = 36 + data_size  # everything after "RIFF" + size field

    wav = bytearray()
    # RIFF chunk
    wav += b'RIFF'
    wav += struct.pack('<I', riff_size)
    wav += b'WAVE'
    # fmt  chunk (16 bytes, PCM format = 1)
    wav += b'fmt '
    wav += struct.pack('<I', 16)
    wav += struct.pack('<H', 1)          # PCM
    wav += struct.pack('<H', ch)
    wav += struct.pack('<I', sr)
    wav += struct.pack('<I', byte_rate)
    wav += struct.pack('<H', block_align)
    wav += struct.pack('<H', bps)
    # data chunk
    wav += b'data'
    wav += struct.pack('<I', data_size)
    wav += audio

    return bytes(wav)


def convert_file(src_path, dst_path):
    with open(src_path, 'rb') as f:
        his_data = f.read()
    wav_data = his_to_wav(his_data)
    with open(dst_path, 'wb') as f:
        f.write(wav_data)
    h = parse_his(his_data)
    duration = h['data_size'] / (h['sample_rate'] * (h['bits_per_sample'] // 8))
    print(f"  {os.path.basename(src_path):20s} → {os.path.basename(dst_path)}"
          f"  {h['sample_rate']}Hz mono {h['bits_per_sample']}bit  {duration:.2f}s")


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: nd1-his.py <his_file_or_directory> [output_dir]")
        print("  Converts HIS audio files to standard WAV.")
        sys.exit(1)

    target  = sys.argv[1]
    out_dir = sys.argv[2] if len(sys.argv) > 2 else './nd1_audio'

    his_files = []
    if os.path.isdir(target):
        for path in sorted(glob.glob(os.path.join(target, '*.his')) +
                           glob.glob(os.path.join(target, '*.HIS'))):
            his_files.append(path)
    elif os.path.isfile(target):
        his_files.append(target)

    if not his_files:
        print(f"No HIS files found in: {target}")
        sys.exit(1)

    os.makedirs(out_dir, exist_ok=True)
    print(f"Converting {len(his_files)} HIS files → {out_dir}/\n")

    ok = err = 0
    for src in his_files:
        name = os.path.splitext(os.path.basename(src))[0].lower()
        dst  = os.path.join(out_dir, name + '.wav')
        try:
            convert_file(src, dst)
            ok += 1
        except Exception as e:
            print(f"  ERROR {os.path.basename(src)}: {e}")
            err += 1

    print(f"\nDone: {ok} converted, {err} errors.")
