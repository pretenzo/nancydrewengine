#!/usr/bin/env python3
"""
Nancy Drew 1: Secrets Can Kill - Scene Decoder v2
Decodes DATA files extracted from CifTree.dat.

IFF-style format (big-endian sizes, even-boundary padding):
  File     = "DATA"(4) + total_size(4 BE) + chunks
  SCENSSUM = 8-char-tag + size(4 BE) + 125-byte payload
  ACT      = "ACT\x00"(4) + size(4 BE) + payload

SCENSSUM payload layout (125 bytes):
  0x00-0x1f  description string (32 bytes, null-padded)
  0x20-0x31  unknown / padding (always zero in scene files)
  0x32-0x39  background AVF basename (8 bytes, null-padded)
  0x3a-0x3b  unknown (0x0000)
  0x3c-0x3d  scene_type? (always 0x0002)
  0x3e-0x3f  always 0x0002
  0x40-0x47  ambient sound basename (8 bytes, null-padded)
  0x48-0x7c  display/timing params (mostly constants, last short varies)

ACT payload layout:
  0x00-0x1f  name string (32 bytes, null-padded)
  0x20-0x2f  unknown / padding
  0x30       action type byte
  0x31       subtype / flags byte
  0x32-end   type-specific data (little-endian)

Action types (from decompiled Game_exe.c case statements):
  0x0a  HOT_1FR_SCENE_CHANGE       26 bytes: scene(u16) pad(u16) frame(u16) flags(u16) x1(u16) pad y1(u16) pad x2(u16) pad y2(u16) pad
  0x0b  HOT_MULTIFRAME_SCENE_CHANGE  variable
  0x0c  SCENE_CHANGE               8 bytes: scene(u32) frame(u16) flags(u16)  (+timer shorts follow)
  0x0d  HOT_MULTIFRAME_MULTISCENE  variable
  0x0e  HOT_1FR_EXITSCENE          26 bytes: same layout as 0x0a
  0x16  START_FRAME_NEXT_SCENE     4 bytes
  0x1e  STOP_PLAYER_SCROLLING      1 byte
  0x1f  START_PLAYER_SCROLLING     1 byte
  0x32  CONVERSATION_VIDEO         variable (large text payload)
  0x33  PLAY_SECONDARY_VIDEO       variable (AVF name + frame data)
  0x35  PLAY_SECONDARY_MOVIE       variable (movie name)
  0x36  OVERLAY                    variable (image name + frame data)
  0x37  OVERLAY_HOT                variable (image name + frame data)
  0x3c  MAP_CALL                   1 byte?
  0x3d  MAP_CALL_HOT_1FR           0x12=18 bytes
  0x3e  MAP_CALL_HOT_MULTIFRAME    variable
  0x3f  MAP_LOCATION_ACCESS        4 bytes
  0x42  MAP_SOUND                  0x10=16 bytes
  0x43  MAP_AVI_OVERRIDE           2 bytes
  0x44  MAP_AVI_OVERRIDE_OFF       1 byte
  0x4b  TEXTBOX_WRITE              variable (text string payload)
  0x4c  TEXTBOX_CLEAR              1 byte
  0x64  BUMP_PLAYER_CLOCK          5 bytes
  0x65  SAVE_CONTINUE_GAME         1 byte
  0x66  TURN_OFF_MAIN_RENDERING    1 byte
  0x67  TURN_ON_MAIN_RENDERING     1 byte
  0x68  RESET_AND_START_TIMER      1 byte
  0x69  STOP_TIMER                 1 byte
  0x6a  EVENTFLAGS_MULTI_HS        variable
  0x6b  EVENTFLAGS                 0x28=40 bytes (10 x [flag_id(i16), value(i16)], -1=unused)
  0x6c  ORDERING_PUZZLE            0x26d bytes
  0x6d  LOSE_GAME                  1 byte
  0x6e  PUSH_SCENE                 1 byte
  0x6f  POP_SCENE                  1 byte
  0x70  WIN_GAME                   1 byte
  0x71  DIFFICULTY_LEVEL           6 bytes
  0x72  ROTATINGLOCK_PUZZLE        0x2a4 bytes
  0x73  LEVER_PUZZLE               0x192 bytes
  0x74  TELEPHONE                  0x2016 bytes
  0x75  SLIDER_PUZZLE              0x544 bytes
  0x76  PASSWORD_PUZZLE            0xd7 bytes
  0x96  PLAY_DIGI_SOUND            vol(u8) flags(u8) name(8 bytes null-padded) + params
  0x97  PLAY_DIGI_SOUND_2          0x2b bytes
  0x98  PLAY_SOUND_PAN_FRAME       0x20 bytes
  0x99  PLAY_SOUND_MULTI_HS        variable
  0xa0  HINT_SYSTEM                0x23 bytes
"""

