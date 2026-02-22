#!/usr/bin/env python3
"""
nd1-scene.py — Nancy Drew: Secrets Can Kill — Scene Decoder v3
Decodes all 587 scene DATA files extracted from CifTree.dat.

IFF-style format (big-endian chunk sizes, even-boundary padding):
  File      = "DATA"(4) + total_size(4 BE) + chunks
  SCENSSUM  = "SCENSSUM"(8) + size(4 BE) + 125-byte payload
  ACT       = "ACT\x00"(4) + size(4 BE) + payload

ACT payload = name[32] + pad[16] + type(u8) + sub(u8) + data
  data = action_specific_bytes + N × 12-byte condition records

Action types verified against decompiled Game.exe.c and raw hex data.
"""

import struct, os, json, sys
from collections import defaultdict

# ── Inventory item table (from 0x78/0x7a action data) ────────────────────
INVENTORY_ITEMS = {
    0:  "Bolt cutters",
    1:  "Phone card",
    2:  "Coin",
    3:  "Glass cutter",
    4:  "Gun",
    5:  "Key on passport",
    6:  "Ladle",
    7:  "Video tape",
    8:  "Work gloves",
    9:  "Key in safe",
    10: "Remote control",
}

# ── Primitives ────────────────────────────────────────────────────────────
def cstr(d, o=0, n=256):
    e = d.find(b'\x00', o, o + n)
    return d[o:(e if e >= 0 else o + n)].decode('ascii', 'replace')

def u8(d, o):  return d[o] if o < len(d) else 0
def u16(d, o): return struct.unpack_from('<H', d, o)[0] if o + 2 <= len(d) else 0
def i16(d, o): return struct.unpack_from('<h', d, o)[0] if o + 2 <= len(d) else 0
def u32(d, o): return struct.unpack_from('<I', d, o)[0] if o + 4 <= len(d) else 0
def i32(d, o): return struct.unpack_from('<i', d, o)[0] if o + 4 <= len(d) else 0

# ── Action type registry ──────────────────────────────────────────────────
ACTION_NAMES = {
    0x0a: "HOT_1FR_SCENE_CHANGE",
    0x0b: "HOT_MULTIFRAME_SCENE_CHANGE",
    0x0c: "SCENE_CHANGE",
    0x0d: "HOT_MULTIFRAME_MULTISCENE",
    0x0e: "HOT_1FR_EXITSCENE",
    0x16: "START_FRAME_NEXT_SCENE",
    0x1e: "STOP_PLAYER_SCROLLING",
    0x1f: "START_PLAYER_SCROLLING",
    0x28: "OVERLAY_ANIM",
    0x32: "CONVERSATION_VIDEO",
    0x33: "PLAY_SECONDARY_VIDEO",
    0x34: "PLAY_SECONDARY_VIDEO_B",
    0x35: "PLAY_SECONDARY_MOVIE",
    0x36: "SPECIAL_EFFECT",
    0x37: "OVERLAY_HOT",
    0x38: "CONVERSATION_VIDEO_ALT",
    0x39: "CONVERSATION_CEL",
    0x3a: "CONVERSATION_SOUND",
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
    0x78: "ADD_INVENTORY",
    0x79: "REMOVE_INVENTORY",
    0x7a: "SHOW_INVENTORY_ITEM",
    0x7b: "INVENTORY_ITEM_ALT",
    0x96: "PLAY_DIGI_SOUND",
    0x97: "PLAY_DIGI_SOUND_2",
    0x98: "PLAY_SOUND_PAN_FRAME",
    0x99: "PLAY_SOUND_MULTI_HS",
    0xa0: "HINT_SYSTEM",
    0xc8: "SPECIAL_C8",
    0xc9: "SPECIAL_C9",
    0xca: "SPECIAL_CA",
    0xcb: "SPECIAL_CB",
    0xcc: "SPECIAL_CC",
    0xcd: "SPECIAL_CD",
}

# Base action data sizes (from Game.exe.c, verified against binary data).
# Variable-size types computed dynamically; everything after base = condition records.
FIXED_SIZES = {
    0x0a: 26,   0x0e: 26,
    0x0c: 8,
    0x16: 4,
    0x1e: 1,    0x1f: 1,
    0x3c: 1,
    0x3d: 18,
    0x3f: 4,
    0x42: 16,
    0x43: 2,    0x44: 1,
    0x4c: 1,
    0x64: 5,
    0x65: 1,    0x66: 1,    0x67: 1,
    0x68: 1,    0x69: 1,
    0x6b: 40,
    0x6c: 621,
    0x6d: 1,    0x6e: 1,    0x6f: 1,    0x70: 1,
    0x71: 6,
    0x72: 676,
    0x73: 402,
    0x75: 1348,
    0x76: 215,
    0x78: 2,    0x79: 2,
    0x7a: 60,  # 48 action bytes + 12 trailing display record (not a condition)
    0x96: 43,   0x97: 43,
    0x98: 32,
    0xa0: 35,
}


def compute_action_data_size(act_type, d):
    """Return the action-specific data size (excluding trailing conditions)."""
    if act_type in FIXED_SIZES:
        return FIXED_SIZES[act_type]

    # Variable-size types
    if act_type in (0x0b, 0x0d):
        # 0x0b: 10 + count_at[8] * 18
        # 0x0d: 22 + count_at[20] * 18 (not seen in this game)
        count_off = 8 if act_type == 0x0b else 20
        base = count_off + 2
        count = u16(d, count_off)
        return base + count * 18

    if act_type == 0x6a:
        # 40 bytes event flags + u16 count + count × 18 byte hotspot frames
        count = u16(d, 40)
        return 42 + count * 18

    if act_type == 0x3e:
        # MAP_CALL_HOT_MULTIFRAME: 2 + count * 18
        count = u16(d, 0)
        return 2 + count * 18

    if act_type == 0x99:
        # PLAY_SOUND_MULTI_HS: variable, formula from Game.exe.c
        count = u16(d, 0x2d) if len(d) > 0x2f else 0
        return 0x2f + 2 + count * 18

    if act_type == 0x33:
        # PLAY_SECONDARY_VIDEO: 53 + count * 66 (count at d[51])
        count = u16(d, 51) if len(d) > 52 else 0
        return 53 + count * 66

    if act_type == 0x4b:
        # TEXTBOX_WRITE: u16 length + text
        tlen = u16(d, 0) if len(d) >= 2 else 0
        return 2 + tlen

    # For conversation and other complex variable types, assume all data is action data
    return len(d)


