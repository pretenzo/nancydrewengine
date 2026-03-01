# STFD Character Animation Library (CAL) System — Complete Analysis

## Overview

Stay Tuned for Danger uses a **composited 2-layer character animation system** for NPC conversations, replacing the full-motion AVF video conversations used in Secrets Can Kill. Each NPC is rendered as two independently animated layers:

1. **Body layer** — pre-rendered 3D torso/arms showing gesture poses (headless)
2. **Head layer** — pre-rendered 3D head showing lip-sync mouth shapes and expressions

These layers are composited at runtime, with frame selection driven by **XSHEET** (exposure sheet) data files that script which body pose and head expression to display on each animation frame, synchronized to dialogue audio playback.

## File Types

### CAL Files (Character Animation Libraries)

**Location:** `CD/Game/*.cal`
**Format:** CIF TREE archive (same as CIFTREE.DAT — `CIF TREE WayneSikes` magic, 70-byte V2 entries, positional decrypt, LZSS compression, RGB555 pixel data)

Each CAL file contains the animation frames for one character in one location, for either the body or head layer. There are 20 CAL files totaling 119.5 MB:

| File | Character | Location | Layer | Entries | Frame Dimensions | Prefix |
|------|-----------|----------|-------|---------|-----------------|--------|
| DwOfCmBd.cal | Dwayne Powers | Office | Body | 148 | 240-346 x 163 | DO |
| DwOfCmHd.cal | Dwayne Powers | Office | Head | 408 | 93 x 108 | DO |
| LIOFCMBD.cal | Lillian Weiss | Office | Body | 148 | 178-322 x 175 | LO |
| LIOFCMHD.cal | Lillian Weiss | Office | Head | 408 | 98 x 98-100 | LO |
| LISTCMBD.cal | Lillian Weiss | Studio | Body | 148 | 178-322 x 175 | LS |
| LISTCMHD.cal | Lillian Weiss | Studio | Head | 408 | 103 x 101 | LS |
| MJAPCMBD.cal | Mattie Jensen | Apartment | Body | 148 | 150-346 x 164 | MA |
| MJAPCMHD.cal | Mattie Jensen | Apartment | Head | 408 | 114 x 102 | MA |
| MJDRCMBD.cal | Mattie Jensen | Dressing Room | Body | 148 | 150-346 x 164 | MD |
| MJDRCMHD.cal | Mattie Jensen | Dressing Room | Head | 408 | 114 x 102 | MD |
| PMPRCMBD.cal | Millie Strathorn (Prop Master) | Prop Room | Body | 148 | 296-346 x 162-270 | PP |
| PMPRCMHD.cal | Millie Strathorn (Prop Master) | Prop Room | Head | 408 | 77 x 110 | PP |
| RADRCMBD.cal | Rick Arlen | Dressing Room | Body | 148 | 220-346 x 175 | RD |
| RADRCMHD.cal | Rick Arlen | Dressing Room | Head | 408 | 87 x 94 | RD |
| RIB.cal | Rick Arlen | Studio Interview | Body | 147 | 220-346 x 175 | RS |
| RIH.cal | Rick Arlen | Studio Interview | Head | 408 | 87 x 94 | RS |
| RHB.cal | Ralph (hallway) | Hallway | Body | 148 | 186-340 x 200 | RH |
| RHH.cal | Ralph (hallway) | Hallway | Head | 408 | 80 x 83 | RH |
| RLSTCMBD.cal | Ralph | Studio | Body | 147 | 322 x 282 | RL |
| RLSTCMHD.cal | Ralph | Studio | Head | 408 | 80 x 83 | RL |

### CAL Filename Convention