import struct, os, json

# ── Action type registry ───────────────────────────────────────────────────
ACTION_TYPES = {
    0x0a: "HOT_1FR_SCENE_CHANGE",
    0x0b: "HOT_MULTIFRAME_SCENE_CHANGE",
    0x0c: "SCENE_CHANGE",
    0x0d: "HOT_MULTIFRAME_MULTISCENE",
    0x0e: "HOT_1FR_EXITSCENE",
    0x16: "START_FRAME_NEXT_SCENE",
    0x1e: "STOP_PLAYER_SCROLLING",
    0x1f: "START_PLAYER_SCROLLING",
    0x32: "CONVERSATION_VIDEO",
    0x33: "PLAY_SECONDARY_VIDEO",
    0x34: "PLAY_SECONDARY_MOVIE_B",
    0x35: "PLAY_SECONDARY_MOVIE",
    0x36: "OVERLAY",
    0x37: "OVERLAY_HOT",
    0x3c: "MAP_CALL",
    0x3d: "MAP_CALL_HOT_1FR",
    0x3e: "MAP_CALL_HOT_MULTIFRAME",
    0x3f: "MAP_LOCATION_ACCESS",
    0x42: "MAP_SOUND",
    0x43: "MAP_AVI_OVERRIDE",
    0x44: "MAP_AVI_OVERRIDE_OFF",
    0x4b: "TEXTBOX_WRITE",
    0x4c: "TEXTBOX_CLEAR",
    0x64: "BUMP_PLAYER_CLOCK",
    0x65: "SAVE_CONTINUE_GAME",
    0x66: "TURN_OFF_MAIN_RENDERING",
    0x67: "TURN_ON_MAIN_RENDERING",
    0x68: "RESET_AND_START_TIMER",
    0x69: "STOP_TIMER",
    0x6a: "EVENTFLAGS_MULTI_HS",
    0x6b: "EVENTFLAGS",
    0x6c: "ORDERING_PUZZLE",
    0x6d: "LOSE_GAME",
    0x6e: "PUSH_SCENE",
    0x6f: "POP_SCENE",
    0x70: "WIN_GAME",
    0x71: "DIFFICULTY_LEVEL",
    0x72: "ROTATINGLOCK_PUZZLE",
    0x73: "LEVER_PUZZLE",
    0x74: "TELEPHONE",
    0x75: "SLIDER_PUZZLE",
    0x76: "PASSWORD_PUZZLE",
    0x78: "ADD_INVENTORY_NO_HS",
    0x7a: "SHOW_INVENTORY_ITEM",
    0x96: "PLAY_DIGI_SOUND",
    0x97: "PLAY_DIGI_SOUND_2",
    0x98: "PLAY_SOUND_PAN_FRAME",
    0x99: "PLAY_SOUND_MULTI_HS",
    0xa0: "HINT_SYSTEM",
}

# ── Helpers ────────────────────────────────────────────────────────────────
def cstr(data, offset=0, maxlen=256):
    end = data.find(b'\x00', offset, offset + maxlen)
    if end == -1:
        end = min(offset + maxlen, len(data))
    return data[offset:end].decode('ascii', errors='replace')

def u16(d, o):  return struct.unpack('<H', d[o:o+2])[0] if o+2 <= len(d) else 0
def i16(d, o):  return struct.unpack('<h', d[o:o+2])[0] if o+2 <= len(d) else 0
def u32(d, o):  return struct.unpack('<I', d[o:o+4])[0] if o+4 <= len(d) else 0

# ── SCENSSUM decoder ───────────────────────────────────────────────────────
def decode_scenssum(payload):
    """Decode 125-byte SCENSSUM payload."""
    return {
        "description":  cstr(payload, 0x00, 32),
        "bg_avf":       cstr(payload, 0x32, 8),   # background AVF basename
        "scene_type":   u16(payload, 0x3c),        # always 2 in scene files
        "ambient_snd":  cstr(payload, 0x40, 8),   # ambient sound basename
        # display / timing params at 0x48 are mostly engine-internal constants
    }