# ── Condition record decoder ──────────────────────────────────────────────
def decode_conditions(raw):
    """Decode trailing 12-byte condition/dependency records.

    Condition types (from Game.exe.c + binary analysis):
      0x01  frame/scene variant match — param=u16 at bytes 2-3
      0x02  event flag check — flag_id=byte1, flag_value=byte2
      0x09  time delay — hours/min/sec/ms at bytes 4-10
      0x0b  inventory check — item_id=byte1
      0x0e  timed flag check — flag_id=byte1, value=byte2, seconds=u16@8
      0x0f  timer condition — flag_id=byte1, value=byte2, seconds=u16@8
    """
    conds = []
    for i in range(0, len(raw) - 11, 12):
        rec = raw[i:i + 12]
        ctype = rec[0]
        if ctype == 0x00 and all(b == 0 for b in rec):
            continue
        elif ctype == 0x01:
            # Original game case 1: inventory/item state check
            # rec[1] = item_id, rec[2] = expected state (1=not owned, 2=owned)
            conds.append({
                "type": "scene_variant",
                "item_id": rec[1],
                "value": rec[2],
            })
        elif ctype == 0x02:
            conds.append({
                "type": "flag_check",
                "flag_id": rec[1],
                "flag_value": rec[2],
            })
        elif ctype == 0x09:
            conds.append({
                "type": "time_delay",
                "hours": u16(rec, 4),
                "minutes": u16(rec, 6),
                "seconds": u16(rec, 8),
                "millis": u16(rec, 10),
            })
        elif ctype == 0x0b:
            conds.append({
                "type": "inventory_check",
                "item_id": rec[1],
            })
        elif ctype in (0x0e, 0x0f):
            conds.append({
                "type": "timed_flag" if ctype == 0x0e else "timer_condition",
                "flag_id": rec[1],
                "flag_value": rec[2],
                "seconds": u16(rec, 8),
            })
        else:
            conds.append({
                "type": f"cond_0x{ctype:02x}",
                "raw": rec.hex(),
            })
    return conds


# ── Hotspot frame decoder ────────────────────────────────────────────────
def decode_hotspot_frames(d, offset, count):
    """Decode count × 18-byte hotspot frame entries."""
    frames = []
    for i in range(count):
        b = offset + i * 18
        if b + 18 > len(d):
            break
        frames.append({
            "frame": u16(d, b),
            "x1": i32(d, b + 2),
            "y1": i32(d, b + 6),
            "x2": i32(d, b + 10),
            "y2": i32(d, b + 14),
        })
    return frames


# ── Ambient sound overrides ──────────────────────────────────────────────
# Several library scenes have "50sdiner" baked into their binary SCENSSUM
# data instead of the correct "mysthevy". These are developer errors in the
# original game data — all surrounding library scenes use "mysthevy".
AMBIENT_OVERRIDES = {
    "S1841": "mysthevy",
    "S1895": "mysthevy",
    "S1896": "mysthevy",
    "S1900": "mysthevy",
    "S1903": "mysthevy",
    "S1905": "mysthevy",
    "S1906": "mysthevy",
    "S1907": "mysthevy",
}

# ── SCENSSUM decoder ─────────────────────────────────────────────────────
def decode_scenssum(payload):
    """Decode 125-byte SCENSSUM payload."""
    desc = cstr(payload, 0x00, 32)
    bg   = cstr(payload, 0x32, 8)
    amb  = cstr(payload, 0x40, 8)

    # Timing params at 0x48+
    params = {}
    if len(payload) >= 0x7d:
        params["scene_type"]  = u16(payload, 0x3c)
        params["field_3e"]    = u16(payload, 0x3e)
        # The last u16 in the params block is typically frame_count
        params["frame_count"] = u16(payload, 0x7b)

    return {
        "description": desc,
        "bg_avf":      bg,
        "ambient_snd": amb,
        **params,
    }