```
[CHAR][LOC]CM[LAYER].cal
  or
[SHORT].cal

Where:
  CHAR = Character code (2 chars)
    DW = Dwayne Powers       MJ = Mattie Jensen
    LI = Lillian Weiss       PM = Prop Master (Millie Strathorn)
    RA = Rick Arlen          RL = Ralph (studio)
    RI = Rick (interview)    RH = Ralph (hallway)

  LOC = Location code (2 chars)
    OF = Office              ST = Studio
    AP = Apartment           DR = Dressing Room
    PR = Prop Room

  CM = Conversation Mode (always present)
  LAYER = BD (Body) or HD (Head)
```

Short-form CAL files (RIB, RIH, RHB, RHH) follow the same CIF TREE format but use abbreviated names.

### XSHEET Files (Exposure Sheets)

**Location:** Stored as DATA entries in CIFTREE.DAT, extracted to `stfd_extracted/*.bin`
**Magic:** `XSHEET WayneSikes\x00` (18 bytes)
**Count:** 163 files, 19,202 total animation frames

Each XSHEET is an animation script for a single conversation line. It specifies which body frame and head frame to display on each tick, synchronized to audio playback.

#### XSHEET Header (42 bytes)

```
Offset  Size  Field
------  ----  -----
0x00    18B   Magic: "XSHEET WayneSikes\0"
0x12    12B   Padding (zeros)
0x1E    u16   Unknown (always 1)
0x20    u16   Unknown (always 0)
0x22    u16   Frame count (total animation frames in this script)
0x24    u16   Character slot count (always 2: body + head)
0x26    u16   Last frame index (always 66 — the total body pose count minus 1)
0x28    u16   Padding (0)
```

#### XSHEET Frame Table (starting at offset 0x2A)

Each frame entry is 0x30 (48) bytes, containing up to 4 character slots of 10 bytes each (only 2 are used):

```
Offset  Size  Field
------  ----  -----
+0x00   10B   Slot 0: Body frame name (null-terminated, e.g., "MABAB01")
+0x0A   10B   Slot 1: Head frame name (null-terminated, e.g., "MAUAC01")
+0x14   10B   Slot 2: (unused, zeros)
+0x1E   10B   Slot 3: (unused, zeros)
+0x28   8B    Padding
```

Total table size = `frame_count * 0x30` bytes.

#### XSHEET Example (mat01.bin — "Mattie: Greeting")

```
Frame 0:  body=MABAB01  head=MAUAC01   ← Mattie body pose B, mouth shape U/A
Frame 1:  body=MABAB02  head=MAAAC02   ← body transitioning, mouth changing
Frame 2:  body=MABAB03  head=MALAC03
Frame 3:  body=MABAB04  head=MAECC00
Frame 4:  body=MABAB05  head=MAMCC00
Frame 5:  body=MABBB00  head=MATCC00   ← new body pose B→B
Frame 6:  body=MABBB00  head=MAUCC00
...
Frame 66: body=MABAA00  head=MAMAA00   ← return to idle pose
```

#### XSHEET Files by Character

| Character | Files | Example Names |
|-----------|-------|---------------|
| Dwayne (dwa) | 12 | dwa01, dwa04-dwa14 |
| Lillian (lil) | 31 | lil01-lil36 |
| Mattie (mat) | 51 | mat01-mat66 |
| Millie/Prop (prp) | 22 | prp01-prp31 |
| Ralph (ral) | 10 | ral01-ral18 |
| Rick (ric) | 37 | ric01-ric48 |

## Frame Naming Convention

All frame names within CAL files follow a consistent 7-character pattern:

```
[PREFIX][LAYER][POSE][MOUTH][NN]

  PREFIX (2 chars): Character + location identifier
    DO = Dwayne/Office    MA = Mattie/Apartment
    LO = Lillian/Office   MD = Mattie/DressingRoom
    LS = Lillian/Studio   PP = PropMaster/PropRoom
    RD = Rick/DressingRoom RS = Rick/Studio
    RH = Ralph/Hallway    RL = Ralph/Studio

  LAYER (1 char): Animation layer
    A = Head layer
    B = Body layer

  POSE (1 char): Body gesture or head expression group
    Body (A-H): 8 distinct gesture poses per character
    Head: Expression/gaze directions (A, E, F, L, M, O, T, U — 8 groups)

  MOUTH (1 char): Mouth shape / phoneme viseme
    A-F: 6 viseme positions (closed → open → round → wide)
    For body frames: A-H sub-pose transitions

  NN (2 chars): Frame sequence number within the pose
    00 = base/key frame
    01-05 = transition frames (body has up to 05, head up to 03)
```

