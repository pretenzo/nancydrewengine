# Nancy Drew: Stay Tuned for Danger — Master Prompt

## Project Overview

Browser-based reimplementation of Nancy Drew: Stay Tuned for Danger (1999, Her Interactive), the second game in the Nancy Drew series. This builds on the existing ND1 (Secrets Can Kill) browser engine in the parent directory. All STFD work lives in `StayTunedForDanger/`.

The original game's assets have been fully extracted from the CD using custom Python scripts. The game data is decoded into JSON format ready for engine consumption. The next phase is building the browser engine.

**Important constraint:** Do not modify existing ND1 project files. All STFD work goes in `StayTunedForDanger/`.

## Architecture (Current State)

```
StayTunedForDanger/
├── CD/                        Original game CD
│   ├── Game/CIFTREE.DAT       Main asset archive (V2 format, 1361 entries)
│   ├── Game/*.cal             20 character animation libraries (120 MB)
│   ├── CDVideo/               885 AVF video files
│   └── CDSound/               1283 HIS audio files
│
├── STFD.Game.exe.c            Ghidra decompilation (4.5 MB, 159,972 lines)
│
├── Python Extraction Scripts
│   ├── stfd-extract.py        CIFTREE V2 extractor → stfd_extracted/ + stfd_images/
│   ├── stfd-scene.py          Scene decoder → stfd_scenes.json (1118 scenes, 3149 actions)
│   ├── stfd-boot.py           BOOT.bin decoder → stfd_boot.json
│   ├── stfd-avf.py            AVF video decoder → stfd_avf_frames/ (5351 frames)
│   └── stfd-his.py            HIS audio → stfd_audio/ (1283 WAV files)
│
├── Decoded Data (ready for engine)
│   ├── stfd_scenes.json       All scene data (1.5 MB)
│   ├── stfd_boot.json         Game config, map, cursors, fonts (196 KB)
│   ├── stfd_scene_graph.json  Navigation graph (208 KB)
│   ├── stfd_extracted/        1361 raw files (includes 163 XSHEET files)
│   ├── stfd_images/           75 PNGs from CIFTREE
│   ├── stfd_avf_frames/       5351 PNG frames + 42 GIFs
│   └── stfd_audio/            1283 WAV files
│
├── Documentation
│   ├── README.md              Project overview and quick start
│   ├── CAL_ANIMATION_SYSTEM.md Complete animation system analysis
│   └── STFD_MASTER_PROMPT.md  This file
│
└── Engine (BUILT — skeleton complete)
    ├── index.html             535x291 canvas, overlays, debug panel, CSS
    └── engine.js              ~2250 lines, IIFE pattern, 31/34 action types
```

## ND1 Engine Reference

The ND1 engine (`engine.js` in parent directory, ~3100 lines) is a single-file JavaScript IIFE. See `MASTER_PROMPT.md` in the parent directory for full documentation. Key patterns to reuse or adapt:

- **Scene loading:** `loadScene()` renders background → items → NPCs → processes actions
- **Conversation system:** Three-tier routing (player choices → continuation → pop)
- **Puzzle system:** Canvas-based interactive puzzles (ordering, rotating lock, password, lever, telephone)
- **State management:** Flags, inventory, scene history via `state` object
- **Asset loading:** `tryLoadImg()` with case-variant fallback, `imgCache`, `chromaKeyCache`
- **Save/load:** localStorage + original .SAV binary import/export

## CIFTREE V2 Format

STFD uses V2 of the CIF TREE archive format. Same magic (`CIF TREE WayneSikes`), same encryption (positional subtract), same LZSS compression, same RGB555 pixels. Different entry structure:

```
V2 Entry (70 bytes, at INDEX_START = 0x820):
Offset  Size  Field
------  ----  -----
0x00    9B    Name (null-terminated)
0x09    u16   Index
0x13    u16   Width (stored as max coord: actual = width + 1)
0x17    u16   Height (stored as max coord: actual = height + 1)
0x31    u8    BPP (16 for RGB555)
0x33    u32   File offset in archive
0x37    u32   Decompressed size
0x3F    u32   Compressed size
0x43    u8    Type (0x02 = PLAIN/image, 0x03 = DATA)
0x44    u16   Sentinel (0xFFFF)
```

V1 comparison: 38-byte entries at INDEX_START = 0x81E.

## Scene Data Format

Same IFF structure as ND1: `DATA` marker → `SCENSSUM` chunk (125 bytes, big-endian size) → `ACT\x00` chunks.

Each ACT chunk: 8-byte header (tag + big-endian size), then payload:
- Bytes 0x00-0x1F: Action name (32 bytes, null-terminated)
- Byte 0x30: Action type ID
- Byte 0x31: Subtype
- Bytes 0x32+: Type-specific data + trailing 12-byte condition records

### Action Types (36 found in STFD)

**Navigation:**
- `HOT_1FR_EXITSCENE` (652 occurrences) — clickable exit hotspot
- `HOT_1FR_SCENE_CHANGE` (481) — single-frame hotspot → navigate
- `HOT_MULTIFRAME_SCENE_CHANGE` (207) — per-panoramic-frame hotspot
- `SCENE_CHANGE` (58) — auto-navigation (conditional)

**Conversations (STFD-specific system):**
- `CONVERSATION_CEL` (168) — animated NPC conversation with body+head compositing
- `CONVERSATION_SOUND` (225) — audio-only conversation (phone calls, intercoms)
- `CONVERSATION_VIDEO_ALT` (8) — alternate video-based conversation

**Interaction:**
- `EVENTFLAGS_MULTI_HS` (410) — complex click-driven flag system
- `EVENTFLAGS` (154) — set game flags
- `PLAY_DIGI_SOUND` (497) — sound playback
- `SPECIAL_EFFECT` (130) — visual effects
- `PLAY_SECONDARY_MOVIE` (38) — cinematic animation
- `OVERLAY_ANIM` (9) — overlay animations
- `PLAY_SECONDARY_VIDEO` (1) — NPC fidget sprite
- `TEXTBOX_WRITE` (5) — text display