# ── ACT record decoder ──────────────────────────────────────────────────
def decode_act(payload):
    """Decode one ACT record payload."""
    if len(payload) < 0x33:
        return {"name": "?", "type_id": -1, "type": "SHORT_PAYLOAD", "raw": payload.hex()}

    name     = cstr(payload, 0x00, 32)
    act_type = payload[0x30]
    subtype  = payload[0x31]
    d        = payload[0x32:]  # all data after type+sub

    type_name = ACTION_NAMES.get(act_type, f"UNKNOWN_0x{act_type:02x}")
    base = {"name": name, "type_id": act_type, "type": type_name, "subtype": subtype}

    # Split action-specific data from trailing condition records
    action_size = compute_action_data_size(act_type, d)
    action_data = d[:action_size]
    trailing    = d[action_size:]
    conditions  = decode_conditions(trailing) if trailing else []
    if conditions:
        base["conditions"] = conditions

    # ── Type-specific decoders ────────────────────────────────────────

    # Navigation: single-frame hotspot scene change
    if act_type in (0x0a, 0x0e):
        return {**base,
            "target_scene": u16(action_data, 0),
            "scene_param":  u16(action_data, 2),
            "target_frame": u16(action_data, 4),
            "flags":        u16(action_data, 6),
            "hotspot": {
                "x1": i32(action_data, 10), "y1": i32(action_data, 14),
                "x2": i32(action_data, 18), "y2": i32(action_data, 22),
            },
        }

    # Navigation: multi-frame hotspot scene change
    if act_type in (0x0b, 0x0d):
        count_off = 8 if act_type == 0x0b else 20
        nf = u16(action_data, count_off)
        return {**base,
            "target_scene": u16(action_data, 0),
            "scene_param":  u16(action_data, 2),
            "target_frame": u16(action_data, 4),
            "flags":        u16(action_data, 6),
            "frames": decode_hotspot_frames(action_data, count_off + 2, nf),
        }

    # Navigation: direct scene change (no hotspot)
    if act_type == 0x0c:
        return {**base,
            "target_scene": u16(action_data, 0),
            "scene_param":  u16(action_data, 2),
            "target_frame": u16(action_data, 4),
            "flags":        u16(action_data, 6),
        }

    # Frame/scroll control
    if act_type == 0x16:
        return {**base, "frame": u16(action_data, 0), "param": u16(action_data, 2)}
    if act_type in (0x1e, 0x1f):
        return {**base, "value": u8(action_data, 0)}

    # Conversation video (type 0x32)
    # Format: 1692-byte fixed header + 1 byte choice_count + choices + tail
    # Validated against all 278 records: 278/278 parse + size match.
    if act_type == 0x32:
        d = action_data
        node_id = cstr(d, 0, 10)
        # Full NPC dialogue: stored in 100-byte null-terminated chunks starting
        # at offset 61 (up to 15 chunks before routing flags at offset 1632).
        npc_parts = []
        for _off in range(61, 1561, 100):
            _t = cstr(d, _off, 100)
            if _t:
                npc_parts.append(_t)
        npc_text = ''.join(npc_parts)

        # Screen/video coordinates (6 × u32 LE at offsets 37-60)
        coords = {"x1": u32(d, 37), "y1": u32(d, 41), "x2": u32(d, 45),
                  "y2": u32(d, 49), "x3": u32(d, 53), "y3": u32(d, 57)}

        # Intro sound descriptor at offset 0x619 (10-byte null-terminated name)
        intro_sound = cstr(d, 0x619, 10) if len(d) > 0x619 + 10 else ""

        # Routing flags (offsets 1632-1633) and continuation scene (offset 1634)
        # has_continuation: 0x01 = unconditional continuation exists, 0x02 = no
        # has_pop: 0x01 = pop scene stack when done, 0x02 = no
        has_continuation = u8(d, 1632) if len(d) > 1632 else 2
        has_pop = u8(d, 1633) if len(d) > 1633 else 2
        cont_scene = u16(d, 1634) if len(d) > 1636 else 0

        result = {**base, "node_id": node_id, "npc_text": npc_text, "coords": coords}
        if intro_sound and intro_sound.lower() != "dummy":
            result["intro_sound"] = intro_sound
        if has_continuation == 1 and cont_scene > 0:
            result["continuation_scene"] = cont_scene
        if has_pop == 1:
            result["has_pop"] = True

        if len(d) < 1698:
            result["data_size"] = len(d)
            return result

        choice_count = d[1692]
        result["choice_count"] = choice_count

        cursor = 1693
        choices = []
        for _ in range(choice_count):
            if cursor + 474 > len(d):
                break
            sub_count = u16(d, cursor + 1)
            cursor += 3
            sub_conds = []
            for _ in range(sub_count):
                if cursor + 5 <= len(d):
                    cond_type = u8(d, cursor)
                    cond_target = u16(d, cursor + 1)
                    cond_expected = u8(d, cursor + 3)
                    cond_operator = u8(d, cursor + 4)  # 0x00=AND, 0x01=OR
                    if cond_type == 0x01:
                        sub_conds.append({
                            "type": "flag_check", "flag_id": cond_target,
                            "expected": cond_expected,
                            "operator": "OR" if cond_operator == 1 else "AND"
                        })
                    elif cond_type == 0x02:
                        sub_conds.append({
                            "type": "inventory_check", "item_id": cond_target,
                            "expected": cond_expected,
                            "operator": "OR" if cond_operator == 1 else "AND"
                        })
                    else:
                        sub_conds.append({
                            "type": f"unknown_0x{cond_type:02x}",
                            "raw": d[cursor:cursor + 5].hex()
                        })
                cursor += 5
            # Choice text: 400 bytes stored as 4 × 100-byte null-terminated chunks
            _cparts = []
            for _ci in range(4):
                _ct = cstr(d, cursor + _ci * 100, 100)
                if _ct:
                    _cparts.append(_ct)
            choice_text = ''.join(_cparts)
            target_node = cstr(d, cursor + 400, 71)
            # Response scene ID: u16 LE at byte 11 within the 71-byte target area
            response_scene = u16(d, cursor + 400 + 11) if cursor + 400 + 13 <= len(d) else 0
            cursor += 471
            ch = {"text": choice_text, "target_node": target_node}
            if response_scene > 0:
                ch["response_scene"] = response_scene
            if sub_conds:
                ch["conditions"] = sub_conds
            choices.append(ch)

        if choices:
            result["choices"] = choices

        # Tail section: 5-byte header + N×6-byte entries
        tail = d[cursor:]
        if len(tail) >= 5:
            n_tail = (len(tail) - 5) // 6
            tail_flag_count = tail[3]
            entries = []
            for i in range(n_tail):
                e = tail[5 + i * 6:5 + (i + 1) * 6]
                if e == b'\x00' * 6:
                    entries.append({"type": "separator"})
                elif e[0] == 0 and e[1] == 0:
                    entries.append({"type": "flag", "id": e[3], "value": e[5]})
                else:
                    entries.append({"type": "npc_ref", "id": e[1], "param": e[2]})
            if entries:
                result["tail_entries"] = entries

        return result

    # PLAY_SECONDARY_VIDEO: character/NPC overlay with per-frame click hotspots
    # Format: name(10B) + header(43B) + count(u16LE) + count×66B entries
    # Header[42] = target_scene (u16 LE) when NPC is clicked
    # Each 66B entry: frame(u32) + unk(6B) + pos_x(i32) + pos_y(i32)
    #                 + hs_x1(i32) + hs_y1(i32) + hs_x2(i32) + hs_y2(i32) + pad(32B)
    if act_type == 0x33:
        asset = cstr(action_data, 0, 10)
        if len(action_data) >= 53:
            target_scene = u16(action_data, 42)
            count = u16(action_data, 51)
            frames = []
            for fi in range(count):
                off = 53 + fi * 66
                if off + 34 > len(action_data):
                    break
                frames.append({
                    "frame":  struct.unpack_from('<H', action_data, off)[0],
                    "pos_x":  struct.unpack_from('<i', action_data, off + 10)[0],
                    "pos_y":  struct.unpack_from('<i', action_data, off + 14)[0],
                    "hs_x1":  struct.unpack_from('<i', action_data, off + 18)[0],
                    "hs_y1":  struct.unpack_from('<i', action_data, off + 22)[0],
                    "hs_x2":  struct.unpack_from('<i', action_data, off + 26)[0],
                    "hs_y2":  struct.unpack_from('<i', action_data, off + 30)[0],
                })
            return {**base, "asset_name": asset, "target_scene": target_scene, "frames": frames}
        return {**base, "asset_name": asset, "data_size": len(action_data)}

    # PLAY_SECONDARY_MOVIE (type 0x35): cinematic overlay animation
    # 278-byte data blob structure (reverse-engineered from Game.exe.c
    # FUN_00423750 + hex analysis of all 19 instances):
    #   0x00-0x09: asset name (10B null-terminated)
    #   0x24:      end_frame (i16) — last frame index (0-based)
    #   0x26:      7 × 6-byte timed flag triggers: {frame(i16), flag_id(i16), value(i16)}
    #              frame=-1 means unused slot. Sets flag at that frame during playback
    #              to trigger conditional sounds/actions in the same scene.
    #   0x80:      10 × 4-byte completion flags: {flag_id(i16), value(i16)}
    #              flag_id=-1 means unused. Set when movie finishes (state 2).
    #   0xa8:      sound file name (10B null-terminated)
    #   0xca:      nav_scene (u16) — scene to load after movie. 9999 = no nav.
    #   0xcc:      nav_param (u16) — scene_param for target scene
    #   0xce:      nav_frame (u16) — target_frame for target scene
    #   0xd4:      Per-frame entry (0x42 bytes each, usually 1 entry):
    #              +0x00: frame_no(i16)
    #              +0x02: src rect {x1(i32), y1(i32), x2(i32), y2(i32)} = source in decoded AVF
    #              +0x12: dst rect {x1(i32), y1(i32), x2(i32), y2(i32)} = screen position
    if act_type == 0x35:
        asset = cstr(action_data, 0, 10)
        result = {**base, "asset_name": asset, "data_size": len(action_data)}
        # End frame
        if len(action_data) >= 0x26:
            result["end_frame"] = i16(action_data, 0x24)
        # Timed flag triggers (set at specific frames during playback)
        if len(action_data) >= 0x50:
            timed = []
            for i in range(7):
                off = 0x26 + i * 6
                frame = i16(action_data, off)
                flag_id = i16(action_data, off + 2)
                flag_val = i16(action_data, off + 4)
                if flag_id >= 0 and frame >= 0:
                    timed.append({"frame": frame, "flag": flag_id, "value": flag_val})
            if timed:
                result["timed_flags"] = timed
        # Completion flags (set when movie finishes)
        if len(action_data) >= 0xa8:
            flags = []
            for i in range(10):
                fi = i16(action_data, 0x80 + i * 4)
                fv = i16(action_data, 0x80 + i * 4 + 2)
                if fi >= 0:
                    flags.append({"flag": fi, "value": fv})
            if flags:
                result["completion_flags"] = flags
        # Sound file
        if len(action_data) >= 0xb8:
            snd = cstr(action_data, 0xa8, 10)
            if snd and snd != "NO SOUND":
                result["sound_file"] = snd
        # Destination rect (screen position) from per-frame entry at 0xD4
        if len(action_data) >= 0xD4 + 0x22:
            dx1 = i32(action_data, 0xD4 + 0x12)
            dy1 = i32(action_data, 0xD4 + 0x16)
            dx2 = i32(action_data, 0xD4 + 0x1A)
            dy2 = i32(action_data, 0xD4 + 0x1E)
            result["dest_rect"] = {"x1": dx1, "y1": dy1, "x2": dx2, "y2": dy2}
        # Navigation target after movie completes
        if len(action_data) >= 0xd0:
            nav = u16(action_data, 0xca)
            if nav > 0 and nav < 9999:
                result["target_scene"] = nav
                param = u16(action_data, 0xcc)
                if param: result["scene_param"] = param
                frame = u16(action_data, 0xce)
                if frame: result["target_frame"] = frame
        return result

    # Video/movie/overlay types (0x34, 0x36, 0x37: similar but not yet decoded)
    if act_type in (0x34, 0x36, 0x37):
        asset = cstr(action_data, 0, 10)
        return {**base, "asset_name": asset, "data_size": len(action_data)}

    # Map types
    if act_type == 0x3c:
        return {**base, "value": u8(action_data, 0)}
    if act_type == 0x3d:
        return {**base,
            "flags": u16(action_data, 0),
            "num_entries": u16(action_data, 2),
            "data": action_data[4:].hex(),
        }
    if act_type == 0x3e:
        count = u16(action_data, 0)
        return {**base,
            "num_frames": count,
            "frames": decode_hotspot_frames(action_data, 2, count),
        }
    if act_type == 0x3f:
        return {**base, "location_id": u16(action_data, 0), "param": u16(action_data, 2)}
    if act_type == 0x42:
        return {**base, "sound_file": cstr(action_data, 0, 8), "params": action_data[8:].hex()}
    if act_type in (0x43, 0x44):
        return {**base, "value": u16(action_data, 0) if act_type == 0x43 else u8(action_data, 0)}

    # Textbox
    if act_type == 0x4b:
        tlen = u16(action_data, 0) if len(action_data) >= 2 else 0
        text = cstr(action_data, 2, tlen) if tlen > 0 else ""
        return {**base, "text": text}
    if act_type == 0x4c:
        return {**base}

    # Event flags
    if act_type == 0x6b:
        flags = []
        for i in range(10):
            fi = i16(action_data, i * 4)
            fv = i16(action_data, i * 4 + 2)
            if fi != -1:
                flags.append({"flag": fi, "value": fv})
        return {**base, "flags_set": flags}

    if act_type == 0x6a:
        flags = []
        for i in range(10):
            fi = i16(action_data, i * 4)
            fv = i16(action_data, i * 4 + 2)
            if fi != -1:
                flags.append({"flag": fi, "value": fv})
        nf = u16(action_data, 40)
        return {**base,
            "flags_set": flags,
            "frames": decode_hotspot_frames(action_data, 42, nf),
        }

    # Sound
    if act_type in (0x96, 0x97):
        snd = cstr(action_data, 0, 10)
        result = {**base,
            "sound_file": snd,
            "loop_type":  u16(action_data, 12),
            "volume_l":   u16(action_data, 22),
            "volume_r":   u16(action_data, 24),
            "flags":      hex(u16(action_data, 26)),
        }
        # Navigate-on-end: scene to load when sound finishes playing
        # (e.g. opening a book, drawer, or the intro narration → next scene)
        nav = u16(action_data, 0x1e)
        if nav > 0 and nav < 9999:
            result["nav_on_end"] = nav
        return result
    if act_type == 0x98:
        return {**base,
            "sound_file": cstr(action_data, 0, 8),
            "pan":   i16(action_data, 8),
            "volume": i16(action_data, 10),
        }
    if act_type == 0x99:
        return {**base, "sound_file": cstr(action_data, 2, 8), "data_size": len(action_data)}

    # Game state
    if act_type in (0x6d, 0x70):
        return {**base}
    if act_type in (0x6e, 0x6f):
        return {**base, "value": u8(action_data, 0)}
    if act_type == 0x71:
        return {**base,
            "difficulty": u16(action_data, 0),
            "param1": u16(action_data, 2),
            "param2": u16(action_data, 4),
        }
    if act_type == 0x64:
        return {**base, "amount": i16(action_data, 0), "param": i16(action_data, 2)}
    if act_type == 0x65:
        return {**base}

    # Timer
    if act_type in (0x68, 0x69):
        return {**base, "value": u8(action_data, 0) if action_data else 0}

    # Rendering
    if act_type in (0x66, 0x67):
        return {**base, "value": u8(action_data, 0)}

    # Inventory: ADD/REMOVE
    if act_type in (0x78, 0x79):
        iid = u16(action_data, 0) if len(action_data) >= 2 else 0
        return {**base,
            "item_id": iid,
            "item_name": INVENTORY_ITEMS.get(iid, f"item_{iid}"),
        }

    # Inventory: SHOW_INVENTORY_ITEM (48 bytes)
    #   item_id(u16) + sprite_sheet(8B) + pad(2B) + enabled(i32)
    #   + src_rect(4×i32) + dst_rect(4×i32)
    if act_type == 0x7a:
        iid = u16(action_data, 0)
        sheet = cstr(action_data, 2, 8)
        return {**base,
            "item_id": iid,
            "item_name": INVENTORY_ITEMS.get(iid, f"item_{iid}"),
            "sprite_sheet": sheet,
            "enabled": i32(action_data, 12),
            "src_rect": {
                "x1": i32(action_data, 16), "y1": i32(action_data, 20),
                "x2": i32(action_data, 24), "y2": i32(action_data, 28),
            },
            "dst_rect": {
                "x1": i32(action_data, 32), "y1": i32(action_data, 36),
                "x2": i32(action_data, 40), "y2": i32(action_data, 44),
            },
        }

    # Puzzles — extract key identifiers where possible

    if act_type == 0x6c:  # ORDERING_PUZZLE (621 bytes)
        d = action_data
        num_buttons = i16(d, 0x0A)

        # Button hitbox rects (15 slots × 16 bytes at offset 0xFC)
        buttons = []
        for i in range(min(num_buttons, 15)):
            off = 0xFC + i * 16
            buttons.append({
                "x1": i32(d, off), "y1": i32(d, off+4),
                "x2": i32(d, off+8), "y2": i32(d, off+12)
            })

        # Correct sequence
        seq_len = i16(d, 0x1EC)
        sequence = [d[0x1EE + i] for i in range(min(seq_len, 15))]

        # Sounds
        click_sound = cstr(d, 0x1FD, 10)
        success_sound = cstr(d, 0x22E, 10)

        # Success navigation + flag
        success_scene = i16(d, 0x21F)
        success_flag_id = i16(d, 0x229)
        success_flag_val = d[0x22B] if 0x22B < len(d) else 0

        # Exit navigation + flag
        exit_scene = i16(d, 0x250)
        exit_flag_id = i16(d, 0x25A)
        exit_flag_val = d[0x25C] if 0x25C < len(d) else 0

        # Exit hotspot rect
        exit_hotspot = {
            "x1": i32(d, 0x25D), "y1": i32(d, 0x261),
            "x2": i32(d, 0x265), "y2": i32(d, 0x269)
        }

        return {**base,
            "surface": cstr(d, 0, 10),
            "num_buttons": num_buttons,
            "buttons": buttons,
            "sequence_length": seq_len,
            "correct_sequence": sequence,
            "click_sound": click_sound,
            "success_sound": success_sound,
            "success_scene": success_scene,
            "success_flag_id": success_flag_id,
            "success_flag_value": success_flag_val,
            "exit_scene": exit_scene,
            "exit_flag_id": exit_flag_id,
            "exit_flag_value": exit_flag_val,
            "exit_hotspot": exit_hotspot,
        }

    if act_type == 0x72:  # ROTATINGLOCK_PUZZLE (676 bytes)
        d = action_data
        asset = cstr(d, 0, 10)
        num_dials = u16(d, 0x0A)

        # 10 source rects (sprite frames for digits 0-9)
        src_rects = []
        for i in range(10):
            off = 0x0C + i * 16
            src_rects.append({
                "x1": i32(d, off), "y1": i32(d, off+4),
                "x2": i32(d, off+8), "y2": i32(d, off+12)
            })

        # Destination rects (dial positions on screen)
        dest_rects = []
        for i in range(min(num_dials, 4)):
            off = 0xAC + i * 16
            dest_rects.append({
                "x1": i32(d, off), "y1": i32(d, off+4),
                "x2": i32(d, off+8), "y2": i32(d, off+12)
            })

        # Up-click rects (top portion of each dial)
        up_rects = []
        for i in range(min(num_dials, 4)):
            off = 0x12C + i * 16
            up_rects.append({
                "x1": i32(d, off), "y1": i32(d, off+4),
                "x2": i32(d, off+8), "y2": i32(d, off+12)
            })

        # Down-click rects (bottom portion of each dial)
        down_rects = []
        for i in range(min(num_dials, 4)):
            off = 0x1AC + i * 16
            down_rects.append({
                "x1": i32(d, off), "y1": i32(d, off+4),
                "x2": i32(d, off+8), "y2": i32(d, off+12)
            })

        # Combination (4 bytes at 0x22C)
        combination = [d[0x22C + i] for i in range(min(num_dials, 4))]

        # Click sound, success sound, scenes
        click_sound = cstr(d, 0x234, 10)
        success_scene = u16(d, 0x256)
        success_sound = cstr(d, 0x265, 10)
        exit_scene = u16(d, 0x287)
        exit_hotspot = {
            "x1": i32(d, 0x294), "y1": i32(d, 0x298),
            "x2": i32(d, 0x29C), "y2": i32(d, 0x2A0)
        }

        return {**base,
            "asset_name": asset,
            "num_dials": num_dials,
            "dest_rects": dest_rects,
            "up_rects": up_rects,
            "down_rects": down_rects,
            "combination": combination,
            "click_sound": click_sound,
            "success_sound": success_sound,
            "success_scene": success_scene,
            "exit_scene": exit_scene,
            "exit_hotspot": exit_hotspot,
        }

    if act_type == 0x73:  # LEVER_PUZZLE (402 bytes)
        d = action_data
        asset = cstr(d, 0, 10)

        # 3 destination rects (lever click/display areas on screen)
        dest_rects = []
        for i in range(3):
            off = 0xCA + i * 16
            dest_rects.append({
                "x1": i32(d, off), "y1": i32(d, off+4),
                "x2": i32(d, off+8), "y2": i32(d, off+12)
            })

        # Initial states and solution (3 bytes each)
        initial_states = [d[0xFA + i] for i in range(3)]
        solution = [d[0xFD + i] for i in range(3)]

        # Sounds
        up_sound = cstr(d, 0x100, 10)
        down_sound = cstr(d, 0x122, 10)

        # Navigation
        exit_scene = u16(d, 0x144)
        success_scene = u16(d, 0x175)
        exit_hotspot = {
            "x1": i32(d, 0x182), "y1": i32(d, 0x186),
            "x2": i32(d, 0x18A), "y2": i32(d, 0x18E)
        }

        return {**base,
            "asset_name": asset,
            "num_levers": 3,
            "num_states": 4,
            "dest_rects": dest_rects,
            "initial_states": initial_states,
            "solution": solution,
            "up_sound": up_sound,
            "down_sound": down_sound,
            "exit_scene": exit_scene,
            "success_scene": success_scene,
            "exit_hotspot": exit_hotspot,
        }

    if act_type == 0x76:  # PASSWORD_PUZZLE (215 bytes)
        d = action_data
        # Input area rects (3 rects as 4×i32 starting at 0x04)
        input_rects = []
        for i in range(3):
            off = 0x04 + i * 16
            input_rects.append({
                "x1": i32(d, off), "y1": i32(d, off+4),
                "x2": i32(d, off+8), "y2": i32(d, off+12)
            })

        # Two valid passwords (20 bytes each, null-padded)
        password1 = cstr(d, 0x34, 20)
        password2 = cstr(d, 0x48, 20)

        # Success: scene, sound
        success_scene = u16(d, 0x5C)
        success_sound = cstr(d, 0x69, 10)

        # Fail: scene, sound
        fail_scene = u16(d, 0x8B)
        fail_sound = cstr(d, 0x98, 10)

        # Exit: scene, hotspot
        exit_scene = u16(d, 0xBA)
        exit_hotspot = {
            "x1": i32(d, 0xC7), "y1": i32(d, 0xCB),
            "x2": i32(d, 0xCF), "y2": i32(d, 0xD3)
        }

        return {**base,
            "passwords": [password1, password2],
            "input_rects": input_rects,
            "success_scene": success_scene,
            "success_sound": success_sound,
            "fail_scene": fail_scene,
            "fail_sound": fail_sound,
            "exit_scene": exit_scene,
            "exit_hotspot": exit_hotspot,
        }

    if act_type == 0x74:  # TELEPHONE (variable size)
        d = action_data
        asset = cstr(d, 0, 10)

        # Button destination rects (12 buttons on screen: 1-9,*,0,#)
        # Source rects at 0x0A (on sprite sheet), dest rects at 0x0CA (on screen)
        buttons = []
        for i in range(12):
            off = 0x0CA + i * 16
            buttons.append({
                "x1": i32(d, off), "y1": i32(d, off+4),
                "x2": i32(d, off+8), "y2": i32(d, off+12)
            })

        # Phone directory entries (variable section at 0x48C)
        count = u16(d, 0x48A) if len(d) > 0x48C else 0
        entries = []
        for i in range(count):
            eoff = 0x48C + i * 0xEB
            if eoff + 0xEB > len(d):
                break
            digits = [d[eoff + j] for j in range(11)]
            node_id = cstr(d, eoff + 11, 10)
            text = cstr(d, eoff + 0x15, 200)
            entries.append({
                "digits": digits,
                "node_id": node_id,
                "text": text,
            })

        # Exit hotspot (handset area, at 0x47A)
        exit_hotspot = {
            "x1": i32(d, 0x47A), "y1": i32(d, 0x47E),
            "x2": i32(d, 0x482), "y2": i32(d, 0x486)
        }

        # Hangup scene (at 0x46C)
        hangup_scene = u16(d, 0x46C)

        return {**base,
            "asset_name": asset,
            "buttons": buttons,
            "phone_entries": entries,
            "hangup_scene": hangup_scene,
            "exit_hotspot": exit_hotspot,
        }

    if act_type == 0x75:  # SLIDER_PUZZLE
        asset = cstr(action_data, 0, 10)
        return {**base, "asset_name": asset, "data_size": len(action_data)}

    # Hint system
    if act_type == 0xa0:
        return {**base, "data_size": len(action_data)}

    # Fallback: dump summary
    return {**base, "data_size": len(action_data), "data_preview": action_data[:32].hex()}


