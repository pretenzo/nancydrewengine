# Nancy Drew 2: Stay Tuned for Danger — Asset Extraction & Analysis

Extraction toolchain and decoded game data for Stay Tuned for Danger (1999, Her Interactive). This folder contains everything needed to build a browser engine port, following the same approach used for ND1 (Secrets Can Kill).

## Folder Structure

```
StayTunedForDanger/
├── CD/                        Original game CD contents
│   ├── Game/
│   │   ├── CIFTREE.DAT        Main asset archive (1361 entries, 38 MB)
│   │   └── *.cal              20 character animation libraries (120 MB total)
│   ├── CDVideo/               885 AVF video files
│   └── CDSound/               1283 HIS audio files
│
├── STFD.Game.exe.c            Ghidra decompilation of Game.exe (4.5 MB, 159,972 lines)
│
├── Python Scripts
│   ├── stfd-extract.py        CIFTREE.DAT V2 extractor
│   ├── stfd-avf.py            AVF video decoder → PNG frames
│   ├── stfd-his.py            HIS audio converter → WAV
│   ├── stfd-scene.py          Scene data decoder → JSON
│   └── stfd-boot.py           BOOT.bin decoder → JSON
│
├── Extracted Data
│   ├── stfd_extracted/        1361 raw binary files from CIFTREE.DAT
│   ├── stfd_images/           75 PNG images (backgrounds, UI)
│   ├── stfd_avf_frames/       5351 PNG frames from 879 AVF files + 42 GIFs
│   ├── stfd_audio/            1283 WAV files from HIS conversion
│   └── stfd_cal_samples/      Sample body/head frames from CAL files
│
├── Decoded Data
│   ├── stfd_scenes.json       1118 scenes, 3149 actions (1.5 MB)
│   ├── stfd_scenes.txt        Human-readable scene report (556 KB)
│   ├── stfd_scene_graph.json  Scene navigation graph (208 KB)
│   ├── stfd_boot.json         BOOT.bin decoded data (196 KB)
│   └── stfd_boot.txt          BOOT.bin human-readable report (12 KB)
│
└── Documentation
    ├── README.md              This file
    ├── CAL_ANIMATION_SYSTEM.md  Complete CAL system analysis
    └── STFD_MASTER_PROMPT.md  Master prompt for future Claude sessions
```

## Quick Start

All scripts are run from the project root (`nd/`).

```bash
# 1. Extract all assets from CIFTREE.DAT
python3 StayTunedForDanger/stfd-extract.py

# 2. Decode scene data
python3 StayTunedForDanger/stfd-scene.py

# 3. Decode BOOT.bin
python3 StayTunedForDanger/stfd-boot.py

# 4. Convert audio (1283 HIS → WAV)
python3 StayTunedForDanger/stfd-his.py

# 5. Decode video (885 AVF → PNG frames) — takes several minutes
python3 StayTunedForDanger/stfd-avf.py
```

## Python Script Details

### stfd-extract.py — CIFTREE V2 Extractor

Extracts all 1361 entries from `CIFTREE.DAT` using the V2 archive format (70-byte entries). Outputs raw `.bin` files to `stfd_extracted/` and converts PLAIN-type entries (RGB555 images) to PNGs in `stfd_images/`.

- **V2 entry format:** 70 bytes (vs ND1's 38-byte V1 format)
- **Same core algorithms:** positional decrypt, LZSS decompression, RGB555 → PNG
- **Index start:** 0x820, entry size: 70
- **Key field offsets:** name[0:9], width@19, height@23, bpp@49, offset@51, decomp_sz@55, comp_sz@63, type@67

Results: 75 images + 1286 data files, 0 errors.

### stfd-scene.py — Scene Decoder

Decodes 1118 scene files (IFF format: DATA + SCENSSUM + ACT chunks) into `stfd_scenes.json`. Same IFF structure as ND1 with identical action type encoding.

36 unique action types found, including:
- `CONVERSATION_CEL` (168) — animated NPC conversations (new to STFD)
- `CONVERSATION_SOUND` (225) — audio-only conversations (new to STFD)
- `HOT_1FR_EXITSCENE` (652), `PLAY_DIGI_SOUND` (497), `HOT_1FR_SCENE_CHANGE` (481)
- Full puzzle support: ordering, rotating lock, password, lever, telephone

### stfd-avf.py — AVF Video Decoder

Identical AVF format to ND1 ("AVF WayneSikes" magic). Decodes 879 AVF files into 5351 PNG frames, plus animated GIFs for multi-frame sequences.

### stfd-his.py — HIS Audio Converter

Identical HIS format to ND1 ("Her Interactive Sound" magic). Converts 1283 files to standard WAV.

### stfd-boot.py — BOOT.bin Decoder

Decodes the BOOT.bin file (IFF chunks) into game configuration data. 21 sections including:
- Game identity: "Stay Tuned For Danger", publisher: "HER Interactive Presents"
- Viewport: 535x291 (primary view at 52,18)
- 4 map locations: Maxine's Diner, Aunt Eloise House, Vandelay Pharmacy, Paseo Del Mar High School
- 158 cursor definitions, 11 fonts, 20 loading quotes
- Puzzle data, inventory layout, UI sounds

## Key Technical Differences from ND1

| Feature | ND1 (Secrets Can Kill) | STFD (Stay Tuned for Danger) |
|---------|----------------------|------------------------------|
| CIFTREE format | V1 (38-byte entries) | V2 (70-byte entries) |
| Index start | 0x81E | 0x820 |
| Conversation system | CONVERSATION_VIDEO (AVF) | CONVERSATION_CEL + CONVERSATION_SOUND |
| Character rendering | Full-motion video per line | Body+head compositing from CAL files |
| Animation data | AVF files (~669 MB) | CAL archives + XSHEET scripts (~120 MB) |
| Viewport | 536x292 | 535x291 |
| Scenes | 587 | 1118 |
| Audio files | 716 | 1283 |
| AVF files | 215 | 885 |

## Game Characters (NPCs)

| Code | Character | Locations | Conv Type |
|------|-----------|-----------|-----------|
| MAT/MJ | Mattie Jensen | Apartment (MJAPBK), Dressing Room (MJDRBK) | CEL |
| RIC/RA/RI | Rick Arlen | Dressing Room (RICDBG), Studio Interview (RIBK) | CEL |
| LIL/LI | Lillian Weiss | Office (LIOFBK), Studio (LISTBK) | CEL |
| DWA/DW | Dwayne Powers | Office (DF3G) | CEL |
| PRP/PM | Millie Strathorn (Prop Master) | Prop Room (PMBK) | CEL |
| RAL/RH/RL | Ralph | Hallway (SH2W), Studio (RLBK) | CEL |
| — | Bess, George, Ned | Phone calls (ME2M) | SOUND |
| — | Connie | Union scene (su1c) — leftover from SCK, unused | SOUND |

## CAL Animation System

The CAL (Character Animation Library) system is STFD's major architectural innovation over ND1. Instead of storing a unique AVF video for every dialogue line, it uses a shared library of body poses and head expressions that are scripted via XSHEET (exposure sheet) files.

See [CAL_ANIMATION_SYSTEM.md](CAL_ANIMATION_SYSTEM.md) for the complete technical analysis including:
- Binary format specifications for CAL files and XSHEET data
- Frame naming convention breakdown
- Rendering pipeline and compositing details
- Character-to-file mapping table

## Dependencies

- Python 3.6+
- Pillow (`pip install Pillow`) — for RGB555 → PNG conversion and AVF frame output