**Inventory:**
- `ADD_INVENTORY` (28) — add item
- `REMOVE_INVENTORY` (2) — remove item
- `SHOW_INVENTORY_ITEM` (12) — pickable item in scene

**Puzzles:**
- `ROTATINGLOCK_PUZZLE` (4)
- `ORDERING_PUZZLE` (3)
- `PASSWORD_PUZZLE` (2)
- `LEVER_PUZZLE` (2)
- `TELEPHONE` (4)

**Game Flow:**
- `SAVE_CONTINUE_GAME` (4) — auto-checkpoint
- `LOSE_GAME` (7) — death/failure
- `WIN_GAME` (1) — game completion
- `DIFFICULTY_LEVEL` (3) — difficulty selection
- `RESET_AND_START_TIMER` (8) / `STOP_TIMER` (14) — countdown timers
- `BUMP_PLAYER_CLOCK` (2) — advance game clock

**Unknown/Special:**
- `SPECIAL_C8`, `SPECIAL_C9`, `SPECIAL_CA`, `SPECIAL_CB`, `SPECIAL_CC`, `SPECIAL_CD` — unidentified action types that need investigation

### Condition Record Format (12-byte trailing records)

Each action's type-specific data is followed by N × 12-byte condition records. These determine whether the action is active.

```
Byte  Field         Notes
----  -----         -----
0     Type          0x01=scene_variant, 0x02=flag_check, 0x09=time_delay,
                    0x0b=inventory_check, 0x0c=day/night, 0x0e=timed_flag,
                    0x0f=timer_condition
1     Label         flag_id or item_id
2     Condition     expected value
3     ORFlag        0=AND (default), 1=OR with next condition
4-11  Time data     hours(2), minutes(2), seconds(2), millis(2) — for timed conditions
```

**ORFlag grouping (byte 3):** When `ORFlag=1` on condition[i], it forms an OR group with condition[i+1]. The engine evaluates each condition individually, then propagates passes within OR groups. All conditions (after OR propagation) must pass for the action to be active.