# ── IFF file walker ──────────────────────────────────────────────────────
def decode_scene_file(data):
    """Decode a complete DATA scene file."""
    if data[:4] != b'DATA':
        return None

    total_size = struct.unpack('>I', data[4:8])[0]

    # SCENSSUM chunk: 8-byte tag + 4-byte BE size + payload
    if data[8:16] != b'SCENSSUM':
        return None
    ss_size = struct.unpack('>I', data[16:20])[0]
    ss_payload = data[20:20 + ss_size]
    scene = {"summary": decode_scenssum(ss_payload), "actions": []}

    # Advance past SCENSSUM (even-align)
    offset = 20 + ss_size
    if ss_size % 2 == 1:
        offset += 1

    # Parse ACT chunks
    while offset + 8 <= len(data):
        # Skip zero padding bytes between chunks
        while offset < len(data) and data[offset] == 0:
            offset += 1
        if offset + 8 > len(data):
            break
        if data[offset:offset + 4] != b'ACT\x00':
            break

        act_size = struct.unpack('>I', data[offset + 4:offset + 8])[0]
        act_payload = data[offset + 8:offset + 8 + act_size]

        scene["actions"].append(decode_act(act_payload))

        offset += 8 + act_size
        if act_size % 2 == 1:
            offset += 1

    return scene