# ── ACT record decoder ─────────────────────────────────────────────────────
def decode_act(payload):
    """Decode one ACT record payload."""
    if len(payload) < 0x33:
        return {"name": "?", "type": "SHORT_PAYLOAD", "raw": payload.hex()}

    name     = cstr(payload, 0x00, 32)
    act_type = payload[0x30]
    subtype  = payload[0x31]
    d        = payload[0x32:]          # type-specific data portion

    base = {
        "name":    name,
        "type":    ACTION_TYPES.get(act_type, f"UNKNOWN_0x{act_type:02x}"),
        "subtype": subtype,
    }

    # ── Navigate: single-frame hotspot → scene change ──────────────────────
    if act_type in (0x0a, 0x0e):      # HOT_1FR_SCENE_CHANGE / HOT_1FR_EXITSCENE
        # 26 bytes: i32 scene, u16 frame, u16 flags, u16 pad, 4x i32 coords
        return {**base,
            "target_scene": u32(d, 0),
            "target_frame": u16(d, 4),
            "flags":        u16(d, 6),
            "hotspot":      [u32(d, 10), u32(d, 14), u32(d, 18), u32(d, 22)],  # x1,y1,x2,y2
        }

    # ── Navigate: multi-frame hotspot → scene change ───────────────────────
    if act_type in (0x0b, 0x0d):
        # i32 target_scene, u16 frame, u16 flags, u16 num_frames
        # then num_frames × 18-byte entries: u16 frame_num, i32 x1, i32 y1, i32 x2, i32 y2
        # optional trailing 12 bytes: u8 cond_type, u8 flag_id, u16 flag_val, u64 pad
        num_frames = u16(d, 8)
        frames = []
        for i in range(num_frames):
            b = 10 + i * 18
            if b + 18 <= len(d):
                frames.append({
                    "frame":   u16(d, b),
                    "hotspot": [struct.unpack('<i', d[b+2:b+6])[0],
                                struct.unpack('<i', d[b+6:b+10])[0],
                                struct.unpack('<i', d[b+10:b+14])[0],
                                struct.unpack('<i', d[b+14:b+18])[0]],
                })
        tail_off = 10 + num_frames * 18
        condition = None
        if tail_off + 4 <= len(d):
            condition = {"flag": d[tail_off+1], "value": u16(d, tail_off+2)}
        result = {**base,
            "target_scene": u32(d, 0),
            "target_frame": u16(d, 4),
            "flags":        u16(d, 6),
            "frames":       frames,
        }
        if condition:
            result["condition"] = condition
        return result

    # ── Navigate: direct scene change (no hotspot) ─────────────────────────
    if act_type == 0x0c:
        return {**base,
            "target_scene": u32(d, 0),
            "target_frame": u16(d, 4),
            "flags":        u16(d, 6),
        }

    # ── Event flags: conditional state checks ──────────────────────────────
    if act_type == 0x6b:              # EVENTFLAGS (40 bytes = 10 pairs)
        pairs = []
        for i in range(10):
            fi = i16(d, i * 4)
            fv = i16(d, i * 4 + 2)
            if fi != -1:
                pairs.append({"flag": fi, "value": fv})
        return {**base, "conditions": pairs}

    if act_type == 0x6a:              # EVENTFLAGS_MULTI_HS (variable)
        num = u16(d, 0)
        pairs = []
        for i in range(num):
            fi = i16(d, 2 + i * 4)
            fv = i16(d, 4 + i * 4)
            pairs.append({"flag": fi, "value": fv})
        return {**base, "num_conditions": num, "conditions": pairs}

    # ── Sound ──────────────────────────────────────────────────────────────
    if act_type in (0x96, 0x97):      # PLAY_DIGI_SOUND
        # data = sound_name(8 bytes) + params: 0, loop_type, ?, vol, loop_count, 0, 2, priority
        params = [u16(d, 8+i*2) for i in range(8)] if len(d) >= 24 else []
        return {**base,
            "sound_file": cstr(d, 0, 8),
            "loop_type":  params[1] if len(params) > 1 else 0,
            "volume":     params[7] if len(params) > 7 else 0,
        }

    if act_type == 0x98:              # PLAY_SOUND_PAN_FRAME (0x20 bytes)
        return {**base,
            "sound_file": cstr(d, 0, 8),
            "pan":        i16(d, 8),
            "volume":     i16(d, 10),
        }

    if act_type == 0x99:              # PLAY_SOUND_MULTI_HS
        num = u16(d, 0)
        return {**base, "num_sounds": num, "sound_file": cstr(d, 2, 8)}

    # ── Map / navigation overlay ───────────────────────────────────────────
    if act_type == 0x3d:              # MAP_CALL_HOT_1FR (0x12 = 18 bytes)
        return {**base,
            "map_flags":  u16(d, 0),
            "num_hotspots": u16(d, 2),
            "hotspots":   [[u16(d, 4+i*4), u16(d, 6+i*4)] for i in range(u16(d, 2))],
        }

    if act_type == 0x3e:              # MAP_CALL_HOT_MULTIFRAME
        num = u16(d, 0)
        return {**base, "num_frames": num}

    if act_type == 0x3f:              # MAP_LOCATION_ACCESS (4 bytes)
        return {**base, "location_id": u32(d, 0)}

    if act_type == 0x42:              # MAP_SOUND (16 bytes)
        return {**base, "sound_file": cstr(d, 0, 8), "volume": u16(d, 8)}

    # ── Overlay animation ──────────────────────────────────────────────────
    if act_type in (0x33, 0x35, 0x36, 0x37):  # video/overlay types
        return {**base,
            "asset_name": cstr(d, 0, 8),
            "num_frames": u16(d, 8),
        }

    if act_type == 0x34:              # PLAY_SECONDARY_MOVIE_B
        return {**base, "asset_name": cstr(d, 0, 8)}

    # ── Conversation video ─────────────────────────────────────────────────
    if act_type == 0x32:
        # Large block: starts with 4-byte header, then conversation text chunks
        char_id = u16(d, 0)
        convo_id = u16(d, 2)
        # Find dialogue text - scan for readable strings
        text_chunks = []
        i = 4
        while i < len(d) - 4:
            if 32 <= d[i] < 127:
                j = i
                s = ''
                while j < len(d) and 32 <= d[j] < 127:
                    s += chr(d[j]); j += 1
                if len(s) >= 6 and not s.startswith('dummy'):
                    text_chunks.append(s.strip())
                i = j
            else:
                i += 1
        return {**base,
            "char_id":    char_id,
            "convo_id":   convo_id,
            "dialogue":   text_chunks[:5],  # first few chunks
        }

    # ── Push / pop scene stack ─────────────────────────────────────────────
    if act_type in (0x6e, 0x6f):      # PUSH_SCENE / POP_SCENE
        return {**base, "scene_id": u16(d, 0) if len(d) >= 2 else 0}

    # ── Textbox ────────────────────────────────────────────────────────────
    if act_type == 0x4b:              # TEXTBOX_WRITE
        return {**base, "text": cstr(d, 0, 128)}

    # ── Inventory ──────────────────────────────────────────────────────────
    if act_type == 0x78:              # ADD_INVENTORY_NO_HS
        return {**base, "item_id": u16(d, 0)}

    if act_type == 0x7a:              # SHOW_INVENTORY_ITEM
        return {**base, "item_id": u16(d, 0), "sprite_sheet": cstr(d, 2, 8)}

    # ── Telephone ─────────────────────────────────────────────────────────
    if act_type == 0x74:
        return {**base, "phone_data_size": len(d)}

    # ── Timer control ──────────────────────────────────────────────────────
    if act_type in (0x68, 0x69):      # RESET_AND_START_TIMER / STOP_TIMER
        return {**base}

    # ── Game state ─────────────────────────────────────────────────────────
    if act_type in (0x70, 0x6d):      # WIN_GAME / LOSE_GAME
        return {**base}

    if act_type == 0x71:              # DIFFICULTY_LEVEL (6 bytes)
        return {**base, "difficulty": u16(d, 0)}

    if act_type == 0x64:              # BUMP_PLAYER_CLOCK
        return {**base, "amount": u16(d, 0)}

    # ── Puzzles ────────────────────────────────────────────────────────────
    if act_type == 0x6c:              # ORDERING_PUZZLE
        return {**base, "puzzle_size": len(d)}

    if act_type == 0x72:              # ROTATINGLOCK_PUZZLE
        return {**base, "puzzle_size": len(d)}

    if act_type == 0x73:              # LEVER_PUZZLE
        return {**base, "puzzle_size": len(d)}

    if act_type == 0x75:              # SLIDER_PUZZLE
        return {**base, "puzzle_size": len(d)}

    if act_type == 0x76:              # PASSWORD_PUZZLE
        return {**base, "puzzle_size": len(d)}

    # ── Misc ───────────────────────────────────────────────────────────────
    if act_type == 0xa0:              # HINT_SYSTEM
        return {**base, "hint_data": d[:0x23].hex() if len(d) >= 0x23 else d.hex()}

    # Fallthrough: dump raw
    return {**base, "raw": d[:32].hex(), "data_len": len(d)}


