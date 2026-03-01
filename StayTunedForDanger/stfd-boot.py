#!/usr/bin/env python3
"""
stfd-boot.py — Nancy Drew: Stay Tuned for Danger — BOOT.bin Decoder
Decodes all IFF chunks from BOOT.bin: identity, fonts, sounds, map,
cursors, hints, puzzle data, loading quotes, screen layouts, and more.
Same IFF chunk format as ND1.

Usage: python3 stfd-boot.py [BOOT.bin]
Outputs: stfd_boot.json  stfd_boot.txt
"""
import struct, json, sys, os

# ── primitives ──────────────────────────────────────────────────────
def cstr(d, o=0, n=256):
    e = d.find(b'\x00', o, o+n); return d[o:(e if e>=0 else o+n)].decode('ascii','replace')
def u8(d,o):  return d[o] if o<len(d) else 0
def u16(d,o): return struct.unpack_from('<H',d,o)[0] if o+2<=len(d) else 0
def i32(d,o): return struct.unpack_from('<i',d,o)[0] if o+4<=len(d) else 0
def u32(d,o): return struct.unpack_from('<I',d,o)[0] if o+4<=len(d) else 0
def r4i32(d,o): return (i32(d,o), i32(d,o+4), i32(d,o+8), i32(d,o+12))

# ── chunk loader ─────────────────────────────────────────────────────
def load_chunks(data):
    chunks = {}
    sz0 = struct.unpack_from('>I', data, 16)[0]
    chunks['BOOTBSUM'] = data[20:20+sz0]
    off = 20+sz0+(sz0%2)
    while off+8 <= len(data):
        while off < len(data) and data[off]==0: off+=1
        if off+8 > len(data): break
        raw = data[off:off+4]
        if not all(32<=b<127 or b==0 for b in raw): break
        tag = raw.rstrip(b'\x00').decode('ascii','replace').rstrip()
        sz  = struct.unpack_from('>I', data, off+4)[0]
        chunks[tag] = data[off+8:off+8+sz]
        off += 8+sz+(sz%2)
    return chunks

# ── decoders ─────────────────────────────────────────────────────────

def decode_bootbsum(d):
    n_anims    = u8(d, 0xa3)
    n_overlays = u8(d, 0xa9)
    sprites = []
    if len(d) > 0xbb:
        sprites.append({'index':0,'name':cstr(d,0xad,10),'x':u16(d,0xb7),'y':u16(d,0xb9),'frame':u16(d,0xbb)})
    off = 0xdb
    for i in range(1, n_anims+n_overlays):
        if off+10 > len(d): break
        raw = d[off:off+10]
        name = cstr(d, off, 10)
        if any(32 <= c < 127 for c in raw[:6]):
            sprites.append({'index':i,'name':name,'x':None,'y':None,'frame':None})
        else:
            break
        off += 10
    return {
        'publisher':   cstr(d,0x00,30), 'series':      cstr(d,0x1e,20),
        'subtitle':    cstr(d,0x3c,30), 'savegame_id': cstr(d,0x67,8),
        'title_full':  cstr(d,0x6f,30), 'flags':       d[0x5a:0x66].hex(),
        'n_anims':n_anims, 'n_overlays':n_overlays, 'num_fonts':u8(d,0x1d1),
        'sprites':sprites,
    }