# ── Text report formatter ────────────────────────────────────────────────
def format_report(all_scenes):
    lines = []
    W = 78
    lines.append('=' * W)
    lines.append('NANCY DREW: SECRETS CAN KILL — Scene Data Decoded')
    lines.append(f'{len(all_scenes)} scenes, {sum(len(s["actions"]) for s in all_scenes.values())} actions')
    lines.append('=' * W)

    for sname in sorted(all_scenes.keys(), key=lambda x: int(x[1:]) if x[1:].isdigit() else 0):
        scene = all_scenes[sname]
        s = scene['summary']
        lines.append(f'\n{"─" * W}')
        lines.append(f'{sname}: {s["description"]}')
        lines.append(f'  bg={s["bg_avf"] or "(none)"}  amb={s["ambient_snd"] or "(none)"}')

        for i, act in enumerate(scene['actions']):
            t = act.get('type', '?')
            n = act.get('name', '?')
            tid = act.get('type_id', -1)

            detail_parts = []

            # Target scene
            if 'target_scene' in act:
                detail_parts.append(f'→ S{act["target_scene"]}')
                if act.get('target_frame'):
                    detail_parts.append(f'fr={act["target_frame"]}')
            # Hotspot rect
            if 'hotspot' in act and isinstance(act['hotspot'], dict):
                hs = act['hotspot']
                detail_parts.append(f'hs=({hs["x1"]},{hs["y1"]})-({hs["x2"]},{hs["y2"]})')
            # Hotspot frames
            if 'frames' in act and act['frames']:
                nf = len(act['frames'])
                f0 = act['frames'][0]
                if 'x1' in f0:
                    detail_parts.append(f'{nf} frames, f0=({f0["x1"]},{f0["y1"]})-({f0["x2"]},{f0["y2"]})')
                else:
                    detail_parts.append(f'{nf} frames')
            # Conditions
            if 'conditions' in act:
                conds = []
                for c in act['conditions']:
                    if c['type'] == 'flag_check':
                        conds.append(f'flag[{c["flag_id"]}]=={c["flag_value"]}')
                    elif c['type'] == 'scene_variant':
                        conds.append(f'variant=={c["value"]}')
                    elif c['type'] == 'inventory_check':
                        conds.append(f'has_item[{c["item_id"]}]')
                    elif c['type'] == 'timed_flag':
                        conds.append(f'flag[{c["flag_id"]}]=={c["flag_value"]}+{c["seconds"]}s')
                    elif c['type'] == 'timer_condition':
                        conds.append(f'timer(flag[{c["flag_id"]}]=={c["flag_value"]},{c["seconds"]}s)')
                    elif c['type'] == 'time_delay':
                        conds.append(f'delay({c["hours"]}h{c["minutes"]}m{c["seconds"]}s)')
                    else:
                        conds.append(f'{c["type"]}')
                detail_parts.append(f'IF {",".join(conds)}')
            # Event flags set
            if 'flags_set' in act:
                fs = ', '.join(f'{f["flag"]}={f["value"]}' for f in act['flags_set'])
                detail_parts.append(f'SET {fs}')
            # Sound
            if 'sound_file' in act:
                detail_parts.append(f'snd="{act["sound_file"]}"')
            # Asset
            if 'asset_name' in act and 'sound_file' not in act:
                detail_parts.append(f'asset="{act["asset_name"]}"')
            # Conversation
            if 'node_id' in act:
                detail_parts.append(f'node="{act["node_id"]}"')
                npc = act.get('npc_text', '')
                if npc:
                    detail_parts.append(f'NPC: "{npc[:60]}"')
                cc = act.get('choice_count', 0)
                if cc > 0:
                    detail_parts.append(f'{cc} choices')
                    for ci, ch in enumerate(act.get('choices', [])):
                        ct = ch.get('text', '')[:40]
                        tn = ch.get('target_node', '')
                        detail_parts.append(f'  [{ci}] "{ct}" → {tn}')
            # Text
            if 'text' in act and act.get('text'):
                detail_parts.append(f'"{act["text"][:50]}"')
            # Inventory
            if 'item_name' in act:
                detail_parts.append(f'item="{act["item_name"]}"(#{act["item_id"]})')
            if 'sprite_sheet' in act:
                sr = act.get('src_rect', {})
                dr = act.get('dst_rect', {})
                detail_parts.append(f'sheet="{act["sprite_sheet"]}"')
                detail_parts.append(f'src=({sr.get("x1",0)},{sr.get("y1",0)})-({sr.get("x2",0)},{sr.get("y2",0)})')
                detail_parts.append(f'dst=({dr.get("x1",0)},{dr.get("y1",0)})-({dr.get("x2",0)},{dr.get("y2",0)})')
            # Game state
            if tid in (0x6d,):
                detail_parts.append('GAME OVER')
            if tid in (0x70,):
                detail_parts.append('YOU WIN')
            # Puzzle size (stub puzzles)
            if 'data_size' in act and tid in (0x6c, 0x72, 0x73, 0x74, 0x75, 0x76):
                detail_parts.append(f'({act["data_size"]}B puzzle)')

            detail = '  '.join(detail_parts)
            lines.append(f'  [{i}] {t}  "{n}"  {detail}')

    # Statistics
    lines.append(f'\n{"=" * W}')
    lines.append('ACTION TYPE STATISTICS')
    lines.append('─' * W)
    type_counts = defaultdict(int)
    cond_counts = defaultdict(int)
    for scene in all_scenes.values():
        for act in scene['actions']:
            type_counts[act.get('type', '?')] += 1
            if 'conditions' in act:
                for c in act['conditions']:
                    cond_counts[c['type']] += 1

    for t, c in sorted(type_counts.items(), key=lambda x: -x[1]):
        lines.append(f'  {t:<40s}: {c:4d}')

    if cond_counts:
        lines.append(f'\nCondition types:')
        for t, c in sorted(cond_counts.items(), key=lambda x: -x[1]):
            lines.append(f'  {t:<40s}: {c:4d}')

    lines.append(f'\n{"=" * W}')
    return '\n'.join(lines)


