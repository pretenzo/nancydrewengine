'use strict';

const STFD = (() => {

  // ── Constants ────────────────────────────────────────────────────────────
  const GAME_W = 535, GAME_H = 291;

  // Cursor sprite rects in object0.png (same layout as ND1)
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

  const SPEAKERS = {
    mat: 'Mattie Jensen', ric: 'Rick Arlen', lil: 'Lillian Weiss',
    dwa: 'Dwayne Powers', prp: 'Millie Strathorn', ral: 'Ralph',
    bes: 'Bess Marvin', geo: 'George Fayne', ned: 'Ned Nickerson',
    nar: 'Narrator', nan: 'Nancy Drew',
  };

  // ── Investigation questions ────────────────────────────────────────────
  // Questions Nancy can ask NPCs during hub conversations.
  // Each entry has: text, scene (response scene), conditions [{flag_id, expected}].
  // A question is available when ALL conditions pass.
  // Pattern: {flag_id: X, expected: 2} = prerequisite (must have met NPC / found clue)
  //          {flag_id: Y, expected: 1} = availability (1=not asked yet, set to 2 by response scene)
  // Conditions decoded from STFD.Game.exe.c question injection functions.
  // conditionsOr: at least ONE must pass (OR group). conditions: ALL must pass (AND).
  const INVESTIGATION_QUESTIONS = {
    dwa: [ // FUN_0047d8a0
      {text: "Have you met the prop master at Worldwide? She seems...rather strange.",
        scene: 816, conditions: [{flag_id: 50, expected: 2}, {flag_id: 118, expected: 1}]},
      {text: "I'm afraid that I'm not making a very good impression on Lillian.",
        scene: 817, conditions: [{flag_id: 49, expected: 2}, {flag_id: 119, expected: 1}]},
      {text: "Do you know how I could get into the control room at the studio?",
        scene: 820, conditions: [{flag_id: 55, expected: 2}, {flag_id: 120, expected: 1}, {flag_id: 76, expected: 1}]},
      {text: "Can I get a pass that lets me get into the studio during the night?",
        scene: 821, conditions: [{flag_id: 67, expected: 2}, {flag_id: 121, expected: 1}, {flag_id: 80, expected: 1}]},
      {text: "I'm afraid I've upset Lillian - did she call about terminating my employment?",
        scene: 823, conditions: [{flag_id: 123, expected: 2}, {flag_id: 122, expected: 1}]},
      {text: "Do you have many employees working for you at Worldwide?",
        scene: 824, conditions: [{flag_id: 124, expected: 1}],
        conditionsOr: [{flag_id: 68, expected: 2}, {flag_id: 64, expected: 2}]},
      {text: "What do you make of these threats against Rick?",
        scene: 826, conditions: [{flag_id: 126, expected: 1}],
        conditionsOr: [{flag_id: 56, expected: 2}, {flag_id: 58, expected: 2}]},
      {text: "The producer seems pretty upset lately - he's always yelling.",
        scene: 829, conditions: [{flag_id: 39, expected: 2}, {flag_id: 127, expected: 1}]},
    ],
    ric: [ // FUN_0047e090
      {text: "Tell me Rick, do you know a guy by the name of Owen Spayder?",
        scene: 729, conditions: [{flag_id: 115, expected: 1}],
        conditionsOr: [{flag_id: 68, expected: 2}, {flag_id: 64, expected: 2}]},
      {text: "What's the story with the prop master?",
        scene: 728, conditions: [{flag_id: 50, expected: 2}, {flag_id: 114, expected: 1}]},
      {text: "Can I ask your advice? Dwayne Powers is my agent - he's pretty good isn't he?",
        scene: 717, conditions: [{flag_id: 48, expected: 2}, {flag_id: 112, expected: 1}]},
      {text: "So tell me Rick, who haven't you dated on 'Light Of Our Love'?",
        scene: 721, conditions: [{flag_id: 151, expected: 2}, {flag_id: 113, expected: 1}]},
    ],
    prp: [ // FUN_0047e480
      {text: "It must be wonderful to work with Rick Arlen. Is he really that exciting in real life?",
        scene: 317, conditions: [{flag_id: 52, expected: 2}, {flag_id: 133, expected: 1}]},
      {text: "Do you know where I can find Owen Spayder? He's a stage hand, I believe.",
        scene: 321, conditions: [{flag_id: 64, expected: 2}, {flag_id: 134, expected: 1}]},
    ],
    lil: [ // FUN_0047e680
      {text: "I found a light clamp on the set that looked sawed off. That was no accident.",
        scene: 503, conditions: [{flag_id: 65, expected: 2}, {flag_id: 129, expected: 1}]},
      {text: "Can I ask your advice? Rick's really been flirty with me.",
        scene: 504, conditions: [{flag_id: 151, expected: 2}, {flag_id: 130, expected: 1}]},
      {text: "Can you tell me something about Owen Spayder?",
        scene: 510, conditions: [{flag_id: 131, expected: 1}],
        conditionsOr: [{flag_id: 68, expected: 2}, {flag_id: 64, expected: 2}]},
      {text: "Lillian, I have reason to believe you're the one threatening Rick.",
        scene: 512, conditions: [{flag_id: 132, expected: 2}, {flag_id: 53, expected: 2}, {flag_id: 131, expected: 2}, {flag_id: 123, expected: 1}]},
    ],
    ned: [ // FUN_0047ea90
      {text: "I finally met Rick Arlen. That man has an ego the size of Texas!",
        scene: 3007, conditions: [{flag_id: 52, expected: 2}, {flag_id: 101, expected: 1}, {flag_id: 73, expected: 1}]},
      {text: "Ned, are you very good at riddles?",
        scene: 3010, conditions: [{flag_id: 41, expected: 2}, {flag_id: 79, expected: 1}, {flag_id: 102, expected: 1}]},
      {text: "What do you think I should look for on that death threat tape?",
        scene: 3013, conditions: [{flag_id: 103, expected: 1}], requireItem: 15},
      {text: "There's a locked area of the prop room. I wonder what she's hiding.",
        scene: 3014, conditions: [{flag_id: 105, expected: 2}, {flag_id: 45, expected: 1}, {flag_id: 92, expected: 1}]},
      {text: "I got into the locked area and found an employee ID for Owen Spayder.",
        scene: 3015, conditions: [{flag_id: 68, expected: 2}, {flag_id: 64, expected: 2}, {flag_id: 59, expected: 1}, {flag_id: 106, expected: 1}]},
      {text: "I got a look at the letters Rick has been getting. The 'Y' is dropped on some.",
        scene: 3016, conditions: [{flag_id: 56, expected: 2}, {flag_id: 57, expected: 1}, {flag_id: 107, expected: 1}, {flag_id: 58, expected: 2}]},
      {text: "The prop master has a typewriter and the Y's are dropped!",
        scene: 3017, conditions: [{flag_id: 57, expected: 2}, {flag_id: 107, expected: 2}, {flag_id: 108, expected: 1}]},
      {text: "I'd like to get into the studio at night, but it's locked.",
        scene: 3019, conditions: [{flag_id: 67, expected: 2}, {flag_id: 80, expected: 1}, {flag_id: 109, expected: 1}]},
      {text: "I found a side entrance to the studio, but there's a keypad lock on it.",
        scene: 3020, conditions: [{flag_id: 67, expected: 2}, {flag_id: 80, expected: 1}, {flag_id: 110, expected: 1}]},
    ],
    bes: [ // FUN_0047f3e0
      {text: "I need to get into Lillian's office at night.",
        scene: 3123, conditions: [{flag_id: 80, expected: 2}, {flag_id: 44, expected: 1}, {flag_id: 155, expected: 1}]},
      {text: "Now I need to find an access code to the system computers.",
        scene: 3124, conditions: [{flag_id: 85, expected: 2}, {flag_id: 62, expected: 1}, {flag_id: 156, expected: 1}]},
      {text: "If only I could find the password into the control room.",
        scene: 3125, conditions: [{flag_id: 86, expected: 2}, {flag_id: 76, expected: 1}, {flag_id: 157, expected: 1}]},
      {text: "I can't get the employee log to print.",
        scene: 3127, conditions: [{flag_id: 87, expected: 2}, {flag_id: 59, expected: 1}, {flag_id: 159, expected: 1}]},
      {text: "You'll never guess what I found in Lillian's office. A bottle of castor oil.",
        scene: 3128, conditions: [{flag_id: 132, expected: 2}, {flag_id: 53, expected: 1}, {flag_id: 160, expected: 1}]},
      {text: "Lillian must've been the one who sent Rick those threats. I found castor oil and a chocolate shop number.",
        scene: 3129, conditions: [{flag_id: 132, expected: 2}, {flag_id: 35, expected: 2}, {flag_id: 161, expected: 1}]},
      {text: "Lillian just kicked me off the set!",
        scene: 3130, conditions: [{flag_id: 123, expected: 2}, {flag_id: 162, expected: 1}]},
      {text: "I found the sound mixer but am not sure what I am looking for.",
        scene: 3131, conditions: [{flag_id: 88, expected: 2}, {flag_id: 163, expected: 1}]},
      {text: "If only I could find a surveillance video.",
        scene: 3133, conditions: [{flag_id: 61, expected: 2}, {flag_id: 166, expected: 1}], requireNoItem: 12},
      {text: "I found an employee badge for an Owen Spayder in the lost and found.",
        scene: 3136, conditions: [{flag_id: 64, expected: 2}, {flag_id: 168, expected: 1}]},
      {text: "I found Millie's computer login.",
        scene: 3137, conditions: [{flag_id: 85, expected: 1}, {flag_id: 62, expected: 2}, {flag_id: 169, expected: 1}]},
      {text: "I really need to get into Dwayne's office. Should I sneak in?",
        scene: 3138, conditions: [{flag_id: 64, expected: 2}, {flag_id: 68, expected: 1}, {flag_id: 170, expected: 1}]},
      {text: "I can't get into Dwayne's office.",
        scene: 3139, conditions: [{flag_id: 42, expected: 2}, {flag_id: 43, expected: 1}, {flag_id: 155, expected: 1}]},
      {text: "I can't get into Dwayne's briefcase.",
        scene: 3140, conditions: [{flag_id: 83, expected: 2}, {flag_id: 74, expected: 1}, {flag_id: 171, expected: 1}]},
      {text: "Dwayne's agency is not doing so well. I found outstanding bills and checks from Mattie.",
        scene: 3141, conditions: [{flag_id: 72, expected: 2}, {flag_id: 172, expected: 1}]},
      {text: "I found out that Owen Spayder worked at the same theater where Dwayne and Mattie met.",
        scene: 3142, conditions: [{flag_id: 168, expected: 2}, {flag_id: 68, expected: 2}, {flag_id: 173, expected: 1}]},
      {text: "Oh Bess, this is awful. I just got a phony bomb threat in the mail!",
        scene: 3144, conditions: [{flag_id: 36, expected: 2}, {flag_id: 174, expected: 1}]},
      {text: "Lillian just called me. She wants me to meet her at the studio. Should I go?",
        scene: 3145, conditions: [{flag_id: 31, expected: 2}, {flag_id: 175, expected: 1}]},
    ],
    geo: [ // FUN_004805e0
      {text: "Mattie got me a visitor's pass, but I don't see it anywhere.",
        scene: 3207, conditions: [{flag_id: 104, expected: 2}, {flag_id: 177, expected: 1}, {flag_id: 61, expected: 1}], requireNoItem: 10},
      {text: "I wonder how I can get into the sound stage.",
        scene: 3209, conditions: [{flag_id: 61, expected: 1}, {flag_id: 179, expected: 1}], requireItem: 10},
      {text: "Rick was almost killed by a falling klieg light!",
        scene: 3210, conditions: [{flag_id: 61, expected: 2}, {flag_id: 180, expected: 1}]},
      {text: "I'm officially an extra on the set, but there's not much to do.",
        scene: 3213, conditions: [{flag_id: 181, expected: 1}], requireItem: 4},
      {text: "Are you any good at riddles?",
        scene: 3214, conditions: [{flag_id: 41, expected: 2}, {flag_id: 154, expected: 1}, {flag_id: 79, expected: 1}]},
      {text: "I found a pair of wire cutters!",
        scene: 3215, conditions: [{flag_id: 182, expected: 1}, {flag_id: 73, expected: 1}], requireItem: 14},
    ],
    mat: [ // FUN_00480f10
      {text: "Did Lillian and Rick date after you both broke up?",
        scene: 215, conditions: [{flag_id: 151, expected: 2}, {flag_id: 137, expected: 1}]},
      {text: "Tell me, do you know someone by the name of Owen Spayder?",
        scene: 230, conditions: [{flag_id: 64, expected: 2}, {flag_id: 138, expected: 1}]},
    ],
    // Ralph conditions from FUN_00480c00 in Game.exe:
    // DAT_004fd3a7 = inventory[10] (visitor's pass), DAT_004fd38f = inventory[4] (employee pass)
    // DAT_004fd4f0 = flag[61], DAT_004fd5d0 = flag[117]
    ral: [
      // Q1: inv[10]==1 && inv[4]==1 && flag[61]==1 → no pass yet, pre-klieg-light
      {text: "Yes, Mattie Jensen left a visitor's pass for me. It should be listed under Nancy Drew.",
        scene: 401, conditions: [{flag_id: 61, expected: 1}], requireNoItem: 10, requireNoItem2: 4,
        chain: [404, 405], voice: 'ng01'},
      // Q2: inv[4]==1 && flag[117]==2 → no employee pass yet, Dwayne hired Nancy
      {text: "Hi, I've been hired as an extra by the Powers Agency.",
        scene: 403, conditions: [{flag_id: 117, expected: 2}], requireNoItem: 4,
        chain: [406, 407], voice: 'ng02'},
      // Q3: inv[10]==2 || inv[4]==2 → have any pass (daily sign-in)
      {text: "Hello...here is my pass.",
        scene: 409, conditions: [], requireAnyItem: [10, 4], voice: 'ng04'},
    ],
  };

  // Farewell data: NPC prefix → {text, scenes[]}
  const FAREWELL_DATA = {
    dwa: {text: "Well, I should get back to the set. Thanks for your help.", scenes: [890, 891, 892, 893]},
    ric: {text: "Listen, I gotta go, Rick. Be careful, OK?", scenes: [791, 792, 793, 794]},
    prp: {text: "I should get back to the set. Goodbye!", scenes: [391, 392, 394]},
    lil: {text: "Well, I'll let you get back to your business.", scenes: [590, 591, 593]},
    mat: {text: "Well, I'll see you later, Mattie.", scenes: [290, 291, 292, 293]},
    ned: {text: "Talk to you later, Ned!", scenes: [3090, 3092, 3093]},
    bes: {text: "I'll talk to you later. Bye!", scenes: [3190]},
    geo: {text: "Talk to you later.", scenes: [3290]},
  };

  // NPC prefix → met-flag ID (set to 2 on first conversation)
  // In-person NPCs only; phone NPCs don't suppress questions on first call.
  const NPC_MET_FLAG = { mat: 104, lil: 49, ric: 52, dwa: 48, prp: 50 };

  // Hub scenes: scene IDs where repeatable NPC conversations live
  const INVESTIGATION_HUB_SCENES = {
    S200: 'mat',   // Mattie dressing room
    S500: 'lil',   // Lillian office
    S700: 'ric',   // Rick dressing room
    S839: 'dwa',   // Dwayne phone
    S301: 'prp',   // Millie prop room
    S3000: 'ned',  // Ned phone
    S3100: 'bes',  // Bess phone
    S3200: 'geo',  // George phone
    S400:  'ral',  // Ralph gate guard
  };

  // After a first-meeting conversation ends, navigate to this browsable scene
  // instead of popping history (which might land on transition/movie scenes).
  const POST_CONV_SCENE = {
    S100: 'S2500',  // Mattie apartment conversation → Mattie's Den (day)
    S200: 'S2100',  // Mattie dressing room conversation → dressing room node
    S700: 'S2000',  // Rick dressing room conversation → Rick's groove pad
    S301: 'S1200',  // Millie prop room conversation → prop room node
    S400: 'S1000',  // Ralph conversation → back to studio lobby
    S401: 'S1006',  // Ralph gives visitor's pass → lobby desk (proceed to hallway)
    S403: 'S1006',  // Ralph gives employee pass → lobby desk
    S409: 'S1006',  // Ralph daily sign-in → lobby desk
  };

  // Item names — mapped from inventory array indices (DAT_004fd37f base)
  // Sprite sheet: tool.png (normal + highlighted), toolcur1.png (cursor icons, green chroma key)
  const ITEM_NAMES = {
    0:  'Door Knob',            // Box of door-knobs (S1201)
    1:  'Screwdriver',          // Work bench (S1610)
    2:  'House Keys',           // From Mattie (S110)
    3:  'File Cabinet Keys',    // Dwayne's office (S2212)
    4:  'Employee Pass',        // From Ralph (S403)
    5:  'Floppy Disk',          // Behind Rick/Lillian photo (S1453)
    6:  'Pencil',               // Lillian's file tray (S1353)
    7:  'Oil Can',              // Prop room (S1300)
    8:  'Clock Hand',           // Old clock (S1206)
    9:  'Remote Control',       // VCR area (S2541)
    10: "Visitor's Pass",       // From Ralph (S401)
    11: 'Trap Door Key',        // Grandfather clock (S1729)
    12: 'Security Videotape',   // Dwayne's tape shelf (S1625)
    13: 'Interview Videotape',  // VCR room tapes (S2500+)
    14: 'Wire Cutters',         // Prop room (S1277)
    15: 'Cassette Tape',        // Answering machine (S2020)
    16: 'Desk Drawer Key',      // Mattie's desk drawer (S2539)
    17: '3D Glasses',           // Rick's vanity drawer (S2130)
  };
  for (let i = 0; i < 30; i++) if (!ITEM_NAMES[i]) ITEM_NAMES[i] = `Item ${i}`;

  const FLAG_NAMES = {
    31: 'Lillian called to meet',
    34: 'death variant',
    36: 'bomb package message',
    38: 'prop log corner',
    39: 'hallway west A',
    40: 'hallway west B',
    41: 'riddle puzzle',
    42: 'agency exterior night',
    43: 'Dwayne office node',
    44: 'Lillian office visited',
    45: 'lost & found / set table',
    46: 'day/night',
    47: 'Mattie warned',
    48: 'met Dwayne',
    49: 'met Lillian',
    50: 'met Millie',
    52: 'met Rick',
    53: 'pad of paper rubbed',
    54: 'passwords key',
    55: 'control room keypad',
    56: 'death threats found',
    57: 'typewriter match',
    58: 'other threat papers',
    59: 'employee log printed',
    60: 'clock puzzle attempt',
    61: 'klieg light',
    62: 'prop log book entry',
    63: 'Pappas memo',
    64: 'Owen ID badge',
    65: 'sawed C-clamp',
    66: "Rick's report",
    67: 'outside keypad found',
    68: 'Owen resume',
    69: 'trap door box opened',
    70: 'Rick interview outside',
    72: 'check in Dwayne office',
    73: 'wire cutters',
    74: 'briefcase opened',
    75: 'clock puzzle solved',
    76: 'control room secondary',
    78: 'animated gears viewed',
    79: 'Millie encounter / riddle',
    80: 'night access discovered',
    81: 'George conv progress',
    82: 'power box on',
    85: 'Lillian computer login',
    87: 'employee ID entered',
    88: 'sound EQ solved',
    90: 'TDC lever solved',
    91: 'Lillian office center',
    92: 'asked Ned: prop room',
    93: 'Millie 2nd greeting',
    98: 'Bess conv progress',
    99: 'met Ned (phone)',
    100: 'Ned/Dwayne crossover',
    101: 'asked Ned: Rick',
    102: 'asked Ned: riddles',
    103: 'asked Ned: threat tape',
    104: 'met Mattie',
    105: 'cage/cubby in prop room',
    106: 'asked Ned: Owen',
    107: "asked Ned: dropped Y's",
    108: 'asked Ned: typewriter',
    109: 'asked Ned: night access',
    110: 'asked Ned: keypad lock',
    111: 'Rick hero greeting',
    112: 'asked Rick: Dwayne',
    113: 'asked Rick: dating',
    114: 'asked Rick: Millie',
    115: 'asked Rick: Owen',
    117: 'Dwayne hired Nancy',
    118: 'asked Dwayne: Millie',
    119: 'asked Dwayne: Lillian',
    120: 'asked Dwayne: control room',
    121: 'asked Dwayne: night pass',
    122: 'asked Dwayne: Lil fired Nancy',
    123: 'Lillian kicked Nancy off set',
    124: 'asked Dwayne: employees',
    126: 'asked Dwayne: Rick threats',
    127: 'asked Dwayne: producer',
    128: 'Lillian bomb greeting',
    129: 'asked Lillian: sawed clamp',
    130: 'asked Lillian: Rick flirting',
    131: 'asked Lillian: Owen',
    132: 'found castor oil',
    133: 'asked Millie: Rick',
    134: 'asked Millie: Owen',
    135: 'Mattie glad you made it',
    136: "Mattie you're OK",
    137: 'asked Mattie: Lil/Rick dating',
    138: 'asked Mattie: Owen',
    141: 'Pappas: looking into that',
    142: 'Pappas: only Rick',
    143: 'Pappas: key talent',
    144: 'Pappas: script writer',
    145: 'Pappas: auditions dept',
    146: 'Pappas: usual people',
    147: 'Bess: no way Rick',
    148: 'Bess: told Dwayne',
    149: "Bess: Millie's cats",
    150: 'Bess: weird if Mattie',
    151: 'Bess: Lil/Rick breakup',
    152: 'Bess: Pappas done',
    155: "Bess: Lillian/Dwayne office",
    156: 'Bess: access code',
    157: 'Bess: control room pw',
    159: 'Bess: employee log',
    160: 'Bess: castor oil',
    161: 'Bess: castor oil + choc',
    162: 'Bess: Lil kicked Nancy',
    163: 'Bess: sound mixer',
    164: 'Dwayne phone: da bomb',
    165: 'Bess asked flag',
    166: 'Bess: surveillance video',
    167: 'Bess asked flag 2',
    168: 'Bess: Owen badge',
    169: "Bess: Millie's login",
    170: "Bess: sneak Dwayne office",
    171: "Bess: Dwayne briefcase",
    172: 'Bess: Dwayne bills/checks',
    173: 'Bess: Owen/Dwayne/Mattie',
    174: 'Bess: bomb threat mail',
    175: 'Bess: Lillian meeting',
    176: 'Bess asked flag 3',
    177: "George: visitor's pass",
    178: 'George conv progress',
    179: 'George: sound stage',
    180: 'George: klieg light',
    181: 'George: being an extra',
    182: 'George: wire cutters',
    196: 'bomb puzzle stage 1',
    197: 'bomb puzzle stage 2',
    198: 'tape recorder slot 1',
    199: 'tape recorder slot 2',
    200: 'tape recorder slot 3',
    201: 'tape recorder slot 4',
    213: 'Lillian ack Nancy job',
    215: 'Mattie suggested Dwayne',
    218: 'met George (phone)',
    219: 'met Bess (phone)',
    220: 'agency unlocked',
    222: 'computer area visited',
    223: 'surveillance video watched',
    224: 'fire alarm night',
    225: 'briefcase right lock',
    226: 'briefcase left lock',
    227: 'Dwayne R-Intercom',
    228: 'bomb package night',
  };

  // ── State ──────────────────────────────────────────────────────────────
  let state = {
    flags: {},
    inventory: new Set(),
    activeItem: null,
    currentSceneId: null,
    currentVariant: 0,
    debugHotspots: false,
    history: [],
    timerActive: false,
    timerStartTime: 0,
    voicesEnabled: true,
    dayTime: 0, // 0=day, 1=night (STFD-specific, drives cond_0x0c)
    difficulty: 1,
  };
  let convAudio = null;
  let timerCheckInterval = null;
  let secondChanceSave = null;

  let scenes = {};
  let activeHotspots = [];
  let bgNativeHeight = GAME_H;
  let movieActive = false;
  let sceneSounds = [];

  // Panoramic scroll state
  let panoFrameCount = 0; // 0 or 1 = not panoramic
  let autoPanInterval = null;
  let autoPanDir = 0;
  const SCROLL_ZONE = 28;
  const bgFrameCountCache = {}; // bg_avf → frame count

  // Fidget animation state
  let fidgetInterval = null;
  let fidgetFrames = [];
  let fidgetFrameIndex = 0;
  let fidgetDrawRect = null;
  let fidgetBgSnapshot = null;
  let fidgetIdleEnd = 0;
  let fidgetHoverStart = 0;
  let fidgetHovering = false;
  let fidgetUnhovering = false;

  // Asset config
  let FRAMES_DIR, AUDIO_DIR, SPRITES_DIR;
  let START_SCENE_ID = 'S0';
  let INITIAL_FLAGS = {};

  // DOM refs
  const canvas    = document.getElementById('game-canvas');
  const ctx       = canvas.getContext('2d');
  const convOL    = document.getElementById('conv-overlay');
  const convSpkr  = document.getElementById('conv-speaker');
  const convTxt   = document.getElementById('conv-text');
  const convChs   = document.getElementById('conv-choices');
  const convCont  = document.getElementById('conv-continue');
  const invBar    = document.getElementById('inv-bar');
  const sceneInfo = document.getElementById('scene-info');
  const debugInfo = document.getElementById('debug-info');

  // Audio
  let ambientAudio = null;
  const imgCache = {};
  const chromaKeyCache = {};
  const gameCursors = {};
  const SLOT_SIZE = 54;

  // ── Markup helpers ─────────────────────────────────────────────────────
  function stripMarkup(t) {
    if (!t) return '';
    return t.replace(/<i>/g,'').replace(/<\/i>/g,'')
            .replace(/<n>/g,'\n').replace(/<o>/g,'')
            .replace(/<c\d>/g,'').replace(/<h>/g,'')
            .replace(/<t>/g,'').replace(/<e>/g,'')
            .trim();
  }

  function markupToHtml(t) {
    if (!t) return '';
    return t.replace(/<c1>(.)<c0>/g, '<span class="hl">$1</span>')
            .replace(/<h>/g,'').replace(/<n>/g,' ').replace(/<[^>]+>/g,'')
            .trim();
  }

  // ── Asset loading ──────────────────────────────────────────────────────
  function loadImg(src) {
    if (imgCache[src]) return Promise.resolve(imgCache[src]);
    return new Promise((res, rej) => {
      const img = new Image();
      img.onload  = () => { imgCache[src] = img; res(img); };
      img.onerror = () => rej(new Error(src));
      img.src = src;
    });
  }

  async function tryLoadImg(dir, name, ext) {
    try { return await loadImg(`${dir}/${name.toLowerCase()}${ext.toLowerCase()}`); } catch (_) {}
    return null;
  }

  // ── Audio ──────────────────────────────────────────────────────────────
  function playSound(name, volume) {
    if (!name || name.trim() === 'NO SOUND') return null;
    const a = new Audio(`${AUDIO_DIR}/${name.trim().toLowerCase()}.wav`);
    a.volume = volume !== undefined ? volume : 0.65;
    a.play().catch(() => {});
    return a;
  }

  function waitForSound(audio) {
    if (!audio) return Promise.resolve();
    return new Promise(resolve => {
      audio.addEventListener('ended', resolve, { once: true });
      audio.addEventListener('error', resolve, { once: true });
    });
  }

  function playConvVoice(name) {
    stopConvVoice();
    if (!state.voicesEnabled) return null;
    convAudio = playSound(name);
    return convAudio;
  }

  function stopConvVoice() {
    if (convAudio) { convAudio.pause(); convAudio = null; }
  }

  let ambientKey = null;

  function setAmbient(name) {
    if (!name || name.trim() === 'NO SOUND' || name.trim() === '') {
      stopAmbient(); return;
    }
    const key = name.trim().toLowerCase();
    if (key === ambientKey) return;
    stopAmbient();
    ambientKey = key;
    const a = new Audio(`${AUDIO_DIR}/${key}.wav`);
    a.loop = true; a.volume = 0.35;
    a.play().then(() => {
      if (ambientKey !== key) { a.pause(); return; }
      ambientAudio = a;
    }).catch(() => {});
  }

  function stopAmbient() {
    ambientKey = null;
    if (ambientAudio) { ambientAudio.pause(); ambientAudio = null; }
  }

  // ── Cursor system ──────────────────────────────────────────────────────
  function removeChromaKey(img) {
    const oc = document.createElement('canvas');
    oc.width = img.width; oc.height = img.height;
    const octx = oc.getContext('2d');
    octx.drawImage(img, 0, 0);
    const id = octx.getImageData(0, 0, oc.width, oc.height);
    const d = id.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i+1], b = d[i+2];
      if (g > 100 && g > r * 1.4 && g > b * 1.4) d[i+3] = 0;
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

  function extractCursor(sheet, sx, sy, w, h, hotX, hotY) {
    const clip = document.createElement('canvas');
    clip.width = w; clip.height = h;
    clip.getContext('2d').drawImage(sheet, sx, sy, w, h, 0, 0, w, h);
    const cleaned = removeChromaKey(clip);
    return `url("${cleaned.toDataURL('image/png')}") ${hotX} ${hotY}, auto`;
  }

  function gc(name) { return gameCursors[name] || 'default'; }

  let currentCursorName = '';
  function setCursor(name) {
    if (name === currentCursorName) return;
    currentCursorName = name;
    canvas.style.cursor = gc(name);
  }

  async function initCursors() {
    const obj0 = await tryLoadImg(SPRITES_DIR, 'object0', '.png');
    if (!obj0) { console.warn('object0.png not found — using default cursors'); return; }
    for (const [name, d] of Object.entries(CURSOR_DEFS)) {
      gameCursors[name] = extractCursor(obj0, d.sx, d.sy, d.w, d.h, d.hotX, d.hotY);
    }
    console.log(`Cursors: ${Object.keys(gameCursors).length} base`);
  }

  // ── Condition evaluation ───────────────────────────────────────────────
  function evalCond(c) {
    switch (c.type) {
      case 'flag_check':
        return (state.flags[c.flag_id] ?? 1) === c.flag_value;
      case 'scene_variant':
        if (c.value === 2) return state.inventory.has(c.item_id);
        if (c.value === 1) return !state.inventory.has(c.item_id);
        return state.currentVariant === c.value;
      case 'inventory_check':
        return state.inventory.has(c.item_id);
      case 'timed_flag':
        if (!state.timerActive) return false;
        return ((Date.now() - state.timerStartTime) / 1000) >= c.seconds;
      case 'timer_condition':
        return (state.difficulty ?? 1) === c.flag_value;
      case 'cond_0x0c': {
        // Day/night condition: raw hex string, byte at index 1 is 0=day, 1=night
        if (!c.raw) return true;
        const byte1 = parseInt(c.raw.substring(2, 4), 16);
        return state.dayTime === byte1;
      }
      case 'cond_0x05':
        // Unknown condition — appears to track scene-visit state or intro
        // sequences. Default to false to prevent unwanted auto-navigation.
        return false;
      case 'cond_0x10':
        // Unknown condition type — default false for safety
        return false;
      default:
        return true;
    }
  }

  function condPass(act) {
    const conds = act.conditions;
    if (!conds || conds.length === 0) return true;

    // Evaluate each condition individually
    const results = conds.map(c => {
      if (act.type === 'SHOW_INVENTORY_ITEM' && c.type === 'scene_variant') return true;
      if (c.type === 'scene_variant' && c.value !== 1 && c.value !== 2) {
        // For non-inventory variant values, bypass if a flag_check has the same
        // expected value (the flag is the real discriminator). Values 1/2 are
        // inventory checks (has/doesn't have item) — evalCond handles those.
        const hasMatchingFlag = conds.some(o =>
          o.type === 'flag_check' && o.flag_value === c.value);
        if (hasMatchingFlag) return true;
      }
      return evalCond(c);
    });

    // Apply OR grouping: c.or=true means this condition is OR'd with the next.
    // Propagate passes within OR groups (matching Game.exe FUN_00458284 logic).
    for (let i = 0; i < conds.length; i++) {
      if (conds[i].or && results[i] && i + 1 < conds.length) {
        results[i + 1] = true;  // forward propagation
      }
      if (i > 0 && conds[i - 1].or) {
        // Previous condition had OR flag — propagate between the pair
        if (results[i] && !results[i - 1]) results[i - 1] = true;
        if (!results[i] && results[i - 1]) results[i] = true;
      }
    }

    return results.every(r => r);
  }

  function isEventFlagSound(scene, soundAct) {
    if (!soundAct.conditions || soundAct.conditions.length === 0) return false;
    return scene.actions.some(a =>
      a.type === 'EVENTFLAGS_MULTI_HS' && a.flags_set &&
      soundAct.conditions.some(c =>
        c.type === 'flag_check' && a.flags_set.some(f => f.flag === c.flag_id && f.value === c.flag_value)
      )
    );
  }

  // ── Timer system ───────────────────────────────────────────────────────
  function getTimerDeadline() {
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
    const sorted = [...thresholds].sort((a, b) => b - a);
    const diffIdx = state.difficulty ?? 1;
    return sorted[Math.min(diffIdx, sorted.length - 1)];
  }

  function updateTimerDisplay() {
    const el = document.getElementById('dp-timer');
    if (!el) return;
    if (!state.timerActive) { el.textContent = 'Timer: inactive'; return; }
    const elapsed = Math.floor((Date.now() - state.timerStartTime) / 1000);
    const deadline = getTimerDeadline();
    const remaining = Math.max(0, deadline - elapsed);
    const min = Math.floor(remaining / 60);
    const sec = remaining % 60;
    el.textContent = `Timer: ${min}:${String(sec).padStart(2, '0')} remaining`;
    el.style.color = remaining <= 30 ? '#f44' : '#f84';
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
      for (const act of scene.actions) {
        if (act.type !== 'SCENE_CHANGE') continue;
        if (!act.conditions || !act.conditions.some(c => c.type === 'timed_flag' && c.seconds === deadline)) continue;
        stopTimer();
        loadScene(`S${act.target_scene}`, act.scene_param ?? 0, false);
        return;
      }
    }, 2000);
  }

  // ── Movie playback (PLAY_SECONDARY_MOVIE) ──────────────────────────────
  function getMovieRect(act) {
    const dr = act.dest_rect;
    if (dr) return { x: dr.x1, y: dr.y1, w: dr.x2 - dr.x1 + 1, h: dr.y2 - dr.y1 + 1 };
    return { x: 0, y: 0, w: GAME_W, h: GAME_H };
  }

  function drawLoadingBar(current, total) {
    const barW = 200, barH = 10;
    const x = (GAME_W - barW) / 2, y = GAME_H - 30;
    ctx.fillStyle = '#111';
    ctx.fillRect(x, y, barW, barH);
    ctx.fillStyle = '#b8903a';
    ctx.fillRect(x, y, barW * (current / total), barH);
  }

  async function playMovie(act, sceneActions) {
    const asset = act.asset_name;
    const endFrame = act.end_frame ?? 0;
    if (endFrame <= 0) return;

    const frames = [];
    for (let i = 0; i <= endFrame; i++) {
      const img = await tryLoadImg(FRAMES_DIR, asset, `_${String(i).padStart(3, '0')}.png`);
      if (img) frames.push({ index: i, img });
      else break;
      if (endFrame > 5) drawLoadingBar(i + 1, endFrame + 1);
    }
    if (frames.length === 0) return;

    const timedMap = new Map();
    if (act.timed_flags) {
      for (const t of act.timed_flags) {
        if (!timedMap.has(t.frame)) timedMap.set(t.frame, []);
        timedMap.get(t.frame).push({ flag: t.flag, value: t.value });
      }
    }

    const rect = getMovieRect(act);
    if (act.sound_file) playSound(act.sound_file);

    movieActive = true;
    const playedSounds = new Set();

    await new Promise(resolve => {
      let fi = 0;
      const interval = setInterval(() => {
        if (fi >= frames.length) { clearInterval(interval); resolve(); return; }
        const { index, img } = frames[fi];
        if (rect.w === GAME_W && rect.h === GAME_H) {
          ctx.drawImage(img, 0, 0, GAME_W, GAME_H);
        } else {
          ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h);
        }
        const triggers = timedMap.get(index);
        if (triggers) {
          for (const t of triggers) state.flags[t.flag] = t.value;
          if (sceneActions) {
            for (const a of sceneActions) {
              if ((a.type === 'PLAY_DIGI_SOUND')
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

    if (act.completion_flags) {
      for (const f of act.completion_flags) state.flags[f.flag] = f.value;
    }

    movieActive = false;
    return playedSounds;
  }

  // ── Rendering ──────────────────────────────────────────────────────────
  async function renderBackground(avfName, variant = 0) {
    if (!avfName) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, GAME_W, GAME_H);
      return;
    }

    const vStr = String(variant).padStart(3, '0');
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
    for (const act of actions) {
      if (act.type !== 'SHOW_INVENTORY_ITEM') continue;
      if (!condPass(act)) continue;
      if (act.item_id !== undefined && state.inventory.has(act.item_id)) continue;
      if (!act.sprite_sheet || !act.src_rect || !act.dst_rect) continue;

      const img = await tryLoadImg(SPRITES_DIR, act.sprite_sheet, '.png');
      if (!img) continue;

      const s = act.src_rect, d = act.dst_rect;
      ctx.drawImage(img,
        s.x1, s.y1, s.x2 - s.x1, s.y2 - s.y1,
        d.x1, d.y1, d.x2 - d.x1, d.y2 - d.y1
      );
    }
  }

  async function renderNPCs(actions, variant) {
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

        let bgSnapshot = null;
        const snapX = Math.max(0, Math.floor(drawX));
        const snapY = Math.max(0, Math.floor(drawY));
        const snapW = Math.min(Math.ceil(cleaned.width + (drawX - snapX)), GAME_W - snapX);
        const snapH = Math.min(Math.ceil(drawH + (drawY - snapY)), GAME_H - snapY);
        if (snapW > 0 && snapH > 0) {
          bgSnapshot = { data: ctx.getImageData(snapX, snapY, snapW, snapH),
                         x: snapX, y: snapY, w: snapW, h: snapH };
        }

        ctx.drawImage(cleaned, drawX, drawY, cleaned.width, drawH);

        startFidget(act.asset_name, fr, yS, bgSnapshot,
          act.idle_end_frame, act.hover_start_frame, act.end_frame);
      }
    }
  }

  // ── Fidget animation ───────────────────────────────────────────────────
  async function startFidget(assetName, frameData, yS, bgSnapshot, idleEnd, hoverStart, endFrame) {
    stopFidget();
    if (!bgSnapshot) return;

    const frames = [];
    const maxFrame = endFrame ?? 999;
    for (let i = 0; i <= maxFrame; i++) {
      const ext = `_${String(i).padStart(3, '0')}.png`;
      const img = await tryLoadImg(FRAMES_DIR, assetName, ext);
      if (!img) break;
      frames.push(getChromaKeyFrame(img, `${assetName}${ext}`));
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
      if (!fidgetBgSnapshot) { stopFidget(); return; }
      ctx.putImageData(fidgetBgSnapshot.data, fidgetBgSnapshot.x, fidgetBgSnapshot.y);

      if (fidgetUnhovering) {
        fidgetFrameIndex--;
        if (fidgetFrameIndex < fidgetHoverStart) {
          fidgetUnhovering = false;
          fidgetFrameIndex = 0;
        }
      } else if (fidgetHovering) {
        fidgetFrameIndex++;
        if (fidgetFrameIndex > fidgetFrames.length - 1) {
          fidgetFrameIndex = fidgetFrames.length - 1;
        }
      } else {
        fidgetFrameIndex++;
        if (fidgetFrameIndex > fidgetIdleEnd) fidgetFrameIndex = 0;
      }

      ctx.drawImage(fidgetFrames[fidgetFrameIndex],
        fidgetDrawRect.x, fidgetDrawRect.y, fidgetDrawRect.w, fidgetDrawRect.h);
    }, 60);
  }

  function stopFidget() {
    if (fidgetInterval) { clearInterval(fidgetInterval); fidgetInterval = null; }
    fidgetFrames = [];
    fidgetFrameIndex = 0;
    fidgetDrawRect = null;
    fidgetBgSnapshot = null;
    fidgetHovering = false;
    fidgetUnhovering = false;
  }

  // ── CAL Character Animation System ────────────────────────────────────
  // Composited 2-layer (body + head) NPC conversation animations.
  // CAL files are CIF TREE archives containing pre-rendered RGB555 frames.
  // XSHEET files script which body/head frame to display per animation tick.

  const calCache = {};          // calName → {buffer, entries} (persists across conversations)
  const calFrameCanvasCache = {}; // frameName → offscreen canvas (with transparency)
  let calBodyCAL = null;
  let calHeadCAL = null;
  let calXSheet = null;
  let calFrameIndex = 0;
  let calInterval = null;
  let calBgSnapshot = null;
  let calBgRect = null;
  let calActive = false;
  let calAudio = null;          // reference to the NPC audio for this animation

  // ── LZSS decompressor (matches stfd-extract.py) ──
  function lzssDecompress(data, expectedSize) {
    const WINDOW = 0x1000;
    const buf = new Uint8Array(WINDOW);
    buf.fill(0x20);
    let pos = 0xFEE;
    const out = [];
    let i = 0;
    while (i < data.length) {
      const flags = data[i++];
      for (let bit = 0; bit < 8; bit++) {
        if (i >= data.length) break;
        if (flags & (1 << bit)) {
          const b = data[i++];
          out.push(b);
          buf[pos] = b;
          pos = (pos + 1) & 0xFFF;
        } else {
          if (i + 1 >= data.length) break;
          const b1 = data[i++], b2 = data[i++];
          let ref = b1 | ((b2 & 0xF0) << 4);
          const length = (b2 & 0x0F) + 3;
          for (let j = 0; j < length; j++) {
            const byte = buf[ref & 0xFFF];
            out.push(byte);
            buf[pos] = byte;
            pos = (pos + 1) & 0xFFF;
            ref++;
          }
        }
        if (expectedSize && out.length >= expectedSize) {
          return new Uint8Array(out.slice(0, expectedSize));
        }
      }
    }
    return new Uint8Array(out);
  }

  // ── CIF TREE positional decrypt ──
  function cifDecrypt(data) {
    const out = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      out[i] = (data[i] - i) & 0xFF;
    }
    return out;
  }

  // ── CAL file loader ──
  async function loadCAL(calName) {
    const key = calName.toUpperCase();
    if (calCache[key]) return calCache[key];

    const resp = await fetch(`CD/Game/${calName}.cal`);
    if (!resp.ok) { console.warn(`CAL not found: ${calName}`); return null; }
    const buffer = await resp.arrayBuffer();
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);

    // Verify magic
    const magic = String.fromCharCode(...bytes.slice(0, 20)).replace(/\0/g, '');
    if (!magic.startsWith('CIF TREE')) {
      console.warn(`Bad CAL magic: ${calName}`); return null;
    }

    const entryCount = view.getUint16(0x1C, true);
    const entries = new Map();

    for (let i = 0; i < entryCount; i++) {
      const base = 0x820 + i * 70;
      if (base + 70 > buffer.byteLength) break;

      // Name: bytes [0:9], null-terminated
      let name = '';
      for (let j = 0; j < 9; j++) {
        const c = bytes[base + j];
        if (c === 0) break;
        name += String.fromCharCode(c);
      }
      if (!name) continue;

      const type = bytes[base + 0x43];
      if (type !== 0x02) continue; // Only PLAIN (image) entries

      const width  = view.getUint16(base + 0x2B, true);
      const height = view.getUint16(base + 0x2F, true);
      const destRect = {
        x: view.getUint32(base + 0x1B, true),
        y: view.getUint32(base + 0x1F, true),
        x2: view.getUint32(base + 0x23, true),
        y2: view.getUint32(base + 0x27, true),
      };
      const dataOffset = view.getUint32(base + 0x33, true);
      const decompSize = view.getUint32(base + 0x3B, true);
      const compSize   = view.getUint32(base + 0x3F, true);
      const compression = bytes[base + 0x32];

      if (dataOffset === 0 || compSize === 0 || dataOffset + compSize > buffer.byteLength) continue;

      entries.set(name.toUpperCase(), {
        width, height, destRect, dataOffset, compSize, decompSize, compression
      });
    }

    const cal = { buffer, entries };
    calCache[key] = cal;
    console.log(`CAL loaded: ${calName} (${entries.size} frames)`);
    return cal;
  }

  // ── Get a single frame from a CAL archive, with caching ──
  function getCALFrame(cal, frameName) {
    const key = frameName.toUpperCase();
    if (calFrameCanvasCache[key]) return calFrameCanvasCache[key];

    const entry = cal.entries.get(key);
    if (!entry) return null;

    // Read compressed data
    const raw = new Uint8Array(cal.buffer, entry.dataOffset, entry.compSize);
    const decrypted = cifDecrypt(raw);

    // Decompress
    let pixels;
    if (entry.compression === 2) {
      pixels = lzssDecompress(decrypted, entry.decompSize);
    } else {
      pixels = decrypted;
    }

    // RGB555 → RGBA on offscreen canvas
    const w = entry.width, h = entry.height;
    const oc = document.createElement('canvas');
    oc.width = w; oc.height = h;
    const octx = oc.getContext('2d');
    const imgData = octx.createImageData(w, h);
    const d = imgData.data;

    for (let i = 0, p = 0; i < w * h && p + 1 < pixels.length; i++, p += 2) {
      const word = pixels[p] | (pixels[p + 1] << 8);
      const r = ((word >> 10) & 0x1F) << 3;
      const g = ((word >>  5) & 0x1F) << 3;
      const b = ( word        & 0x1F) << 3;
      const idx = i * 4;
      d[idx]     = r;
      d[idx + 1] = g;
      d[idx + 2] = b;
      d[idx + 3] = 255; // CAL frames are pre-composited with scene background — opaque
    }

    octx.putImageData(imgData, 0, 0);

    const result = { canvas: oc, destRect: entry.destRect, width: w, height: h };
    calFrameCanvasCache[key] = result;
    return result;
  }

  // ── XSHEET parser ──
  async function loadXSheet(nodeId) {
    const resp = await fetch(`stfd_extracted/${nodeId.toLowerCase()}.bin`);
    if (!resp.ok) { console.warn(`XSHEET not found: ${nodeId}`); return null; }
    const buffer = await resp.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const view = new DataView(buffer);

    // Verify magic
    const magic = String.fromCharCode(...bytes.slice(0, 6));
    if (magic !== 'XSHEET') {
      console.warn(`Bad XSHEET magic: ${nodeId}`); return null;
    }

    const frameCount = view.getUint16(0x22, true);
    const frames = [];

    for (let i = 0; i < frameCount; i++) {
      const off = 0x2A + i * 0x30;
      if (off + 0x14 > buffer.byteLength) break;

      let body = '', head = '';
      for (let j = 0; j < 10; j++) {
        const c = bytes[off + j];
        if (c === 0) break;
        body += String.fromCharCode(c);
      }
      for (let j = 0; j < 10; j++) {
        const c = bytes[off + 0x0A + j];
        if (c === 0) break;
        head += String.fromCharCode(c);
      }
      frames.push({ body, head });
    }

    return frames;
  }

  // ── CAL animation renderer ──
  async function startCALAnimation(act) {
    stopCALAnimation();
    stopFidget();

    if (!act.body_cal || !act.head_cal || !act.node_id) return false;

    const [bodyCAL, headCAL, xsheet] = await Promise.all([
      loadCAL(act.body_cal),
      loadCAL(act.head_cal),
      loadXSheet(act.node_id),
    ]);

    if (!bodyCAL || !headCAL || !xsheet || xsheet.length === 0) return false;

    calBodyCAL = bodyCAL;
    calHeadCAL = headCAL;
    calXSheet = xsheet;
    calFrameIndex = 0;
    calActive = true;
    // Capture NPC audio (playConvVoice ran synchronously before this async resolved)
    calAudio = convAudio;

    // Compute bounding rect from ALL entry dest rects in both CALs
    // (different body poses have different widths, so we need the full union)
    let minX = GAME_W, minY = GAME_H, maxX = 0, maxY = 0;
    for (const cal of [bodyCAL, headCAL]) {
      for (const entry of cal.entries.values()) {
        minX = Math.min(minX, entry.destRect.x);
        minY = Math.min(minY, entry.destRect.y);
        maxX = Math.max(maxX, entry.destRect.x2);
        maxY = Math.max(maxY, entry.destRect.y2);
      }
    }
    if (minX >= maxX || minY >= maxY) return false;
    minX = Math.max(0, minX);
    minY = Math.max(0, minY);
    maxX = Math.min(GAME_W, maxX);
    maxY = Math.min(GAME_H, maxY);

    calBgRect = { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
    calBgSnapshot = ctx.getImageData(calBgRect.x, calBgRect.y, calBgRect.w, calBgRect.h);

    // Draw first frame immediately
    drawCALFrame(0);

    // Start animation loop
    calInterval = setInterval(() => {
      if (!calActive || !calXSheet) { stopCALAnimation(); return; }

      let targetFrame = calFrameIndex;
      if (calAudio && !calAudio.paused && calAudio.duration > 0) {
        // Sync to NPC audio position (not convAudio, which may be Nancy's voice)
        const tickRate = calXSheet.length / calAudio.duration;
        targetFrame = Math.min(calXSheet.length - 1, Math.floor(calAudio.currentTime * tickRate));
      }
      // Only redraw if frame changed
      if (targetFrame !== calFrameIndex) {
        calFrameIndex = targetFrame;
        drawCALFrame(calFrameIndex);
      }
    }, 50); // ~20fps check rate

    return true;
  }

  function drawCALFrame(idx) {
    if (!calXSheet || idx >= calXSheet.length) return;
    const frame = calXSheet[idx];

    // Restore background
    if (calBgSnapshot && calBgRect) {
      ctx.putImageData(calBgSnapshot, calBgRect.x, calBgRect.y);
    }

    // Draw body
    const bodyFrame = getCALFrame(calBodyCAL, frame.body);
    if (bodyFrame) {
      ctx.drawImage(bodyFrame.canvas, bodyFrame.destRect.x, bodyFrame.destRect.y);
    }

    // Draw head on top
    const headFrame = getCALFrame(calHeadCAL, frame.head);
    if (headFrame) {
      ctx.drawImage(headFrame.canvas, headFrame.destRect.x, headFrame.destRect.y);
    }
  }

  function stopCALAnimation() {
    if (calInterval) { clearInterval(calInterval); calInterval = null; }
    if (calBgSnapshot && calBgRect && calActive) {
      ctx.putImageData(calBgSnapshot, calBgRect.x, calBgRect.y);
    }
    calBodyCAL = null;
    calHeadCAL = null;
    calXSheet = null;
    calFrameIndex = 0;
    calBgSnapshot = null;
    calBgRect = null;
    calActive = false;
    calAudio = null;
  }

  // ── Panoramic scrolling ────────────────────────────────────────────────
  async function detectPanoFrameCount(bgAvf) {
    if (!bgAvf) return 1;
    const key = bgAvf.toLowerCase();
    if (bgFrameCountCache[key] !== undefined) return bgFrameCountCache[key];
    // Panoramic backgrounds end with 'x' (SE1X, SH2X, etc.)
    if (!key.endsWith('x')) { bgFrameCountCache[key] = 1; return 1; }
    // Quick check: if frame 1 doesn't exist, it's single-frame
    const f1 = await tryLoadImg(FRAMES_DIR, bgAvf, '_001.png');
    if (!f1) { bgFrameCountCache[key] = 1; return 1; }
    // Probe for frame count (most are 20, some 16 or 19)
    let count = 2;
    while (count < 30) {
      const ext = `_${String(count).padStart(3, '0')}.png`;
      if (!await tryLoadImg(FRAMES_DIR, bgAvf, ext)) break;
      count++;
    }
    bgFrameCountCache[key] = count;
    return count;
  }

  function drawScrollArrows() {
    if (panoFrameCount <= 1) return;
    ctx.save();
    ctx.font = 'bold 22px sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    const mid = GAME_H / 2;
    ctx.textAlign = 'left';
    ctx.fillText('\u25C0', 6, mid);
    ctx.textAlign = 'right';
    ctx.fillText('\u25B6', GAME_W - 6, mid);
    ctx.restore();
  }

  function stopAutoPan() {
    if (autoPanInterval) { clearInterval(autoPanInterval); autoPanInterval = null; }
    autoPanDir = 0;
  }

  function startAutoPan(dir) {
    if (autoPanDir === dir && autoPanInterval) return;
    stopAutoPan();
    autoPanDir = dir;
    autoPanInterval = setInterval(async () => {
      if (panoFrameCount <= 1) { stopAutoPan(); return; }
      const newVariant = (state.currentVariant + autoPanDir + panoFrameCount) % panoFrameCount;
      await loadScene(state.currentSceneId, newVariant, false);
    }, 250);
  }

  // ── Hotspot drawing ────────────────────────────────────────────────────
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

  // ── Conversation system ────────────────────────────────────────────────
  let pendingConvNav = null;
  let pendingConvNavStory = false; // true when pendingConvNav is a story branch continuation
  let pendingReturnHub = null;  // hub scene ID to return to after investigation question
  let convStack = [];           // stack of { act, visited: Set } for pop-back to parent choices
  let pendingFollowUps = [];    // sequential follow-up scenes after hub exhaustion
  let pendingConvChain = [];    // chain of scene IDs to play sequentially (Ralph signing flow)
  let pendingChainDest = null;  // destination scene after chain completes (e.g., S1006)

  function getSpeaker(nodeId) {
    if (!nodeId) return '';
    const id = nodeId.toLowerCase();
    const prefixes = [
      ['mat', 'Mattie Jensen'], ['ric', 'Rick Arlen'],
      ['lil', 'Lillian Weiss'], ['lv', 'Lillian Weiss'],
      ['dwa', 'Dwayne Powers'], ['dv', 'Dwayne Powers'], ['ds', 'Dwayne Powers'],
      ['prp', 'Millie Strathorn'], ['pap', 'Millie Strathorn'],
      ['ral', 'Ralph'], ['bes', 'Bess Marvin'], ['geo', 'George Fayne'],
      ['ned', 'Ned Nickerson'], ['nnp', 'Ned Nickerson'],
      ['int', 'Narrator'], ['nar', 'Narrator'],
      ['nma', 'Nancy Drew'], ['nls', 'Nancy Drew'],
      ['nlr', 'Nancy Drew'], ['nmd', 'Nancy Drew'],
      ['npr', 'Nancy Drew'], ['ng', 'Nancy Drew'],
      ['nds', 'Nancy Drew'], ['nc', 'Nancy Drew'],
    ];
    for (const [pfx, name] of prefixes) {
      if (id.startsWith(pfx)) return name;
    }
    return '';
  }

  // Return investigation questions whose flag conditions all pass
  function getAvailableQuestions(npcPrefix) {
    const questions = INVESTIGATION_QUESTIONS[npcPrefix];
    if (!questions) return [];
    return questions.filter(q => {
      // Check flag conditions (AND — all must pass)
      if (q.conditions && q.conditions.length > 0) {
        if (!q.conditions.every(c => (state.flags[c.flag_id] ?? 1) === c.expected)) return false;
      }
      // Check OR flag conditions (at least one must pass)
      if (q.conditionsOr && q.conditionsOr.length > 0) {
        if (!q.conditionsOr.some(c => (state.flags[c.flag_id] ?? 1) === c.expected)) return false;
      }
      // Check inventory requirements
      if (q.requireItem !== undefined && !state.inventory.has(q.requireItem)) return false;
      if (q.requireNoItem !== undefined && state.inventory.has(q.requireNoItem)) return false;
      if (q.requireNoItem2 !== undefined && state.inventory.has(q.requireNoItem2)) return false;
      if (q.requireAnyItem && !q.requireAnyItem.some(id => state.inventory.has(id))) return false;
      return true;
    });
  }

  // Evaluate a single conversation flag_entry check condition
  function evalConvCheck(c) {
    switch (c.type) {
      case 'check':           return (state.flags[c.flag] ?? 1) === c.value;
      case 'inventory_check': return state.inventory.has(c.item) === (c.value === 2);
      case 'difficulty_check': return (state.difficulty ?? 1) === c.value;
      case 'day_night_check': return state.dayTime === c.value;
      default:                return true;
    }
  }

  // Test whether all check-type flag_entries on a conversation action pass
  function convChecksPassed(act) {
    const checks = (act.flag_entries || []).filter(f => f.type !== 'set');
    return checks.length === 0 || checks.every(evalConvCheck);
  }

  // Fetch the first matching conversation action from a scene's data
  function getConvFromScene(sceneId) {
    const s = scenes[sceneId];
    if (!s) return null;
    const convTypes = ['CONVERSATION_CEL', 'CONVERSATION_SOUND', 'CONVERSATION_VIDEO_ALT'];
    for (const act of s.actions || []) {
      if (!convTypes.includes(act.type)) continue;
      if (convChecksPassed(act)) return act;
    }
    return null;
  }

  // Process side-effect actions (ADD_INVENTORY, etc.) from a scene without navigating
  function processSceneActions(sceneId) {
    const scene = scenes[sceneId];
    if (!scene) return;
    for (const a of (scene.actions || [])) {
      if (a.type === 'ADD_INVENTORY' && a.item_id !== undefined)
        state.inventory.add(a.item_id);
      else if (a.type === 'REMOVE_INVENTORY' && a.item_id !== undefined)
        state.inventory.delete(a.item_id);
    }
    updateInventoryBar();
  }

  function showConv(act, { skipGreeting = false, visited = new Set(), storyBranch = false } = {}) {
    // Apply set-type flag entries on display
    if (act.flag_entries) {
      for (const fe of act.flag_entries) {
        if (fe.type === 'set') state.flags[fe.flag] = fe.value;
      }
    }

    // Speaker name
    const speaker = getSpeaker(act.node_id || act.name);
    convSpkr.textContent = speaker || (act.type === 'CONVERSATION_CEL' ? 'NPC' : 'Phone');

    // CAL animation for face-to-face conversations
    if (act.type === 'CONVERSATION_CEL' && act.body_cal && act.head_cal) {
      stopCALAnimation();
      convOL.classList.add('below-canvas');
      // Move overlay outside game-wrap so it sits below the canvas
      const gameWrap = document.getElementById('game-wrap');
      if (convOL.parentNode === gameWrap) {
        gameWrap.after(convOL);
      }
      startCALAnimation(act);
    }

    // NPC text
    if (!skipGreeting) {
      convTxt.textContent = stripMarkup(act.npc_text || '');
      if (act.node_id) playConvVoice(act.node_id);
    }

    convChs.innerHTML = '';
    pendingConvNav = null;
    pendingConvNavStory = false;

    const entries = (act.npc_entries || []).filter(e => e.text && e.text.length > 2 && /[A-Za-z]{2}/.test(e.text));
    const allChoices = entries.filter(e => e.text.includes('<h>'));
    const unvisitedChoices = allChoices.filter((_, i) => !visited.has(i));

    // Determine if this is an investigation hub and whether to inject questions.
    const hubNpc = INVESTIGATION_HUB_SCENES[state.currentSceneId];
    const metFlagId = hubNpc ? NPC_MET_FLAG[hubNpc] : null;
    const setsMetFlag = metFlagId != null && (act.flag_entries || []).some(
      fe => fe.type === 'set' && fe.flag === metFlagId && fe.value === 2);
    // Detect one-time conversations: action sets a flag that its own check requires
    // at a different value, so it will never show again (e.g., checks flag 135==1, sets flag 135=2).
    const flagChecks = (act.flag_entries || []).filter(f => f.type === 'check');
    const sets   = (act.flag_entries || []).filter(f => f.type === 'set');
    const isOneTime = flagChecks.length > 0 && sets.some(s =>
      flagChecks.some(c => c.flag === s.flag && c.value !== s.value));
    // Hub triggers when: explicitly listed hub scene, not a first-meeting conversation,
    // AND either has no choices OR has choices that act as goodbye (Ralph's case).
    const isHub = !!hubNpc && !setsMetFlag && !isOneTime && !storyBranch;
    const questions = isHub ? getAvailableQuestions(hubNpc) : [];

    if (isHub && (questions.length > 0 || !allChoices.length)) {
      // Investigation hub: show available questions + goodbye
      convCont.style.display = 'none';
      for (const q of questions) {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = q.text;
        btn.onclick = () => {
          stopConvVoice();
          const hubScene = state.currentSceneId;
          // Hide choice buttons while Nancy speaks
          convChs.innerHTML = '';
          convCont.style.display = 'none';
          // Show Nancy's question text and play her voice
          convTxt.textContent = q.text;
          convSpkr.textContent = 'Nancy Drew';
          let navigated = false;
          const navigate = () => {
            if (navigated) return;
            navigated = true;
            hideConv();
            if (q.chain && q.chain.length > 0) {
              pendingConvChain = [...q.chain];
              pendingChainDest = 'S1006';
            } else if (!POST_CONV_SCENE[`S${q.scene}`]) {
              pendingReturnHub = hubScene;
            }
            loadScene(`S${q.scene}`, 0);
          };
          if (q.voice) {
            const aud = playConvVoice(q.voice);
            if (aud) {
              aud.onended = navigate;
              aud.onerror = navigate;
            } else {
              navigate();
            }
          } else {
            navigate();
          }
        };
        convChs.appendChild(btn);
      }
      // Goodbye: use FAREWELL_DATA if available, otherwise use the scene's
      // existing choices as goodbye options (e.g., Ralph's "No, thank you")
      const fw = FAREWELL_DATA[hubNpc];
      if (fw) {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = fw.text;
        btn.onclick = () => {
          stopConvVoice();
          hideConv();
          const s = fw.scenes[Math.floor(Math.random() * fw.scenes.length)];
          loadScene(`S${s}`, 0);
        };
        convChs.appendChild(btn);
      } else if (allChoices.length > 0) {
        // Use scene's built-in choices as goodbye (e.g., Ralph "No, thank you")
        for (const ch of allChoices) {
          const btn = document.createElement('button');
          btn.className = 'choice-btn';
          btn.innerHTML = markupToHtml(ch.text);
          btn.onclick = () => {
            stopConvVoice();
            hideConv();
            if (ch.continuation_scene) {
              loadScene(`S${ch.continuation_scene}`, 0);
            }
          };
          convChs.appendChild(btn);
        }
      }
      if (convChs.children.length === 0) {
        // No questions and no goodbye — just show Continue
        convCont.style.display = '';
        convCont.textContent = '[ Continue ]';
      }
    } else if (unvisitedChoices.length > 0) {
      // Tier 1: Show unvisited choice buttons
      for (const ch of unvisitedChoices) {
        const choiceIdx = allChoices.indexOf(ch);
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = markupToHtml(ch.text);
        btn.onclick = async () => {
          stopConvVoice();
          // Play Nancy's voice line, wait for it to finish before showing NPC response
          if (ch.target_node) {
            convChs.innerHTML = '';
            convCont.style.display = 'none';
            convTxt.textContent = stripMarkup(ch.text || '');
            convSpkr.textContent = 'Nancy Drew';
            const nancyAudio = playConvVoice(ch.target_node);
            await waitForSound(nancyAudio);
          }
          // Push parent onto convStack so the player can explore remaining
          // choices. For hubs this always applies. For story conversations,
          // push when children are simple terminals (no default_exit_scene
          // chain), e.g. S104's four threat-detail questions (S105-S108).
          const newVisited = new Set(visited);
          newVisited.add(choiceIdx);
          const childConv = ch.continuation_scene
            ? getConvFromScene(`S${ch.continuation_scene}`) : null;
          const childIsTerminal = childConv && !childConv.default_exit_scene
            && !(childConv.npc_entries || []).some(e => e.text?.includes('<h>'));
          if (isHub || childIsTerminal) {
            convStack.push({ act, visited: newVisited });
          }
          if (ch.continuation_scene) {
            const nextConv = getConvFromScene(`S${ch.continuation_scene}`);
            if (nextConv) {
              processSceneActions(`S${ch.continuation_scene}`);
              showConv(nextConv, { storyBranch: !isHub });
            } else {
              hideConv();
              await loadScene(`S${ch.continuation_scene}`, 0, false);
            }
          } else {
            // Choice with no continuation — terminal
            convChs.innerHTML = '';
            convCont.style.display = '';
            convCont.textContent = '[ Continue ]';
          }
        };
        convChs.appendChild(btn);
      }
      convCont.style.display = 'none';
    } else if (allChoices.length > 0 && unvisitedChoices.length === 0) {
      // All choices exhausted. Check if child scenes already chain forward via
      // default_exit_scene (e.g., S113/S114→S115). If so, just exit — the
      // chaining already happened during each choice. If not (e.g., S105-S108
      // are plain terminals), scan for sequential follow-up scenes (S109/S110).
      const childrenHaveExit = allChoices.some(c => {
        if (!c.continuation_scene) return false;
        const childConv = getConvFromScene(`S${c.continuation_scene}`);
        return childConv?.default_exit_scene;
      });
      const contScenes = allChoices.map(c => c.continuation_scene).filter(Boolean);
      const maxCont = contScenes.length > 0 ? Math.max(...contScenes) : 0;
      const npcPrefix = (act.node_id || '').substring(0, 3).toLowerCase();
      const followUps = [];
      if (!childrenHaveExit && maxCont > 0) {
        for (let i = 1; i <= 5; i++) {
          const nextId = `S${maxCont + i}`;
          const nextConv = getConvFromScene(nextId);
          if (!nextConv) break;
          const nextPrefix = (nextConv.node_id || '').substring(0, 3).toLowerCase();
          if (nextPrefix !== npcPrefix) break;
          const nextChoices = (nextConv.npc_entries || []).filter(e => e.text?.includes('<h>'));
          if (nextChoices.length > 0) break;
          followUps.push({ sceneId: nextId, act: nextConv });
          if (nextConv.default_exit_scene) break;
        }
      }
      if (followUps.length > 0) {
        convStack = [];
        pendingFollowUps = followUps.slice(1);
        processSceneActions(followUps[0].sceneId);
        showConv(followUps[0].act);
      } else {
        convStack = [];
        convCont.style.display = '';
        convCont.textContent = '[ Continue ]';
      }
    } else if (entries.length > 0 && entries[0].continuation_scene) {
      // Tier 2: No choices but has continuation from entry
      pendingConvNav = `S${entries[0].continuation_scene}`;
      pendingConvNavStory = storyBranch;
      convCont.style.display = '';
      convCont.textContent = '[ Continue ]';
    } else if (act.default_exit_scene) {
      // Tier 2b: No choices but conversation data has a default exit scene
      // (decoded from binary offset 0x6EA/0x6EC — chains like S109→S110→S2500)
      pendingConvNav = `S${act.default_exit_scene}`;
      pendingConvNavStory = true; // default_exit_scene chains are always story
      convCont.style.display = '';
      convCont.textContent = '[ Continue ]';
    } else {
      // Tier 3: Terminal node — Continue closes overlay
      convCont.style.display = '';
      convCont.textContent = '[ Continue ]';
    }

    convOL.classList.add('active');
  }

  async function continueConv() {
    stopCALAnimation();
    if (pendingConvNav) {
      // Tier 2: load next conversation inline (or via default_exit_scene chain)
      const target = pendingConvNav;
      const isStory = pendingConvNavStory;
      pendingConvNav = null;
      pendingConvNavStory = false;
      const nextConv = getConvFromScene(target);
      if (nextConv) {
        processSceneActions(target);
        stopConvVoice();
        showConv(nextConv, { storyBranch: isStory });
      } else {
        hideConv();
        await loadScene(target, 0, false);
      }
    } else if (pendingConvChain.length > 0) {
      // Chain flow (Ralph signing sequence): play next scene in chain
      const nextSceneId = `S${pendingConvChain.shift()}`;
      // Save chain state before any hideConv call that would clear it
      const savedChain = [...pendingConvChain];
      const savedDest = pendingChainDest;
      processSceneActions(nextSceneId);
      const nextConv = getConvFromScene(nextSceneId);
      if (nextConv) {
        stopConvVoice();
        showConv(nextConv);
      } else {
        // Non-conversation chain scene — load it directly
        hideConv();
        pendingConvChain = savedChain;
        pendingChainDest = savedDest;
        await loadScene(nextSceneId, 0, false);
      }
    } else if (pendingChainDest) {
      // Chain complete — navigate to destination (e.g., S1006 lobby desk)
      const dest = pendingChainDest;
      pendingChainDest = null;
      hideConv();
      await loadScene(dest, 0, false);
    } else if (pendingFollowUps.length > 0) {
      // Sequential follow-up from exhausted choice hub
      const next = pendingFollowUps.shift();
      processSceneActions(next.sceneId);
      stopConvVoice();
      showConv(next.act);
    } else if (convStack.length > 0) {
      // Pop back to parent conversation with remaining choices
      const parent = convStack.pop();
      stopConvVoice();
      showConv(parent.act, { skipGreeting: true, visited: parent.visited });
    } else if (pendingReturnHub) {
      // Returning from investigation question response — re-show hub
      const hub = pendingReturnHub;
      const hubNpc = INVESTIGATION_HUB_SCENES[hub];
      pendingReturnHub = null;
      const remaining = hubNpc ? getAvailableQuestions(hubNpc) : [];
      if (remaining.length > 0) {
        const hubConv = getConvFromScene(hub);
        if (hubConv) {
          state.currentSceneId = hub;
          showConv(hubConv, { skipGreeting: true });
        } else {
          hideConv();
        }
      } else {
        const fw = FAREWELL_DATA[hubNpc];
        if (fw) {
          hideConv();
          const s = fw.scenes[Math.floor(Math.random() * fw.scenes.length)];
          loadScene(`S${s}`, 0);
        } else {
          // No farewell (e.g., Ralph) — go to POST_CONV_SCENE or just close
          hideConv();
          const dest = POST_CONV_SCENE[hub];
          if (dest) await loadScene(dest, 0, false);
        }
      }
    } else {
      // Tier 3: terminal with empty stack — exit conversation entirely
      hideConv();
      const dest = POST_CONV_SCENE[state.currentSceneId];
      if (dest) {
        await loadScene(dest, 0, false);
      } else {
        await popToPreConversationScene();
      }
    }
  }

  async function popToPreConversationScene() {
    const convTypes = ['CONVERSATION_CEL', 'CONVERSATION_SOUND', 'CONVERSATION_VIDEO_ALT'];
    const hsTypes = ['HOT_1FR_SCENE_CHANGE', 'HOT_1FR_EXITSCENE', 'HOT_MULTIFRAME_SCENE_CHANGE'];
    while (state.history.length > 0) {
      const prev = state.history.pop();
      const prevScene = scenes[prev.id];
      if (!prevScene) continue;
      const actions = prevScene.actions || [];
      // Skip conversation-only scenes
      if (actions.some(a => convTypes.includes(a.type)) &&
          !actions.some(a => hsTypes.includes(a.type))) continue;
      // Skip auto-navigating movie scenes (would loop back to conversation)
      const isAutoMovie = actions.some(a => a.type === 'PLAY_SECONDARY_MOVIE' && a.target_scene) &&
                          !actions.some(a => hsTypes.includes(a.type));
      if (isAutoMovie) continue;
      // Skip scenes with no visible navigation (all hotspots hidden by flags)
      const hasVisibleNav = actions.some(a =>
        (hsTypes.includes(a.type) || a.type === 'SCENE_CHANGE') && condPass(a));
      if (!hasVisibleNav && actions.some(a => hsTypes.includes(a.type))) continue;
      await loadScene(prev.id, prev.variant, false);
      return;
    }
  }


  function hideConv() {
    stopConvVoice();
    stopCALAnimation();
    convOL.classList.remove('active', 'below-canvas');
    const gameWrap = document.getElementById('game-wrap');
    if (convOL.parentNode !== gameWrap) gameWrap.appendChild(convOL);
    pendingConvNav = null;
    pendingConvNavStory = false;
    convStack = [];
    pendingFollowUps = [];
    pendingConvChain = [];
    pendingChainDest = null;
    setCursor('magnify');
  }

  // ── Game end ───────────────────────────────────────────────────────────
  const gameEndOL = document.getElementById('gameover-overlay');
  const gameEndTitle = document.getElementById('gameover-title');
  const gameEndMsg = document.getElementById('gameover-msg');

  function showGameEnd(won) {
    stopTimer();
    gameEndTitle.textContent = won ? 'YOU WON!' : 'GAME OVER';
    gameEndMsg.textContent = won
      ? 'Congratulations! You solved the mystery of Stay Tuned for Danger.'
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

  // ── Interactive puzzle system ──────────────────────────────────────────
  let activePuzzle = null;
  let puzzleBaseImage = null;

  function inRect(x, y, r) {
    return x >= r.x1 && x <= r.x2 && y >= r.y1 && y <= r.y2;
  }

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
    activePuzzle._keyHandler = (e) => {
      if (!activePuzzle || activePuzzle.type !== 'PASSWORD_PUZZLE' || activePuzzle.locked) return;
      if (e.key === 'Enter') {
        const input = activePuzzle.inputText.toUpperCase().trim();
        const match = activePuzzle.passwords.some(p => p.toUpperCase() === input);
        if (match) {
          puzzleSuccess(activePuzzle.successSound, activePuzzle.successScene, -1, 0);
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

  // ── Draw puzzle state ──
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
          const fontSize = Math.min(w - 2, h / 3, 48);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.fillRect(r.x1, r.y1, w, h);
          ctx.fillStyle = '#FFD700';
          ctx.font = `bold ${fontSize}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(activePuzzle.dials[i].toString(), cx, cy);
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
        ctx.fillStyle = 'rgba(0, 0, 30, 0.85)';
        ctx.fillRect(r.x1 - 5, r.y1 - 5, r.x2 - r.x1 + 10, r.y2 - r.y1 + 10);
        ctx.strokeStyle = '#4488FF';
        ctx.lineWidth = 2;
        ctx.strokeRect(r.x1 - 5, r.y1 - 5, r.x2 - r.x1 + 10, r.y2 - r.y1 + 10);
        ctx.fillStyle = '#88BBFF';
        ctx.font = '12px monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('PASSWORD:', r.x1, r.y1);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '16px monospace';
        ctx.textBaseline = 'middle';
        const ty = (r.y1 + r.y2) / 2 + 8;
        const blink = Math.floor(Date.now() / 500) % 2 === 0;
        ctx.fillText(activePuzzle.inputText + (blink ? '_' : ''), r.x1 + 2, ty);
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
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.fillRect(cx - 8, r.y1 + 20, 16, h - 40);
          const handleY = r.y1 + 30 + (lev / (activePuzzle.numStates - 1)) * (h - 80);
          ctx.fillStyle = '#CC4444';
          ctx.fillRect(cx - 20, handleY - 8, 40, 16);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.strokeRect(cx - 20, handleY - 8, 40, 16);
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '11px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(stateLabels[lev] || `STATE ${lev}`, cx, r.y2 - 18);
        }
        break;
      }

      case 'TELEPHONE': {
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
        ctx.fillText(activePuzzle.dialed || 'DIAL A NUMBER', dispX + dispW / 2, dispY + dispH / 2);
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

    if (state.debugHotspots && activePuzzle.exitHotspot) {
      const ex = activePuzzle.exitHotspot;
      ctx.fillStyle = 'rgba(100, 100, 255, 0.2)';
      ctx.fillRect(ex.x1, ex.y1, ex.x2 - ex.x1, ex.y2 - ex.y1);
    }
  }

  // ── Handle puzzle clicks ──
  function handlePuzzleClick(x, y) {
    if (!activePuzzle || activePuzzle.locked) return;

    if (activePuzzle.exitHotspot && inRect(x, y, activePuzzle.exitHotspot)) {
      if (activePuzzle._keyHandler) document.removeEventListener('keydown', activePuzzle._keyHandler);
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
        for (let i = 0; i < activePuzzle.numDials; i++) {
          if (inRect(x, y, activePuzzle.upRects[i])) {
            playSound(activePuzzle.clickSound);
            activePuzzle.dials[i] = (activePuzzle.dials[i] + 1) % 10;
            drawPuzzleState();
            if (activePuzzle.combination.every((v, j) => activePuzzle.dials[j] === v)) {
              puzzleSuccess(activePuzzle.successSound, activePuzzle.successScene, -1, 0);
            }
            return;
          }
          if (inRect(x, y, activePuzzle.downRects[i])) {
            playSound(activePuzzle.clickSound);
            activePuzzle.dials[i] = (activePuzzle.dials[i] + 9) % 10;
            drawPuzzleState();
            if (activePuzzle.combination.every((v, j) => activePuzzle.dials[j] === v)) {
              puzzleSuccess(activePuzzle.successSound, activePuzzle.successScene, -1, 0);
            }
            return;
          }
        }
        break;
      }

      case 'LEVER_PUZZLE': {
        for (let i = 0; i < activePuzzle.numLevers; i++) {
          const r = activePuzzle.destRects[i];
          if (inRect(x, y, r)) {
            const midY = (r.y1 + r.y2) / 2;
            if (y < midY) {
              activePuzzle.levers[i] = (activePuzzle.levers[i] + activePuzzle.numStates - 1) % activePuzzle.numStates;
              playSound(activePuzzle.upSound);
            } else {
              activePuzzle.levers[i] = (activePuzzle.levers[i] + 1) % activePuzzle.numStates;
              playSound(activePuzzle.downSound);
            }
            drawPuzzleState();
            if (activePuzzle.solution.every((v, j) => activePuzzle.levers[j] === v)) {
              puzzleSuccess('steam02', activePuzzle.successScene, -1, 0);
            }
            return;
          }
        }
        break;
      }

      case 'TELEPHONE': {
        for (let i = 0; i < activePuzzle.buttons.length; i++) {
          if (inRect(x, y, activePuzzle.buttons[i])) {
            const digit = activePuzzle.labels[i];
            if (digit === '*') {
              activePuzzle.dialed = '';
              activePuzzle.displayText = '';
              drawPuzzleState();
            } else if (digit === '#') {
              telephoneLookup();
            } else {
              activePuzzle.dialed += digit;
              activePuzzle.displayText = '';
              drawPuzzleState();
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

  function telephoneLookup() {
    if (!activePuzzle || activePuzzle.type !== 'TELEPHONE') return;
    const dialed = activePuzzle.dialed;
    const dialDigits = dialed.split('').map(Number);
    for (const entry of activePuzzle.entries) {
      const isLong = entry.digits[0] === 1;
      const entryLen = isLong ? 11 : 7;
      const entryDigits = entry.digits.slice(0, entryLen);
      if (dialDigits.length >= entryLen &&
          entryDigits.every((d, j) => dialDigits[j] === d)) {
        let text = entry.text
          .replace(/<t>/g, '').replace(/<e>/g, '')
          .replace(/<c[0-9]>/g, '').replace(/<n>/g, '\n').trim();
        activePuzzle.displayText = text;
        activePuzzle.dialed = '';
        drawPuzzleState();
        return;
      }
    }
    activePuzzle.displayText = 'The number you have dialed\ncannot be completed.\nPress * to try again.';
    activePuzzle.dialed = '';
    drawPuzzleState();
  }

  function getPuzzleClickRects() {
    if (!activePuzzle) return [];
    const rects = [];
    if (activePuzzle.exitHotspot) rects.push(activePuzzle.exitHotspot);
    switch (activePuzzle.type) {
      case 'ORDERING_PUZZLE': activePuzzle.buttons.forEach(b => rects.push(b)); break;
      case 'ROTATINGLOCK_PUZZLE':
        activePuzzle.upRects.forEach(r => rects.push(r));
        activePuzzle.downRects.forEach(r => rects.push(r));
        break;
      case 'LEVER_PUZZLE': activePuzzle.destRects.forEach(r => rects.push(r)); break;
      case 'TELEPHONE': activePuzzle.buttons.forEach(b => rects.push(b)); break;
    }
    return rects;
  }

  // ── Save / Load ────────────────────────────────────────────────────────
  const SAVE_KEY = 'stfd_save';

  function saveGame() {
    const data = {
      flags: { ...state.flags },
      inventory: [...state.inventory],
      sceneId: state.currentSceneId,
      variant: state.currentVariant,
      dayTime: state.dayTime,
      difficulty: state.difficulty,
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
      state.dayTime = data.dayTime ?? 0;
      state.difficulty = data.difficulty ?? 1;
      updateInventoryBar();
      loadScene(data.sceneId, data.variant ?? 0);
      return true;
    } catch { return false; }
  }

  function hasSavedGame() {
    return !!localStorage.getItem(SAVE_KEY);
  }

  // ── Inventory bar ──────────────────────────────────────────────────────
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

    if (state.activeItem !== null && !state.inventory.has(state.activeItem)) {
      state.activeItem = null;
    }

    for (const itemId of state.inventory) {
      const slot = document.createElement('div');
      slot.className = 'inv-slot';
      if (state.activeItem === itemId) slot.classList.add('inv-selected');
      slot.title = ITEM_NAMES[itemId] || `Item ${itemId}`;
      slot.dataset.itemId = itemId;

      slot.addEventListener('click', () => {
        if (state.activeItem === itemId) {
          state.activeItem = null;
        } else {
          state.activeItem = itemId;
        }
        for (const s of invBar.querySelectorAll('.inv-slot')) {
          s.classList.toggle('inv-selected', +s.dataset.itemId === state.activeItem);
        }
      });

      const lbl = document.createElement('div');
      lbl.className = 'inv-label';
      lbl.textContent = ITEM_NAMES[itemId] || `#${itemId}`;
      slot.appendChild(lbl);
      invBar.appendChild(slot);
    }
  }

  // ── Scene loading ──────────────────────────────────────────────────────
  async function loadScene(sceneId, variant = 0, pushHistory = true, keepAmbient = false) {
    const scene = scenes[sceneId];
    if (!scene) { console.warn('Scene not found:', sceneId); return; }

    stopFidget();
    const isSameScene = (state.currentSceneId === sceneId);
    // Preserve auto-pan when panning within the same panoramic scene
    if (!isSameScene) stopAutoPan();
    sceneSounds.forEach(a => { a.pause(); a.currentTime = 0; });
    sceneSounds = [];

    if (activePuzzle?._keyHandler) document.removeEventListener('keydown', activePuzzle._keyHandler);
    if (activePuzzle?._blinkInterval) clearInterval(activePuzzle._blinkInterval);
    activePuzzle = null;
    puzzleBaseImage = null;

    if (pushHistory && state.currentSceneId && !isSameScene) {
      state.history.push({ id: state.currentSceneId, variant: state.currentVariant });
    }

    state.currentSceneId = sceneId;
    state.currentVariant = variant;
    activeHotspots = [];
    // Preserve chain state across hideConv (loadScene may be called mid-chain,
    // e.g., Ralph signing sequence S401 → S404 → S405 → S1006)
    const _chain = [...pendingConvChain];
    const _chainDest = pendingChainDest;
    hideConv();
    pendingConvChain = _chain;
    pendingChainDest = _chainDest;

    // Reset scene-local flags on scene change. Flags 0-9 are reused across
    // hundreds of scenes as per-scene state (e.g., "door clicked", "first
    // interaction"). The original engine resets them on every scene transition.
    if (!isSameScene) {
      for (let i = 0; i <= 9; i++) delete state.flags[i];
    }

    const sum = scene.summary;
    sceneInfo.textContent = `${sceneId}: ${sum.description}`;

    // Detect panoramic background and draw
    if (!isSameScene) {
      panoFrameCount = await detectPanoFrameCount(sum.bg_avf);
    }
    await renderBackground(sum.bg_avf, variant);
    await renderSceneItems(scene.actions);
    await renderNPCs(scene.actions, variant);
    drawScrollArrows();

    // Set ambient — conversation scenes and hotspot navigations keep previous ambient.
    // The original engine only applies ambient_snd on "fresh" scene loads (game start,
    // map travel, conversation exits). Hotspot clicks always preserve current ambient,
    // matching the flags=1 field on every HOT_*_SCENE_CHANGE action in the binary data.
    const isConvScene = scene.actions.some(a =>
      a.type === 'CONVERSATION_CEL' || a.type === 'CONVERSATION_SOUND' || a.type === 'CONVERSATION_VIDEO_ALT');
    if (!isConvScene && !keepAmbient) setAmbient(sum.ambient_snd);

    const hotspots = [];
    const yS = bgNativeHeight > GAME_H ? GAME_H / bgNativeHeight : 1;
    let autoNav = null, autoConv = null, puzzleAction = null;
    let movieSoundsPlayed = null;

    // Pre-scan timer actions
    for (const act of scene.actions) {
      if (!condPass(act)) continue;
      if (act.type === 'RESET_AND_START_TIMER') startTimer();
      else if (act.type === 'STOP_TIMER') stopTimer();
    }

    for (const act of scene.actions) {
      // Debug: log EFMHS condition results for door scenes
      if (act.type === 'EVENTFLAGS_MULTI_HS' && (sceneId === 'S1140' || sceneId === 'S1122' || sceneId === 'S1120')) {
        const pass = condPass(act);
        console.log(`[EFMHS LOAD] ${sceneId} "${act.name}" condPass=${pass}`,
          'flags_set:', act.flags_set?.map(f => `F${f.flag}=${f.value}`),
          'conditions:', act.conditions?.map(c => {
            const actual = c.type === 'flag_check' ? (state.flags[c.flag_id] ?? 1) :
                           c.type === 'scene_variant' ? `inv${c.item_id}=${state.inventory.has(c.item_id)}` : '?';
            return `${c.type}(${c.flag_id ?? c.item_id})==${c.flag_value ?? c.value} actual=${actual} or=${c.or||false}`;
          }));
      }
      if (!condPass(act)) continue;

      switch (act.type) {

        // ── Auto-executing ──
        case 'EVENTFLAGS':
          if (act.flags_set) act.flags_set.forEach(f => { state.flags[f.flag] = f.value; });
          break;

        case 'DIFFICULTY_LEVEL':
          if (act.param1 !== undefined && act.param1 !== 65535 && act.param2 !== undefined) {
            state.flags[act.param1] = act.param2;
          }
          if (act.difficulty !== undefined) state.difficulty = act.difficulty;
          break;

        case 'ADD_INVENTORY':
          if (act.item_id !== undefined) state.inventory.add(act.item_id);
          break;

        case 'REMOVE_INVENTORY':
          if (act.item_id !== undefined) state.inventory.delete(act.item_id);
          break;

        case 'PLAY_DIGI_SOUND':
          if (!isSameScene && !isEventFlagSound(scene, act)
              && !movieSoundsPlayed?.has(act.sound_file)) {
            if (act.loop_type === 1) {
              // Looping sound — treat as ambient
              setAmbient(act.sound_file);
            } else {
              const vol = Math.max(act.volume_l || 0, act.volume_r || 0) / 100;
              const audio = playSound(act.sound_file, vol * 0.65);
              if (audio) sceneSounds.push(audio);
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
          }
          break;

        case 'RESET_AND_START_TIMER':
        case 'STOP_TIMER':
          break; // handled in pre-scan

        case 'PLAY_SECONDARY_MOVIE': {
          movieSoundsPlayed = await playMovie(act, scene.actions);

          for (const a of scene.actions) {
            if (!condPass(a)) continue;
            if (a.type === 'ADD_INVENTORY' && a.item_id !== undefined)
              state.inventory.add(a.item_id);
            else if (a.type === 'REMOVE_INVENTORY' && a.item_id !== undefined)
              state.inventory.delete(a.item_id);
          }

          const NAV_HS_TYPES = ['HOT_1FR_SCENE_CHANGE', 'HOT_1FR_EXITSCENE', 'HOT_MULTIFRAME_SCENE_CHANGE'];
          const hasPostMovieHotspot = scene.actions.some(a =>
            NAV_HS_TYPES.includes(a.type) && condPass(a));

          if (hasPostMovieHotspot) break;

          if (act.target_scene) {
            await loadScene(`S${act.target_scene}`, act.scene_param ?? 0, true);
          } else {
            const loseAct = scene.actions.find(a => a.type === 'LOSE_GAME' && condPass(a));
            if (loseAct) { showGameEnd(false); return; }
            const winAct = scene.actions.find(a => a.type === 'WIN_GAME' && condPass(a));
            if (winAct) { showGameEnd(true); return; }
          }
          return;
        }

        case 'SCENE_CHANGE':
          if (!autoNav) autoNav = act;
          break;

        case 'CONVERSATION_CEL':
        case 'CONVERSATION_SOUND':
        case 'CONVERSATION_VIDEO_ALT': {
          // Pick conversation variant based on flag_entries check conditions
          if (convChecksPassed(act) && !autoConv) autoConv = act;
          break;
        }

        // ── Hotspot actions ──
        case 'HOT_1FR_SCENE_CHANGE':
        case 'HOT_1FR_EXITSCENE':
          if (act.hotspot) {
            const h = act.hotspot;
            console.log(`[HS] ${sceneId} → S${act.target_scene} (condPass already passed)`, act.conditions?.map(c => `flag${c.flag_id}=${state.flags[c.flag_id] ?? 1} want=${c.flag_value} or=${c.or||false}`));
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

        case 'PLAY_SECONDARY_VIDEO':
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
          if (act.dst_rect && act.item_id !== undefined && !state.inventory.has(act.item_id)) {
            const d = act.dst_rect;
            hotspots.push({ x1: d.x1, y1: d.y1, x2: d.x2, y2: d.y2,
              label: `Pick: ${ITEM_NAMES[act.item_id] || act.item_id}`, action: act });
          }
          break;

        // ── Puzzle actions ──
        case 'ORDERING_PUZZLE':
        case 'ROTATINGLOCK_PUZZLE':
        case 'PASSWORD_PUZZLE':
        case 'LEVER_PUZZLE':
        case 'TELEPHONE':
          puzzleAction = act;
          break;

        // ── Game flow ──
        case 'SAVE_CONTINUE_GAME':
          secondChanceSave = {
            flags: { ...state.flags },
            inventory: [...state.inventory],
            history: state.history.map(h => ({ ...h })),
            sceneId,
            variant,
          };
          saveGame();
          break;

        case 'LOSE_GAME':
          showGameEnd(false);
          return;

        case 'WIN_GAME':
          showGameEnd(true);
          return;

        case 'BUMP_PLAYER_CLOCK':
          // Toggle day/night
          state.dayTime = state.dayTime === 0 ? 1 : 0;
          updateDayNightDisplay();
          break;

        case 'TEXTBOX_WRITE':
          // Render text on canvas
          if (act.text) {
            const cleanText = stripMarkup(act.text);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(50, GAME_H - 60, GAME_W - 100, 40);
            ctx.fillStyle = '#fff';
            ctx.font = '14px Georgia';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(cleanText, GAME_W / 2, GAME_H - 40);
            ctx.textAlign = 'left';
          }
          break;

        // Unhandled action types — cosmetic or unknown, safe to skip
        case 'SPECIAL_EFFECT':
        case 'OVERLAY_ANIM':
        case 'SPECIAL_C8':
        case 'SPECIAL_C9':
        case 'SPECIAL_CA':
        case 'SPECIAL_CB':
        case 'SPECIAL_CC':
        case 'SPECIAL_CD':
          break;
      }
    }

    // Activate puzzle if found
    if (puzzleAction) {
      switch (puzzleAction.type) {
        case 'ORDERING_PUZZLE': setupOrderingPuzzle(puzzleAction); break;
        case 'ROTATINGLOCK_PUZZLE': setupRotatingLockPuzzle(puzzleAction); break;
        case 'PASSWORD_PUZZLE': setupPasswordPuzzle(puzzleAction); break;
        case 'LEVER_PUZZLE': setupLeverPuzzle(puzzleAction); break;
        case 'TELEPHONE': setupTelephone(puzzleAction); break;
      }
    }

    // Auto-navigate (SCENE_CHANGE has priority over conversations)
    if (autoNav && !puzzleAction) {
      await loadScene(`S${autoNav.target_scene}`, autoNav.scene_param ?? 0, false);
      return;
    }

    // Show conversation stub
    if (autoConv && !puzzleAction) {
      showConv(autoConv);
    }

    // Register hotspots and draw debug
    activeHotspots = hotspots;
    drawHotspots(hotspots);

    // Restore magnifying glass cursor after scene load
    if (!autoConv) setCursor('magnify');

    // Update UI
    updateInventoryBar();
    refreshDebugPanel();
  }

  // ── Click handling ─────────────────────────────────────────────────────
  function canvasToGame(e) {
    const r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (canvas.width / r.width),
      y: (e.clientY - r.top) * (canvas.height / r.height),
    };
  }

  canvas.addEventListener('click', (e) => {
    if (movieActive) return;
    if (convOL.classList.contains('active')) return;
    if (gameEndOL.classList.contains('active')) return;

    const { x, y } = canvasToGame(e);

    // Puzzle input
    if (activePuzzle) {
      handlePuzzleClick(x, y);
      return;
    }

    // Panoramic edge scroll
    if (panoFrameCount > 1) {
      if (x <= SCROLL_ZONE) {
        const nv = (state.currentVariant + 1) % panoFrameCount;
        loadScene(state.currentSceneId, nv, false);
        return;
      }
      if (x >= GAME_W - SCROLL_ZONE) {
        const nv = (state.currentVariant - 1 + panoFrameCount) % panoFrameCount;
        loadScene(state.currentSceneId, nv, false);
        return;
      }
    }

    // Check hotspots (reverse order — last registered = highest priority)
    for (let i = activeHotspots.length - 1; i >= 0; i--) {
      const hs = activeHotspots[i];
      if (x >= hs.x1 && x <= hs.x2 && y >= hs.y1 && y <= hs.y2) {
        const act = hs.action;

        if (act.type === 'EVENTFLAGS_MULTI_HS') {
          // Set flags, play conditioned sounds, then reload scene to re-evaluate
          console.log(`[EFMHS CLICK] ${state.currentSceneId} — setting:`, act.flags_set, 'label:', hs.label);
          if (act.flags_set) act.flags_set.forEach(f => { state.flags[f.flag] = f.value; });
          // Difficulty screen (S0): clicking any difficulty button should trigger
          // navigation to S5. Set difficulty and navigate directly.
          if (state.currentSceneId === 'S0') {
            const diffFlag = act.flags_set?.find(f => f.flag <= 2);
            if (diffFlag) {
              state.difficulty = diffFlag.flag; // flag 0=Junior, 1=Senior, 2=Master
              loadScene('S5', 0);
              return;
            }
          }
          // Play non-looping sounds whose conditions now pass due to the flag
          // change. If any such sound has nav_on_end, wait for it to finish then
          // navigate instead of reloading immediately.
          const scene = scenes[state.currentSceneId];
          let navSound = null;
          if (scene) {
            for (const a of scene.actions) {
              if (a.type !== 'PLAY_DIGI_SOUND') continue;
              if (a.loop_type === 1) continue; // skip ambient/looping sounds
              const cp = condPass(a);
              const ief = isEventFlagSound(scene, a);
              if (state.currentSceneId === 'S1140' || state.currentSceneId === 'S1122' || state.currentSceneId === 'S1120') {
                console.log(`[EFMHS SND] ${a.sound_file} condPass=${cp} isEFS=${ief} nav=${a.nav_on_end||'none'}`,
                  a.conditions?.map(c => `flag${c.flag_id}=${state.flags[c.flag_id] ?? 1} want=${c.flag_value}`));
              }
              if (!cp) continue;
              if (!ief) continue; // only sounds tied to EFMHS flags
              const audio = playSound(a.sound_file);
              if (a.nav_on_end && audio) {
                navSound = { audio, target: a.nav_on_end, originScene: state.currentSceneId };
              }
              // Auto-chain: trigger sounds (subtype 1, no nav_on_end) advance the
              // flag chain — e.g. Lillian's door knock (flag 0) → door open (flag 1).
              // Only chain if no EFMHS in the scene handles the next flag via a click
              // (avoids skipping doorknob clicks on Mattie/Rick doors).
              if (!a.nav_on_end && a.subtype === 1) {
                for (const c of (a.conditions || [])) {
                  if (c.type !== 'flag_check') continue;
                  const nextFlag = c.flag_id + 1;
                  const efmhsSetsNext = scene.actions.some(e =>
                    e.type === 'EVENTFLAGS_MULTI_HS' && e.flags_set?.some(f => f.flag === nextFlag));
                  if (efmhsSetsNext) continue;
                  const nextSound = scene.actions.find(s =>
                    s.type === 'PLAY_DIGI_SOUND' && s !== a &&
                    s.conditions?.some(sc => sc.type === 'flag_check' && sc.flag_id === nextFlag && sc.flag_value === 2));
                  if (nextSound) {
                    state.flags[nextFlag] = 2;
                    console.log(`[EFMHS CHAIN] auto-set flag ${nextFlag}=2 (chained from flag ${c.flag_id})`);
                    if (condPass(nextSound)) {
                      const chainAudio = playSound(nextSound.sound_file);
                      if (nextSound.nav_on_end && chainAudio && !navSound) {
                        navSound = { audio: chainAudio, target: nextSound.nav_on_end, originScene: state.currentSceneId };
                      }
                    }
                  }
                }
              }
            }
          }
          if (navSound) {
            // Don't reload — wait for the sound, then navigate
            waitForSound(navSound.audio).then(() => {
              if (state.currentSceneId === navSound.originScene) {
                loadScene(`S${navSound.target}`, 0, true);
              }
            });
          } else {
            // No nav_on_end sound — reload current scene to re-evaluate conditions
            loadScene(state.currentSceneId, state.currentVariant, false);
          }
          return;
        }

        if (act.type === 'SHOW_INVENTORY_ITEM') {
          if (act.item_id !== undefined) {
            state.inventory.add(act.item_id);
            updateInventoryBar();
            loadScene(state.currentSceneId, state.currentVariant, false);
          }
          return;
        }

        if (act.type === 'PLAY_SECONDARY_VIDEO') {
          if (act.target_scene) {
            loadScene(`S${act.target_scene}`, 0);
          }
          return;
        }

        // Navigation hotspot — keep current ambient (matches original engine)
        if (act.target_scene !== undefined) {
          loadScene(`S${act.target_scene}`, act.scene_param ?? 0, true, true);
          return;
        }
      }
    }
  });

  // ── Mouse handling (cursors) ───────────────────────────────────────────
  document.addEventListener('mousemove', (e) => {
    if (e.target !== canvas) return;
    if (movieActive) { setCursor('wait'); return; }
    if (convOL.classList.contains('active') || gameEndOL.classList.contains('active')) return;

    const { x, y } = canvasToGame(e);

    // Puzzle cursor
    if (activePuzzle) {
      const rects = getPuzzleClickRects();
      const over = rects.some(r => inRect(x, y, r));
      setCursor(over ? 'hand_pointer' : 'arrow');
      stopAutoPan();
      return;
    }

    // Panoramic edge auto-scroll
    if (panoFrameCount > 1) {
      if (x <= SCROLL_ZONE) {
        setCursor('walk');
        startAutoPan(1);
        return;
      } else if (x >= GAME_W - SCROLL_ZONE) {
        setCursor('walk');
        startAutoPan(-1);
        return;
      } else {
        stopAutoPan();
      }
    }

    // Fidget hover detection
    if (fidgetInterval && fidgetDrawRect) {
      const inFidget = x >= fidgetDrawRect.x && x <= fidgetDrawRect.x + fidgetDrawRect.w &&
                       y >= fidgetDrawRect.y && y <= fidgetDrawRect.y + fidgetDrawRect.h;
      if (inFidget && !fidgetHovering) {
        fidgetHovering = true;
        fidgetUnhovering = false;
        fidgetFrameIndex = fidgetHoverStart;
      } else if (!inFidget && fidgetHovering) {
        fidgetHovering = false;
        fidgetUnhovering = true;
      }
    }

    // Hotspot cursor
    for (let i = activeHotspots.length - 1; i >= 0; i--) {
      const hs = activeHotspots[i];
      if (x >= hs.x1 && x <= hs.x2 && y >= hs.y1 && y <= hs.y2) {
        const act = hs.action;
        if (act.type === 'PLAY_SECONDARY_VIDEO') {
          setCursor('talk');
        } else if (act.type === 'SHOW_INVENTORY_ITEM') {
          setCursor('hand_pointer');
        } else if (act.type === 'EVENTFLAGS_MULTI_HS') {
          setCursor('hand_pointer');
        } else if (act.type === 'HOT_1FR_EXITSCENE') {
          setCursor('walk');
        } else {
          setCursor('magnify');
        }
        return;
      }
    }

    setCursor('magnify');
  });

  canvas.addEventListener('mouseleave', () => { stopAutoPan(); });

  // ── Debug panel ────────────────────────────────────────────────────────
  function refreshDebugPanel() {
    // Flag grid
    const flagsGrid = document.getElementById('dp-flags-grid');
    if (flagsGrid) {
      flagsGrid.innerHTML = '';
      const maxFlag = Math.max(250, ...Object.keys(state.flags).map(Number).filter(n => !isNaN(n)));
      for (let i = 0; i <= maxFlag; i++) {
        const val = state.flags[i] ?? 1;
        const btn = document.createElement('button');
        const name = FLAG_NAMES[i];
        if (!name && val === 1) continue; // hide unused flags at default value
        btn.className = `dp-flag-btn${val === 2 ? ' dp-f2' : val !== 1 ? ' dp-f1' : ''}`;
        btn.textContent = name ? `${name}:${val}` : `${i}:${val}`;
        if (name) btn.title = `flag ${i}`;
        btn.onclick = () => {
          state.flags[i] = ((state.flags[i] ?? 1) % 3); // cycle 0→1→2
          if (state.flags[i] === 0) state.flags[i] = 0;
          refreshDebugPanel();
        };
        flagsGrid.appendChild(btn);
      }
    }

    // Inventory grid
    const invGrid = document.getElementById('dp-inv-grid');
    if (invGrid) {
      invGrid.innerHTML = '';
      for (let i = 0; i < 30; i++) {
        const btn = document.createElement('button');
        btn.className = `dp-btn${state.inventory.has(i) ? ' dp-active' : ''}`;
        btn.textContent = `${i}`;
        btn.title = ITEM_NAMES[i] || `Item ${i}`;
        btn.onclick = () => {
          if (state.inventory.has(i)) state.inventory.delete(i);
          else state.inventory.add(i);
          updateInventoryBar();
          refreshDebugPanel();
        };
        invGrid.appendChild(btn);
      }
    }

    // Day/night
    updateDayNightDisplay();
  }

  function updateDayNightDisplay() {
    const el = document.getElementById('dp-daytime');
    if (el) el.textContent = state.dayTime === 0 ? 'Day' : 'Night';
  }

  // ── Public API ─────────────────────────────────────────────────────────
  function goToScene(input) {
    if (!input) return;
    let id = input.trim();
    if (!id.startsWith('S') && !id.startsWith('s')) id = 'S' + id;
    id = id.charAt(0).toUpperCase() + id.slice(1);
    if (scenes[id]) {
      hideConv();
      gameEndOL.classList.remove('active');
      loadScene(id, 0);
    } else {
      sceneInfo.textContent = `Scene ${id} not found`;
    }
  }

  function back() {
    if (state.history.length === 0) return;
    const prev = state.history.pop();
    loadScene(prev.id, prev.variant, false);
  }

  function toggleDebug() {
    const panel = document.getElementById('debug-panel');
    state.debugHotspots = !state.debugHotspots;
    panel.classList.toggle('active', state.debugHotspots);
    if (state.debugHotspots) {
      refreshDebugPanel();
      drawHotspots(activeHotspots);
    } else {
      // Reload scene to clear debug overlays
      loadScene(state.currentSceneId, state.currentVariant, false);
    }
  }

  function toggleVoices() {
    state.voicesEnabled = !state.voicesEnabled;
    const btn = document.getElementById('voice-toggle-btn');
    if (btn) {
      btn.textContent = state.voicesEnabled ? 'Voice: ON' : 'Voice: OFF';
      btn.classList.toggle('dp-active', state.voicesEnabled);
    }
  }

  function toggleDayNight() {
    state.dayTime = state.dayTime === 0 ? 1 : 0;
    updateDayNightDisplay();
    // Reload scene so day/night conditions are re-evaluated
    loadScene(state.currentSceneId, state.currentVariant, false);
  }

  function debugRestart() {
    state.flags = {};
    state.inventory = new Set();
    state.activeItem = null;
    state.history = [];
    state.dayTime = 0;
    state.difficulty = 1;
    Object.assign(state.flags, INITIAL_FLAGS);
    localStorage.removeItem(SAVE_KEY);
    updateInventoryBar();
    loadScene(START_SCENE_ID, 0, false);
  }

  function debugGivePass() {
    state.inventory.add(10); // Visitor's Pass (from Ralph)
    state.inventory.add(2);  // House Keys (from Mattie in S110)
    state.flags[104] = 2;   // met Mattie (at apartment, before studio)
    updateInventoryBar();
    refreshDebugPanel();
    loadScene(state.currentSceneId, state.currentVariant, false);
  }

  function debugKliegLight() {
    state.flags[61] = 2; // klieg light incident happened
    refreshDebugPanel();
    loadScene(state.currentSceneId, state.currentVariant, false);
  }

  // Set up exact post-klieg-light state: entered studio, klieg happened,
  // haven't met Rick/Dwayne/Lillian yet. Teleports to West Hallway 2 (near doors).
  function debugPostKlieg() {
    state.flags[61] = 2;   // klieg light happened
    state.flags[104] = 2;  // met Mattie (S100 apartment greeting)
    state.flags[135] = 2;  // visited Mattie's dressing room (S200, before klieg)
    // flag 220 (agency) stays default — unlocked later at Mattie's apt after klieg
    state.flags[39] = 2;   // Pappas yell suppression (S1110 hallway, one-shot)
    state.inventory.add(10); // Visitor's Pass (from Ralph)
    state.inventory.add(2);  // House Keys (from Mattie in S110)
    // Explicitly do NOT set: 52 (met Rick), 48 (met Dwayne), 49 (met Lillian)
    // flag 46 (day/night) defaults to 1 via ?? 1, no need to set
    // flag 47 (Mattie warned) is set AFTER klieg, not before
    updateInventoryBar();
    refreshDebugPanel();
    loadScene('S1113', 0);  // West Hallway 2 — Rick & Mattie doors
    console.log('[DEBUG] Post-klieg state set. Flags:', JSON.stringify(state.flags),
      'Inventory:', [...state.inventory]);
  }

  function debugHireNancy() {
    state.flags[117] = 2; // Dwayne hired Nancy
    state.inventory.add(4); // Employee Pass
    updateInventoryBar();
    refreshDebugPanel();
    loadScene(state.currentSceneId, state.currentVariant, false);
  }

  // State: post-klieg, met Rick & Lillian, pass taken, Mattie suggested Dwayne.
  // Teleports to Agency Hallway outside Dwayne's door.
  function debugDwayneOffice() {
    state.flags[104] = 2;  // met Mattie
    state.flags[61] = 2;   // klieg light happened
    state.flags[135] = 2;  // visited Mattie's dressing room
    state.flags[39] = 2;   // Pappas yell suppression
    state.flags[47] = 2;   // Mattie warned (set after klieg)
    state.flags[52] = 2;   // met Rick
    state.flags[49] = 2;   // met Lillian
    state.flags[220] = 2;  // agency unlocked (Mattie called Dwayne)
    state.inventory.add(2); // House Keys
    state.inventory.delete(10); // Visitor's Pass taken by Lillian
    // flag 48 (met Dwayne) stays default 1 — haven't met him yet
    // flag 117 (Dwayne hired Nancy) stays default 1
    updateInventoryBar();
    refreshDebugPanel();
    loadScene('S2208', 0);  // Agency Hallway 6 — Dwayne's door
    console.log('[DEBUG] Dwayne office state set. At S2208 (his door). Flags:',
      JSON.stringify(state.flags), 'Inventory:', [...state.inventory]);
  }

  // ── Initialization ─────────────────────────────────────────────────────
  async function init(config) {
    FRAMES_DIR  = config.framesDir;
    AUDIO_DIR   = config.audioDir;
    SPRITES_DIR = config.spritesDir;
    START_SCENE_ID = config.startScene || 'S0';
    INITIAL_FLAGS  = config.initialFlags || {};

    sceneInfo.textContent = 'Loading scenes…';

    try {
      const resp = await fetch(config.scenesUrl);
      scenes = await resp.json();
    } catch (e) {
      sceneInfo.textContent = 'Error loading scenes: ' + e.message;
      return;
    }

    sceneInfo.textContent = `Loaded ${Object.keys(scenes).length} scenes`;

    // Initialize cursors
    await initCursors();
    setCursor('magnify');

    // Apply initial flags
    Object.assign(state.flags, INITIAL_FLAGS);

    // Check for saved game
    if (hasSavedGame()) {
      const contOL = document.getElementById('continue-overlay');
      contOL.classList.add('active');
      document.getElementById('continue-btn').onclick = () => {
        contOL.classList.remove('active');
        loadSavedGame();
      };
      document.getElementById('newgame-btn').onclick = () => {
        contOL.classList.remove('active');
        localStorage.removeItem(SAVE_KEY);
        loadScene(START_SCENE_ID, 0, false);
      };
    } else {
      loadScene(START_SCENE_ID, 0, false);
    }
  }

  // ── Public interface ───────────────────────────────────────────────────
  return {
    init,
    goToScene,
    back,
    continueConv,
    toggleDebug,
    toggleVoices,
    toggleDayNight,
    debugRestart,
    debugGivePass,
    debugKliegLight,
    debugPostKlieg,
    debugHireNancy,
    debugDwayneOffice,
    loadSecondChance,

    // Expose state for debugging in console
    get state() { return state; },
    get scenes() { return scenes; },
  };

})();