def decode_quot(d):
    qs = []
    for i in range(len(d)//180):
        e = d[i*180:(i+1)*180]
        te = e.find(b'\x00'); text = e[:te].decode('ascii','replace') if te>0 else ''
        as_ = te+1 if te>=0 else 0
        while as_<len(e) and e[as_]==0: as_+=1
        ae = e.find(b'\x00',as_); author = e[as_:ae].decode('ascii','replace') if ae>as_ else ''
        qs.append({'text':text,'author':author})
    return qs

def decode_font(d):
    S = 0x542; fonts = []
    for i in range(len(d)//S):
        e = d[i*S:(i+1)*S]
        glyphs = []
        for g in range(78):
            p = 0x6a+g*0x10; x1,y1,x2,y2 = u16(e,p),u16(e,p+4),u16(e,p+8),u16(e,p+12)
            ok = bool(x1 or y1 or x2 or y2); cc = g+0x20
            glyphs.append({'char':chr(cc) if 32<=cc<127 else '','ascii':cc,
                           'x1':x1,'y1':y1,'x2':x2,'y2':y2,
                           'w':abs(x2-x1)+1 if ok else 0,'h':abs(y2-y1)+1 if ok else 0})
        fonts.append({'index':i,'id':chr(e[0]) if 32<=e[0]<127 else '?',
                      'name':cstr(e,1,32),'glyphs':glyphs})
    return fonts

def decode_sound_entry(d, o):
    return {'filename':cstr(d,o,10),'sound_id':u16(d,o+0x0a),'loop_type':u16(d,o+0x0c),
            'volume_l':u16(d,o+0x1a),'volume_r':u16(d,o+0x1c),'flags':hex(u16(d,o+0x1e))}

def decode_msnd(d): return decode_sound_entry(d, 0)

def decode_button_sound(tag, d):
    LABELS = {'BUOK':'button_ok','BUDE':'button_denied','BULS':'button_select',
              'GLOB':'global_click','SLID':'slider_drag','CURT':'curtain_transition',
              'CANT':'cannot_do','TH1':'tension_music_1','TH2':'tension_music_2'}
    e = decode_sound_entry(d, 0); e['label'] = LABELS.get(tag, tag); return e

def decode_tmod(d):
    return {'header':[u8(d,0),u8(d,1)],
            'entries':[decode_sound_entry(d,2+i*32) for i in range(2) if 2+i*32+32<=len(d)]}

def _find_screen_rect(d):
    for o in range(0, min(len(d)-16, 64), 2):
        if u16(d,o)==639 and u16(d,o+4)==479:
            base = o-4 if o>=4 and u16(d,o-4)==0 else o-8 if o>=8 and u16(d,o-8)==0 else o
            return list(r4i32(d, base)) if o-base <= 8 else [0,0,639,479]
    return [0,0,639,479]

def decode_screen_chunk(d, tag=None):
    return {'bg_image':cstr(d,0x00,10),'screen_w':u16(d,0x0a),
            'full_rect':_find_screen_rect(d),'raw':d.hex()}

def decode_cred(d):
    return {'bg_image':cstr(d,0x00,10),'credit_image':cstr(d,0x0a,10),
            'screen_rect':list(r4i32(d,0x1c)),'text_rect':list(r4i32(d,0x2c)),
            'scroll_speed':u32(d,0x3c),'scroll_delay':u32(d,0x40),'loop_flag':u8(d,0x44)}

def decode_load(d):
    return {'bg_image':cstr(d,0x00,10),'nancy_ck_img':cstr(d,0x0a,10),
            'console_ck_img':cstr(d,0x14,10),'cheat_img':cstr(d,0x1e,10),'save_img':cstr(d,0x28,10)}

def decode_cd(d):
    return {'bg_image':cstr(d,0x00,10),'full_rect':list(r4i32(d,0x10)),'active_rect':list(r4i32(d,0x20))}

def decode_intr(d):
    names = []
    for i in range(5):
        n = cstr(d,i*10,10)
        if n and all(32<=ord(c)<127 for c in n): names.append(n)
    return {'resource_names':names}

def decode_map(d):
    hotspots = []
    off = 0x7a
    while off+16 <= 0xea:
        x1=u16(d,off); y1=u16(d,off+4); x2=u16(d,off+8); y2=u16(d,off+12)
        off += 16
        if x1==0 and y1==0 and x2==0 and y2==0: continue
        if x2>=x1 and y2>=y1 and x2<640 and y2<480:
            hotspots.append({'x1':x1,'y1':y1,'x2':x2,'y2':y2,'w':x2-x1,'h':y2-y1})
    names  = [cstr(d, 0xea+i*30, 30) for i in range(4)]
    pins   = [{'x':u16(d,0x162+i*8),'y':u16(d,0x162+i*8+4)} for i in range(4)]
    locs   = [{'name':names[i],'pin':pins[i],
                'scene_id':u16(d,0x1c4+i*12),'scroll_y':u16(d,0x1c4+i*12+6)}
              for i in range(4)]
    return {'day_bg':cstr(d,0x00,10),'night_bg':cstr(d,0x0a,10),'hotspots':hotspots,'locations':locs}

def decode_tbox(d):
    return {'regions':[{'index':i,'rect':list(r4i32(d,i*16))} for i in range(len(d)//16) if any(r4i32(d,i*16))]}

def decode_inv(d):
    return {'panel_rect':list(r4i32(d,0x00)),'slot_rect':list(r4i32(d,0x10)),
            'slots':[{'x':i32(d,0x20+i*8),'y':i32(d,0x20+i*8+4)} for i in range(min(30,(len(d)-0x20)//8)) if i32(d,0x20+i*8) or i32(d,0x20+i*8+4)]}

def decode_curs(d):
    NAMES = ['arrow','hand_pointer','magnify','walk','look','talk','grab','push','locked','wait']
    return [{'index':i,'name':NAMES[i] if i<len(NAMES) else f'cursor_{i}',
             'sprite_x':i32(d,i*16),'sprite_y':i32(d,i*16+4),
             'hot_x':i32(d,i*16+8),'hot_y':i32(d,i*16+12)} for i in range(len(d)//16)]

def decode_view(d):
    NAMES = ['primary_view','full_screen','sidebar','portrait_area']
    result = []
    for i in range(4):
        x1,y1,x2,y2 = r4i32(d,i*16)
        result.append({'name':NAMES[i],'x1':x1,'y1':y1,'x2':x2,'y2':y2,'w':x2-x1,'h':y2-y1})
    return result

def decode_hint(d):
    return {'junior_detective':u8(d,0),'senior_detective':u8(d,1),'master_detective':u8(d,2)}

def decode_spuz(d):
    vals = [u16(d,i*2) for i in range(len(d)//2)]
    sol  = [v for v in vals[:20] if v not in (0xFFFF, 0xFFF6, 65534, 65535)]
    return {'solution':sol,'raw_values':vals[:30]}

def decode_data(d):
    names = []
    i = 0
    while i < len(d):
        s = i
        while i < len(d) and 32<=d[i]<127: i+=1
        if i-s >= 3: names.append(d[s:i].decode('ascii'))
        else: i = s+1
    return {'names':names,'raw':d.hex()}

# ── main driver ──────────────────────────────────────────────────────

def decode_boot(path):
    with open(path,'rb') as f: data = f.read()
    print(f"BOOT.bin: {len(data)} bytes")
    C = load_chunks(data)
    print(f"Chunks:   {list(C.keys())}")
    R = {}
    def get(t): return C.get(t) or C.get(t+'\x00')
    def dec(k,t,fn,*a):
        c = get(t)
        if c is not None: R[k] = fn(c,*a) if a else fn(c)
    dec('bootbsum','BOOTBSUM',decode_bootbsum); dec('quotes','QUOT',decode_quot)
    dec('cd_screen','CD',decode_cd);           dec('intro','INTR',decode_intr)
    dec('fonts','FONT',decode_font)
    dec('menu','MENU',decode_screen_chunk);    dec('help','HELP',decode_screen_chunk)
    dec('settings','SET',decode_screen_chunk); dec('credits','CRED',decode_cred)
    dec('load_save','LOAD',decode_load);       dec('map','MAP',decode_map)
    dec('textbox','TBOX',decode_tbox);         dec('inventory','INV',decode_inv)
    dec('cursors','CURS',decode_curs);         dec('viewports','VIEW',decode_view)
    dec('menu_music','MSND',decode_msnd);      dec('hints','HINT',decode_hint)
    dec('combination_puzzle','SPUZ',decode_spuz)
    dec('bitmaps','DATA',decode_data);         dec('tension_music','TMOD',decode_tmod)
    ui = {}
    for t in ('BUOK','BUDE','BULS','GLOB','SLID','CURT','CANT','TH1','TH2'):
        c = get(t)
        if c: ui[t] = decode_button_sound(t,c)
    if ui: R['ui_sounds'] = ui
    return R

# ── report formatter ─────────────────────────────────────────────────

def report(R):
    L=[]; W=62
    def sec(t): L.append(f"\n{'─'*W}"); L.append(t); L.append('─'*W)

    L.append('='*W); L.append("NANCY DREW: STAY TUNED FOR DANGER  —  BOOT.bin Decoded"); L.append('='*W)

    if 'bootbsum' in R:
        b = R['bootbsum']; sec("GAME IDENTITY  (BOOTBSUM)")
        L.append(f"  Publisher : {b['publisher']}")
        L.append(f"  Series    : {b['series']}")
        L.append(f"  Subtitle  : {b['subtitle']}")
        L.append(f"  Save ID   : {b['savegame_id']}    Fonts: {b['num_fonts']}")
        L.append(f"  BG sprites: {b['n_anims']} anims + {b['n_overlays']} overlays")
        for s in b['sprites']:
            xy = f"  pos=({s['x']},{s['y']}) fr={s['frame']}" if s['x'] is not None else ''
            L.append(f"    [{s['index']:2d}] {s['name']!r:12s}{xy}")

    if 'viewports' in R:
        sec("VIEWPORTS  (VIEW)")
        for v in R['viewports']:
            L.append(f"  {v['name']:20s}: ({v['x1']},{v['y1']})-({v['x2']},{v['y2']})  {v['w']}×{v['h']}")

    if 'hints' in R:
        h = R['hints']; sec("HINTS  (HINT)")
        L.append(f"  Junior: {h['junior_detective']}  Senior: {h['senior_detective']}  Master: {h['master_detective']}")

    if 'map' in R:
        m = R['map']; sec(f"MAP  (MAP)  —  {m['day_bg']} / {m['night_bg']}")
        L.append(f"  {len(m['hotspots'])} clickable hotspot(s):")
        for h in m['hotspots']:
            L.append(f"    ({h['x1']},{h['y1']})-({h['x2']},{h['y2']})  {h['w']}×{h['h']}px")
        L.append("  Locations:")
        for loc in m['locations']:
            p = f"pin=({loc['pin']['x']},{loc['pin']['y']})" if loc['pin'] else ''
            L.append(f"    scene {loc['scene_id']:4d}  scroll={loc['scroll_y']:4d}  {loc['name']!r:36s} {p}")

    if 'fonts' in R:
        sec(f"FONTS  (FONT)  —  {len(R['fonts'])} fonts")
        for f in R['fonts']:
            used = sum(1 for g in f['glyphs'] if g['w']>0)
            L.append(f"  Font {f['index']}: id='{f['id']}'  name='{f['name']}'  ({used}/78 glyphs)")
            for g in [g for g in f['glyphs'] if g['char'].isupper() and g['w']>0][:3]:
                L.append(f"    '{g['char']}'  ({g['x1']},{g['y1']})-({g['x2']},{g['y2']})  {g['w']}×{g['h']}px")

    if 'cursors' in R:
        sec(f"CURSORS  (CURS)  —  {len(R['cursors'])} cursors")
        for c in R['cursors'][:12]:
            L.append(f"  [{c['index']:2d}] {c['name']:22s}  sprite=({c['sprite_x']:4d},{c['sprite_y']:4d})  hot=({c['hot_x']:3d},{c['hot_y']:3d})")
        if len(R['cursors'])>12: L.append(f"  … {len(R['cursors'])-12} more cursor entries")

    sec("UI SOUNDS")
    if 'menu_music' in R:
        m = R['menu_music']
        L.append(f"  MSND  {'menu_music':22s}: '{m['filename']}'  id={m['sound_id']}  vol={m['volume_l']}  flags={m['flags']}")
    if 'ui_sounds' in R:
        for t,s in R['ui_sounds'].items():
            L.append(f"  {t:4s}  {s['label']:22s}: '{s['filename']}'  id={s['sound_id']}  vol={s['volume_l']}  flags={s['flags']}")
    if 'tension_music' in R:
        tm = R['tension_music']
        L.append(f"\n  Tension tracks ({len(tm['entries'])} entries):")
        for e in tm['entries']: L.append(f"    '{e['filename']}'  id={e['sound_id']}  vol={e['volume_l']}")

    if 'combination_puzzle' in R:
        sec("COMBINATION PUZZLE ANSWER  (SPUZ)")
        L.append(f"  Slider sequence: {R['combination_puzzle']['solution']}")

    sec("SCREEN LAYOUTS")
    for k,lbl in [('menu','Menu'),('help','Help'),('settings','Settings'),('credits','Credits'),('load_save','Load/Save')]:
        if k in R:
            bg = R[k].get('bg_image','?')
            fr = R[k].get('full_rect') or R[k].get('screen_rect') or []
            dims = f'  640×480' if fr else ''
            L.append(f"  {lbl:12s}: '{bg}'{dims}")

    if 'load_save' in R:
        ls = R['load_save']; sec("LOAD/SAVE SCREEN  (LOAD)")
        for k in ('bg_image','nancy_ck_img','console_ck_img','cheat_img','save_img'):
            L.append(f"  {k:20s}: '{ls[k]}'")

    if 'credits' in R:
        c = R['credits']; sec("CREDITS  (CRED)")
        L.append(f"  bg='{c['bg_image']}'  img='{c['credit_image']}'  scroll_speed={c['scroll_speed']}")

    if 'intro' in R:
        sec("INTRO SEQUENCE  (INTR)")
        L.append(f"  {R['intro']['resource_names']}")

    if 'bitmaps' in R:
        sec("BITMAP RESOURCES  (DATA)")
        L.append(f"  {R['bitmaps']['names']}")

    if 'quotes' in R:
        sec(f"LOADING QUOTES  (QUOT)  —  {len(R['quotes'])} developer in-jokes")
        for i,q in enumerate(R['quotes']):
            t = q['text'][:58]+('…' if len(q['text'])>58 else '')
            L.append(f'  [{i:2d}] "{t}"')

    L.append(f"\n{'='*W}"); L.append(f"Decoded {len(R)} chunk groups  |  BOOT.bin complete"); L.append('='*W)
    return '\n'.join(L)

# ── entry point ──────────────────────────────────────────────────────
if __name__ == '__main__':
    path = sys.argv[1] if len(sys.argv)>1 else './StayTunedForDanger/stfd_extracted/BOOT.bin'
    out_json = './StayTunedForDanger/stfd_boot.json'
    out_txt  = './StayTunedForDanger/stfd_boot.txt'
    if not os.path.exists(path): print(f"ERROR: not found: {path}"); sys.exit(1)
    R = decode_boot(path)
    with open(out_json,'w') as f: json.dump(R,f,indent=2)
    print(f"JSON → {out_json}")
    txt = report(R)
    with open(out_txt,'w') as f: f.write(txt)
    print(f"Text → {out_txt}\n")
    print(txt)