# ── Scene graph summary ──────────────────────────────────────────────────
def build_scene_graph(all_scenes):
    """Build adjacency list of scene transitions."""
    graph = {}
    for sname, scene in all_scenes.items():
        sid = int(sname[1:]) if sname[1:].isdigit() else sname
        transitions = []
        for act in scene['actions']:
            if 'target_scene' in act:
                target = act['target_scene']
                conds = []
                if 'conditions' in act:
                    for c in act['conditions']:
                        if c['type'] == 'flag_check':
                            conds.append(f'flag[{c["flag_id"]}]=={c["flag_value"]}')
                transitions.append({
                    "target": target,
                    "action": act.get('name', '?'),
                    "type": act.get('type', '?'),
                    "conditions": conds if conds else None,
                })
        if transitions:
            graph[sid] = transitions
    return graph


# ── Main ──────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    DATA_DIR    = sys.argv[1] if len(sys.argv) > 1 else './nd1_extracted'
    FRAMES_DIR  = sys.argv[2] if len(sys.argv) > 2 else './nd1_avf_frames'
    OUT_JSON    = './nd1_scenes.json'
    OUT_TXT     = './nd1_scenes.txt'
    OUT_GRAPH   = './nd1_scene_graph.json'

    if not os.path.isdir(DATA_DIR):
        print(f"ERROR: directory not found: {DATA_DIR}")
        sys.exit(1)

    # Build AVF frame count table from extracted frames directory
    import re as _re
    avf_frame_counts = {}
    if os.path.isdir(FRAMES_DIR):
        for fn in os.listdir(FRAMES_DIR):
            m = _re.match(r'^(.+)_(\d{3})\.png$', fn)
            if m:
                key = m.group(1).upper()
                avf_frame_counts[key] = max(avf_frame_counts.get(key, 0), int(m.group(2)) + 1)

    all_scenes = {}
    errors = []

    for fname in sorted(os.listdir(DATA_DIR)):
        if not fname.startswith('S') or not fname.endswith('.bin'):
            continue
        # Check that the part after 'S' and before '.bin' is numeric
        scene_num = fname[1:-4]
        if not scene_num.isdigit():
            continue

        path = os.path.join(DATA_DIR, fname)
        with open(path, 'rb') as f:
            data = f.read()

        if data[:4] != b'DATA':
            continue

        try:
            result = decode_scene_file(data)
            if result:
                bg = result.get('summary', {}).get('bg_avf', '')
                fc = avf_frame_counts.get(bg.upper(), 0)
                if fc > 1:
                    result['summary']['avf_frames'] = fc
                scene_key = f'S{scene_num}'
                # Apply ambient overrides for scenes with wrong data
                if scene_key in AMBIENT_OVERRIDES:
                    result['summary']['ambient_snd'] = AMBIENT_OVERRIDES[scene_key]
                all_scenes[scene_key] = result
        except Exception as e:
            errors.append(f'{fname}: {e}')

    # Output
    print(f'Decoded {len(all_scenes)} scenes, {sum(len(s["actions"]) for s in all_scenes.values())} actions')
    if errors:
        print(f'{len(errors)} errors:')
        for e in errors:
            print(f'  {e}')

    # JSON
    with open(OUT_JSON, 'w') as f:
        json.dump(all_scenes, f, indent=2)
    print(f'JSON → {OUT_JSON}')

    # Human-readable report
    txt = format_report(all_scenes)
    with open(OUT_TXT, 'w') as f:
        f.write(txt)
    print(f'Text → {OUT_TXT}')

    # Scene graph
    graph = build_scene_graph(all_scenes)
    with open(OUT_GRAPH, 'w') as f:
        json.dump(graph, f, indent=2)
    print(f'Graph → {OUT_GRAPH}')

    # Print summary stats
    type_counts = defaultdict(int)
    for scene in all_scenes.values():
        for act in scene['actions']:
            type_counts[act.get('type', '?')] += 1

    print(f'\nAction type breakdown:')
    for t, c in sorted(type_counts.items(), key=lambda x: -x[1]):
        print(f'  {t:<40s}: {c:4d}')