# ── File walker ────────────────────────────────────────────────────────────
def decode_data_file(data):
    if data[:4] != b'DATA':
        return None

    # SCENSSUM chunk (8-byte tag + 4-byte BE size + payload)
    tag8_end = 8 + 8 + 4
    scenssum_size = struct.unpack('>I', data[16:20])[0]
    scenssum_payload = data[20:20 + scenssum_size]
    scene = {"summary": decode_scenssum(scenssum_payload), "actions": []}

    offset = 20 + scenssum_size
    if scenssum_size % 2 == 1:
        offset += 1

    # ACT chunks (4-byte tag + 4-byte BE size + payload)
    while offset + 8 <= len(data):
        while offset < len(data) and data[offset] == 0:
            offset += 1
        if offset + 8 > len(data):
            break
        if data[offset:offset+4] != b'ACT\x00':
            break

        act_size = struct.unpack('>I', data[offset+4:offset+8])[0]
        act_payload = data[offset+8:offset+8+act_size]
        offset += 8 + act_size
        if act_size % 2 == 1:
            offset += 1

        scene["actions"].append(decode_act(act_payload))

    return scene


# ── Main ───────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    DATA_DIR = '/home/claude/nd1_extracted'
    OUT_JSON = '/mnt/user-data/outputs/nd1_scenes_v2.json'
    OUT_TXT  = '/mnt/user-data/outputs/nd1_scenes_v2.txt'

    all_scenes = {}

    for fname in sorted(os.listdir(DATA_DIR)):
        if not fname.endswith('.bin'):
            continue
        with open(f'{DATA_DIR}/{fname}', 'rb') as f:
            d = f.read()
        if d[:4] != b'DATA':
            continue

        name   = fname[:-4]
        result = decode_data_file(d)
        if result:
            all_scenes[name] = result

    # ── JSON output ────────────────────────────────────────────────────────
    with open(OUT_JSON, 'w') as f:
        json.dump(all_scenes, f, indent=2)

    # ── Human-readable text output ─────────────────────────────────────────
    lines = []
    for sname, scene in sorted(all_scenes.items(), key=lambda x: x[0]):
        s = scene['summary']
        lines.append(f"\n{'='*70}")
        lines.append(f"SCENE {sname}")
        lines.append(f"  Description : {s['description']}")
        lines.append(f"  Background  : {s['bg_avf'] or '(none)'}")
        lines.append(f"  Ambient SFX : {s['ambient_snd'] or '(none)'}")

        for act in scene['actions']:
            t    = act.get('type', '?')
            n    = act.get('name', '?')
            sub  = act.get('subtype', 0)

            # Format key fields per type
            detail = ''
            if 'target_scene' in act:
                detail = f"→ scene {act['target_scene']}"
                if 'target_frame' in act and act['target_frame']:
                    detail += f" frame {act['target_frame']}"
                if 'hotspot' in act:
                    hs = act['hotspot']
                    detail += f"  hs:({hs[0]},{hs[1]})-({hs[2]},{hs[3]})"
                if 'frames' in act and act['frames']:
                    f0 = act['frames'][0]
                    if 'hotspot' in f0:
                        hs = f0['hotspot']
                        detail += f"  frame0_hs:({hs[0]},{hs[1]})-({hs[2]},{hs[3]})"
                if 'condition' in act:
                    c = act['condition']
                    detail += f"  IF flag[{c['flag']}]=={c['value']}"
            elif 'conditions' in act:
                conds = ', '.join(f"flag[{c['flag']}]=={c['value']}" for c in act['conditions'])
                detail = f"IF {conds}"
            elif 'sound_file' in act:
                vol = act.get('volume', '?')
                detail = f"'{act['sound_file']}' vol={vol}"
            elif 'asset_name' in act:
                detail = f"'{act['asset_name']}'"
            elif 'dialogue' in act and act['dialogue']:
                detail = f"'{act['dialogue'][0][:60]}'"
            elif 'text' in act and act['text']:
                detail = f"'{act['text'][:60]}'"
            elif 'puzzle_size' in act:
                detail = f"({act['puzzle_size']} bytes puzzle data)"

            lines.append(f"  [{t}] \"{n}\"  {detail}")

    with open(OUT_TXT, 'w') as f:
        f.write('\n'.join(lines))

    # ── Summary stats ──────────────────────────────────────────────────────
    type_counts = {}
    for scene in all_scenes.values():
        for act in scene['actions']:
            t = act.get('type', '?')
            type_counts[t] = type_counts.get(t, 0) + 1

    print(f"Decoded {len(all_scenes)} scene files")
    print(f"\nAction type breakdown:")
    for t, c in sorted(type_counts.items(), key=lambda x: -x[1]):
        print(f"  {t:<35s}: {c:4d}")
    print(f"\n→ {OUT_JSON}")
    print(f"→ {OUT_TXT}")