Example from S1120 (Mattie's dressing room door, Action 4):
```
cond[0]: flag 46==1           (ORFlag=0)  — daytime
cond[1]: flag 135==1          (ORFlag=1)  — never visited dressing room
cond[2]: flag 61==2           (ORFlag=0)  — klieg light happened
cond[3]: flag 47==1           (ORFlag=1)  — haven't heard "this is horrible"
cond[4]: flag 48==2           (ORFlag=0)  — met Dwayne

Evaluates as: flag46==1 AND (flag135==1 OR flag61==2) AND (flag47==1 OR flag48==2)
```

91 OR-flagged conditions across 33 scenes. Critical for doors, hallways, studio navigation, and difficulty screen. Decoded from Game.exe `FUN_00458284` (line 23912: debug `"ORFlag: %d"`).

## Conversation System (Major Difference from ND1)

### ND1: CONVERSATION_VIDEO

ND1 uses full-motion AVF videos for conversations. Each dialogue line has a dedicated AVF file with pre-rendered character animation. The engine plays the video and displays text.

### STFD: CONVERSATION_CEL + CONVERSATION_SOUND + CONVERSATION_VIDEO_ALT

STFD replaces AVF conversation videos with a composited character animation system. All three conversation types share the same dialogue tree format but differ in header size.

**CONVERSATION_CEL (type 0x39)** — Face-to-face NPC conversations (168 occurrences):

```
Action data binary structure (fully decoded):
Header (0xE9 bytes):
+0x00  10B   node_id / XSHEET name (e.g., "Mat01") — animation script + audio ref
+0x0A  10B   Body CAL file name (e.g., "MJAPCMBD")
+0x14  10B   Head CAL file name (e.g., "MJAPCMHD")
+0x1E  203B  Control data (pose defaults, unknown fields)

Text buffer (0x5DC bytes, starting at 0xE9):
  15 × 100-byte null-terminated slots, concatenated = NPC text
  Markup tags: <i>=italic, <c1>=color, <o>=open, <n>=newline, <h>=player response marker

Intro sound (10 bytes at 0xE9 + 0x5DC = 0x6C5):
  Null-terminated sound filename

Dialogue tree (at 0xE9 + 0x60D = 0x6F6):
  1 byte: entry count
  N × 426-byte entries (see below)

Flag entries (after dialogue tree):
  5-byte header + N × 6-byte records (same as CONVERSATION_VIDEO tail format)
```

**CONVERSATION_SOUND (type 0x3a)** — Audio-only phone calls/intercoms (225 occurrences):
Same structure, header = 0x22 bytes. Tree at 0x22 + 0x60D = 0x62F.

**CONVERSATION_VIDEO_ALT (type 0x38)** — Alternate video conversations (8 occurrences):
Same structure, header = 0x5B bytes. Tree at 0x5B + 0x60D = 0x668.

#### Dialogue Tree Entry Format (426 bytes)

```
Offset  Size  Field
------  ----  -----
0x00    3B    Prefix bytes (unknown purpose)
0x03    200B  text1 — NPC/Nancy response text (null-terminated)
0xCB    200B  text2 — continuation text (null-terminated, concatenated with text1)
0x193   10B   target_node — voice audio ref for this entry (e.g., "NMA01")
0x19D   1B    Pad
0x19E   2B    continuation_scene (u16 LE) — scene to navigate to after this entry
0x1A0   4B    Zeros
0x1A4   1B    has_continuation flag (1 = continue to scene, 0 = terminal)
0x1A5   1B    Pad
0x1A6   2B    0xFFFF marker
0x1A8   2B    Type bytes
0x1AA   0B    End of entry (total = 426 bytes = 0x1AA)
```

Entries with `<h>` tag in text are player choices (Tier 1). Entries without `<h>` are auto-continuation entries (Tier 2). Navigation: if `continuation_scene > 0`, engine navigates to that scene after the entry plays.

#### Flag Entry Format (6-byte records)

Two types distinguished by byte pattern:
- **Set-flag**: bytes[0]=0x00, bytes[1]=0x00, bytes[3]=flag_id, bytes[5]=value → sets game flag on conversation load
- **Check-flag**: bytes[0]=type, bytes[1]=flag_id, bytes[2]=value → conversation only shows if flag matches

Null entries (flag 0=0) and 0xFF end markers are filtered out.

#### Three-Tier Conversation Routing (engine.js)

1. **Tier 1 (Choices)**: Entries with `<h>` tag → rendered as clickable buttons. Clicking shows Nancy's response text, plays voice audio, then navigates to continuation_scene or pops back.
2. **Tier 2 (Auto-continue)**: No choices but has continuation_scene → shows NPC text with Continue button → navigates forward.
3. **Tier 3 (Terminal)**: No choices, no continuation → shows NPC text with Continue → pops back to pre-conversation scene.

### CAL Animation System

Each NPC is rendered as two composited layers:

1. **Body layer** — headless 3D torso with gesture poses (148 frames per character/location)
2. **Head layer** — head with lip-sync mouth shapes and expressions (408 frames per character/location)

Frame selection per tick is driven by **XSHEET files** (exposure sheets) stored in CIFTREE:

```
XSHEET format:
  Magic: "XSHEET WayneSikes\0"
  Header: frame_count (u16@34), char_slots (u16@36, always 2), last_frame (u16@38, always 66)
  Frame table at 0x2A: stride 0x30 per frame
    Slot 0 (10B): Body frame name (e.g., "MABAB01")
    Slot 1 (10B): Head frame name (e.g., "MAUAC01")
```

The 2 character slots are NOT 2 characters — they are the body and head layers for a single NPC. Nancy is never rendered on screen (first-person game).

**Frame naming convention:** `[PREFIX][LAYER][POSE][MOUTH][NN]`
- PREFIX (2 chars): character+location code
- LAYER: A=head, B=body
- POSE: gesture/expression group (A-H for body, A/E/F/L/M/O/T/U for head)
- MOUTH: viseme shape A-F (closed → open → round)
- NN: sequence number (00-05)

**Head placement** is baked into each frame's destination rectangle in the CIF data — no runtime positioning calculation.

**163 XSHEET files** across 6 characters, **19,202 total animation frames**.

See `CAL_ANIMATION_SYSTEM.md` for the complete technical analysis.

### Character → CAL File Mapping

| NPC | Backgrounds | Body CAL | Head CAL | XSHEET prefix | CEL count |
|-----|------------|----------|----------|---------------|-----------|
| Mattie Jensen | MJAPBK, MJDRBK | MJAPCMBD, MJDRCMBD | MJAPCMHD, MJDRCMHD | mat | 50 |
| Rick Arlen | RICDBG, RIBK | RADRCMBD, RIB | RADRCMHD, RIH | ric | 39 |
| Lillian Weiss | LIOFBK, LISTBK | LIOFCMBD, LISTCMBD | LIOFCMHD, LISTCMHD | lil | 29 |
| Dwayne Powers | DF3G | DwOfCmBd | DwOfCmHd | dwa | 12 |
| Millie Strathorn | PMBK | PMPRCMBD | PMPRCMHD | prp | 21 |
| Ralph | SH2W, RLBK | RHB, RLSTCMBD | RHH, RLSTCMHD | ral | 11 |

### CONVERSATION_SOUND Scenes

Audio-only conversations used for:
- **Phone calls** (bg=ME2M): Bess, George, Ned, Dwayne Phone — 151 scenes
- **Rick interview** (bg=RISC/RITV/RITX): 7 scenes
- **Ralph sign-in** (bg=SE2C/SE2D/SE2E/SE2F): 4 scenes
- **Lillian toast** (bg=TOAST): 3 scenes
- **Other**: Dwayne intercom — 2 scenes (Connie union scene is leftover from SCK, unused in STFD)

## Game Configuration (stfd_boot.json)

Decoded from BOOT.bin. 21 sections:

| Section | Key Data |
|---------|----------|
| `bootbsum` | Publisher: "HER Interactive Presents", Series: "Nancy Drew Case File", Title: "Stay Tuned For Danger" |
| `viewports` | Primary: 535x291 at (52,18). Full: 535x291. Sidebar: 267x145. Portrait: 535x291 |
| `map` | 4 locations: Maxine's Diner, Aunt Eloise House, Vandelay Pharmacy, Paseo Del Mar High School. Day/night backgrounds: MAPDAY/MAPNIGHT |
| `cursors` | 158 cursor definitions |
| `fonts` | 11 font definitions |
| `quotes` | 20 loading screen quotes |
| `inventory` | Inventory UI layout |
| `hints` | Hint system data |
| `credits` | Game credits |
| `ui_sounds` | UI sound definitions |
| `tension_music` | Crisis music triggers |
| `combination_puzzle` | Puzzle parameters |

## Game Characters

### NPCs with CEL Animation (Face-to-Face)

| Character | Full Name | Role |
|-----------|-----------|------|
| Mattie Jensen | Mattie Jensen | Soap opera actress, Nancy's friend |
| Rick Arlen | Rick Arlen | Soap opera star receiving death threats |
| Lillian Weiss | Lillian Weiss | Show producer |
| Dwayne Powers | Dwayne Powers | Show director |
| Millie Strathorn | Millie Strathorn | Prop master (Owen Spayder is a plot character but not animated) |
| Ralph | Ralph | Security guard / contractor |

### NPCs with SOUND Only (Phone/Off-Screen)

| Character | Context |
|-----------|---------|
| Bess | Phone calls |
| George | Phone calls |
| Ned | Phone calls |
| Connie | Union scene — leftover from SCK, not in STFD |

## What's Been Accomplished

### Fully Complete — Asset Extraction
- CIFTREE V2 archive extraction (1361 entries, 0 errors)
- Scene data decoding (1118 scenes, 3149 actions → JSON)
- BOOT.bin decoding (21 sections → JSON)
- AVF video decoding (879 files → 5351 PNG frames)
- HIS audio conversion (1283 files → WAV)
- CAL animation system fully analyzed and documented
- All 36 action types identified and named
- Character-to-CAL-to-background mapping complete
- XSHEET format fully decoded

### Fully Complete — Conversation System
- All 401 conversations decoded (168 CEL + 225 SOUND + 8 VIDEO_ALT), 0 hex fallbacks
- 379 dialogue tree entries parsed with text, target nodes, continuation scenes
- 100 set-flag entries and check-flag entries for conversation variant selection
- Full dialogue tree rendering in engine.js with three-tier routing
- Conversation stack (`convStack`) for branching through multi-choice trees with pop-back
- Sequential follow-up detection after exhausting all choices at a hub
- Investigation questions (56 across 9 NPCs including Ralph) injected into hub scene conversations
- Ralph gate guard system: 3 pass-related questions with inventory/flag conditions and signing chain flow
- Farewell/goodbye system with random response scene selection
- `POST_CONV_SCENE` mapping for reliable post-conversation navigation
- DAT address → flag/inventory mapping decoded for Game.exe cross-referencing

### Fully Complete — Browser Engine Skeleton

The engine is built and playable. Two files created in `StayTunedForDanger/`:

**`index.html`** — Host page with:
- Canvas: 535x291 native, CSS-scaled to 802x436 (`image-rendering: pixelated`)
- Conversation overlay (speaker, text, choices, continue button)
- Game-over overlay with second chance support
- Continue/New Game overlay for saved games
- Inventory bar (58x58 slots, scroll overflow)
- Status bar with scene nav input, debug toggle, back button, voice toggle
- Debug panel: scene checkpoints (S0/S5/S50/S60/S71/S1000/S100/S400), flag grid (click to cycle 0→1→2), inventory grid, day/night toggle, timer display, restart button
- Gold/dark theme matching ND1 aesthetic

**`engine.js`** (~2250 lines) — Single-file IIFE `const STFD = (() => { ... })();` with:

| System | Details |
|--------|---------|
| **Constants** | GAME_W=535, GAME_H=291, CURSOR_DEFS (8 cursors from object0.png), SPEAKERS (11 entries), ITEM_NAMES (named: 2=House Keys, 4=Employee Pass, 10=Visitor's Pass; rest placeholder), INVESTIGATION_QUESTIONS (56 questions across 9 NPCs incl. Ralph), FAREWELL_DATA (goodbye text + random scene arrays for 8 NPCs), INVESTIGATION_HUB_SCENES (9 scene→NPC mappings incl. S400=ral), NPC_MET_FLAG, POST_CONV_SCENE (6 conversation→destination mappings) |
| **State** | flags, inventory (Set), activeItem, currentSceneId, currentVariant, debugHotspots, history, timerActive, voicesEnabled, dayTime (0/1), difficulty |
| **Asset loading** | `loadImg` (Promise-based, cached), `tryLoadImg` (lowercase fallback), `imgCache` |
| **Audio** | `playSound` (0.65 vol), `setAmbient` (loop, 0.35 vol), `playConvVoice`/`stopConvVoice`, `waitForSound` |
| **Cursors** | Chroma key removal from object0.png, `extractCursor` → CSS `url()` data URIs, `gc()` lookup |
| **Conditions** | `evalCond`: flag_check (default 1), scene_variant, inventory_check, timed_flag, timer_condition, cond_0x0c (day/night from raw hex byte 1), cond_0x05/cond_0x10 (stubbed false). `condPass()`: evaluates all conditions then applies ORFlag propagation (byte 3 of 12-byte records) — conditions with `"or": true` form OR groups with their successor |
| **Timers** | `startTimer`/`stopTimer`, 2s interval check, difficulty-scaled deadlines |
| **Movies** | `playMovie` with frame-by-frame rendering, timed flag triggers, loading bar, completion flags |
| **Rendering** | `renderBackground` (with panoramic variant support), `renderSceneItems` (SHOW_INVENTORY_ITEM sprites), `renderNPCs` (PLAY_SECONDARY_VIDEO with chroma key) |
| **Panoramic scroll** | `detectPanoFrameCount` (cached, 'x'-suffix fast path), edge click/auto-pan (250ms), scroll arrows, `SCROLL_ZONE=28px` |
| **Fidget animation** | `startFidget`/`stopFidget`, idle/hover frame ranges, 60ms interval, bg snapshot restore |
| **Conversations** | Full conversation system: `showConv()` with three-tier routing (choices→continuation→pop), `convStack` for parent pop-back through choice trees, `pendingFollowUps` for sequential auto-advance after exhausting choices, `pendingConvChain`+`pendingChainDest` for hardcoded scene chains (Ralph signing flow), `pendingReturnHub` for returning to investigation hub, `getSpeaker()` node_id→name mapping, flag-based variant selection, `playConvVoice()`/`stopConvVoice()`, investigation question injection in hub scenes, farewell/goodbye with random scene selection, `POST_CONV_SCENE` for conversation exit destinations |
| **Puzzles** | All 5 types: ORDERING (sequence buttons), ROTATINGLOCK (digit dials), PASSWORD (keyboard input + blink cursor), LEVER (multi-state handles), TELEPHONE (dial pad + phone book lookup) |
| **Inventory** | `updateInventoryBar` with click-to-select/deselect, active item highlight |
| **Scene loading** | Full `loadScene` pipeline: stop fidget/pan/sounds → reset scene-local flags 0-9 → detect panoramic → render bg/items/NPCs/arrows → set ambient → process all action types → register hotspots → activate puzzle → auto-nav/conv → draw debug |
| **Click handling** | Panoramic edge scroll → EVENTFLAGS_MULTI_HS (set flags, play conditioned sounds with nav_on_end support, or reload) → SHOW_INVENTORY_ITEM pickup → PLAY_SECONDARY_VIDEO NPC click → navigation hotspots |
| **Mouse/cursors** | Panoramic auto-pan on edge hover, fidget hover detection, hotspot-type cursors (talk, hand, walk, magnify) |
| **Save/load** | localStorage with `stfd_save` key, auto-save on SAVE_CONTINUE_GAME, continue/new-game prompt on load |
| **Debug panel** | Flag grid (click to cycle), inventory grid (click to toggle), day/night toggle with scene reload |
| **Game end** | WIN_GAME/LOSE_GAME overlays, second chance from last checkpoint |
| **Public API** | init, goToScene, back, continueConv, toggleDebug, toggleVoices, toggleDayNight, debugRestart, loadSecondChance, state/scenes getters |

**Action type coverage: 31 of 34 handled:**
- ✅ All navigation (HOT_1FR_SCENE_CHANGE, HOT_1FR_EXITSCENE, HOT_MULTIFRAME_SCENE_CHANGE, SCENE_CHANGE)
- ✅ All interaction (EVENTFLAGS, EVENTFLAGS_MULTI_HS, PLAY_DIGI_SOUND, PLAY_SECONDARY_MOVIE, PLAY_SECONDARY_VIDEO, SHOW_INVENTORY_ITEM, TEXTBOX_WRITE)
- ✅ All inventory (ADD_INVENTORY, REMOVE_INVENTORY)
- ✅ All puzzles (ORDERING, ROTATINGLOCK, PASSWORD, LEVER, TELEPHONE)
- ✅ All game flow (SAVE_CONTINUE_GAME, LOSE_GAME, WIN_GAME, DIFFICULTY_LEVEL, RESET_AND_START_TIMER, STOP_TIMER, BUMP_PLAYER_CLOCK)
- ✅ All conversations (CONVERSATION_CEL, CONVERSATION_SOUND, CONVERSATION_VIDEO_ALT — full dialogue tree with choices, continuation, flag checks, investigation questions)
- ⬜ Cosmetic/unknown skipped (SPECIAL_EFFECT, OVERLAY_ANIM, SPECIAL_C8/C9/CA/CB/CC/CD)

### Key Engine Discoveries & Fixes

**Scene-local flags:** Flags 0-9 are per-scene state variables reused across hundreds of scenes (flag 0 alone appears in 267 scenes). The engine resets flags 0-9 on every scene change. This is critical — without it, flag 0 set in one scene would incorrectly trigger conditions in the next scene.

**EVENTFLAGS_MULTI_HS + PLAY_DIGI_SOUND + nav_on_end pattern:** Many scenes use a three-part pattern:
1. EVENTFLAGS_MULTI_HS registers a clickable hotspot that sets a flag (e.g., flag 0=2)
2. PLAY_DIGI_SOUND is conditioned on that flag and has `nav_on_end` (target scene after sound finishes)
3. Clicking the hotspot should: set flag → play the sound → wait for sound to end → navigate

The click handler detects nav_on_end sounds and waits for them instead of immediately reloading the scene. The `isEventFlagSound()` function identifies these sounds so they don't auto-play on scene load (they should only play on click).

**Taxi/travel sounds:** Map scenes (S60, S61, S70, S71, S72) use the EFMHS+sound+nav_on_end pattern for taxi lines (TAX01, TAX02, TAX03). S50 (first map, Mattie-only) has no taxi sound — it uses a direct HOT_1FR_SCENE_CHANGE.

**Difficulty screen (S0):** Three buttons set flags 0/1/2 respectively. The SCENE_CHANGE requires all three flags to be 2 (AND logic), but only one button is clicked. The engine handles this by special-casing S0: clicking any difficulty button directly sets `state.difficulty` and navigates to S5 without going through the flag/reload cycle.

**Day/night system (cond_0x0c):** Condition raw hex string, byte at offset 1 encodes 0=day or 1=night. Parsed as `parseInt(raw.substring(2, 4), 16)`, compared against `state.dayTime`. Toggled by BUMP_PLAYER_CLOCK action.

**PLAY_DIGI_SOUND loop_type:** `loop_type: 1` (26 occurrences) = looping/ambient sound, handled via `setAmbient()`. `loop_type: 2` (471 occurrences) = one-shot sound.

**Panoramic backgrounds:** 23 backgrounds with 16-20 frames each, all ending with 'x' suffix (SE1X, SH2X, etc.). 6 single-frame backgrounds also end with 'x' (sl4x, st1x, etc.), so the engine probes frame 1 to confirm. Frame count cached per bg_avf.

**cond_0x05 / cond_0x10:** Unknown condition types. Stubbed as `false` to prevent unwanted auto-navigation (e.g., S5→S5005 intro montage chain).

**Map system:** STFD uses in-scene maps (S50=Mattie Map/MAPA, S60=Day Map/MAPB, S61=Studio Map/MAPB, S71=Full Map/MAPC) with regular clickable hotspots. No overlay dialog like ND1.

**Conversation stack (convStack):** When a conversation has multiple player choices (e.g., Mattie's S104 hub with 4 topics), selecting a choice pushes the parent conversation onto `convStack` with the visited-choice set. After the child conversation's terminal node, pressing Continue pops back to the parent and re-shows remaining unvisited choices. When all choices are exhausted, the engine scans for sequential follow-up scenes (e.g., S109/S110 after S104's children S105-S108) and auto-advances through them.

**Post-conversation navigation (POST_CONV_SCENE):** After a conversation tree fully completes (empty stack, no pending), the engine checks `POST_CONV_SCENE[currentSceneId]` for a hardcoded destination. This avoids popping to transition/movie scenes that would loop. Current mappings: S100→S2500 (Mattie apartment), S200→S2100 (dressing room), S400→S1000 (lobby), S401/S403/S409→S1006 (lobby desk).

**Ralph gate guard (hardcoded logic):** S1000's PLAY_SECONDARY_VIDEO always points to S400, which has only one scene-data entry ("No, thank you"). The original Game.exe's `FUN_00480c00` dynamically injects 3 pass-related questions based on inventory/flag state. The engine replicates this via `INVESTIGATION_QUESTIONS.ral` with `requireNoItem`/`requireAnyItem` conditions and `chain` arrays for the signing sequence (S401→S404→S405→S1006).

**DAT address mapping breakthrough:** Game.exe's global variables at `DAT_004fdXXX` map to the flag array (base `0x004fd3fc`, 4-byte stride) and inventory array (base `0x004fd37f`, 4-byte stride). Formula: `flag_id = (addr - 0x4fd3fc) / 4`, `item_id = (addr - 0x4fd37f) / 4`. Verified via Ralph's gate conditions matching known inventory items (4=Employee Pass, 10=Visitor's Pass).

**Condition ORFlag (byte 3):** The 12-byte trailing condition records have an OR flag at byte 3 that groups adjacent conditions with OR logic instead of the default AND. When `ORFlag=1` on condition[i], it forms an OR group with condition[i+1]. This is critical for 33 scenes (91 OR-flagged conditions total), including Mattie's dressing room door (S1120), hallway navigation, and the difficulty screen. Decoded from Game.exe `FUN_00458284` which iterates conditions in 5-byte sub-records with byte 4 as the OR operator, and the scene loader at line 23912 which logs `"ORFlag: %d"` for byte 3 of each 12-byte condition record. The decoder (`stfd-scene.py`) outputs `"or": true` on affected conditions, and `condPass()` in `engine.js` propagates pass results within OR groups before requiring all conditions to pass.

### Not Yet Done

#### CAL File Extraction
The 20 CAL files have been analyzed but not bulk-extracted. A `stfd-cal.py` script is needed to:
- Extract all frames from all 20 CAL files into PNG images
- Use the same CIF TREE V2 parsing as `stfd-extract.py`
- Output to `stfd_cal_frames/[cal_name]/[frame_name].png`
- This is required before the engine can render CONVERSATION_CEL

#### CAL-Based Character Rendering During Conversations
The conversation dialogue system is fully functional (text, choices, audio, navigation), but CONVERSATION_CEL scenes do not yet render the animated NPC character. This requires:
- Extracting all frames from the 20 CAL files (see CAL File Extraction above)
- XSHEET-driven body+head compositing in engine.js
- Lip-sync timing with audio playback

Currently, CONVERSATION_CEL shows the dialogue overlay on a black background. CONVERSATION_SOUND (phone calls) works correctly since those are audio-only by design.

#### Inventory Items
The `ITEM_NAMES` in `engine.js` has 3 named items (2=House Keys, 4=Employee Pass, 10=Visitor's Pass) with the rest as placeholders (`Item N`). Need to:
- Identify remaining inventory items from `SHOW_INVENTORY_ITEM` (12) and `ADD_INVENTORY` (28) actions
- Use the DAT-to-inventory mapping formula (`item_id = (DAT_address - 0x004fd37f) / 4`) to cross-reference with `STFD.Game.exe.c`
- Update ITEM_NAMES in engine.js

#### Investigation Questions — Remaining Flag Gating
The DAT-to-flag mapping is now decoded (see DAT Address → Flag/Inventory Mapping section). Ralph's 3 gate-guard questions have exact conditions from `FUN_00480c00`. Other NPCs' questions have flag conditions implemented but may need refinement:
- Apply the mapping formula (`flag_id = (DAT_address - 0x004fd3fc) / 4`) to each NPC's question function to verify/correct flag IDs
- Some question availability flags (118-127, 112-115, etc.) may need initial values verified

#### Cosmetic Action Types
These are handled (explicitly skipped) but not rendered:
- `SPECIAL_EFFECT` (130) — visual overlays like "ON AIR" light, green light indicator, printer tray
- `OVERLAY_ANIM` (9) — animated overlays on backgrounds
- `SPECIAL_C8`, `SPECIAL_C9`, `SPECIAL_CA`, `SPECIAL_CB`, `SPECIAL_CC`, `SPECIAL_CD` — unknown special actions (10 total across 6 types)

#### Unknown Condition Types
- `cond_0x05` — appears in intro sequences (S5→S5005 montage) and various conversation scenes. Possibly "scene visited before" or "intro already played" check. Currently stubbed `false`.
- `cond_0x10` — appears rarely. Currently stubbed `false`.

## Key File Paths

| File | Purpose |
|------|---------|
| `MASTER_PROMPT.md` (parent dir) | ND1 engine documentation — reference for patterns |
| `engine.js` (parent dir) | ND1 engine (~3865 lines) — reference implementation |
| `StayTunedForDanger/index.html` | **STFD engine host page** |
| `StayTunedForDanger/engine.js` | **STFD engine** (~2120 lines) |
| `StayTunedForDanger/stfd_scenes.json` | All scene data (1118 scenes) |
| `StayTunedForDanger/stfd_boot.json` | Game config (viewports, map, cursors, fonts) |
| `StayTunedForDanger/stfd_avf_frames/` | Background/video PNG frames (5351 files, 23 panoramic bgs) |
| `StayTunedForDanger/stfd_audio/` | All audio as WAV (1283 files) |
| `StayTunedForDanger/stfd_images/` | Sprite/UI PNGs from CIFTREE (75 files, includes object0.png cursors) |
| `StayTunedForDanger/CD/Game/*.cal` | CAL files (20 files, need extraction) |
| `StayTunedForDanger/stfd_extracted/*.bin` | Raw data including 163 XSHEET files |
| `StayTunedForDanger/Game.exe.c` | Ghidra decompilation (4.5 MB, 159,972 lines) |
| `StayTunedForDanger/CAL_ANIMATION_SYSTEM.md` | Complete CAL system analysis |

## Binary Format Quick Reference

### LZSS Decompression
Window: 0x1000 bytes, init: 0x20 fill, start position: 0xFEE. Flag byte controls 8 operations: bit=1 → literal byte, bit=0 → (offset, length) back-reference.

### Positional Decrypt
`decrypted[i] = (encrypted[i] - i) & 0xFF`

### RGB555 Pixel Format
16-bit little-endian: `R[15:11] G[10:6] B[5:1]`, each channel scaled `<< 3`.

### IFF Scene Chunk Format
Big-endian sizes. Chunks: `SCENSSUM` (125B summary), `ACT\x00` (variable-size actions). Odd-sized chunks padded with 1 byte.

## Investigation Questions (Notebook System)

STFD uses a **notebook topic system** instead of ND1's direct dialogue menu questions. Nancy's notebook contains entries representing things she has learned or needs to investigate. Clicking an entry plays the NPC's response scene. The system is defined in `STFD.Game.exe.c` at lines 97848–100660.

Key differences from ND1:
- No question ID prefix system (no "DIC1", "CIC1" equivalents — questions keyed by scene number only)
- Questions are Nancy's internal thoughts, not direct dialogue
- 8 NPCs participate (vs ND1's 4)
- Phone NPCs (Ned, Bess, George) have substantial question sets

### Dwayne Powers (office, bg=ME2M) — 8 questions

| # | Text | Response Scene |
|---|------|---------------|
| 1 | "Have you met the prop master at Worldwide? She seems...rather strange." | S816 |
| 2 | "I'm afraid that I'm not making a very good impression on Lillian. She doesn't seem to like me very much." | S817 |
| 3 | "Do you know how I could get into the control room at the studio?" | S820 |
| 4 | "Can I get a pass that let's me get into the studio during the night?" | S821 |
| 5 | "I'm afraid I've upset Lillian - did she call about terminating my employment with the studio?" | S823 |
| 6 | "Do you have many employees working for you at Worldwide?" | S824 |
| 7 | "What do you make of these threats against Rick? Mattie's very concerned about them." | S826 |
| 8 | "The producer seems pretty upset lately - he's always yelling." | S829 |

Goodbye: "Well, I should get back to the set. Thanks for your help." → random S890–S893

### Rick Arlen (dressing room, bg=RICDBG) — 4 questions

| # | Text | Response Scene |
|---|------|---------------|
| 1 | "Tell me Rick, do you know a guy by the name of Owen Spayder?" | S729 |
| 2 | "What's the story with the prop master?" | S728 |
| 3 | "Can I ask your advice? Dwayne Powers is my agent - he's pretty good isn't he?" | S717 |
| 4 | "So tell me Rick, who haven't you dated on 'Light Of Our Love'? You've got quite a reputation on the set." | S721 |

Goodbye: "Listen, I gotta' go, Rick. Be careful, Okay?" → random S791–S794

### Millie Strathorn (prop room, bg=PMBK) — 2 questions

| # | Text | Response Scene |
|---|------|---------------|
| 1 | "It must be wonderful to work with Rick Arlen. Is he really that exciting in real life as he is on stage?" | S317 |
| 2 | "Do you know where I can find Owen Spayder? He's a stage hand, I believe." | S321 |

Goodbye: "I should get back to the set. Goodbye!" → random S391/S392/S394

### Lillian Weiss (office, bg=LIOFBK) — 4 questions

| # | Text | Response Scene |
|---|------|---------------|
| 1 | "I thought you might be interested to know that I found a light clamp on the set. It looked as if it had been sawed off. That was no accident on the set - it was a deliberate attempt on Rick's life." | S503 |
| 2 | "Can I ask your advice on something? Rick's really been flirty with me - should I take him seriously?" | S504 |
| 3 | "Can you tell me something about Owen Spayder?" | S510 |
| 4 | "Lillian, I have reason to believe you're the one threatening Rick. I know for a fact you sent him those chocolates." | S512 |

Goodbye: "Well, I'll let you get back to your business." → random S590/S591/S593

### Ned Nickerson (phone, bg=ME2M) — 9 questions

| # | Text | Response Scene |
|---|------|---------------|
| 1 | "I finally met the Rick Arlen. That man has an ego the size of Texas - he's worse than Daryl Gray!" | S3007 |
| 2 | "Ned, are you very good at riddles?" | S3010 |
| 3 | "What do you think I should look for on that death threat tape?" | S3013 |
| 4 | "There's a locked area of the prop room. I wonder what the prop master is hiding there." | S3014 |
| 5 | "I got into the locked area of the prop room and found an employee ID for one of Dwayne's contract workers, Owen Spayder." | S3015 |
| 6 | "Guess what, I got a look at the letters Rick has been getting. Some of them have the letters cut out of magazines and some of them are typewritten. But get this, the 'Y' is dropped on the typewritten ones." | S3016 |
| 7 | "This case is getting stranger by the minute. Now I found out that the prop master has a typewriter and guess what? The Y's on her machine are dropped!" | S3017 |
| 8 | "I'd like to get into the studio at night, but it's locked. Any ideas?" | S3019 |
| 9 | "I found a side entrance to the studio, but there's a keypad lock on it." | S3020 |

Goodbye: → random S3090/S3092/S3093

### Bess Marvin (phone, bg=ME2M) — 18 questions

| # | Text | Response Scene |
|---|------|---------------|
| 1 | "I need to get into Lillian's office at night. I think there's more to her than meets the eye." | S3123 |
| 2 | "Now I need to find an access code to the system computers." | S3124 |
| 3 | "If only I could find the password into the control room." | S3125 |
| 4 | "I can't get the employee log to print." | S3127 |
| 5 | "You'll never guess what I found in Lillian's office. A bottle of castor oil." | S3128 |
| 6 | "Lillian must've been the one who sent Rick those threats. I found a bottle of castor oil and the number of a chocolate shop in her drawer." | S3129 |
| 7 | "Lillian just kicked me off the set!" | S3130 |
| 8 | "I found the sound mixer but am not sure what I am looking for." | S3131 |
| 9 | "If only I could find a surveillance video." | S3133 |
| 10 | "I found an employee badge for an Owen Spayder in the lost and found." | S3136 |
| 11 | "I found Millie's computer login." | S3137 |
| 12 | "I really need to get into Dwayne's office. I need to find more information on this Owen Spayder guy. Do you think I should sneak into Dwayne's office?" | S3138 |
| 13 | "I can't get into Dwayne's office." | S3139 |
| 14 | "I can't get into Dwayne's briefcase." | S3140 |
| 15 | "Dwayne's agency is not doing so well. I found all of these outstanding bills. I also found several checks that Mattie wrote to Dwayne." | S3141 |
| 16 | "I found out that Owen Spayder worked at the same theater where Dwayne and Mattie met." | S3142 |
| 17 | "Oh Bess, this is awful. I just got a phony bomb threat in the mail!" | S3144 |
| 18 | "Lillian just called me. She wants me to meet her at the studio. Do you think I should go?" | S3145 |

Goodbye: "I'll talk to you later. Bye!" → S3190

### George Fayne (phone, bg=ME2M) — 6 questions

| # | Text | Response Scene |
|---|------|---------------|
| 1 | "Mattie got me a visitor's pass, but I don't see it anywhere." | S3207 |
| 2 | "I wonder how I can get into the sound stage." | S3209 |
| 3 | "Rick was almost killed by a falling klieg light!" | S3210 |
| 4 | "I'm officially an extra on the set, but there's not much to do." | S3213 |
| 5 | "Are you any good at riddles?" | S3214 |
| 6 | "I found a pair of wire cutters!" | S3215 |

Goodbye: "Talk to you later." → S3290

### Ralph (gate guard, bg=RLBK) — 3 questions

Ralph is a gatekeeper NPC, not a standard conversational NPC. His hub is S400 ("Can I help you?") which has one built-in entry "No, thank you - just looking" that acts as the goodbye option. His questions are pass-related actions with hardcoded conditions decoded from `FUN_00480c00`.

| # | Text | Response Scene | C Code Condition | Decoded Condition | Nancy Voice | Chain |
|---|------|---------------|-----------------|-------------------|-------|
| 1 | "Yes, Mattie Jensen left a visitor's pass for me." | S401 | `inv[10]==1 && inv[4]==1 && flag[61]==1` | No passes yet + pre-klieg-light | ng01 | → S404 → S405 → S1006 |
| 2 | "Hi, I've been hired as an extra by the Powers Agency." | S403 | `inv[4]==1 && flag[117]==2` | No employee pass + Dwayne hired Nancy | ng02 | → S406 → S407 → S1006 |
| 3 | "Hello...here is my pass." | S409 | `inv[10]==2 \|\| inv[4]==2` | Has any pass (daily sign-in) | ng04 | → S1006 |

**Scene chain after getting a pass:**
- S401/S403: "Here you are. You'll need to sign for it." + ADD_INVENTORY (item 10 or 4)
- S404/S406: "You'll need to come to this desk every time you enter so I can log you in."
- S405/S407: "Have a nice day." + SPECIAL_EFFECT (signature animation)
- S1006: Lobby desk → S1100 (studio hallway access)

No goodbye/farewell function — the scene's built-in "No, thank you - just looking" (→ S1000) serves as the exit option.

### Mattie Jensen (dressing room, bg=MJDRBK) — 2 questions

| # | Text | Response Scene |
|---|------|---------------|
| 1 | "Did Lillian and Rick date after you both broke up?" | S215 |
| 2 | "Tell me, do you know someone by the name of Owen Spayder?" | S230 |

Goodbye: "Well, I'll see you later, Mattie." → random S290–S293

### Investigation Questions Summary

| NPC | Questions | Goodbye Scenes | Source Function |
|-----|-----------|----------------|----------------|
| Dwayne (office) | 8 | S890–S893 | `FUN_0047d8a0` |
| Rick (dressing room) | 4 | S791–S794 | `FUN_0047e090` |
| Millie (prop room) | 2 | S391/S392/S394 | `FUN_0047e480` |
| Lillian (office) | 4 | S590/S591/S593 | `FUN_0047e680` |
| Ned (phone) | 9 | S3090/S3092/S3093 | `FUN_0047ea90` |
| Bess (phone) | 18 | S3190 | `FUN_0047f3e0` |
| George (phone) | 6 | S3290 | `FUN_004805e0` |
| Ralph (gate) | 3 | (none) | `FUN_00480c00` |
| Mattie (dressing room) | 2 | S290–S293 | `FUN_00480f10` |
| **Total** | **56** | | |

#### DAT Address → Flag/Inventory Mapping (Decoded)

The `DAT_004fdXXX` global variables in Game.exe map to the engine's flag and inventory systems via two arrays:

| Array | Base Address | Element Size | Access Pattern |
|-------|-------------|-------------|----------------|
| **Flags** | `DAT_004fd3fc` | 4 bytes (int) | `flag[N]` = `*(base + N*4)` |
| **Inventory** | `DAT_004fd37f` | 4 bytes (int) | `inventory[N]` = `*(base + N*4)` |

Values: `1` = default/not-owned, `2` = set/owned. Engine defaults flags to 1 via `state.flags[id] ?? 1`.

**To convert a DAT address to a flag ID:** `flag_id = (DAT_address - 0x004fd3fc) / 4`
**To convert a DAT address to an inventory item:** `item_id = (DAT_address - 0x004fd37f) / 4`

Example mappings verified via Ralph's gate guard logic (`FUN_00480c00`):
| DAT Address | Mapping | Meaning |
|-------------|---------|---------|
| `DAT_004fd38f` | `inventory[4]` | Employee Pass |
| `DAT_004fd3a7` | `inventory[10]` | Visitor's Pass |
| `DAT_004fd4f0` | `flag[61]` | Klieg light incident (1=pre, 2=post) |
| `DAT_004fd5d0` | `flag[117]` | Dwayne hired Nancy (set by S811/dwa14) |

#### Key Game State Flags

| Flag | Set By | Meaning | Values |
|------|--------|---------|--------|
| 48 | S800 hub | Met Dwayne | 1=no, 2=yes |
| 49 | initialFlags | Mattie's den accessible | 2 (hardcoded initial) |
| 50 | S301 hub | Met Millie | 1=no, 2=yes |
| 52 | S700 hub | Met Rick | 1=no, 2=yes |
| 61 | klieg light sequence | Klieg light incident | 1=pre-accident, 2=post-accident |
| 104 | S100/Mat01 | Met Mattie | 1=no, 2=yes |
| 117 | S811/dwa14 | Dwayne hired Nancy | 1=no, 2=yes |
| 220 | S115/Mat17 | Studio map version | 1=MAP2B, 2=MAP3B |

**Implementation status:** All 56 questions across 9 NPCs (including Ralph's 3 gate-guard questions) are implemented in engine.js with flag and inventory conditions. Ralph's questions use the exact conditions decoded from `FUN_00480c00` with `requireNoItem`, `requireNoItem2`, `requireAnyItem`, and `chain` properties. Other NPCs' questions use flag-based conditions from the `DAT_004fdXXX` pattern (availability flags default to 1, set to 2 when asked). Most question flag conditions are implemented but some may need refinement as more DAT addresses are mapped.