### Body Frame Details

- **148 frames per character/location** (8 poses x ~18 transitions)
- **Fixed height** per character (163px for Dwayne, 175px for Rick, etc.)
- **Variable width** per pose (gestures extend arms differently: 240-346px for Dwayne)
- The body image is a **headless torso** — the neck area is designed to be overlaid by the head

### Head Frame Details

- **408 frames per character/location** (8 expressions x 6 mouth shapes x ~8 transitions)
- **Fixed dimensions** per character (93x108 for Dwayne, 114x102 for Mattie, etc.)
- The 8 expression groups (A, E, F, L, M, O, T, U) appear to encode:
  - Different **gaze directions** (looking left, right, at camera, down)
  - Different **emotion states** (neutral, concerned, happy, angry)
- The 6 mouth shapes (A-F) are **viseme groups** for lip-sync:
  - A = closed/neutral
  - B = slightly open
  - C = open
  - D = wide open
  - E = round (O/U sounds)
  - F = teeth visible (F/V sounds)

## Rendering Pipeline

### Conversation Playback Flow

```
1. Scene loads with CONVERSATION_CEL action
   ├── Load body CAL file (e.g., MJAPCMBD.cal)
   ├── Load head CAL file (e.g., MJAPCMHD.cal)
   └── Load XSHEET data file (e.g., mat01)

2. Audio begins playing (HIS dialogue file)

3. Per-frame tick (synced to audio position):
   ├── Read current frame index from XSHEET
   ├── Get body frame name (e.g., "MABAB01")
   ├── Get head frame name (e.g., "MAUAC01")
   ├── Look up body frame in body CAL by hash
   ├── Look up head frame in head CAL by hash
   ├── Restore background behind previous frame
   ├── Blit body frame at its dest rect
   └── Composite head frame on top at its dest rect

4. Audio ends → hold on last frame or return to idle
```

### Frame Lookup

The engine uses a **hash table** for O(1) frame lookup within CAL files:
- Hash function: `(sum of uppercase ASCII chars) % 0x400`
- Frame names are treated as opaque strings — the engine does not parse the letter meanings

### Head Placement

Head position is **not calculated at runtime**. Each CIF frame in the CAL file contains a baked-in destination rectangle:

```
Frame surface structure (0x59 bytes):
  +0x00   4B    Pixel data pointer
  +0x08   24B   Frame name string
  +0x2b   u16   Frame width
  +0x31   u16   Frame height
  +0x33   u16   Bits per pixel
  +0x35   16B   Source rect [left, top, right, bottom]
  +0x45   16B   Dest rect [left, top, right, bottom]  ← positioning
  +0x55   4B    Flags / transparent color key
```

The dest rect tells the renderer exactly where to place each body and head frame on screen. This means the head "attachment point" is pre-authored per frame, not computed.

### Compositing Modes

Two modes exist depending on whether characters share background area:

- **AVG mode** (shared background): Restore full background rect, then composite both layers with transparency
- **IND mode** (individual save/restore): Each character slot saves/restores its own background region

## Scene Integration

### CONVERSATION_CEL Action (type 0x39)

Record structure within scene ACT chunks:

```
Offset  Size  Field
------  ----  -----
0x00    32B   Action name (e.g., "Mattie: Greeting")
0x30    1B    Action type (0x39)
0x31    1B    Subtype (always 1)
0x32+   var   Action data:
  +0x00  10B   XSHEET data file name (e.g., "Mat01")
  +0x0A  10B   Body CAL file name (e.g., "MJAPCMBD")
  +0x14  10B   Head CAL file name (e.g., "MJAPCMHD")
  +0x1E  var   Control data (pose defaults, character counts)
  +0xBF  10B   XSHEET name repeated (for audio sync reference)
  +0xE9  var   Dialogue tree:
               - NPC text with markup tags (<i>, <c1>, <o>, <n>, <h>)
               - 200-byte text slots
               - Response sound references (e.g., "NMA01")
               - Player choice text with markup
               - Continuation/pop flags
```

**Total record size:** ~2,600-2,700 bytes (varies with dialogue length)

### CONVERSATION_SOUND Action (type 0x3a)

Audio-only conversation with no character animation. Same dialogue tree structure but without the 30-byte CAL file prefix:

```
Offset  Size  Field
------  ----  -----
0x00    32B   Action name
0x30    1B    Action type (0x3a)
0x31    1B    Subtype (always 1)
0x32+   var   Action data:
  +0x00  10B   Sound/XSHEET reference (e.g., "c10")
  +0x0A  var   Control data
  +var   var   Dialogue tree (same format as CONVERSATION_CEL)
```

Used for telephone calls (Bess, George, Ned, Dwayne Phone) and off-screen characters.

### Action Statistics in STFD Scenes

| Type | Count | Description |
|------|-------|-------------|
| CONVERSATION_CEL | 168 | Face-to-face NPC conversations with animation |
| CONVERSATION_SOUND | 225 | Audio-only conversations (phone calls, intercoms) |
| CONVERSATION_VIDEO_ALT | 8 | Alternate video-based conversations |

## Character → CAL → Background Mapping

| NPC | Background(s) | Body CAL | Head CAL | XSHEET prefix | Conv count |
|-----|---------------|----------|----------|---------------|------------|
| Mattie Jensen | MJAPBK (apartment) | MJAPCMBD | MJAPCMHD | mat | 22 |
| Mattie Jensen | MJDRBK (dressing room) | MJDRCMBD | MJDRCMHD | mat | 28 |
| Rick Arlen | RICDBG (dressing room) | RADRCMBD | RADRCMHD | ric | 35 |
| Rick Arlen | RIBK (interview) | RIB | RIH | ric | 4 |
| Lillian Weiss | LIOFBK (office) | LIOFCMBD | LIOFCMHD | lil | 17 |
| Lillian Weiss | LISTBK (studio) | LISTCMBD | LISTCMHD | lil | 12 |
| Dwayne Powers | DF3G (office) | DwOfCmBd | DwOfCmHd | dwa | 12 |
| Millie Strathorn | PMBK (prop room) | PMPRCMBD | PMPRCMHD | prp | 21 |
| Ralph | SH2W (hallway) | RHB | RHH | ral | 7 |
| Ralph | RLBK (studio) | RLSTCMBD | RLSTCMHD | ral | 4 |

## Comparison with ND1 (Secrets Can Kill)

| Feature | ND1 | STFD |
|---------|-----|------|
| Conversation rendering | Full-motion AVF video | Composited body + head layers |
| Character data | AVF files (one per dialogue) | CAL archives + XSHEET scripts |
| Lip sync | Pre-baked in video | Frame-by-frame head selection |
| Storage efficiency | ~669 MB (full video per line) | ~120 MB (shared pose library) |
| Action type | CONVERSATION_VIDEO (0x32) | CONVERSATION_CEL (0x39) |
| Audio-only action | (not used) | CONVERSATION_SOUND (0x3a) |
| Frame timing | AVF entry table | XSHEET frame table synced to audio |
| Character poses | Fixed per video | Reusable across conversations |

The CAL system is significantly more storage-efficient than ND1's approach. Instead of storing a unique video for every dialogue line, STFD stores a shared library of ~150 body poses and ~400 head frames per character/location, then scripts their combination via lightweight XSHEET files (~3 KB each). This reduces the conversation animation data from hundreds of megabytes to about 120 MB for the entire game.
