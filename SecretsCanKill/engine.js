'use strict';

const ND = (() => {

  // ── Constants ────────────────────────────────────────────────────────────
  const GAME_W = 536, GAME_H = 292;

  // Base cursor sprite rects in object0.png + CSS hotspot offsets
  const CURSOR_DEFS = {
    arrow:        { sx:506, sy:3,  w:29, h:39, hotX:1,  hotY:1  },
    hand_pointer: { sx:537, sy:3,  w:29, h:39, hotX:10, hotY:3  },
    magnify:      { sx:568, sy:3,  w:29, h:39, hotX:14, hotY:14 },
    walk:         { sx:568, sy:85, w:29, h:39, hotX:14, hotY:5  },
    look:         { sx:506, sy:44, w:29, h:39, hotX:14, hotY:14 },
    talk:         { sx:506, sy:85, w:29, h:39, hotX:14, hotY:14 },
    locked:       { sx:537, sy:44, w:29, h:39, hotX:14, hotY:14 },
    wait:         { sx:537, sy:85, w:29, h:39, hotX:14, hotY:14 },
  };

  // Inventory cursor y-positions in toolcur1.png (3 columns at x=2, x=33, x=64)
  const INV_CURSOR_MAP = {
    0:166, 1:43, 2:289, 3:125, 4:371, 5:330, 6:207, 7:248, 8:84, 9:494, 10:535,
  };

  const SPEAKERS = {
    d: 'Daryl Gray', c: 'Connie Watson', hd: 'Hulk Sanchez',
    h: 'Hal Tanaka', intro: 'Narrator', epil: 'Nancy Drew',
  };

  const ITEM_NAMES = {
    0: 'Bolt cutters', 1: 'Phone card', 2: 'Coin', 3: 'Glass cutter',
    4: 'Gun', 5: 'Key (passport)', 6: 'Ladle', 7: 'Video tape',
    8: 'Work gloves', 9: 'Key (safe)', 10: 'Remote control',
  };

  // NPC prefix → met-flag ID (set to 2 on first conversation)
  const NPC_MET_FLAG = { d: 38, c: 19, hd: 29, h: 11 };

  // Scenes that serve as NPC investigation hubs → NPC prefix
  const INVESTIGATION_HUB_SCENES = {
    'S101':  'd',   // Daryl hub (d1=first meeting, d03/d04/d05=subsequent visits)
    'S201':  'c',   // Connie hub (c1=first meeting, c29/c30/c31=subsequent visits)
    'S301':  'hd',  // Hulk hub
    'S401':  'h',   // Hal hub
  };

  // Farewell data: Nancy's goodbye audio + NPC farewell scene pool
  const FAREWELL_DATA = {
    d:  { audio: 'nd0d',  text: 'See ya later.',       scenes: ['S3220', 'S3221', 'S3222', 'S3223'] },
    c:  { audio: 'nd0c',  text: 'Goodbye!',            scenes: ['S252', 'S2521', 'S2523'] },
    hd: { audio: 'nd0h',  text: 'Bye!',                scenes: ['S3297', 'S3298', 'S3299'] },
    h:  { audio: 'nd0hl', text: 'Talk to you later!',  scenes: ['S451', 'S452', 'S453', 'S454'] },
  };

  // ── Dynamic investigation questions (extracted from Game.exe binary) ──
  // Each NPC's question injector function adds these when conditions pass.
  // Conditions: story flags + availability flags (avail flags prevent re-asking).
  // response_scene = scene to load for the NPC's spoken response.
  // Daryl: FUN_00443B10 (0x65E=0), Connie: FUN_00445140 (0x65E=1),
  // Hal: FUN_00445CA0 (0x65E=2), Hulk: FUN_004466E0 (0x65E=3).
  const INVESTIGATION_QUESTIONS = {
    // ── Daryl Gray (18 questions) ───────────────────────────────────────
    d: [
      { id: 'DIC1',  text: 'How well do you know Hulk Sanchez?',
        conditions: [{flag_id: 29, expected: 2}, {flag_id: 57, expected: 1}],
        response_scene: 'S124' },
      { id: 'DIC2',  text: 'Do you know Connie Watson?',
        conditions: [{flag_id: 19, expected: 2}, {flag_id: 55, expected: 1}],
        response_scene: 'S127' },
      { id: 'DIC3',  text: 'What can you tell me about Hal Tanaka?',
        conditions: [{flag_id: 11, expected: 2}, {flag_id: 56, expected: 1}],
        response_scene: 'S129' },
      { id: 'DIC4',  text: "Daryl, do you know where I could get Jake Roger's locker combination?",
        conditions: [{flag_id: 0, expected: 2}, {flag_id: 1, expected: 1}, {flag_id: 107, expected: 1}],
        response_scene: 'S131' },
      { id: 'DIC5',  text: 'Do you know why Jake had a video camera in his locker?',
        conditions: [{flag_id: 100, expected: 2}, {flag_id: 30, expected: 1}, {flag_id: 20, expected: 1}, {flag_id: 12, expected: 1}, {flag_id: 108, expected: 1}],
        response_scene: 'S132' },
      { id: 'DIC6',  text: "Hal, Hulk and Connie were all involved with Jake.  He had information that could jeopardize Hal's career.  Connie once dated Jake and Hulk seems awfully touchy about that break-in at the Drug Depot.",
        conditions: [{flag_id: 6, expected: 2}, {flag_id: 8, expected: 2}, {flag_id: 94, expected: 2}, {flag_id: 23, expected: 2}, {flag_id: 36, expected: 2}, {flag_id: 9, expected: 2}, {flag_id: 109, expected: 1}],
        response_scene: 'S134' },
      { id: 'DIC7',  text: 'I think Jake had some sensitive information on Hulk Sanchez.  Do you think Hulk could have killed Jake?',
        conditions: [{flag_id: 36, expected: 2}, {flag_id: 9, expected: 2}, {flag_id: 94, expected: 1}, {flag_id: 8, expected: 1}, {flag_id: 110, expected: 1}],
        response_scene: 'S139' },
      { id: 'DIC8',  text: 'Looks like Jake had a hold on both Hulk and Connie.  What now?',
        conditions: [{flag_id: 94, expected: 2}, {flag_id: 36, expected: 2}, {flag_id: 9, expected: 2}, {flag_id: 8, expected: 1}, {flag_id: 111, expected: 1}],
        response_scene: 'S141' },
      { id: 'DIC9',  text: 'Jake was pressuring both Hal and Hulk.  It could have been either of them.  What do you think?',
        conditions: [{flag_id: 36, expected: 2}, {flag_id: 9, expected: 2}, {flag_id: 6, expected: 2}, {flag_id: 8, expected: 2}, {flag_id: 94, expected: 1}, {flag_id: 112, expected: 1}],
        response_scene: 'S143' },
      { id: 'DIC10', text: 'Connie lied about her dating Jake.  Could something have happened between them that would push her to murder?',
        conditions: [{flag_id: 94, expected: 2}, {flag_id: 36, expected: 1}, {flag_id: 8, expected: 1}, {flag_id: 113, expected: 1}],
        response_scene: 'S144' },
      { id: 'DIC11', text: "Jake had some kind of hold on Connie and Hal.  Is it possible that one of them killed Jake?",
        conditions: [{flag_id: 94, expected: 2}, {flag_id: 8, expected: 2}, {flag_id: 6, expected: 2}, {flag_id: 36, expected: 1}, {flag_id: 114, expected: 1}],
        response_scene: 'S145' },
      { id: 'DIC12', text: "Hal had a reason to hate Jake, but it's hard to picture him as a murderer.",
        conditions: [{flag_id: 8, expected: 2}, {flag_id: 6, expected: 2}, {flag_id: 94, expected: 1}, {flag_id: 36, expected: 1}, {flag_id: 115, expected: 1}],
        response_scene: 'S146' },
      { id: 'DIC13', text: "Hal, Connie, and Hulk didn't seem to like Jake very much.  I think they all had a reason to want him dead.",
        conditions: [{flag_id: 29, expected: 2}, {flag_id: 19, expected: 2}, {flag_id: 11, expected: 2}, {flag_id: 94, expected: 1}, {flag_id: 36, expected: 1}, {flag_id: 8, expected: 1}, {flag_id: 116, expected: 1}],
        response_scene: 'S150' },
      { id: 'DIC14', text: "I saw Jake's tape, Daryl.  I know he was blackmailing you.",
        conditions: [{flag_id: 39, expected: 1}, {flag_id: 5, expected: 2}],
        response_scene: 'S151' },
      { id: 'DIC15', text: "Daryl, we're going to find the person who killed Jake.  If you help out now, the case will move a lot quicker.",
        conditions: [{flag_id: 40, expected: 2}, {flag_id: 117, expected: 1}],
        response_scene: 'S156' },
      { id: 'DIC16', text: 'Why would Jake have an old English book in his locker?',
        conditions: [{flag_id: 12, expected: 1}, {flag_id: 6, expected: 2}, {flag_id: 118, expected: 1}],
        response_scene: 'S147' },
      { id: 'DIC17', text: 'Was Jake interested in Judo?',
        conditions: [{flag_id: 20, expected: 1}, {flag_id: 4, expected: 2}, {flag_id: 119, expected: 1}],
        response_scene: 'S148' },
      { id: 'DIC18', text: 'What do you know about the break-in at the pharmacy?',
        conditions: [{flag_id: 30, expected: 1}, {flag_id: 99, expected: 2}, {flag_id: 120, expected: 1}],
        response_scene: 'S149' },
    ],
    // ── Connie Watson (10 questions) ────────────────────────────────────
    c: [
      { id: 'CIC1',  text: 'What do you know about Hulk Sanchez?',
        conditions: [{flag_id: 29, expected: 2}, {flag_id: 24, expected: 1}],
        response_scene: 'S233' },
      { id: 'CIC2',  text: "Hulk told me money's been tight for you these days.",
        conditions: [{flag_id: 31, expected: 2}, {flag_id: 25, expected: 1}],
        response_scene: 'S234' },
      { id: 'CIC3',  text: 'Do you know Hal Tanaka?',
        conditions: [{flag_id: 11, expected: 2}, {flag_id: 26, expected: 1}],
        response_scene: 'S235' },
      { id: 'CIC4',  text: 'How well do you know Daryl Gray?',
        conditions: [{flag_id: 38, expected: 2}, {flag_id: 28, expected: 1}],
        response_scene: 'S236' },
      { id: 'CIC5',  text: "Do you know the combination to Jake Roger's locker?",
        conditions: [{flag_id: 0, expected: 2}, {flag_id: 1, expected: 1}, {flag_id: 121, expected: 1}],
        response_scene: 'S237' },
      { id: 'CIC6',  text: "You're wearing a Japanese medallion with a symbol that means crane, and Crane is the name of the judo school on the poster in the gym.",
        conditions: [{flag_id: 2, expected: 2}, {flag_id: 3, expected: 2}, {flag_id: 23, expected: 1}],
        response_scene: 'S238' },
      { id: 'CIC7',  text: 'Do you know why Jake had a video camera in his locker?',
        conditions: [{flag_id: 100, expected: 2}, {flag_id: 22, expected: 1}],
        response_scene: 'S239' },
      { id: 'CIC8',  text: "I know you're the unknown winner of that judo competition.  Jake Rogers had it all on videotape.",
        conditions: [{flag_id: 5, expected: 2}, {flag_id: 20, expected: 1}],
        response_scene: 'S240' },
      { id: 'CIC9',  text: "Connie, we're going to find the person who killed Jake.  If you help out now, the case will move a lot quicker.",
        conditions: [{flag_id: 40, expected: 2}],
        response_scene: 'S245' },
      { id: 'CIC10', text: "Didn't I hear you were dating Jake?",
        conditions: [{flag_id: 13, expected: 2}, {flag_id: 94, expected: 1}],
        response_scene: 'S231' },
    ],
    // ── Hulk Sanchez (9 questions) ──────────────────────────────────────
    hd: [
      { id: 'hdic1', text: 'What can you tell me about Connie Watson?',
        conditions: [{flag_id: 19, expected: 2}, {flag_id: 58, expected: 1}],
        response_scene: 'S333' },
      { id: 'hdic2', text: 'Do you know Hal Tanaka?',
        conditions: [{flag_id: 11, expected: 2}, {flag_id: 37, expected: 1}],
        response_scene: 'S336' },
      { id: 'hdic3', text: "I'm really sorry you got injured.  Does that affect your chances of playing college ball?",
        conditions: [{flag_id: 18, expected: 2}, {flag_id: 33, expected: 1}],
        response_scene: 'S339' },
      { id: 'hdic4', text: 'What can you tell me about Daryl Gray?',
        conditions: [{flag_id: 38, expected: 2}, {flag_id: 34, expected: 1}],
        response_scene: 'S340' },
      { id: 'hdic5', text: "How could I get into Jake's locker?",
        conditions: [{flag_id: 0, expected: 2}, {flag_id: 1, expected: 1}, {flag_id: 102, expected: 1}],
        response_scene: 'S341' },
      { id: 'hdic6', text: 'Do you know why Jake had a video camera in his locker?',
        conditions: [{flag_id: 103, expected: 1}, {flag_id: 100, expected: 2}],
        response_scene: 'S342' },
      { id: 'hdic7', text: 'Tell me about the robbery at the Drug Depot pharmacy.',
        conditions: [{flag_id: 99, expected: 2}, {flag_id: 36, expected: 1}],
        response_scene: 'S343' },
      { id: 'hdic8', text: "Jake knew you broke into the Drug Depot.  He was blackmailing you, wasn't he?",
        conditions: [{flag_id: 5, expected: 2}, {flag_id: 30, expected: 1}],
        response_scene: 'S344' },
      { id: 'hdic9', text: "Hulk, we're going to find the person who killed Jake.  If you help out now, this case will move a lot quicker.",
        conditions: [{flag_id: 40, expected: 2}],
        response_scene: 'S345' },
    ],
    // ── Hal Tanaka (9 questions) ────────────────────────────────────────
    h: [
      { id: 'hic1',  text: 'Have you heard of Hulk Sanchez?',
        conditions: [{flag_id: 29, expected: 2}, {flag_id: 17, expected: 1}],
        response_scene: 'S435' },
      { id: 'hic2',  text: 'Do you know Connie Watson?',
        conditions: [{flag_id: 19, expected: 2}, {flag_id: 14, expected: 1}],
        response_scene: 'S437' },
      { id: 'hic3',  text: 'Connie told me you study too hard.  Is that true?',
        conditions: [{flag_id: 27, expected: 2}, {flag_id: 15, expected: 1}],
        response_scene: 'S438' },
      { id: 'hic4',  text: 'What can you tell me about Daryl Gray?',
        conditions: [{flag_id: 38, expected: 2}, {flag_id: 16, expected: 1}],
        response_scene: 'S439' },
      { id: 'hic5',  text: "Do you know the combination to Jake Rogers' locker?",
        conditions: [{flag_id: 0, expected: 2}, {flag_id: 1, expected: 1}, {flag_id: 104, expected: 1}],
        response_scene: 'S441' },
      { id: 'hic6',  text: "Hulk said your locker was right next to Jake's.  Are you sure you don't know the combination?",
        conditions: [{flag_id: 0, expected: 2}, {flag_id: 1, expected: 1}, {flag_id: 32, expected: 2}, {flag_id: 105, expected: 1}],
        response_scene: 'S442' },
      { id: 'hic7',  text: 'Do you know why Jake had a video camera in his locker?',
        conditions: [{flag_id: 106, expected: 1}, {flag_id: 100, expected: 2}, {flag_id: 5, expected: 1}],
        response_scene: 'S443' },
      { id: 'hic8',  text: "Jake knew you copied your essay from that book of English essays, didn't he?",
        conditions: [{flag_id: 8, expected: 2}, {flag_id: 6, expected: 2}, {flag_id: 12, expected: 1}],
        response_scene: 'S444' },
      { id: 'hic9',  text: "Hal, we're going to find the person who killed Jake.  If you help out now, this case will move a lot quicker.",
        conditions: [{flag_id: 40, expected: 2}],
        response_scene: 'S446' },
    ],
  };

  // Sprite sheet source rects per item (from TOOL extracted from BOOT)
  const ITEM_SPRITES = {
    0:  { sheet: 'TOOL', x: 102, y:  12, w: 42, h: 54 },  // Bolt cutters
    1:  { sheet: 'TOOL', x:  91, y:  65, w: 59, h: 70 },  // Phone card
    2:  { sheet: 'TOOL', x: 174, y: 138, w: 45, h: 46 },  // Coin
    3:  { sheet: 'TOOL', x:  27, y:  13, w: 38, h: 52 },  // Glass cutter
    4:  { sheet: 'TOOL', x: 174, y:  72, w: 41, h: 56 },  // Gun
    5:  { sheet: 'TOOL', x:  27, y: 136, w: 37, h: 52 },  // Key (passport)
    6:  { sheet: 'TOOL', x:  99, y: 128, w: 44, h: 63 },  // Ladle
    7:  { sheet: 'TOOL', x: 177, y:  14, w: 41, h: 49 },  // Video tape
    8:  { sheet: 'TOOL', x:  26, y:  74, w: 45, h: 53 },  // Work gloves
    9:  { sheet: 'TOOL', x:  27, y: 198, w: 37, h: 52 },  // Key (safe)
    10: { sheet: 'TOOL', x:  96, y: 188, w: 51, h: 66 },  // Remote control
  };

  // ── State ────────────────────────────────────────────────────────────────
  let state = {
    flags: {},
    inventory: new Set(),
    activeItem: null, // Currently selected inventory item (item ID or null)
    currentSceneId: null,
    currentVariant: 0,
    debugHotspots: false,
    history: [],          // Scene history for Back button
    timerActive: false,
    timerStartTime: 0,
    animationEnabled: false,
    voicesEnabled: true,
    autoPanEnabled: true,
  };
  let convAudio = null;        // Currently playing conversation/dialogue audio
  let timerCheckInterval = null;
  let secondChanceSave = null; // Auto-checkpoint before dangerous scenes
  let savTemplate = null;      // ArrayBuffer from last loaded .SAV — used as export template

  let scenes = {};         // All scenes from JSON
  let convIndex = {};      // node_id.toUpperCase() → action object
  let nodeSceneMap = {};   // node_id.toUpperCase() → sceneId that hosts it
  let activeHotspots = [];
  let bgNativeHeight = GAME_H; // native pixel height of current bg (376 for panoramics, 292 for closeups)
  let movieActive = false; // true while a PLAY_SECONDARY_MOVIE is playing
  let sceneSounds = [];    // Audio elements playing in current scene (stopped on navigate)
  let autoPanInterval = null; // setInterval handle for auto-panning
  let autoPanDir = 0;         // current auto-pan direction (+1 or -1)

  // ── Main menu state ──────────────────────────────────────────────────────
  let menuActive = false;
  let menuScreen = 'logo'; // 'logo' | 'main' | 'help' | 'credits'
  let menuHoverIdx = -1;   // index into MENU_BUTTONS, -1 = none
  let menuBgImg = null;    // cached main.png Image

  // Button definitions: sorted by visual order (top→bottom on screen).
  // Coordinates are in original 640×480 space; scaled to canvas at render time.
  // hl_* = highlight sprite source rect in main.png (below y=480).
  const MENU_BUTTONS = [
    { id: 'new',      label: 'New Game',         x1: 193, y1:  52, x2: 385, y2:  76, hl_x: 1,   hl_y: 507 },
    { id: 'load',     label: 'Load & Save Game', x1: 146, y1: 102, x2: 404, y2: 126, hl_x: 195, hl_y: 507 },
    { id: 'continue', label: 'Continue Game',    x1: 150, y1: 148, x2: 383, y2: 172, hl_x: 1,   hl_y: 585 },
    { id: 'second',   label: 'Second Chance',    x1: 140, y1: 195, x2: 381, y2: 219, hl_x: 236, hl_y: 585 },
    { id: 'setup',    label: 'Game Setup',       x1: 165, y1: 242, x2: 375, y2: 270, hl_x: 1,   hl_y: 667 },
    { id: 'credits',  label: 'Credits',          x1: 198, y1: 290, x2: 357, y2: 314, hl_x: 455, hl_y: 507 },
    { id: 'help',     label: 'Help',             x1: 198, y1: 336, x2: 342, y2: 364, hl_x: 479, hl_y: 589 },
    { id: 'exit',     label: 'Exit Game',        x1: 192, y1: 384, x2: 367, y2: 408, hl_x: 213, hl_y: 663 },
  ];

  // Fidget animation state
  let fidgetInterval = null;
  let fidgetFrames = [];
  let fidgetFrameIndex = 0;
  let fidgetDrawRect = null;
  let fidgetBgSnapshot = null;
  let fidgetIdleEnd = 0;      // last frame index of idle loop
  let fidgetHoverStart = 0;   // first frame index of hover loop
  let fidgetHovering = false;  // true when mouse is over NPC hotspot
  let fidgetUnhovering = false; // true while playing hover animation in reverse

  // Conversation animation state
  let convAnimInterval = null;
  let convAnimFrames = [];
  let convAnimFrameIndex = 0;

  // Asset config
  let FRAMES_DIR, AUDIO_DIR, SPRITES_DIR;
  let START_SCENE_ID = 'S5';
  let INITIAL_FLAGS = {};

  // DOM refs
  const canvas    = document.getElementById('game-canvas');
  const ctx       = canvas.getContext('2d');
  const convOL    = document.getElementById('conv-overlay');
  const convSpkr  = document.getElementById('conv-speaker');
  const convTxt   = document.getElementById('conv-text');
  const convChs   = document.getElementById('conv-choices');
  const convCont  = document.getElementById('conv-continue');
  const mapOL     = document.getElementById('map-overlay');
  const mapBtns   = document.getElementById('map-btns');
  const invBar    = document.getElementById('inv-bar');
  const sceneInfo = document.getElementById('scene-info');
  const debugInfo = document.getElementById('debug-info');

  // Audio
  let ambientAudio = null;
  const imgCache = {};
  const chromaKeyCache = {}; // cacheKey → canvas element (processed removeChromaKey results)
  const gameCursors = {};    // name → CSS cursor string (e.g. 'url(...) 1 1, auto')
  const itemCursors = {};    // itemId → { normal, green, red } CSS cursor strings
  const SLOT_SIZE = 54; // px, inventory slot canvas size

  // ── Markup helpers ───────────────────────────────────────────────────────
  function stripMarkup(t) {
    if (!t) return '';
    return t.replace(/<i>/g,'').replace(/<\/i>/g,'')
            .replace(/<n>/g,'\n').replace(/<o>/g,'')
            .replace(/<c\d>/g,'').replace(/<h>/g,'')
            .trim();
  }

  // Convert <c1>X<c0>rest to <span class="hl">X</span>rest
  function markupToHtml(t) {
    if (!t) return '';
    return t.replace(/<c1>(.)<c0>/g, '<span class="hl">$1</span>')
            .replace(/<h>/g,'').replace(/<n>/g,' ').replace(/<[^>]+>/g,'')
            .trim();
  }

  function getSpeaker(nodeId) {
    if (!nodeId) return '';
    const id = nodeId.toLowerCase();
    if (id.startsWith('hd'))    return SPEAKERS.hd;
    if (id.startsWith('intro')) return SPEAKERS.intro;
    if (id.startsWith('epil'))  return SPEAKERS.epil;
    return SPEAKERS[id[0]] || nodeId;
  }

  // ── Asset loading ────────────────────────────────────────────────────────
  function loadImg(src) {
    if (imgCache[src]) return Promise.resolve(imgCache[src]);
    return new Promise((res, rej) => {
      const img = new Image();
      img.onload  = () => { imgCache[src] = img; res(img); };
      img.onerror = () => rej(new Error(src));
      img.src = src;
    });
  }

  // All asset filenames are lowercase on disk
  async function tryLoadImg(dir, name, ext) {
    try { return await loadImg(`${dir}/${name.toLowerCase()}${ext.toLowerCase()}`); } catch (_) {}
    return null;
  }

  // ── Audio ────────────────────────────────────────────────────────────────
  function playSound(name) {
    if (!name || name.trim() === 'NO SOUND') return null;
    const a = new Audio(`${AUDIO_DIR}/${name.trim().toLowerCase()}.wav`);
    a.volume = 0.65;
    a.play().catch(() => {});
    return a;
  }

  // Returns a promise that resolves when the audio finishes (or immediately if null)
  function waitForSound(audio) {
    if (!audio) return Promise.resolve();
    return new Promise(resolve => {
      audio.addEventListener('ended', resolve, { once: true });
      audio.addEventListener('error', resolve, { once: true });
    });
  }

  // Play a conversation voice line, stopping any previous one.
  // Returns the Audio element (or null if voices are disabled).
  function playConvVoice(name) {
    stopConvVoice();
    if (!state.voicesEnabled) return null;
    convAudio = playSound(name);
    return convAudio;
  }

  function stopConvVoice() {
    if (convAudio) { convAudio.pause(); convAudio = null; }
  }

  let ambientKey = null; // lowercase key of current ambient to avoid restarts

  function setAmbient(name) {
    if (!name || name.trim() === 'NO SOUND' || name.trim() === '') {
      stopAmbient(); return;
    }
    const key = name.trim().toLowerCase();
    if (key === ambientKey) return; // same ambient already playing
    stopAmbient();
    ambientKey = key;
    const a = new Audio(`${AUDIO_DIR}/${key}.wav`);
    a.loop = true; a.volume = 0.35;
    a.play().then(() => {
      if (ambientKey !== key) { a.pause(); return; } // scene changed while loading
      ambientAudio = a;
    }).catch(() => {});
  }

  function stopAmbient() {
    ambientKey = null;
    if (ambientAudio) { ambientAudio.pause(); ambientAudio = null; }
  }

  // ── Main menu ────────────────────────────────────────────────────────────
  // Logo screen → main menu → sub-screens (help, credits).
  // Menu renders directly to the game canvas; menuActive blocks normal input.

  const MENU_SCALE_X = GAME_W / 640;  // 536/640 = 0.8375
  const MENU_SCALE_Y = GAME_H / 480;  // 292/480 ≈ 0.6083

  function menuBtnToCanvas(btn) {
    return {
      x1: btn.x1 * MENU_SCALE_X | 0,
      y1: btn.y1 * MENU_SCALE_Y | 0,
      x2: btn.x2 * MENU_SCALE_X | 0,
      y2: btn.y2 * MENU_SCALE_Y | 0,
    };
  }

  function isMenuBtnEnabled(btn) {
    if (btn.id === 'continue') return hasSavedGame();
    if (btn.id === 'second')   return !!secondChanceSave;
    return true;
  }

  async function showMenu(skipLogo) {
    if (convOL.classList.contains('active')) return;
    menuActive = true;
    menuScreen = skipLogo ? 'main' : 'logo';
    menuHoverIdx = -1;

    // Save current game so "Continue" works when returning mid-game
    if (skipLogo && state.currentSceneId) saveGame();

    // Stop everything from prior gameplay
    stopFidget();
    stopConvAnimation();
    stopTimer();
    convOL.classList.remove('active', 'below-canvas');
    mapOL.classList.remove('active');
    document.getElementById('gameover-overlay').classList.remove('active');
    document.getElementById('continue-overlay').classList.remove('active');
    invBar.style.visibility = 'hidden';
    sceneInfo.textContent = 'Main Menu';

    // Menu music
    setAmbient('excite');

    if (skipLogo) {
      await renderMainMenu();
    } else {
      const logo = await tryLoadImg(SPRITES_DIR, 'logo', '.png');
      if (logo) {
        ctx.drawImage(logo, 0, 0, 640, 480, 0, 0, GAME_W, GAME_H);
      } else {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, GAME_W, GAME_H);
      }
    }
  }

  async function renderMainMenu() {
    if (!menuBgImg) {
      menuBgImg = await tryLoadImg(SPRITES_DIR, 'main', '.png');
    }
    if (!menuBgImg) return;

    // Draw top 480 rows of sprite sheet scaled to canvas
    ctx.drawImage(menuBgImg, 0, 0, 640, 480, 0, 0, GAME_W, GAME_H);

    // Dim unavailable buttons
    for (let i = 0; i < MENU_BUTTONS.length; i++) {
      const btn = MENU_BUTTONS[i];
      if (!isMenuBtnEnabled(btn)) {
        const r = menuBtnToCanvas(btn);
        ctx.fillStyle = 'rgba(0,0,0,0.45)';
        ctx.fillRect(r.x1, r.y1, r.x2 - r.x1, r.y2 - r.y1);
      }
    }

    // Draw highlight on hovered button
    if (menuHoverIdx >= 0) {
      const btn = MENU_BUTTONS[menuHoverIdx];
      if (isMenuBtnEnabled(btn)) {
        const w = btn.x2 - btn.x1;
        const h = btn.y2 - btn.y1;
        const r = menuBtnToCanvas(btn);
        ctx.drawImage(menuBgImg,
          btn.hl_x, btn.hl_y, w, h,       // source rect in sprite sheet
          r.x1, r.y1, r.x2 - r.x1, r.y2 - r.y1  // dest on canvas
        );
      }
    }
  }

  async function showMenuScreen(screen) {
    menuScreen = screen;
    menuHoverIdx = -1;

    if (screen === 'help') {
      const img = await tryLoadImg(SPRITES_DIR, 'helpscrn', '.png');
      if (img) ctx.drawImage(img, 0, 0, 640, 480, 0, 0, GAME_W, GAME_H);
    } else if (screen === 'credits') {
      const img = await tryLoadImg(SPRITES_DIR, 'creditbk', '.png');
      if (img) ctx.drawImage(img, 0, 0, 640, 480, 0, 0, GAME_W, GAME_H);
    }
  }

  function menuHitTest(cx, cy) {
    for (let i = 0; i < MENU_BUTTONS.length; i++) {
      const r = menuBtnToCanvas(MENU_BUTTONS[i]);
      if (cx >= r.x1 && cx <= r.x2 && cy >= r.y1 && cy <= r.y2) return i;
    }
    return -1;
  }

  function handleMenuClick(cx, cy) {
    if (menuScreen === 'logo') {
      playSound('clik7');
      menuScreen = 'main';
      renderMainMenu();
      return;
    }

    if (menuScreen === 'help' || menuScreen === 'credits') {
      // Any click returns to main menu
      playSound('clik7');
      menuScreen = 'main';
      renderMainMenu();
      return;
    }

    // Main menu
    const idx = menuHitTest(cx, cy);
    if (idx < 0) return;
    const btn = MENU_BUTTONS[idx];
    if (!isMenuBtnEnabled(btn)) {
      playSound('squack2');
      return;
    }

    playSound('clik7');

    switch (btn.id) {
      case 'new':
        menuActive = false;
        invBar.style.visibility = '';
        stopAmbient();
        // Reset state like debugRestart
        state.flags = {};
        state.inventory = new Set();
        state.activeItem = null;
        state.history = [];
        Object.assign(state.flags, INITIAL_FLAGS);
        for (const qs of Object.values(INVESTIGATION_QUESTIONS)) {
          for (const q of qs) {
            for (const c of q.conditions || []) {
              if (c.expected === 1 && !(c.flag_id in state.flags))
                state.flags[c.flag_id] = 1;
            }
          }
        }
        localStorage.removeItem(SAVE_KEY);
        updateInventoryBar();
        loadScene(START_SCENE_ID, 0, false);
        break;

      case 'load':
        promptLoadSavFile();
        break;

      case 'continue':
        menuActive = false;
        invBar.style.visibility = '';
        stopAmbient();
        loadSavedGame();
        break;

      case 'second':
        menuActive = false;
        invBar.style.visibility = '';
        stopAmbient();
        loadSecondChance();
        break;

      case 'setup':
        // Sound settings not applicable to browser engine
        playSound('squack2');
        break;

      case 'credits':
        showMenuScreen('credits');
        break;

      case 'help':
        showMenuScreen('help');
        break;

      case 'exit':
        window.close();
        break;
    }
  }

  function handleMenuMousemove(cx, cy) {
    if (menuScreen !== 'main') {
      canvas.style.cursor = gc('hand_pointer');
      return;
    }

    const idx = menuHitTest(cx, cy);
    if (idx >= 0 && isMenuBtnEnabled(MENU_BUTTONS[idx])) {
      canvas.style.cursor = gc('hand_pointer');
      if (idx !== menuHoverIdx) {
        menuHoverIdx = idx;
        playSound('clik2');
        renderMainMenu();
      }
    } else {
      canvas.style.cursor = gc('arrow');
      if (menuHoverIdx !== -1) {
        menuHoverIdx = -1;
        renderMainMenu();
      }
    }
  }

  // ── Movie playback (PLAY_SECONDARY_MOVIE) ─────────────────────────────────
  // Frame-by-frame PNG animation on canvas with timed flag triggers.
  // Blocks all input during playback (movieActive flag).

  // Screen position for movies comes from dest_rect in the action data blob
  // (per-frame entry at offset 0xD4: dst x1/y1/x2/y2).
  function getMovieRect(act) {
    const dr = act.dest_rect;
    if (dr) return { x: dr.x1, y: dr.y1, w: dr.x2 - dr.x1 + 1, h: dr.y2 - dr.y1 + 1 };
    // Fallback: full canvas
    return { x: 0, y: 0, w: GAME_W, h: GAME_H };
  }

  async function playMovie(act, sceneActions) {
    const asset = act.asset_name;
    const endFrame = act.end_frame ?? 0;
    if (endFrame <= 0) return;

    // Preload all frames
    const frames = [];
    for (let i = 0; i <= endFrame; i++) {
      const img = await tryLoadImg(FRAMES_DIR, asset, `_${String(i).padStart(3, '0')}.png`);
      if (img) frames.push({ index: i, img });
      else break; // stop at first missing frame
      if (endFrame > 5) drawLoadingBar(i + 1, endFrame + 1);
    }
    if (frames.length === 0) return;

    // Build timed flag trigger map: frame index → [{flag, value}]
    const timedMap = new Map();
    if (act.timed_flags) {
      for (const t of act.timed_flags) {
        if (!timedMap.has(t.frame)) timedMap.set(t.frame, []);
        timedMap.get(t.frame).push({ flag: t.flag, value: t.value });
      }
    }

    // Determine draw rectangle from action's dest_rect
    const rect = getMovieRect(act);

    // Play the movie sound (e.g. explosion)
    if (act.sound_file) playSound(act.sound_file);

    movieActive = true;
    const playedSounds = new Set(); // track which sounds already fired

    // Animate frame by frame at ~10fps
    await new Promise(resolve => {
      let fi = 0;
      const interval = setInterval(() => {
        if (fi >= frames.length) {
          clearInterval(interval);
          resolve();
          return;
        }
        const { index, img } = frames[fi];

        // Draw frame
        if (rect.w === GAME_W && rect.h === GAME_H) {
          ctx.drawImage(img, 0, 0, GAME_W, GAME_H);
        } else {
          ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h);
        }

        // Fire timed flag triggers and play any newly-conditioned sounds
        const triggers = timedMap.get(index);
        if (triggers) {
          for (const t of triggers) {
            state.flags[t.flag] = t.value;
          }
          // Play sounds whose flag conditions now pass (avoid re-triggering)
          if (sceneActions) {
            for (const a of sceneActions) {
              if ((a.type === 'PLAY_DIGI_SOUND' || a.type === 'PLAY_DIGI_SOUND_2')
                  && !playedSounds.has(a.sound_file) && condPass(a)) {
                playSound(a.sound_file);
                playedSounds.add(a.sound_file);
              }
            }
          }
        }

        fi++;
      }, 60);
    });

    // Set completion flags
    if (act.completion_flags) {
      for (const f of act.completion_flags) {
        state.flags[f.flag] = f.value;
      }
    }

    movieActive = false;
    return playedSounds; // sounds already triggered during playback
  }

  // Play an AVF narration video overlay (used by CONVERSATION_VIDEO with empty text)
  async function playNarrationVideo(nodeId, coords, introSound) {
    if (!nodeId) return;

    // Load all frames for this AVF
    const frames = [];
    for (let i = 0; ; i++) {
      const img = await tryLoadImg(FRAMES_DIR, nodeId, `_${String(i).padStart(3, '0')}.png`);
      if (img) frames.push(img);
      else break;
    }
    if (frames.length === 0) return;

    // Draw rect from coords: (x2,y2) → (x3,y3)
    const x = coords?.x2 ?? 0;
    const y = coords?.y2 ?? 0;
    const w = (coords?.x3 ?? (GAME_W - 1)) - x + 1;
    const h = (coords?.y3 ?? (GAME_H - 1)) - y + 1;

    // Play narration audio alongside the video
    if (introSound) playSound(introSound);

    movieActive = true;
    await new Promise(resolve => {
      let fi = 0;
      const interval = setInterval(() => {
        if (fi >= frames.length) {
          clearInterval(interval);
          resolve();
          return;
        }
        ctx.drawImage(frames[fi], x, y, w, h);
        fi++;
      }, 60);
    });
    movieActive = false;
  }

  // ── Condition evaluation ─────────────────────────────────────────────────
  function evalCond(c) {
    switch (c.type) {
      case 'flag_check':       return (state.flags[c.flag_id] ?? 1) === c.flag_value;
      case 'scene_variant':
        // Original game case 1: inventory/item state check
        // value=1 means item not owned, value=2 means item owned
        if (c.value === 2) return state.inventory.has(c.item_id);
        if (c.value === 1) return !state.inventory.has(c.item_id);
        return state.currentVariant === c.value;
      case 'inventory_check':  return state.inventory.has(c.item_id);
      case 'timed_flag':
        // Original game case 0x0e: threshold < timer_counter (timer exceeded)
        if (!state.timerActive) return false;
        return ((Date.now() - state.timerStartTime) / 1000) >= c.seconds;
      case 'timer_condition':
        // Original game case 0x0f: difficulty level check
        return (state.difficulty ?? 1) === c.flag_value;
      default: return true;
    }
  }

  function condPass(act) {
    const conds = act.conditions;
    if (!conds || conds.length === 0) return true;
    return conds.every(c => {
      // Decoder bug: SHOW_INVENTORY_ITEM has FIXED_SIZE 48 but the actual
      // action data is 60 bytes. The 12 extra bytes are misinterpreted as a
      // scene_variant condition record.  Skip it so items render correctly.
      if (act.type === 'SHOW_INVENTORY_ITEM' && c.type === 'scene_variant') return true;
      // Type 0x01 ("scene_variant") in the original engine checks a scene/item
      // state array we don't track.  When paired with a flag_check that has the
      // same expected value, the state-array check is redundant — the flag is the
      // real discriminator.  When standalone, fall back to variant check.
      if (c.type === 'scene_variant') {
        const hasMatchingFlag = conds.some(o =>
          o.type === 'flag_check' && o.flag_value === c.value);
        if (hasMatchingFlag) return true;
      }
      return evalCond(c);
    });
  }

  // Check if a PLAY_DIGI_SOUND action is triggered by an EVENTFLAGS_MULTI_HS
  // in the same scene (meaning it should play on click, not on scene load)
  function isEventFlagSound(scene, soundAct) {
    if (!soundAct.conditions || soundAct.conditions.length === 0) return false;
    return scene.actions.some(a =>
      a.type === 'EVENTFLAGS_MULTI_HS' && a.flags_set &&
      soundAct.conditions.some(c =>
        c.type === 'flag_check' && a.flags_set.some(f => f.flag === c.flag_id && f.value === c.flag_value)
      )
    );
  }

  // ── Timer system ─────────────────────────────────────────────────────────
  function getTimerDeadline() {
    // Each boiler scene has 3 timed SCENE_CHANGE actions at 300/240/180 seconds,
    // corresponding to difficulty levels: Junior(0)=300, Senior(1)=240, Master(2)=180.
    // Collect unique thresholds, sort descending, and pick by difficulty index.
    const scene = scenes[state.currentSceneId];
    if (!scene) return 180;
    const thresholds = new Set();
    for (const act of scene.actions) {
      if (act.type !== 'SCENE_CHANGE') continue;
      for (const c of act.conditions || []) {
        if (c.type === 'timed_flag') thresholds.add(c.seconds);
      }
    }
    if (thresholds.size === 0) return 180;
    const sorted = [...thresholds].sort((a, b) => b - a); // [300, 240, 180]
    const diffIdx = state.difficulty ?? 1;
    return sorted[Math.min(diffIdx, sorted.length - 1)];
  }

  const DIFFICULTY_NAMES = ['Junior', 'Senior', 'Master'];

  function updateTimerDisplay() {
    const el = document.getElementById('dp-timer');
    if (!el) return;
    const diffName = DIFFICULTY_NAMES[state.difficulty ?? 1] || 'Senior';
    if (!state.timerActive) { el.textContent = `Timer: inactive (${diffName})`; return; }
    const elapsed = Math.floor((Date.now() - state.timerStartTime) / 1000);
    const deadline = getTimerDeadline();
    const remaining = Math.max(0, deadline - elapsed);
    const min = Math.floor(remaining / 60);
    const sec = remaining % 60;
    el.textContent = `Timer: ${min}:${String(sec).padStart(2, '0')} remaining (${elapsed}s / ${deadline}s) [${diffName}]`;
    el.style.color = remaining <= 30 ? '#f44' : '#f84';
  }

  function debugTimerSkip() {
    if (!state.timerActive) { startTimer(); } else { showTimerRow(); }
    const deadline = getTimerDeadline();
    // Set start time so only 10 seconds remain
    state.timerStartTime = Date.now() - (deadline - 10) * 1000;
    updateTimerDisplay();
  }

  function debugTimerAdd() {
    if (!state.timerActive) return;
    // Push start time forward by 10s → 10 more seconds of remaining time
    state.timerStartTime += 10000;
    updateTimerDisplay();
  }

  function showTimerRow() {
    const row = document.getElementById('dp-timer-row');
    if (row) row.style.display = '';
  }

  function startTimer() {
    state.timerActive = true;
    state.timerStartTime = Date.now();
    showTimerRow();
    startTimerChecks();
  }

  function stopTimer() {
    state.timerActive = false;
    if (timerCheckInterval) { clearInterval(timerCheckInterval); timerCheckInterval = null; }
    updateTimerDisplay();
  }

  function startTimerChecks() {
    if (timerCheckInterval) clearInterval(timerCheckInterval);
    timerCheckInterval = setInterval(() => {
      if (!state.timerActive) return;
      updateTimerDisplay();
      const scene = scenes[state.currentSceneId];
      if (!scene) return;
      const deadline = getTimerDeadline();
      const elapsed = (Date.now() - state.timerStartTime) / 1000;
      if (elapsed < deadline) return;
      // Find the SCENE_CHANGE action whose timed_flag matches the difficulty deadline
      for (const act of scene.actions) {
        if (act.type !== 'SCENE_CHANGE') continue;
        if (!act.conditions || !act.conditions.some(c => c.type === 'timed_flag' && c.seconds === deadline)) continue;
        stopTimer();
        loadScene(`S${act.target_scene}`, act.scene_param ?? 0, false);
        return;
      }
    }, 2000);
  }

  // ── Choice sub-condition evaluation (for conversation choices) ───────────
  function evalChoiceCond(c) {
    if (c.type === 'flag_check')      return (state.flags[c.flag_id] ?? 1) === c.expected;
    if (c.type === 'inventory_check') return state.inventory.has(c.item_id);
    return true;
  }

  function choiceConditionsPass(conditions) {
    if (!conditions || conditions.length === 0) return true;
    const results = conditions.map(evalChoiceCond);
    // Propagate OR connections (match Game.exe.c thunk_FUN_00458280 logic)
    let changed = true;
    while (changed) {
      changed = false;
      for (let i = 0; i < conditions.length; i++) {
        if (conditions[i].operator === 'OR' && i + 1 < conditions.length) {
          if (results[i] && !results[i + 1]) { results[i + 1] = true; changed = true; }
          if (results[i + 1] && !results[i]) { results[i] = true; changed = true; }
        }
      }
    }
    return results.every(r => r);
  }

  // ── Investigation question injection ─────────────────────────────────────
  function getAvailableQuestions(npcPrefix) {
    const questions = INVESTIGATION_QUESTIONS[npcPrefix];
    if (!questions) return [];
    return questions.filter(q => {
      if (!q.conditions || q.conditions.length === 0) return true;
      return q.conditions.every(c => (state.flags[c.flag_id] ?? 1) === c.expected);
    });
  }

  // ── Farewell (goodbye) ────────────────────────────────────────────────
  async function sayGoodbye(npcPrefix) {
    const fw = FAREWELL_DATA[npcPrefix];
    if (!fw) { await exitConversation(); return; }
    // Play Nancy's goodbye audio
    const audio = playConvVoice(fw.audio);
    if (audio) await waitForSound(audio);
    // Pick a random NPC farewell scene
    const scene = fw.scenes[Math.floor(Math.random() * fw.scenes.length)];
    hideConv();
    await loadScene(scene, 0, false);
  }

  // ── Rendering ────────────────────────────────────────────────────────────
  async function renderBackground(avfName, variant = 0) {
    if (!avfName) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, GAME_W, GAME_H);
      return;
    }

    const vStr = String(variant).padStart(3, '0');
    // Try variant-specific frame first, then frame 0
    const img = await tryLoadImg(FRAMES_DIR, avfName, `_${vStr}.png`)
             ?? await tryLoadImg(FRAMES_DIR, avfName, '_000.png');

    if (img) {
      bgNativeHeight = img.naturalHeight || img.height || GAME_H;
      ctx.drawImage(img, 0, 0, GAME_W, GAME_H);
    } else {
      bgNativeHeight = GAME_H;
      ctx.fillStyle = '#0d0818';
      ctx.fillRect(0, 0, GAME_W, GAME_H);
      ctx.fillStyle = '#333';
      ctx.font = '13px Georgia';
      ctx.textAlign = 'center';
      ctx.fillText(avfName, GAME_W / 2, GAME_H / 2);
      ctx.textAlign = 'left';
    }
  }

  async function renderSceneItems(actions) {
    // Draw SHOW_INVENTORY_ITEM sprites on the background.
    // Items already in inventory are hidden (picked up).
    for (const act of actions) {
      if (act.type !== 'SHOW_INVENTORY_ITEM') continue;
      if (!condPass(act)) continue;
      if (act.item_id !== undefined && state.inventory.has(act.item_id)) continue;
      if (!act.sprite_sheet || !act.src_rect || !act.dst_rect) continue;

      const img = await tryLoadImg(SPRITES_DIR, act.sprite_sheet, '.png');
      if (!img) continue;

      const s = act.src_rect, d = act.dst_rect;
      ctx.drawImage(img,
        s.x1, s.y1, s.x2 - s.x1, s.y2 - s.y1,  // source crop
        d.x1, d.y1, d.x2 - d.x1, d.y2 - d.y1   // destination on canvas
      );
    }
  }

  function removeChromaKey(img) {
    const oc = document.createElement('canvas');
    oc.width = img.width;
    oc.height = img.height;
    const octx = oc.getContext('2d');
    octx.drawImage(img, 0, 0);
    const id = octx.getImageData(0, 0, oc.width, oc.height);
    const d = id.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2];
      // Green dominates both red and blue by a significant margin
      if (g > 100 && g > r * 1.4 && g > b * 1.4) {
        d[i + 3] = 0; // set alpha to 0
      }
    }
    octx.putImageData(id, 0, 0);
    return oc;
  }

  function getChromaKeyFrame(img, cacheKey) {
    if (chromaKeyCache[cacheKey]) return chromaKeyCache[cacheKey];
    const cleaned = removeChromaKey(img);
    chromaKeyCache[cacheKey] = cleaned;
    return cleaned;
  }

  // ── Cursor extraction ───────────────────────────────────────────────────
  function extractCursor(sheet, sx, sy, w, h, hotX, hotY) {
    const clip = document.createElement('canvas');
    clip.width = w; clip.height = h;
    clip.getContext('2d').drawImage(sheet, sx, sy, w, h, 0, 0, w, h);
    const cleaned = removeChromaKey(clip);
    return `url("${cleaned.toDataURL('image/png')}") ${hotX} ${hotY}, auto`;
  }

  function gc(name) { return gameCursors[name] || 'default'; }

  async function initCursors() {
    const obj0 = await tryLoadImg(SPRITES_DIR, 'object0', '.png');
    const tcur = await tryLoadImg(SPRITES_DIR, 'toolcur1', '.png');
    if (!obj0) { console.warn('object0.png not found — using default cursors'); return; }

    // Base game cursors from object0.png
    for (const [name, d] of Object.entries(CURSOR_DEFS)) {
      gameCursors[name] = extractCursor(obj0, d.sx, d.sy, d.w, d.h, d.hotX, d.hotY);
    }

    // Inventory item cursors from toolcur1.png (3 color variants per item)
    if (!tcur) { console.warn('toolcur1.png not found — no item cursors'); return; }
    const CW = 29, CH = 39;
    for (const [id, y] of Object.entries(INV_CURSOR_MAP)) {
      const hx = 14, hy = 19;
      itemCursors[id] = {
        normal: extractCursor(tcur, 2,  y, CW, CH, hx, hy),
        green:  extractCursor(tcur, 33, y, CW, CH, hx, hy),
        red:    extractCursor(tcur, 64, y, CW, CH, hx, hy),
      };
    }
    console.log(`Cursors: ${Object.keys(gameCursors).length} base, ${Object.keys(itemCursors).length} item`);
  }

  async function renderNPCs(actions, variant) {
    // Render PLAY_SECONDARY_VIDEO character sprites at the correct panoramic position.
    // The hotspot bounds (hs_x1/y1, hs_x2/y2) define the NPC's visible screen area for
    // each panoramic frame. Position the sprite so its right/bottom edges align with hs_x2/y2;
    // this handles edge frames where the NPC is partially off-screen (negative draw coords
    // are clipped by the canvas automatically).
    for (const act of actions) {
      if (act.type !== 'PLAY_SECONDARY_VIDEO') continue;
      if (!condPass(act)) continue;
      if (!act.frames || !act.asset_name) continue;
      const fr = act.frames.find(f => f.frame === variant);
      if (!fr) continue;
      const img = await tryLoadImg(FRAMES_DIR, act.asset_name, '_000.png');
      if (img) {
        const cacheKey = `${act.asset_name}_000`;
        const cleaned = getChromaKeyFrame(img, cacheKey);
        const yS = bgNativeHeight > GAME_H ? GAME_H / bgNativeHeight : 1;
        const drawH = cleaned.height * yS;
        const drawX = fr.hs_x2 - cleaned.width;
        const drawY = fr.hs_y2 * yS - drawH;

        // Snapshot clean background before drawing sprite (for fidget restore)
        let bgSnapshot = null;
        if (state.animationEnabled) {
          const snapX = Math.max(0, Math.floor(drawX));
          const snapY = Math.max(0, Math.floor(drawY));
          const snapW = Math.min(Math.ceil(cleaned.width + (drawX - snapX)), GAME_W - snapX);
          const snapH = Math.min(Math.ceil(drawH + (drawY - snapY)), GAME_H - snapY);
          if (snapW > 0 && snapH > 0) {
            bgSnapshot = { data: ctx.getImageData(snapX, snapY, snapW, snapH),
                           x: snapX, y: snapY, w: snapW, h: snapH };
          }
        }

        ctx.drawImage(cleaned, drawX, drawY, cleaned.width, drawH);

        if (state.animationEnabled) {
          startFidget(act.asset_name, fr, yS, bgSnapshot,
            act.idle_end_frame, act.hover_start_frame, act.end_frame);
        }
      }
    }
  }

  // ── Fidget animation ────────────────────────────────────────────────────
  // Fidget AVFs have two frame ranges: idle (0→idleEnd) and hover (hoverStart→endFrame).
  // The idle loop plays continuously; when the mouse hovers over the NPC hotspot,
  // the engine switches to the hover loop.
  async function startFidget(assetName, frameData, yS, bgSnapshot, idleEnd, hoverStart, endFrame) {
    stopFidget();
    if (!bgSnapshot) return;

    // Preload and chroma-key all frames (use endFrame to avoid a 404 probe)
    const frames = [];
    const maxFrame = endFrame ?? 999;
    for (let i = 0; i <= maxFrame; i++) {
      const ext = `_${String(i).padStart(3, '0')}.png`;
      const img = await tryLoadImg(FRAMES_DIR, assetName, ext);
      if (!img) break;
      frames.push(getChromaKeyFrame(img, `${assetName}${ext}`));
      if (maxFrame < 999 && maxFrame > 5) drawLoadingBar(i + 1, maxFrame + 1);
    }
    if (frames.length === 0) return;

    const cleaned0 = frames[0];
    const drawH = cleaned0.height * yS;
    const drawW = cleaned0.width;
    const drawX = frameData.hs_x2 - drawW;
    const drawY = frameData.hs_y2 * yS - drawH;

    fidgetFrames = frames;
    fidgetFrameIndex = 0;
    fidgetDrawRect = { x: drawX, y: drawY, w: drawW, h: drawH };
    fidgetBgSnapshot = bgSnapshot;
    fidgetIdleEnd = (idleEnd != null && idleEnd < frames.length) ? idleEnd : frames.length - 1;
    fidgetHoverStart = (hoverStart != null && hoverStart < frames.length) ? hoverStart : 0;
    fidgetHovering = false;

    fidgetInterval = setInterval(() => {
      if (!fidgetBgSnapshot || !state.animationEnabled) { stopFidget(); return; }
      // Restore background behind previous frame
      ctx.putImageData(fidgetBgSnapshot.data, fidgetBgSnapshot.x, fidgetBgSnapshot.y);

      if (fidgetUnhovering) {
        // Playing hover animation in reverse back to hover start
        fidgetFrameIndex--;
        if (fidgetFrameIndex < fidgetHoverStart) {
          // Reverse complete — resume idle loop
          fidgetUnhovering = false;
          fidgetFrameIndex = 0;
        }
      } else if (fidgetHovering) {
        // Hover: play forward once, hold on last frame
        fidgetFrameIndex++;
        if (fidgetFrameIndex > fidgetFrames.length - 1) {
          fidgetFrameIndex = fidgetFrames.length - 1;
        }
      } else {
        // Idle: loop forward
        fidgetFrameIndex++;
        if (fidgetFrameIndex > fidgetIdleEnd) {
          fidgetFrameIndex = 0;
        }
      }

      // Draw new frame
      ctx.drawImage(fidgetFrames[fidgetFrameIndex],
        fidgetDrawRect.x, fidgetDrawRect.y, fidgetDrawRect.w, fidgetDrawRect.h);
    }, 60);
  }

  function stopFidget() {
    if (fidgetInterval) {
      clearInterval(fidgetInterval);
      fidgetInterval = null;
    }
    fidgetFrames = [];
    fidgetFrameIndex = 0;
    fidgetDrawRect = null;
    fidgetBgSnapshot = null;
    fidgetHovering = false;
    fidgetUnhovering = false;
  }

  function startFidgetIfNeeded() {
    if (!state.animationEnabled || !state.currentSceneId) return;
    loadScene(state.currentSceneId, state.currentVariant, false);
  }

  // ── Conversation animation ──────────────────────────────────────────────
  async function startConvAnimation(nodeId, coords) {
    stopConvAnimation();
    if (!state.animationEnabled || !nodeId) return;

    // Load all frames (conversation frames include background — no chroma-key)
    const frames = [];
    for (let i = 0; ; i++) {
      const ext = `_${String(i).padStart(3, '0')}.png`;
      const img = await tryLoadImg(FRAMES_DIR, nodeId, ext);
      if (!img) break;
      frames.push(img);
    }
    if (frames.length === 0) return;

    // Draw rect from coords (same logic as playNarrationVideo)
    const x = coords?.x2 ?? 0;
    const y = coords?.y2 ?? 0;
    const w = (coords?.x3 ?? (GAME_W - 1)) - x + 1;
    const h = (coords?.y3 ?? (GAME_H - 1)) - y + 1;

    convAnimFrames = frames;
    convAnimFrameIndex = 0;

    // Draw first frame immediately
    ctx.drawImage(frames[0], x, y, w, h);

    convAnimInterval = setInterval(() => {
      convAnimFrameIndex++;
      if (convAnimFrameIndex >= convAnimFrames.length) {
        clearInterval(convAnimInterval);
        convAnimInterval = null;
        return;
      }
      ctx.drawImage(convAnimFrames[convAnimFrameIndex], x, y, w, h);
    }, 60);
  }

  function stopConvAnimation() {
    if (convAnimInterval) {
      clearInterval(convAnimInterval);
      convAnimInterval = null;
    }
    convAnimFrames = [];
    convAnimFrameIndex = 0;
  }

  function drawHotspots(hotspots) {
    if (!state.debugHotspots) return;
    ctx.save();
    hotspots.forEach(hs => {
      const x1 = Math.min(hs.x1, hs.x2), x2 = Math.max(hs.x1, hs.x2);
      const y1 = Math.min(hs.y1, hs.y2), y2 = Math.max(hs.y1, hs.y2);
      ctx.strokeStyle = 'rgba(255,190,0,0.75)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x1 + 0.5, y1 + 0.5, x2 - x1, y2 - y1);
      ctx.fillStyle = 'rgba(255,190,0,0.18)';
      ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
      if (hs.label) {
        ctx.fillStyle = 'rgba(255,190,0,0.9)';
        ctx.font = '8px monospace';
        ctx.fillText(hs.label, x1 + 2, y1 + 10);
      }
    });
    ctx.restore();
  }

  // ── Conversation node selection ─────────────────────────────────────────
  // npc_ref entries in tail_entries act as conditions for which node to show.
  // param=1 → flag NOT set to 2; param=2 → flag IS 2.
  function npcRefsPass(act) {
    const tail = act.tail_entries;
    if (!tail) return true;
    return tail.every(e => {
      if (e.type !== 'npc_ref') return true;
      const val = state.flags[e.id] ?? 0;
      if (e.param === 2) return val === 2;
      if (e.param === 1) return val !== 2;
      return true;
    });
  }

  // ── Conversation UI ──────────────────────────────────────────────────────
  // Pending navigation for the Continue button
  let pendingConvNav = null;
  let pendingReturnHub = null; // Hub scene to return to after investigation question response

  function showConv(act, { skipGreeting = false } = {}) {
    const text    = stripMarkup(act.npc_text || '');
    const allChoices = act.choices || [];
    const tail    = act.tail_entries || [];

    // Auto-apply flags declared in tail_entries (mark this node as visited, etc.)
    tail.filter(e => e.type === 'flag').forEach(e => { state.flags[e.id] = e.value; });

    convSpkr.textContent = getSpeaker(act.node_id);
    convTxt.textContent  = skipGreeting ? '' : text;
    convChs.innerHTML    = '';
    pendingConvNav       = null;

    // Play NPC dialogue audio (prefer intro_sound from scene data, fall back to node_id)
    if (!skipGreeting) {
      const audioName = act.intro_sound
        || (act.node_id && act.node_id.replace(/^([a-zA-Z]+)0*(\d+.*)$/, '$1$2'));
      if (audioName) playConvVoice(audioName);
    }

    // Three-tier routing (matches Game.exe.c ProcessConversation):
    // Tier 1: Show player choices whose sub-conditions pass
    // Tier 2: Unconditional continuation (auto-advance to next node)
    // Tier 3: Pop back to pre-conversation scene

    const visibleChoices = allChoices.filter(ch => choiceConditionsPass(ch.conditions));

    // Investigation hub detection: only inject dynamic questions + "See ya later"
    // into known NPC hub scenes, and NOT on first-meeting nodes (which set the met flag).
    const hubSceneId = nodeSceneMap[(act.node_id || '').toUpperCase()];
    const hubPrefix = INVESTIGATION_HUB_SCENES[hubSceneId];
    const metFlagId = hubPrefix ? NPC_MET_FLAG[hubPrefix] : null;
    const setsMetFlag = metFlagId !== null && tail.some(e =>
      e.type === 'flag' && e.id === metFlagId && e.value === 2);
    const isInvestigationHub = !!hubPrefix && !setsMetFlag;

    // Dynamic investigation questions (only in hub scenes, not first-meeting nodes)
    const dynQuestions = isInvestigationHub ? getAvailableQuestions(hubPrefix) : [];

    if (visibleChoices.length > 0 || dynQuestions.length > 0 || isInvestigationHub) {
      // Tier 1: Show filtered player choices + investigation questions
      convCont.style.display = 'none';
      visibleChoices.forEach(ch => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = markupToHtml(ch.text);
        btn.onclick = async () => {
          const nancyAudio = ch.target_node ? playConvVoice(ch.target_node) : null;
          if (nancyAudio) await waitForSound(nancyAudio);
          if (ch.response_scene) {
            hideConv();
            await loadScene(`S${ch.response_scene}`, 0, false);
          } else {
            hideConv();
          }
        };
        convChs.appendChild(btn);
      });
      // Inject investigation questions (hub scenes only)
      dynQuestions.forEach(q => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = q.text;
        btn.onclick = async () => {
          console.log(`[INV-Q] clicked: id=${q.id} text="${q.text}" response_scene=${q.response_scene} hub=${hubSceneId}`);
          pendingReturnHub = hubSceneId;
          const nancyAudio = playConvVoice(q.id);
          if (nancyAudio) await waitForSound(nancyAudio);
          if (q.response_scene) {
            hideConv();
            console.log(`[INV-Q] loading scene: ${q.response_scene}`);
            await loadScene(q.response_scene, 0, false);
          } else {
            hideConv();
          }
        };
        convChs.appendChild(btn);
      });
      // Goodbye — always available in investigation hub scenes
      if (isInvestigationHub) {
        const fw = FAREWELL_DATA[hubPrefix];
        const exitBtn = document.createElement('button');
        exitBtn.className = 'choice-btn';
        exitBtn.textContent = fw ? fw.text : "See ya' later.";
        exitBtn.onclick = () => sayGoodbye(hubPrefix);
        convChs.appendChild(exitBtn);
      }
    } else if (act.continuation_scene) {
      // Tier 2: No visible choices — unconditional continuation
      convCont.style.display = '';
      pendingConvNav = `S${act.continuation_scene}`;
    } else {
      // Tier 3: Terminal node (has_pop or fallback) — Continue pops back
      convCont.style.display = '';
      // If returning to a hub with no questions left, show Nancy's goodbye as button text
      if (pendingReturnHub) {
        const retPrefix = INVESTIGATION_HUB_SCENES[pendingReturnHub];
        const retRemaining = retPrefix ? getAvailableQuestions(retPrefix) : [];
        if (retRemaining.length === 0) {
          const fw = retPrefix ? FAREWELL_DATA[retPrefix] : null;
          convCont.textContent = `[ ${fw ? fw.text : 'Goodbye!'} ]`;
        } else {
          convCont.textContent = '[ Continue ]';
        }
      } else {
        convCont.textContent = '[ Continue ]';
      }
    }

    // Conversation animation: when enabled, play NPC video on game canvas
    // and move the text overlay below the canvas instead of on top of it.
    if (state.animationEnabled && !skipGreeting && act.node_id) {
      const gameWrap = document.getElementById('game-wrap');
      gameWrap.parentNode.insertBefore(convOL, gameWrap.nextSibling);
      convOL.classList.add('below-canvas');
      startConvAnimation(act.node_id, act.coords);
    }

    convOL.classList.add('active');
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) menuBtn.disabled = true;
  }

  async function popToPreConversationScene() {
    while (state.history.length > 0) {
      const prev = state.history.pop();
      const prevScene = scenes[prev.id];
      const isConv = prevScene?.actions?.some(a => a.type === 'CONVERSATION_VIDEO');
      if (!isConv) {
        await loadScene(prev.id, prev.variant, false);
        return;
      }
    }
  }

  async function exitConversation() {
    hideConv();
    await popToPreConversationScene();
  }

  async function continueConv() {
    if (pendingConvNav) {
      const target = pendingConvNav;
      pendingConvNav = null;
      hideConv();
      await loadScene(target, 0, false);
    } else if (pendingReturnHub) {
      // Return to investigation hub after question response,
      // or say goodbye if no more questions remain.
      const hub = pendingReturnHub;
      const hubPrefix = INVESTIGATION_HUB_SCENES[hub];
      pendingReturnHub = null;
      const remaining = hubPrefix ? getAvailableQuestions(hubPrefix) : [];
      if (remaining.length > 0) {
        // Re-show the hub conversation choices without replaying the NPC greeting.
        const hubScene = scenes[hub];
        let hubConvAct = null;
        if (hubScene) {
          for (const act of hubScene.actions) {
            if (act.type === 'CONVERSATION_VIDEO' && npcRefsPass(act)) hubConvAct = act;
          }
        }
        if (hubConvAct) {
          showConv(hubConvAct, { skipGreeting: true });
        } else {
          hideConv();
          await loadScene(hub, 0, false);
        }
      } else {
        await sayGoodbye(hubPrefix);
      }
    } else {
      // Terminal / has_pop — return to pre-conversation scene
      hideConv();
      await popToPreConversationScene();
    }
  }

  function hideConv() {
    stopConvVoice();
    stopConvAnimation();
    convOL.classList.remove('active', 'below-canvas');
    // Move overlay back inside game-wrap if it was repositioned
    const gameWrap = document.getElementById('game-wrap');
    if (convOL.parentNode !== gameWrap) {
      gameWrap.appendChild(convOL);
    }
    pendingConvNav = null;
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) menuBtn.disabled = false;
  }

  // ── Map / travel dialog ──────────────────────────────────────────────────
  // Hub scenes accessible from the travel map
  const MAP_LOCATIONS = [
    { id: 'S9',    label: "Aunt Eloise's House" },
    { id: 'S10',   label: 'Diner (Day)'         },
    { id: 'S888',  label: 'Diner (Night)'        },
    { id: 'S11',   label: 'School'               },
    { id: 'S1200', label: 'Pharmacy'             },
  ];

  function showMapDialog() {
    if (menuActive || convOL.classList.contains('active') || movieActive) return;
    mapBtns.innerHTML = '';
    const f5 = state.flags[5] ?? 1, f20 = state.flags[20] ?? 1;
    // Endgame night mode: Daryl agreed to help (F40=2) + Connie chickened out (F95=2)
    const endgameNight = (state.flags[40] ?? 1) === 2 && (state.flags[95] ?? 1) === 2;

    MAP_LOCATIONS.forEach(loc => {
      // --- Endgame night mode: only Aunt Eloise's and Pharmacy (→S1250) ---
      if (endgameNight) {
        if (loc.id === 'S10' || loc.id === 'S888' || loc.id === 'S11') return;
      } else {
        // --- Normal day/night diner filtering ---
        //   F5: 1=early game, 2=watched blackmail tape
        //   F20: 1=nighttime (default), 2=daytime (post-Connie confession)
        // Hide Diner Day when nighttime (after tape but before Connie confession)
        if (loc.id === 'S10' && f5 === 2 && f20 !== 2) return;
        // Hide Diner Night when daytime or early game
        if (loc.id === 'S888' && (f5 !== 2 || f20 === 2)) return;
      }

      const btn = document.createElement('button');
      btn.className = 'map-loc-btn';
      // In endgame night, Pharmacy routes to S1250 (endgame confrontation)
      const destId = (endgameNight && loc.id === 'S1200') ? 'S1250' : loc.id;
      btn.textContent = loc.label;
      const isCurrent = state.currentSceneId === destId;
      if (isCurrent) btn.classList.add('current');
      btn.onclick = () => {
        hideMapDialog();
        if (!isCurrent) loadScene(destId, 0);
      };
      mapBtns.appendChild(btn);
    });
    mapOL.classList.add('active');
  }

  function hideMapDialog() {
    mapOL.classList.remove('active');
  }

  // ── Game end overlay ───────────────────────────────────────────────────
  const gameEndOL = document.getElementById('gameover-overlay');
  const gameEndTitle = document.getElementById('gameover-title');
  const gameEndMsg = document.getElementById('gameover-msg');

  function showGameEnd(won) {
    stopTimer();
    gameEndTitle.textContent = won ? 'YOU WON!' : 'GAME OVER';
    gameEndMsg.textContent = won
      ? 'Congratulations! You solved the mystery of Secrets Can Kill.'
      : 'Nancy Drew has met an untimely end. Better luck next time.';
    const scBtn = document.getElementById('second-chance-btn');
    if (scBtn) scBtn.style.display = (!won && secondChanceSave) ? '' : 'none';
    gameEndOL.classList.add('active');
  }

  function loadSecondChance() {
    if (!secondChanceSave) return;
    gameEndOL.classList.remove('active');
    state.flags = { ...secondChanceSave.flags };
    state.inventory = new Set(secondChanceSave.inventory);
    state.history = secondChanceSave.history.map(h => ({ ...h }));
    loadScene(secondChanceSave.sceneId, secondChanceSave.variant ?? 0);
  }

  // ── Puzzle stubs ────────────────────────────────────────────────────────
  // Hard-coded puzzle success data: scene → { name, successFlags, successScene, backScene }
  const PUZZLE_DATA = {
    'S5000': { name: "Jake's Locker Combination", successFlags: [{flag: 0, value: 2}],  successScene: 'S1426', backScene: 'S1425' },
    // S5001: interactive ROTATINGLOCK_PUZZLE (combination 1-9-6-7), no stub needed
    'S5002': { name: 'Boiler Lever Puzzle',       successFlags: [{flag: 62, value: 2}], successScene: 'S2060', backScene: 'S2077' },
    'S50':   { name: 'Boiler Room Keypad',        successFlags: [{flag: 92, value: 1}], successScene: 'S1460', backScene: 'S1457' },
    'S51':   { name: 'Boiler Room Keypad',        successFlags: [{flag: 59, value: 2}], successScene: 'S1460', backScene: 'S1457' },
    'S56':   { name: "Aunt Eloise's Safe",        successFlags: [{flag: 41, value: 2}], successScene: 'S57',   backScene: 'S626' },
    'S1620': { name: 'Computer Login',            successFlags: [{flag: 86, value: 1}], successScene: 'S1622', backScene: 'S1613' },
    'S647':  { name: 'Slider Puzzle',             successFlags: [{flag: 88, value: 2}], successScene: 'S643',  backScene: 'S641' },
    'S501':  { name: 'Telephone',                 successFlags: [],                     successScene: null,    backScene: 'S523' },
  };

  const puzzleOL    = document.getElementById('puzzle-overlay');
  const puzzleName  = document.getElementById('puzzle-name');
  const puzzleSolve = document.getElementById('puzzle-solve');
  const puzzleBack  = document.getElementById('puzzle-back');

  function showPuzzle(act, sceneId) {
    const data = PUZZLE_DATA[sceneId];
    if (!data) {
      console.warn('No puzzle data for', sceneId);
      return;
    }

    // Telephone is non-blocking — just show hint and allow back
    puzzleName.textContent = data.name;

    puzzleSolve.onclick = () => {
      puzzleOL.classList.remove('active');
      // Set success flags
      data.successFlags.forEach(f => { state.flags[f.flag] = f.value; });
      // Navigate to success scene
      if (data.successScene) {
        loadScene(data.successScene, 0);
      } else if (state.history.length > 0) {
        back();
      }
    };

    puzzleBack.onclick = () => {
      puzzleOL.classList.remove('active');
      if (data.backScene) {
        loadScene(data.backScene, 0);
      } else if (state.history.length > 0) {
        back();
      }
    };

    puzzleOL.classList.add('active');
  }

  // ── Interactive puzzle system ──────────────────────────────────────────
  let activePuzzle = null;
  let puzzleBaseImage = null;

  // Helper: check if point is in rect
  function inRect(x, y, r) {
    return x >= r.x1 && x <= r.x2 && y >= r.y1 && y <= r.y2;
  }

  // Helper: puzzle success animation then navigate
  function puzzleSuccess(sound, scene, flagId, flagVal) {
    activePuzzle.locked = true;
    if (sound) playSound(sound);
    if (flagId !== undefined && flagId !== -1) state.flags[flagId] = flagVal;
    const s = scene;
    const keyH = activePuzzle?._keyHandler;
    const blinkI = activePuzzle?._blinkInterval;
    setTimeout(() => {
      if (keyH) document.removeEventListener('keydown', keyH);
      if (blinkI) clearInterval(blinkI);
      activePuzzle = null;
      puzzleBaseImage = null;
      loadScene(`S${s}`, 0);
    }, 1200);
  }

  // Helper: exit puzzle and navigate
  function puzzleExit(scene) {
    if (activePuzzle?._keyHandler) document.removeEventListener('keydown', activePuzzle._keyHandler);
    if (activePuzzle?._blinkInterval) clearInterval(activePuzzle._blinkInterval);
    activePuzzle = null;
    puzzleBaseImage = null;
    loadScene(`S${scene}`, 0);
  }

  // ── ORDERING_PUZZLE ──
  function setupOrderingPuzzle(act) {
    activePuzzle = {
      type: 'ORDERING_PUZZLE',
      buttons: act.buttons,
      correctSeq: act.correct_sequence,
      seqLen: act.sequence_length,
      clickSound: act.click_sound,
      successSound: act.success_sound,
      successScene: act.success_scene,
      successFlagId: act.success_flag_id,
      successFlagVal: act.success_flag_value,
      exitScene: act.exit_scene,
      exitHotspot: act.exit_hotspot,
      playerSeq: [],
      pressed: new Set(),
      locked: false,
    };
    puzzleBaseImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    drawPuzzleState();
  }

  // ── ROTATINGLOCK_PUZZLE ──
  function setupRotatingLockPuzzle(act) {
    // Randomize starting positions (different from solution)
    const dials = [];
    for (let i = 0; i < act.num_dials; i++) {
      let v;
      do { v = Math.floor(Math.random() * 10); } while (v === act.combination[i]);
      dials.push(v);
    }
    activePuzzle = {
      type: 'ROTATINGLOCK_PUZZLE',
      numDials: act.num_dials,
      dials,
      combination: act.combination,
      destRects: act.dest_rects,
      upRects: act.up_rects,
      downRects: act.down_rects,
      clickSound: act.click_sound,
      successSound: act.success_sound,
      successScene: act.success_scene,
      exitScene: act.exit_scene,
      exitHotspot: act.exit_hotspot,
      locked: false,
    };
    puzzleBaseImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    drawPuzzleState();
  }

  // ── PASSWORD_PUZZLE ──
  function setupPasswordPuzzle(act) {
    activePuzzle = {
      type: 'PASSWORD_PUZZLE',
      passwords: act.passwords,
      inputRects: act.input_rects,
      successScene: act.success_scene,
      successSound: act.success_sound,
      failSound: act.fail_sound,
      exitScene: act.exit_scene,
      exitHotspot: act.exit_hotspot,
      inputText: '',
      locked: false,
    };
    puzzleBaseImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // Add keyboard listener
    activePuzzle._keyHandler = (e) => {
      if (!activePuzzle || activePuzzle.type !== 'PASSWORD_PUZZLE' || activePuzzle.locked) return;
      if (e.key === 'Enter') {
        const input = activePuzzle.inputText.toUpperCase().trim();
        const match = activePuzzle.passwords.some(p => p.toUpperCase() === input);
        if (match) {
          playSound(activePuzzle.successSound);
          const data = PUZZLE_DATA[state.currentSceneId];
          if (data) data.successFlags.forEach(f => { state.flags[f.flag] = f.value; });
          puzzleSuccess(null, activePuzzle.successScene, -1, 0);
        } else {
          playSound(activePuzzle.failSound);
          activePuzzle.inputText = '';
          drawPuzzleState();
        }
      } else if (e.key === 'Backspace') {
        activePuzzle.inputText = activePuzzle.inputText.slice(0, -1);
        drawPuzzleState();
      } else if (e.key === 'Escape') {
        document.removeEventListener('keydown', activePuzzle._keyHandler);
        puzzleExit(activePuzzle.exitScene);
      } else if (e.key.length === 1 && activePuzzle.inputText.length < 20) {
        activePuzzle.inputText += e.key;
        drawPuzzleState();
      }
    };
    document.addEventListener('keydown', activePuzzle._keyHandler);
    // Cursor blink timer
    activePuzzle._blinkInterval = setInterval(() => {
      if (activePuzzle?.type === 'PASSWORD_PUZZLE') drawPuzzleState();
    }, 500);
    drawPuzzleState();
  }

  // ── LEVER_PUZZLE ──
  function setupLeverPuzzle(act) {
    activePuzzle = {
      type: 'LEVER_PUZZLE',
      numLevers: act.num_levers,
      numStates: act.num_states,
      levers: [...act.initial_states],
      solution: act.solution,
      destRects: act.dest_rects,
      upSound: act.up_sound,
      downSound: act.down_sound,
      successScene: act.success_scene,
      exitScene: act.exit_scene,
      exitHotspot: act.exit_hotspot,
      locked: false,
    };
    puzzleBaseImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    drawPuzzleState();
  }

  // ── TELEPHONE ──
  function setupTelephone(act) {
    // Button labels: index 0="0", 1-9="1"-"9", 10="*", 11="#"
    const labels = ['0','1','2','3','4','5','6','7','8','9','*','#'];
    activePuzzle = {
      type: 'TELEPHONE',
      buttons: act.buttons,
      labels,
      entries: act.phone_entries,
      hangupScene: act.hangup_scene,
      exitHotspot: act.exit_hotspot,
      dialed: '',
      displayText: '',
      locked: false,
    };
    puzzleBaseImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    drawPuzzleState();
  }

  // ── Draw puzzle state (all types) ──
  function drawPuzzleState() {
    if (!activePuzzle || !puzzleBaseImage) return;
    ctx.putImageData(puzzleBaseImage, 0, 0);

    switch (activePuzzle.type) {
      case 'ORDERING_PUZZLE': {
        for (const idx of activePuzzle.pressed) {
          const btn = activePuzzle.buttons[idx];
          ctx.fillStyle = 'rgba(255, 255, 150, 0.35)';
          ctx.fillRect(btn.x1, btn.y1, btn.x2 - btn.x1, btn.y2 - btn.y1);
          ctx.strokeStyle = 'rgba(255, 255, 100, 0.7)';
          ctx.lineWidth = 2;
          ctx.strokeRect(btn.x1 + 1, btn.y1 + 1, btn.x2 - btn.x1 - 2, btn.y2 - btn.y1 - 2);
        }
        break;
      }

      case 'ROTATINGLOCK_PUZZLE': {
        for (let i = 0; i < activePuzzle.numDials; i++) {
          const r = activePuzzle.destRects[i];
          const w = r.x2 - r.x1;
          const h = r.y2 - r.y1;
          const cx = (r.x1 + r.x2) / 2;
          const cy = (r.y1 + r.y2) / 2;
          // Scale font to fit dial width
          const fontSize = Math.min(w - 2, h / 3, 48);
          // Draw digit background
          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.fillRect(r.x1, r.y1, w, h);
          ctx.fillStyle = '#FFD700';
          ctx.font = `bold ${fontSize}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(activePuzzle.dials[i].toString(), cx, cy);
          // Draw up/down arrows in the click rects
          const ur = activePuzzle.upRects[i];
          const dr = activePuzzle.downRects[i];
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          const arrowSize = Math.min(w - 4, 14);
          ctx.font = `${arrowSize}px sans-serif`;
          ctx.fillText('\u25B2', (ur.x1 + ur.x2) / 2, (ur.y1 + ur.y2) / 2);
          ctx.fillText('\u25BC', (dr.x1 + dr.x2) / 2, (dr.y1 + dr.y2) / 2);
        }
        break;
      }

      case 'PASSWORD_PUZZLE': {
        const r = activePuzzle.inputRects[2] || activePuzzle.inputRects[0];
        // Draw input box
        ctx.fillStyle = 'rgba(0, 0, 30, 0.85)';
        ctx.fillRect(r.x1 - 5, r.y1 - 5, r.x2 - r.x1 + 10, r.y2 - r.y1 + 10);
        ctx.strokeStyle = '#4488FF';
        ctx.lineWidth = 2;
        ctx.strokeRect(r.x1 - 5, r.y1 - 5, r.x2 - r.x1 + 10, r.y2 - r.y1 + 10);
        // Label
        ctx.fillStyle = '#88BBFF';
        ctx.font = '12px monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('PASSWORD:', r.x1, r.y1);
        // Input text with cursor
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '16px monospace';
        ctx.textBaseline = 'middle';
        const ty = (r.y1 + r.y2) / 2 + 8;
        const blink = Math.floor(Date.now() / 500) % 2 === 0;
        ctx.fillText(activePuzzle.inputText + (blink ? '_' : ''), r.x1 + 2, ty);
        // Hint
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '10px monospace';
        ctx.fillText('Type password + Enter | Esc to exit', r.x1, r.y2 + 2);
        break;
      }

      case 'LEVER_PUZZLE': {
        const stateLabels = ['\u25B2 UP', '\u25B3 MID-UP', '\u25BD MID-DN', '\u25BC DOWN'];
        for (let i = 0; i < activePuzzle.numLevers; i++) {
          const r = activePuzzle.destRects[i];
          const cx = (r.x1 + r.x2) / 2;
          const h = r.y2 - r.y1;
          const lev = activePuzzle.levers[i];
          // Draw lever track
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.fillRect(cx - 8, r.y1 + 20, 16, h - 40);
          // Draw lever handle at position
          const handleY = r.y1 + 30 + (lev / (activePuzzle.numStates - 1)) * (h - 80);
          ctx.fillStyle = '#CC4444';
          ctx.fillRect(cx - 20, handleY - 8, 40, 16);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.strokeRect(cx - 20, handleY - 8, 40, 16);
          // State label
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '11px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(stateLabels[lev] || `STATE ${lev}`, cx, r.y2 - 18);
          // Click hints
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.font = '18px sans-serif';
          ctx.fillText('\u25B2', cx, r.y1 + 2);
          ctx.fillText('\u25BC', cx, r.y2 - 35);
        }
        break;
      }

      case 'TELEPHONE': {
        // Draw dialed number display
        const dispX = 170, dispY = 255, dispW = 200, dispH = 30;
        ctx.fillStyle = 'rgba(0, 40, 0, 0.9)';
        ctx.fillRect(dispX, dispY, dispW, dispH);
        ctx.strokeStyle = '#00AA00';
        ctx.lineWidth = 1;
        ctx.strokeRect(dispX, dispY, dispW, dispH);
        ctx.fillStyle = '#00FF00';
        ctx.font = '18px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const displayStr = activePuzzle.dialed || 'DIAL A NUMBER';
        ctx.fillText(displayStr, dispX + dispW / 2, dispY + dispH / 2);
        // If there's response text, show it
        if (activePuzzle.displayText) {
          const lines = activePuzzle.displayText.split('\n');
          ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
          ctx.fillRect(50, 30, GAME_W - 100, lines.length * 18 + 20);
          ctx.strokeStyle = '#00AA00';
          ctx.strokeRect(50, 30, GAME_W - 100, lines.length * 18 + 20);
          ctx.fillStyle = '#00FF00';
          ctx.font = '13px monospace';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          lines.forEach((line, i) => ctx.fillText(line, 60, 40 + i * 18));
        }
        break;
      }
    }

    // Debug: draw exit hotspot
    if (state.debugHotspots && activePuzzle.exitHotspot) {
      const ex = activePuzzle.exitHotspot;
      ctx.fillStyle = 'rgba(100, 100, 255, 0.2)';
      ctx.fillRect(ex.x1, ex.y1, ex.x2 - ex.x1, ex.y2 - ex.y1);
    }
  }

  // ── Handle puzzle clicks (all types) ──
  function handlePuzzleClick(x, y) {
    if (!activePuzzle || activePuzzle.locked) return;

    // Check exit hotspot (all puzzle types)
    if (activePuzzle.exitHotspot && inRect(x, y, activePuzzle.exitHotspot)) {
      if (activePuzzle._keyHandler) {
        document.removeEventListener('keydown', activePuzzle._keyHandler);
      }
      const scene = activePuzzle.type === 'TELEPHONE'
        ? activePuzzle.hangupScene
        : activePuzzle.exitScene;
      puzzleExit(scene);
      return;
    }

    switch (activePuzzle.type) {
      case 'ORDERING_PUZZLE': {
        for (let i = 0; i < activePuzzle.buttons.length; i++) {
          const btn = activePuzzle.buttons[i];
          if (inRect(x, y, btn)) {
            playSound(activePuzzle.clickSound);
            if (activePuzzle.pressed.has(i)) {
              activePuzzle.pressed.delete(i);
              activePuzzle.playerSeq = activePuzzle.playerSeq.filter(v => v !== i);
            } else {
              activePuzzle.pressed.add(i);
              activePuzzle.playerSeq.push(i);
            }
            drawPuzzleState();
            if (activePuzzle.playerSeq.length >= activePuzzle.seqLen) {
              activePuzzle.locked = true;
              const correct = activePuzzle.correctSeq.every((v, j) => activePuzzle.playerSeq[j] === v);
              if (correct) {
                for (const idx of activePuzzle.pressed) {
                  const b = activePuzzle.buttons[idx];
                  ctx.fillStyle = 'rgba(100, 255, 100, 0.5)';
                  ctx.fillRect(b.x1, b.y1, b.x2 - b.x1, b.y2 - b.y1);
                }
                puzzleSuccess(activePuzzle.successSound, activePuzzle.successScene,
                  activePuzzle.successFlagId, activePuzzle.successFlagVal);
              } else {
                for (const idx of activePuzzle.pressed) {
                  const b = activePuzzle.buttons[idx];
                  ctx.fillStyle = 'rgba(255, 50, 50, 0.5)';
                  ctx.fillRect(b.x1, b.y1, b.x2 - b.x1, b.y2 - b.y1);
                }
                setTimeout(() => {
                  if (!activePuzzle) return;
                  activePuzzle.pressed.clear();
                  activePuzzle.playerSeq = [];
                  activePuzzle.locked = false;
                  drawPuzzleState();
                }, 600);
              }
            }
            return;
          }
        }
        break;
      }

      case 'ROTATINGLOCK_PUZZLE': {
        // Check up rects (increment digit)
        for (let i = 0; i < activePuzzle.numDials; i++) {
          if (inRect(x, y, activePuzzle.upRects[i])) {
            playSound(activePuzzle.clickSound);
            activePuzzle.dials[i] = (activePuzzle.dials[i] + 1) % 10;
            drawPuzzleState();
            // Check solution
            if (activePuzzle.combination.every((v, j) => activePuzzle.dials[j] === v)) {
              const data = PUZZLE_DATA[state.currentSceneId];
              if (data) data.successFlags.forEach(f => { state.flags[f.flag] = f.value; });
              puzzleSuccess(activePuzzle.successSound, activePuzzle.successScene, -1, 0);
            }
            return;
          }
          // Check down rects (decrement digit)
          if (inRect(x, y, activePuzzle.downRects[i])) {
            playSound(activePuzzle.clickSound);
            activePuzzle.dials[i] = (activePuzzle.dials[i] + 9) % 10;
            drawPuzzleState();
            if (activePuzzle.combination.every((v, j) => activePuzzle.dials[j] === v)) {
              const data = PUZZLE_DATA[state.currentSceneId];
              if (data) data.successFlags.forEach(f => { state.flags[f.flag] = f.value; });
              puzzleSuccess(activePuzzle.successSound, activePuzzle.successScene, -1, 0);
            }
            return;
          }
        }
        break;
      }

      case 'PASSWORD_PUZZLE': {
        // Clicking the exit hotspot area handles exit (already done above)
        // No other click interactions — keyboard handles input
        break;
      }

      case 'LEVER_PUZZLE': {
        for (let i = 0; i < activePuzzle.numLevers; i++) {
          const r = activePuzzle.destRects[i];
          if (inRect(x, y, r)) {
            const midY = (r.y1 + r.y2) / 2;
            if (y < midY) {
              // Click upper half — decrease state (move up)
              activePuzzle.levers[i] = (activePuzzle.levers[i] + activePuzzle.numStates - 1) % activePuzzle.numStates;
              playSound(activePuzzle.upSound);
            } else {
              // Click lower half — increase state (move down)
              activePuzzle.levers[i] = (activePuzzle.levers[i] + 1) % activePuzzle.numStates;
              playSound(activePuzzle.downSound);
            }
            drawPuzzleState();
            // Check solution
            if (activePuzzle.solution.every((v, j) => activePuzzle.levers[j] === v)) {
              const data = PUZZLE_DATA[state.currentSceneId];
              if (data) data.successFlags.forEach(f => { state.flags[f.flag] = f.value; });
              puzzleSuccess('steam02', activePuzzle.successScene, -1, 0);
            }
            return;
          }
        }
        break;
      }

      case 'TELEPHONE': {
        // Check keypad buttons
        for (let i = 0; i < activePuzzle.buttons.length; i++) {
          if (inRect(x, y, activePuzzle.buttons[i])) {
            const digit = activePuzzle.labels[i];
            if (digit === '*') {
              // Clear / redial
              activePuzzle.dialed = '';
              activePuzzle.displayText = '';
              drawPuzzleState();
            } else if (digit === '#') {
              // Submit number
              telephoneLookup();
            } else {
              activePuzzle.dialed += digit;
              activePuzzle.displayText = '';
              drawPuzzleState();
              // Auto-submit when full number entered
              const isLongDist = activePuzzle.dialed.startsWith('1');
              const needed = isLongDist ? 11 : 7;
              if (activePuzzle.dialed.length >= needed) {
                setTimeout(() => telephoneLookup(), 300);
              }
            }
            return;
          }
        }
        break;
      }
    }
  }

  // Telephone lookup helper
  function telephoneLookup() {
    if (!activePuzzle || activePuzzle.type !== 'TELEPHONE') return;
    const dialed = activePuzzle.dialed;
    // Convert dialed string to digit array for comparison
    const dialDigits = dialed.split('').map(Number);
    // Search phone entries
    for (const entry of activePuzzle.entries) {
      // Determine expected length
      const isLong = entry.digits[0] === 1;
      const entryLen = isLong ? 11 : 7;
      const entryDigits = entry.digits.slice(0, entryLen);
      if (dialDigits.length >= entryLen &&
          entryDigits.every((d, j) => dialDigits[j] === d)) {
        // Match! Parse and display the text
        let text = entry.text
          .replace(/<t>/g, '')
          .replace(/<e>/g, '')
          .replace(/<c[0-9]>/g, '')
          .replace(/<n>/g, '\n')
          .trim();
        activePuzzle.displayText = text;
        activePuzzle.dialed = '';
        drawPuzzleState();
        return;
      }
    }
    // No match — show error
    activePuzzle.displayText = 'The number you have dialed\ncannot be completed.\nPress * to try again.';
    activePuzzle.dialed = '';
    drawPuzzleState();
  }

  // Get all clickable rects for cursor detection
  function getPuzzleClickRects() {
    if (!activePuzzle) return [];
    const rects = [];
    if (activePuzzle.exitHotspot) rects.push(activePuzzle.exitHotspot);
    switch (activePuzzle.type) {
      case 'ORDERING_PUZZLE':
        activePuzzle.buttons.forEach(b => rects.push(b));
        break;
      case 'ROTATINGLOCK_PUZZLE':
        activePuzzle.upRects.forEach(r => rects.push(r));
        activePuzzle.downRects.forEach(r => rects.push(r));
        break;
      case 'LEVER_PUZZLE':
        activePuzzle.destRects.forEach(r => rects.push(r));
        break;
      case 'TELEPHONE':
        activePuzzle.buttons.forEach(b => rects.push(b));
        break;
    }
    return rects;
  }

  // ── Save / Load ────────────────────────────────────────────────────────
  const SAVE_KEY = 'nd1_save';

  function saveGame() {
    const data = {
      flags: { ...state.flags },
      inventory: [...state.inventory],
      sceneId: state.currentSceneId,
      variant: state.currentVariant,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    sceneInfo.textContent += ' [Game Saved]';
  }

  function loadSavedGame() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    try {
      const data = JSON.parse(raw);
      state.flags = data.flags || {};
      state.inventory = new Set(data.inventory || []);
      loadScene(data.sceneId, data.variant ?? 0);
      return true;
    } catch { return false; }
  }

  function hasSavedGame() {
    return !!localStorage.getItem(SAVE_KEY);
  }

  // ── .SAV file import (original Game.exe save format) ────────────────────
  //
  // Binary layout of NANSCK*.SAV (11698 bytes = 0x2DB2):
  //
  // Header (0x00–0x7A):
  //   0x00       LE32   valid flag (1 = valid save)
  //   0x04       30B    publisher ("HER Interactive Presents")
  //   0x22       30B    series ("Nancy Drew")
  //   0x40       30B    subtitle ("Secrets Can Kill")
  //   0x5E       LE16   version field 1 (=1)
  //   0x60       LE16   version field 2 (=0)
  //   0x62       LE16   version field 3 (=0)
  //   0x64       22B    save description (null-terminated)
  //
  // Block 1 (0x7B, 5911B) — DAT_004c11a5 — primary game state:
  //   +0x000  1B     game init flag (1=initialized)
  //   +0x004  LE32   engine mode (7=playing)
  //   +0x024  LE32   game phase (3=playing)
  //   +0x044  120B   30 NPC states (LE32 each, default=2)
  //   +0x0BC  120B   30 NPC timestamps (LE32 each)
  //   +0x134  LE16   inventory count
  //   +0x136  22B    11 inventory item IDs (LE16 each, 0xFFFF=empty)
  //   +0x14C  44B    11 item states (LE32: 1=not obtained, 2=in inventory)
  //   +0x178  44B    11 item timestamps (LE32 each)
  //   +0x1A4  4B     wall clock reference (GetTickCount)
  //   +0x1A8  4B     total game time (ms)
  //   +0x1AC  2+2+2  game time S:M:H (LE16 each)
  //   +0x1B2  4B     segment timer (ms)
  //   +0x1B6  2+2+2  segment timer S:M:H
  //   +0x1BC  2+2+2  in-game clock M:H:D
  //   +0x1C2  4B     next tick threshold
  //   +0x1C6  4+4    pause-check ticks
  //   +0x1CE  1B     timed puzzle active (0/1)
  //   +0x1CF  4+2+2+2 timed puzzle elapsed + S:M:H
  //   +0x1D9  672B   168 story flags (LE32 each, default=1)
  //   +0x479  672B   168 flag timestamps (LE32 each)
  //   +0x719  4002B  scene visit counts (~2001 LE16)
  //   +0x16BB 8B     character visual state
  //   +0x16C3 2B     active character index
  //   +0x16C5 8B     walk animation frames
  //   +0x16CD 74B    pathfinding state
  //
  // Block 2 (0x1792, 5664B) — DAT_004d0aca — scene state:
  //   +0x000  50B    scene description (null-terminated)
  //   +0x032  10B    background AVF name
  //   +0x03C  LE16   scene resource type
  //   +0x03E  LE16   scroll type (1=panoramic, 2=vertical)
  //   +0x040  10B    ambient sound name
  //   +0x068  LE16   navigation mode
  //   +0x07C  1B     music/CD track (1-4)
  //   +0x400  LE16   scene ID
  //   +0x418  LE16   initial camera view

  const B1 = 0x7B;   // Block 1 file offset
  const B2 = 0x1792;  // Block 2 file offset
  const NUM_FLAGS = 168;
  const NUM_ITEMS = 11;

  function parseSavFile(buf) {
    const d = new DataView(buf);
    const u8 = new Uint8Array(buf);

    // Validate
    if (buf.byteLength !== 11698) throw new Error(`Bad .SAV size: ${buf.byteLength} (expected 11698)`);
    if (d.getUint32(0, true) !== 1) throw new Error('Invalid save file (valid flag ≠ 1)');

    const readStr = (off, maxLen) => {
      let end = off;
      while (end < off + maxLen && u8[end] !== 0) end++;
      return new TextDecoder('ascii').decode(u8.slice(off, end));
    };

    // Header
    const publisher = readStr(0x04, 30);
    const series    = readStr(0x22, 30);
    const subtitle  = readStr(0x40, 30);
    const saveDesc  = readStr(0x64, 22);

    // Block 1: Flags (168 LE32 values)
    const flags = {};
    for (let i = 0; i < NUM_FLAGS; i++) {
      const val = d.getUint32(B1 + 0x1D9 + i * 4, true);
      if (val !== 1) flags[i] = val;
    }

    // Block 1: Inventory (LE16 count + 11 LE16 item IDs)
    const invCount = d.getUint16(B1 + 0x134, true);
    const inventory = [];
    for (let i = 0; i < invCount && i < NUM_ITEMS; i++) {
      const itemId = d.getUint16(B1 + 0x136 + i * 2, true);
      if (itemId !== 0xFFFF) inventory.push(itemId);
    }

    // Block 1: Item obtained states (11 LE32: 1=not obtained, 2=obtained)
    const itemStates = [];
    for (let i = 0; i < NUM_ITEMS; i++) {
      itemStates.push(d.getUint32(B1 + 0x14C + i * 4, true));
    }

    // Block 1: Game time
    const gameTimeMs = d.getUint32(B1 + 0x1A8, true);

    // Block 2: Scene identification
    const sceneDesc = readStr(B2, 50);
    const bgAvf     = readStr(B2 + 0x32, 10);
    const ambient   = readStr(B2 + 0x40, 10);
    const sceneId   = d.getUint16(B2 + 0x400, true);

    return { publisher, series, subtitle, saveDesc, flags, inventory, itemStates, gameTimeMs, sceneDesc, bgAvf, ambient, sceneId };
  }

  function findSceneForSav(parsed) {
    // Pass 0: direct scene ID lookup (most reliable — stored at B2+0x400)
    if (parsed.sceneId && scenes['S' + parsed.sceneId]) return 'S' + parsed.sceneId;

    const targetDesc = parsed.sceneDesc.trim().toLowerCase();
    const targetBg   = parsed.bgAvf.trim().toLowerCase();

    // Pass 1: match by description + background AVF
    for (const [sid, scene] of Object.entries(scenes)) {
      const desc = (scene.summary?.description || '').trim().toLowerCase();
      const bg   = (scene.summary?.bg_avf || '').trim().toLowerCase();
      if (desc === targetDesc && bg === targetBg) return sid;
    }

    // Pass 2: match by description only
    const candidates = [];
    for (const [sid, scene] of Object.entries(scenes)) {
      const desc = (scene.summary?.description || '').trim().toLowerCase();
      if (desc === targetDesc) candidates.push(sid);
    }
    if (candidates.length === 1) return candidates[0];

    // Pass 3: substring matching for truncated descriptions
    if (candidates.length === 0) {
      for (const [sid, scene] of Object.entries(scenes)) {
        const desc = (scene.summary?.description || '').trim().toLowerCase();
        if (desc.startsWith(targetDesc.substring(0, 20)) || targetDesc.startsWith(desc.substring(0, 20))) {
          candidates.push(sid);
        }
      }
      if (candidates.length === 1) return candidates[0];
    }

    // Pass 4: among multiple candidates, prefer the one whose bg_avf matches
    if (candidates.length > 1 && targetBg) {
      const bgMatch = candidates.find(sid => {
        const bg = (scenes[sid].summary?.bg_avf || '').trim().toLowerCase();
        return bg === targetBg;
      });
      if (bgMatch) return bgMatch;
    }

    return candidates[0] || null;
  }

  function loadSavFile(buf) {
    if (menuActive) { menuActive = false; invBar.style.visibility = ''; stopAmbient(); }
    savTemplate = buf.slice(0); // stash a copy as export template
    const parsed = parseSavFile(buf);
    console.log('Parsed .SAV:', parsed);

    // Apply flags — start from clean defaults (same as init)
    state.flags = {};
    Object.assign(state.flags, INITIAL_FLAGS);
    for (const qs of Object.values(INVESTIGATION_QUESTIONS)) {
      for (const q of qs) {
        for (const c of q.conditions || []) {
          if (c.expected === 1 && !(c.flag_id in state.flags)) {
            state.flags[c.flag_id] = 1;
          }
        }
      }
    }
    // Now overlay the save file flags
    for (const [id, val] of Object.entries(parsed.flags)) {
      state.flags[+id] = val;
    }

    // Apply inventory
    state.inventory = new Set(parsed.inventory);
    state.activeItem = null;
    state.history = [];

    // Find the matching scene
    const sceneId = findSceneForSav(parsed);
    if (!sceneId) {
      alert(`Could not identify scene from save file.\nDescription: "${parsed.sceneDesc}"`);
      return;
    }

    console.log(`Loading .SAV → scene ${sceneId} (desc: "${parsed.sceneDesc}", bg: "${parsed.bgAvf}")`);
    updateInventoryBar();
    refreshDebugPanel();
    loadScene(sceneId, 0);
  }

  function promptLoadSavFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.SAV,.sav';
    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          loadSavFile(reader.result);
        } catch (e) {
          alert('Error loading .SAV file: ' + e.message);
          console.error(e);
        }
      };
      reader.readAsArrayBuffer(file);
    };
    input.click();
  }

  function promptLoadSavTemplate() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.SAV,.sav';
    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const buf = reader.result;
          if (buf.byteLength !== 11698) throw new Error(`Bad .SAV size: ${buf.byteLength}`);
          if (new DataView(buf).getUint32(0, true) !== 1) throw new Error('Invalid save file');
          savTemplate = buf.slice(0);
          sceneInfo.textContent += ' [Template loaded: ' + file.name + ']';
          console.log('Loaded .SAV template:', file.name);
          refreshDebugPanel();
        } catch (e) {
          alert('Error loading .SAV template: ' + e.message);
          console.error(e);
        }
      };
      reader.readAsArrayBuffer(file);
    };
    input.click();
  }

  // ── .SAV file export (write current state to original binary format) ─────
  //
  // Two modes:
  //   Template mode (savTemplate set): clones the template, preserving timers,
  //     visit counts, pathfinding, and action records, then overwrites tracked fields.
  //   Clean mode (no template): builds from scratch with zero-filled unknown regions.

  function buildSavFile(saveDesc) {
    const SIZE = 11698;
    const buf = savTemplate ? savTemplate.slice(0) : new ArrayBuffer(SIZE);
    const d = new DataView(buf);
    const u8 = new Uint8Array(buf);

    const writeStr = (off, maxLen, str) => {
      const bytes = new TextEncoder().encode(str);
      for (let i = 0; i < maxLen; i++) u8[off + i] = i < bytes.length ? bytes[i] : 0;
    };

    // ── Header (0x00–0x7A) ──
    d.setUint32(0x00, 1, true);                               // valid flag
    writeStr(0x04, 30, 'HER Interactive Presents');
    writeStr(0x22, 30, 'Nancy Drew');
    writeStr(0x40, 30, 'Secrets Can Kill');
    d.setUint16(0x5E, 1, true);                               // version field 1
    d.setUint16(0x60, 0, true);                               // version field 2
    d.setUint16(0x62, 0, true);                               // version field 3
    // Save description (offset 0x64, max 22 chars including null)
    // In original Game.exe: player-typed text for manual saves, "CONTINUE GAME" for auto-saves
    const curScene = scenes[state.currentSceneId];
    const label = saveDesc || curScene?.summary?.description || state.currentSceneId || 'Unknown';
    writeStr(0x64, 22, label.substring(0, 21));

    // ── Block 1: Game State (B1 = 0x7B) ──

    // +0x000: game init flag
    u8[B1] = 1;
    // +0x004: engine mode (7 = playing)
    d.setUint32(B1 + 0x004, 7, true);
    // +0x024: game phase (3 = playing)
    d.setUint32(B1 + 0x024, 3, true);

    // +0x044: 30 NPC states (default = 2)
    for (let i = 0; i < 30; i++) d.setUint32(B1 + 0x044 + i * 4, 2, true);

    // +0x134: inventory count (LE16) + 11 item IDs (LE16) + 11 item states (LE32)
    const invItems = [...state.inventory];
    d.setUint16(B1 + 0x134, invItems.length, true);
    for (let i = 0; i < NUM_ITEMS; i++) {
      d.setUint16(B1 + 0x136 + i * 2, i < invItems.length ? invItems[i] : 0xFFFF, true);
    }
    for (let i = 0; i < NUM_ITEMS; i++) {
      d.setUint32(B1 + 0x14C + i * 4, state.inventory.has(i) ? 2 : 1, true);
    }

    // +0x1D9: 168 story flags (LE32, default=1)
    for (let i = 0; i < NUM_FLAGS; i++) {
      const val = (i in state.flags) ? state.flags[i] : 1;
      d.setUint32(B1 + 0x1D9 + i * 4, val, true);
    }

    // ── Block 2: Scene State (B2 = 0x1792) ──
    const desc = curScene?.summary?.description || '';
    const bg   = curScene?.summary?.bg_avf || '';
    const amb  = curScene?.summary?.ambient_snd || '';
    writeStr(B2, 50, desc);                                   // +0x000: scene description
    writeStr(B2 + 0x32, 10, bg);                              // +0x032: background AVF
    d.setUint16(B2 + 0x03C, 2, true);                        // +0x03C: scene resource type
    d.setUint16(B2 + 0x03E, 2, true);                        // +0x03E: scroll type
    writeStr(B2 + 0x40, 10, amb);                             // +0x040: ambient sound
    d.setUint16(B2 + 0x068, 1, true);                        // +0x068: navigation mode
    u8[B2 + 0x07C] = 1;                                      // +0x07C: music track

    const sceneNum = parseInt((state.currentSceneId || '').replace(/\D/g, '')) || 0;
    d.setUint16(B2 + 0x400, sceneNum, true);                 // +0x400: scene ID
    d.setUint16(B2 + 0x418, state.currentVariant || 0, true);// +0x418: camera view

    return buf;
  }

  function hasSavTemplate() { return !!savTemplate; }

  function exportSavFile() {
    // Prompt for save description (like original Game.exe save dialog)
    const curScene = scenes[state.currentSceneId];
    const defaultDesc = curScene?.summary?.description || state.currentSceneId || '';
    const saveDesc = prompt('Save description (max 22 chars, like original game):', defaultDesc.substring(0, 21));
    if (saveDesc === null) return; // user cancelled

    // Prompt for save slot (1-6, matching NANSCK1-6.SAV)
    const slotStr = prompt('Save slot (1-6):', '1');
    if (slotStr === null) return;
    const slot = parseInt(slotStr);
    if (isNaN(slot) || slot < 1 || slot > 6) {
      alert('Invalid slot. Must be 1-6.');
      return;
    }

    try {
      const mode = savTemplate ? 'template' : 'clean';
      const buf = buildSavFile(saveDesc || undefined);
      const blob = new Blob([buf], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NANSCK${slot}.SAV`;
      a.click();
      URL.revokeObjectURL(url);
      sceneInfo.textContent += ` [.SAV Exported → NANSCK${slot}.SAV (${mode})]`;
      console.log(`.SAV exported → NANSCK${slot}.SAV (${mode} mode), desc="${saveDesc}", scene ${state.currentSceneId}`);
    } catch (e) {
      alert('Error exporting .SAV file: ' + e.message);
      console.error(e);
    }
  }

  // ── Inventory bar ────────────────────────────────────────────────────────
  async function updateInventoryBar() {
    invBar.innerHTML = '';
    if (state.inventory.size === 0) {
      state.activeItem = null;
      const el = document.createElement('span');
      el.id = 'inv-empty';
      el.textContent = 'Inventory empty';
      invBar.appendChild(el);
      return;
    }

    // If the active item was removed from inventory, deselect it
    if (state.activeItem !== null && !state.inventory.has(state.activeItem)) {
      state.activeItem = null;
    }

    for (const itemId of state.inventory) {
      const slot = document.createElement('div');
      slot.className = 'inv-slot';
      if (state.activeItem === itemId) slot.classList.add('inv-selected');
      slot.title = ITEM_NAMES[itemId] || `Item ${itemId}`;
      slot.dataset.itemId = itemId;

      // Click to select/deselect
      slot.addEventListener('click', () => {
        if (state.activeItem === itemId) {
          state.activeItem = null;
        } else {
          state.activeItem = itemId;
        }
        // Update selection highlight without full re-render
        for (const s of invBar.querySelectorAll('.inv-slot')) {
          s.classList.toggle('inv-selected', +s.dataset.itemId === state.activeItem);
        }
        updateCanvasCursor();
      });

      const sp = ITEM_SPRITES[itemId];
      if (sp && sp.sheet) {
        const img = await tryLoadImg(SPRITES_DIR, sp.sheet, '.png');
        if (img) {
          // Draw cropped sprite into a small canvas
          const ic = document.createElement('canvas');
          const scale = Math.min((SLOT_SIZE - 4) / sp.w, (SLOT_SIZE - 4) / sp.h);
          ic.width  = Math.round(sp.w * scale);
          ic.height = Math.round(sp.h * scale);
          ic.getContext('2d').drawImage(img, sp.x, sp.y, sp.w, sp.h, 0, 0, ic.width, ic.height);
          slot.appendChild(ic);
        }
      }

      const lbl = document.createElement('div');
      lbl.className = 'inv-label';
      lbl.textContent = ITEM_NAMES[itemId] || `#${itemId}`;
      slot.appendChild(lbl);
      invBar.appendChild(slot);
    }
  }

  function updateCanvasCursor() {
    if (state.activeItem !== null) {
      const ic = itemCursors[state.activeItem];
      canvas.style.cursor = ic ? ic.normal : gc('arrow');
    } else {
      canvas.style.cursor = gc('arrow');
    }
  }

  // ── Scene loading ────────────────────────────────────────────────────────
  async function loadScene(sceneId, variant = 0, pushHistory = true) {
    const scene = scenes[sceneId];
    if (!scene) { console.warn('Scene not found:', sceneId); return; }

    // Stop any running NPC fidget, conversation animation, auto-pan, or scene sounds
    stopFidget();
    stopConvAnimation();
    if (sceneId !== state.currentSceneId) stopAutoPan();
    sceneSounds.forEach(a => { a.pause(); a.currentTime = 0; });
    sceneSounds = [];

    // Clear any active interactive puzzle
    if (activePuzzle?._keyHandler) {
      document.removeEventListener('keydown', activePuzzle._keyHandler);
    }
    if (activePuzzle?._blinkInterval) {
      clearInterval(activePuzzle._blinkInterval);
    }
    activePuzzle = null;
    puzzleBaseImage = null;

    // Track whether this is a reload of the same scene (variant change / flag update).
    // One-shot sounds should not replay on same-scene reloads.
    const isSameScene = (state.currentSceneId === sceneId);

    if (pushHistory && state.currentSceneId && !isSameScene) {
      state.history.push({ id: state.currentSceneId, variant: state.currentVariant });
    }

    state.currentSceneId = sceneId;
    state.currentVariant = variant;
    activeHotspots = [];
    hideConv();

    // ── Game.exe hardcoded logic ───────────────────────────────────────────
    // These flag-sets are performed by Game.exe code outside the scene data.
    // Flag 62: "Boiler crisis phase" — Game.exe activates the crisis (f62=1)
    // when Daryl delivers the note in S3216 (which also sets f40=2 via
    // tail_entry). This makes boiler room scenes route to the "chains on /
    // about to explode" variants.
    if (sceneId === 'S3216') {
      state.flags[10] = 2;  // Sabotaged elevator (routes S53→S71→S72→S30→S2077)
    }

    // F44/F45 are scene-local state flags in the original engine (reset per
    // scene) but we treat them globally.  Reset them on scene entry so stale
    // values from prior scenes don't trigger conditioned sounds/nav_on_end.
    // Exception: preserve them when reloading the same scene (Tier 3 EFMHS
    // re-evaluation needs the flags that were just set by clicking).
    if (!isSameScene) {
      delete state.flags[44];
      delete state.flags[45];
    }
    // S53 / S2079 (elevator button CU): The EFMHS sets F45=2 (button pressed)
    // but the SCENE_CHANGE conditions check F44==2 (decoder off-by-one).  Bridge
    // the gap so the Tier 3 SCENE_CHANGE reload fires the elevator animation.
    // S53 = going down (maintenance closet), S2079 = going up (boiler room).
    if ((sceneId === 'S53' || sceneId === 'S2079') && state.flags[45] === 2) {
      state.flags[44] = 2;
    }

    const sum = scene.summary;
    sceneInfo.textContent = `${sceneId}: ${sum.description}`;

    // Draw background then scene items
    await renderBackground(sum.bg_avf, variant);
    await renderSceneItems(scene.actions);
    await renderNPCs(scene.actions, variant);

    // Set ambient — conversation scenes use placeholder values, so keep the
    // previous location's ambient when the scene contains a CONVERSATION_VIDEO.
    const isConvScene = scene.actions.some(a => a.type === 'CONVERSATION_VIDEO');
    if (!isConvScene) setAmbient(sum.ambient_snd);

    // Process actions in order.
    // Panoramic room nodes (tl1x, le1x, etc.) have background images that are
    // 536×376 but the game canvas is 536×292.  renderBackground() squishes them
    // via drawImage(), so hotspot y-coordinates from the scene data (which are
    // in the native 376px space) must be scaled down to match.  yS is 1.0 for
    // standard 292px scenes and ~0.777 for 376px panoramics.
    const hotspots = [];
    const yS = bgNativeHeight > GAME_H ? GAME_H / bgNativeHeight : 1;
    let autoNav = null, autoConv = null, puzzleAction = null;
    let movieSoundsPlayed = null; // sounds already triggered during movie playback

    // Pre-scan: process timer actions before the main loop.  PLAY_SECONDARY_MOVIE
    // auto-navigates and returns early, which would skip RESET_AND_START_TIMER /
    // STOP_TIMER actions that appear later in the action list (e.g. S71 sabotaged
    // elevator starts the boiler countdown but lists the timer after the movie).
    for (const act of scene.actions) {
      if (!condPass(act)) continue;
      if (act.type === 'RESET_AND_START_TIMER') startTimer();
      else if (act.type === 'STOP_TIMER') stopTimer();
    }

    for (const act of scene.actions) {
      if (act.type === 'HOT_1FR_EXITSCENE' || act.type === 'HOT_1FR_SCENE_CHANGE') {
        const cp = condPass(act);
        console.log(`[${sceneId}] ${act.type} → S${act.target_scene} condPass=${cp}`,
          act.conditions?.map(c => `F${c.flag_id}==${c.flag_value}(actual:${state.flags[c.flag_id] ?? 'UNSET→1'})`) || 'no conds');
      }
      if (!condPass(act)) continue;

      switch (act.type) {

        // ── Auto-executing ──
        case 'EVENTFLAGS':
          if (act.flags_set) act.flags_set.forEach(f => { state.flags[f.flag] = f.value; });
          break;

        case 'DIFFICULTY_LEVEL':
          // Sets a flag when a difficulty has been chosen (param1=flag_id, param2=value)
          if (act.param1 !== undefined && act.param2 !== undefined) {
            state.flags[act.param1] = act.param2;
          }
          if (act.difficulty !== undefined) {
            state.difficulty = act.difficulty;
          }
          break;

        case 'ADD_INVENTORY':
          if (act.item_id !== undefined) { state.inventory.add(act.item_id); }
          break;

        case 'REMOVE_INVENTORY':
          if (act.item_id !== undefined) { state.inventory.delete(act.item_id); }
          break;

        case 'PLAY_DIGI_SOUND':
        case 'PLAY_DIGI_SOUND_2':
        case 'PLAY_SOUND_PAN_FRAME':
          // Skip sounds that are triggered by EVENTFLAGS_MULTI_HS clicks
          // (those play in the click handler, not on scene load)
          // Also skip sounds already triggered during movie playback
          if (!isSameScene && !isEventFlagSound(scene, act)
              && !movieSoundsPlayed?.has(act.sound_file)) {
            const audio = playSound(act.sound_file);
            if (audio) sceneSounds.push(audio);
            // Navigate when sound finishes (e.g. opening a book/drawer, intro narration).
            // Don't block — continue the loop so hotspots get registered (player
            // can click to skip, e.g. S60 intro has an abort hotspot).  The sound's
            // end-handler navigates only if we're still on the same scene.
            if (act.nav_on_end && audio) {
              const navTarget = act.nav_on_end;
              const originScene = sceneId;
              waitForSound(audio).then(() => {
                if (state.currentSceneId === originScene) {
                  loadScene(`S${navTarget}`, 0, false);
                }
              });
            }
          }
          break;

        case 'RESET_AND_START_TIMER':
        case 'STOP_TIMER':
          // Handled in pre-scan above (before movie auto-nav can return early)
          break;

        case 'PLAY_SECONDARY_MOVIE': {
          // Cinematic animation — blocks input, plays frames, fires timed
          // flag triggers (which activate conditional sounds in the scene),
          // sets completion flags, then navigates to the embedded target.
          movieSoundsPlayed = await playMovie(act, scene.actions);

          // Original game re-evaluates scene actions during movie playback.
          // Flags may have changed, enabling inventory changes (e.g. S1250:
          // flag 44 set at frame 174 enables ADD_INVENTORY for gun).  Apply
          // any inventory actions whose conditions now pass.
          for (const a of scene.actions) {
            if (!condPass(a)) continue;
            if (a.type === 'ADD_INVENTORY' && a.item_id !== undefined)
              state.inventory.add(a.item_id);
            else if (a.type === 'REMOVE_INVENTORY' && a.item_id !== undefined)
              state.inventory.delete(a.item_id);
          }

          // Check if the scene has interactive hotspots the player can use
          // after the movie (e.g. S1251: hold gun on Mitch → win path).
          // If so, continue loading the scene to register those hotspots
          // instead of auto-navigating — the player must interact.
          const NAV_HS_TYPES = ['HOT_1FR_SCENE_CHANGE', 'HOT_1FR_EXITSCENE',
            'HOT_MULTIFRAME_SCENE_CHANGE'];
          const hasPostMovieHotspot = scene.actions.some(a =>
            NAV_HS_TYPES.includes(a.type) && condPass(a));

          if (hasPostMovieHotspot) {
            // Continue the action loop — hotspots will be registered.
            // Don't set autoNav: player must click a hotspot to proceed.
            break;
          }

          if (act.target_scene) {
            await loadScene(`S${act.target_scene}`, act.scene_param ?? 0, true);
          } else {
            // No nav target (explosions, S1253 lose) — check for game-end
            // actions whose flag conditions now pass after movie playback.
            const loseAct = scene.actions.find(a => a.type === 'LOSE_GAME' && condPass(a));
            if (loseAct) { showGameEnd(false); return; }
            const winAct = scene.actions.find(a => a.type === 'WIN_GAME' && condPass(a));
            if (winAct) { showGameEnd(true); return; }
          }
          return;
        }

        case 'SCENE_CHANGE':
          // Take the first auto-navigate that passes conditions
          if (!autoNav) autoNav = act;
          break;

        case 'CONVERSATION_VIDEO': {
          // Pick the last node whose npc_ref conditions pass (most specific match).
          if (npcRefsPass(act)) {
            autoConv = act;
          }
          break;
        }

        // ── Hotspot actions ──
        case 'HOT_1FR_SCENE_CHANGE':
        case 'HOT_1FR_EXITSCENE':
          if (act.hotspot) {
            const h = act.hotspot;
            const passes = condPass(act);
            console.log(`  [HS] ${act.type} → S${act.target_scene} | condPass=${passes}`,
              act.conditions?.map(c => `F${c.flag_id}==${c.flag_value}(actual:${state.flags[c.flag_id] ?? '??1'})`));
            hotspots.push({ x1: h.x1, y1: h.y1 * yS, x2: h.x2, y2: h.y2 * yS,
              label: `S${act.target_scene}`, action: act });
          }
          break;

        case 'HOT_MULTIFRAME_SCENE_CHANGE':
          if (act.frames) act.frames.forEach(fr => {
            if (fr.frame === variant) {
              hotspots.push({ x1: fr.x1, y1: fr.y1 * yS, x2: fr.x2, y2: fr.y2 * yS,
                label: `S${act.target_scene}`, action: act });
            }
          });
          break;

        case 'EVENTFLAGS_MULTI_HS': {
          const flagLabel = act.flags_set
            ? act.flags_set.map(f => `F${f.flag}=${f.value}`).join(' ')
            : 'FLAG';
          if (act.frames) act.frames.forEach(fr => {
            if (fr.frame === variant) {
              hotspots.push({ x1: fr.x1, y1: fr.y1 * yS, x2: fr.x2, y2: fr.y2 * yS,
                label: flagLabel, action: act });
            }
          });
          break;
        }

        case 'MAP_CALL_HOT_1FR':
          // Map-screen hotspot (1-frame). Show in debug; currently no map UI.
          if (act.hotspot) {
            const h = act.hotspot;
            hotspots.push({ x1: h.x1, y1: h.y1 * yS, x2: h.x2, y2: h.y2 * yS,
              label: 'MAP', action: act });
          }
          break;

        case 'MAP_CALL_HOT_MULTIFRAME':
          // Map-screen hotspot (multi-frame). Show in debug.
          if (act.frames) act.frames.forEach(fr => {
            if (fr.frame === variant) {
              hotspots.push({ x1: fr.x1, y1: fr.y1 * yS, x2: fr.x2, y2: fr.y2 * yS,
                label: 'MAP', action: act });
            }
          });
          break;

        case 'PLAY_SECONDARY_VIDEO':
          // NPC character overlay — register per-frame click hotspot
          if (act.frames && act.target_scene) {
            act.frames.forEach(fr => {
              if (fr.frame === variant) {
                hotspots.push({
                  x1: fr.hs_x1, y1: fr.hs_y1 * yS, x2: fr.hs_x2, y2: fr.hs_y2 * yS,
                  label: `NPC→S${act.target_scene}`, action: act,
                });
              }
            });
          }
          break;

        case 'SHOW_INVENTORY_ITEM':
          // Register a pickup hotspot at the item's dst_rect.
          // Items already in inventory are excluded (condPass passed, but
          // we skip picked-up items explicitly).
          if (act.dst_rect && act.item_id !== undefined && !state.inventory.has(act.item_id)) {
            const d = act.dst_rect;
            hotspots.push({
              x1: d.x1, y1: d.y1 * yS, x2: d.x2, y2: d.y2 * yS,
              label: `PICK:${ITEM_NAMES[act.item_id] || act.item_id}`,
              action: act,
            });
          }
          break;

        case 'LOSE_GAME':
          showGameEnd(false);
          return;

        case 'WIN_GAME':
          showGameEnd(true);
          return;

        case 'SAVE_CONTINUE_GAME':
          secondChanceSave = {
            flags: { ...state.flags },
            inventory: [...state.inventory],
            sceneId: state.currentSceneId,
            variant: state.currentVariant,
            history: state.history.map(h => ({ ...h })),
          };
          break;

        case 'PASSWORD_PUZZLE':
        case 'ORDERING_PUZZLE':
        case 'ROTATINGLOCK_PUZZLE':
        case 'LEVER_PUZZLE':
        case 'SLIDER_PUZZLE':
        case 'TELEPHONE':
          puzzleAction = act;
          break;
      }
    }

    // Inject "back to map" hotspot on exterior map-location scenes
    if (MAP_LOCATIONS.some(loc => loc.id === sceneId)) {
      const mapH = 22; // hotspot height at bottom of canvas
      hotspots.push({
        x1: 0, y1: GAME_H - mapH, x2: GAME_W, y2: GAME_H,
        label: '← Travel Map', action: { type: 'MAP_BACK' }
      });
      // Draw a subtle indicator
      ctx.save();
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, GAME_H - mapH, GAME_W, mapH);
      ctx.fillStyle = '#b8903a';
      ctx.font = '11px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('← Travel Map →', GAME_W / 2, GAME_H - 7);
      ctx.restore();
    }

    activeHotspots = hotspots;
    drawHotspots(hotspots);

    // Draw panoramic scroll arrows for multi-frame scenes
    const avfFrames = sum.avf_frames ?? 0;
    if (avfFrames > 1) {
      drawScrollArrows(variant, avfFrames);
    }

    await updateInventoryBar();

    // Debug overlay
    if (state.debugHotspots) {
      debugInfo.textContent = `${hotspots.length} hotspots | flags: ${JSON.stringify(state.flags)}`;
    } else {
      debugInfo.textContent = `${hotspots.length} hotspots`;
    }
    refreshDebugPanel();

    // Auto-navigate takes priority over conversation
    if (autoNav && `S${autoNav.target_scene}` !== sceneId) {
      await loadScene(`S${autoNav.target_scene}`, autoNav.scene_param ?? 0, false);
      return;
    }

    // Auto-show conversation.  Narration nodes (empty text after markup strip)
    // play an AVF video overlay and auto-advance instead of showing the conversation UI.
    if (autoConv) {
      const convText = stripMarkup(autoConv.npc_text || '');
      if (!convText) {
        // Play AVF animation overlay at coords (x2,y2)→(x3,y3)
        await playNarrationVideo(autoConv.node_id, autoConv.coords, autoConv.intro_sound);
        // Apply tail_entries flags (e.g. mark node as visited)
        const tail = autoConv.tail_entries || [];
        tail.filter(e => e.type === 'flag').forEach(e => { state.flags[e.id] = e.value; });
        if (autoConv.continuation_scene) {
          await loadScene(`S${autoConv.continuation_scene}`, 0, false);
          return;
        }
        // No continuation — check for win/lose actions (e.g. S2073)
        const winAct = scene.actions.find(a => a.type === 'WIN_GAME' && condPass(a));
        if (winAct) { showGameEnd(true); return; }
        const loseAct = scene.actions.find(a => a.type === 'LOSE_GAME' && condPass(a));
        if (loseAct) { showGameEnd(false); return; }
        return;
      }
      showConv(autoConv);
    }

    // Activate puzzle if one was found in scene actions
    if (!autoConv && puzzleAction) {
      const pt = puzzleAction.type;
      if (pt === 'ORDERING_PUZZLE' && puzzleAction.correct_sequence) {
        setupOrderingPuzzle(puzzleAction);
      } else if (pt === 'ROTATINGLOCK_PUZZLE' && puzzleAction.combination) {
        setupRotatingLockPuzzle(puzzleAction);
      } else if (pt === 'PASSWORD_PUZZLE' && puzzleAction.passwords) {
        setupPasswordPuzzle(puzzleAction);
      } else if (pt === 'LEVER_PUZZLE' && puzzleAction.solution) {
        setupLeverPuzzle(puzzleAction);
        // S5002: scene data exit_scene points to S2061 (safe boiler) but during
        // the crisis (F62==1) we should return to S2077 (crisis boiler room).
        // The padlock is already solved at this point, so skip S2099 (lever CU).
        if (sceneId === 'S5002' && (state.flags[62] ?? 0) === 1) {
          activePuzzle.exitScene = 2077;
        }
      } else if (pt === 'TELEPHONE' && puzzleAction.buttons) {
        setupTelephone(puzzleAction);
      } else if (PUZZLE_DATA[sceneId]) {
        showPuzzle(puzzleAction, sceneId);
      }
    } else if (!autoConv && PUZZLE_DATA[sceneId]) {
      showPuzzle(null, sceneId);
    }

    // Preload backgrounds for scenes reachable from current hotspots
    preloadAdjacentScenes(hotspots);
  }

  // ── Scene-adjacent preloading ─────────────────────────────────────────────
  // Silently prefetch background images for all scenes linked by hotspots
  // so navigation feels instant.  Errors are ignored (non-critical).
  function preloadAdjacentScenes(hotspots) {
    const seen = new Set();
    for (const hs of hotspots) {
      const act = hs.action;
      const targetId = act.target_scene ? `S${act.target_scene}` : null;
      if (!targetId || seen.has(targetId)) continue;
      seen.add(targetId);
      const targetScene = scenes[targetId];
      if (!targetScene?.summary?.bg_avf) continue;
      const avf = targetScene.summary.bg_avf;
      // Preload frame 0 (default variant) — fires and forgets
      tryLoadImg(FRAMES_DIR, avf, '_000.png').catch(() => {});
    }
  }

  // ── Loading bar ─────────────────────────────────────────────────────────
  // Draws a thin progress bar on canvas while loading multi-frame animations.
  function drawLoadingBar(loaded, total) {
    const barW = 120, barH = 4;
    const x = (GAME_W - barW) / 2;
    const y = GAME_H - 20;
    const pct = total > 0 ? loaded / total : 0;
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(x, y, barW, barH);
    ctx.fillStyle = '#b8903a';
    ctx.fillRect(x, y, barW * pct, barH);
  }

  // ── Hub precaching ────────────────────────────────────────────────────────
  // Preload backgrounds for the most-visited areas so navigation feels instant.
  // Runs once after init, loading in the background without blocking gameplay.
  function precacheHubBackgrounds() {
    const hubAvfs = [
      'aext','ae1x',                        // Aunt Eloise's house
      'dext','dd1v','dd1w','dd1x',           // Diner (day) + interior
      'dfront02',                            // Diner (night)
      'sext','sh4x','ssexter1','ssexter2',   // School + hallways
      'pfexter0','pfexter3',                 // Pharmacy
    ];
    for (const avf of hubAvfs) {
      tryLoadImg(FRAMES_DIR, avf, '_000.png');
    }
  }

  // ── Panoramic scroll ─────────────────────────────────────────────────────
  const SCROLL_ZONE = 28; // px from edge to trigger scroll

  function drawScrollArrows(variant, maxFrames) {
    ctx.save();
    ctx.font = 'bold 22px sans-serif';
    ctx.textBaseline = 'middle';
    const mid = GAME_H / 2;
    const alpha = 0.55;

    // 360° panoramic: always show both arrows (wraps around).
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fillText('◀', 6, mid);
    ctx.textAlign = 'right';
    ctx.fillText('▶', GAME_W - 6, mid);
    ctx.restore();
  }

  function scrollDir(x) {
    // Returns +1 (pan left = increase variant), -1 (pan right = decrease variant), or 0
    const sum = scenes[state.currentSceneId]?.summary;
    if (!sum || !sum.avf_frames || sum.avf_frames <= 1) return 0;
    if (x <= SCROLL_ZONE) return +1;
    if (x >= GAME_W - SCROLL_ZONE) return -1;
    return 0;
  }

  function stopAutoPan() {
    if (autoPanInterval) { clearInterval(autoPanInterval); autoPanInterval = null; }
    autoPanDir = 0;
  }

  function startAutoPan(dir) {
    if (!state.autoPanEnabled) return;
    if (autoPanDir === dir && autoPanInterval) return; // already panning this direction
    stopAutoPan();
    autoPanDir = dir;
    autoPanInterval = setInterval(async () => {
      const sum = scenes[state.currentSceneId]?.summary;
      const maxFrames = sum?.avf_frames ?? 0;
      if (maxFrames <= 1) { stopAutoPan(); return; }
      const newVariant = (state.currentVariant + autoPanDir + maxFrames) % maxFrames;
      await loadScene(state.currentSceneId, newVariant, false);
    }, 250);
  }

  // ── Click handling ───────────────────────────────────────────────────────
  function canvasXY(e) {
    const r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left)  * (GAME_W / r.width),
      y: (e.clientY - r.top)   * (GAME_H / r.height),
    };
  }

  function hitTest(x, y) {
    for (let i = activeHotspots.length - 1; i >= 0; i--) {
      const h = activeHotspots[i];
      const x1 = Math.min(h.x1, h.x2), x2 = Math.max(h.x1, h.x2);
      const y1 = Math.min(h.y1, h.y2), y2 = Math.max(h.y1, h.y2);
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2 && condPass(h.action)) return h;
    }
    return null;
  }

  // Like hitTest but skips EVENTFLAGS_MULTI_HS (those are handled separately)
  function hitTestPrimary(x, y) {
    for (let i = activeHotspots.length - 1; i >= 0; i--) {
      const h = activeHotspots[i];
      if (h.action.type === 'EVENTFLAGS_MULTI_HS') continue;
      const x1 = Math.min(h.x1, h.x2), x2 = Math.max(h.x1, h.x2);
      const y1 = Math.min(h.y1, h.y2), y2 = Math.max(h.y1, h.y2);
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2 && condPass(h.action)) return h;
    }
    return null;
  }

  async function onCanvasClick(e) {
    if (menuActive) { const p = canvasXY(e); handleMenuClick(p.x, p.y); return; }
    if (movieActive) return; // block input during movie playback
    if (convOL.classList.contains('active')) return;
    if (mapOL.classList.contains('active')) { hideMapDialog(); return; }
    if (gameEndOL.classList.contains('active')) return;
    if (puzzleOL.classList.contains('active')) return;
    if (document.getElementById('continue-overlay').classList.contains('active')) return;
    const { x, y } = canvasXY(e);

    // Interactive puzzle mode — handle clicks through puzzle system
    if (activePuzzle) {
      handlePuzzleClick(x, y);
      return;
    }

    // Panoramic scroll — check edge zones before hotspots
    const dir = scrollDir(x);
    if (dir !== 0) {
      const sum = scenes[state.currentSceneId]?.summary;
      const maxFrames = sum?.avf_frames ?? 0;
      const newVariant = (state.currentVariant + dir + maxFrames) % maxFrames;
      if (newVariant !== state.currentVariant) {
        await loadScene(state.currentSceneId, newVariant, false);
      }
      return;
    }

    // ── EVENTFLAGS_MULTI_HS click processing ──────────────────────────────
    //
    // EFMHS (action type 0x6a) is a clickable hotspot that sets global flags
    // but does NOT encode a navigation target in its binary data.  The original
    // engine (FUN_004235d0 in Game.exe.c) implements a 3-state machine:
    //   state 0 → mark dirty, state 1 → find matching frame/store rect,
    //   state 2 → set flags and clean up.
    //
    // Navigation after an EFMHS click is driven by a SEPARATE mechanism:
    // PLAY_DIGI_SOUND actions in the same scene, conditioned on the flag that
    // was just set, carry a "nav_on_end" field (decoded from offset 0x1e in
    // the sound action's binary data).  This tells the engine which scene to
    // load after the sound finishes — e.g. a book-open sound navigates to
    // the open-book scene, a drawer-close sound returns to the closed view.
    //
    // The click flow is:
    //   1. Hit-test all EFMHS hotspots → set flags for any under the cursor
    //   2. Find PLAY_DIGI_SOUND actions conditioned on the JUST-SET flags
    //      → play the sound, capture nav_on_end as the navigation target
    //   3. Hit-test primary (non-EFMHS) hotspots for normal navigation
    //   4. If no primary hit, use the multi-tier fallback (see below)
    //
    // IMPORTANT: justSetFlags tracks which flags THIS click changed.  Scenes
    // with multiple EFMHS hotspots (e.g. S1619 has F44, F45, F46, F47 for
    // four different books) each have a paired sound with a different
    // nav_on_end.  Without justSetFlags filtering, stale flags from prior
    // clicks would cause the wrong sound's nav_on_end to fire — e.g.
    // clicking F47 would pick up F44's nav_on_end because F44 was already
    // set to 2 from an earlier visit.

    let flagsApplied = false;
    const justSetFlags = new Set();
    for (const h of activeHotspots) {
      if (h.action.type !== 'EVENTFLAGS_MULTI_HS') continue;
      const hx1 = Math.min(h.x1, h.x2), hx2 = Math.max(h.x1, h.x2);
      const hy1 = Math.min(h.y1, h.y2), hy2 = Math.max(h.y1, h.y2);
      if (x >= hx1 && x <= hx2 && y >= hy1 && y <= hy2) {
        if (h.action.flags_set) h.action.flags_set.forEach(f => {
          state.flags[f.flag] = f.value;
          justSetFlags.add(f.flag);
        });
        flagsApplied = true;
      }
    }

    // Play sounds conditioned on the flags we JUST set (not stale flags).
    // Capture the first nav_on_end as the data-driven navigation target.
    let efmhsNavOnEnd = null;
    if (flagsApplied) {
      const scene = scenes[state.currentSceneId];
      if (scene) {
        for (const a of scene.actions) {
          if ((a.type === 'PLAY_DIGI_SOUND' || a.type === 'PLAY_DIGI_SOUND_2') && condPass(a)) {
            const condOnJustSet = a.conditions?.some(c =>
              c.type === 'flag_check' && justSetFlags.has(c.flag_id));
            if (condOnJustSet) {
              playSound(a.sound_file);
              if (a.nav_on_end && !efmhsNavOnEnd) {
                efmhsNavOnEnd = `S${a.nav_on_end}`;
              }
            }
          }
        }
      }
    }

    // Find the primary (non-flag) hotspot at this point
    const hit = hitTestPrimary(x, y);

    if (!hit) {
      // Deselect active item when clicking empty canvas (no hotspot, no flags)
      if (!flagsApplied && state.activeItem !== null) {
        state.activeItem = null;
        updateCanvasCursor();
        await updateInventoryBar();
        return;
      }
      if (flagsApplied) {
        // ── EFMHS navigation fallback tiers ───────────────────────────────
        //
        // When an EFMHS click has no overlapping primary hotspot, we need to
        // determine where to navigate.  The tiers are checked in order:
        //
        //  1. EVENTFLAGS_NAV lookup table — manually verified overrides for
        //     scenes where nav_on_end is wrong (e.g. S1652 says 1651 but the
        //     real game goes to S1654) or where no nav_on_end exists (e.g.
        //     tapestry toggle S606↔S626, panoramic window clicks).
        //     For scenes with multiple EFMHS, keys include the flag signature:
        //     "SceneId:F{id}={val}+..." (sorted).  Plain "SceneId" is the
        //     fallback for single-EFMHS scenes.
        //
        //  2. nav_on_end from PLAY_DIGI_SOUND — the primary data-driven
        //     mechanism.  109 sounds in nd1_scenes.json carry nav_on_end,
        //     covering most book openings, drawer interactions, etc.
        //     Captured above from sounds conditioned on justSetFlags only.
        //
        //  3. SCENE_CHANGE re-evaluation — if the scene has a SCENE_CHANGE
        //     action (auto-nav), reload so it can re-evaluate with the new
        //     flags.  Covers S5 difficulty selection, boiler room phases.
        //
        //  4. Close/dismiss — scene has ONLY EFMHS hotspots and no nav
        //     hotspots → it's a detail/closeup view.  Pop history (back).
        //
        //  5. Scene+1 heuristic — if scene+1 exists, has EFMHS, has no nav
        //     hotspots (leaf view), and current scene doesn't already link
        //     to it → navigate there.  Covers ~25 orphan book/drawer scenes.
        //
        //  6. Default — reload to re-evaluate flag-dependent conditions.

        const EVENTFLAGS_NAV = {
          // — Tapestry toggle —
          'S606':              'S626',
          'S626':              'S606',
          // — Locker operations —
          'S1426:F44=2':       'S1425', // close upper locker door
          'S1427:F44=2':       'S1425', // close lower locker door
          'S1427:F44=1+F45=2': 'S1430', // open newspaper
          'S1428':             'S1429', // read Judo Today article
          // — Aunt's house open↔close pairs —
          'S622':              'S623',  // table/books → open book/plants
          'S627':              'S628',  // end table drawer closed → open
          'S628':              'S627',  // end table drawer open → closed
          'S629':              'S630',  // envelope → sorority invitation
          // — Diner —
          'S834':              'S835',  // receipt on counter → receipt CU
          'S837':              'S838',  // envelope on counter → boiler letter
          // — School —
          'S1416':             'S1417', // library doors closed → open
          // — Teacher's lounge —
          'S1601':             'S1651', // window → ext window (swexter1)
          'S1605:F44=2':       'S1606', // file closeup → file xtra closeup
          'S1605:F45=2':       'S1604', // file closeup → close cabinet drawer
          'S1609':             'S1612', // desktop notepad → note pad CU (sl1s)
          'S1651':             'S1652', // ext window: with grate → without
          'S1652':             'S1654', // ext window: cut glass → window open
          // — Library —
          'S1846':             'S1920', // library doors → door open scene
          'S1847':             'S1848', // info desk paper → flyer CU
          'S1851':             'S1852', // sports magazine → steroids article
          'S1854:F44=2':       'S1855', // map drawer CU → top drawer open
          'S1854:F45=2':       'S1857', // map drawer CU → bottom drawer open
          'S1855':             'S1856', // top drawer open → read/close
          'S1857':             'S1858', // bottom drawer open → read/close
          'S1859':             'S1860', // card catalog closed → open
          'S1860':             'S1859', // card catalog open → closed
          // — Boiler room —
          'S2087':             'S2088', // vent grate on → off
          // S2092: nav_on_end 2059 is correct (vent shaft → outside), no override needed
        };

        // Tier 1 — Explicit lookup table (overrides for incorrect nav_on_end)
        let navTarget = null;
        for (const h of activeHotspots) {
          if (h.action.type !== 'EVENTFLAGS_MULTI_HS') continue;
          const hx1 = Math.min(h.x1, h.x2), hx2 = Math.max(h.x1, h.x2);
          const hy1 = Math.min(h.y1, h.y2), hy2 = Math.max(h.y1, h.y2);
          if (x >= hx1 && x <= hx2 && y >= hy1 && y <= hy2) {
            const fk = h.action.flags_set
              ? h.action.flags_set.map(f => `F${f.flag}=${f.value}`).sort().join('+')
              : '';
            const target = EVENTFLAGS_NAV[`${state.currentSceneId}:${fk}`]
              || EVENTFLAGS_NAV[state.currentSceneId];
            if (target && scenes[target]) { navTarget = target; break; }
          }
        }

        if (navTarget) {
          await loadScene(navTarget, 0, true);

        // Tier 2 — nav_on_end from the EFMHS-triggered sound
        } else if (efmhsNavOnEnd && scenes[efmhsNavOnEnd]) {
          await loadScene(efmhsNavOnEnd, 0, true);

        } else {
          const scene = scenes[state.currentSceneId];
          const hasSceneChange = scene?.actions?.some(a => a.type === 'SCENE_CHANGE');

          // Tier 3 — SCENE_CHANGE re-evaluation
          if (hasSceneChange) {
            await loadScene(state.currentSceneId, state.currentVariant, false);

          } else {
            const NAV_TYPES = ['HOT_1FR_SCENE_CHANGE', 'HOT_1FR_EXITSCENE',
              'HOT_MULTIFRAME_SCENE_CHANGE'];
            const hasNavHotspots = activeHotspots.some(h =>
              NAV_TYPES.includes(h.action.type)
            );

            if (!hasNavHotspots) {
              // Tier 4 — Close/dismiss: scene has only EFMHS hotspots → go back
              back();

            } else {
              // Tier 5 — Auto-detect open/detail pattern: if scene+1 has EFMHS,
              // has no nav hotspots (leaf detail view), and current scene doesn't
              // already navigate to it, then EFMHS "opens" to scene+1.
              const num = parseInt(state.currentSceneId.slice(1));
              const nextSid = `S${num + 1}`;
              const nextScene = scenes[nextSid];
              let autoNav = false;
              if (nextScene) {
                const nextHasEFMHS = nextScene.actions?.some(
                  a => a.type === 'EVENTFLAGS_MULTI_HS');
                const nextHasNav = nextScene.actions?.some(
                  a => NAV_TYPES.includes(a.type));
                const alreadyNavsToNext = scene?.actions?.some(
                  a => a.target_scene === num + 1 && NAV_TYPES.includes(a.type));
                if (nextHasEFMHS && !nextHasNav && !alreadyNavsToNext) {
                  autoNav = true;
                }
              }
              if (autoNav) {
                await loadScene(nextSid, 0, true);
              } else {
                // Tier 6 — Default: reload to re-evaluate flag-dependent conditions
                await loadScene(state.currentSceneId, state.currentVariant, false);
              }
            }
          }
        }
      }
      return;
    }

    const act = hit.action;
    switch (act.type) {
      case 'HOT_1FR_SCENE_CHANGE':
      case 'HOT_1FR_EXITSCENE':
      case 'HOT_MULTIFRAME_SCENE_CHANGE':
        if (act.sound_file) playSound(act.sound_file);
        await loadScene(`S${act.target_scene}`, act.scene_param ?? 0);
        break;

      case 'MAP_CALL_HOT_1FR':
      case 'MAP_CALL_HOT_MULTIFRAME':
      case 'MAP_BACK':
        showMapDialog();
        break;

      case 'PLAY_SECONDARY_VIDEO':
        // Clicking an NPC navigates to their conversation scene
        if (act.target_scene) {
          await loadScene(`S${act.target_scene}`, 0);
        }
        break;

      case 'SHOW_INVENTORY_ITEM':
        // Picking up an item from the scene
        if (act.item_id !== undefined) {
          state.inventory.add(act.item_id);
          state.activeItem = null;
          // In the original engine, picking up an item changes a scene/item
          // state array entry from 1→2.  A SCENE_CHANGE conditioned on that
          // state==2 (decoded as scene_variant==2) then fires automatically.
          // Simulate by reloading with variant 2 when such a SCENE_CHANGE exists.
          const scene = scenes[state.currentSceneId];
          const hasPostPickupNav = scene?.actions?.some(a =>
            a.type === 'SCENE_CHANGE' && a.conditions?.some(c =>
              c.type === 'scene_variant' && c.value === 2));
          await loadScene(state.currentSceneId,
            hasPostPickupNav ? 2 : state.currentVariant, false);
        }
        break;
    }
  }

  function onCanvasMousemove(e) {
    if (menuActive) { const p = canvasXY(e); handleMenuMousemove(p.x, p.y); return; }
    if (movieActive) { canvas.style.cursor = gc('wait'); return; }
    if (convOL.classList.contains('active')) { canvas.style.cursor = gc('arrow'); return; }
    const { x, y } = canvasXY(e);

    // Puzzle mode cursor
    if (activePuzzle) {
      for (const r of getPuzzleClickRects()) {
        if (inRect(x, y, r)) { canvas.style.cursor = gc('hand_pointer'); return; }
      }
      canvas.style.cursor = activePuzzle.type === 'PASSWORD_PUZZLE' ? 'text' : gc('arrow');
      return;
    }

    const dir = scrollDir(x);
    if (dir !== 0) {
      canvas.style.cursor = gc('magnify');
      startAutoPan(dir);
    } else {
      if (autoPanInterval) stopAutoPan();
      const hit = hitTest(x, y);
      if (hit) {
        if (state.activeItem !== null) {
          // Inventory item selected — show item cursor, green if valid target
          const ic = itemCursors[state.activeItem];
          if (ic) {
            const valid = hit.action.conditions?.some(
              c => c.type === 'inventory_check' && c.item_id === state.activeItem);
            canvas.style.cursor = valid ? ic.green : ic.normal;
          } else {
            canvas.style.cursor = gc('hand_pointer');
          }
        } else {
          const atype = hit.action.type;
          if (atype === 'HOT_1FR_EXITSCENE'
              || atype === 'MAP_CALL_HOT_1FR' || atype === 'MAP_CALL_HOT_MULTIFRAME'
              || atype === 'MAP_BACK') {
            canvas.style.cursor = gc('walk');
          } else {
            canvas.style.cursor = gc('hand_pointer');
          }
        }
      } else if (state.activeItem !== null) {
        const ic = itemCursors[state.activeItem];
        canvas.style.cursor = ic ? ic.normal : gc('arrow');
      } else {
        canvas.style.cursor = gc('arrow');
      }

      // Fidget hover: switch to hover animation when over NPC hotspot
      if (fidgetInterval) {
        const overNPC = !!(hit && hit.action.type === 'PLAY_SECONDARY_VIDEO');
        if (overNPC && !fidgetHovering) {
          // Mouse entered NPC — start hover animation forward
          fidgetHovering = true;
          fidgetUnhovering = false;
          fidgetFrameIndex = fidgetHoverStart - 1;
        } else if (!overNPC && fidgetHovering) {
          // Mouse left NPC — play hover animation in reverse
          fidgetHovering = false;
          fidgetUnhovering = true;
          // fidgetFrameIndex stays where it is; interval will decrement
        }
      }
    }
  }

  // ── Public API ───────────────────────────────────────────────────────────
  function toggleDebug() {
    state.debugHotspots = !state.debugHotspots;
    togglePanel();
    loadScene(state.currentSceneId, state.currentVariant, false);
  }

  function toggleAnimation() {
    state.animationEnabled = !state.animationEnabled;
    const btn = document.getElementById('anim-toggle-btn');
    if (btn) {
      btn.textContent = state.animationEnabled ? 'Anim: ON' : 'Anim: OFF';
      btn.classList.toggle('dp-active', state.animationEnabled);
    }
    if (state.animationEnabled) {
      startFidgetIfNeeded();
    } else {
      stopFidget();
      // Reload to restore static NPC frame
      if (state.currentSceneId) {
        loadScene(state.currentSceneId, state.currentVariant, false);
      }
    }
  }

  function toggleVoices() {
    state.voicesEnabled = !state.voicesEnabled;
    const btn = document.getElementById('voice-toggle-btn');
    if (btn) {
      btn.textContent = state.voicesEnabled ? 'Voice: ON' : 'Voice: OFF';
      btn.classList.toggle('dp-active', state.voicesEnabled);
    }
    if (!state.voicesEnabled) stopConvVoice();
  }

  function toggleAutoPan() {
    state.autoPanEnabled = !state.autoPanEnabled;
    const btn = document.getElementById('autopan-toggle-btn');
    if (btn) {
      btn.textContent = state.autoPanEnabled ? 'AutoPan: ON' : 'AutoPan: OFF';
      btn.classList.toggle('dp-active', state.autoPanEnabled);
    }
    if (!state.autoPanEnabled) stopAutoPan();
  }

  function goToScene(rawId) {
    let id = rawId.trim().toUpperCase();
    if (!id.startsWith('S')) id = 'S' + id;
    if (scenes[id]) {
      if (menuActive) { menuActive = false; invBar.style.visibility = ''; }
      loadScene(id, 0);
    } else alert(`Scene not found: ${id}`);
  }

  function back() {
    const prev = state.history.pop();
    if (prev) loadScene(prev.id, prev.variant, false);
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  async function init({ scenesUrl, framesDir, audioDir, spritesDir, startScene, initialFlags = {} }) {
    FRAMES_DIR  = framesDir;
    AUDIO_DIR   = audioDir;
    SPRITES_DIR = spritesDir;
    START_SCENE_ID = startScene;
    INITIAL_FLAGS = initialFlags;
    Object.assign(state.flags, initialFlags);

    // In the original binary, all flags checked with expected==1 in question
    // conditions are initialized to 1 at startup (no scene data sets them to 1).
    // Response scenes set them to 2 to mark questions as asked / clues as found.
    for (const qs of Object.values(INVESTIGATION_QUESTIONS)) {
      for (const q of qs) {
        for (const c of q.conditions || []) {
          if (c.expected === 1 && !(c.flag_id in state.flags)) {
            state.flags[c.flag_id] = 1;
          }
        }
      }
    }

    // F62 (boiler crisis) uses a 0=safe, 1=crisis, 2=solved pattern.  evalCond
    // defaults unset flags to 1 via ?? 1, which would make the crisis active
    canvas.addEventListener('click', onCanvasClick);
    canvas.addEventListener('contextmenu', e => {
      e.preventDefault();
      if (state.activeItem !== null) {
        state.activeItem = null;
        updateCanvasCursor();
        updateInventoryBar();
      }
    });
    canvas.addEventListener('mousemove', onCanvasMousemove);
    canvas.addEventListener('mouseleave', () => stopAutoPan());

    // Allow Enter key on scene input
    document.getElementById('scene-input')
            .addEventListener('keydown', e => { if (e.key === 'Enter') goToScene(e.target.value); });

    sceneInfo.textContent = 'Loading scene data…';
    scenes = await fetch(scenesUrl).then(r => r.json());

    // Build conversation node index and scene map
    for (const [sceneId, scene] of Object.entries(scenes)) {
      for (const act of scene.actions) {
        if (act.type === 'CONVERSATION_VIDEO' && act.node_id) {
          const key = act.node_id.toUpperCase();
          convIndex[key]    = act;
          nodeSceneMap[key] = sceneId;
        }
      }
    }

    console.log(`ND engine: ${Object.keys(scenes).length} scenes, ${Object.keys(convIndex).length} conversation nodes`);

    // Precache hub area backgrounds in the background
    precacheHubBackgrounds();

    // Load original game cursors from sprite sheets
    await initCursors();

    // Show main menu on startup
    await showMenu();
  }

  function showContinueDialog(startScene) {
    const ol = document.getElementById('continue-overlay');
    document.getElementById('continue-btn').onclick = () => {
      ol.classList.remove('active');
      loadSavedGame();
    };
    document.getElementById('newgame-btn').onclick = () => {
      ol.classList.remove('active');
      localStorage.removeItem(SAVE_KEY);
      loadScene(startScene, 0, false);
    };
    ol.classList.add('active');
  }

  // ── Debug panel ──────────────────────────────────────────────────────────
  const debugPanel = document.getElementById('debug-panel');

  // toggle: 'on/off' = click toggles 0↔2, 'cycle' = click cycles 0→1→2→0
  const FLAG_CATEGORIES = [
    { label: 'Story Progress', toggle: 'cycle', flags: [
      [5, 'Chapter/tape', '0=unset, 1=early game (default), 2=watched blackmail tape — unlocks confrontation questions'],
      [40, 'Final interrogation', '0=unset, 2=Daryl revealed Mitch (S3216) — unlocks "help find the killer" questions'],
      [62, 'Boiler crisis', '0=safe, 1=crisis active (chains/bomb, set with flag 40), 2=lever puzzle solved'],
      [94, 'Investigation progress', '0=unset, 1=partial evidence (Connie denies), 2=full evidence (Connie admits) — gates synthesis questions'],
      [101, 'Kitchen state', '0=inaccessible (bug), 1=safe (bolt cutter in place, default), 2=sabotaged (ladle placed)'],
    ]},
    { label: 'NPCs Met', toggle: 'on/off', flags: [
      [38, 'Daryl'], [19, 'Connie'], [29, 'Hulk'], [11, 'Hal'],
    ]},
    { label: 'Clues Found', toggle: 'on/off', flags: [
      [0, 'Locker combo'], [1, 'Locker opened'], [2, 'Medallion'],
      [3, 'Judo poster'], [4, 'Judo interest'], [6, 'Essay plagiarism'],
      [8, 'Hal pressure'], [9, 'Hulk drug depot'], [12, 'English book'],
      [13, 'Connie-Jake dating'], [18, 'Hulk injury'], [20, 'Judo competition'],
      [23, 'Crane symbol'], [27, 'Hal studies hard'], [30, 'Pharmacy break-in'],
      [31, 'Connie money'], [32, 'Hal locker'], [36, 'Drug depot topic'],
      [39, 'Blackmail'], [99, 'Pharmacy robbery'], [100, 'Video camera'],
    ]},
    { label: 'Scene Toggles', toggle: 'on/off', flags: [
      [44, 'Close item'], [45, 'Open alternate'],
    ]},
    { label: 'Daryl Questions Asked', toggle: 'on/off', flags: [
      [57, 'About Hulk'], [55, 'About Connie'], [56, 'About Hal'],
      [107, 'Locker combo'], [108, 'Video camera'], [109, 'All suspects'],
      [110, 'Hulk suspect'], [111, 'Hulk+Connie'], [112, 'Hal+Hulk'],
      [113, 'Connie lied'], [114, 'Connie+Hal'], [115, 'Hal motive'],
      [116, 'All hated Jake'], [117, 'Help case'], [118, 'English book'],
      [119, 'Judo'], [120, 'Pharmacy'],
    ]},
    { label: 'Connie Questions Asked', toggle: 'on/off', flags: [
      [24, 'About Hulk'], [25, 'Money troubles'], [26, 'About Hal'],
      [28, 'About Daryl'], [121, 'Locker combo'], [23, 'Crane symbol'],
      [22, 'Video camera'], [20, 'Judo winner'], [94, 'Help case'],
    ]},
    { label: 'Hulk Questions Asked', toggle: 'on/off', flags: [
      [58, 'About Connie'], [37, 'About Hal'], [33, 'Injury'],
      [34, 'About Daryl'], [102, 'Locker combo'], [103, 'Video camera'],
      [36, 'Drug depot'], [30, 'Blackmail'],
    ]},
    { label: 'Hal Questions Asked', toggle: 'on/off', flags: [
      [17, 'About Hulk'], [14, 'About Connie'], [15, 'Studies'],
      [16, 'About Daryl'], [104, 'Locker combo'], [105, 'Locker combo 2'],
      [106, 'Video camera'], [8, 'Essay copied'], [12, 'Help case'],
    ]},
  ];

  function togglePanel() {
    debugPanel.classList.toggle('active');
    if (debugPanel.classList.contains('active')) refreshDebugPanel();
  }

  function refreshDebugPanel() {
    if (!debugPanel.classList.contains('active')) return;
    // Flags grid
    const flagsGrid = document.getElementById('dp-flags-grid');
    if (flagsGrid) {
      flagsGrid.innerHTML = '';
      for (const cat of FLAG_CATEGORIES) {
        const label = document.createElement('div');
        label.className = 'dp-cat';
        label.textContent = cat.label;
        flagsGrid.appendChild(label);
        const row = document.createElement('div');
        row.className = 'dp-grid';
        for (const f of cat.flags) {
          const [id, name, desc] = f;
          const val = state.flags[id] ?? 0;
          const btn = document.createElement('button');
          const on = cat.toggle === 'on/off' ? val >= 2 : val > 0;
          btn.className = 'dp-flag-btn' + (on ? ' dp-f2' : val ? ' dp-f1' : '');
          btn.textContent = name + (cat.toggle === 'cycle' ? ` [${val}]` : '');
          btn.title = desc ? `Flag ${id} = ${val}\n${desc}` : `Flag ${id} = ${val}`;
          btn.onclick = () => {
            const cur = state.flags[id] ?? 0;
            let next;
            if (cat.toggle === 'on/off') {
              next = cur >= 2 ? 0 : 2;
            } else {
              next = cur >= 2 ? 0 : cur + 1;
            }
            if (next === 0) delete state.flags[id];
            else state.flags[id] = next;
            refreshDebugPanel();
          };
          row.appendChild(btn);
        }
        flagsGrid.appendChild(row);
      }
    }
    // Inventory grid
    const invGrid = document.getElementById('dp-inv-grid');
    if (invGrid) {
      invGrid.innerHTML = '';
      for (const [id, name] of Object.entries(ITEM_NAMES)) {
        const btn = document.createElement('button');
        btn.className = 'dp-btn' + (state.inventory.has(+id) ? ' dp-active' : '');
        btn.textContent = `${id}: ${name}`;
        btn.onclick = () => { debugToggleItem(+id); };
        invGrid.appendChild(btn);
      }
    }
    // Export button template indicator
    const expBtn = document.getElementById('dp-export-sav');
    if (expBtn) expBtn.textContent = savTemplate ? 'Export .SAV \u2714' : 'Export .SAV';
  }

  function debugToggleItem(id) {
    if (state.inventory.has(id)) {
      state.inventory.delete(id);
      if (state.activeItem === id) state.activeItem = null;
    } else {
      state.inventory.add(id);
    }
    updateInventoryBar();
    refreshDebugPanel();
  }

  function debugRestart() {
    state.flags = {};
    state.inventory = new Set();
    state.activeItem = null;
    state.history = [];
    Object.assign(state.flags, INITIAL_FLAGS);
    for (const qs of Object.values(INVESTIGATION_QUESTIONS)) {
      for (const q of qs) {
        for (const c of q.conditions || []) {
          if (c.expected === 1 && !(c.flag_id in state.flags)) {
            state.flags[c.flag_id] = 1;
          }
        }
      }
    }
    updateInventoryBar();
    loadScene(START_SCENE_ID, 0, false);
  }

  function debugAskAllQuestions() {
    for (const qs of Object.values(INVESTIGATION_QUESTIONS)) {
      for (const q of qs) {
        for (const c of q.conditions) {
          if (c.expected === 1) state.flags[c.flag_id] = 2;
        }
      }
    }
    refreshDebugPanel();
  }

  function debugAddAllItems() {
    for (const id of Object.keys(ITEM_NAMES)) {
      state.inventory.add(+id);
    }
    updateInventoryBar();
    refreshDebugPanel();
  }

  function debugBoilerEmergency() {
    // Set all prerequisites for the boiler emergency sequence:
    // NPCs met
    state.flags[38] = 2; // Daryl met
    state.flags[19] = 2; // Connie met
    state.flags[29] = 2; // Hulk met
    state.flags[11] = 2; // Hal met
    // Clues needed for DIC14 (blackmail confrontation with Daryl)
    state.flags[5]  = 2; // Watched blackmail tape
    state.flags[39] = 2; // Blackmail evidence found (set to 2 = already asked DIC14)
    // Simulate having completed the DIC14 conversation chain → S3216
    state.flags[40] = 2; // Daryl revealed Mitch (set by S3216 tail_entry)
    state.flags[62] = 1; // Boiler crisis active (set by engine hardcode on S3216)
    state.flags[10] = 2; // Sabotaged elevator (routes to crisis boiler room)
    // Inventory items needed to solve the crisis
    state.inventory.add(0); // Bolt cutters (to cut chains)
    state.inventory.add(8); // Work gloves (to open padlock)
    updateInventoryBar();
    refreshDebugPanel();
    // Navigate to the boiler room door
    loadScene('S1457', 0);
  }

  function debugEssayBug() {
    // Reproduce bug: visit diner at night → see "Back in 10 Minutes" sign → talk to Hal → click essay question
    // NPCs met
    state.flags[38] = 2; // Daryl met
    state.flags[19] = 2; // Connie met
    state.flags[29] = 2; // Hulk met
    state.flags[11] = 2; // Hal met
    // Watched blackmail tape → enables night diner + confrontation questions
    state.flags[5]  = 2;
    // Clues needed for hic8 (essay confrontation with Hal)
    state.flags[6]  = 2; // Essay plagiarism clue
    state.flags[8]  = 2; // Hal pressure clue
    // flag 12 stays at default 1 (hasn't confronted Hal about essay yet)
    // flag 39 stays at default 1 (hasn't confronted Daryl about blackmail yet)
    // flag 20 stays at default 1 (nighttime — diner closed)
    updateInventoryBar();
    refreshDebugPanel();
    // Navigate to diner at night (step 1 of reproduction)
    loadScene('S888', 0);
  }

  function debugEndgame() {
    // Set all prerequisites for endgame night mode:
    // NPCs met
    state.flags[38] = 2; state.flags[19] = 2; state.flags[29] = 2; state.flags[11] = 2;
    // Blackmail tape watched
    state.flags[5] = 2;
    // Daryl agreed to help catch Mitch at pharmacy (S3216 tail_entry)
    state.flags[40] = 2;
    // Connie chickened out (S245 EVENTFLAGS)
    state.flags[95] = 2;
    // Boiler crisis resolved
    state.flags[62] = 2;
    updateInventoryBar();
    refreshDebugPanel();
    // Open the map — only Aunt Eloise's and Pharmacy (→S1250) should appear
    showMapDialog();
  }

  return { init, loadScene, hideConv, continueConv, showMapDialog, hideMapDialog, toggleDebug, toggleAnimation, toggleVoices, toggleAutoPan, goToScene, back, loadSecondChance,
           showMenu, togglePanel, debugToggleItem, debugRestart, debugAskAllQuestions, debugAddAllItems, debugBoilerEmergency,
           debugTimerSkip, debugTimerAdd, debugEndgame, debugEssayBug, promptLoadSavFile, promptLoadSavTemplate, exportSavFile, hasSavTemplate };

})();
