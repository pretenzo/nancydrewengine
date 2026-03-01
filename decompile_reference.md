# Nancy Drew SCK — Decompilation Reference
*Generated 2026-02-20 21:43 from 120 analysis blocks*
**C functions mentioned:** 570  
**Analysis blocks:** 120

---

## C Function Index

- `ADD_INVENTORY`
- `AOBJECTS`
- `AddResponse`
- `Always`
- `Background`
- `Blockers`
- `CIC10`
- `COMPLETED`
- `CONVERSATION_VIDEO`
- `CifTree`
- `Connie`
- `Current`
- `DIFFICULTY_LEVEL`
- `DOBJECTS`
- `Daryl`
- `Decoded`
- `Decoder`
- `Diner`
- `Drawer`
- `EFMHS`
- `EVENTFLAGS`
- `EVENTFLAGS_MULTI_HS`
- `Effects`
- `Engine`
- `Entries`
- `Explosion`
- `FUN_004235d0`
- `FUN_00423750`
- `FUN_0047069b`
- `Fallback`
- `Features`
- `Gaps`
- `HINT_SYSTEM`
- `HOT_1FR_EXITSCENE`
- `HOT_1FR_SCENE_CHANGE`
- `HOT_MULTIFRAME_SCENE_CHANGE`
- `Hints`
- `House`
- `Hulk`
- `IIFE`
- `IMPORTANT`
- `Implemented`
- `Inventory`
- `JSON`
- `Keypad`
- `Kill`
- `LEVER_PUZZLE`
- `LOSE_GAME`
- `Library`
- `Locker`
- `Login`
- `Loop`
- `MAP_CALL_HOT_1FR`
- `MAP_CALL_HOT_MULTIFRAME`
- `MODERATE`
- `Medium`
- `Misattribution`
- `NPCs`
- `Night`
- `ORDERING_PUZZLE`
- `OVERLAY_HOT`
- `Overlays`
- `PASSWORD_PUZZLE`
- `PLAY_DIGI_SOUND`
- `PLAY_SECONDARY_MOVIE`
- `PLAY_SECONDARY_VIDEO`
- `PLAY_SOUND_MULTI_HS`
- `PNGs`
- `POP_SCENE`
- `PRIORITY`
- `PUZZLE_DATA`
- `Padlock`
- `Pharmacy`
- `Pickup`
- `Playable`
- `Playback`
- `Puzzles`
- `Questions`
- `RESET_AND_START_TIMER`
- `ROTATINGLOCK_PUZZLE`
- `Reference`
- `Reload`
- `Routing`
- `S101`
- `S1041`
- `S1250`
- `S1253`
- `S1416`
- `S1424`
- `S1425`
- `S1426`
- `S1427`
- `S1428`
- `S1430`
- `S1432`
- `S1434`
- `S1460`
- `S151`
- `S1601`
- `S1603`
- `S1604`
- `S1606`
- `S1609`
- `S1613`
- `S1620`
- `S1621`
- `S1622`
- `S1654`
- `S1661`
- `S1846`
- `S1855`
- `S1857`
- `S1858`
- `S2062`
- `S2079`
- `S2082`
- `S2087`
- `S2092`
- `S2096`
- `S2099`
- `S221`
- `S301`
- `S3201`
- `S3202`
- `S3203`
- `S3210`
- `S3216`
- `S401`
- `S5000`
- `S5001`
- `S5002`
- `S501`
- `S518`
- `S523`
- `S524`
- `S525`
- `S601`
- `S602`
- `S603`
- `S606`
- `S607`
- `S609`
- `S610`
- `S616`
- `S617`
- `S619`
- `S620`
- `S622`
- `S625`
- `S626`
- `S627`
- `S629`
- `S632`
- `S643`
- `S647`
- `S655`
- `S824`
- `S832`
- `S888`
- `SAVE_CONTINUE_GAME`
- `SBOBJECT`
- `SCENE_CHANGE`
- `SHOW_INVENTORY_ITEM`
- `SLIDER_PUZZLE`
- `SOBJECTS`
- `SPECIAL_EFFECT`
- `STOP_TIMER`
- `Safe`
- `School`
- `Setup`
- `Small`
- `Sound`
- `Sounds`
- `Stack`
- `Star`
- `System`
- `TELEPHONE`
- `Tapestry`
- `Tasks`
- `Testing`
- `Transition`
- `UNSET`
- `WIN_GAME`
- `action`
- `actions`
- `activation`
- `active`
- `added`
- `advance`
- `again`
- `allocation`
- `area`
- `arithmetic`
- `around`
- `array`
- `arrows`
- `article`
- `assets`
- `attempts`
- `audio`
- `availability`
- `available`
- `away`
- `back`
- `background`
- `backgrounds`
- `bases`
- `before`
- `behavior`
- `binary`
- `bits`
- `blob`
- `blobs`
- `block`
- `blocks`
- `bottom`
- `branch`
- `button`
- `byte`
- `bytes`
- `canvas`
- `capture`
- `case`
- `cases`
- `centered`
- `chain`
- `chaining`
- `changes`
- `chest`
- `choiceConditionsPass`
- `choices`
- `clickable`
- `clicking`
- `clicks`
- `clips`
- `clock`
- `close`
- `closeup`
- `code`
- `completes`
- `condPass`
- `conditions`
- `console`
- `constant`
- `continueConv`
- `conversation`
- `conversations`
- `coordinate`
- `coordinates`
- `correct`
- `corrected`
- `correctly`
- `covers`
- `cutter`
- `data`
- `death`
- `decode`
- `decoded`
- `decoder`
- `decoding`
- `decrypt`
- `delivery`
- `dest_rects`
- `detect`
- `dialog`
- `dies`
- `digits`
- `diner`
- `disambiguation`
- `display`
- `displays`
- `diversions`
- `does`
- `done`
- `down_rects`
- `drawImage`
- `drawPuzzleState`
- `drawScrollArrows`
- `drawer`
- `edge`
- `edges`
- `effects`
- `encounter`
- `endgame`
- `engine`
- `engineer`
- `entries`
- `entry`
- `evaluation`
- `executable`
- `exist`
- `exists`
- `exitConversation`
- `extraction`
- `factor`
- `fails`
- `fallback`
- `files`
- `filtering`
- `fires`
- `first`
- `fixed`
- `flag`
- `flags`
- `frame`
- `frameNo`
- `frames`
- `further`
- `gated`
- `generated`
- `getPuzzleClickRects`
- `goToScene`
- `goodbye`
- `greeting`
- `grid`
- `hallway`
- `handle`
- `handlePuzzleClick`
- `handled`
- `handler`
- `handlers`
- `handling`
- `hangup_scene`
- `hardcoded`
- `hash`
- `header`
- `height`
- `heuristics`
- `hic5`
- `hidden`
- `hideConv`
- `hints`
- `history`
- `hitTestPrimary`
- `hotspot`
- `hotspots`
- `house`
- `hubs`
- `ignored`
- `images`
- `immediately`
- `includes`
- `increase`
- `increases`
- `index`
- `injection`
- `input`
- `intro`
- `inventory`
- `investigation`
- `isEventFlagSound`
- `json`
- `keypad`
- `kitchen`
- `label`
- `length`
- `line`
- `list`
- `load`
- `loadSavedGame`
- `loadScene`
- `loadSecondChance`
- `loader`
- `loads`
- `locker`
- `logic`
- `login`
- `loop`
- `looping`
- `lounge`
- `lzss_decompress`
- `machines`
- `management`
- `many`
- `mapping`
- `mappings`
- `markup`
- `mechanic`
- `mentioned`
- `menus`
- `messages`
- `metadata`
- `mode`
- `monologues`
- `movie`
- `navigate`
- `navigateConv`
- `navigation`
- `night`
- `node`
- `node_ids`
- `nodes`
- `normally`
- `note`
- `nothing`
- `npcRefsPass`
- `numEntries`
- `num_dials`
- `num_levers`
- `num_states`
- `objects`
- `offset`
- `offsets`
- `onCanvasClick`
- `only`
- `operations`
- `options`
- `original`
- `over`
- `overlay`
- `overlays`
- `overrides`
- `padlock`
- `pairs`
- `panoramic`
- `parameter`
- `parsing`
- `pass`
- `passes`
- `passport`
- `password`
- `path`
- `pattern`
- `person`
- `pixels`
- `places`
- `play`
- `playSound`
- `playback`
- `point`
- `pointer`
- `popToPreConversationScene`
- `positioning`
- `prefix`
- `present`
- `processing`
- `progression`
- `prototype`
- `puzzle`
- `puzzleExit`
- `puzzleSuccess`
- `question`
- `questions`
- `range`
- `records`
- `rects`
- `reference`
- `references`
- `reload`
- `reloads`
- `removeChromaKey`
- `render`
- `renderBackground`
- `renderNPCs`
- `renderSceneItems`
- `renderer`
- `rendering`
- `resolution`
- `rgb555_to_image`
- `room`
- `rooms`
- `route`
- `routes`
- `routing`
- `running`
- `runtime`
- `safe`
- `saveGame`
- `sayGoodbye`
- `says`
- `scene`
- `scenes`
- `screen`
- `script`
- `scrollDir`
- `scrolling`
- `second`
- `seconds`
- `select`
- `selection`
- `sequence`
- `setInterval`
- `sets`
- `setting`
- `setupLeverPuzzle`
- `setupOrderingPuzzle`
- `setupPasswordPuzzle`
- `setupPuzzleUI`
- `setupRotatingLockPuzzle`
- `setupSliderPuzzle`
- `setupTelephone`
- `shaft`
- `sheet`
- `sheets`
- `showConv`
- `showPuzzle`
- `silently`
- `size`
- `skip`
- `slot`
- `slots`
- `solved`
- `sound`
- `sounds`
- `space`
- `specific`
- `sprite`
- `sprites`
- `stack`
- `startTimer`
- `startTimerChecks`
- `startsWith`
- `startup`
- `state`
- `stay`
- `stopTimer`
- `structure`
- `sub_count`
- `subs`
- `summary`
- `system`
- `table`
- `tail`
- `tape`
- `target_node`
- `targets`
- `text`
- `there`
- `third`
- `thunk_FUN_0040f340`
- `thunk_FUN_00419cc0`
- `thunk_FUN_0041eab0`
- `thunk_FUN_004235d0`
- `thunk_FUN_004394a0`
- `thunk_FUN_0043f4b0`
- `thunk_FUN_004505d0`
- `timer`
- `toggle`
- `toggleDebug`
- `tools`
- `transition`
- `tree`
- `trees`
- `truncated`
- `tryLoadImg`
- `type`
- `types`
- `underneath`
- `undertaking`
- `unlocking`
- `unused`
- `usage`
- `username`
- `values`
- `variable`
- `variant`
- `variants`
- `version`
- `videos`
- `view`
- `viewport`
- `visible`
- `visit`
- `waitForSound`
- `wasted`
- `width`
- `work`
- `works`
- `wrapping`
- `wrong`

---

## Analysis Blocks

### [1] C analysis — 2026-02-21 02:07:03

**C functions:** `runtime`, `visible`

<details>
<summary>Full analysis text</summary>

Wait — this `const` is at the module/IIFE level, but it's positioned *after* the functions that reference it (like `refreshDebugPanel` called from `loadScene`). JavaScript hoists function declarations, but `const` is not hoisted in the same way. Actually, `const` *is* hoisted to the top of its scope but lives in the temporal dead zone until the declaration is reached. Since `refreshDebugPanel` is only *called* at runtime (not during IIFE construction), the `const` will have been initialized by then. So that's fine.

The actual issue might be that the page works fine but the panel just starts hidden and you haven't clicked "Panel". But if you truly see nothing, there might be a console error. Let me make the panel start visible by default so you can confirm it's there, and also check if there's a problem with the `dp-scene` input Enter key not being wired up.

Actually — a simpler explanation: are you maybe looking at a cached version? Let me just make the panel default to visible (open) so it's obvious, and you can toggle it closed with the Panel button.

</details>

---

### [2] C analysis — 2026-02-21 02:21:08

**C functions:** `startup`

<details>
<summary>Full analysis text</summary>

Found it. The NPC met flags are initialized to 1 at startup (by the loop at line 2060-2071, since they appear in question conditions with `expected: 2`). So when you click, it cycles 1→2 (looks green, correct) but then 2→0 (skipping back to unset). The problem is going from 0 the *next* click goes to 1 — but the button only has a style for `dp-f1` (yellowish) and `dp-f2` (green). At value 1, it looks yellow which doesn't clearly read as "met" since met requires value 2. So it takes **two clicks** from the initial state to get to green.

But the real issue is that these flags start at 1 (from the init loop), so the first click goes to 2 (green/met) — that should work. Let me check if the init loop actually sets them. Flag 11 appears in `hic1` conditions with `expected: 2`, not `expected: 1`, so the init loop wouldn't touch it.

</details>

---

### [3] C analysis — 2026-02-21 02:21:16

**C functions:** `binary`

<details>
<summary>Full analysis text</summary>

Right — flag 11 only appears with `expected: 2` in question conditions, never with `expected: 1`. The init loop only sets flags where `expected === 1`. So flag 11 starts at 0 (unset). Click once → 1 (yellow, not "met"). Click again → 2 (green, "met"). That's confusing — two clicks needed.

The real fix: NPC met flags and most "clue found" flags are binary (0=no, 2=yes, never meaningfully 1). They should just be simple on/off toggles that go straight to 2. Let me make the flag buttons smarter — flags in the "NPCs Met" and "Clues Found" categories toggle between 0 and 2 directly.

</details>

---

### [4] C analysis — 2026-02-21 02:37:32

**C functions:** `S3216`, `mode`, `puzzle`, `questions`, `tape`, `toggle`

<details>
<summary>Full analysis text</summary>

Here's what they mean:

**Flag 5 — Chapter/tape** (values 0/1/2)
- Starts at 1 (set in initialFlags). Value 1 = early game, haven't watched the tape yet.
- Set to 2 when you watch the VHS blackmail tape (S655). Unlocks confrontation questions with all 4 NPCs about Jake's blackmail evidence.

**Flag 40 — Final interrogation** (values 0/2)  
- Set to 2 during scene S3216 (Daryl reveals Mitch at the diner). Unlocks the final "help us find the killer" question for all 4 NPCs.

**Flag 62 — Boiler crisis** (values 0/1/2)
- Set to 1 in the *same* scene as flag 40 (S3216). Means the boiler room is now in crisis mode (chains, ticking bomb).
- Set to 2 after solving the lever puzzle (S5002). Crisis resolved.

**Flag 94 — Investigation progress** (values 0/1/2)
- Set during Connie's interrogation. Value 1 = partial evidence, value 2 = full evidence gathered. Gates the more complex synthesis questions ("Hal, Hulk and Connie were all involved...").

**Can multiple be active at once?** Yes — they're independent parallel tracks, not sequential. In the endgame all four would typically be set. Flag 5 can be triggered whenever you find the tape. Flags 40+62 fire together from the same scene. Flag 94 depends on Connie dialogue choices.

The "cycle" toggle (0→1→2→0) on these is correct since all four have meaningful intermediate values.

</details>

---

### [5] C analysis — 2026-02-21 02:54:25

**C functions:** `S1041`, `diner`

<details>
<summary>Full analysis text</summary>

Fixed. **Flag 101** is now initialized to 1 at boot, which means:

- The kitchen doors in the diner (S840) will now be clickable during normal gameplay
- Clicking them leads to S1041 (safe kitchen) where you can find the bolt cutter and ladle
- After placing the ladle at the gas line, flag 101 changes to 2 (sabotaged kitchen variant)
- If you don't place the ladle, the diner explosion death scene can trigger

Also added "Kitchen state" to the Story Progress section in the debug panel so testers can toggle between states.

</details>

---

### [6] C analysis — 2026-02-21 02:59:31

**C functions:** `Explosion`, `Setup`, `kitchen`, `line`, `movie`, `running`

<details>
<summary>Full analysis text</summary>

The explosion is a **timed death trap**, not just a flag toggle. Here's the full chain:

**Setup (what the player does):**
1. Enter the kitchen (S1041, flag 101=1)
2. Pick up the **bolt cutters** from the gas line (S1045) — this changes the scene variant to 2
3. The gas starts hissing and a **timer starts** (RESET_AND_START_TIMER)
4. You need to grab the **ladle** from the bus bin (S1044) and use it on the gas line (S1048 → S1047) to cap the leak
5. If you do, flag 101 is set to 2 and the timer stops — safe

**Explosion (if you fail):**
- While the timer is running, **every kitchen sub-scene** (S1043, S1044, S1048, S1049, S1053) has `timed_flag` conditions: if flag 44=2 and 60-90 seconds have elapsed → auto-navigate to **S1046** (explosion)
- S1046 plays the `xdin1` explosion movie (PLAY_SECONDARY_MOVIE, **not yet implemented**) then triggers LOSE_GAME

**So flag 101 alone won't cause an explosion** — the explosion requires:
1. The timer to be running (started by visiting the gas line after taking the bolt cutters)
2. Flag 44 = 2
3. 60-90 seconds to elapse without placing the ladle

The key blocker is that **S1046's explosion movie uses PLAY_SECONDARY_MOVIE** (action type 53), which isn't implemented yet. Even if the timer triggers correctly, the death scene would currently be incomplete. That's the same blocker from the project overview — it's the next big feature to build.

</details>

---

### [7] C analysis — 2026-02-21 03:00:09

**C functions:** `movie`, `startTimer`, `startTimerChecks`, `stopTimer`

<details>
<summary>Full analysis text</summary>

It is implemented actually. The timer system is fully in place:

- **`startTimer()`** (line 378) — sets `timerActive = true`, records `Date.now()`, starts polling
- **`startTimerChecks()`** (line 389) — interval that re-evaluates `timed_flag` conditions on SCENE_CHANGE actions every tick
- **`stopTimer()`** (line 384) — clears the interval
- **`RESET_AND_START_TIMER`** (line 1550) and **`STOP_TIMER`** (line 1554) — both handled in `loadScene`
- **`timed_flag` condition** (line 344-347) — checks flag value + timer elapsed >= seconds

So the kitchen explosion chain *should* work end-to-end once PLAY_SECONDARY_MOVIE is implemented. The timer will fire, auto-navigate to S1046, but right now S1046 tries to play the `xdin1` movie (type 53, unimplemented) before triggering LOSE_GAME.

</details>

---

### [8] C analysis — 2026-02-21 03:03:12

**C functions:** `conditions`

<details>
<summary>Full analysis text</summary>

Found the issue. The "See ya' later" button is gated behind `dynQuestions.length > 0` at line 660:

```js
if (dynQuestions.length > 0) {
  // ... create "See ya' later" button
}
```

So it **only appears when there are investigation questions available to ask**. In early game, no questions pass their conditions (you haven't met other NPCs yet), so `dynQuestions` is empty and the goodbye button is hidden.

The fix depends on intent — in the original game, would the goodbye always appear once you've met the NPC, even if there are no questions to ask? That seems right — you should always be able to leave a conversation. The goodbye shouldn't be tied to question availability.

</details>

---

### [9] C analysis — 2026-02-21 03:04:39

**C functions:** `scenes`

<details>
<summary>Full analysis text</summary>

So the variety is on the **NPC side**, not Nancy's side:

- **Nancy** says one fixed goodbye per NPC (ND0d for Daryl, ND0c for Connie, etc.)
- **The NPC** has 3-4 random farewell scenes (different responses/animations each time)

For example, when saying goodbye to Daryl, Nancy always plays `ND0d.wav`, but then one of S3220/S3221/S3222/S3223 loads randomly — each is a different Daryl goodbye reaction. So the system is already implemented to give variety — it's the NPC who has multiple goodbyes, not Nancy.

</details>

---

### [10] C analysis — 2026-02-21 03:05:56

**C functions:** `scenes`

<details>
<summary>Full analysis text</summary>

I see both problems:

**Bug 1 — No goodbye:** The `isInvestigationHub` check works for hub scenes (S101, S201, S301, S401), but when you click an investigation question, it loads the **response_scene** (e.g. S124 for DIC1). That response scene has its own conversation node which is NOT in a hub scene — so `isInvestigationHub` is false there, and the goodbye never shows.

**Bug 2 — Conversation ends after one question:** Same root cause. After asking a question, the response scene loads, its conversation plays, and when it ends it hits Tier 3 (terminal node / has_pop) which pops back to the pre-conversation scene instead of returning to the hub's question list.

The fix: after an investigation question's response scene conversation ends, we need to return to the NPC's hub scene so the player can ask more questions or say goodbye.

</details>

---

### [11] C analysis — 2026-02-21 03:06:10

**C functions:** `continueConv`, `hideConv`, `loadScene`, `popToPreConversationScene`, `showConv`

<details>
<summary>Full analysis text</summary>

Now I understand the full flow. When you click an investigation question:
1. `hideConv()` is called, then `loadScene(q.response_scene)` 
2. The response scene has a CONVERSATION_VIDEO → `showConv()` fires
3. That conversation node is NOT in a hub scene, has no choices, just `has_pop: true`
4. Player clicks Continue → `continueConv()` → `popToPreConversationScene()` → pops back to the non-conversation scene before the whole chain

The fix: when an investigation question response finishes, return to the **hub scene** instead of popping all the way back. I need to modify the investigation question click handler to reload the hub scene after the response scene completes.

</details>

---

### [12] C analysis — 2026-02-21 03:15:40

**C functions:** `again`, `loadScene`, `node`, `scene`

<details>
<summary>Full analysis text</summary>

That looks right. But I wonder — when you say the NPC's welcome plays, do you mean after clicking "See ya' later"? Or do you mean the "See ya' later" button never appears and the conversation just loops back to the NPC greeting?

Let me check if the issue is that returning to the hub after an investigation question is what's happening. The `pendingReturnHub` fix loads the hub scene, which triggers the NPC greeting conversation — that IS the welcome. The goodbye button would appear in that new conversation, but you'd have to click it separately.

Actually, I think the user might be describing this: they ask an investigation question → NPC answers → they click Continue → it returns to the hub → the NPC greeting plays again (the "welcome"). The goodbye issue is separate — they may not have even gotten to click it yet.

Let me think about this differently. The hub scene (e.g. S101) has conversation nodes like d03/d04/d05 which are the NPC's **greeting on subsequent visits**. These are different from the first-meeting node (d1). So when `pendingReturnHub` sends us back to S101, it loads the scene, which auto-fires one of d03/d04/d05 — which IS the NPC's greeting.

The original game probably didn't replay the greeting. It likely went straight back to the question/goodbye menu. The issue is that `loadScene(hub)` replays the entire scene including the greeting conversation.

The fix should be: after an investigation question response, don't reload the whole hub scene — instead, just re-show the conversation choices directly.

</details>

---

### [13] C analysis — 2026-02-18 05:10:20

**C functions:** `exitConversation`, `fails`, `passes`

<details>
<summary>Full analysis text</summary>

The tree looks correct. Let me verify a few important cases:

1. **S101 first visit**: `d1` passes (flag 38 not set → param=1 passes), sets flag 38=2, continues to S3201. 
2. **S101 second visit**: `d1` fails (flag 38 is now 2). `d05` passes if flag 39 not set. Good.
3. **S3201 hub**: 3 choices, no continuation, no pop → choices + "See ya later" shown. "See ya later" calls `exitConversation()` which pops back to diner.
4. **S3207**: `has_pop=true`, no choices, no continuation → Continue button pops back.

Let me check nodes that previously had `continuation_scene` but now shouldn't (where `has_continuation != 1`):

</details>

---

### [14] C analysis — 2026-02-18 05:10:50

**C functions:** `continueConv`, `popToPreConversationScene`, `variants`

<details>
<summary>Full analysis text</summary>

Good. These 11 dead-end response scenes are NPC responses to player choices. After the NPC finishes talking, the player clicks Continue and should pop back to the pre-conversation scene. The current engine handles this correctly — when there's no `pendingConvNav`, `continueConv()` calls `popToPreConversationScene()`.

The 42 non-response dead ends are NPC greeting variants (conditioned by `npc_ref`), which also pop back correctly via the same path.

Let me do a final check on the S221 conditional choice:

</details>

---

### [15] C analysis — 2026-02-18 05:11:16

**C functions:** `Decoder`, `Engine`, `S3201`, `choiceConditionsPass`, `conditions`, `continueConv`, `exitConversation`, `nodes`, `objects`, `popToPreConversationScene`, `scene`, `showConv`

<details>
<summary>Full analysis text</summary>

Here's a summary of all changes made:

### Decoder ([nd1-scene.py](nd1-scene.py))
- **Extract routing flags** at binary offsets 1632-1633: `has_continuation` (0x01 = yes) and `has_pop` (0x01 = pop scene stack)
- **Only emit `continuation_scene`** when `has_continuation == 1` — reduced from 278 to 74 nodes (204 were incorrectly tagged)
- **Added `has_pop: true`** for 34 terminal nodes that should pop back to pre-conversation scene
- **Decode choice sub-conditions** from raw hex to structured objects (`flag_check`/`inventory_check` with `flag_id`, `expected`, `operator`)

### Engine ([engine.js](engine.js))
- **Added `choiceConditionsPass()`** — evaluates choice sub-conditions (flag checks, inventory checks) with AND/OR propagation matching Game.exe.c logic
- **Rewrote `showConv()` with three-tier routing**:
  - Tier 1: Filter choices by sub-conditions, show only visible ones
  - Tier 2: If no visible choices, use unconditional continuation
  - Tier 3: Terminal node — Continue pops back
- **Removed `START_SCENE_ID` sentinel hack** — no longer needed since decoder only emits valid continuations
- **Extracted `popToPreConversationScene()`** — reusable helper for both "See ya later" exit and terminal node Continue
- **"See ya later" now calls `exitConversation()`** which pops directly to the pre-conversation scene (previously called `continueConv()` which could incorrectly follow a continuation)

### Key fixes validated
- **Daryl tree**: S101 → S3201 (3 choices + exit) → branches all route correctly
- **Conditional choice**: S221 choice 2 ("dating Jake?") hidden until `flag[13]==2`
- **Terminal pops**: S3207, S101/d04, and 32 other `has_pop` nodes pop back correctly
- **53 dead-end nodes** (greeting variants + response nodes) handled correctly via pop fallback

</details>

---

### [16] C analysis — 2026-02-18 05:24:01

**C functions:** `conditions`, `conversation`, `done`, `endgame`, `menus`, `nodes`, `scene`, `tree`, `visit`

<details>
<summary>Full analysis text</summary>

Now I have the full picture. Here's how it works:

There are **two mechanisms** for unlocking new questions:

### 1. `npc_ref` conditions on entry nodes (main mechanism)

This is how **most** conversation progression works. Each NPC's entry scene (like S101 for Daryl, S201 for Connie, S301 for Hal, S401 for Hulk) contains **multiple CONVERSATION_VIDEO nodes** with different `npc_ref` conditions. The engine picks the **last one whose conditions pass**.

For example, **Hulk's entry** (S401) has 4 nodes:
- `h1` — first visit (`flag[11] != 2`) → 3 choices hub, sets `flag[11] = 2`
- `h4` — return visit, not done with second conversation yet (`flag[11]==2, flag[12]!=2`)
- `h2` — return visit, second conversation done (`flag[11]==2, flag[12]==2`)
- `h3` — endgame (`flag[96]==2`) → pop (nothing more to say)

The `h4` and `h2` nodes are 0-choice "dead ends" — they're **greetings** that lead nowhere. But here's the catch: `h4` and `h2` have no continuation and no pop. They display NPC text and then Continue just pops back. They're essentially "Hulk says something brief and you leave."

The real question branching happens **within** the first-visit tree (`h1` → response chains → deeper hubs). Once you've visited, the `flag[11]=2` tail entry means you'll get a different greeting next time.

### 2. Choice sub-conditions (rare — only 1 case)

The only instance is S221/c17 (Connie's hub) where choice 2 ("Didn't I hear you were dating Jake?") requires `flag[13]==2`. Flag 13 is set by Hulk's conversation node S437/h37 ("Yes, we've been in a few classes together. I think she was dating Jake Rogers."). So you literally have to hear it from Hulk first.

### The "ask Hulk about Connie" example you mentioned

This actually works through the **first mechanism**. When you talk to Hulk after meeting Connie, some flags will have been set during Connie's conversation (like `flag[19]=2` from S201/c1), and if Hulk's conversation tree has deeper nodes gated by flag 44 (the epilogue/investigation flag), those branches become available. The node S437/h37 (about Connie) has `npc_ref: flag[44]==2`, meaning it only appears once you're in the investigation phase.

In short: the game doesn't dynamically add individual questions to existing menus (with one exception). Instead, it **swaps entire conversation trees** at the entry point based on accumulated flags. The progression is:

> First visit → sets flag → next visit shows different greeting → sometimes with continuation to new hub with new questions → those set more flags → etc.

</details>

---

### [17] C analysis — 2026-02-18 05:25:49

**C functions:** `wrong`

<details>
<summary>Full analysis text</summary>

There it is. Both `h4` and `h2` have `continuation_scene = 3201` in the binary, but `has_continuation = 0x02` (which we now interpret as "no"). The old decoder would have emitted `continuation_scene: 3201` for both, sending the player to **Daryl's hub** (S3201) — which is clearly wrong (that's a different NPC).

But wait — `3201` is also suspicious. Let me check if maybe the continuation_scene field is being used differently than we think, or if there's actually a Hulk-specific hub at a different scene.

</details>

---

### [18] C analysis — 2026-02-18 05:29:03

**C functions:** `branch`, `nodes`, `question`, `unlocking`

<details>
<summary>Full analysis text</summary>

OK, now I have the full picture. Here's what's happening:

The "ask about Connie" question ("How do you know all the other girls at school?") is available on Hulk's **first visit** — it's choice 1 in S302/hd7, which you reach by picking "How did you know I was new here?" from the initial S301/hd1 hub.

There's no gating on it based on meeting Connie — it's **always available** on the first visit. The question isn't really "about Connie" specifically, it's about Hulk knowing all the girls.

On **return visits**, the greeting nodes (hd6, hd2, hd3, hd4) are all dead ends — short one-liners with no choices, no continuation, and no pop. This means:

1. The "girls" question is **first-visit only** — it's part of the initial conversation tree
2. Return visits give a brief greeting and exit — no new questions unlock dynamically
3. The only truly conditional choice in the whole game is S221/c17 (asking Connie about dating Jake, gated by `flag[13]`)

**The issue you're seeing** — the question not showing up — is likely one of two things:

1. **You already talked to Hulk once** (flag 29 is set), so you're getting hd6 ("How's it going") instead of the first-visit tree with choices
2. **Or**: during the first visit, you picked the other branch ("Hulk?") at S301/hd1 which goes to S303 instead of S302, bypassing the "girls" question entirely

The conversation trees are **not** designed for multi-visit progressive unlocking (with the one exception of Connie's Jake-dating question). Each NPC essentially has one deep conversation tree on the first visit, and then short brush-off greetings on subsequent visits until specific story flags change their entry node.

Is this matching what you're experiencing, or are you seeing something different? Can you tell me which scene/NPC you're at when the question doesn't appear?

</details>

---

### [19] C analysis — 2026-02-18 06:22:22

**C functions:** `system`

<details>
<summary>Full analysis text</summary>

I've been deep in the binary analysis. Let me take a pragmatic approach now. The key findings are:

1. The question TEXT is in Game.exe at 0xb1f00 (extracted)
2. The "met NPC" flags are: Daryl=38, Connie=19, Hulk=29, Hal=11
3. The data-driven question system (types 0x38/0x39/0x3a) is **unused** in this game
4. The response routing uses the question ID as the audio file name

Let me build the investigation question system from game knowledge and the data we have. Let me look at all the flags used in the game to map question conditions properly.

</details>

---

### [20] C analysis — 2026-02-18 17:18:51

**C functions:** `CIC10`, `S221`, `S301`, `S3201`, `S401`, `exitConversation`, `hic5`, `present`, `sayGoodbye`, `scene`

<details>
<summary>Full analysis text</summary>

All three bugs are fixed. Here's a summary of the changes:

**Bug 1 — Dynamic questions showing in wrong places:**
- Removed CIC10 ("Didn't I hear you were dating Jake?") — it was a duplicate of an existing static choice in S221/c17 with proper `flag[13]==2` gating
- Changed CIC5, hdic5, and hic5 (locker combination questions) from requiring the NPC's own met flag to requiring `MET_FLAGS.daryl` — prevents them from appearing when you haven't progressed far enough
- Added `INVESTIGATION_HUB_SCENES` map — questions now only inject into S3201 (Daryl), S221 (Connie), S301 (Hulk), S401 (Hal)
- Added first-meeting detection: if a node's tail_entries set the NPC's met flag, it's a first-meeting node and questions are suppressed

**Bug 2 — "See ya later" everywhere:**
- Removed the blanket "See ya later" injection from all conversation nodes
- Now only appears when dynamic investigation questions are present (i.e., in hub scenes with available questions)

**Bug 3 — Goodbye audio not playing:**
- Added `FAREWELL_DATA` with Nancy's goodbye audio IDs (nd0d, nd0c, nd0h, nd0hl) and NPC farewell scene pools
- Added `sayGoodbye(npcPrefix)` — plays Nancy's audio, waits for it, then loads a random NPC farewell scene (which has `has_pop` and will naturally pop back to the pre-conversation location)
- "See ya later" button now calls `sayGoodbye()` instead of the silent `exitConversation()`

</details>

---

### [21] C analysis — 2026-02-18 19:47:46

**C functions:** `AddResponse`, `Always`, `CifTree`, `Decoder`, `Engine`, `Hulk`, `Kill`, `Questions`, `array`, `audio`, `conditions`, `correct`, `correctly`, `decoder`, `engine`, `entries`, `evaluation`, `executable`, `flags`, `json`, `list`, `loader`, `node`, `operations`, `options`, `pointer`, `progression`, `routing`, `runtime`, `says`, `scene`, `scenes`, `table`, `text`

<details>
<summary>Full analysis text</summary>

Here's the comprehensive prompt:

---

# Nancy Drew: Secrets Can Kill (1998) — Web Engine Reimplementation

## Project Overview

We are reimplementing the original 1998 Nancy Drew: Secrets Can Kill point-and-click adventure game as a browser-based web application. The game's assets and logic come from two primary sources that work together at runtime but store conversation data in fundamentally different ways.

## Architecture: Two Sources of Conversation Data

### Source 1: CifTree.dat (Static Dialogue Trees)

The game's asset archive `CifTree.dat` contains 588 scene files. Our Python decoder (`nd1-scene.py`) extracts these into `nd1_scenes.json`. Among the scene types, **278 scenes contain `CONVERSATION_VIDEO` nodes** — these are the static, pre-authored dialogue trees.

Each conversation node is a 1692-byte fixed header containing:
- **NPC text** — what the NPC says (displayed + audio reference)
- **Node ID** — e.g., `d02`, `c17`, `hd1` (prefix identifies the NPC: d=Daryl, c=Connie, hd=Hulk, h=Hal)
- **Choices** — up to N player response options (474 bytes each), each with:
  - Display text (what Nancy says)
  - Target node (audio ID for Nancy's line)
  - Response scene (where to navigate)
  - **Sub-conditions** — 5-byte condition entries that gate whether this choice is visible: `[type, flag_id_lo, flag_id_hi, expected_value, operator]`. Type 0x01 = flag check, 0x02 = inventory check.
- **Continuation scene** (offset 1632 has a `has_continuation` flag) — if set, the node auto-advances to the next scene with no player input
- **Pop flag** (offset 1633, `has_pop`) — if set, the node is terminal and pops back up the scene stack
- **Tail entries** — flag-set operations (auto-applied when the node displays) and `npc_ref` entries (conditions that determine WHICH node in a scene plays, based on flag state)

**The CifTree dialogue trees are structural/static.** They define: "NPC says X, player can choose A/B/C, choice A leads to scene Y." The branching is fixed — the tree shape doesn't change. The only dynamic element is **choice sub-conditions** (e.g., choice #2 in node c17 has condition `flag[13]==2`, so it only appears after a specific flag is set).

**Three-tier routing** (extracted from decompiled Game.exe):
1. **Tier 1:** Show choices whose sub-conditions pass → player picks one
2. **Tier 2:** If no choices, use unconditional continuation → auto-advance
3. **Tier 3:** If no continuation, pop the scene stack → return to previous location

### Source 2: Game.exe (Dynamic Investigation Questions)

**Completely separate from CifTree**, the game executable contains ~44 investigation questions that are **injected at runtime** into NPC conversation hubs. These questions do NOT exist in any scene file — they are hardcoded in Game.exe's `.data` section.

**What they are:** When Nancy returns to talk to an NPC after progressing in the investigation, a set of context-sensitive questions appear alongside the static dialogue choices. For example, after meeting Hulk, returning to Daryl's hub adds "How well do you know Hulk Sanchez?" as a clickable option. After discovering evidence in Jake's locker, new accusation-style questions unlock.

**Where the text lives:** Question display text is at raw file offset `0xb1f00` (VA `0x4b1f00`) in Game.exe's `.data` section. Format: `<c1>W<c0>hat do you know about...` with color/highlight markup. We extracted all 44 question strings.

**How they work at runtime (from decompiled Game.exe):**
- `thunk_FUN_00457b50` (Game.exe.c ~line 36806) iterates over question entries (430 bytes / 0x1AE each) from NPC data structures
- Each question entry has: a condition count, condition pointer (5-byte conditions using the same format as choice sub-conditions), response data, question text reference, and an action type
- The condition evaluator `FUN_00458284` checks each 5-byte condition against the game's flag array (`DAT_004fd3fc`) or inventory array (`DAT_004fd37f`)
- Questions whose conditions ALL pass get added to the conversation's choice list at the hub node
- A "See ya later" exit option is also dynamically added

**Key discovery: The data-driven question loading system is UNUSED in this game.** Action types 0x38/0x39/0x3a (which would load NPC question data from scene files) exist in the code but zero scene files contain these action types. The NPC data table (`DAT_00514df9`) is in BSS (zero-initialized). This means the ~44 questions and their conditions are set up entirely through hardcoded logic in Game.exe, not through any data file we can extract.

### The Critical Difference

| Aspect | CifTree (Static) | Game.exe (Dynamic) |
|--------|------------------|---------------------|
| **Storage** | Scene files in CifTree.dat | Hardcoded in Game.exe binary |
| **Extractable?** | Yes — our decoder handles these | Partially — text yes, conditions need RE |
| **When shown** | Always (structural tree) | Only when flag conditions pass |
| **Branching** | Fixed tree shape | Questions appear/disappear based on game state |
| **Examples** | "Is it that obvious?" / "Out of control?" (Connie's first conversation) | "How well do you know Hulk Sanchez?" (appears after meeting Hulk) |
| **In our JSON** | Full data in `nd1_scenes.json` | Must be manually defined in `engine.js` |

## What We've Built So Far

### Decoder (`nd1-scene.py`)
- Extracts all 588 scenes from CifTree.dat
- Decodes CONVERSATION_VIDEO nodes: NPC text, choices, choice sub-conditions, continuation/pop flags, tail entries
- Outputs `nd1_scenes.json` with full scene graph

### Engine (`engine.js`)
- Renders scenes (backgrounds, hotspots, NPC sprites, panoramic scrolling)
- Conversation UI with three-tier routing (choices → continuation → pop)
- Choice sub-condition evaluation (flag checks, inventory checks, AND/OR operators)
- NPC node selection via `npc_ref` tail entries
- Flag/inventory state management
- Investigation hub detection — dynamic questions only inject into known hub scenes (S3201/Daryl, S221/Connie, S301/Hulk, S401/Hal) and not during first-meeting nodes
- "See ya later" only appears alongside dynamic investigation questions
- Farewell system — goodbye audio (nd0d/nd0c/nd0h/nd0hl) + random NPC farewell scene

### Investigation Questions (Current State — Partially Correct)
We extracted 44 question display texts from Game.exe and built an `INVESTIGATION_QUESTIONS` table in engine.js with entries for each NPC (13 Daryl, 8 Connie, 6 Hulk, 7 Hal). Each entry has:
- `id` — audio ID (e.g., DIC1, CIC1, hdic1, hic1)
- `text` — question display text
- `conditions` — array of `{flag_id, expected}` checks
- `response_scene` — scene to load for the NPC's answer

**The conditions are the problem.** We assigned conditions based on educated guesses from the question text context:
- "How well do you know Hulk Sanchez?" → condition: met Hulk (flag 29 == 2)
- "Connie lied about dating Jake" → condition: flag 24 == 2 (guessed)
- "I saw Jake's tape, Daryl" → condition: flag 40 == 2 (guessed)

Some of these are likely correct (the "met NPC" ones are reasonable). But many of the story-progression flags (13, 17, 22, 23, 24, 27, 32, 33, 35, 36, 37, 40) were assigned by inferring from question text, not from the actual binary data. **We don't know the real conditions.**

## What Still Needs to Be Done

### 1. Extract Real Conditions from Game.exe (Primary Blocker)

The 5-byte condition entries for each question are somewhere in Game.exe — either as inline data near the question setup code, or as byte arrays passed to AddResponse-style functions. We need to:

- Find the functions that set up each NPC's question list (likely 4 setup functions, one per NPC)
- Extract the actual condition bytes: `[type, flag_id_lo, flag_id_hi, expected, operator]`
- Map each condition to our flag system
- Some questions may have multiple conditions (AND/OR chains)

**Known reference points in Game.exe.c:**
- `thunk_FUN_00457b50` (~line 36806) — iterates question entries, calls condition evaluator
- `FUN_00458284` (~line 81142) — the condition evaluator itself
- Question text at VA `0x4b1f00` (raw offset `0xb1f00`)
- `thunk_FUN_0041d570` (~line 22993) — master action record loader (loads NPC names/data into table at `DAT_00514dc7`, 0x99 bytes per entry)
- `thunk_FUN_004560e0` (~line 39033) — NPC data loader for action types 0x38/0x39/0x3a (UNUSED but shows the data structure)

**What we need to find:** The code path that calls AddResponse (or equivalent) for each of the 44 questions, passing the condition data. This is likely in NPC-specific initialization functions called during conversation setup.

### 2. Verify Response Scene Mappings

Each question navigates to a response scene (e.g., DIC1 → S126). These were assigned based on proximity in the binary data and contextual matching. Some may be wrong. The response scenes should be verifiable by:
- Playing each scene in our engine and checking if the NPC audio matches the expected response
- Cross-referencing with the decompiled conversation processing code

### 3. Flag Semantics Map

We have partial knowledge of what each flag means:
- Flags 11, 19, 29, 38 = "met" flags for Hal, Connie, Hulk, Daryl
- Flag 40 = likely related to Jake's locker/video tape discovery
- Flags 13, 17, 22, 23, 24, 27, 32, 33, 35, 36, 37 = story progression (specific meanings uncertain)

A complete flag-to-meaning mapping would let us verify all conditions. This could be built by:
- Examining all `EVENTFLAGS` actions in nd1_scenes.json (which scenes set which flags)
- Tracing flag checks in conversation choice sub-conditions
- Cross-referencing with Game.exe's flag usage

### 4. Testing & Validation

Once conditions are correct, validate each NPC's full conversation tree:
- First meeting flows correctly (no dynamic questions, no "See ya later")
- Return visits show appropriate static choices + only the investigation questions that should be available at that point in the game
- Farewell audio plays correctly
- Response scenes load and play the right NPC dialogue
- Terminal nodes pop back correctly

## Key Files

| File | Description |
|------|-------------|
| `/Users/bachman/Desktop/Projects/nd/engine.js` | Web game engine (JavaScript) |
| `/Users/bachman/Desktop/Projects/nd/nd1-scene.py` | CifTree decoder (Python) |
| `/Users/bachman/Desktop/Projects/nd/nd1_scenes.json` | Extracted scene data |
| `/Users/bachman/Desktop/Projects/nd/Game.exe.c` | Decompiled game executable (~100k lines) |
| `/Users/bachman/Desktop/Projects/nd/SCK-ISO/Game/Game.exe` | Original game binary |
| `/Users/bachman/Desktop/Projects/nd/nd1_extracted/` | 632 extracted CifTree files |

---

That covers everything. The core unsolved problem is: **the conditions on each dynamic investigation question are guesses, not ground truth from the binary.** The question text and response scenes are likely correct, but without the real condition data, questions will appear at wrong times during gameplay.

</details>

---

### [22] C analysis — 2026-02-18 21:20:46

**C functions:** `added`, `conditions`, `constant`, `corrected`, `scenes`

<details>
<summary>Full analysis text</summary>

All tasks complete. Here's a summary of what was done:

## Complete Investigation Questions Extraction

I reverse-engineered the real investigation question conditions from the Game.exe binary for all 4 NPCs. Here's what changed:

### Architecture Discovery
- Found **4 separate question injector functions** in the binary, one per NPC:
  - Daryl: `FUN_00443B10` (18 questions)
  - Connie: `FUN_00445140` (10 questions) 
  - Hal: `FUN_00445CA0` (9 questions)
  - Hulk: `FUN_004466E0` (9 questions)
- These were called via **function pointer tables** through thunk stubs at `0x65E`/`0x65F` byte offsets in the conversation data
- The Connie/Hulk/Hal functions were **not decompiled by Ghidra** (unreachable entry points via indirect calls), so I extracted conditions directly from the raw x86 binary

### Changes to engine.js (46 questions, up from 35)

**New questions added (11):**
- Daryl: DIC8, DIC9, DIC11, DIC13
- Connie: CIC7, CIC10
- Hulk: hdic2, hdic4, hdic6
- Hal: hic2, hic7

**Corrected response scenes (almost all were wrong):**
- Daryl: DIC1→S124, DIC2→S127, DIC5→S132, DIC7→S139, DIC10→S144, DIC14→S151
- Connie: CIC2→S234, CIC3→S235, CIC4→S236, CIC5→S237, CIC6→S238, CIC8→S240, CIC9→S245
- Hulk: All scenes corrected (S333, S336, S339-S345)
- Hal: All scenes corrected (S435, S437-S444, S446)

**Corrected conditions (all replaced with real binary data):**
- Each question now has the exact flag conditions from the binary, including **availability flags** (flags 55-58, 102-121) that prevent questions from reappearing after being asked
- Removed unused `MET_FLAGS` constant (code uses `NPC_MET_FLAG` instead)

</details>

---

### [23] C analysis — 2026-02-18 21:57:49

**C functions:** `Hulk`, `actions`, `entries`

<details>
<summary>Full analysis text</summary>

The problem was that `INVESTIGATION_HUB_SCENES` was pointing to the wrong scenes for Connie and Daryl:

- **Daryl**: Was `S3201` (the continuation scene from his first meeting greeting). Should be **`S101`** which is the actual hub containing both `d1` (first meeting, sets flag 38=2) and `d03`/`d04`/`d05` (subsequent visit greetings).

- **Connie**: Was `S221` (a deeper dialogue branch node). Should be **`S201`** which is the actual hub containing both `c1` (first meeting, sets flag 19=2) and `c29`/`c30`/`c31` (subsequent visit greetings).

Hulk (S301) and Hal (S401) were already correct - they follow the same `S*01` pattern. The `setsMetFlag` detection still works correctly because only the first-meeting actions (`d1`, `c1`) have `type: "flag"` entries in their tail, while the subsequent-visit actions use `type: "npc_ref"` entries (which are conditions, not flag sets).

</details>

---

### [24] C analysis — 2026-02-18 22:49:59

**C functions:** `area`, `stopTimer`, `wasted`

<details>
<summary>Full analysis text</summary>

Phase 1 is done. Now I also need to stop the timer checks when navigating away from a timed scene. Let me make sure `stopTimer` is called on scene transitions when the timer isn't needed. Actually, the timer should persist across scene changes within the same area (e.g., kitchen scenes). The `STOP_TIMER` action in specific scenes handles cleanup. The periodic check already re-evaluates the current scene's actions, so navigating to a non-timed scene won't trigger anything. But I should clear the interval when the timer is stopped to avoid wasted checks. That's already handled in `stopTimer()`.

Let me now move to Phase 2: LOSE_GAME and WIN_GAME.

</details>

---

### [25] C analysis — 2026-02-18 23:00:20

**C functions:** `PUZZLE_DATA`, `S1620`, `S5000`, `S5001`, `S5002`, `S501`, `S647`, `button`, `loadSavedGame`, `scenes`, `seconds`, `startTimerChecks`

<details>
<summary>Full analysis text</summary>

All 4 phases are implemented. Here's a summary of what was added:

**Phase 1 — Timer System:**
- Added `timerActive`/`timerStartTime` to state, `timerCheckInterval` for periodic checks
- Fixed `timed_flag` in `evalCond` to require both flag match AND elapsed time >= seconds (prevents instant explosions)
- `RESET_AND_START_TIMER` / `STOP_TIMER` action handlers in loadScene
- `startTimerChecks()` runs every 2s, re-evaluating timed SCENE_CHANGE actions in the current scene

**Phase 2 — Game Endings:**
- `LOSE_GAME` / `WIN_GAME` action handlers show a full-screen overlay
- Game over overlay with title, message, and "Play Again" button (reloads page)
- Canvas click blocked while overlays are active

**Phase 3 — Puzzle Stubs:**
- 9 puzzle scenes mapped in `PUZZLE_DATA` with corrected back/success scenes (verified from scene data):
  - S5000 (Jake's Locker) → S1426, S5001 (Boiler Chain) → S2076, S5002 (Boiler Levers) → S2080
  - S50/S51 (Boiler Door Keypad) → S2061, S56 (Aunt's Safe) → S57
  - S1620 (Computer Login) → S1622, S647 (Slider) → S645, S501 (Telephone) → back only
- Puzzle overlay with "Solve Puzzle" (sets flags + navigates to success scene) and "Go Back" buttons
- Handles all 6 puzzle types + scenes without puzzle actions but in PUZZLE_DATA (like S50)

**Phase 4 — Save/Load:**
- `SAVE_CONTINUE_GAME` action handler serializes flags, inventory, scene to localStorage
- On init, if save exists, shows Continue/New Game dialog
- `loadSavedGame()` restores full state

</details>

---

### [26] C analysis — 2026-02-18 23:19:33

**C functions:** `underneath`, `visible`

<details>
<summary>Full analysis text</summary>

The fix: `EVENTFLAGS_MULTI_HS` now auto-executes when the matching frame is visible (just like regular `EVENTFLAGS`), instead of being registered as a clickable hotspot. The frame regions just determine *which frames* trigger the flag, not click targets.

This means:
- Flag 44=2 (game clock → evening) will automatically set when you view the right frame
- The navigation hotspots underneath (books, objects, puzzle entries) are no longer blocked and will be clickable
- The "F44=2" debug labels will no longer appear as hotspot overlays

</details>

---

### [27] C analysis — 2026-02-18 23:27:14

**C functions:** `hotspot`

<details>
<summary>Full analysis text</summary>

This is very revealing. The Game.exe.c shows type 106 is a **multi-step state machine** with embedded sub-hotspots — way more complex than just flag setting. But the key practical issue is simpler: `EVENTFLAGS_MULTI_HS` hotspots often overlap with scene change hotspots, and our `hitTest` only returns one. Let me look at how the hotspot ordering works.

The real fix: when *any* hotspot is clicked, first apply flags from all overlapping `EVENTFLAGS_MULTI_HS` at that point, then process the primary non-flag hotspot (scene change, map, NPC). This handles both directions of overlap.

</details>

---

### [28] C analysis — 2026-02-18 23:28:00

**C functions:** `flags`, `hotspot`, `reloads`

<details>
<summary>Full analysis text</summary>

The click handler now works in two passes:

1. **First pass**: Scan ALL `EVENTFLAGS_MULTI_HS` hotspots at the click point and set their flags (flag 44=2, etc.)
2. **Second pass**: Find the primary non-flag hotspot (scene change, map, NPC) at that point and execute it

This handles all overlap scenarios:
- **Scene change on top, EVENTFLAGS underneath**: both fire — flags set AND scene navigated
- **EVENTFLAGS on top, scene change underneath**: both fire — flags set AND scene navigated  
- **Only EVENTFLAGS, no scene change**: flags set, scene reloads (new flags may unlock content)
- **Only scene change, no EVENTFLAGS**: navigates normally

The debug display still shows the `F44=2` labels so you can see where the flag regions are, but they no longer block the underlying scene-change hotspots from being clicked.

</details>

---

### [29] C analysis — 2026-02-18 23:30:44

**C functions:** `S602`, `S603`, `area`

<details>
<summary>Full analysis text</summary>

Now I see the problem clearly. Look at S602 ("Aunts Entry Table, Drawer Closed"):
- `EVENTFLAGS_MULTI_HS` at the drawer area (94,14)-(405,133) — **no overlapping scene change**
- A sound "drwropen" conditioned on flag 44=2
- An exit hotspot at the bottom back to S601

In the original game, clicking the drawer via the type 106 state machine transitions to S603 ("drawer open"). But that transition target is embedded in binary data we're not decoding. The `hitTestPrimary` finds nothing because there IS no scene change hotspot there.

Let me check how nd1-scene.py decodes type 106 — the transition target might be in the binary data we're skipping.

</details>

---

### [30] C analysis — 2026-02-18 23:43:15

**C functions:** `before`, `exist`, `offset`, `there`

<details>
<summary>Full analysis text</summary>

The fix is in. Now when you click an EVENTFLAGS_MULTI_HS hotspot with no overlapping scene-change hotspot:

1. It sets the flags as before (e.g. flag 44 = 2)
2. It checks which flag was set — if it's flag 44-47, it computes the scene offset (F44→+1, F45→+2, F46→+3, F47→+4)
3. It adds that offset to the current scene number to get the target scene
4. If the target scene exists, it navigates there (e.g. S602 → S603, drawer closed → drawer open)
5. If the target doesn't exist (the ~8 flag-only cases), it reloads the current scene as before

Try clicking those hotspots now — drawers, magazines, the safe, etc. should all navigate to their open/detail views.

</details>

---

### [31] C analysis — 2026-02-18 23:59:23

**C functions:** `EVENTFLAGS_MULTI_HS`, `S603`, `S607`, `normally`, `stay`

<details>
<summary>Full analysis text</summary>

Now I have a clear picture. The key findings:

1. **S603 (drawer open) has NO SCENE_CHANGE back to S602** — the back-navigation is purely through EVENTFLAGS_MULTI_HS
2. **S606's EVENTFLAGS just plays a drape sound** — S607 (a picture) is NOT the tapestry's target. The safe is reached via S626 through a separate path.
3. **All "open" scenes lack EXIT hotspots** while "closed" (base) scenes have them — this is the toggle pattern

The correct behavior is a toggle:
- **Forward**: If you arrived normally (via SCENE_CHANGE), clicking EVENTFLAGS goes to scene+1 (but ONLY if scene+1 also has EVENTFLAGS_MULTI_HS — confirming it's a pair)
- **Backward**: If you arrived via EVENTFLAGS, clicking goes BACK to the source scene
- **Stay**: If scene+1 doesn't have EVENTFLAGS_MULTI_HS (like S606→S607), just set flags and stay (plays sound)

Let me implement this.

</details>

---

### [32] C analysis — 2026-02-19 00:00:23

**C functions:** `S602`, `S603`, `S606`

<details>
<summary>Full analysis text</summary>

Now the EVENTFLAGS_MULTI_HS toggle logic works as follows:

- **S602 (drawer closed)**: Arrived via SCENE_CHANGE from S601, so `enteredViaEventFlags = false`. Click EVENTFLAGS → check S603 has EVENTFLAGS_MULTI_HS → yes → navigate forward to S603 with `enteredViaEventFlags = true`.
- **S603 (drawer open)**: `enteredViaEventFlags = true`. Click EVENTFLAGS → go back to S602.
- **S606 (tapestry)**: Arrived via SCENE_CHANGE from S601, so `enteredViaEventFlags = false`. Click EVENTFLAGS → check S607 has EVENTFLAGS_MULTI_HS → **no** (S607 has only an EXITSCENE) → stay on scene, just sets flags and plays the drape sound.

Try it now — the drawer should toggle open/closed correctly, and the tapestry should just play a sound without navigating to the wrong scene.

</details>

---

### [33] C analysis — 2026-02-19 02:34:34

**C functions:** `EVENTFLAGS_MULTI_HS`, `playSound`

<details>
<summary>Full analysis text</summary>

Now I see three issues clearly:

1. **Sound not playing**: Line 919 — `if (!isSameScene) playSound(...)` skips sounds on same-scene reload. Also, EVENTFLAGS-triggered sounds should play during the click, not on scene load.
2. **S622 book**: S623 doesn't have EVENTFLAGS_MULTI_HS (just an EXIT back to S622), so our pair check fails.
3. **S606 tapestry**: Correctly shouldn't navigate to S607, but the drape sound should play.

Let me read the action processing loop to understand how conditions flow, then fix all three issues.

</details>

---

### [34] C analysis — 2026-02-19 02:35:44

**C functions:** `immediately`, `isEventFlagSound`, `safe`

<details>
<summary>Full analysis text</summary>

Here's a summary of the three fixes:

1. **Sounds now play on click**: After setting EVENTFLAGS flags, the click handler scans the current scene for conditioned `PLAY_DIGI_SOUND` actions and plays them immediately (drawer open/close sounds, drape sound, etc.)

2. **No wrong sounds on scene load**: `isEventFlagSound()` detects sounds whose conditions match an EVENTFLAGS_MULTI_HS in the same scene, and skips them during `loadScene`. This prevents e.g. the "close" sound playing when entering the open-drawer scene.

3. **Broader pair detection**: The pair check now accepts scene N+1 if it either has `EVENTFLAGS_MULTI_HS` (like S603) OR has an exit back to scene N (like S623 which has `HOT_1FR_EXITSCENE` → S622). This fixes the book interaction.

For the **tapestry/safe** question: S606 correctly stays put now (no pair at S607). The drape sound should play. The path to the safe (S56) goes through S626, which is a separate scene reached after solving the safe puzzle — I'll need to investigate how the first-time access to S56 works, as it doesn't appear directly linked from S601 or S606 in the scene data.

</details>

---

### [35] C analysis — 2026-02-19 02:44:27

**C functions:** `SCENE_CHANGE`, `fires`, `nothing`, `selection`

<details>
<summary>Full analysis text</summary>

The difficulty selection (S5) uses EVENTFLAGS_MULTI_HS! That's the problem. When you click "Junior Detective":
1. Sets flag 44=2
2. No pair at S6 → my code now just does nothing (I removed the scene reload!)
3. The DIFFICULTY_LEVEL and SCENE_CHANGE actions never re-evaluate

The scene reload was critical — it re-evaluates conditions so the DIFFICULTY_LEVEL fires (sets flag 47=2) and then SCENE_CHANGE (conditioned on flag 47=2) navigates to S60.

I need to restore the scene reload for the "no pair" case:

</details>

---

### [36] C analysis — 2026-02-19 02:45:05

**C functions:** `fires`, `sounds`

<details>
<summary>Full analysis text</summary>

Two fixes:

1. **Difficulty selection restored**: The scene reload is back for the "no pair" case. When you click Junior Detective in S5, it sets flag 44=2, reloads S5 → DIFFICULTY_LEVEL fires (sets flag 47=2) → SCENE_CHANGE fires → navigates to S60.

2. **`isEventFlagSound` condition type fixed**: Was checking `c.type === 'flag'` but the actual condition type in the JSON is `'flag_check'`. This means the EVENTFLAGS-triggered sounds (drawer open/close, drape, etc.) are now properly skipped on scene load, preventing wrong sounds from playing.

</details>

---

### [37] C analysis — 2026-02-19 03:09:04

**C functions:** `S601`, `S606`, `S626`, `away`, `reference`

<details>
<summary>Full analysis text</summary>

Here's what I found about the safe puzzle:

## Safe Puzzle Path

The complete chain is:
```
S601 (Aunt's Entry) → S606 (Tapestry Closeup) → ??? → S626 (Tapestry Behind Safe) → S56 (Safe Puzzle) → S57 (Inside Safe)
```

**The critical gap**: S626 (showing the tapestry pulled back, safe visible) is only reachable from S57 (inside the safe — after solving!). And S56 is only reachable from S626. That's circular. The EVENTFLAGS_MULTI_HS click in S606 is meant to navigate to S626, but our code can't find the link because S626 is 20 scenes away (not +1).

In the original engine, scenes have an internal counter order that differs from the scene ID numbers. S626 is likely the "next" scene after S606 in that internal order, even though numerically they're 20 apart.

## The Puzzle Itself

S56 contains an `ORDERING_PUZZLE` (type 108) — a 621-byte binary blob that's not decoded. Currently we have a stub "Solve" button. The binary contains an asset reference ("APSafe02") but the ordering sequence and success data are still embedded in the raw bytes.

Let me dig into the binary to decode the actual puzzle data and fix the S606→S626 navigation.

</details>

---

### [38] C analysis — 2026-02-19 03:24:35

**C functions:** `Decoded`, `S606`, `S626`, `edge`, `pass`

<details>
<summary>Full analysis text</summary>

Excellent findings. Here's the complete picture:

## Ordering Puzzle Decoded (621 bytes)

The binary structure is fully reverse-engineered:

**S56 (Aunt's Safe)**:
- 12 buttons in a 4x3 grid
- **Combination**: buttons [4, 3, 5, 8]
- Click sound: "harp01", Success sound: "fullharp"
- **Success**: navigate to S57, set flag 41=2
- **Exit/Back**: navigate to S626 (tapestry/safe view)
- Exit hotspot: left edge (0,0)-(91,291)

**S51 (Boiler Keypad)**:
- **Combination**: buttons [3, 2, 0, 7]
- Click sound: "beep01", Success sound: "boildrop"  
- **Success**: navigate to S1460, set flag 59=2
- **Exit/Back**: navigate to S1457

## Critical Discovery: EVENTFLAGS_MULTI_HS Never Navigates

In the original engine, type 106 **only sets flags** — it does NOT trigger scene changes. After flags are set, the main loop re-evaluates all actions on the current scene. Conditioned SCENE_CHANGE actions then fire if their conditions now pass (like S5's difficulty selection).

This means our N+1 pair heuristic is a workaround. It works for ~65 of 98 cases but is wrong for 33 "in-place only" scenes.

## The S606→S626 Gap

S56's exit_scene = 626 confirms S626 is the tapestry/safe area. But S626 is only reachable from S57, and S56 is only reachable from S626 — circular. There must be a first-time path from S606 (tapestry closeup) to S626 that we can't fully trace in the decompiled code. The practical fix is to add this connection.

Let me now update the puzzle data decoder and engine to use the real decoded values, and fix the S606→S626 navigation.

</details>

---

### [39] C analysis — 2026-02-19 03:26:41

**C functions:** `S1460`, `S606`, `S626`

<details>
<summary>Full analysis text</summary>

Here's everything that's done:

**1. Puzzle decoder updated** — `nd1-scene.py` now fully decodes the 621-byte ORDERING_PUZZLE structure: button hitboxes, correct sequence, click/success sounds, success scene + flag, exit scene + flag, exit hotspot.

**2. JSON regenerated** — `nd1_scenes.json` now contains the decoded puzzle data:
- **S56 (Safe)**: sequence [4,3,5,8], success→S57, flag 41=2, exit→S626
- **S51 (Boiler Keypad)**: sequence [3,2,0,7], success→S1460, flag 59=2, exit→S1457

**3. PUZZLE_DATA corrected** — S51's success flag updated to {59, 2} and success scene to S1460 (from the binary data). S56's success flag updated to {41, 2}.

**4. S606→S626 navigation** — Clicking the tapestry in S606 now navigates to S626 (the scene showing the tapestry pulled back with the safe visible). From S626, the player can click the safe to enter S56 (the puzzle). The `EVENTFLAGS_NAV` override table handles this non-adjacent transition.

The safe flow now works: S601 → S606 (tapestry) → S626 (behind tapestry) → S56 (safe puzzle) → S57 (inside safe, get key) → S626 (exit).

</details>

---

### [40] C analysis — 2026-02-19 03:57:32

**C functions:** `binary`, `puzzle`

<details>
<summary>Full analysis text</summary>

It depends on the puzzle. Here's a rough breakdown by difficulty:

**Easy to implement:**
- **ORDERING_PUZZLE** (S56 safe, S51 boiler keypad) — We already decoded the full structure: button hitboxes, correct sequence, sounds. It's just "click buttons in order." Could be done with the existing canvas and click handler.
- **PASSWORD_PUZZLE** (S1620 computer login) — Type a password. Needs a text input.
- **TELEPHONE** (S501) — Non-blocking hint system, simplest of all.

**Medium:**
- **ROTATINGLOCK_PUZZLE** (S5000 Jake's locker, S5001 boiler padlock) — Rotating dials to a combination. Need to decode the binary (676 bytes) but the interaction is straightforward.
- **LEVER_PUZZLE** (S5002 boiler levers) — Toggle levers into correct positions. 

**Hardest:**
- **SLIDER_PUZZLE** (S647) — Classic 15-puzzle with sliding tiles. The game logic itself is well-known, but we'd need to decode 215 bytes of binary data to get tile layout, sprite info, and the solved state. Rendering animated tile movement on our canvas adds complexity.

Want me to start implementing them? The ordering puzzle (keypad) is the natural first choice since the data is already fully decoded — I could build the actual interactive version with clickable buttons, sequence tracking, and sounds right on the game canvas.

</details>

---

### [41] C analysis — 2026-02-19 04:36:40

**C functions:** `rects`

<details>
<summary>Full analysis text</summary>

All interactive puzzle implementations are complete. Here's a summary of what was done across this and the previous session:

**Decoded binary structures** in [nd1-scene.py](nd1-scene.py) for all puzzle types:
- **ORDERING_PUZZLE** (0x6C): buttons, correct sequence, success/exit scenes+flags
- **ROTATINGLOCK_PUZZLE** (0x72): 4 dials, combination, up/down click rects
- **PASSWORD_PUZZLE** (0x76): valid passwords, success/fail/exit scenes+sounds
- **LEVER_PUZZLE** (0x73): 3 levers × 4 states, initial states, solution
- **TELEPHONE** (0x74): 12 keypad buttons, 14 phone directory entries

**Implemented interactive handlers** in [engine.js](engine.js):
- **Rotating Lock** (S5000 Jake's Locker `[5,2,5,3]`, S5001 Boiler Padlock `[1,9,6,7]`): Click up/down arrows to change digits, auto-checks solution
- **Password** (S1620 Computer Login): Type `ELOISE DREW` or `O WISE ELDER` + Enter, animated cursor blink
- **Lever** (S5002 Boiler Levers, solution `[3,0,2]`): Click upper/lower half to cycle 4 positions
- **Telephone** (S501): Full keypad with digit display, phone directory lookup, formatted text responses

**Fixes applied this session:**
- Scaled ROTATINGLOCK font to fit 18px-wide dial rects (was 48px)
- Added cursor blink animation timer for PASSWORD_PUZZLE
- Proper cleanup of keyboard listeners and intervals in all exit paths

</details>

---

### [42] C analysis — 2026-02-19 04:36:49

**C functions:** `S1613`, `S1621`, `S1622`, `data`, `login`

<details>
<summary>Full analysis text</summary>

The background agent from the previous session confirmed all our PASSWORD_PUZZLE decoding is correct. Interesting detail from the deeper analysis: it's actually a **two-field** login (username "ELOISE DREW", then password "O WISE ELDER"), and there are **three** exit paths:

- **Success** → S1613 (back to lounge, logged in), sound "fullharp"
- **Wrong** → S1621 (wrong password response), sound "squack2"  
- **Timeout** → S1622 (screensaver/idle)

Our current implementation simplifies this to a single text field that accepts either password, which works fine for gameplay. The timeout exit is the `exit_scene` in our decoded data (S1613 mapped as exit, S1622 as success — though the agent's analysis shows the naming was swapped). Let me verify our mapping is correct:

</details>

---

### [43] C analysis — 2026-02-19 04:37:47

**C functions:** `Keypad`, `Locker`, `Login`, `Padlock`, `Safe`, `block`, `second`, `third`

<details>
<summary>Full analysis text</summary>

Our mapping is correct! The first exit block (S1622 "Welcome Eloise") with "fullharp" is the success path, the second (S1621 with "squack2") is the wrong answer, and the third (S1613) is the exit/cancel. The agent just labeled them differently. Our decoder and implementation match the correct game behavior.

All interactive puzzles are now implemented and verified:

| Scene | Puzzle | Solution | Status |
|-------|--------|----------|--------|
| S56 | Aunt's Safe (ordering) | Button sequence from binary | Done |
| S51 | Boiler Keypad (ordering) | Button sequence from binary | Done |
| S5000 | Jake's Locker (rotating lock) | 5-2-5-3 | Done |
| S5001 | Boiler Padlock (rotating lock) | 1-9-6-7 | Done |
| S5002 | Boiler Levers | 3-0-2 (DOWN, UP, MID-DN) | Done |
| S1620 | Computer Login (password) | "ELOISE DREW" / "O WISE ELDER" | Done |
| S501 | Telephone | 14 directory entries with text | Done |
| S647 | Slider Puzzle | Skipped per request | Stub only |

</details>

---

### [44] C analysis — 2026-02-19 05:11:52

**C functions:** `grid`, `sheet`

<details>
<summary>Full analysis text</summary>

The correct sequence is buttons **[4, 3, 5, 8]** — which on a 4x3 grid (left-to-right, top-to-bottom) maps to:

```
Row 1:  0  1  2  3
Row 2:  4  5  6  7
Row 3:  8  9 10 11
```

So you need to click: **row 2 col 1** → **row 1 col 4** → **row 2 col 2** → **row 3 col 1** (in that order).

In the original game, these buttons have symbols/images on them from the safe's sprite sheet (which we don't have extracted as PNGs). Without seeing the actual button graphics, it's hard to know what they visually represent — but clicking those positions in that order should open the safe and take you to S57.

</details>

---

### [45] C analysis — 2026-02-19 05:47:37

**C functions:** `Current`, `EVENTFLAGS_MULTI_HS`, `Kill`, `LEVER_PUZZLE`, `ORDERING_PUZZLE`, `PASSWORD_PUZZLE`, `ROTATINGLOCK_PUZZLE`, `S1425`, `S1426`, `S1427`, `S1428`, `S1430`, `S5000`, `S5001`, `SLIDER_PUZZLE`, `Star`, `TELEPHONE`, `around`, `back`, `blocks`, `dest_rects`, `digits`, `down_rects`, `drawPuzzleState`, `first`, `getPuzzleClickRects`, `handlePuzzleClick`, `handlers`, `hangup_scene`, `hash`, `hotspot`, `increase`, `node_ids`, `num_dials`, `num_levers`, `num_states`, `onCanvasClick`, `pairs`, `password`, `places`, `play`, `puzzleExit`, `puzzleSuccess`, `records`, `rects`, `setInterval`, `setupLeverPuzzle`, `setupOrderingPuzzle`, `setupPasswordPuzzle`, `setupRotatingLockPuzzle`, `setupTelephone`, `sheets`, `showPuzzle`, `slots`, `sounds`, `state`, `text`, `thunk_FUN_004235d0`, `unused`, `username`, `values`

<details>
<summary>Full analysis text</summary>

Here are your two continuation prompts:

---

## PROMPT 1: Fix EVENTFLAGS_MULTI_HS Navigation

I'm building a browser reimplementation of Nancy Drew: Secrets Can Kill (1998). The engine is in `/Users/bachman/Desktop/Projects/nd/engine.js`, scene data is decoded by `/Users/bachman/Desktop/Projects/nd/nd1-scene.py` into `/Users/bachman/Desktop/Projects/nd/nd1_scenes.json`, and the original decompiled game code is at `/Users/bachman/Desktop/Projects/nd/Game.exe.c`.

### What EVENTFLAGS_MULTI_HS is

Action type `0x6a` in the original engine. These are clickable hotspots that set game flags and (should) trigger navigation. In our engine, they show up with debug labels like `F44=2`. The binary structure is:
- 40 bytes: 10 flag-pair slots (i16 flag_id + i16 value each). Slots with flag_id==-1 are unused (the "unused" slots have consistent default values 2,1,1,2,1,1,1,1,2 and do NOT contain navigation targets).
- u16 frame count at offset 40
- count × 18-byte hotspot frame records (variant, x1, y1, x2, y2)

The EVENTFLAGS_MULTI_HS data does NOT contain a target scene anywhere in its binary structure. Navigation must come from the engine logic itself.

### Current (broken) implementation in engine.js

The click handler is in `onCanvasClick()` around line 1705. When an EVENTFLAGS_MULTI_HS hotspot is clicked:
1. Flags are set from the action data
2. Associated sounds play (PLAY_DIGI_SOUND conditioned on the newly-set flags)
3. If a primary hotspot (HOT_1FR_SCENE_CHANGE etc.) overlaps the click point, navigate to it
4. If NO primary hotspot overlaps, use heuristics:
   - If `state.enteredViaEventFlags` is true, call `back()`
   - Otherwise, check if scene+1 exists and is a "pair" (has EVENTFLAGS_MULTI_HS or an exit back to current scene). If so, navigate to scene+1.
   - If not a pair, reload current scene.

This heuristic is WRONG. The bugs:

**Bug 1** (not EVENTFLAGS — it's a PUZZLE_DATA error): After solving the slider puzzle at Aunt Eloise's (S647), it navigates to S645 but should go to S643. PUZZLE_DATA has `successScene: 'S645'` which is wrong. Looking at the scene data: S643 = "puzzle easy & Med solved" (has exits to S57 and S645), S644 = "puzzle hard solved", S645 = "passport sub-view". Fix: change PUZZLE_DATA S647 successScene to 'S643'.

**Bug 2**: S1428 (Judo Today magazine). Clicking the magazine area hits EVENTFLAGS_MULTI_HS (sets F44=2). There's no primary hotspot overlapping. Scene+1 = S1429, but our `isPair` check fails because S1429 only has `HOT_1FR_SCENE_CHANGE → S1437` (no EVENTFLAGS_MULTI_HS, no exit back to S1428). So the engine just reloads S1428 — nothing visible happens. Should navigate to S1429.

**Bug 3**: S1426 (Upper Locker) and S1427 (Lower Locker). The locker door EVENTFLAGS_MULTI_HS (right side of screen) sets F44=2. Our scene+1 heuristic navigates S1426→S1427 and S1427→S1428. But clicking the door should CLOSE the locker and go to S1425 (closed locker closeup). The door click is a "close" action, not an "open to next scene" action.

**Bug 4**: S1427 newspaper EVENTFLAGS_MULTI_HS at (213,138)-(232,213) sets F44=1 and F45=2. Our engine goes to S1428 (scene+1). Should go to S1430 (newspaper view).

### What we learned from Game.exe.c

The EVENTFLAGS_MULTI_HS runtime handler is `FUN_004235d0` (line 50094). It's a 3-state machine:
- **State 0**: Set `DAT_004d093f = 1` (a "dirty/needs-update" flag), advance to state 1
- **State 1**: Find matching hotspot frame for current variant, store the hotspot rect for click detection
- **State 2** (after click detected): Set all 10 flag pairs (same loop as EVENTFLAGS 0x6b), call cleanup function `thunk_FUN_0041eab0` (line 47877), which resets state to 0

The cleanup function `FUN_0041eab0` does NOT navigate. It just resets the action state. The `DAT_004d093f` flag is checked in many places (lines 60340-60673, 60876) but appears to trigger cursor/animation updates, not navigation.

**Key mystery**: The EVENTFLAGS_MULTI_HS handler does NOT contain any scene-change logic. The navigation must happen through some OTHER mechanism in the game loop — likely the main scene re-evaluation loop that runs after flag changes. We haven't found this mechanism yet.

### Places to look in Game.exe.c

- `FUN_004235d0` (line 50094): The EVENTFLAGS_MULTI_HS state machine handler
- `FUN_0041eab0` (line 47877): The cleanup/reset callback called after flags are set
- `DAT_004d093f` usage: Lines 60340-60673, 60876 — checked in the main game loop when this "dirty" flag is set
- `DAT_004d8fac`: Checked alongside DAT_004d093f in conditions at lines 60340, 60405, 60444, etc.
- The scene action dispatch loop at line 33477 (`case 0x6a: thunk_FUN_004235d0(sVar16)`) and line 45490 (same)
- The main game loop function containing lines 60340-60900 — this is where post-flag-change scene transitions likely happen
- Search for where `DAT_004d0dc6` (current scene variant/frame) is modified, as scene transitions set this

### What needs to be done

1. Fix Bug 1 by changing PUZZLE_DATA S647 successScene from 'S645' to 'S643' in engine.js
2. Figure out the correct EVENTFLAGS_MULTI_HS navigation logic by either:
   a. Finding the scene-change mechanism in Game.exe.c (search around the main game loop, especially where `DAT_004d093f` is checked), OR
   b. Building a practical solution: maybe after setting flags, reload the current scene and check if any SCENE_CHANGE conditions now pass; if not, check if the scene has a HOT_1FR_EXITSCENE that should fire; OR build a manual navigation table for known cases
3. Update the `onCanvasClick` EVENTFLAGS_MULTI_HS handler in engine.js with the correct logic
4. Test all four bug cases

---

## PROMPT 2: Interactive Puzzle Implementation Status

I'm building a browser reimplementation of Nancy Drew: Secrets Can Kill (1998). The engine is in `/Users/bachman/Desktop/Projects/nd/engine.js`, scene data is decoded by `/Users/bachman/Desktop/Projects/nd/nd1-scene.py` into `/Users/bachman/Desktop/Projects/nd/nd1_scenes.json`.

### What was done

We decoded the binary structures for all puzzle types from the scene .bin files and implemented interactive puzzle handlers in engine.js. The puzzle system uses a shared `activePuzzle` state object with a `type` field, dispatching to type-specific setup/draw/click handlers.

### Puzzle types implemented

**ORDERING_PUZZLE (type 0x6C, scenes S56 and S51)**
- Binary: buttons array with x1/y1/x2/y2 rects, correct_sequence array, sequence_length, click/success sounds, success/exit scenes+flags, exit_hotspot
- Implementation: `setupOrderingPuzzle(act)` / click handler in `handlePuzzleClick`. Player clicks buttons in sequence order. Pressed buttons highlight yellow. When sequence_length buttons are pressed, checks against correct_sequence. Green flash + success sound on correct, red flash + reset on wrong.
- S56 (Aunt's Safe): correct sequence [4,3,5,8] on a 4×3 grid, success→S57
- S51 (Boiler Keypad): success→S1460

**ROTATINGLOCK_PUZZLE (type 0x72, 676 bytes, scenes S5000 and S5001)**
- Binary: asset name, num_dials (4), 10 source rects (sprite digits), dest_rects (on-screen positions), up_rects/down_rects (click areas), combination at offset 0x22C, click/success sounds, success/exit scenes, exit_hotspot
- Implementation: `setupRotatingLockPuzzle(act)`. Dials start at random values (different from solution). Click up/down arrows to cycle 0-9. Auto-checks solution after each click. Font scaled to fit 18px-wide dial rects.
- S5000 (Jake's Locker): combination [5,2,5,3], success→S1426
- S5001 (Boiler Padlock): combination [1,9,6,7], success→S5002
- No sprite extraction — uses text overlay with gold digits on black background

**PASSWORD_PUZZLE (type 0x76, 215 bytes, scene S1620)**
- Binary: two password strings at offsets 0x34/0x48, three scene-change blocks (success→S1622 "fullharp", fail→S1621 "squack2", exit→S1613), input rects, exit_hotspot
- Implementation: `setupPasswordPuzzle(act)`. Keyboard-driven: type text, Enter to submit, Backspace to delete, Escape to exit. Case-insensitive comparison. Cursor blink animation via setInterval (500ms).
- Passwords: "ELOISE DREW" and "O WISE ELDER"
- Renders blue input box with white text on the background image

**LEVER_PUZZLE (type 0x73, 402 bytes, scene S5002)**
- Binary: asset name, num_levers (3), num_states (4), dest_rects for 3 levers, initial_states at 0xFA [0,0,0], solution at 0xFD [3,0,2], up/down sounds ("lever02"/"lever03"), exit→S2061, success→S2060, exit_hotspot
- Implementation: `setupLeverPuzzle(act)`. Click upper half of lever to decrease state (move up), lower half to increase (move down). States wrap around (mod 4). Labels: UP, MID-UP, MID-DN, DOWN.
- Success sets flag 62=2 (via PUZZLE_DATA)
- Renders track with red handle at position

**TELEPHONE (type 0x74, variable size, scene S501)**
- Binary: asset name, 12 button dest_rects at 0x0CA (standard phone layout: 1-9,*,0,#), 14 phone_entries at 0x48C (each 0xEB bytes: 11 digits + node_id + rich text), hangup_scene (523), exit_hotspot at 0x47A
- Implementation: `setupTelephone(act)`. Click buttons to dial digits. Star (*) clears, hash (#) submits. Auto-submit at 7 digits (local) or 11 digits (long distance, starting with 1). Looks up dialed number against phone_entries by matching digit arrays. Displays formatted text (strips `<t>`, `<c#>`, `<e>` tags, converts `<n>` to newlines).
- Renders green LED-style display with dialed number, text overlay for responses

### Architecture

- `activePuzzle` object stores all state; `puzzleBaseImage` stores the canvas snapshot before puzzle overlay
- `drawPuzzleState()`: switch on type, restores base image then draws overlay
- `handlePuzzleClick(x, y)`: checks exit hotspot first (all types), then type-specific click handling
- `getPuzzleClickRects()`: returns all clickable rects for cursor detection in `onCanvasMousemove`
- `puzzleSuccess(sound, scene, flagId, flagVal)`: locks puzzle, plays sound, sets flag, navigates after 1.2s delay
- `puzzleExit(scene)`: cleans up and navigates to exit scene
- Keyboard handler cleanup in `loadScene`, `puzzleExit`, and `puzzleSuccess` (removes keydown listener and blink interval)
- Fallback: `showPuzzle()` shows a stub overlay with "Solve Puzzle" / "Go Back" buttons for puzzle types without interactive handlers (used for SLIDER_PUZZLE)
- `PUZZLE_DATA` object maps scene IDs to success flags, success scene, and back scene for the stub handler

### What still needs to be done

1. **SLIDER_PUZZLE (type 0x75, scene S647)**: Not implemented — currently uses stub "Solve Puzzle" button. The slider puzzle is a tile-sliding puzzle. Binary data starts with asset name; full structure not yet decoded. The user said to skip it "for now."
2. **PUZZLE_DATA fix**: S647 successScene should be 'S643' not 'S645'
3. **Sprite-based rendering**: All puzzles currently use text/shape canvas overlays instead of the original sprite sheets (SPDIALS1.bin, BPLever2.bin, SPPhone1.bin exist as raw CIF binaries but haven't been extracted to PNGs). This is cosmetic — puzzles are functional without sprites.
4. **PASSWORD_PUZZLE two-field login**: The original has separate username ("ELOISE DREW") and password ("O WISE ELDER") fields. Our implementation accepts either string in a single field, which works but doesn't match the original UX.
5. **TELEPHONE conversation nodes**: Phone entries 0-2 (George, Bess, Ned) have conversation node_ids (TG01NGH1, TB01NBH1, TN01NNH1) that should trigger the conversation system. These nodes don't exist in our scene data, so we display the embedded text instead. Multiple entries for the same number may depend on game flags we're not checking.

</details>

---

### [46] C analysis — 2026-02-19 05:56:17

**C functions:** `ADD_INVENTORY`, `CONVERSATION_VIDEO`, `DIFFICULTY_LEVEL`, `EVENTFLAGS`, `EVENTFLAGS_MULTI_HS`, `HINT_SYSTEM`, `HOT_1FR_EXITSCENE`, `HOT_1FR_SCENE_CHANGE`, `HOT_MULTIFRAME_SCENE_CHANGE`, `Kill`, `LOSE_GAME`, `MAP_CALL_HOT_1FR`, `MAP_CALL_HOT_MULTIFRAME`, `OVERLAY_HOT`, `PLAY_DIGI_SOUND`, `PLAY_SECONDARY_MOVIE`, `PLAY_SECONDARY_VIDEO`, `PLAY_SOUND_MULTI_HS`, `RESET_AND_START_TIMER`, `Reference`, `S1426`, `S1427`, `S1428`, `S647`, `SAVE_CONTINUE_GAME`, `SCENE_CHANGE`, `SHOW_INVENTORY_ITEM`, `SLIDER_PUZZLE`, `SPECIAL_EFFECT`, `STOP_TIMER`, `WIN_GAME`, `active`, `back`, `canvas`, `cases`, `clicks`, `condPass`, `covers`, `data`, `effects`, `exists`, `flags`, `further`, `handler`, `header`, `heuristics`, `hotspot`, `hotspots`, `loadScene`, `navigate`, `onCanvasClick`, `overlay`, `overlays`, `overrides`, `pairs`, `rects`, `slots`, `stack`, `structure`, `timer`

<details>
<summary>Full analysis text</summary>

Good. Now I have everything needed for a comprehensive prompt. Here it is:

---

## PROMPT 1: Fix EVENTFLAGS_MULTI_HS Navigation and Scene Interaction System

I'm building a browser reimplementation of Nancy Drew: Secrets Can Kill (1998). The engine is in `/Users/bachman/Desktop/Projects/nd/engine.js`, scene data is decoded by `/Users/bachman/Desktop/Projects/nd/nd1-scene.py` into `/Users/bachman/Desktop/Projects/nd/nd1_scenes.json`, and the original decompiled game code is at `/Users/bachman/Desktop/Projects/nd/Game.exe.c`.

### Game Engine Architecture

Each scene is a `.bin` file containing a `SCENSSUM` header (background image, ambient sound, scene type) followed by `ACT` chunks. Each ACT has a 48-byte name string, a 1-byte action type at offset 0x30, a subtype byte, then type-specific data + trailing condition records. Conditions control whether an action is active (flag checks, variant/frame match, inventory checks, timed flag checks).

Our engine processes all actions in `loadScene()` (engine.js ~line 1447). Actions fall into these categories:

### Action Type Reference (all known types from binary, 0x00-0xCD)

**Navigation — Hotspot clicks (player clicks to change scene):**
- `0x0a` HOT_1FR_SCENE_CHANGE (156 uses) — single-frame clickable rect → target scene. Data: target_scene, scene_param, hotspot rect.
- `0x0e` HOT_1FR_EXITSCENE (310 uses) — same format as 0x0a, used for "exit" navigation. Functionally identical in our engine.
- `0x0b` HOT_MULTIFRAME_SCENE_CHANGE (180 uses) — per-frame hotspot rects (for panoramic scenes). Only the rect matching current variant is active. Data: target_scene + array of {frame, x1, y1, x2, y2}.

**Navigation — Auto-navigate (fires automatically on scene load):**
- `0x0c` SCENE_CHANGE (86 uses) — conditional auto-navigate. If conditions pass, scene transitions automatically. Engine takes the first one that passes. Data: target_scene, scene_param.

**Flag-setting — EVENTFLAGS:**
- `0x6b` EVENTFLAGS (62 uses) — unconditionally sets flags on scene load. Data: 10 flag-pair slots (i16 flag_id + i16 value), unused slots have flag_id=-1.
- `0x6a` EVENTFLAGS_MULTI_HS (116 uses) — **THE PROBLEM TYPE.** Clickable hotspot that sets flags. Same 10 flag-pair structure as EVENTFLAGS, plus per-frame hotspot rects. Does NOT contain a target scene in its binary data. See detailed section below.

**Conversations:**
- `0x32` CONVERSATION_VIDEO (278 uses) — NPC dialogue trees. Conditions select which node plays. Has node_id, NPC text, player choices, response scenes.

**Sound:**
- `0x96` PLAY_DIGI_SOUND (173 uses) — plays a sound. Often conditioned on flags (e.g., plays after EVENTFLAGS_MULTI_HS sets a flag).
- `0x97` PLAY_DIGI_SOUND_2 — alternate sound player.
- `0x98` PLAY_SOUND_PAN_FRAME — positional/panning sound.
- `0x99` PLAY_SOUND_MULTI_HS (10 uses) — sound with per-frame hotspots (unhandled).

**NPC/Visual overlays:**
- `0x33` PLAY_SECONDARY_VIDEO (4 uses) — NPC sprite overlay with per-frame click hotspots.
- `0x35` PLAY_SECONDARY_MOVIE (19 uses) — movie/animation overlay (unhandled).
- `0x28` OVERLAY_ANIM — animation overlay.
- `0x36` SPECIAL_EFFECT (7 uses) — visual effects (unhandled).
- `0x37` OVERLAY_HOT (5 uses) — hotspot overlay (unhandled).

**Map/Travel:**
- `0x3d` MAP_CALL_HOT_1FR (6 uses) — map hotspot, single frame. Opens travel dialog.
- `0x3e` MAP_CALL_HOT_MULTIFRAME (3 uses) — map hotspot, multi-frame.

**Inventory:**
- `0x78` ADD_INVENTORY (2 uses) — adds item to inventory on scene load.
- `0x79` REMOVE_INVENTORY — removes item.
- `0x7a` SHOW_INVENTORY_ITEM (11 uses) — draws inventory item sprite on canvas (unhandled).

**Game state:**
- `0x68` RESET_AND_START_TIMER (4 uses) — starts the scene timer (for timed events like explosions).
- `0x69` STOP_TIMER (5 uses) — stops the timer.
- `0x65` SAVE_CONTINUE_GAME (4 uses) — auto-saves.
- `0x6d` LOSE_GAME (3 uses) — shows game over screen.
- `0x70` WIN_GAME (1 use) — shows victory screen.
- `0x71` DIFFICULTY_LEVEL (3 uses) — sets difficulty flag.
- `0x6e` PUSH_SCENE / `0x6f` POP_SCENE — scene stack (not yet decoded/implemented).

**Puzzles:**
- `0x6c` ORDERING_PUZZLE, `0x72` ROTATINGLOCK_PUZZLE, `0x73` LEVER_PUZZLE, `0x74` TELEPHONE, `0x75` SLIDER_PUZZLE, `0x76` PASSWORD_PUZZLE — all implemented interactively except SLIDER_PUZZLE (stub only).

**Other/Unknown:**
- `0xa0` HINT_SYSTEM (3 uses), `0xC8-0xCD` SPECIAL_* — not decoded.

### How loadScene() works in engine.js

1. Clears active puzzle state, renders background/scene items/NPCs
2. Iterates all actions, checking `condPass(act)` for each
3. Auto-executing actions fire immediately: EVENTFLAGS sets flags, SCENE_CHANGE queues auto-nav, sounds play, etc.
4. Hotspot actions are collected into `activeHotspots[]` array
5. After the loop: draw hotspots, draw scroll arrows, update inventory
6. If `autoNav` exists (SCENE_CHANGE passed), auto-navigate to that scene
7. Otherwise, show conversation or activate puzzle if applicable

### How clicks work in engine.js

`onCanvasClick()` (~line 1697):
1. Check overlays (conversation, map, puzzle, game-end)
2. If `activePuzzle`, route to puzzle click handler
3. Check panoramic scroll edges
4. **EVENTFLAGS_MULTI_HS processing** (~line 1723):
   - Set flags from ALL EVENTFLAGS_MULTI_HS hotspots at click point
   - Play conditioned sounds
   - Check for overlapping primary hotspot (HOT_1FR_SCENE_CHANGE etc.) — if found, navigate to it
   - If NO primary hotspot overlaps, use heuristics (THIS IS THE BROKEN PART):
     - If `state.enteredViaEventFlags`, call `back()`
     - Check hardcoded `EVENTFLAGS_NAV` overrides (only has S606↔S626 tapestry)
     - Check if scene+1 is a "pair" (has EVENTFLAGS_MULTI_HS or exit to current scene) — if so, navigate to scene+1
     - Otherwise reload current scene
5. Regular hotspot click: navigate to target scene

### The EVENTFLAGS_MULTI_HS Problem

**Binary structure (type 0x6a):** 40 bytes of flag data (10 × i16 flag_id + i16 value), u16 frame count, count × 18-byte hotspot frames. The "unused" flag slots (flag_id=-1) have consistent default values [2,1,1,2,1,1,1,1,2] across all instances — they do NOT encode navigation targets.

**The data does NOT contain a target scene.** Navigation must come from engine logic.

**Original engine handler** — `FUN_004235d0` (Game.exe.c line 50094): 3-state machine:
- State 0: Set `DAT_004d093f = 1` (dirty flag), advance to state 1
- State 1: Find matching hotspot frame for current variant, store rect
- State 2 (after click): Set all flag pairs (same as EVENTFLAGS 0x6b), call `thunk_FUN_0041eab0` (line 47877) which resets state to 0. **No navigation occurs in the handler itself.**

**Cleanup callback** `FUN_0041eab0` (line 47877): Just resets action state. No navigation.

**`DAT_004d093f`** is a "dirty/needs-update" flag set by many action types. It's read at lines 60340-60673 and 60876 in the main game loop. At those locations it seems to trigger cursor updates, animation state, and possibly scene re-evaluation, but the exact navigation mechanism remains unclear.

**Other relevant Game.exe.c locations:**
- Scene action dispatch loops: lines 33454-33571 and 45467-45509
- `DAT_004d8fac`: checked alongside `DAT_004d093f` at lines 60340, 60405, 60444, 60478, 60548, 60594, 60613, 60654
- `DAT_004d0dc6`: current frame/variant, referenced in hotspot frame matching
- `PUSH_SCENE` (0x6e) / `POP_SCENE` (0x6f): might be relevant — the engine may push the current scene before EVENTFLAGS navigation and pop back. We haven't decoded these yet.
- `FUN_0041eeb0` (line 48015): The SHOW_INVENTORY_ITEM (0x7a) handler — not relevant to navigation but appears alongside EVENTFLAGS in scenes like S1427

### The Four Bugs

**Bug 1** (PUZZLE_DATA error, not EVENTFLAGS): S647 (slider puzzle) navigates to S645 on solve. Scene data shows S643 = "puzzle easy & Med solved" with exits to S57 and S645. PUZZLE_DATA has wrong `successScene: 'S645'`, should be `'S643'`.

**Bug 2** — S1428 (Judo Today magazine close-up): EVENTFLAGS_MULTI_HS covers (152,1)-(383,291), sets F44=2. No overlapping primary hotspot. Scene+1 = S1429. Our `isPair` check fails because S1429 only has `HOT_1FR_SCENE_CHANGE → S1437` (no EVENTFLAGS, no exit back to S1428). Engine reloads S1428 — nothing happens. **Expected: navigate to S1429.**

**Bug 3** — S1426 (Upper Locker) / S1427 (Lower Locker): The locker door EVENTFLAGS_MULTI_HS (right side of screen) sets F44=2. Our scene+1 heuristic: S1426→S1427, S1427→S1428. **Expected: both should go to S1425** (closed locker).

**Bug 4** — S1427 newspaper: EVENTFLAGS_MULTI_HS at (213,138)-(232,213) sets F44=1+F45=2. Engine goes to S1428 (scene+1). **Expected: S1430** (newspaper view).

### What Needs to Be Done

1. Fix Bug 1: Change PUZZLE_DATA S647 `successScene` from `'S645'` to `'S643'` in engine.js
2. Figure out the EVENTFLAGS_MULTI_HS navigation logic by studying Game.exe.c further (search around lines 60340-60900 for how `DAT_004d093f` triggers scene changes; investigate PUSH_SCENE/POP_SCENE; look for where scene IDs get written after flag changes) — OR build a practical replacement for the broken scene+1 heuristic
3. Update the `onCanvasClick()` EVENTFLAGS_MULTI_HS handler (~line 1723 in engine.js) with correct navigation
4. Test all four cases plus existing working cases (S606↔S626 tapestry toggle)

</details>

---

### [47] C analysis — 2026-02-19 18:30:30

**C functions:** `handler`, `scenes`

<details>
<summary>Full analysis text</summary>

Critical breakthrough: I've confirmed that the code at lines 25600-25797 is the **ORDERING_PUZZLE handler** (line 25606 references `s_DF_OrderingPuzzle_Surface`), NOT EFMHS. The actual EFMHS handler (FUN_004235d0, line 50094) has **NO navigation code at all** — just flag-setting and cleanup.

And the parent scene analysis confirms: S601 does NOT have conditional navigation to S603 based on flag 44. The orphan scenes (S603, S610, S617, S620, S525) are truly unreachable via decoded scene data.

Now I need to find the real mechanism. Let me check the cleanup function and main loop more carefully.

</details>

---

### [48] C analysis — 2026-02-19 18:55:40

**C functions:** `S525`, `back`

<details>
<summary>Full analysis text</summary>

Important finding. The `hasNavHotspots` check on line 1831-1833 has a bug — it counts PLAY_DIGI_SOUND and SHOW_INVENTORY_ITEM as "nav hotspots" because it checks `!== 'EVENTFLAGS_MULTI_HS'` instead of checking for actual navigation types. This means scenes like S603, S610, S617, S620, and S525 (which have EFMHS + PLAY_DIGI_SOUND but no navigation hotspots) won't reach Tier 3 back() — they'll fall through to Tier 4/5 and reload instead of going back.

Let me verify how `activeHotspots` is constructed, then fix this.

</details>

---

### [49] C analysis — 2026-02-19 18:56:27

**C functions:** `S525`, `S603`, `S610`, `S617`, `S620`, `back`, `cases`, `includes`, `mentioned`, `scenes`, `types`

<details>
<summary>Full analysis text</summary>

Good. Here's a summary of where things stand:

## Implementation Complete

The 5-tier EFMHS navigation system is in place at [engine.js:1746-1868](engine.js#L1746-L1868), with a bug fix just applied:

**Bug fixed**: `hasNavHotspots` (line 1831) was checking `type !== 'EVENTFLAGS_MULTI_HS'`, which counted PLAY_DIGI_SOUND, SHOW_INVENTORY_ITEM, etc. as "navigation hotspots". This prevented Tier 3 (back) from firing on close/dismiss scenes like S603 (drawer open), S610 (hope chest open), S617 (open book), S620 (wooden box open), and S525 (yellow pages). Changed to `NAV_TYPES.includes(h.action.type)` so only actual navigation types (HOT_1FR_SCENE_CHANGE, HOT_1FR_EXITSCENE, HOT_MULTIFRAME_SCENE_CHANGE) count.

**How the 5 tiers work now:**

| Tier | Condition | Action | Covers |
|------|-----------|--------|--------|
| 1 | Scene:FlagKey in EVENTFLAGS_NAV table | Navigate to mapped scene | 22 special cases (tapestry toggle, lockers, open/close pairs) |
| 2 | Scene has SCENE_CHANGE action | Reload to re-evaluate | Difficulty screen, boiler room auto-nav |
| 3 | No NAV_TYPE hotspots in scene | back() | ~29 leaf/dismiss scenes (drawers, book CUs) |
| 4 | Scene+1 has EFMHS, no nav hotspots, not already targeted | Navigate to scene+1 | ~25 "open to detail" scenes |
| 5 | Default | Reload | Everything else |

**What to playtest**: The specific cases you mentioned (drawer in Aunt Eloise's house, picking up books) should now work — S602 hits Tier 4 (opens to S603), S603 hits Tier 3 (back). The 36 "manual review" scenes may need additional lookup table entries if behavior is wrong during playtesting.

</details>

---

### [50] C analysis — 2026-02-17 07:23:34

**C functions:** `decoder`

<details>
<summary>Full analysis text</summary>

Got it — I've read the full handoff document and all three scripts. Here's the local state:

**Available locally:**
- [CifTree.dat](CifTree.dat) (4.3MB) — original archive
- [Game.exe.c](Game.exe.c) (4.5MB) — decompiled executable
- [nd1-extract.py](nd1-extract.py) — archive extractor
- [nd1-boot.py](nd1-boot.py) — BOOT.bin decoder (complete)
- [nd1_scene_decoder_v2.py](nd1_scene_decoder_v2.py) — scene decoder (incomplete)

**Not yet done:** The extraction hasn't been run — `nd1_extracted/` and `nd1_images/` are empty. We need to extract first before doing anything else.

The handoff priorities are:
1. Complete scene decoder (v3)
2. Decode OBJECT0.bin
3. Map conversation trees
4. Puzzle data formats
5. AVF video format

What would you like to tackle? I'd suggest starting by running the extractor, then building the v3 scene decoder — cross-referencing the action type table against actual hex data from the extracted scenes and the decompiled `Game.exe.c` to resolve the v1/v2 conflicts.

</details>

---

### [51] C analysis — 2026-02-17 07:46:54

**C functions:** `data`, `decoded`, `parameter`, `timer`

<details>
<summary>Full analysis text</summary>

Scene decoder v3 is complete. Here's the summary:

### Results
- **587 scenes**, **1460 actions**, **0 errors**
- **30 action types** fully decoded with correct field layouts
- **5 condition types** decoded (448 total condition records)

### Output files
- [nd1_scenes.json](nd1_scenes.json) — full structured data (every field of every action)
- [nd1_scenes.txt](nd1_scenes.txt) — human-readable report
- [nd1_scene_graph.json](nd1_scene_graph.json) — scene transition adjacency list

### Key corrections from the handoff document
1. **Scene IDs are u16, not u32** — the d[2:4] bytes are a separate scroll/transition parameter (visible in multiframe types where values like 7, 8, 15 appear)
2. **Hotspot coordinates are i32** (not u16+pad) — they're stored as full 32-bit ints
3. **Trailing condition records** (12 bytes each) follow every action's type-specific data — the handoff didn't identify these
4. **Type 0x32 CONVERSATION_VIDEO** exists in the data (278 instances) despite not appearing in the Game.exe.c switch — it may be handled by a separate loader

### Condition types discovered
| Type | Name | Count | Example |
|------|------|-------|---------|
| 0x02 | flag_check | 318 | `IF flag[5]==2` |
| 0x0e | timed_flag | 81 | `IF flag[44]==2+90s` (boiler explosion) |
| 0x01 | scene_variant | 23 | `IF variant==2` |
| 0x0b | inventory_check | 17 | `IF has_item[7]` |
| 0x0f | timer_condition | 9 | `timer(flag[44]==0,15s)` |

</details>

---

### [52] C analysis — 2026-02-17 07:57:15

**C functions:** `AOBJECTS`, `DOBJECTS`, `SBOBJECT`, `SHOW_INVENTORY_ITEM`, `SOBJECTS`, `slot`

<details>
<summary>Full analysis text</summary>

The 0x7a struct is fully decoded. Here's the complete layout:

### SHOW_INVENTORY_ITEM (0x7a) — 48 bytes

| Offset | Size | Field | Description |
|--------|------|-------|-------------|
| 0 | 2 | `item_id` | u16 LE, inventory slot (0–10) |
| 2 | 8 | `sprite_sheet` | ASCII name, null-terminated |
| 10 | 2 | `padding` | Always 0 |
| 12 | 4 | `enabled` | i32 LE, always 1 (visibility flag) |
| 16 | 4 | `src_x1` | i32 LE, source rect left on sprite sheet |
| 20 | 4 | `src_y1` | source rect top |
| 24 | 4 | `src_x2` | source rect right |
| 28 | 4 | `src_y2` | source rect bottom |
| 32 | 4 | `dst_x1` | i32 LE, screen dest left |
| 36 | 4 | `dst_y1` | screen dest top |
| 40 | 4 | `dst_x2` | screen dest right |
| 44 | 4 | `dst_y2` | screen dest bottom |

Key findings:
- **9 i32 values** after the item_id+sheet+pad — all confirmed 32-bit (high i16 always 0)
- First i32 is always `1` (enabled flag)
- **Source rects all fit within their sprite sheet dimensions** — validated against AOBJECTS (136x182), DOBJECTS (282x208), SBOBJECT (441x346), SOBJECTS (63x40)
- **Source and dest rects have identical dimensions** — pure 1:1 blit, no scaling
- All 11 inventory items found across the scene files

Now let me update the scene decoder to properly decode this format and output human-readable inventory info.

</details>

---

### [53] C analysis — 2026-02-17 08:02:40

**C functions:** `flag`, `screen`, `sheet`

<details>
<summary>Full analysis text</summary>

All inventory actions now decode with full detail. Here's a summary of what was updated in [nd1-scene.py](nd1-scene.py):

### Changes made:

1. **Added `INVENTORY_ITEMS` name table** (lines 20-31) — maps item IDs 0-10 to human-readable names

2. **Added `0x78`, `0x79`, `0x7a` to `FIXED_SIZES`** — base sizes 2, 2, 48 respectively. This fixes condition record parsing for 0x78 (previously all trailing data was lumped into action data)

3. **Rewrote `0x78`/`0x79` decoder** — now outputs `item_id`, `item_name`, and properly separates trailing condition records

4. **Rewrote `0x7a` decoder** — fully decodes all 48 bytes:
   - `item_id` + `item_name` 
   - `sprite_sheet` (8-byte ASCII name)
   - `enabled` flag (always 1)
   - `src_rect` — source rectangle within sprite sheet (4×i32)
   - `dst_rect` — destination rectangle on screen (4×i32)

5. **Updated text formatter** — inventory actions now show item name, sprite sheet, source and destination rects

All 11 SHOW_INVENTORY_ITEM records, 2 ADD_INVENTORY records, and their condition records decode cleanly. The complete inventory system is:

| ID | Item | Sprite Sheet | Source Rect |
|----|------|-------------|-------------|
| 0 | Bolt cutters | dobjects | (100,1)-(189,153) |
| 1 | Phone card | AOBJECTS | (1,1)-(90,70) |
| 2 | Coin | AOBJECTS | (92,59)-(112,79) |
| 3 | Glass cutter | SOBJECTS | (1,1)-(61,38) |
| 4 | Gun | *(no sprite shown)* | — |
| 5 | Key on passport | AOBJECTS | (92,1)-(134,57) |
| 6 | Ladle | dobjects | (1,1)-(98,206) |
| 7 | Video tape | sbobject | (52,294)-(140,321) |
| 8 | Work gloves | SBOBJECT | (221,170)-(397,344) |
| 9 | Key in safe | AOBJECTS | (82,81)-(111,120) |
| 10 | Remote control | AOBJECTS | (1,72)-(80,180) |

</details>

---

### [54] C analysis — 2026-02-17 08:03:26

**C functions:** `LEVER_PUZZLE`, `ORDERING_PUZZLE`, `PASSWORD_PUZZLE`, `ROTATINGLOCK_PUZZLE`, `SLIDER_PUZZLE`, `TELEPHONE`, `decoder`, `extraction`, `structure`, `system`, `undertaking`

<details>
<summary>Full analysis text</summary>

Here's where we stand and what's left to decode:

**Done:**
- CifTree.dat extraction (632 files)
- BOOT.bin (29/29 chunks)
- Scene decoder (587 scenes, 1460 actions, 30 types, 5 condition types)
- Inventory system (11 items, sprite rects, full 0x7a struct)

**Remaining, roughly by impact:**

1. **Conversation system (0x32)** — 278 records, the single biggest undecoded chunk. Contains all in-game dialogue with `<i>`, `<n>`, `<o>` markup tags. Currently we just extract a conv_id and raw strings; the full binary structure (dialogue tree branching, response choices, NPC references) is undecoded.

2. **Puzzle data formats** — 5 puzzle types with large fixed-size structs:
   - ORDERING_PUZZLE (621B, 2 instances)
   - ROTATINGLOCK_PUZZLE (676B, 2 instances)
   - SLIDER_PUZZLE (1348B, 2 instances)
   - LEVER_PUZZLE (402B, 1 instance)
   - PASSWORD_PUZZLE (215B, 1 instance)
   - TELEPHONE (1 instance, variable size)

3. **AVF video format** — background scene animations. Much bigger undertaking (proprietary video codec).

4. **SCENSSUM deeper decode** — we parse description/bg/ambient but there are ~80 bytes of timing/display params we haven't fully mapped.

The conversation system is the clear next target — it's 19% of all actions and contains the entire narrative. Want to tackle that?

</details>

---

### [55] C analysis — 2026-02-17 08:36:53

**C functions:** `CONVERSATION_VIDEO`, `flag`, `markup`, `monologues`, `pattern`, `sub_count`, `subs`, `target_node`, `text`

<details>
<summary>Full analysis text</summary>

All done. Here's the conversation system summary:

### CONVERSATION_VIDEO (type 0x32) — Fully Decoded

**Binary format** (278/278 validated):

| Region | Offset | Size | Content |
|--------|--------|------|---------|
| Fixed header | 0 | 1692 | Node ID (0:3), metadata, NPC text at 61 (400B), screen coords at 37 (6×u32) |
| Choice count | 1692 | 1 | u8, range 0–5 |
| Per choice | +3+subs+471 | 474 base | flag(1) + sub_count(u16LE) + subs(×5B) + text(400B) + target_node(71B) |
| Tail | end | 5+N×6 | Flag/NPC reference entries |

**Statistics:**
- 278 total records, 188 player choices across 117 interactive nodes
- 161 NPC monologues (0 choices), 57 with 1 choice, 51 with 2, 8 with 3, 1 with 5
- 271 unique node IDs, 147 unique targets
- 6 conversation characters: Daryl, Connie, Hulk, Hal, plus Intro/Epilogue
- Choice text uses `<c1>`/`<c0>` color markup (highlight first letter) + `<h>` hotkey + `<n>` newline
- NPC text uses `<i>` italic, `<n>` newline, `<o>` end-of-dialogue
- Target nodes follow `n{node_id}{variant}` pattern (e.g., "nd35a" = response 'a' from node d35)

</details>

---

### [56] C analysis — 2026-02-17 08:37:45

**C functions:** `backgrounds`, `engine`, `first`, `prototype`

<details>
<summary>Full analysis text</summary>

That's the big question! Let me lay out where we stand and what the path forward looks like.

### What we've fully decoded:
- **Navigation graph**: 587 scenes with hotspot coordinates, scene transitions, conditions
- **Dialogue tree**: 278 conversation nodes with NPC text, player choices, branching targets
- **Inventory**: 11 items with sprite sheet rects and screen positions
- **Game state**: Event flags, conditions, timers — the entire logic layer
- **Assets**: 632 files extracted — PNGs, sounds, data files

### What's still missing for playable:
1. **AVF video format** — Every background scene is an animated AVF. Without this, we only have static PNGs for PLAIN-type assets. This is the biggest blocker.
2. **Puzzle internals** — We know the data sizes but haven't decoded the solution data, tile layouts, etc. for the 6 puzzle types
3. **A game engine** to tie it all together

### Realistic approaches, from simplest to hardest:

**Option A: Interactive web prototype (static images)**
- HTML5 Canvas with clickable hotspots, dialogue popups, inventory bar
- Use extracted PNGs as static backgrounds (no animation)
- Full conversation trees, navigation, inventory, flag-based gating
- Could be playable in days — covers ~80% of the game experience

**Option B: Full recreation with animation**
- Requires decoding the AVF video format first (proprietary codec — significant effort)
- Then build a proper game engine (Python/pygame or web)
- Faithful to the original — weeks of work

**Option C: Scene graph explorer / interactive walkthrough**
- Lighter than a full game — more like an interactive map
- Click through scenes, read dialogues, follow the story
- Could be done in hours

Which direction interests you? The AVF decode is the critical fork — if you want animation, that's the next reverse-engineering target. If static images are fine, we could start building a playable prototype right now.

</details>

---

### [57] C analysis — 2026-02-17 08:39:18

**C functions:** `decrypt`, `frameNo`, `height`, `length`, `numEntries`, `offset`, `skip`, `width`

<details>
<summary>Full analysis text</summary>

This is great — the AVF format is almost trivial. It uses the **exact same** encryption and compression we already implemented:

1. Magic: `"AVF WayneSikes\0"` (15 bytes)
2. Header at 0x15: `numEntries(u16) + width(u16) + height(u16)`
3. Entry table at 0x21: `frameNo(u16) + offset(u32) + length(u32) + unk(u32) + skip(5)` = 15 bytes/entry
4. Each frame: **positional subtraction decrypt** → **LZSS decompress** → **raw RGB555** pixels

Same `decrypt(byte - i)` and same LZSS and same RGB555 as CifTree.dat. Let me check their LZSS to confirm it's identical to ours.

</details>

---

### [58] C analysis — 2026-02-17 08:41:11

**C functions:** `Inventory`, `decrypt`, `images`, `logic`, `lzss_decompress`, `navigation`, `rgb555_to_image`, `trees`

<details>
<summary>Full analysis text</summary>

The decoder is ready at [nd1-avf.py](nd1-avf.py). It reuses the exact same `decrypt()`, `lzss_decompress()`, and `rgb555_to_image()` from our CifTree extractor.

**The catch**: The 313 AVF files referenced by scene data aren't inside CifTree.dat — they're standalone files from the game CD/install directory. Do you have access to the game installation folder? The AVF files would be loose files alongside `CifTree.dat` and `Game.exe`, with names like `ad1a.avf`, `SD1H.avf`, `AExt.avf`, etc.

Once you point the decoder at that directory, it'll extract every frame as PNG. Then we'd have everything needed for a full playable prototype:
- Background images (from AVF frame 0)
- Scene navigation (587 scenes with hotspot rects)
- Dialogue trees (278 nodes with branching)
- Inventory (11 items with sprites)
- Game state logic (flags, conditions, timers)

</details>

---

### [59] C analysis — 2026-02-17 14:59:45

**C functions:** `frameNo`, `length`, `offset`, `skip`

<details>
<summary>Full analysis text</summary>

The two fixes:

1. **Entry stride `15` → `19`**: `frameNo(u16=2) + offset(u32=4) + length(u32=4) + unk(u32=4) + skip(5) = 19 bytes`. With stride 15 the entry table was misread for every file with more than 1 frame, giving garbage offsets and frame numbers.

2. **`frames = [None] * num_entries` → `[None] * (max_frame + 1)`**: Frame numbers may not be consecutive from 0, so the list needs to cover the highest frame number seen, not just the entry count.

Try again — the D* conversation videos should now decode.

</details>

---

### [60] C analysis — 2026-02-17 15:02:58

**C functions:** `blobs`, `bytes`, `renderer`

<details>
<summary>Full analysis text</summary>

Great timing to take stock. Here's a clear picture of where we are:

### Fully decoded ✅
- **CifTree.dat** — all 632 assets extracted
- **BOOT.bin** — fonts, cursors, palette, game config
- **Scene data** — 587 scenes, all 30 action types, hotspot rects, conditions, flags
- **Conversation system** — 278 nodes, NPC text, player choices, branch targets
- **Inventory** — 11 items, sprite sheet rects
- **AVF** — background animations + conversation videos

---

### Remaining data to decode

**Quick wins:**
1. **Sound format** — `PLAY_DIGI_SOUND` references named audio files. We don't know if they're in CifTree.dat, separate on disc, or what format. Quick check needed.
2. **SCENSSUM full header** — we only parse 3 of ~125 bytes (description, bg_avf, ambient_snd). There's timing, scene_type, and frame_count fields we haven't mapped.

**Larger effort:**
3. **Puzzle formats** — 6 types with large fixed blobs (621–1348 bytes). Need decoding to make them playable: solution states, tile layouts, lock combinations, etc.

---

### Game engine components to build

| Component | Complexity | Blocking on |
|-----------|-----------|-------------|
| Background renderer (AVF frame 0) | Low | Nothing — ready now |
| Hotspot click detection | Low | Nothing — have all rects |
| Scene navigation + flag gating | Medium | Nothing — have full graph |
| Conversation UI | Medium | Nothing — have full tree |
| Inventory bar + item display | Medium | Nothing — have sprites |
| AVF animation playback | Medium | Nothing — have decoder |
| Sound playback | Low–Medium | Need sound format |
| Puzzles | High | Need puzzle decode |
| Save/load | Low | Need flag system first |

---

### Recommended order

1. **Sound format** — 30 min to identify, then audio works
2. **Start the game engine** — we have everything for navigation + conversation + inventory right now
3. **Puzzles** — decode + implement as we go, stubs for now
4. **SCENSSUM full header** — nice to have, not blocking

The engine is the right next step. What platform do you want to target — **pygame** (simpler, desktop only) or **HTML5/Canvas** (plays in browser, shareable)?

</details>

---

### [61] C analysis — 2026-02-17 15:17:07

**C functions:** `HOT_1FR_EXITSCENE`, `HOT_1FR_SCENE_CHANGE`, `HOT_MULTIFRAME_SCENE_CHANGE`, `PNGs`, `action`, `background`, `generated`

<details>
<summary>Full analysis text</summary>

Yes — here's exactly how the hotspot system works from the decoded data:

**Three hotspot action types:**

- **HOT_1FR_SCENE_CHANGE (0x0a)** — a single static rect, always active on screen:
  ```
  hotspot: {x1:120, y1:45, x2:280, y2:190}  → click → go to S42
  ```
- **HOT_1FR_EXITSCENE (0x0e)** — same structure, used for exits/back navigation
- **HOT_MULTIFRAME_SCENE_CHANGE (0x0b)** — array of per-frame rects; the hotspot only registers when the background AVF is on a specific frame:
  ```
  frames: [{frame:3, x1:..., y1:..., x2:..., y2:...}, {frame:7, ...}]
  ```
  This is how animated scenes work — a door appears open on frame 3, so the "go through door" hotspot only activates then.

**Condition gating** — each action has optional conditions checked before the hotspot is registered:
- `flag_check`: `flag[44] == 2` (e.g., only show gun if Daryl has been confronted)
- `inventory_check`: `has_item[3]` (e.g., only show glass cutter interaction if you have it)
- `scene_variant`: `variant == 1` (which "state" of the scene — e.g., chest open vs closed)

**The engine loop per scene:**
1. Display background (AVF frame, animated or static)
2. Evaluate each action's conditions against current game state
3. Register rects for all passing hotspot actions as invisible click zones
4. On click → find matching rect → execute action (navigate / play video / set flag / etc.)

The screen is **536×292** (AVF dimensions). All hotspot coords are in that pixel space.

Ready to build. Let me plan the file structure before coding:

```
nd-engine/
  index.html        ← single entry point
  engine.js         ← game loop, state machine, action executor  
  scenes.json       ← already generated (nd1_scenes.json)
  assets/
    frames/         ← AVF frame 0 PNGs (backgrounds)
    audio/          ← WAV files
    sprites/        ← inventory sprite sheets
```

Should I start with `engine.js` + `index.html` as a single self-contained prototype, or do you want a specific structure first?

</details>

---

### [62] C analysis — 2026-02-17 15:30:23

**C functions:** `S824`, `case`, `handle`

<details>
<summary>Full analysis text</summary>

DD1X frame 0 is available as `Dd1x_000.png`. The engine uses `tryLoadImg` which tries case variants, but the file is mixed-case (`Dd1x`). Let me verify this works and also fix the start scene to S824 (which has background frames) since DEXT isn't extracted. Also noticed a few issues to fix:

1. **Start scene**: Change to S824 (has frames, lots of hotspots at frame 0)
2. **`HOT_MULTIFRAME_SCENE_CHANGE` at variant 0**: The engine currently only adds hotspots for `frame === 0 || frame === variant`. At frame 0, only the hotspot with `frame: 0` will show — which is correct for the initial view.
3. **`MAP_CALL_HOT_1FR` / `MAP_CALL_HOT_MULTIFRAME`**: Need to handle (at minimum ignore gracefully, or show a simple placeholder map).

</details>

---

### [63] C analysis — 2026-02-17 15:31:47

**C functions:** `S824`, `background`, `hotspots`, `looping`, `playback`, `scenes`, `screen`

<details>
<summary>Full analysis text</summary>

The game is now running at `http://localhost:8080`. Here's a summary of what was fixed and what you should see:

**Changes made:**
- Changed `startScene` from `S10` to `S824` (diner interior) — S10's background `DExt.avf` wasn't in your extracted frames, but `Dd1x` (S824) is fully available
- Added `MAP_CALL_HOT_1FR` and `MAP_CALL_HOT_MULTIFRAME` handling — they now register as hotspots (visible in debug mode with a `MAP` label) but clicking them is a no-op for now

**What you should see in S824 (diner main room):**
- The diner interior background (`Dd1x_000.png`)
- `50sdiner` ambient music looping (if browser allows autoplay)
- 4 clickable hotspots at frame 0 (pinball machine, receipt on counter, menu cover, exit door/map)
- Enable Debug mode to see yellow hotspot outlines

**Known gaps for later:**
- Map screen (`MAP_CALL_*`) — needs a separate scene list UI
- Multi-frame animation playback (currently shows frame 0 only)
- The puzzle scenes (ORDERING_PUZZLE, SLIDER_PUZZLE, etc.) — large fixed blobs not yet decoded

</details>

---

### [64] C analysis — 2026-02-17 16:08:51

**C functions:** `Daryl`, `S101`, `S824`, `renderBackground`

<details>
<summary>Full analysis text</summary>

Here's a summary of everything that was done and what the game should now do:

**Changes made in this session:**

1. **S10 as start scene** — `DExt_000.png` is available, `initialFlags: {5: 1}` bootstraps chapter state so the diner door hotspot is active

2. **Variant-aware backgrounds** — `renderBackground(avfName, variant)` now tries `{avf}_{variant:03d}.png` first, falling back to `_000.png`. This means navigating to S824 at frame 84 gracefully falls back to frame 0.

3. **PLAY_SECONDARY_VIDEO decoded** — [nd1-scene.py](nd1-scene.py) now extracts:
   - `asset_name` (e.g. `DarylFid`)
   - `target_scene` (e.g. `101`) — where clicking the NPC goes
   - Per-frame hotspots: when the scene is at variant frame N, Daryl appears at `(hs_x1, hs_y1)-(hs_x2, hs_y2)` and is clickable

4. **NPC hotspots in engine** — `PLAY_SECONDARY_VIDEO` now registers clickable areas per frame, and clicking navigates to `target_scene`

**Game flow now navigable:**
- S10 (diner exterior) → click door → S824 (main diner room)
- S824 → click Daryl (bottom-center of screen when at frame 1-4) → S101 (conversation)
- S824 → click jukebox/pinball/counter items → respective close-up scenes
- S101 → conversation dialogue auto-plays, `[ Continue ]` closes it

</details>

---

### [65] C analysis — 2026-02-17 16:19:04

**C functions:** `S101`, `S824`, `clickable`, `drawScrollArrows`, `scrollDir`, `scrolling`, `selection`

<details>
<summary>Full analysis text</summary>

Here's a summary of all changes made:

**Panoramic scrolling (left/right navigation):**
- Added `avf_frames` to scene summaries in [nd1-scene.py](nd1-scene.py) — scanned from the frames directory, only added when >1 frame exists
- Added `drawScrollArrows()` — renders ◀/▶ arrows at screen edges when in a multi-frame scene
- Added `scrollDir()` — detects if click/hover is in the left/right 28px edge zone
- `onCanvasClick` now handles edge clicks first: scroll left/right through the 30 AVF frames
- `onCanvasMousemove` shows `w-resize`/`e-resize` cursor at scroll edges

**In S824 (diner):**
- At variant 0: pinball, receipt, specials board, envelope hotspots visible
- Click ▶ → variant 1: Daryl is now clickable (hs_x=14-71), more specials board/envelope positions
- Clicking Daryl → loads S101 (his conversation scene with `dd1d` background)

**Difficulty selection (S5 start):**
- `startScene` changed from `S10` to `S5`
- Added `DIFFICULTY_LEVEL` action handler in the engine: sets `flag[param1] = param2`
- Flow: click Junior/Senior/Master button → `EVENTFLAGS_MULTI_HS` sets flag 44/45/46 → scene reloads → `DIFFICULTY_LEVEL` sets flag 47=2 → `SCENE_CHANGE` auto-navigates to S60 (the intro letter sequence)

</details>

---

### [66] C analysis — 2026-02-17 16:32:11

**C functions:** `fixed`, `flag`

<details>
<summary>Full analysis text</summary>

Both bugs fixed. Here's what changed and why:

**Bug 1 — Hotspot bleeding fixed:**
All multiframe hotspot checks changed from `fr.frame === 0 || fr.frame === variant` → `fr.frame === variant`. Frame 0 is not a special "always visible" sentinel — it simply means the hotspot is visible at panoramic position 0. Affected action types: `HOT_MULTIFRAME_SCENE_CHANGE`, `EVENTFLAGS_MULTI_HS`, `MAP_CALL_HOT_MULTIFRAME`, `PLAY_SECONDARY_VIDEO`.

**Bug 2 — Scroll stops after ~2 clicks fixed (also fixes S5 difficulty screen skip):**
`EVENTFLAGS_MULTI_HS` was auto-executing its flags on every scene load, including the reloads triggered by panoramic scrolling. This could set a flag (e.g., difficulty flag 47=2 in S5, or similar in S824's diner) that satisfied a `SCENE_CHANGE` condition, causing auto-navigation on the next scroll. Flags for `EVENTFLAGS_MULTI_HS` are now only set when the user **clicks** the hotspot, matching the original game's intent.

</details>

---

### [67] C analysis — 2026-02-17 16:48:02

**C functions:** `House`, `Night`, `Pharmacy`, `School`, `clicking`, `does`, `variant`, `view`

<details>
<summary>Full analysis text</summary>

Everything looks good. Here's a summary of all three fixes:

---

**1. Left/right arrows swapped** — Fixed in both `drawScrollArrows` and `scrollDir`:
- Higher variant = leftward view (the panorama "wraps" in that direction)
- ◀ on left edge now increases variant (pans left) and is shown when `variant < maxFrames-1`
- ▶ on right edge now decreases variant (pans right) and is shown when `variant > 0`

**2. MAP now opens a travel dialog** — `MAP_CALL_HOT_MULTIFRAME` clicking (the "exit door" visible at certain panoramic positions) now opens a **Travel Map** overlay listing the 5 hub locations:
- Aunt Eloise's House (S9)
- Diner Day (S10) / Night (S888)
- School (S11)
- Pharmacy (S1200)

The current location appears greyed out. Click any other to navigate there. Click the canvas or "Close" to dismiss.

**3. FLAG label improved** — `EVENTFLAGS_MULTI_HS` hotspots now show what flag they set, e.g. `F44=2` instead of `FLAG`. This makes it clear what the safe/magazine interaction does (it's recording that you've interacted with the object, which then triggers a `SCENE_CHANGE` to the close-up puzzle view on the scene reload).

</details>

---

### [68] C analysis — 2026-02-17 17:24:09

**C functions:** `path`, `videos`

<details>
<summary>Full analysis text</summary>

Good — DarylFid is 58×74px at `pos_x=57, pos_y=73`. That renders cleanly. The key insight from the CDVIDEO analysis: conversation videos (C1.AVF, H1.AVF, D1.AVF) are one-per-dialogue-node, and `target_node` like "nd6a" references Nancy's video file, not a scene node — those navigation paths will dead-end for now. But the **tail_entries npc_ref** path (d1 → d38 → d44 → ...) is the main Daryl conversation chain, and that DOES work with our new code.

Let me verify the complete final state of the conversation changes:

</details>

---

### [69] C analysis — 2026-02-17 17:24:33

**C functions:** `encounter`, `exists`, `frame`, `greeting`, `loadScene`, `navigateConv`, `renderNPCs`, `work`

<details>
<summary>Full analysis text</summary>

Everything is in place. Here's a summary of all three changes made:

---

**1. Daryl now visible on the panoramic scene**

Added `renderNPCs()` which reads `PLAY_SECONDARY_VIDEO` actions and draws the character's first AVF frame (`DarylFid_000.png`, 58×74px) at `pos_x=57, pos_y=73` on the diner panoramic — but only at the variants where that frame entry exists (frames 1, 2, 3 in S824). Daryl now appears as a still sprite when you pan to those positions.

**2. Conversation choices now work (for the main path)**

The conversation system was updated to handle **`tail_entries` npc_refs** as choice buttons:
- When Daryl's greeting (`d1`) shows, `tail_entries` contains `npc_ref id=38` → this creates a choice button labeled with the first 65 chars of `d38`'s dialogue text
- Clicking it calls `navigateConv("D38")` → `loadScene("S141")` → S141 fires its `EVENTFLAGS` (marks the topic visited) → auto-shows `d38`
- `d38` has `npc_ref 44` → shows another button → navigates to `d44`, and so on
- The conversation chain follows the game's linear topic structure: d1 → d38 → d44 → ...

Flags in `tail_entries` (like `flag 38=2`, marking that you've met Daryl) are now auto-applied when a node is shown, so subsequent visits to S101 correctly show `d03`/`d04`/`d05` instead of `d1`.

**Note on standard `choices[]` format**: Nodes that use `choices[].target_node = "nd6a"` still dead-end (that "nd6a" is Nancy's video filename, not a conversation node in our scene data). But the main Daryl encounter (tail_entries chain) is fully navigable.

</details>

---

### [70] C analysis — 2026-02-17 21:31:09

**C functions:** `Background`, `Daryl`, `Kill`, `S3201`, `S3202`, `actions`, `arrows`, `bases`, `canvas`, `code`, `continueConv`, `coordinates`, `data`, `decode`, `dialog`, `drawImage`, `engine`, `entries`, `flag`, `frames`, `goodbye`, `greeting`, `hideConv`, `increases`, `mapping`, `navigation`, `nodes`, `person`, `pixels`, `references`, `renderNPCs`, `resolution`, `scrolling`, `setting`, `sprite`, `summary`, `truncated`, `tryLoadImg`, `values`

<details>
<summary>Full analysis text</summary>

Here's a comprehensive prompt summarizing everything:

---

## Project: Nancy Drew: Secrets Can Kill (1998) Web Game Engine

### What This Project Is
We're building a web-based reimplementation of the 1998 point-and-click adventure game "Nancy Drew: Secrets Can Kill" using HTML5 Canvas + vanilla JavaScript. The game data has been extracted from the original game's binary files using custom Python decoders.

### Files and Tools Built
- **`nd1-scene.py`**: Decodes all 587 scene DATA files from CifTree.dat into `nd1_scenes.json`. Each scene has a summary (background AVF, ambient sound, frame count) and an array of actions (hotspots, scene changes, conversations, inventory, flags, NPC overlays, etc.)
- **`nd1-avf.py`**: Decodes AVF video files into individual PNG frames (stored in `nd1_avf_frames/`)
- **`nd1-his.py`**: Converts HIS audio files to WAV
- **`index.html`**: Game page with canvas (536×292), conversation overlay, map travel overlay, inventory bar, debug controls
- **`engine.js`**: The game engine (single IIFE module `ND`) handling rendering, scene loading, hotspot click detection, panoramic scrolling, conversations, inventory, map travel, NPC overlays
- **`nd1_scenes.json`**: All decoded scene data (587 scenes, ~2800 actions)
- **`Game.exe.c`**: Decompiled C source of the original game engine (4.4MB, from Ghidra) — available for reference on how the original engine works

### What Works
- Scene rendering with panoramic scrolling (multi-frame backgrounds)
- Hotspot detection and scene navigation (HOT_1FR_SCENE_CHANGE, HOT_MULTIFRAME_SCENE_CHANGE, etc.)
- EVENTFLAGS_MULTI_HS: click-triggered flag setting (fixed to only set on click, not on load)
- Scroll arrows (◀/▶) with correct left/right mapping (higher variant = leftward view)
- Travel map dialog (5 hub locations: Aunt's House S9, Diner Day S10, Diner Night S888, School S11, Pharmacy S1200)
- Inventory system with sprite rendering
- Ambient sound and sound effects
- Scene history / Back navigation
- Debug overlay showing hotspot regions and flag state

### What's Broken — Three Issues to Fix

#### 1. Daryl's Sprite Has Green Background (Chroma Key Not Applied)
**Problem**: `renderNPCs()` draws `DarylFid_000.png` directly without removing the green chroma-key background. The sprite appears with a solid green rectangle behind it.

**Current code** (engine.js `renderNPCs`):
```javascript
const img = await tryLoadImg(FRAMES_DIR, act.asset_name, '_000.png');
if (img) ctx.drawImage(img, fr.pos_x, fr.pos_y);
```

**Fix needed**: After loading the image, use an offscreen canvas to replace green pixels (where G channel dominates R and B) with transparent, then draw the result.

#### 2. Daryl Doesn't Appear in the Right Position
**Problem**: The PLAY_SECONDARY_VIDEO action in S824 has 4 frame entries for Daryl with pos_x/pos_y values (57,73) or (38,73). The hotspot coordinates (hs_x1 values: 14, 178, 334, 497) progress correctly across panoramic frames, but the sprite draw position may be wrong.

**Data**: S824 PLAY_SECONDARY_VIDEO for DarylFid:
- Frame 0: pos_x=57, pos_y=73, hs_x1=14
- Frame 1: pos_x=57, pos_y=73, hs_x1=178
- Frame 2: pos_x=38, pos_y=73, hs_x1=334
- Frame 3: pos_x=38, pos_y=73, hs_x1=497

The hotspot X values increase as frame increases (panoramic panning makes objects shift right). The pos_x values (57, 38) seem oddly small and don't match hotspot positions. The 66-byte per-frame binary format has 6 "unknown" bytes between the frame number and pos_x — these might actually contain the correct draw position, and the current decoder might be reading the wrong offsets. Investigation needed: check the raw binary of S824's PLAY_SECONDARY_VIDEO entries.

#### 3. Conversation Flow is Wrong
**This is the most complex issue.**

**How conversations SHOULD work** (per user who played the original game):
1. NPCs don't speak unless clicked on
2. When clicked, the NPC says a greeting (randomized from a pool)
3. Nancy is presented with response options to ask about topics
4. Nancy always has a "See ya later" exit option
5. At conversation end, the NPC says a goodbye (randomized)
6. Nancy is first-person (never shown on screen, no video files, only audio files)

**Example: First meeting with Daryl in the Diner**
- Click Daryl sprite (PLAY_SECONDARY_VIDEO in S824, target_scene=101) → navigate to S101
- S101 has CONVERSATION_VIDEO node `d1`: "You look like you're going to make an excellent addition to Paseo Del Mar High School's student body."
- Auto-advance to d02 (in S3201): "I'm Daryl Gray - Renaissance Man, short-order cook, Student Council President and professional escort to pretty new students."
- Nancy's choices appear:
  1. "Do you really think so?" → Daryl: "Definitely. You're amazing..."
  2. "Short-order cook?" → Daryl: "I flip burgers here at Marine's..."
  3. "Professional escort?" → Daryl: "At your service" then "I'm a man of many talents..."
  4. "See ya later" (exits conversation)
- After Nancy picks a choice, Daryl responds, then Nancy gets MORE choices. The conversation tree branches.

**Current broken behavior**: The engine treats `tail_entries` npc_refs as choice buttons, showing Daryl's NPC text as button labels. This is completely wrong.

**What `tail_entries` actually mean** (from binary analysis):
Each CONVERSATION_VIDEO node's tail section has 6-byte entries:
- `{type:"flag", id:N, value:V}` — sets a game flag (e.g., flag 38=2 marks "met Daryl")
- `{type:"npc_ref", id:N, param:P}` — auto-advance navigation link, NOT a player choice
- `{type:"separator"}` — all zeros, terminator

For d1's tail: `[{flag: id=38, value=2}, {npc_ref: id=38, param=1}, {separator}]`

**Key discovery about npc_ref navigation**:
The npc_ref `param` value maps to a continuation scene: `S${3200 + param}` for Daryl (d-prefix nodes).
- d1's npc_ref param=1 → S3201 (which contains d02 "I'm Daryl Gray - Renaissance Man...") ✓
- d38's npc_ref param=2 → S3202 (which contains d08 "many talents")
- The base 3200 is for Daryl. Other characters likely have different bases (TBD).

**Conversation scene data structure**:
- S101 contains d1, d03, d04, d05 — multiple greeting nodes (one per game state), each with internal conditions we don't currently decode (they're inside the 1692-byte fixed header, not in trailing condition records)
- S3201 contains d02 with `choice_count=3` and choices: "Do you really think so?" → nd1a, "Short-order cook?" → nd2a, "Professional escort?" → nd2b
- S3201-S3223 are Daryl's continuation/response scenes
- S141, S146, etc. are Daryl conversation scenes in the S1xx range
- All 587 d-prefix nodes have npc_text that's truncated (null-terminated short memo, not full script — the full dialogue is spoken via AVF video/audio in the original game)

**Choice targets like "nd1a"**: These are Nancy's audio file references (n=Nancy, d1a=dialogue 1a). They don't exist in convIndex as scene nodes. After Nancy's choice, Daryl's RESPONSE should auto-show, but the mechanism for finding which Daryl node responds to which Nancy choice is not yet decoded. The response scenes might be encoded within the 471-byte choice entries (400 bytes text + 71 bytes target_node, with padding that may contain scene IDs).

**What the conversation fix needs**:
1. Nodes with `choice_count > 0`: show choice buttons + implicit "See ya later" exit
2. Nodes with `choice_count = 0` + npc_refs: show "Continue" button that auto-navigates to `S${3200 + ref.param}`
3. Nodes with `choice_count = 0` + no npc_refs: "Continue" button closes conversation
4. The Continue button currently calls `ND.hideConv()` — needs to call a new `ND.continueConv()` that checks for pending navigation
5. Choice target resolution (nd1a → Daryl response) is a FUTURE task once we get basic flow working

### Reference: Game.exe.c Structure
The decompiled C code (`/Users/bachman/Desktop/Projects/nd/Game.exe.c`, 4.4MB) contains the original engine. Key findings:
- Conversation processing is in `ProcessConversation` (around line 34300)
- Action record parsed structure uses offsets: 0x6f6 (NPC video entry count), 0x6f8 (pointer), 0x6fc (scene nav entry count), 0x6fe (pointer), 0x702 (choice count), 0x704 (pointer)
- The action loading code (around line 39060) handles types 0x38 (CONVERSATION_VIDEO_ALT), 0x39 (CONVERSATION_CEL), 0x3a (CONVERSATION_SOUND) — note these are DIFFERENT internal type IDs from the Python decoder's 0x32/0x39/0x3a
- NPC video entries are 0x1ae (430) bytes each in the parsed structure
- Scene navigation entries are 0x10 (16) bytes each
- The tail/navigation section at 0x6fc stores scene IDs for post-conversation navigation (line 34357: `DAT_00514dad = *(short *)(iVar6 + 6 + *(int *)(iVar8 + 0x6fe))`)

### What To Do Next
1. **Fix `renderNPCs`**: Apply chroma-key green removal using offscreen canvas pixel manipulation
2. **Fix conversation flow in `showConv`**: Remove old npc_ref→choice-button logic. Instead: npc_refs = auto-advance via Continue button navigating to `S${3200 + param}`. Choices show as proper buttons with "See ya later" added.
3. **Add `continueConv()` function**: Manages pending npc_ref navigation or closing
4. **Update index.html**: Continue button calls `ND.continueConv()` instead of `ND.hideConv()`
5. **Investigate Daryl position**: Check raw binary of S824 PLAY_SECONDARY_VIDEO frame entries to verify pos_x/pos_y offsets are correct in the decoder
6. **Future**: Decode choice→response mapping (nd1a → which Daryl response node), decode internal conditions in CONVERSATION_VIDEO 1692-byte header, add randomized greetings/goodbyes, handle other characters' continuation scene bases

---

</details>

---

### [71] C analysis — 2026-02-20 07:26:00

**C functions:** `activation`, `logic`

<details>
<summary>Full analysis text</summary>

This is an impressive reimplementation project. I can see the detailed remaining work breakdown with P0-P3 priorities. You have Game.exe.c open in your editor.

What would you like to tackle? The P0 critical path blockers seem like the natural starting point:

1. **Slider puzzle** - needs interactive 3x3/4x4 tile-sliding logic (S647)
2. **Flag 5** - "Watched Blackmail Tape" never gets set (tape scenes S650-S655)
3. **Flag 62** - Boiler crisis phase activation (f62=1 never set)
4. **End-to-end playtest** verification

Or would you prefer to work on something else from the list?

</details>

---

### [72] C analysis — 2026-02-20 07:32:27

**C functions:** `S632`, `S655`, `loads`

<details>
<summary>Full analysis text</summary>

I now have a complete understanding of both issues. Here's what I need to do:

**Flag 5**: When the player enters S655 (clicking the TV with the VHS tape), set `flags[5] = 2` and navigate back to S632 (TV scene). The PLAY_SECONDARY_MOVIE data blob in the original game does this, but our engine can't parse it.

**Flag 62**: When S3216 loads (Daryl's "deliver food to pharmaceutical plant" conversation), set `flags[62] = 1` to activate the boiler crisis. In the original game, Game.exe does this alongside the f40=2 tail_entry.

Let me add both hooks in loadScene, right after the scene ID is set.

</details>

---

### [73] C analysis — 2026-02-20 07:32:53

**C functions:** `S632`, `S655`, `loads`, `questions`, `variants`

<details>
<summary>Full analysis text</summary>

Both fixes are in place at [engine.js:1426-1444](engine.js#L1426-L1444). Here's what was added:

**Flag 5 — "Watched Blackmail Tape"** (line 1433-1436):
- When the player enters S655 (clicking the TV with the VHS tape from S32/S632), `state.flags[5]` is set to `2`
- Since FMV playback isn't implemented, the scene immediately redirects back to S632 (the TV/VCR close-up) so the player isn't stuck in a dead-end scene
- This unblocks: post-tape diner routing in S10, and the f5-gated investigation questions (DIC14, CIC8, HIC5, etc.)

**Flag 62 — "Boiler Crisis Phase"** (line 1442-1443):
- When S3216 loads (Daryl's "deliver food to pharmaceutical plant" conversation), `state.flags[62]` is set to `1` (crisis active)
- This fires alongside the existing tail_entry that sets f40=2 in the same scene
- This unblocks: boiler room scenes routing to the "chains on / about to explode" variants (S2077), and the crisis-gated hotspots throughout the boiler room, school side, and teacher's lounge

</details>

---

### [74] C analysis — 2026-02-20 16:06:54

**C functions:** `Pickup`, `bottom`, `inventory`, `renderSceneItems`, `select`, `space`

<details>
<summary>Full analysis text</summary>

All the pieces are in place. Here's a summary of what was implemented:

### Item Pickup (Critical Path)

1. **[engine.js:477](engine.js#L477)** — `renderSceneItems()` now skips rendering items already in inventory (so picked-up items disappear from scenes)

2. **[engine.js:1611-1622](engine.js#L1611-L1622)** — `SHOW_INVENTORY_ITEM` actions are registered as clickable hotspots in the loadScene action loop, using the item's `dst_rect` as the click region

3. **[engine.js:1962-1970](engine.js#L1962-L1970)** — Click handler adds the item to inventory and reloads the scene on pickup

### Item Selection from Inventory Bar

4. **[engine.js:214](engine.js#L214)** — Added `state.activeItem` to track the selected inventory item

5. **[engine.js:1375-1412](engine.js#L1375-L1412)** — Inventory bar slots are now clickable: click to select (gold highlight), click again to deselect. Toggling updates the highlight across all slots.

6. **[index.html:136](index.html#L136)** — Inventory slots now have `cursor: pointer` and a `.inv-selected` class with gold border/glow

7. **[engine.js:1990](engine.js#L1990)** — Mousemove shows `cell` cursor on canvas when an item is selected, `pointer` on hotspots, `crosshair` default

8. **Deselect mechanics**: Right-click on canvas deselects the active item. Clicking empty canvas space (no hotspot) also deselects.

### How it works end-to-end

- **Picking up the cutter**: Visit Jake's locker bottom (variant 1) → cutter sprite renders → click it → added to inventory → sprite disappears
- **Using the key on the library**: Get key from safe → it appears in inventory bar → the library door hotspot in S1416 has `inventory_check: item 9` → just having the key makes the door clickable → clicking it fires EVENTFLAGS_MULTI_HS which sets flags and navigates to the open door scene
- **Visual feedback**: Click an item in the inventory bar to select it (gold highlight, cursor changes to `cell`), signaling you're "holding" it. Right-click or click empty space to put it away.

</details>

---

### [75] C analysis — 2026-02-20 16:10:24

**C functions:** `Drawer`, `S1250`, `actions`, `chest`, `drawer`, `line`, `locker`, `passport`, `safe`, `shaft`

<details>
<summary>Full analysis text</summary>

All 11 SHOW_INVENTORY_ITEM instances are covered. Here's the complete item pickup map — every one of these is now clickable:

| Item ID | Item | Scene | Pickup Location |
|---------|------|-------|-----------------|
| 0 | Bolt cutters | S1048 | Under gas line (kitchen) |
| 1 | Phone card | S627/S628 | End table drawer (Aunt's house) |
| 2 | Coin | S609 | Hope chest (Aunt's house) |
| 3 | Glass cutter | S1430 | Jake's locker (newspaper scene) |
| 5 | Key (passport) | S619 | On passport (Aunt's den) |
| 6 | Ladle | S1041 | Bus bin (diner kitchen) |
| 7 | Video tape | S2050/S2089 | Vent shaft (boiler area) — 2 scenes |
| 8 | Work gloves | S2087 | Tool box (boiler room) |
| 9 | Key (safe) | S57 | Inside safe (Aunt's house) |
| 10 | Remote control | S627/S628 | Drawer (Aunt's house) |

The remaining 2 items enter inventory via `ADD_INVENTORY` actions (auto-add on scene load), which already worked:
- **Item 4 (Gun)** — auto-added in S1250 (endgame)
- **Item 7 (Video tape)** — also auto-added in S32 (TV scene, as a safety net)

The ladle specifically will show in the bus bin scene when `scene_variant==1` and `flag[101]==1`. Once those conditions are met, you'll see it rendered and can click to pick it up. All the same mechanics apply to every item in the list.

</details>

---

### [76] C analysis — 2026-02-20 16:45:42

**C functions:** `bytes`, `decoder`, `engine`, `render`

<details>
<summary>Full analysis text</summary>

That confirms it. The Game.exe reads the data size as `count * 0x22 + 0x0e` where `count` is at offset 12. With count=1 that's 48 bytes — but those 48 bytes only go up to `dst_rect`. The real action data is actually 60 bytes (48 + 12 more), and the decoder's `FIXED_SIZES[0x7a] = 48` causes 12 bytes of action data to be misinterpreted as a `scene_variant: 1` condition.

This is why EVERY SHOW_INVENTORY_ITEM has a phantom `scene_variant: 1` condition — and why no items ever render (scenes always enter at variant 0).

Let me fix both the engine (immediate fix) and the decoder (root cause).

</details>

---

### [77] C analysis — 2026-02-20 16:46:08

**C functions:** `condPass`, `cutter`, `data`

<details>
<summary>Full analysis text</summary>

Now the glass cutter (and all other SHOW_INVENTORY_ITEM items) will render correctly. The fix is in two places:

1. **[engine.js:350-358](engine.js#L350-L358)** — `condPass()` now skips `scene_variant` conditions on `SHOW_INVENTORY_ITEM` actions. This gives immediate effect without re-running the decoder.

2. **[nd1-scene.py:136](nd1-scene.py#L136)** — Fixed the root cause: `FIXED_SIZES[0x7a]` changed from 48 to 60. The extra 12 bytes are part of the action data (a display record), not a condition. Next time the decoder runs, the phantom `scene_variant: 1` conditions will no longer be emitted.

The cutter in S1427, the key in S57, the ladle — all 11 SHOW_INVENTORY_ITEM instances will now render and be clickable for pickup.

</details>

---

### [78] C analysis — 2026-02-17 21:37:18

**C functions:** `continueConv`, `hideConv`, `investigation`, `mapping`, `nodes`, `offset`, `removeChromaKey`

<details>
<summary>Full analysis text</summary>

All three fixes are implemented. Here's a summary:

**1. Chroma key green removal** ([engine.js:203-215](engine.js#L203-L215))
- Added `removeChromaKey()` that copies the sprite to an offscreen canvas, iterates pixels, and sets alpha to 0 where green dominates both red and blue by 1.4x (and G > 100). `renderNPCs` now applies this before drawing.

**2. Conversation flow fix** ([engine.js:260-310](engine.js#L260-L310))
- Removed the broken logic that turned `npc_ref` tail entries into choice buttons showing NPC text as labels
- Nodes with `choices`: show proper player choice buttons + an implicit "See ya later" exit button
- Nodes with `npc_refs` but no choices: show Continue button that auto-advances to `S${base + param}` (e.g., base 3200 for Daryl)
- Terminal nodes (no choices, no refs): Continue closes the conversation
- Added `CONV_BASES` map for character prefix → scene base offset (d=3200, c=3400, h=3600, hd=3800 — the non-Daryl bases are guesses and may need adjustment)

**3. `continueConv()` wired up** ([engine.js:339-346](engine.js#L339-L346))
- New function checks `pendingConvNav` — if set, navigates to the continuation scene; otherwise closes the overlay
- HTML Continue button now calls `ND.continueConv()` instead of `ND.hideConv()`

**Not addressed** (noted as future work in your spec): Daryl position investigation (needs raw binary analysis), choice→response mapping (nd1a → Daryl response node), and other characters' continuation scene bases.

</details>

---

### [79] C analysis — 2026-02-17 21:55:15

**C functions:** `audio`, `available`, `label`, `navigateConv`, `playSound`

<details>
<summary>Full analysis text</summary>

Everything looks clean. Here's a summary of all changes made:

---

**Files changed:**

**1. [nd1-scene.py](nd1-scene.py) — Decoder: extract `response_scene` from choice entries**
- Discovered that byte 11 in the 71-byte target area of each choice entry contains the response scene ID (the scene with the NPC's response after Nancy's choice)
- 188 choices across all conversation nodes now have `response_scene` decoded
- Regenerated `nd1_scenes.json`

**2. [engine.js](engine.js) — Three conversation fixes:**

- **Choice navigation** (lines 296-315): Clicking a choice now plays Nancy's audio (`playSound(ch.target_node)`) and navigates to `S${ch.response_scene}` instead of trying to look up the nonexistent target node in `convIndex` and exiting
- **Removed implicit "See ya later"**: The data already includes "See ya later" as an explicit choice when it should be available (e.g., d36 has it with `response_scene: 69`)
- **NPC audio playback** (lines 290-294): When a conversation node is shown, plays the NPC's dialogue audio (node_id "d02" → "D2.wav", stripping leading zeros) so players hear the full dialogue even though the displayed text is truncated
- **Removed dead `navigateConv()`**: Old broken function that tried to strip 'n' prefix and look up nodes

**About the truncated text:** The `npc_text` field in the binary is inherently a short memo/label (null-terminated early). The full dialogue only existed as spoken audio in the original game. With NPC audio now playing automatically, players hear the complete lines.

</details>

---

### [80] C analysis — 2026-02-17 22:09:42

**C functions:** `S3201`, `S3202`, `S3203`, `advance`, `binary`, `choices`, `code`, `loadScene`

<details>
<summary>Full analysis text</summary>

Here's a summary of everything that was fixed:

---

**Root causes found and fixed:**

**1. Truncated text — Full dialogue was in TWO fields, decoder only read one**
- `npc_text` had TWO fixed fields in the 1692-byte header: offset 61 (first ~100 chars) and offset 161 (continuation)
- Example: `"You look like you're going to make an excellent addition to Paseo Del "` + `"Mar High School's student body."` 
- Fix in [nd1-scene.py](nd1-scene.py): Now reads both fields and concatenates them

**2. Conversation exits after choice — Two missing pieces**

**2a. `response_scene` decoded from choice binary (previous round):**
- Byte 11 in the 71-byte target area of each choice contains the scene ID for the NPC's response
- 188 choices across all conversation nodes now have `response_scene` linking to the correct response

**2b. `continuation_scene` decoded from header offset 1634 (this round):**
- For nodes WITHOUT choices (like d78 "At your service"), the `u16 LE` at header offset 1634 contains the auto-advance scene
- d78 → S3202 (d08 "many talents"), d1 → S3201 (d02 intro), d09 → S3203 (d10), etc.
- 108 nodes that previously had NO way to advance now have `continuation_scene`

**3. Engine changes in [engine.js](engine.js):**
- Choice onclick is now `async` with `await loadScene(...)` so the response scene loads reliably
- Uses `act.continuation_scene` for auto-advance (replaces the fragile npc_ref base-offset formula)
- Re-added implicit "See ya' later" exit button when choices don't already include one (checked via text match)
- Removed dead code (`CONV_BASES`, `getConvBase`, `navigateConv`)

**Expected flow now for Daryl's first meeting:**
1. Click Daryl → S101: d1 "You look like you're going to make an excellent addition..." → Continue
2. → S3201: d02 "I'm Daryl Gray - Renaissance Man..." → 3 choices + "See ya' later"
3. Pick "Professional escort?" → S107: d78 "At your service." → Continue
4. → S3202: d08 "I'm a man of many talents..." → 3 choices + "See ya' later"

</details>

---

### [81] C analysis — 2026-02-17 22:22:17

**C functions:** `continueConv`, `node`, `playSound`, `scene`, `waitForSound`

<details>
<summary>Full analysis text</summary>

Both fixes are in:

1. **Audio overlap** — `playSound()` now returns the Audio element, and `waitForSound()` returns a promise that resolves when it ends. Nancy's choice handler awaits her audio before loading the NPC's response scene, so they no longer talk over each other.

2. **Daryl's exit redirect** — `continuation_scene: 5` (the start scene) is now recognized as an "exit conversation" sentinel and treated as a terminal node. When Continue is pressed on a terminal node (including "See ya later"), `continueConv()` walks back through history to find the last non-conversation scene (e.g., the diner) and returns there instead of navigating to S5.

</details>

---

### [82] C analysis — 2026-02-18 02:42:51

**C functions:** `S151`, `byte`, `condPass`, `conditions`, `entries`, `filtering`, `node`

<details>
<summary>Full analysis text</summary>

Now I have the full picture. Here's the analysis:

## How Conversation Progression Works

**Three mechanisms control which dialogue appears:**

### 1. Node Selection via `npc_ref` conditions (not yet implemented)

When a scene like S101 has multiple CONVERSATION_VIDEO actions, the `npc_ref` entries in each node's `tail_entries` serve as **implicit conditions** for which node to display. The pattern:

| Node | Text | npc_ref conditions | Also sets |
|------|------|-------------------|-----------|
| `d1` | "You look like an excellent addition..." | flag 38 != 2 (first visit) | flag 38=2 |
| `d05` | "How can I help my number one detective?" | flag 38==2, flag 39 != 2 | — |
| `d03` | "Okay detective, you got me..." | flag 38==2, flag 39==2, flag 40 != 2 | — |
| `d04` | "Hey, I'm there for you sweetheart..." | flag 38==2, flag 39==2, flag 40==2 | — |

Where `param=1` means "flag NOT set to 2" and `param=2` means "flag IS 2".

### 2. External flags set by game events

The flags checked by npc_refs are set by EVENTFLAGS actions in **other scenes**:

- **Flag 38** (met Daryl): Set by d1's own `tail_entries` when first conversation plays
- **Flag 39** (met Hulk + seen Daryl confession): Set by EVENTFLAGS in S151 ("have met hulk, not talked to dar")
- **Flag 40** (deliver food to pharmacy): Set by node `d68` in S3216 — a specific conversation branch about delivering food

So the progression is: first visit → d1, then normally → d05, after meeting Hulk → d03, after pharmacy delivery quest → d04.

### 3. Dynamic choice filtering (not yet implemented)

Each choice in the `choices` array has 5-byte `conditions` sub-entries (currently stored as hex strings in the decoder). The original `FUN_00458284` in Game.exe.c evaluates these to dynamically **add or remove** choices from the list based on game state. The choice entry type byte (at offset 0x1A0 in the loaded struct) determines:
- Type 0: Add choice if conditions pass
- Type 1: Special action
- Type 2: Remove choice if conditions pass

### What the engine needs

The engine currently takes the **first** CONVERSATION_VIDEO action that passes `condPass()`. Since all nodes have empty `conditions` arrays, it always picks `d1`. The fix: evaluate `npc_ref` tail entries as node selection conditions, picking the **last** matching node (most specific match, since they're ordered from least to most specific requirements).

Want me to implement the npc_ref-based node selection in the engine?

</details>

---

### [83] C analysis — 2026-02-18 02:43:41

**C functions:** `condPass`, `npcRefsPass`, `passes`, `specific`

<details>
<summary>Full analysis text</summary>

Done. Here's how it works:

- **`npcRefsPass(act)`** evaluates all `npc_ref` entries in a node's `tail_entries` as conditions: `param=2` requires the flag to be 2, `param=1` requires it to NOT be 2.
- **Node selection** now iterates all CONVERSATION_VIDEO actions in the scene and keeps the **last** one that passes both `condPass()` and `npcRefsPass()`. Since the nodes are ordered from least to most specific (d1 → d05 → d03 → d04), the last match is always the most specific.

For Daryl's S101 progression:
- **First visit**: flag 38 unset → d1 passes (`param=1` on flag 38), d05/d03/d04 fail → shows **d1**, sets flag 38=2
- **Return visit**: flag 38=2, flag 39 unset → d05 passes, d03/d04 fail → shows **d05**
- **After meeting Hulk** (flag 39=2 set by S151): d03 passes, d04 fails → shows **d03**
- **After pharmacy quest** (flag 40=2 set by d68 in S3216): d04 passes → shows **d04**

</details>

---

### [84] C analysis — 2026-02-18 02:49:01

**C functions:** `attempts`, `console`

<details>
<summary>Full analysis text</summary>

Now when you visit S101, the browser console (F12 / DevTools) will show which nodes pass/fail and the current flag state. After talking to Daryl once and clicking him again, check the console — we should see:
- `CONV d1: npcRefsPass=false` (flag 38 is now 2)
- `CONV d03: npcRefsPass=false` (flag 39 not yet 2)
- `CONV d04: npcRefsPass=false` (same)
- `CONV d05: npcRefsPass=true` (flag 38=2, flag 39 not set)

If you're seeing `d1: npcRefsPass=true` on the second visit, it means flag 38 wasn't persisted — which could happen if you're refreshing the page between attempts (state is in-memory only). Can you test by talking to Daryl, exiting the conversation, then immediately clicking him again without refreshing?

</details>

---

### [85] C analysis — 2026-02-18 02:58:15

**C functions:** `before`, `node`

<details>
<summary>Full analysis text</summary>

Now the flow should be:

1. **First visit**: Click Daryl → S101/d1 ("You look like an excellent addition...") → Continue → `inConvChain=true` → S3201/d02 — but `skipText` is true since we're in a chain AND d02 has choices → **skip intro text, show choices directly**
2. **Return visit**: Click Daryl → S101/d05 ("How can I help...") → Continue → `inConvChain=true` → S3201/d02 — **skip intro text, show choices directly**

Wait — this also skips d02's intro on the FIRST visit, which might not be desired. Let me reconsider... Actually, for the first visit d1 says "You look like you're going to make an excellent addition..." and then d02 says "I'm Daryl Gray - Renaissance Man...". Both of these should play on the first visit since d1 is just a quick greeting and d02 is the actual introduction.

Let me refine: only skip the hub text when the greeting node was a **return-visit** node (not d1). The simplest way: only skip when the text would be redundant — i.e., when `inConvChain` is true AND the greeting already conveyed meaningful dialogue. Actually, the cleanest approach: only skip when the choice hub node has already been seen before (flag 38 is set, meaning we've already heard d02's intro).

</details>

---

### [86] C analysis — 2026-02-18 03:34:05

**C functions:** `code`

<details>
<summary>Full analysis text</summary>

Good, regenerated. Now let me tackle the continuation_scene=3201 sentinel issue. Based on my analysis:

- `continuation_scene=3201` appears for ALL NPCs' return-visit greetings, even non-Daryl NPCs
- It's clearly a sentinel meaning "return to this NPC's conversation hub"
- The game must determine the correct hub scene by another mechanism

Let me now check what the `continuation_scene` field really means by looking at the bytes more carefully. The key insight from the Game.exe.c code (lines 34346-34375) is that the game has a **conditional navigation array** within the conversation processor object that routes to different scenes based on conditions - separate from the raw continuation_scene value.

</details>

---

### [87] C analysis — 2026-02-18 03:42:00

**C functions:** `choices`, `scenes`

<details>
<summary>Full analysis text</summary>

Now there's a subtle issue. The hub scene list for each NPC will include ALL scenes with choices for that NPC - including response scenes that happen to have choices (like sub-conversations). I need to filter to only include scenes that function as **hubs** (the main choice-presenting scenes), not response scenes. Response scenes typically have `continuation_scene` that chains back to the hub (3201 or the hub's own scene number), while hub scenes tend to have `continuation_scene=5` (exit).

Actually, let me think about whether this matters in practice. The `resolveHubScene` function skips seen nodes. On a return visit:
1. d02 (S3201) is seen → skip
2. d08 (S3202) is NOT seen → return S3202 ✓

After visiting S3202 and asking a question, d08 gets marked as seen. On the NEXT return visit:
1. d02 seen → skip
2. d08 seen → skip  
3. d10 (S3203) NOT seen → return S3203

This actually works well for progressive conversation! Each visit advances to the next hub.

But there's a problem: response scenes (like S3208/d31 which has 1 choice) will also be in the list. If we visit S3208 during a conversation, d31 gets marked seen, so it won't be falsely returned. And response scenes with choices would only show up if ALL prior hubs are exhausted, which should be fine.

Let me also check: are the NPC prefix mappings correct for response scenes? Response node IDs like "nd8a" (Nancy responding to Daryl) - what prefix does that get?

</details>

---

### [88] C analysis — 2026-02-18 03:42:11

**C functions:** `prefix`

<details>
<summary>Full analysis text</summary>

Good - hub scene node IDs use the NPC prefix (d, hd, c, H/h). Response scenes like S105/d6 and S106/D7 also use the NPC prefix. These will be included in the hub list but will be skipped once seen. This should work correctly.

Wait - S105/d6 has choices=1. This is a response scene for Daryl's "Do you really think so?" choice. It will be in Daryl's hub list. If d02 and d08 are both seen, and d6 hasn't been seen yet, `resolveHubScene` might return S105 as the next hub. That would be wrong - S105 is a mid-conversation response, not a hub.

I need to filter the hub list. Hub scenes should only include scenes that are conversation "entry points" - the main choice-presenting scenes that NPC greetings route to. Let me look at what distinguishes hubs from responses.

</details>

---

### [89] C analysis — 2026-02-18 03:48:27

**C functions:** `visit`

<details>
<summary>Full analysis text</summary>

All four fixes are complete:

1. **response_scene u8→u16** — Hal/Hulk/Connie responses now point to correct scenes
2. **continuation_scene=3201 sentinel** — Now resolved per-NPC using `greetingLevel` (count of param=2 npc_refs in the greeting's tail_entries). First visit (0 param=2 refs) → hub[0] (S3201), basic return (1 param=2 ref) → hub[1] (S3202), etc.
3. **SPEAKERS h/hd swap** — Already fixed: `hd: 'Hulk Sanchez'`, `h: 'Hal Tanaka'`
4. **Debug console.log** — Already removed from CONVERSATION_VIDEO case

The key change in this session: the CONVERSATION_VIDEO case now computes `greetingLevel` directly from the selected greeting node's tail_entries rather than using a positional index, and `resolveHubScene` uses that level to pick the correct hub scene for each NPC. This means Daryl's return visit (d05, 1 param=2 ref) correctly routes to S3202 with "Who was murdered?" choices instead of S3201's first-visit choices.

</details>

---

### [90] C analysis — 2026-02-18 03:55:03

**C functions:** `S3210`, `startsWith`

<details>
<summary>Full analysis text</summary>

There are **5** Daryl hub scenes, not 4. S3210 (d36) is also included. But more importantly, let me check if there are other NPC scenes in the 3000+ range that have `d`-prefixed node_ids that might be getting miscategorized. The `getNpcPrefix` function checks `id.startsWith('d')` — but node IDs starting with 'd' could include response scenes too.

Let me check the actual hub list that gets built. The issue is likely that `getNpcPrefix` is matching node_ids from non-hub conversation scenes too. Let me search more broadly.

</details>

---

### [91] C analysis — 2026-02-18 04:18:04

**C functions:** `S3201`, `S3202`, `again`

<details>
<summary>Full analysis text</summary>

Very interesting — 3202 doesn't exist ANYWHERE in d05's data. The value 3201 at offset 1634 is the ONLY hub reference. This means continuation_scene=3201 is NOT a sentinel — it's a literal "go to S3201."

The original game's conversation tree is self-routing through the response chain:
- First visit: d1 → S3201 (3 initial choices)
- Pick "Professional escort?" → S107 → chains to S3202 (deeper questions)
- Return visit: d05 → S3201 again (same starting choices, explore different branches)

**Our sentinel code is the bug.** It intercepts continuation_scene=3201 and reroutes to wrong hubs. Let me remove all the custom routing and just navigate to `S${continuation_scene}` directly.

</details>

---

### [92] C analysis — 2026-02-18 04:19:18

**C functions:** `S3201`, `code`, `hubs`

<details>
<summary>Full analysis text</summary>

Here's what I found and fixed:

**The root cause:** continuation_scene=3201 is NOT a sentinel — it's a literal scene number. The original game's conversation routing is **self-chaining**: response scenes contain their own continuation_scene pointing to the next hub. For example:
- "Professional escort?" → S107 → continuation_scene=**3202** 
- "Mysterious?" → S108 → continuation_scene=**3203**
- "A diner?" → S109 → continuation_scene=**3204**

So the flow is:
1. Every visit starts at S3201 (the initial conversation hub with 3 choices)
2. The player explores branches, and the responses chain them to deeper hubs (S3202, S3203, etc.) with new questions
3. On return visits, the player goes back to S3201 and can pick different branches

**What I removed:** All the custom sentinel interception code (`CONV_HUB_SENTINEL`, `npcHubScenes`, `greetingLevel`, `getNpcPrefix`, `buildNpcHubIndex`, `resolveHubScene`, and debug `console.log` calls). The engine now simply navigates to `S${continuation_scene}` directly, matching the original game's behavior.

</details>

---

### [93] C analysis — 2026-02-18 04:24:01

**C functions:** `arithmetic`, `scene`, `sound`

<details>
<summary>Full analysis text</summary>

All three fixes applied:

1. **360° panoramic navigation** — The scroll now wraps around using modular arithmetic (`(variant + dir + maxFrames) % maxFrames`) instead of clamping at edges. Both arrow indicators always show for panoramic scenes.

2. **Clock tick-tock / basketball sounds replaying** — Added `isSameScene` tracking in `loadScene`. When reloading the same scene (panoramic scroll, flag update click), `PLAY_DIGI_SOUND` / `PLAY_DIGI_SOUND_2` / `PLAY_SOUND_PAN_FRAME` actions are now skipped. The ambient sound (`setAmbient`) already had its own dedup check, so it's unaffected.

</details>

---

### [94] C analysis — 2026-02-18 04:45:24

**C functions:** `panoramic`

<details>
<summary>Full analysis text</summary>

Here's what I fixed:

**1. Frame decoding bug** — The `frame` field in `PLAY_SECONDARY_VIDEO` entries was decoded as `u32` but is actually `u16`. This caused Hal's frame 10 to decode as `2883594` and Hulk's frame 1 to decode as `1114113`, meaning those NPCs wouldn't appear for those panoramic positions. Fixed in the decoder and regenerated the JSON.

**2. NPC positioning** — Discovered that `pos_x`/`pos_y` are NOT screen coordinates — they're the sprite dimensions minus 1 (Hal: 81 = 82-1, Daryl: 57 = 58-1, etc.). The actual screen position is defined by the **hotspot bounds** (`hs_x1`/`hs_y1` through `hs_x2`/`hs_y2`), which shift per panoramic frame as the NPC slides across the view. 

The rendering now uses `draw_x = hs_x2 - sprite_width`, `draw_y = hs_y2 - sprite_height`. This:
- Correctly positions NPCs for each panoramic frame
- Handles edge cases where the NPC wraps around the panoramic (negative draw coords are auto-clipped by the canvas)
- NPCs now move naturally as you pan left/right

</details>

---

### [95] C analysis — 2026-02-18 04:55:25

**C functions:** `Decoder`, `Gaps`, `Kill`, `Puzzles`, `Routing`, `Stack`, `array`, `backgrounds`, `byte`, `chaining`, `changes`, `choices`, `clock`, `conditions`, `data`, `decoding`, `display`, `diversions`, `effects`, `engine`, `executable`, `files`, `handling`, `header`, `ignored`, `management`, `node`, `overlay`, `parsing`, `playback`, `positioning`, `progression`, `rendering`, `setting`, `structure`, `system`, `types`, `viewport`, `wrapping`

<details>
<summary>Full analysis text</summary>

Here's the comprehensive project status prompt:

---

## Nancy Drew: Secrets Can Kill (1998) — Web Engine Reimplementation

### Project Overview

We are building a browser-based reimplementation of **"Nancy Drew: Secrets Can Kill"** (1998, HerInteractive), the first game in the Nancy Drew point-and-click adventure series. The original game runs on a proprietary Windows engine; we are recreating it as a **vanilla HTML5 Canvas + JavaScript** web app that runs entirely client-side.

**Architecture:**
- **`nd1-scene.py`** — Python decoder that parses the original game's binary scene data files (IFF-style `DATA` chunks from `CifTree.dat`) into `nd1_scenes.json`
- **`engine.js`** — ~780-line JavaScript game engine that loads the JSON, renders scenes, handles navigation, conversations, inventory, and game state
- **`index.html`** — Single-page UI with canvas viewport (536×292 native, CSS-scaled 1.5×), conversation overlay, inventory bar, map/travel dialog, and debug controls
- **Asset directories:** `nd1_avf_frames/` (PNG frames extracted from AVF video files), `nd1_audio/` (WAV sound files), `nd1_images/` (sprite sheets), `nd1_extracted/` (raw binary scene data)
- **`Game.exe.c`** — Decompiled original game executable used as reference for understanding the engine's logic

**How the original engine works:**
- The game is organized into ~587 **scenes**, each containing a `SCENSSUM` header (background image, ambient sound, description) and multiple `ACT` action records
- Action records define everything: hotspot click regions, scene transitions, NPC overlays, conversation trees, inventory management, flag/condition logic, puzzles, sounds, etc.
- Each action has a type byte (e.g., `0x0a` = hotspot scene change, `0x32` = conversation, `0x33` = NPC overlay) and optional trailing 12-byte condition records that gate whether the action is active
- Game state is driven by **event flags** (integer key-value pairs) and **inventory** (set of item IDs)
- Panoramic scenes use multi-frame AVF backgrounds (up to 30 frames) with 360° wrapping navigation
- Conversations are complex: each node (`CONVERSATION_VIDEO`, type `0x32`) contains NPC dialogue text, optional player choices (each pointing to a response scene), continuation scenes for linear dialogue chains, and tail entries with flag-setting and NPC-ref conditions

---

### What's Working

**Core Engine:**
- Scene loading and rendering (background images from AVF frames)
- Condition evaluation system (flag checks, inventory checks, scene variant checks, timed flags)
- Event flag state management (`state.flags` object)
- Scene history with Back button navigation

**Navigation:**
- Single-frame hotspot scene changes (`HOT_1FR_SCENE_CHANGE`, `HOT_1FR_EXITSCENE`)
- Multi-frame hotspot scene changes (`HOT_MULTIFRAME_SCENE_CHANGE`) — hotspots tied to specific panoramic frames
- Direct/auto scene changes (`SCENE_CHANGE`) with condition gating
- 360° panoramic scrolling with wrapping (left/right edge click zones, `(variant + dir + maxFrames) % maxFrames`)
- Correct panoramic starting frame via `scene_param` field
- Travel map dialog with location buttons

**Conversations:**
- Basic conversation display: speaker name, NPC text, player choice buttons
- NPC dialogue audio playback (derived from `node_id`)
- Nancy's response audio with wait-for-completion before navigating
- Player choice → response scene navigation
- Continuation scene chaining (linear dialogue: node → next hub → next node)
- Implicit "See ya later" exit button when no explicit exit choice exists
- Tail entry flag-setting (marks nodes as visited)
- NPC-ref conditions (`npc_ref` with `param=1`/`param=2`) for selecting which conversation node to display based on visit state
- Terminal node handling (pops back to last non-conversation scene)

**Audio:**
- Sound effects (`PLAY_DIGI_SOUND`, `PLAY_DIGI_SOUND_2`, `PLAY_SOUND_PAN_FRAME`)
- Ambient/looping audio per scene
- Same-scene reload detection to prevent repeating one-shot sounds on panoramic panning

**Visuals:**
- NPC character rendering (`PLAY_SECONDARY_VIDEO`) with chroma-key green screen removal
- Hotspot-based NPC positioning (`draw_x = hs_x2 - sprite_width`, `draw_y = hs_y2 - sprite_height`) that adjusts per panoramic frame
- Inventory item sprite rendering on scene backgrounds (`SHOW_INVENTORY_ITEM`)
- Inventory bar with sprite sheet cropping and item labels
- Debug hotspot overlay (toggle with Debug button)

**Inventory:**
- `ADD_INVENTORY` / `REMOVE_INVENTORY` actions
- Inventory state tracked as a Set
- Visual inventory bar below the game viewport

**Decoder (`nd1-scene.py`):**
- Decodes all 587 scenes and ~2000+ actions from binary data files
- Handles IFF chunk parsing, SCENSSUM headers, and 30+ action types
- Condition record decoding (flag checks, scene variants, inventory, timed flags, timers)
- Conversation node parsing (1692-byte fixed header + variable choices + tail entries)
- AVF frame count detection from extracted PNG files

---

### Known Issues / Needs Fixing

**Conversation Routing (HIGH PRIORITY):**
- After removing the incorrect custom sentinel/greeting-level routing system, the basic continuation_scene chaining is in place, but conversations were reported as "still wrong" before we shifted focus to other bugs. Daryl may still be loading incorrect responses in some cases.
- The decompiled C code shows a **three-tier routing priority** in `ProcessConversation`: (1) conditional continuation entries at `obj+0x6FC/0x6FE`, (2) unconditional continuation at `obj+0x6EA/0x6EC`, (3) pop scene stack at `obj+0x6EB`. Our decoder currently only extracts the unconditional continuation_scene at offset 1634. The conditional continuation array (type `0x38`/`0x39`/`0x3a` in the constructor) may not apply to type `0x32`, but this hasn't been fully verified.
- Conversation state progression (advancing the game's story flags based on which conversations have been completed) needs validation.

**NPC Rendering:**
- Currently only renders frame `_000.png` (static first frame) for NPC sprites. The original game plays animated character loops. We'd need to either extract all NPC animation frames and cycle through them, or accept static sprites as a simplification.
- NPC placement fix (hotspot-based positioning) was just implemented but hasn't been fully tested across all NPCs and panoramic positions.

**Unimplemented Action Types:**
- `PLAY_SECONDARY_MOVIE` (0x35) — Full-motion video playback (cutscenes). Currently decoded but not rendered.
- `OVERLAY_ANIM` (0x28) — Animated overlays on the scene background
- `OVERLAY_HOT` (0x37) — Clickable animated overlays
- `SPECIAL_EFFECT` (0x36) — Visual effects
- `TEXTBOX_WRITE` / `TEXTBOX_CLEAR` (0x4b/0x4c) — In-game text display (letters, notes, clues)
- `BUMP_PLAYER_CLOCK` (0x64) — Advancing the in-game clock (drives day/night transitions and timed events)
- `RESET_AND_START_TIMER` / `STOP_TIMER` (0x68/0x69) — Timed puzzles and events
- `PUSH_SCENE` / `POP_SCENE` (0x6e/0x6f) — Scene stack for temporary diversions (e.g., zooming into an object and returning)
- `LOSE_GAME` / `WIN_GAME` (0x6d/0x70) — End-game states
- `SAVE_CONTINUE_GAME` (0x65) — Save/load system
- `TURN_OFF_MAIN_RENDERING` / `TURN_ON_MAIN_RENDERING` (0x66/0x67) — Used during cutscenes/overlays
- `MAP_LOCATION_ACCESS` (0x3f) — Conditionally unlocking travel map destinations
- `MAP_SOUND` (0x42) — Sound effects for the travel map
- `MAP_AVI_OVERRIDE` / `MAP_AVI_OVERRIDE_OFF` (0x43/0x44) — Map visual overrides
- `MAP_CALL` (0x3c) — Programmatic map invocation
- `HOT_MULTIFRAME_MULTISCENE` (0x0d) — Multi-frame hotspot with per-frame scene targets
- `START_FRAME_NEXT_SCENE` (0x16) — Sets the starting frame for the next scene transition
- `START_PLAYER_SCROLLING` / `STOP_PLAYER_SCROLLING` (0x1f/0x1e) — Controls whether panoramic scrolling is active
- `HINT_SYSTEM` (0xa0) — In-game hints
- `PLAY_SOUND_MULTI_HS` (0x99) — Per-hotspot-frame sound effects
- Various `SPECIAL_*` types (0xc8-0xcd) — Unknown special behaviors

**Puzzles (NOT IMPLEMENTED):**
- `ORDERING_PUZZLE` (0x6c) — Decoded structurally but no gameplay logic
- `ROTATINGLOCK_PUZZLE` (0x72) — Locker combination puzzle
- `LEVER_PUZZLE` (0x73) — Boiler room lever puzzle
- `SLIDER_PUZZLE` (0x75) — Tile sliding puzzle
- `PASSWORD_PUZZLE` (0x76) — Password entry puzzle
- `TELEPHONE` (0x74) — Phone dialing interface
- Each puzzle has its own complex data structure (hundreds of bytes of configuration) that needs reverse-engineering from `Game.exe.c`

**Day/Night Cycle & Clock:**
- The game has a time system driven by `BUMP_PLAYER_CLOCK`. Certain events and locations change based on time of day (e.g., Diner Day vs. Diner Night at S10 vs. S888). Currently the map hardcodes both, but the engine doesn't track or advance time.

**Scene Stack (PUSH_SCENE/POP_SCENE):**
- The original engine maintains a scene stack for examining objects, reading documents, etc. Our engine doesn't implement this — it currently only uses a flat history array for Back button navigation.

**Conditional Map Access:**
- `MAP_LOCATION_ACCESS` actions conditionally unlock map destinations based on flags. Currently all map locations are always shown.

**FMV / Cutscenes:**
- The game has AVI-format full-motion video cutscenes. These would need to be converted and played back, or skipped.

**Sound Enhancements:**
- `PLAY_SOUND_MULTI_HS` (per-frame sound panning) is not implemented
- Sound volume/panning parameters from the data are mostly ignored (we use fixed volumes)
- The original game has crossfading between ambient sounds

---

### Decoder Gaps (`nd1-scene.py`)

- Conversation type `0x32` choice sub-conditions (5-byte entries in `sub_conds`) are captured as raw hex but not decoded or evaluated
- Types `0x34` (PLAY_SECONDARY_VIDEO_B), `0x35` (PLAY_SECONDARY_MOVIE), `0x36` (SPECIAL_EFFECT), `0x37` (OVERLAY_HOT) only extract the asset name — full structure not decoded
- `MAP_CALL_HOT_1FR` (0x3d) data field stored as raw hex — hotspot not properly decoded
- Puzzle data (0x6c, 0x72, 0x73, 0x74, 0x75, 0x76) stored as opaque blobs — internal structure not decoded
- `HINT_SYSTEM` (0xa0) stored as opaque blob
- `SPECIAL_*` types (0xc8-0xcd) not decoded at all

---

### File Summary

| File | Purpose |
|------|---------|
| `engine.js` | Main game engine (~780 lines) — rendering, navigation, conversations, inventory, audio |
| `index.html` | Single-page UI with canvas, overlays, inventory bar, debug controls |
| `nd1-scene.py` | Binary scene data decoder → JSON |
| `nd1_scenes.json` | Decoded scene data (all 587 scenes) |
| `nd1_scene_graph.json` | Scene transition adjacency graph |
| `Game.exe.c` | Decompiled original executable (reference) |
| `nd1_extracted/` | Raw binary scene data files (S*.bin) |
| `nd1_avf_frames/` | Extracted PNG frames from AVF video files |
| `nd1_audio/` | WAV sound effect files |
| `nd1_images/` | Sprite sheet PNGs |

---

### Priority Order for Remaining Work

1. **Fix conversation routing** — Validate Daryl and other NPC conversation trees work correctly end-to-end
2. **PUSH_SCENE/POP_SCENE** — Required for examining objects, reading clues
3. **TEXTBOX_WRITE/CLEAR** — Required for reading letters, notes, and in-game documents
4. **Day/night clock system** — Required for story progression
5. **Puzzle implementations** — Each puzzle is a self-contained mini-game
6. **Cutscene/FMV playback** — Nice to have but game is playable without
7. **Remaining action types** — Overlays, effects, hints, etc.

</details>

---

### [96] C analysis — 2026-02-19 06:22:59

**C functions:** `EFMHS`, `S626`, `S643`, `Tapestry`, `back`, `conditions`, `hotspots`

<details>
<summary>Full analysis text</summary>

Here's a summary of all changes made and how each bug is resolved:

## Changes Made

### Bug 1 Fix — [engine.js:753](engine.js#L753)
Changed `PUZZLE_DATA['S647'].successScene` from `'S645'` to `'S643'`. The slider puzzle in S647 should navigate to S643 (which has exits to both S57 and S645), not directly to S645.

### Bugs 2-4 + Tapestry Fix — [engine.js:1746-1795](engine.js#L1746-L1795)
Replaced the broken EVENTFLAGS_MULTI_HS navigation system with a three-tier approach:

**1. Lookup table** (`EVENTFLAGS_NAV`) keyed by `SceneId:FlagKey` for disambiguation:
| Key | Target | Purpose |
|-----|--------|---------|
| `S606` | `S626` | Tapestry toggle |
| `S626` | `S606` | Tapestry toggle |
| `S1426:F44=2` | `S1425` | Close upper locker door |
| `S1427:F44=2` | `S1425` | Close lower locker door |
| `S1427:F44=1+F45=2` | `S1430` | Open newspaper |
| `S1428` | `S1429` | Read Judo Today article |

**2. No-nav-hotspot fallback** — If the scene has ONLY EVENTFLAGS_MULTI_HS hotspots (no regular navigation hotspots), it's a detail/close-up view, so `back()` navigates to the previous scene. This correctly handles ~20+ book/document close-up scenes that have no exit hotspots.

**3. Reload fallback** — If the scene has other navigation hotspots, reload to re-evaluate flag-dependent conditions (handles panoramic scenes and scenes where the EFMHS just marks something as "seen").

### Dead Code Cleanup — [engine.js:222-223](engine.js#L222-L223), [engine.js:1413](engine.js#L1413)
Removed `state.enteredViaEventFlags` and `nextEntryViaEventFlags` which were part of the old broken heuristic and no longer referenced.

## Bug Verification Trace

**Bug 1 (S647)**: Slider puzzle solve → `successScene: 'S643'` → navigates to S643 which has proper exits.

**Bug 2 (S1428)**: Click magazine EFMHS (152,1)-(383,291) → flags F44=2 set → no overlapping primary hotspot → `flagKey = "F44=2"` → lookup `S1428:F44=2` misses → lookup `S1428` hits → navigates to S1429.

**Bug 3 (S1426)**: Click locker door EFMHS (355,2)-(486,291) → flags F44=2 set → no overlap → `flagKey = "F44=2"` → lookup `S1426:F44=2` → navigates to S1425.

**Bug 3 (S1427)**: Click locker door EFMHS (320,3)-(426,284) → flags F44=2 set → no overlap → lookup `S1427:F44=2` → navigates to S1425.

**Bug 4 (S1427)**: Click newspaper EFMHS (213,138)-(232,213) → flags F44=1+F45=2 set → no overlap → `flagKey = "F44=1+F45=2"` → lookup `S1427:F44=1+F45=2` → navigates to S1430.

**Tapestry (S606↔S626)**: Click tapestry EFMHS → lookup `S606` → navigates to S626 (and vice versa). Still works.

</details>

---

### [97] C analysis — 2026-02-19 13:49:44

**C functions:** `DIFFICULTY_LEVEL`, `EFMHS`, `Reload`, `SCENE_CHANGE`, `back`

<details>
<summary>Full analysis text</summary>

The fix is in. Here's what happens now for S5 (difficulty selection):

1. Player clicks a difficulty EFMHS (e.g., Junior) → sets F44=2
2. No overlapping primary hotspot → enters fallback
3. S5 not in EVENTFLAGS_NAV table → `navTarget = null`
4. `hasNavHotspots = false` (S5 has only EFMHS actions)
5. **New check**: `hasSceneChange = true` (S5 has SCENE_CHANGE → S60 conditioned on F47=2)
6. Reload S5 → DIFFICULTY_LEVEL (conditioned on F44=2) fires → sets F47=2 → SCENE_CHANGE (conditioned on F47=2) fires → auto-navigates to S60

The fallback tiers are now:

| Condition | Action | Handles |
|-----------|--------|---------|
| In EVENTFLAGS_NAV table | Navigate to target | Bug fixes, tapestry toggle |
| No nav hotspots + has SCENE_CHANGE | Reload (auto-nav fires) | S5 difficulty, S2083 boiler room |
| No nav hotspots + no SCENE_CHANGE | `back()` | Book/document close-ups |
| Has nav hotspots | Reload | Panoramic scenes, locker items |

</details>

---

### [98] C analysis — 2026-02-19 14:00:55

**C functions:** `ADD_INVENTORY`, `CONVERSATION_VIDEO`, `DIFFICULTY_LEVEL`, `Diner`, `EFMHS`, `EVENTFLAGS`, `EVENTFLAGS_MULTI_HS`, `FUN_004235d0`, `HINT_SYSTEM`, `HOT_1FR_EXITSCENE`, `HOT_1FR_SCENE_CHANGE`, `HOT_MULTIFRAME_SCENE_CHANGE`, `Kill`, `LOSE_GAME`, `Library`, `MAP_CALL_HOT_1FR`, `MAP_CALL_HOT_MULTIFRAME`, `OVERLAY_HOT`, `PLAY_DIGI_SOUND`, `PLAY_SECONDARY_MOVIE`, `PLAY_SECONDARY_VIDEO`, `PLAY_SOUND_MULTI_HS`, `POP_SCENE`, `RESET_AND_START_TIMER`, `Reference`, `S1416`, `S1424`, `S1432`, `S1434`, `S1601`, `S1603`, `S1604`, `S1606`, `S1609`, `S1661`, `S1846`, `S2079`, `S2082`, `S2087`, `S2092`, `S2096`, `S518`, `S523`, `S524`, `S602`, `S609`, `S616`, `S619`, `S622`, `S625`, `S627`, `S629`, `SAVE_CONTINUE_GAME`, `SCENE_CHANGE`, `SHOW_INVENTORY_ITEM`, `SLIDER_PUZZLE`, `SPECIAL_EFFECT`, `STOP_TIMER`, `WIN_GAME`, `active`, `allocation`, `back`, `bits`, `byte`, `canvas`, `capture`, `clicks`, `condPass`, `coordinate`, `data`, `effects`, `engineer`, `entries`, `exists`, `flags`, `hallway`, `handler`, `header`, `history`, `hotspot`, `hotspots`, `house`, `loadScene`, `loop`, `lounge`, `many`, `navigate`, `offsets`, `onCanvasClick`, `overlay`, `overlays`, `pairs`, `processing`, `rects`, `references`, `reload`, `room`, `scenes`, `silently`, `slots`, `stack`, `structure`, `thunk_FUN_0041eab0`, `thunk_FUN_0043f4b0`, `timer`, `toggle`, `transition`

<details>
<summary>Full analysis text</summary>

Here is the comprehensive prompt:

---

## Fix EVENTFLAGS_MULTI_HS Navigation and Scene Interaction System

I'm building a browser reimplementation of Nancy Drew: Secrets Can Kill (1998). The engine is in `/Users/bachman/Desktop/Projects/nd/engine.js`, scene data is decoded by `/Users/bachman/Desktop/Projects/nd/nd1-scene.py` into `/Users/bachman/Desktop/Projects/nd/nd1_scenes.json`, and the original decompiled game code is at `/Users/bachman/Desktop/Projects/nd/Game.exe.c`.

---

### Game Engine Architecture

Each scene is a .bin file containing a SCENSSUM header (background image, ambient sound, scene type) followed by ACT chunks. Each ACT has a 48-byte name string, a 1-byte action type at offset 0x30, a subtype byte, then type-specific data + trailing condition records. Conditions control whether an action is active (flag checks, variant/frame match, inventory checks, timed flag checks).

Our engine processes all actions in `loadScene()` (engine.js ~line 1439). Actions fall into these categories:

**Action Type Reference (all known types from binary, 0x00–0xCD)**

Navigation — Hotspot clicks (player clicks to change scene):
- `0x0a` HOT_1FR_SCENE_CHANGE (156 uses) — single-frame clickable rect → target scene. Data: target_scene, scene_param, hotspot rect.
- `0x0e` HOT_1FR_EXITSCENE (310 uses) — same format as 0x0a, used for "exit" navigation. Functionally identical in our engine.
- `0x0b` HOT_MULTIFRAME_SCENE_CHANGE (180 uses) — per-frame hotspot rects (for panoramic scenes). Only the rect matching current variant is active. Data: target_scene + array of {frame, x1, y1, x2, y2}.

Navigation — Auto-navigate (fires automatically on scene load):
- `0x0c` SCENE_CHANGE (86 uses) — conditional auto-navigate. If conditions pass, scene transitions automatically. Engine takes the first one that passes. Data: target_scene, scene_param.

Flag-setting — EVENTFLAGS:
- `0x6b` EVENTFLAGS (62 uses) — unconditionally sets flags on scene load. Data: 10 flag-pair slots (i16 flag_id + i16 value), unused slots have flag_id=-1.
- `0x6a` EVENTFLAGS_MULTI_HS (116 uses) — Clickable hotspot that sets flags. Same 10 flag-pair structure as EVENTFLAGS, plus per-frame hotspot rects. Does NOT contain a target scene in its binary data. See detailed section below.

Conversations:
- `0x32` CONVERSATION_VIDEO (278 uses) — NPC dialogue trees. Conditions select which node plays. Has node_id, NPC text, player choices, response scenes.

Sound:
- `0x96` PLAY_DIGI_SOUND (173 uses) — plays a sound. Often conditioned on flags (e.g., plays after EVENTFLAGS_MULTI_HS sets a flag).
- `0x97` PLAY_DIGI_SOUND_2 — alternate sound player.
- `0x98` PLAY_SOUND_PAN_FRAME — positional/panning sound.
- `0x99` PLAY_SOUND_MULTI_HS (10 uses) — sound with per-frame hotspots (unhandled).

NPC/Visual overlays:
- `0x33` PLAY_SECONDARY_VIDEO (4 uses) — NPC sprite overlay with per-frame click hotspots.
- `0x35` PLAY_SECONDARY_MOVIE (19 uses) — movie/animation overlay (unhandled).
- `0x28` OVERLAY_ANIM — animation overlay.
- `0x36` SPECIAL_EFFECT (7 uses) — visual effects (unhandled).
- `0x37` OVERLAY_HOT (5 uses) — hotspot overlay (unhandled).

Map/Travel:
- `0x3d` MAP_CALL_HOT_1FR (6 uses) — map hotspot, single frame. Opens travel dialog.
- `0x3e` MAP_CALL_HOT_MULTIFRAME (3 uses) — map hotspot, multi-frame.

Inventory:
- `0x78` ADD_INVENTORY (2 uses) — adds item to inventory on scene load.
- `0x79` REMOVE_INVENTORY — removes item.
- `0x7a` SHOW_INVENTORY_ITEM (11 uses) — draws inventory item sprite on canvas (unhandled).

Game state:
- `0x68` RESET_AND_START_TIMER (4 uses) — starts the scene timer (for timed events like explosions).
- `0x69` STOP_TIMER (5 uses) — stops the timer.
- `0x65` SAVE_CONTINUE_GAME (4 uses) — auto-saves.
- `0x6d` LOSE_GAME (3 uses) — shows game over screen.
- `0x70` WIN_GAME (1 use) — shows victory screen.
- `0x71` DIFFICULTY_LEVEL (3 uses) — sets difficulty flag.
- `0x6e` PUSH_SCENE / `0x6f` POP_SCENE — scene stack (not yet decoded/implemented).

Puzzles:
- `0x6c` ORDERING_PUZZLE, `0x72` ROTATINGLOCK_PUZZLE, `0x73` LEVER_PUZZLE, `0x74` TELEPHONE, `0x75` SLIDER_PUZZLE, `0x76` PASSWORD_PUZZLE — all implemented interactively except SLIDER_PUZZLE (stub only).

Other/Unknown:
- `0xa0` HINT_SYSTEM (3 uses), `0xC8`–`0xCD` SPECIAL_* — not decoded.

---

### How loadScene() works in engine.js

Clears active puzzle state, renders background/scene items/NPCs. Iterates all actions, checking `condPass(act)` for each. Auto-executing actions fire immediately: EVENTFLAGS sets flags, SCENE_CHANGE queues auto-nav, sounds play, DIFFICULTY_LEVEL sets flags, etc. Hotspot actions are collected into `activeHotspots[]` array. After the loop: draw hotspots, draw scroll arrows, update inventory. If `autoNav` exists (SCENE_CHANGE passed), auto-navigate to that scene. Otherwise, show conversation or activate puzzle if applicable.

### How clicks work in engine.js

`onCanvasClick()` (~line 1697):
1. Check overlays (conversation, map, puzzle, game-end)
2. If `activePuzzle`, route to puzzle click handler
3. Check panoramic scroll edges
4. EVENTFLAGS_MULTI_HS processing (~line 1717): Set flags from ALL EVENTFLAGS_MULTI_HS hotspots at click point. Play conditioned sounds.
5. Check for overlapping primary hotspot (HOT_1FR_SCENE_CHANGE etc.) — if found, navigate to it
6. If NO primary hotspot overlaps, use the EVENTFLAGS_NAV override table and fallback heuristics

---

### The EVENTFLAGS_MULTI_HS Problem

**Binary structure (type 0x6a):** 40 bytes of flag data (10 × i16 flag_id + i16 value), u16 frame count, count × 18-byte hotspot frames. The "unused" flag slots (flag_id=-1) have consistent default values [2,1,1,2,1,1,1,1,2] across all instances — they do NOT encode navigation targets.

The data does NOT contain a target scene. Navigation must come from engine logic.

**Original engine handler — FUN_004235d0 (Game.exe.c line 50094):** 3-state machine:
- State 0: Set DAT_004d093f = 1 (dirty flag), advance to state 1
- State 1: Find matching hotspot frame for current variant, store rect
- State 2 (after click): Set all flag pairs (same as EVENTFLAGS 0x6b), call thunk_FUN_0041eab0 (line 47877) which resets state to 0. No navigation occurs in the handler itself.

**Click handler (Game.exe.c lines 7612–7637):** The main loop's input handler (`thunk_FUN_0043f4b0`) detects mouse clicks within EVENTFLAGS_MULTI_HS rects. It uses large offsets (0xfc, 0x25d, etc.) into the engine's internal per-action data structure (NOT the raw binary). This internal structure is much larger than the raw binary data and includes pre-parsed hotspot rects at fixed offsets. The click sets `DAT_004d20d4 = 0x271a` (EFMHS main click) or `0x2719` (EFMHS per-frame click).

**State 1→2 transition (Game.exe.c line 60368–60371):** When the main loop detects `DAT_004d20d4 == 0x271a`, it sets the action state to 2, which triggers flag-setting on the next evaluation pass.

**Navigation mechanism — NOT FULLY REVERSE-ENGINEERED:** Despite extensive analysis of Game.exe.c, the exact mechanism by which the original engine navigates after EVENTFLAGS_MULTI_HS flag-setting was not conclusively identified. We investigated:
- The main game loop (lines 59887–60968): Calls action evaluation, then processes dirty flag. The dirty flag triggers sound plays, cursor updates, and calls `thunk_FUN_0043f4b0()` (line 60946).
- SCENE_CHANGE re-evaluation: The main loop re-evaluates all actions every frame. If SCENE_CHANGE conditions newly pass after flag changes, they fire. However, **most EFMHS scenes have NO SCENE_CHANGE actions**, so this can't be the sole mechanism.
- PUSH_SCENE/POP_SCENE: Don't appear in any decoded scene data.
- Navigation code at lines 7215–7243 was initially thought to be for EFMHS but is actually the **ROTATINGLOCK_PUZZLE** handler (confirmed by surrounding context at lines 7050–7100 referencing `DF_Roting_Lock_Puzzle_Surface`).
- The per-action internal data structure uses a 0x99-byte (153-byte) stride but the data pointer references a much larger allocation with pre-parsed rects at offsets like 0xfc and 0x25d.

---

### What We Accomplished

**Bug 1 (FIXED):** PUZZLE_DATA S647 `successScene` changed from `'S645'` to `'S643'` (engine.js line 753).

**Bugs 2–4 + tapestry toggle (FIXED):** Replaced the broken `isPair` heuristic and limited EVENTFLAGS_NAV table with a three-tier navigation system in `onCanvasClick()` (engine.js lines 1746–1805):

**Tier 1 — Lookup table** (`EVENTFLAGS_NAV`). Keyed by `"SceneId:FlagKey"` for scenes with multiple EFMHS (flag key = sorted `F{id}={val}` pairs joined with `+`), or just `"SceneId"`:

| Key | Target | Purpose |
|-----|--------|---------|
| `S606` | `S626` | Tapestry toggle |
| `S626` | `S606` | Tapestry toggle |
| `S1426:F44=2` | `S1425` | Close upper locker door |
| `S1427:F44=2` | `S1425` | Close lower locker door |
| `S1427:F44=1+F45=2` | `S1430` | Open newspaper |
| `S1428` | `S1429` | Read Judo Today article |

**Tier 2 — Structural fallback** (when scene has no non-EFMHS hotspots):
- If the scene contains a SCENE_CHANGE action → reload (re-evaluates conditions with new flags; handles S5 difficulty screen where EFMHS → DIFFICULTY_LEVEL → SCENE_CHANGE cascade, and S2083 boiler timed explosion).
- Otherwise → `back()` using scene history (handles ~25+ book/document close-up views).

**Tier 3 — Default** (scene has other nav hotspots): Reload scene to re-evaluate flag-dependent conditions.

**Dead code cleanup:** Removed `state.enteredViaEventFlags` and `nextEntryViaEventFlags` variables and all references (formerly lines 222, 225, 1415–1417, and scattered through the click handler).

---

### Shortcuts and Known Limitations

1. **Hardcoded navigation table instead of reverse-engineered mechanism.** The original engine's EVENTFLAGS_MULTI_HS navigation logic was not fully reverse-engineered. The original engine uses a large internal per-action data structure (accessed via offsets like 0x25d from the data pointer) that is much bigger than the raw binary scene data. This internal structure likely contains pre-computed navigation targets, but mapping between the raw binary and the internal structure was not accomplished. Instead, we built a practical lookup table for known cases and heuristic fallbacks.

2. **The EVENTFLAGS_NAV table only covers 6 explicit overrides.** There are 116 total EVENTFLAGS_MULTI_HS instances, of which ~136 frame-entries across ~70+ scenes don't overlap with a regular navigation hotspot. Most of these fall into the Tier 2/3 fallbacks correctly:
   - ~31 scenes have no non-EFMHS hotspots and would call `back()` (mostly book/document close-ups — these are correct since they're detail views)
   - Panoramic scenes and scenes with other nav hotspots → reload (correct)
   - But there may be **undiscovered cases** where the heuristic fallbacks produce wrong behavior. Among the 31 `back()` scenes, many (S525, S603, S610, S617, S620, S828, S1433, S1435, S1607, S1619, S1680, and all S1856–S1893 library books) have NO incoming navigation references in the decoded scene data at all — meaning they are either orphaned or reached via a mechanism not captured in nd1_scenes.json.

3. **S1601 (lounge node) and S1846 (library entry) appear in the `back()` scene list** but are actually panoramic scenes with multiframe nav hotspots. In practice, when the player is at a variant where EFMHS is active, there are usually also multiframe nav hotspots active at the same variant, so `hasNavHotspots` would be true and the code would reload rather than call `back()`. This needs playtesting verification.

4. **The `back()` fallback depends on correct scene history.** The `back()` function pops from `state.history`, which is pushed during `loadScene()` when `pushHistory=true` and the scene changes. If the history stack is empty or has unexpected entries (e.g., from puzzle scenes that use their own navigation paths), `back()` could fail silently (no-op if history is empty) or navigate to the wrong scene.

5. **18-byte EFMHS frame format.** The decoder reads frames as `u16 frame + i32 x1 + i32 y1 + i32 x2 + i32 y2 = 18 bytes`. The Game.exe.c handler (line 50135) only reads the low 16 bits of each coordinate (at offsets +2, +6, +10, +14 from frame start). The high 16 bits (bytes 4–5, 8–9, 12–13, 16–17) are always zero in all decoded data, so they don't contain navigation targets. But the original engine's internal structure stores parsed frame data at much larger offsets (0xfc+), suggesting the engine expands the raw data into a larger structure during scene loading.

---

### Remaining Tasks

1. **Playtest all EVENTFLAGS_MULTI_HS scenes** to find additional cases where the lookup table or heuristic fallbacks produce wrong behavior. Priority areas:
   - Aunt's house (S601–S628): S602 (drawer), S609 (magnifying glass), S616 (picture), S619 (book), S622 (music box), S625 (painting), S627 (clock), S628/S629 (pair).
   - Diner (S518–S525): S518 (booth items), S523 (phone), S524 (jukebox).
   - School hallway (S1416–S1435): S1416 (locker combination hint), S1424 (padlock close-up), S1432 (empty compartment), S1434 (English textbook).
   - Teacher's lounge (S1601–S1680): S1603 (printer output), S1604 (file cabinet), S1605/S1606 (file close-up), S1609 (desktop), S1651/S1652/S1661 (windows).
   - Library (S1846–S1893): All book close-ups and shelf scenes.
   - Boiler room (S2060–S2099): S2079 (elevator button), S2082 (toolbox), S2087 (vent grate), S2092 (vent shaft), S2096 (lever close-up).

2. **Investigate the ~25 orphan scenes** (no incoming navigation references) — S525, S603, S610, S617, S620, S828, S1433, S1435, S1607, S1619, S1680, and all S1856–S1893 library books. These might be:
   - Reached via the EVENTFLAGS_MULTI_HS navigation mechanism we couldn't reverse-engineer (i.e., the lookup table needs entries for the PARENT scenes to navigate TO these).
   - Reached via SCENE_CHANGE actions from other scenes (already checked, none found).
   - Reached via a mechanism the decoder doesn't capture (PUSH_SCENE/POP_SCENE, undecoded action types).

3. **Optionally continue reverse-engineering the original engine** to find the general EFMHS navigation mechanism. Key leads:
   - The click handler at Game.exe.c lines 7612–7637 reads EFMHS hotspot rects from the internal data structure at offsets 0x25d/0x261/0x265/0x269 (a "main" rect) and 0xfc/0x100/0x104/0x108 (per-frame rects). Finding where these offsets are WRITTEN during scene loading would reveal how the raw binary is expanded into the internal structure.
   - `DAT_004d20d4 = 0x2719` (per-frame EFMHS click) is handled somewhere in the main loop but the handler was not located. This might contain navigation logic separate from `0x271a`.
   - The large internal per-action data allocation (accessed via the pointer at DAT_004d0f16 + iVar * 0x99) may contain navigation targets at fixed offsets that correspond to how the raw binary's frame data is expanded.

4. **Implement remaining unhandled action types** if needed during playtesting: PLAY_SOUND_MULTI_HS (0x99), PLAY_SECONDARY_MOVIE (0x35), SHOW_INVENTORY_ITEM (0x7a), SPECIAL_EFFECT (0x36), OVERLAY_HOT (0x37), PUSH_SCENE/POP_SCENE (0x6e/0x6f), SLIDER_PUZZLE (0x75, currently stub only).

</details>

---

### [99] C analysis — 2026-02-19 14:02:52

**C functions:** `back`, `behavior`, `fallback`

<details>
<summary>Full analysis text</summary>

The previous session completed all requested work. Here's where we left off:

**Completed:**
1. **Bug 1 fixed** — S647 slider puzzle `successScene` changed from `'S645'` to `'S643'`
2. **Bugs 2-4 fixed** — Replaced broken `isPair`/`enteredViaEventFlags` heuristic with a three-tier EFMHS navigation system:
   - `EVENTFLAGS_NAV` lookup table with flag-key disambiguation for known scenes
   - Structural fallback (SCENE_CHANGE present → reload; no nav hotspots → `back()`)
   - Default reload
3. **S5 difficulty screen fix** — Added SCENE_CHANGE detection to prevent `back()` on scenes that need a reload cascade
4. **Dead code removed** — `enteredViaEventFlags` state and `nextEntryViaEventFlags` variable
5. **Comprehensive continuation prompt** — Delivered summarizing all findings, changes, and remaining work
6. **Background analysis confirmed** — All 31 `back()` scenes are correct behavior (book pages, document closeups, detail views)

**Remaining tasks** (when you're ready):
- Playtest all EFMHS scenes to find additional cases needing lookup table entries
- Investigate ~25 orphan scenes with no incoming navigation references
- Optionally continue reverse-engineering the original engine's EFMHS navigation from Game.exe.c
- Implement remaining unhandled action types as needed

Let me know what you'd like to work on next.

</details>

---

### [100] C analysis — 2026-02-20 19:39:57

**C functions:** `S1855`, `S1857`, `back`, `detect`, `frames`, `scene`, `targets`

<details>
<summary>Full analysis text</summary>

Good, now I have a full understanding. Here's my analysis:

---

**Yes, all 5 bugs are feasible fixes** — they all just need entries added to the `EVENTFLAGS_NAV` lookup table. Here's what's happening in each case:

| Bug | Scene | Current Behavior | Why | Fix |
|-----|-------|-----------------|-----|-----|
| S1847 paper | S1847 → reload | Tier 4 fails: S1848 has no EFMHS → `autoNav=false` → Tier 5 reload | Add `'S1847': 'S1848'` |
| S1860 close drawer | S1860 → reload | Tier 4 fails: S1861 has no EFMHS → Tier 5 reload | Add `'S1860': 'S1859'` |
| S1854 bottom drawer | S1854:F45=2 → S1855 (wrong) | Plain `'S1854'` key matches ANY EFMHS, always routes to S1855 | Split into `'S1854:F44=2': 'S1855'` and `'S1854:F45=2': 'S1857'` |
| S1851 magazine | S1851 → reload | Tier 4 fails: S1852 has no EFMHS → Tier 5 reload | Add `'S1851': 'S1852'` |
| S1846 doors | S1846 → back() → S1847 | On door frames (11-20), no nav hotspots active → Tier 3 `back()`, which goes to last visited scene (S1847) | Add `'S1846': 'S1920'` |

The Tier 4 auto-detect (`scene+1`) fails for S1847, S1851, and S1860 because those `scene+1` targets (S1848, S1852, S1861) don't have EFMHS actions — so the heuristic doesn't recognize them as "detail views opened by EFMHS."

Also need to add close-direction entries for S1855 and S1857 (the open drawer views) since their EFMHS clicks play "drwrclse"/"nwspapr" sounds — S1855→S1856 and S1857→S1858 are the close/read transitions.

Want me to make these changes?

</details>

---

### [101] C analysis — 2026-02-20 19:43:27

**C functions:** `S1858`, `article`, `back`, `clicks`, `closeup`

<details>
<summary>Full analysis text</summary>

All 5 fixes applied plus the forward entries for S1855→S1856 and S1857→S1858 (drawer read/close transitions):

1. **S1846 → S1920**: Library doors now navigate to the "door open" scene instead of `back()` to S1847
2. **S1847 → S1848**: Paper click now navigates to the flyer closeup (LE1F)
3. **S1851 → S1852**: Magazine click now navigates to the steroids article (LM1L)
4. **S1854**: Split into `S1854:F44=2 → S1855` (top drawer) and `S1854:F45=2 → S1857` (bottom drawer)
5. **S1860 → S1859**: Closing the card catalog drawer now returns to the closed view
6. **S1855 → S1856** and **S1857 → S1858**: Added forward entries for the open drawer views so their EFMHS clicks (read newspaper / close drawer) work too

</details>

---

### [102] C analysis — 2026-02-21 00:42:50

**C functions:** `close`, `closeup`, `scene`

<details>
<summary>Full analysis text</summary>

All changes applied. Here's a summary:

**EFMHS Navigation fixes** (3 entries added/modified in `EVENTFLAGS_NAV`):
- `'S1601': 'S1651'` — window click → exterior window scene (swexter1)
- `'S1605:F44=2': 'S1606'` + `'S1605:F45=2': 'S1604'` — disambiguated file open vs cabinet close (previously plain `'S1605'` always went to S1606)
- `'S1609': 'S1612'` — notepad click → note pad closeup (sl1s)

**Hotspot y-coordinate scaling** (systemic fix):
- Panoramic background images are **536×376** but the canvas is 536×292
- `renderBackground` now tracks `bgNativeHeight` from the loaded image
- All hotspot y-coordinates are multiplied by `yS = GAME_H / bgNativeHeight` (~0.777 for panoramic scenes, 1.0 for closeups)
- Applied to all hotspot types: nav, EFMHS, map, NPC, and inventory pickups
- This fixes S1601 and should also improve hotspot accuracy in **every other panoramic scene** (library, school halls, diner, aunt's house, etc.)

</details>

---

### [103] C analysis — 2026-02-21 00:57:00

**C functions:** `centered`, `drawImage`, `edges`

<details>
<summary>Full analysis text</summary>

NPC rendering reverted. 

To summarize the current state: the y-scaling approach for hotspots is a workable approximation, but the "correct" fix would be to render panoramic backgrounds as a **crop** instead of squishing them, with vertical scroll support. That would mean:

- `ctx.drawImage(img, 0, scrollY, 536, 292, 0, 0, 536, 292)` — crop a 292px window from the 376px image
- Hotspot y-coordinates offset by `-scrollY` instead of scaled
- NPC sprites rendered at their native resolution, positioned relative to the crop
- Click zones at top/bottom edges (like the existing left/right panning) to scroll vertically
- Default scroll position: centered (~42px offset) or bottom-biased

That would fix both the hotspot alignment and NPC positioning in one shot. Want me to implement the vertical scroll/crop system, or are you happy with the current scaling approach for now?

</details>

---

### [104] C analysis — 2026-02-21 01:17:57

**C functions:** `Inventory`, `Sound`, `hardcoded`, `over`, `sound`, `sprites`, `state`, `system`, `types`, `usage`

<details>
<summary>Full analysis text</summary>

Here's where things stand:

**Fully implemented:**
- Scene rendering, horizontal panoramic scrolling, y-scaling for tall panoramics
- All navigation types including the 5-tier EFMHS system
- Conversations with dialog trees and dynamic investigation questions
- Inventory (add, remove, show, pickup, UI)
- 6 puzzle types (ordering, rotating lock, password, lever, telephone, slider)
- Sound (digi sound, ambient)
- NPC sprites (PLAY_SECONDARY_VIDEO)
- Map system (5 locations)
- Game state (flags, history, save/load)
- Timer system
- Game over (lose/win)

**Not yet implemented:**
| Feature | Notes |
|---------|-------|
| **Day/night cycle** | Map has day/night diner variants hardcoded (S10 vs S888) but no temporal progression |
| **Vertical panoramic scrolling** | Original game scrolls top/bottom on 376px images; we squish instead |
| **PLAY_SECONDARY_MOVIE** | FMV playback — hardcoded workaround for S655 only |
| **OVERLAY_ANIM** | Animated overlays on scenes |
| **SPECIAL_EFFECT** | Visual effects |
| **PLAY_SOUND_MULTI_HS** | Multi-hotspot sound (workaround via EFMHS) |
| **CONVERSATION_CEL / CONVERSATION_SOUND** | Alternative conversation formats |
| **TEXTBOX_WRITE** | Text display action |
| **SAFE_CRACKER** | Safe puzzle type |
| **Second Chance** | Retry system after death |
| **USE_INVENTORY** | Inventory item usage (UI exists, no action handler) |
| **PUSH_SCENE/POP_SCENE** | Explicit scene stack ops |

Day/night is probably the biggest gameplay-impacting missing feature. What would you like to tackle next?

</details>

---

### [105] C analysis — 2026-02-21 01:32:22

**C functions:** `Blockers`, `Playable`, `S1253`, `S2062`, `S655`, `S888`, `clips`, `conversations`, `delivery`

<details>
<summary>Full analysis text</summary>

Here's my analysis of priorities based on the walkthrough's critical path:

## Critical Path vs Engine Capabilities

### Currently Playable (no blockers)
1. Aunt Eloise's apartment — inventory pickup, safe puzzle, slider puzzle, all work
2. Diner — talk to Daryl, pick up bolt cutter/soup ladle
3. School — talk to NPCs, explore, Jake's locker combo puzzle
4. Library — browse books, encyclopedias, card catalog
5. Teacher's lounge entry — glass cutter on window works via `inventory_check` (just having item suffices)
6. Teacher's lounge — computer login, file drawer, printer
7. Boiler room keypad entry, toolbox/gloves
8. Daryl's note delivery (S3216, flag 62 hardcoded)
9. Boiler crisis — padlock combo + lever puzzle
10. VHS tape on TV — workaround sets flag 5 automatically
11. Confrontation conversations (blackmail revelations)
12. Gun/Mitch endgame — `inventory_check` for gun works, WIN_GAME/LOSE_GAME exist

### Blockers (by priority)

| Priority | Feature | Impact | Scenes |
|----------|---------|--------|--------|
| **1** | **PLAY_SECONDARY_MOVIE** | Blocks elevator to boiler room, endgame cinematics, VHS tape videos, death animations | S54/S55/S70-73 (elevator), S650-S655 (VHS), S1250-S1253 (endgame), S1046/S2062 (death) |
| **2** | **Day/night auto-transition** | After talking to everyone post-blackmail, the game should auto-skip to night for the Vandelay confrontation. Without this, player might not know to go to Pharmacy at night | Flag-driven, affects map availability |
| **3** | **Vertical panoramic scrolling** | Nice-to-have, not blocking. Current squish+scale works | All panoramic scenes |

### Analysis

**PLAY_SECONDARY_MOVIE is the #1 blocker.** It's used for:
- **Elevator transitions** (6 scenes) — can't reach the boiler room without these
- **Endgame sequence** (S1250-S1253) — the final confrontation plays movies
- **VHS tape playback** (S650-S655) — currently hacked with flag workaround
- **Death animations** (kitchen explosion)

These are essentially short pre-rendered video clips (AVF assets like `se1x`, `se3x`, `end1`-`end4`, `videoa`-`videod`). The multi-frame AVF images already exist in your `nd1_avf_frames/` folder. Rather than implementing full FMV playback, you could display the frames as a timed slideshow, then auto-navigate to the next scene.

**Day/night is #2** — the game has S10 (day diner) and S888 (night diner) as separate map entries, and the Pharmacy is already in MAP_LOCATIONS. The transition probably needs a flag check: once you've talked to everyone about the blackmail + talked to Daryl about Mitch, some flag triggers "night mode" which could change which map locations are available or auto-redirect to the night variant.

**Everything else works** — inventory checks use `state.inventory.has()` (just possession, not active selection), so the glass cutter, bolt cutters, gun, etc. all work through the condition system without needing a separate "use item" mechanic.

Want me to start on PLAY_SECONDARY_MOVIE implementation?

</details>

---

### [106] C analysis — 2026-02-21 01:38:31

**C functions:** `saveGame`, `scenes`

<details>
<summary>Full analysis text</summary>

Here's the situation:

**SAVE_CONTINUE_GAME** (the Second Chance checkpoint) exists in the scene data and is already handled in the engine — but it just calls `saveGame()`. It doesn't create a separate "Second Chance" save slot. Here's what's missing:

**Current behavior:**
- `SAVE_CONTINUE_GAME` action fires → calls `saveGame()` → overwrites the single save slot
- `LOSE_GAME` fires → shows "GAME OVER" → dead end, no retry

**What should happen:**
- `SAVE_CONTINUE_GAME` fires → silently saves a **separate** "second chance" snapshot
- `LOSE_GAME` fires → shows death screen with a **"Second Chance"** button that restores that snapshot
- The 4 checkpoint scenes (S1250 endgame, S515 school union, S519 magazine, S824 diner) auto-save right before dangerous sequences

The fix is straightforward:
1. Store a separate `secondChanceSave` alongside the regular save
2. On `SAVE_CONTINUE_GAME`, snapshot state into `secondChanceSave` (not the player's manual save)
3. On `LOSE_GAME`, show a "Second Chance" button that loads from that snapshot

Want me to implement this?

</details>

---

### [107] C analysis — 2026-02-21 01:40:29

**C functions:** `hidden`, `state`

<details>
<summary>Full analysis text</summary>

Done. Here's how the Second Chance system works:

1. **`SAVE_CONTINUE_GAME`** (fires in S515, S519, S824, S1250) — silently snapshots the full game state (flags, inventory, history, current scene) into `secondChanceSave`, separate from the player's manual save
2. **`LOSE_GAME`** — shows the game over screen. If a second chance checkpoint exists, a **[ Second Chance ]** button appears above **[ Play Again ]**
3. **Clicking Second Chance** — restores the snapshot and drops the player back to the checkpoint scene, as if the death never happened
4. **On win** — the button is hidden (no retry needed)

</details>

---

### [108] C analysis — 2026-02-21 01:45:02

**C functions:** `Blockers`, `Features`, `IIFE`, `Implemented`, `Kill`, `NPCs`, `PLAY_SECONDARY_MOVIE`, `POP_SCENE`, `Pharmacy`, `S626`, `S655`, `Sound`, `System`, `Transition`, `action`, `actions`, `back`, `button`, `condPass`, `decoder`, `disambiguation`, `drawImage`, `engine`, `factor`, `goToScene`, `handlePuzzleClick`, `hitTestPrimary`, `hotspots`, `loadScene`, `loadSecondChance`, `night`, `onCanvasClick`, `original`, `overlays`, `point`, `renderBackground`, `rooms`, `scrolling`, `setupPuzzleUI`, `showPuzzle`, `sprites`, `system`, `toggleDebug`, `type`, `variant`

<details>
<summary>Full analysis text</summary>

Good, I have everything I need. Let me write the master prompt.

Here's your master prompt for a fresh session:

---

**MASTER CONTINUATION PROMPT — Nancy Drew: Secrets Can Kill Browser Reimplementation**

## Project Overview
Browser reimplementation of Nancy Drew: Secrets Can Kill (1998) in JavaScript. The engine is a single-file IIFE (`ND`) in `/Users/bachman/Desktop/Projects/nd/engine.js` (~2130 lines) with scene data decoded from the original binary into `/Users/bachman/Desktop/Projects/nd/nd1_scenes.json`. The decompiled original game code is at `/Users/bachman/Desktop/Projects/nd/Game.exe.c`. The scene decoder is `/Users/bachman/Desktop/Projects/nd/nd1-scene.py`. HTML UI is in `/Users/bachman/Desktop/Projects/nd/index.html`.

## Architecture
- **Canvas**: 536×292 (`GAME_W`/`GAME_H`). Background frames in `/nd1_avf_frames/`, audio in `/nd1_audio/`.
- **Panoramic scenes**: 30-frame 360° rooms (536×376 native images squished to 536×292). Horizontal scroll via left/right click zones changes variant (frame). Vertical scroll NOT implemented — we use a y-scale factor (`yS = GAME_H / bgNativeHeight`) applied to all hotspot y-coordinates during registration. `bgNativeHeight` is captured from `img.naturalHeight` in `renderBackground()`.
- **State**: `state.flags` (flag ID → value), `state.inventory` (Set of item IDs), `state.activeItem`, `state.currentSceneId`, `state.currentVariant`, `state.history` (scene stack for back button), `state.debugHotspots`.
- **Scene loading**: `loadScene(sceneId, variant, pushHistory)` renders background, registers hotspots from actions (filtered by `condPass()` and frame matching), processes auto-executing actions (EVENTFLAGS, SCENE_CHANGE, DIFFICULTY_LEVEL, sounds, etc.).
- **Click handling**: `onCanvasClick()` — (1) applies EVENTFLAGS_MULTI_HS flags, (2) `hitTestPrimary()` checks non-EFMHS hotspots, (3) if no primary hit + flags applied → 5-tier EFMHS navigation fallback.
- **Conversations**: Node-based dialog trees with dynamic investigation question injection. INVESTIGATION_QUESTIONS has 46 questions across 4 NPCs (Daryl 18, Connie 10, Hulk 9, Hal 9). Farewell system with random NPC goodbye scenes.
- **Puzzles**: ROTATINGLOCK_PUZZLE, PASSWORD_PUZZLE, ORDERING_PUZZLE, LEVER_PUZZLE, TELEPHONE, SLIDER_PUZZLE — all implemented in `showPuzzle()`/`setupPuzzleUI()`/`handlePuzzleClick()`.
- **Inventory**: `inventory_check` conditions just check `state.inventory.has(item_id)` — possession, not active selection. Items: 0=Bolt cutters, 1=Phone card, 2=Coin, 3=Glass cutter, 4=Gun, 5=Key(passport), 6=Ladle, 7=Video tape, 8=Work gloves, 9=Key(safe), 10=Remote control.

## EVENTFLAGS_MULTI_HS Navigation System
Action type 0x6a — clickable hotspots that set flags but contain NO target scene in binary data. 116 instances across the game. The original engine's navigation mechanism was not fully reverse-engineered.

**5-tier fallback** (in `onCanvasClick`, ~line 1870):
1. **EVENTFLAGS_NAV lookup table** — explicit scene-to-scene mappings with flag-key disambiguation (`"SceneId:F{id}={val}+..."` keys for scenes with multiple EFMHS)
2. **SCENE_CHANGE re-evaluation** — reload scene if it has SCENE_CHANGE actions (allows auto-nav conditions to re-evaluate)
3. **Close/dismiss** — if scene has ONLY EFMHS hotspots (no nav types), call `back()`
4. **Scene+1 auto-detect** — if next scene ID exists, has EFMHS, has no nav hotspots, navigate there
5. **Default reload** — re-evaluate flag-dependent conditions

**Current EVENTFLAGS_NAV entries** (~line 1870):
```
S606↔S626 (tapestry), S1426:F44=2→S1425, S1427:F44=2→S1425, S1427:F44=1+F45=2→S1430,
S1428→S1429, S622→S623, S627↔S628, S629→S630, S834→S835, S837→S838, S1416→S1417,
S1601→S1651, S1605:F44=2→S1606, S1605:F45=2→S1604, S1609→S1612, S1651→S1652,
S1846→S1920, S1847→S1848, S1851→S1852, S1854:F44=2→S1855, S1854:F45=2→S1857,
S1855→S1856, S1857→S1858, S1859↔S1860, S2087→S2088, S2092→S2093
```

More entries will be needed as playtesting reveals additional broken EFMHS navigations. The pattern: if clicking an EFMHS does nothing or goes to the wrong scene, add the correct mapping to the table.

## Second Chance System (just implemented)
- `SAVE_CONTINUE_GAME` action (type 101) snapshots state into `secondChanceSave` (separate from player's manual save). Fires in scenes S515, S519, S824, S1250.
- `LOSE_GAME` shows game over screen with `[ Second Chance ]` button (hidden if no checkpoint exists, or on win). `loadSecondChance()` restores the snapshot.
- `WIN_GAME` shows victory screen.

## Panoramic Y-Scaling
Panoramic scene images are 536×376, canvas is 536×292. `bgNativeHeight` tracked from loaded image. Scale factor `yS = GAME_H / bgNativeHeight` (~0.777) applied to ALL hotspot y-coordinates during registration in `loadScene()`. NPC sprites (PLAY_SECONDARY_VIDEO) have both position AND drawn height scaled by `yS` via `ctx.drawImage(cleaned, drawX, drawY, cleaned.width, drawH)`.

## What's Implemented
- All navigation types, EFMHS 5-tier system, panoramic horizontal scroll
- Conversations with dialog trees, investigation questions, farewells
- Full inventory system (add/remove/show/pickup/UI)
- 6 puzzle types, telephone system
- Sound (digi, ambient), NPC sprites with chroma-key
- Map system (5 locations), save/load, timer, Second Chance, game over

## Critical Path Blockers (from walkthrough analysis)

### 1. PLAY_SECONDARY_MOVIE (Priority #1)
19 scenes use this action type (type 53). It plays pre-rendered AVF animations. Currently NOT implemented except for a hardcoded workaround at S655 (sets flag 5 and returns). Blocks:
- **Elevator** (S54, S55, S70-S73) — can't reach boiler room
- **Endgame** (S1250-S1253) — final confrontation cinematics
- **VHS tape** (S650-S655) — blackmail tape playback
- **Death animations** (S1046, S2062) — kitchen explosions

The AVF frame images exist in `nd1_avf_frames/` as numbered PNGs. Implementation approach: display frames as timed slideshow, then auto-navigate to next scene via the action's scene transition data.

### 2. Day/Night Transition (Priority #2)
The game has day (S10) and night (S888) diner variants as separate map entries. At a specific story point (after talking to Daryl about Mitch in S3216, flag 40=2), the game should auto-transition to night. Pharmacy (S1200) is the Vandelay confrontation location. Need flag-based map location availability.

### 3. Debug Testing Features (NEXT TASK)
Add a debug panel that lets the tester:
- Set arbitrary flags as done/seen
- Mark specific checkpoints/conversations as completed
- Quick-jump through game progression states

This was the user's last request before creating this prompt.

## Not Yet Implemented (lower priority)
- Vertical panoramic scrolling (crop instead of squish, top/bottom scroll zones)
- OVERLAY_ANIM, SPECIAL_EFFECT
- CONVERSATION_CEL, CONVERSATION_SOUND
- PLAY_SOUND_MULTI_HS
- TEXTBOX_WRITE, SAFE_CRACKER
- MAP_LOCATION_ACCESS, MAP_SOUND, MAP_AVI_OVERRIDE
- PUSH_SCENE/POP_SCENE (history system covers most cases)

## Key Files
- `engine.js` — Main engine (~2130 lines)
- `index.html` — UI with canvas, overlays (conversation, map, puzzle, game-over, continue)
- `nd1_scenes.json` — All decoded scene data
- `nd1-scene.py` — Scene decoder (decode_hotspot_frames at line 244, EFMHS at line 531)
- `Game.exe.c` — Decompiled original (EFMHS handler at line 50094, click handler at 7612, main loop at 60340)
- `nd1_avf_frames/` — Background/animation frame PNGs
- `nd1_audio/` — Sound files

## Exposed API
```javascript
return { init, loadScene, hideConv, continueConv, hideMapDialog, toggleDebug, goToScene, back, loadSecondChance };
```

## Immediate Next Task
Add a debug panel feature that lets the tester mark checkpoints and conversations as done/seen, making it easier to test the whole game without replaying from the start each time. The debug system currently only has `toggleDebug()` (shows hotspot overlays) and `goToScene()` (jump to scene by ID). Expand this with flag/conversation/inventory manipulation.

---

That should give a fresh session everything it needs. Copy this into your next conversation to pick up right where we left off.

</details>

---

### [109] C analysis — 2026-02-21 01:46:19

**C functions:** `Diner`, `PLAY_SECONDARY_MOVIE`

<details>
<summary>Full analysis text</summary>

Good point — you're right. Since both "Diner (Day)" and "Diner (Night)" are already in `MAP_LOCATIONS` and always visible, the player can manually go to the night diner whenever they want. The Pharmacy is also always available.

The only thing a proper day/night system would add is:
- **Hiding** the night diner until the story triggers it (prevents sequence-breaking)
- **Auto-redirecting** to the night variant when story flags are set

But for playability, neither of those is blocking. The player can just choose "Diner (Night)" when the walkthrough says to. If anything, always showing it is *more* forgiving.

So really **PLAY_SECONDARY_MOVIE is the only critical blocker** — the elevator scenes prevent reaching the boiler room, and the endgame cinematics prevent completing the game. I'll bump that up in the master prompt. Want me to update the prompt, or shall we start fresh and tackle PLAY_SECONDARY_MOVIE (or the debug panel) next?

</details>

---

### [110] C analysis — 2026-02-21 01:49:42

**C functions:** `Diner`, `IIFE`, `Implemented`, `Kill`, `NPCs`, `S626`, `S655`, `Sound`, `Tasks`, `actions`, `assets`, `back`, `button`, `condPass`, `disambiguation`, `engine`, `factor`, `goToScene`, `handlePuzzleClick`, `hitTestPrimary`, `hotspots`, `loadScene`, `loadSecondChance`, `onCanvasClick`, `overlays`, `renderBackground`, `rooms`, `script`, `scrolling`, `setupPuzzleUI`, `showPuzzle`, `system`, `toggleDebug`, `variant`

<details>
<summary>Full analysis text</summary>

Great data — some of those are 200+ frames. GIFs make much more sense than frame-by-frame JS animation. Here's the updated master prompt:

---

**MASTER CONTINUATION PROMPT — Nancy Drew: Secrets Can Kill Browser Reimplementation**

## Project Overview
Browser reimplementation of Nancy Drew: Secrets Can Kill (1998) in JavaScript. The engine is a single-file IIFE (`ND`) in `/Users/bachman/Desktop/Projects/nd/engine.js` (~2130 lines) with scene data decoded from the original binary into `/Users/bachman/Desktop/Projects/nd/nd1_scenes.json`. The decompiled original game code is at `/Users/bachman/Desktop/Projects/nd/Game.exe.c`. The scene decoder is `/Users/bachman/Desktop/Projects/nd/nd1-scene.py`. HTML UI is in `/Users/bachman/Desktop/Projects/nd/index.html`.

## Architecture
- **Canvas**: 536×292 (`GAME_W`/`GAME_H`). Background frames in `/nd1_avf_frames/`, audio in `/nd1_audio/`.
- **Panoramic scenes**: 30-frame 360° rooms (536×376 native images squished to 536×292). Horizontal scroll via left/right click zones changes variant (frame). Vertical scroll NOT implemented — we use a y-scale factor (`yS = GAME_H / bgNativeHeight`) applied to all hotspot y-coordinates during registration. `bgNativeHeight` is captured from `img.naturalHeight` in `renderBackground()`.
- **State**: `state.flags` (flag ID → value), `state.inventory` (Set of item IDs), `state.activeItem`, `state.currentSceneId`, `state.currentVariant`, `state.history` (scene stack for back button), `state.debugHotspots`.
- **Scene loading**: `loadScene(sceneId, variant, pushHistory)` renders background, registers hotspots from actions (filtered by `condPass()` and frame matching), processes auto-executing actions (EVENTFLAGS, SCENE_CHANGE, DIFFICULTY_LEVEL, sounds, etc.).
- **Click handling**: `onCanvasClick()` — (1) applies EVENTFLAGS_MULTI_HS flags, (2) `hitTestPrimary()` checks non-EFMHS hotspots, (3) if no primary hit + flags applied → 5-tier EFMHS navigation fallback.
- **Conversations**: Node-based dialog trees with dynamic investigation question injection. INVESTIGATION_QUESTIONS has 46 questions across 4 NPCs (Daryl 18, Connie 10, Hulk 9, Hal 9). Farewell system with random NPC goodbye scenes.
- **Puzzles**: ROTATINGLOCK_PUZZLE, PASSWORD_PUZZLE, ORDERING_PUZZLE, LEVER_PUZZLE, TELEPHONE, SLIDER_PUZZLE — all implemented in `showPuzzle()`/`setupPuzzleUI()`/`handlePuzzleClick()`.
- **Inventory**: `inventory_check` conditions just check `state.inventory.has(item_id)` — possession, not active selection. Items: 0=Bolt cutters, 1=Phone card, 2=Coin, 3=Glass cutter, 4=Gun, 5=Key(passport), 6=Ladle, 7=Video tape, 8=Work gloves, 9=Key(safe), 10=Remote control.

## EVENTFLAGS_MULTI_HS Navigation System
Action type 0x6a — clickable hotspots that set flags but contain NO target scene in binary data. 116 instances across the game. The original engine's navigation mechanism was not fully reverse-engineered.

**5-tier fallback** (in `onCanvasClick`, ~line 1870):
1. **EVENTFLAGS_NAV lookup table** — explicit scene-to-scene mappings with flag-key disambiguation (`"SceneId:F{id}={val}+..."` keys for scenes with multiple EFMHS)
2. **SCENE_CHANGE re-evaluation** — reload scene if it has SCENE_CHANGE actions
3. **Close/dismiss** — if scene has ONLY EFMHS hotspots (no nav types), call `back()`
4. **Scene+1 auto-detect** — if next scene ID exists, has EFMHS, has no nav hotspots, navigate there
5. **Default reload** — re-evaluate flag-dependent conditions

**Current EVENTFLAGS_NAV entries** (~line 1870):
```
S606↔S626 (tapestry), S1426:F44=2→S1425, S1427:F44=2→S1425, S1427:F44=1+F45=2→S1430,
S1428→S1429, S622→S623, S627↔S628, S629→S630, S834→S835, S837→S838, S1416→S1417,
S1601→S1651, S1605:F44=2→S1606, S1605:F45=2→S1604, S1609→S1612, S1651→S1652,
S1846→S1920, S1847→S1848, S1851→S1852, S1854:F44=2→S1855, S1854:F45=2→S1857,
S1855→S1856, S1857→S1858, S1859↔S1860, S2087→S2088, S2092→S2093
```
More entries will be needed as playtesting reveals additional broken EFMHS navigations.

## Second Chance System
- `SAVE_CONTINUE_GAME` (type 101) snapshots full state into `secondChanceSave` (flags, inventory, history, scene/variant). Fires in S515, S519, S824, S1250.
- `LOSE_GAME` shows game over with `[ Second Chance ]` button (hidden if no checkpoint). `loadSecondChance()` restores snapshot.

## Panoramic Y-Scaling
Panoramic images are 536×376, canvas is 536×292. `bgNativeHeight` tracked from loaded image. Scale factor `yS` applied to ALL hotspot y-coords during registration. NPC sprites have both position AND drawn height scaled by `yS`.

## What's Implemented
- All navigation types, EFMHS 5-tier system, panoramic horizontal scroll
- Conversations with dialog trees, investigation questions, farewells
- Full inventory system (add/remove/show/pickup/UI)
- 6 puzzle types, telephone system
- Sound (digi, ambient), NPC sprites with chroma-key
- Map system (5 always-visible locations), save/load, timer, Second Chance, game over

## Critical Path Blocker: PLAY_SECONDARY_MOVIE

**This is the only feature blocking game completion.** 19 scenes use action type 53 (PLAY_SECONDARY_MOVIE). Currently NOT implemented except for a hardcoded workaround at S655 (sets flag 5 and returns). It blocks:
- **Elevator** (S54, S55, S70-S73) — can't reach boiler room
- **Endgame** (S1250-S1253) — final confrontation cinematics
- **VHS tape** (S650-S655) — blackmail tape playback
- **Death animations** (S1046, S2062) — kitchen explosions
- **Intro** (S61) — opening sequence

**Asset frame data** (all PNGs exist in `nd1_avf_frames/`):

| Asset | Frames | Size | Purpose |
|-------|--------|------|---------|
| se1x | 16 | 536×292 | Elevator down |
| se2x | 41 | 536×292 | Elevator down |
| se3x | 41 | 536×292 | Elevator up/down |
| xdin1 | 19 | 536×292 | Diner explosion |
| xsch | 19 | 536×292 | School explosion |
| end1 | 193 | 322×138 | Endgame intro |
| end2 | 55 | 422×199 | Mitch confrontation |
| end3 | 95 | 138×128 | Win sequence |
| end4 | 52 | 158×169 | Lose sequence |
| static1 | 43 | 223×167 | TV static |
| static2 | 26 | 223×167 | TV static |
| videoa | 144 | 223×167 | Hulk blackmail |
| videob | 151 | 223×167 | Connie blackmail |
| videoc | 194 | 223×167 | Hal blackmail |
| videod | 222 | 223×167 | Daryl blackmail |
| Intro | 339 | 376×205 | Opening sequence |

**Implementation approach**: Convert the numbered PNG frames for each asset into animated GIFs using a Python script (ImageMagick or Pillow). Then the engine just needs to display a GIF on the canvas, wait for it to complete, and proceed to the next scene action. This avoids building a frame-by-frame JS animation system with timing. For the smaller assets (endgame, VHS, static), they'd be centered on the canvas. Full-screen assets (elevators, explosions) fill the canvas. The scene data has `asset_name` and `data_size` fields — the `data_size` (278 bytes) likely contains embedded timing/transition data that the decoder hasn't fully parsed, but a fixed ~10fps GIF playback rate should be reasonable.

**Day/night is NOT a blocker** — both "Diner (Day)" and "Diner (Night)" plus Pharmacy are already exposed in MAP_LOCATIONS as always-available destinations. The player can manually navigate to the night diner when the story calls for it.

## Immediate Next Tasks (in priority order)
1. **Debug testing panel** — Expand the debug system to let testers mark checkpoints and conversations as done/seen, manipulate flags and inventory, to test the whole game without replaying. Currently only `toggleDebug()` (hotspot overlays) and `goToScene()` exist.
2. **PLAY_SECONDARY_MOVIE** — Write a Python script to convert PNG sequences to GIFs, then implement GIF playback in the engine.
3. **Additional EFMHS_NAV entries** — As playtesting reveals broken navigations.

## Not Yet Implemented (lower priority)
- Vertical panoramic scrolling (crop instead of squish, top/bottom scroll zones)
- OVERLAY_ANIM, SPECIAL_EFFECT, CONVERSATION_CEL, CONVERSATION_SOUND
- PLAY_SOUND_MULTI_HS, TEXTBOX_WRITE, SAFE_CRACKER
- MAP_LOCATION_ACCESS, MAP_SOUND, MAP_AVI_OVERRIDE
- PUSH_SCENE/POP_SCENE

## Key Files
- `engine.js` — Main engine (~2130 lines)
- `index.html` — UI with canvas, overlays (conversation, map, puzzle, game-over, continue)
- `nd1_scenes.json` — All decoded scene data
- `nd1-scene.py` — Scene decoder
- `Game.exe.c` — Decompiled original
- `nd1_avf_frames/` — Background/animation frame PNGs
- `nd1_audio/` — Sound files

## Exposed API
```javascript
return { init, loadScene, hideConv, continueConv, hideMapDialog, toggleDebug, goToScene, back, loadSecondChance };
```

---

That's the updated prompt. The two key changes: day/night clarified as non-blocker, and the PLAY_SECONDARY_MOVIE section now includes frame counts and the GIF conversion approach. Ready for a fresh session whenever you are.

</details>

---

### [111] C analysis — 2026-02-21 03:47:52

**C functions:** `Diner`, `FUN_004235d0`, `FUN_00423750`, `FUN_0047069b`, `IIFE`, `Implemented`, `JSON`, `Kill`, `Loop`, `Misattribution`, `NPCs`, `S626`, `S655`, `Sound`, `Tasks`, `Testing`, `action`, `actions`, `back`, `button`, `canvas`, `condPass`, `decoder`, `disambiguation`, `engine`, `factor`, `flag`, `goToScene`, `handlePuzzleClick`, `hitTestPrimary`, `hotspots`, `index`, `load`, `loadScene`, `loadSecondChance`, `machines`, `metadata`, `offsets`, `onCanvasClick`, `original`, `overlays`, `renderBackground`, `rooms`, `script`, `scrolling`, `setupPuzzleUI`, `showPuzzle`, `system`, `thunk_FUN_0040f340`, `thunk_FUN_00419cc0`, `thunk_FUN_0041eab0`, `thunk_FUN_004394a0`, `thunk_FUN_0043f4b0`, `thunk_FUN_004505d0`, `toggleDebug`, `variable`, `variant`

<details>
<summary>Full analysis text</summary>

Got it all. Here's the updated master prompt with the Game.exe.c technical reference section added:

---

**MASTER CONTINUATION PROMPT — Nancy Drew: Secrets Can Kill Browser Reimplementation**

## Project Overview
Browser reimplementation of Nancy Drew: Secrets Can Kill (1998) in JavaScript. The engine is a single-file IIFE (`ND`) in `/Users/bachman/Desktop/Projects/nd/engine.js` (~2130 lines) with scene data decoded from the original binary into `/Users/bachman/Desktop/Projects/nd/nd1_scenes.json`. The decompiled original game code is at `/Users/bachman/Desktop/Projects/nd/Game.exe.c`. The scene decoder is `/Users/bachman/Desktop/Projects/nd/nd1-scene.py`. HTML UI is in `/Users/bachman/Desktop/Projects/nd/index.html`.

## Architecture
- **Canvas**: 536×292 (`GAME_W`/`GAME_H`). Background frames in `/nd1_avf_frames/`, audio in `/nd1_audio/`.
- **Panoramic scenes**: 30-frame 360° rooms (536×376 native images squished to 536×292). Horizontal scroll via left/right click zones changes variant (frame). Vertical scroll NOT implemented — we use a y-scale factor (`yS = GAME_H / bgNativeHeight`) applied to all hotspot y-coordinates during registration. `bgNativeHeight` is captured from `img.naturalHeight` in `renderBackground()`.
- **State**: `state.flags` (flag ID → value), `state.inventory` (Set of item IDs), `state.activeItem`, `state.currentSceneId`, `state.currentVariant`, `state.history` (scene stack for back button), `state.debugHotspots`.
- **Scene loading**: `loadScene(sceneId, variant, pushHistory)` renders background, registers hotspots from actions (filtered by `condPass()` and frame matching), processes auto-executing actions (EVENTFLAGS, SCENE_CHANGE, DIFFICULTY_LEVEL, sounds, etc.).
- **Click handling**: `onCanvasClick()` — (1) applies EVENTFLAGS_MULTI_HS flags, (2) `hitTestPrimary()` checks non-EFMHS hotspots, (3) if no primary hit + flags applied → 5-tier EFMHS navigation fallback.
- **Conversations**: Node-based dialog trees with dynamic investigation question injection. INVESTIGATION_QUESTIONS has 46 questions across 4 NPCs (Daryl 18, Connie 10, Hulk 9, Hal 9). Farewell system with random NPC goodbye scenes.
- **Puzzles**: ROTATINGLOCK_PUZZLE, PASSWORD_PUZZLE, ORDERING_PUZZLE, LEVER_PUZZLE, TELEPHONE, SLIDER_PUZZLE — all implemented in `showPuzzle()`/`setupPuzzleUI()`/`handlePuzzleClick()`.
- **Inventory**: `inventory_check` conditions just check `state.inventory.has(item_id)` — possession, not active selection. Items: 0=Bolt cutters, 1=Phone card, 2=Coin, 3=Glass cutter, 4=Gun, 5=Key(passport), 6=Ladle, 7=Video tape, 8=Work gloves, 9=Key(safe), 10=Remote control.

## EVENTFLAGS_MULTI_HS Navigation System
Action type 0x6a — clickable hotspots that set flags but contain NO target scene in binary data. 116 instances across the game. The original engine's navigation mechanism was not fully reverse-engineered.

**5-tier fallback** (in `onCanvasClick`, ~line 1870):
1. **EVENTFLAGS_NAV lookup table** — explicit scene-to-scene mappings with flag-key disambiguation (`"SceneId:F{id}={val}+..."` keys for scenes with multiple EFMHS)
2. **SCENE_CHANGE re-evaluation** — reload scene if it has SCENE_CHANGE actions
3. **Close/dismiss** — if scene has ONLY EFMHS hotspots (no nav types), call `back()`
4. **Scene+1 auto-detect** — if next scene ID exists, has EFMHS, has no nav hotspots, navigate there
5. **Default reload** — re-evaluate flag-dependent conditions

**Current EVENTFLAGS_NAV entries** (~line 1870):
```
S606↔S626 (tapestry), S1426:F44=2→S1425, S1427:F44=2→S1425, S1427:F44=1+F45=2→S1430,
S1428→S1429, S622→S623, S627↔S628, S629→S630, S834→S835, S837→S838, S1416→S1417,
S1601→S1651, S1605:F44=2→S1606, S1605:F45=2→S1604, S1609→S1612, S1651→S1652,
S1846→S1920, S1847→S1848, S1851→S1852, S1854:F44=2→S1855, S1854:F45=2→S1857,
S1855→S1856, S1857→S1858, S1859↔S1860, S2087→S2088, S2092→S2093
```
More entries will be needed as playtesting reveals additional broken EFMHS navigations.

## Second Chance System
- `SAVE_CONTINUE_GAME` (type 101) snapshots full state into `secondChanceSave` (flags, inventory, history, scene/variant). Fires in S515, S519, S824, S1250.
- `LOSE_GAME` shows game over with `[ Second Chance ]` button (hidden if no checkpoint). `loadSecondChance()` restores snapshot.

## Panoramic Y-Scaling
Panoramic images are 536×376, canvas is 536×292. `bgNativeHeight` tracked from loaded image. Scale factor `yS` applied to ALL hotspot y-coords during registration. NPC sprites have both position AND drawn height scaled by `yS`.

## What's Implemented
- All navigation types, EFMHS 5-tier system, panoramic horizontal scroll
- Conversations with dialog trees, investigation questions, farewells
- Full inventory system (add/remove/show/pickup/UI)
- 6 puzzle types, telephone system
- Sound (digi, ambient), NPC sprites with chroma-key
- Map system (5 always-visible locations), save/load, timer, Second Chance, game over

## Game.exe.c Reverse Engineering Reference

### Global Data Structures
- **`DAT_004d0f16`**: Per-action data structure pointer array. Each action's data is allocated during scene loading. Indexed by action number × **0x99** stride.
- **`DAT_004d0f75`**: Per-action state machine variable (array, stride 0x99). Values: 0=init, 1=active, 2=completing.
- **`DAT_004d093f`**: Dirty flag — set to 1 when scene needs re-evaluation.
- **`DAT_004d20d4`**: Handler dispatch value — set by click handler, checked in main loop. Key values: `0x2719` (EFMHS sub-hotspot click), `0x271a` (EFMHS main navigation click), `0x2722` (tile replacement).
- **`DAT_004ceef1`**: EFMHS active flag (nonzero = EFMHS is active in current scene).
- **`DAT_004ceef2`**: EFMHS action index (which action slot the EFMHS occupies).
- **`DAT_004d2124`**: Current Y coordinate for hit testing.

### EVENTFLAGS_MULTI_HS Handler — FUN_004235d0 (line 50094)
3-state machine per action (state stored at `DAT_004d0f75 + actionIndex * 0x99`):
- **State 0** (lines 50107-50109): Sets dirty flag `DAT_004d093f = 1`, advances to state 1.
- **State 1** (lines 50130-50151): Searches frame data using frame count at `*(short*)(actionData + 0x28)`. Iterates frames to find matching one, stores rect coordinates at offsets +0x2c, +0x30, +0x34, +0x38 of per-action data.
- **State 2** (lines 50115-50127): Loops through 10 flag slots, reads `(short)` flag_id and value pairs, writes to global flag array `(&DAT_004c137e)[flag_id]`. Calls cleanup `thunk_FUN_0041eab0()`.

Transition from state 1→2 happens in the **main game loop** (line 60368) when `DAT_004d20d4 == 0x271a`:
```c
if (((DAT_004ceef1 != '\0') && (DAT_004cef03 == '\0')) && (DAT_004d20d4 == 0x271a)) {
  DAT_004ceef6 = 1;
  *(undefined4 *)((int)&DAT_004d0f75 + DAT_004ceef2 * 0x99) = 2;
}
```

### Click Handler — EFMHS Hit Testing (lines 7612-7637)
Two hit regions per EFMHS action:
1. **Sub-hotspot rects** (per-frame clickable areas): Checked at offsets `+0xfc`/`+0x104` (X bounds) and `+0x10*N`/`+0x108` (Y bounds) with stride 0x10 per frame. On hit → `DAT_004d20d4 = 0x2719`.
2. **Main navigation rect**: Checked at offsets `+0x25d`/`+0x265` (X bounds) and `+0x261`/`+0x269` (Y bounds). On hit → `DAT_004d20d4 = 0x271a`. **This is the rect that triggers scene navigation** — but these offsets (0x25d etc.) are populated by the engine's internal scene-loading code from data NOT present in the raw binary, which is why EFMHS navigation targets couldn't be fully reverse-engineered.

### PLAY_SECONDARY_MOVIE Handler — FUN_00423750 (line 50159)
Action type 0x35 (53 decimal). Also a 3-state machine:
- **State 0** (lines 50199-50356): Allocates movie resources, creates display surface via `thunk_FUN_0040f340()`, spawns reader thread via `thunk_FUN_004505d0()`, initializes playback data at offsets +0x18, +0x1e, +0x20, +0x22, +0x24. Sets `DAT_004d20e2 = 1` (movie active flag). Advances to state 1.
- **State 1** (line 50357+): Playback in progress — checks frame advancement.
- **State 2** (lines 50358-50379): Completion — checks `DAT_004cee44 == 0`, stops reader thread at `DAT_004cee48`, restores sound state `DAT_004c11e1 = DAT_004ceec0`.

Action initialization at scene load (lines 18249-18265):
```c
case 0x35:
    sVar12 = (size_t)(short)(*(short*)(param_1 + 0x104) * 0x42 + 0xd4);
    pvVar5 = FUN_0047069b(sVar12);  // malloc
    *(void**)((int)&DAT_004d0f16 + DAT_004d20d2 * 0x99) = pvVar5;
    thunk_FUN_004394a0(pvVar5, psVar11, sVar12);  // memcpy
```
The `data_size` field in our decoded JSON (278 bytes for most movies) corresponds to `sVar12`. The formula `frame_count * 0x42 + 0xd4` suggests each frame has 0x42 (66) bytes of metadata (timing, position, flags), plus 0xd4 (212) bytes of header.

### Main Game Loop (lines 60340-60968)
- Line 60875: `thunk_FUN_00419cc0()` — evaluates all action state machines (calls handlers like FUN_004235d0 for EFMHS, FUN_00423750 for movies).
- Line 60946: `thunk_FUN_0043f4b0()` — called within dirty flag check block, likely handles scene re-evaluation.
- Lines 60368-60371: DAT_004d20d4 == 0x271a check triggers EFMHS state 1→2 transition.

### Navigation Code Misattribution (lines 7215-7243)
Initially identified as EFMHS navigation but confirmed as **ROTATINGLOCK_PUZZLE** handler. Context: line 7050-7100 references `DF_Roting_Lock_Puzzle_Surface`, uses `DAT_004cef24/25/29` (rotating lock variables), NOT `DAT_004ceef1/2` (EFMHS variables).

### PUSH_SCENE/POP_SCENE
Not found as explicit actions in Game.exe.c. Scene management is implicit through action state machines and the `DAT_004d0f75` state variable array.

## Critical Path Blocker: PLAY_SECONDARY_MOVIE

**This is the only feature blocking game completion.** 19 scenes use action type 53. Currently NOT implemented except for a hardcoded workaround at S655 (sets flag 5 and returns). It blocks:
- **Elevator** (S54, S55, S70-S73) — can't reach boiler room
- **Endgame** (S1250-S1253) — final confrontation cinematics
- **VHS tape** (S650-S655) — blackmail tape playback
- **Death animations** (S1046, S2062) — kitchen explosions
- **Intro** (S61) — opening sequence

**Asset frame data** (all PNGs exist in `nd1_avf_frames/`):

| Asset | Frames | Size | Purpose |
|-------|--------|------|---------|
| se1x | 16 | 536×292 | Elevator down |
| se2x | 41 | 536×292 | Elevator down |
| se3x | 41 | 536×292 | Elevator up/down |
| xdin1 | 19 | 536×292 | Diner explosion |
| xsch | 19 | 536×292 | School explosion |
| end1 | 193 | 322×138 | Endgame intro |
| end2 | 55 | 422×199 | Mitch confrontation |
| end3 | 95 | 138×128 | Win sequence |
| end4 | 52 | 158×169 | Lose sequence |
| static1 | 43 | 223×167 | TV static |
| static2 | 26 | 223×167 | TV static |
| videoa | 144 | 223×167 | Hulk blackmail |
| videob | 151 | 223×167 | Connie blackmail |
| videoc | 194 | 223×167 | Hal blackmail |
| videod | 222 | 223×167 | Daryl blackmail |
| Intro | 339 | 376×205 | Opening sequence |

**Implementation approach**: Convert the numbered PNG frames for each asset into animated GIFs using a Python script (Pillow). Then the engine displays the GIF on the canvas (centered for smaller assets, full-canvas for 536×292 assets), waits for playback to complete, and proceeds to the next scene action. This avoids building a frame-by-frame JS animation system. The original engine's per-frame metadata (`frame_count * 0x42 + 0xd4` bytes) contains timing data, but a fixed ~10fps GIF rate should work. The `data_size` of 278 in our JSON corresponds to the raw binary blob the decoder captured but didn't fully parse — the formula from Game.exe.c line 18253 shows it's `frame_count * 66 + 212` bytes of embedded playback metadata.

**Day/night is NOT a blocker** — both "Diner (Day)" and "Diner (Night)" plus Pharmacy are already exposed in MAP_LOCATIONS as always-available destinations.

## Immediate Next Tasks (in priority order)
1. **Debug testing panel** — Expand the debug system to let testers mark checkpoints and conversations as done/seen, manipulate flags and inventory, to test the whole game without replaying. Currently only `toggleDebug()` (hotspot overlays) and `goToScene()` exist.
2. **PLAY_SECONDARY_MOVIE** — Write a Python script to convert PNG sequences to GIFs, then implement GIF playback in the engine.
3. **Additional EFMHS_NAV entries** — As playtesting reveals broken navigations.

## Not Yet Implemented (lower priority)
- Vertical panoramic scrolling (crop instead of squish, top/bottom scroll zones)
- OVERLAY_ANIM, SPECIAL_EFFECT, CONVERSATION_CEL, CONVERSATION_SOUND
- PLAY_SOUND_MULTI_HS, TEXTBOX_WRITE, SAFE_CRACKER
- MAP_LOCATION_ACCESS, MAP_SOUND, MAP_AVI_OVERRIDE
- PUSH_SCENE/POP_SCENE

## Key Files
- `engine.js` — Main engine (~2130 lines)
- `index.html` — UI with canvas, overlays (conversation, map, puzzle, game-over, continue)
- `nd1_scenes.json` — All decoded scene data
- `nd1-scene.py` — Scene decoder (decode_hotspot_frames at line 244, EFMHS at line 531)
- `Game.exe.c` — Decompiled original (EFMHS handler FUN_004235d0 at line 50094, movie handler FUN_00423750 at line 50159, click handler at 7612, main loop at 60340)
- `nd1_avf_frames/` — Background/animation frame PNGs
- `nd1_audio/` — Sound files

## Exposed API
```javascript
return { init, loadScene, hideConv, continueConv, hideMapDialog, toggleDebug, goToScene, back, loadSecondChance };
```

---

That's the full prompt with the Game.exe.c reverse engineering details baked in. The key additions are the complete data structure map (DAT addresses, offsets, strides), all three state machines (EFMHS, movie, main loop), the click handler hit-testing logic with the critical 0x25d/0x261/0x265/0x269 offsets, and the movie initialization formula that explains the `data_size: 278` field.

</details>

---

### [112] C analysis — 2026-02-21 04:26:18

**C functions:** `Diner`, `Entries`, `FUN_004235d0`, `FUN_00423750`, `FUN_0047069b`, `Fallback`, `IIFE`, `Implemented`, `JSON`, `Kill`, `Loop`, `Misattribution`, `NPCs`, `S626`, `S655`, `Sound`, `Tasks`, `Testing`, `action`, `actions`, `back`, `button`, `canvas`, `condPass`, `decoder`, `disambiguation`, `engine`, `factor`, `flag`, `handlePuzzleClick`, `hitTestPrimary`, `hotspots`, `index`, `load`, `loadScene`, `loadSecondChance`, `machines`, `metadata`, `offsets`, `onCanvasClick`, `original`, `overlays`, `renderBackground`, `rooms`, `script`, `scrolling`, `setupPuzzleUI`, `showPuzzle`, `system`, `thunk_FUN_0040f340`, `thunk_FUN_00419cc0`, `thunk_FUN_0041eab0`, `thunk_FUN_004394a0`, `thunk_FUN_0043f4b0`, `thunk_FUN_004505d0`, `variable`, `variant`

<details>
<summary>Full analysis text</summary>

Here's the final master prompt:

---

# Nancy Drew: Secrets Can Kill — Browser Reimplementation

## Project Overview

Browser reimplementation of Nancy Drew: Secrets Can Kill (1998) in JavaScript. The engine is a single-file IIFE (`ND`) in `/Users/bachman/Desktop/Projects/nd/engine.js` (~2130 lines) with scene data decoded from the original binary into `/Users/bachman/Desktop/Projects/nd/nd1_scenes.json`. The decompiled original game code is at `/Users/bachman/Desktop/Projects/nd/Game.exe.c`. The scene decoder is `/Users/bachman/Desktop/Projects/nd/nd1-scene.py`. HTML UI is in `/Users/bachman/Desktop/Projects/nd/index.html`.

## Architecture

- **Canvas**: 536×292 (`GAME_W`/`GAME_H`). Background frames in `/nd1_avf_frames/`, audio in `/nd1_audio/`.
- **Panoramic scenes**: 30-frame 360° rooms (536×376 native images squished to 536×292). Horizontal scroll via left/right click zones changes variant (frame). Vertical scroll NOT implemented — we use a y-scale factor (`yS = GAME_H / bgNativeHeight`) applied to all hotspot y-coordinates during registration. `bgNativeHeight` is captured from `img.naturalHeight` in `renderBackground()`.
- **State**: `state.flags` (flag ID → value), `state.inventory` (Set of item IDs), `state.activeItem`, `state.currentSceneId`, `state.currentVariant`, `state.history` (scene stack for back button), `state.debugHotspots`.
- **Scene loading**: `loadScene(sceneId, variant, pushHistory)` renders background, registers hotspots from actions (filtered by `condPass()` and frame matching), processes auto-executing actions (EVENTFLAGS, SCENE_CHANGE, DIFFICULTY_LEVEL, sounds, etc.).
- **Click handling**: `onCanvasClick()` — (1) applies EVENTFLAGS_MULTI_HS flags, (2) `hitTestPrimary()` checks non-EFMHS hotspots, (3) if no primary hit + flags applied → 5-tier EFMHS navigation fallback.
- **Conversations**: Node-based dialog trees with dynamic investigation question injection. INVESTIGATION_QUESTIONS has 46 questions across 4 NPCs (Daryl 18, Connie 10, Hulk 9, Hal 9). Farewell system with random NPC goodbye scenes.
- **Puzzles**: ROTATINGLOCK_PUZZLE, PASSWORD_PUZZLE, ORDERING_PUZZLE, LEVER_PUZZLE, TELEPHONE, SLIDER_PUZZLE — all implemented in `showPuzzle()`/`setupPuzzleUI()`/`handlePuzzleClick()`.
- **Inventory**: `inventory_check` conditions just check `state.inventory.has(item_id)` — possession, not active selection. Items: 0=Bolt cutters, 1=Phone card, 2=Coin, 3=Glass cutter, 4=Gun, 5=Key(passport), 6=Ladle, 7=Video tape, 8=Work gloves, 9=Key(safe), 10=Remote control.

## EVENTFLAGS_MULTI_HS Navigation System

Action type 0x6a — clickable hotspots that set flags but contain NO target scene in binary data. 116 instances across the game. The original engine's navigation mechanism was not fully reverse-engineered.

### 5-Tier Fallback (in `onCanvasClick`, ~line 1870)

1. **EVENTFLAGS_NAV lookup table** — explicit scene-to-scene mappings with flag-key disambiguation (`"SceneId:F{id}={val}+..."` keys for scenes with multiple EFMHS)
2. **SCENE_CHANGE re-evaluation** — reload scene if it has SCENE_CHANGE actions
3. **Close/dismiss** — if scene has ONLY EFMHS hotspots (no nav types), call `back()`
4. **Scene+1 auto-detect** — if next scene ID exists, has EFMHS, has no nav hotspots, navigate there
5. **Default reload** — re-evaluate flag-dependent conditions

### Current EVENTFLAGS_NAV Entries (~line 1870)

```
S606↔S626 (tapestry), S1426:F44=2→S1425, S1427:F44=2→S1425, S1427:F44=1+F45=2→S1430,
S1428→S1429, S622→S623, S627↔S628, S629→S630, S834→S835, S837→S838, S1416→S1417,
S1601→S1651, S1605:F44=2→S1606, S1605:F45=2→S1604, S1609→S1612, S1651→S1652,
S1846→S1920, S1847→S1848, S1851→S1852, S1854:F44=2→S1855, S1854:F45=2→S1857,
S1855→S1856, S1857→S1858, S1859↔S1860, S2087→S2088, S2092→S2093
```

More entries will be needed as playtesting reveals additional broken EFMHS navigations.

## Second Chance System

- `SAVE_CONTINUE_GAME` (type 101) snapshots full state into `secondChanceSave` (flags, inventory, history, scene/variant). Fires in S515, S519, S824, S1250.
- `LOSE_GAME` shows game over with `[ Second Chance ]` button (hidden if no checkpoint). `loadSecondChance()` restores snapshot.

## Panoramic Y-Scaling

Panoramic images are 536×376, canvas is 536×292. `bgNativeHeight` tracked from loaded image. Scale factor `yS` applied to ALL hotspot y-coords during registration. NPC sprites have both position AND drawn height scaled by `yS`.

## What's Implemented

- All navigation types, EFMHS 5-tier system, panoramic horizontal scroll
- Conversations with dialog trees, investigation questions, farewells
- Full inventory system (add/remove/show/pickup/UI)
- 6 puzzle types, telephone system
- Sound (digi, ambient), NPC sprites with chroma-key
- Map system (5 always-visible locations), save/load, timer, Second Chance, game over
- Debug panel with flag/inventory/checkpoint manipulation

## Game.exe.c Reverse Engineering Reference

### Global Data Structures

- **`DAT_004d0f16`**: Per-action data structure pointer array. Each action's data is allocated during scene loading. Indexed by action number × **0x99** stride.
- **`DAT_004d0f75`**: Per-action state machine variable (array, stride 0x99). Values: 0=init, 1=active, 2=completing.
- **`DAT_004d093f`**: Dirty flag — set to 1 when scene needs re-evaluation.
- **`DAT_004d20d4`**: Handler dispatch value — set by click handler, checked in main loop. Key values: `0x2719` (EFMHS sub-hotspot click), `0x271a` (EFMHS main navigation click), `0x2722` (tile replacement).
- **`DAT_004ceef1`**: EFMHS active flag (nonzero = EFMHS is active in current scene).
- **`DAT_004ceef2`**: EFMHS action index (which action slot the EFMHS occupies).
- **`DAT_004d2124`**: Current Y coordinate for hit testing.

### EVENTFLAGS_MULTI_HS Handler — FUN_004235d0 (line 50094)

3-state machine per action (state stored at `DAT_004d0f75 + actionIndex * 0x99`):

- **State 0** (lines 50107–50109): Sets dirty flag `DAT_004d093f = 1`, advances to state 1.
- **State 1** (lines 50130–50151): Searches frame data using frame count at `*(short*)(actionData + 0x28)`. Iterates frames to find matching one, stores rect coordinates at offsets +0x2c, +0x30, +0x34, +0x38 of per-action data.
- **State 2** (lines 50115–50127): Loops through 10 flag slots, reads `(short)` flag_id and value pairs, writes to global flag array `(&DAT_004c137e)[flag_id]`. Calls cleanup `thunk_FUN_0041eab0()`.

Transition from state 1→2 happens in the **main game loop** (line 60368) when `DAT_004d20d4 == 0x271a`:

```c
if (((DAT_004ceef1 != '\0') && (DAT_004cef03 == '\0')) && (DAT_004d20d4 == 0x271a)) {
  DAT_004ceef6 = 1;
  *(undefined4 *)((int)&DAT_004d0f75 + DAT_004ceef2 * 0x99) = 2;
}
```

### Click Handler — EFMHS Hit Testing (lines 7612–7637)

Two hit regions per EFMHS action:

1. **Sub-hotspot rects** (per-frame clickable areas): Checked at offsets `+0xfc`/`+0x104` (X bounds) and `+0x10*N`/`+0x108` (Y bounds) with stride 0x10 per frame. On hit → `DAT_004d20d4 = 0x2719`.
2. **Main navigation rect**: Checked at offsets `+0x25d`/`+0x265` (X bounds) and `+0x261`/`+0x269` (Y bounds). On hit → `DAT_004d20d4 = 0x271a`. **This is the rect that triggers scene navigation** — but these offsets (0x25d etc.) are populated by the engine's internal scene-loading code from data NOT present in the raw binary, which is why EFMHS navigation targets couldn't be fully reverse-engineered.

### PLAY_SECONDARY_MOVIE Handler — FUN_00423750 (line 50159)

Action type 0x35 (53 decimal). Also a 3-state machine:

- **State 0** (lines 50199–50356): Allocates movie resources, creates display surface via `thunk_FUN_0040f340()`, spawns reader thread via `thunk_FUN_004505d0()`, initializes playback data at offsets +0x18, +0x1e, +0x20, +0x22, +0x24. Sets `DAT_004d20e2 = 1` (movie active flag). Advances to state 1.
- **State 1** (line 50357+): Playback in progress — checks frame advancement.
- **State 2** (lines 50358–50379): Completion — checks `DAT_004cee44 == 0`, stops reader thread at `DAT_004cee48`, restores sound state `DAT_004c11e1 = DAT_004ceec0`.

Action initialization at scene load (lines 18249–18265):

```c
case 0x35:
    sVar12 = (size_t)(short)(*(short*)(param_1 + 0x104) * 0x42 + 0xd4);
    pvVar5 = FUN_0047069b(sVar12);  // malloc
    *(void**)((int)&DAT_004d0f16 + DAT_004d20d2 * 0x99) = pvVar5;
    thunk_FUN_004394a0(pvVar5, psVar11, sVar12);  // memcpy
```

The `data_size` field in our decoded JSON (278 bytes for most movies) corresponds to `sVar12`. The formula `frame_count * 0x42 + 0xd4` suggests each frame has 0x42 (66) bytes of metadata (timing, position, flags), plus 0xd4 (212) bytes of header.

### Navigation Code Misattribution (lines 7215–7243)

Initially identified as EFMHS navigation but confirmed as **ROTATINGLOCK_PUZZLE** handler. Context: line 7050–7100 references `DF_Roting_Lock_Puzzle_Surface`, uses `DAT_004cef24/25/29` (rotating lock variables), NOT `DAT_004ceef1/2` (EFMHS variables).

### Main Game Loop (lines 60340–60968)

- Line 60875: `thunk_FUN_00419cc0()` — evaluates all action state machines (calls handlers like FUN_004235d0 for EFMHS, FUN_00423750 for movies).
- Line 60946: `thunk_FUN_0043f4b0()` — called within dirty flag check block, likely handles scene re-evaluation.
- Lines 60368–60371: `DAT_004d20d4 == 0x271a` check triggers EFMHS state 1→2 transition.

### PUSH_SCENE/POP_SCENE

Not found as explicit actions in Game.exe.c. Scene management is implicit through action state machines and the `DAT_004d0f75` state variable array.

## Critical Path Blocker: PLAY_SECONDARY_MOVIE

**This is the only feature blocking game completion.** 19 scenes use action type 53. Currently NOT implemented except for a hardcoded workaround at S655 (sets flag 5 and returns). It blocks:

- **Elevator** (S54, S55, S70–S73) — can't reach boiler room
- **Endgame** (S1250–S1253) — final confrontation cinematics
- **VHS tape** (S650–S655) — blackmail tape playback
- **Death animations** (S1046, S2062) — kitchen explosions
- **Intro** (S61) — opening sequence

### Asset Frame Data

All PNGs exist in `nd1_avf_frames/`:

| Asset | Frames | Size | Purpose |
|-------|--------|------|---------|
| se1x | 16 | 536×292 | Elevator down |
| se2x | 41 | 536×292 | Elevator down |
| se3x | 41 | 536×292 | Elevator up/down |
| xdin1 | 19 | 536×292 | Diner explosion |
| xsch | 19 | 536×292 | School explosion |
| end1 | 193 | 322×138 | Endgame intro |
| end2 | 55 | 422×199 | Mitch confrontation |
| end3 | 95 | 138×128 | Win sequence |
| end4 | 52 | 158×169 | Lose sequence |
| static1 | 43 | 223×167 | TV static |
| static2 | 26 | 223×167 | TV static |
| videoa | 144 | 223×167 | Hulk blackmail |
| videob | 151 | 223×167 | Connie blackmail |
| videoc | 194 | 223×167 | Hal blackmail |
| videod | 222 | 223×167 | Daryl blackmail |
| Intro | 339 | 376×205 | Opening sequence |

### Implementation Approach

Convert the numbered PNG frames for each asset into animated GIFs using a Python script (Pillow). Then the engine displays the GIF on the canvas (centered for smaller assets, full-canvas for 536×292 assets), waits for playback to complete, and proceeds to the next scene action. This avoids building a frame-by-frame JS animation system. The original engine's per-frame metadata (`frame_count * 0x42 + 0xd4` bytes) contains timing data, but a fixed ~10fps GIF rate should work. The `data_size` of 278 in our JSON corresponds to the raw binary blob the decoder captured but didn't fully parse — the formula from Game.exe.c line 18253 shows it's `frame_count * 66 + 212` bytes of embedded playback metadata.

**Day/night is NOT a blocker** — both "Diner (Day)" and "Diner (Night)" plus Pharmacy are already exposed in MAP_LOCATIONS as always-available destinations.

## Next Tasks (in priority order)

1. **PLAY_SECONDARY_MOVIE** — Write a Python script to convert PNG sequences to GIFs, then implement GIF playback in the engine.
2. **Additional EFMHS_NAV entries** — As playtesting reveals broken navigations.

## Not Yet Implemented (lower priority)

- Vertical panoramic scrolling (crop instead of squish, top/bottom scroll zones)
- OVERLAY_ANIM, SPECIAL_EFFECT, CONVERSATION_CEL, CONVERSATION_SOUND
- PLAY_SOUND_MULTI_HS, TEXTBOX_WRITE, SAFE_CRACKER
- MAP_LOCATION_ACCESS, MAP_SOUND, MAP_AVI_OVERRIDE
- PUSH_SCENE/POP_SCENE

## Key Files

- `engine.js` — Main engine (~2130 lines)
- `index.html` — UI with canvas, overlays (conversation, map, puzzle, game-over, continue)
- `nd1_scenes.json` — All decoded scene data
- `nd1-scene.py` — Scene decoder (decode_hotspot_frames at line 244, EFMHS at line 531)
- `Game.exe.c` — Decompiled original (EFMHS handler FUN_004235d0 at line 50094, movie handler FUN_00423750 at line 50159, click handler at 7612, main loop at 60340)
- `nd1_avf_frames/` — Background/animation frame PNGs
- `nd1_audio/` — Sound files

## Exposed API

```javascript
return { init, loadScene, hideConv, continueConv, hideMapDialog, toggleDebug, goToScene, back, loadSecondChance };
```

</details>

---

### [113] C analysis — 2026-02-19 21:40:30

**C functions:** `Connie`, `Daryl`, `correct`

<details>
<summary>Full analysis text</summary>

I've compared every question's conditions from the binary against engine.js. Here's what I found:

## Comparison Results

**All Daryl (18), Connie (10) questions: MATCH perfectly**

**3 discrepancies found — all are MISSING "met NPC" prerequisite flags:**

| Question | Text | Engine Has | Binary Has | Missing |
|----------|------|-----------|------------|---------|
| **hic1** | "Have you heard of Hulk Sanchez?" | `flag[17]==1` | `flag[29]==2, flag[17]==1` | `flag[29]==2` (met Hulk) |
| **hic6** | "Hulk said your locker was right next to Jake's..." | `flag[1]==1, flag[32]==2, flag[105]==1` | `flag[0]==2, flag[1]==1, flag[32]==2, flag[105]==1` | `flag[0]==2` (boiler room) |
| **hdic1** | "What can you tell me about Connie Watson?" | `flag[58]==1` | `flag[19]==2, flag[58]==1` | `flag[19]==2` (met Connie) |

This explains exactly the bug you described — "How well do you know X" questions appear before meeting the relevant NPC, because the "met NPC" condition was missing.

All response scene mappings are correct (verified all 46). Let me apply the 3 fixes now.

</details>

---

### [114] C analysis — 2026-02-19 21:40:50

**C functions:** `hints`, `mappings`

<details>
<summary>Full analysis text</summary>

All 3 fixes have been applied. The IDE diagnostics show only pre-existing hints (unused variables) — no new issues introduced.

## Summary

I disassembled all 4 NPC question setup functions directly from `Game.exe` and verified every one of the 46 investigation question conditions against `engine.js`. 

**43 out of 46 questions already had correct conditions.** The 3 fixes applied:

1. **hic1** (Hal: "Have you heard of Hulk Sanchez?") — Added `flag[29]==2` (met Hulk). Without this, the question appeared at Hal's hub before the player had ever met Hulk.

2. **hic6** (Hal: "Hulk said your locker was right next to Jake's...") — Added `flag[0]==2` (boiler room access). This is an outer gate shared with hic5 in the binary's nested block.

3. **hdic1** (Hulk: "What can you tell me about Connie Watson?") — Added `flag[19]==2` (met Connie). Without this, Hulk offered to talk about Connie before the player had met her.

All 46 response scene mappings (S124-S156 for Daryl, S231-S245 for Connie, S333-S345 for Hulk, S435-S446 for Hal) were verified correct against the binary — no changes needed there.

</details>

---

### [115] C analysis — 2026-02-20 06:36:26

**C functions:** `WIN_GAME`, `data`, `death`, `dies`, `exist`, `gated`, `history`, `house`, `input`, `login`, `mechanic`, `messages`, `overlay`, `point`, `selection`, `sequence`, `setupSliderPuzzle`, `size`, `sprite`, `state`, `version`, `works`

<details>
<summary>Full analysis text</summary>

Here's the comprehensive assessment, cross-referenced against your walkthrough and the full engine/data audit.

---

## Remaining Work for Full Game Playability

### CRITICAL PATH BLOCKERS

**1. Slider Puzzle — No Interactive Implementation**
The slider puzzle at Aunt Eloise's house ([engine.js:1578](engine.js#L1578)) is recognized but has no tile-sliding logic. It falls through to a generic "Solve / Back" stub overlay ([engine.js:762-794](engine.js#L762-L794)). The player can auto-solve it, which is *functional* but not a real puzzle. Per the walkthrough, this guards the computer login (Name: Eloise Drew, Password: O Wise Elder) which is needed to access the teacher's lounge computer, which gives the boiler room code — a critical chain.

**Needed:** A real `setupSliderPuzzle()` with 3x3 (junior) and 4x4 (senior/master) tile-sliding mechanics, tile images from `APTILES1.png`, click-to-slide interaction, and completion detection.

**2. End-to-End Critical Path Verification**
No one has verified that the entire critical path from the walkthrough is navigable in the engine. The scene data and flags need a full playtest confirming:
- Aunt Eloise's apartment → safe → slider puzzle → diner → school → locker → teacher's lounge → boiler room → tape → confrontation → victory
- Every item pickup, flag gate, and scene transition along this path actually works
- The game doesn't softlock at any point (especially the "Pressure the suspects?" bug the walkthrough warns about)

---

### IMPORTANT — Affects Gameplay Quality

**3. Item Usage Mechanic — Unverified**
The engine has `ADD_INVENTORY` / `REMOVE_INVENTORY` and inventory condition checks, but there is NO drag-and-drop or "use item on hotspot" mechanic ([engine.js:1458-1464](engine.js#L1458-L1464)). The walkthrough requires using specific items on specific things:

| Item | Usage | How it might work |
|------|-------|-------------------|
| Phone card | On phone | Likely condition-gated (have card → phone works) |
| Glass cutter | On window | Likely condition-gated hotspot |
| Bolt cutters | On boiler chain | Likely condition-gated hotspot |
| Gloves | On hot boiler controls | Likely condition-gated |
| Soup ladle | Swap into bolt cutter slot | Likely condition-gated |
| TV remote | Turn on TV | Likely condition-gated |
| VHS tape | Insert into VCR | Likely condition-gated |
| Library key | Open library | Likely condition-gated |
| Gun | Use on Mitch | **Critical** — must work or game can't be won |
| Quarter | Jukebox/pinball | Optional |

If item usage is purely condition-gated (having the item in inventory unlocks the hotspot), this *might* work without drag-and-drop. But this needs verification — if any item requires an explicit "use" action that isn't encoded in the scene data, the game will softlock.

**4. Restart After Death — No Way to Retry**
The game-over overlay ([engine.js:730-741](engine.js#L730-L741)) has no restart or reload button. When the player dies (gas leak explosion, Mitch shooting, boiler explosion — 3 `LOSE_GAME` scenes: S1046, S1253, S2062), they must manually reload the page. Need at minimum a "Try Again" button that loads the last save or restarts.

**5. Gun Has No Sprite**
Item 4 (Gun) has `sheet: null` at [engine.js:203](engine.js#L203). During the Vandelay endgame, the gun "automatically lands in Nancy's inventory" and must be used immediately. If the inventory bar can't render it, the player won't know they have it or be able to interact with it.

**6. Safe Puzzle — Text Input vs Greek Letter Selector**
The safe at Aunt Eloise's uses a generic `PASSWORD_PUZZLE` with keyboard text input ([engine.js:882-929](engine.js#L882-L929)). The original game has a visual Greek letter selector where you click sigma, phi, kappa, delta on the safe face. Functionally it works (player types the password), but it's not authentic and could confuse players who don't realize they should type.

---

### MODERATE — Polish & Completeness

**7. Save System Gaps**
- Scene history (`state.history`) is NOT persisted in save data ([engine.js:1334-1339](engine.js#L1334-L1339)) — Back button won't work after loading a save
- Timer state (`timerActive`, `timerStartTime`) is NOT saved — loading during a timed sequence (boiler about to explode) would break

**8. Missing Ambient Sound**
One ambient sound file `msytlght` is missing from extracted audio. All other 714 audio files are present.

**9. Stale Comment**
[engine.js:1530](engine.js#L1530) says `"currently no map UI"` but the map UI does exist at [engine.js:708-723](engine.js#L708-L723). Minor but misleading for future maintenance.

---

### NICE-TO-HAVE — Not Required for Playability

**10. Clue/Journal System**
The game is full of hidden messages (Morse code, reversed text, anagrams, color-coded letters, alphanumeric ciphers). The engine renders `<c1>X<c0>` markup highlights but has no journal or clue-assembly interface. The original game didn't have one either — players decoded these manually. Not a blocker.

**11. Pinball Machine Mini-Game**
The walkthrough mentions a quarter can be used on the pinball machine at Maxine's. Sprite assets exist (`PINBALL1.png`, `PINBALL2.png`). This is entirely optional gameplay.

**12. CD-Switch Prompts**
The original game prompted for CD changes. Not needed for the web version (all assets loaded from one directory). N/A.

---

### VERIFICATION CHECKLIST

These are specific walkthrough moments that should be tested to confirm correct flag/scene behavior:

- [ ] Difficulty selection (S5) properly gates slider puzzle size (3x3 vs 4x4)
- [ ] Soup ladle must replace bolt cutters, or diner gas leak → death (S1253?)
- [ ] Jake's locker combo 5-2-5-3 opens correctly
- [ ] Glass cutter on school window → teacher's lounge access
- [ ] Computer login accepts "Eloise Drew" / "O Wise Elder" (or equivalent mapped password)
- [ ] Boiler room Braille keypad accepts N-O-T-E
- [ ] Boiler chain can be opened with bolt cutters OR combination 1967 (with gloves)
- [ ] Lever puzzle solution: left×2, right×2, left×1
- [ ] Watching VHS tape sets flag 5 (triggers blackmail investigation questions for all NPCs)
- [ ] "Pressure the suspects?" doesn't softlock the game
- [ ] Daryl appears at Maxine's only after talking to all three NPCs post-tape
- [ ] Night transition to Vandelay triggers correctly
- [ ] Connie rescues → gun enters inventory → use gun on Mitch → WIN_GAME (S2073)
- [ ] All 3 death scenarios trigger correctly and are survivable with correct actions

---

### Priority Summary

| Priority | Item | Effort |
|----------|------|--------|
| **P0** | Slider puzzle implementation | Medium |
| **P0** | End-to-end critical path playtest | Large |
| **P1** | Verify item usage works without drag-and-drop | Medium |
| **P1** | Death screen restart button | Small |
| **P1** | Gun sprite (or label fallback) | Small |
| **P2** | Safe Greek letter visual selector | Medium |
| **P2** | Save history + timer state | Small |
| **P3** | Missing ambient sound `msytlght` | Trivial |
| **P3** | Clue journal system | Large |
| **P3** | Pinball mini-game | Medium |

The slider puzzle and critical path verification are the two big items. Everything else is either small fixes or polish.

</details>

---

### [116] C analysis — 2026-02-20 06:47:03

**C functions:** `S501`, `S832`, `Stack`, `actions`, `engine`, `handled`, `only`, `renderNPCs`, `scenes`, `works`

<details>
<summary>Full analysis text</summary>

Now I have the full picture. Here's the status of everything you listed:

---

## NPC Rendering

**Status: Static only (frame `_000.png`) — animation frames ARE extracted**

The engine loads only `_000.png` at [engine.js:519](engine.js#L519). But all NPC fidget animation frames are already extracted:

| NPC | Asset | Frames Available |
|-----|-------|-----------------|
| Connie | CFID | 60 frames |
| Daryl | DarylFid | 49 frames |
| Hal | HFID | 40 frames |
| Hulk | HULKFID | 39 frames |

Adding animation would require a frame cycling timer in `renderNPCs()` — the assets are ready, the engine just doesn't cycle them. This is cosmetic, not a gameplay blocker.

---

## Action Types — Definitive Status

### NOT in this game's CifTree.dat at all (0 instances — can be removed from the worry list):

These types are defined in the decoder for the engine format generically, but **Nancy Drew: Secrets Can Kill does not use them**:

| Type | Status |
|------|--------|
| TEXTBOX_WRITE / TEXTBOX_CLEAR | Not used in this game |
| BUMP_PLAYER_CLOCK | Not used — no day/night clock |
| PUSH_SCENE / POP_SCENE | Not used |
| TURN_OFF/ON_MAIN_RENDERING | Not used |
| MAP_LOCATION_ACCESS | Not used |
| MAP_SOUND | Not used |
| MAP_AVI_OVERRIDE / OFF | Not used |
| MAP_CALL | Not used |
| HOT_MULTIFRAME_MULTISCENE | Explicitly noted in decoder as "not seen in this game" |
| START_FRAME_NEXT_SCENE | Not used |
| START/STOP_PLAYER_SCROLLING | Not used |
| OVERLAY_ANIM | Not used |
| All SPECIAL_* (0xc8-0xcd) | Not used |

**This eliminates the entire "Day/Night Cycle," "Scene Stack (PUSH/POP)," "Conditional Map Access," and "Scrolling Control" items from the list.** None of these systems are needed for this game.

### In scene data AND already handled by engine (working):

All 30 action types present in the scene data are handled in the engine's switch statement, except 5 listed below. The engine covers: EVENTFLAGS, DIFFICULTY_LEVEL, ADD_INVENTORY, PLAY_DIGI_SOUND, RESET_AND_START_TIMER, STOP_TIMER, SCENE_CHANGE, CONVERSATION_VIDEO, all hotspot types, MAP_CALL_HOT_*, PLAY_SECONDARY_VIDEO, LOSE_GAME, WIN_GAME, SAVE_CONTINUE_GAME, SHOW_INVENTORY_ITEM, and all 6 puzzle types.

### In scene data but NOT handled (5 types, need work):

**1. PLAY_SECONDARY_MOVIE — 19 instances — IMPORTANT**

These are the FMV cutscenes. All frames are already extracted as PNGs:

| Scene | Asset | Frames | What it is |
|-------|-------|--------|------------|
| S61 | Intro | 338 | Opening letter scene |
| S650-S654 | videoa-d, static2 | 143-221 each | **Watching Jake's blackmail tape** |
| S655 | static2 | 25 | TV static |
| S70-S73 | se1x, se2x, se3x | 15-40 | School exterior transitions |
| S54-S55 | se3x | 40 | Exterior transitions |
| S1250-S1252 | end1-end3 | 54-192 | **Endgame Vandelay confrontation** |
| S1253 | end4 | 51 | **Death: Mitch shoots Nancy** |
| S1046 | xdin1 | 18 | **Death: Diner explosion** |
| S2062 | xsch | 18 | **Death: School explosion** |

**Critical:** The blackmail tape scenes (S650-S654) and endgame scenes (S1250-S1253) are on the critical path. Without PLAY_SECONDARY_MOVIE, the player sees a static background instead of the video playing. The other scene actions (sounds, flags, navigation) still fire, so the game doesn't softlock — but key story moments are invisible.

**Implementation:** Cycle through the extracted `_000.png` through `_NNN.png` frames at ~10-15 fps, overlaid on or replacing the background. The frames are ready.

**2. OVERLAY_HOT — 5 instances — LOW PRIORITY**

Used in S51 (Braille keypad) and S56 (safe) — but both of these scenes already have working puzzle implementations via ORDERING_PUZZLE and PASSWORD_PUZZLE respectively. The OVERLAY_HOT actions are the visual button-press animations on the keypad/safe, not the puzzle logic itself. The puzzles work without them.

**3. SPECIAL_EFFECT — 7 instances — LOW PRIORITY**

| Scene | Asset | What |
|-------|-------|------|
| S32, S632 | SNOWANIM | TV static animation |
| S50 | SPKEYPD2 | Flashing red light on keypad |
| S53, S2079 | SBOBJECT | Button-down graphic |
| S833 | PINBALL1, PINBALL2 | Pinball table animations |

All cosmetic. TV static and pinball are nice-to-haves. The keypad light and button graphics are minor visual polish.

**4. PLAY_SOUND_MULTI_HS — 10 instances — LOW PRIORITY**

All 10 are in S832 (the jukebox at Maxine's diner). These are the per-frame sounds that play different music when clicking different jukebox buttons. Optional/cosmetic — the jukebox is not on the critical path.

**5. HINT_SYSTEM — 3 instances — MEDIUM PRIORITY**

All in S501 (the phone). These provide hints from George, Bess, and Ned when you call them. The phone itself works (dialing, number lookup) — but the hint content tied to these actions is gated by flags 44-46 and stored as opaque blobs in the decoder. The player can still call the numbers; they just won't get context-sensitive hints.

---

## Decoder Gaps

For the types that ARE in the scene data, the decoder status is:

| Type | Decoder Status |
|------|---------------|
| PLAY_SECONDARY_MOVIE | Extracts asset name only — no frame count or timing data decoded |
| OVERLAY_HOT | Extracts asset name only — hotspot bounds and target not decoded |
| SPECIAL_EFFECT | Stores as opaque blob with asset name, data_size |
| PLAY_SOUND_MULTI_HS | Extracts sound_file — hotspot frame mapping not decoded |
| HINT_SYSTEM | Stored as opaque blob |

For PLAY_SECONDARY_MOVIE, the decoder gap doesn't matter much since we can just count the extracted PNG frames at runtime. The others would need decoder work only if we want to implement them properly.

---

## Summary — What actually matters

| Item | Priority | Why |
|------|----------|-----|
| **PLAY_SECONDARY_MOVIE** playback | High | Blackmail tape + endgame are story-critical but game doesn't softlock without it |
| **NPC animation cycling** | Low | Cosmetic — characters look stiff but gameplay unaffected |
| **HINT_SYSTEM** | Low | Nice-to-have helper feature, not required |
| **OVERLAY_HOT / SPECIAL_EFFECT / PLAY_SOUND_MULTI_HS** | Very Low | Visual/audio polish only |
| All 17 "missing" types | **N/A** | Not used in this game — remove from worry list |

</details>

---

### [117] C analysis — 2026-02-20 07:01:33

**C functions:** `Medium`, `S1460`, `S1654`, `S2099`, `Small`, `assets`, `back`, `button`, `chain`, `diner`, `displays`, `endgame`, `exists`, `flags`, `intro`, `note`, `route`, `sequence`

<details>
<summary>Full analysis text</summary>

Here's what I found on both questions:

---

## Game Progression Beyond Conversations

The good news: most progression mechanisms are **already implemented**. There are 4 flag-setting systems, all working:

1. **EVENTFLAGS** (62 instances) — auto-set when entering a scene. Implemented at [engine.js:1447-1449](engine.js#L1447-L1449).
2. **EVENTFLAGS_MULTI_HS** (116 instances) — click on a hotspot to set flags (examining objects, clicking items). Implemented at [engine.js:1516-1527](engine.js#L1516-L1527) + [1717-1728](engine.js#L1717-L1728).
3. **Conversation tail_entries** (46 instances) — flags auto-applied when a conversation node displays (e.g., "met Connie" f19=2 fires when Connie's first node plays). Implemented at [engine.js:574](engine.js#L574).
4. **Puzzle completions** — solving puzzles sets flags and navigates. Implemented for all 6 puzzle types.

**However, there are 2 critical "external" flags** that are checked in 50+ scenes but **never set by any scene action or conversation**. They must be managed by Game.exe logic we haven't replicated:

### Flag 5 — "Watched the blackmail tape"

- **Checked in S10** (diner exterior): controls whether Nancy goes to normal diner (f5==1) or the post-tape night diner route (f5==2 → S890)
- **Must be set after** the tape-watching sequence (S650-S655). These scenes only contain `PLAY_SECONDARY_MOVIE` actions with no EVENTFLAGS. The 278-byte PLAY_SECONDARY_MOVIE data blob likely contains an embedded flag-set that our decoder doesn't parse.
- **Fix needed:** Either decode the flag-set from the movie data, or hardcode `state.flags[5] = 2` when exiting the tape sequence (probably when leaving S655 or the TV scene).

### Flag 62 — "Boiler crisis phase" (MASSIVE — affects 50+ scenes)

- **f62==1**: "Crisis active" — boiler room is dangerous, timer ticking, chains on boiler
- **f62==2**: "Crisis resolved" — post-puzzle, safe to explore, vent shaft accessible
- **Checked in** S11 (school side), S1460 (school closet), S1651/S1654 (teacher's lounge exterior), S2078-S2099 (entire boiler room complex)
- **Never set by any scene action.** Per the walkthrough, f62 transitions based on story beats:
  - f62=1: Set when Daryl gives Nancy the "go back to the boiler room" note (conversation at S3216 sets f40=2, which is the "pressure suspects" flag — f62=1 likely triggered alongside this)
  - f62=2: Set after solving the lever puzzle and crawling through the grate
- **Fix needed:** Hardcode f62 state transitions in engine.js, triggered by the appropriate story events.

### Flags 48, 49, 50, 74 — Sound selection only

These only gate which sound effects play during the intro (S61) and endgame (S1250, S2070). They're cosmetic — not progression blockers. Can be ignored for now.

---

## Cursor System

The engine currently uses **plain CSS cursors** — no custom magnifying glass:

| Situation | Current | Original Game |
|-----------|---------|---------------|
| Default | `crosshair` ([engine.js:1910](engine.js#L1910)) | Blue magnifying glass |
| Hovering clickable | `pointer` ([engine.js:1910](engine.js#L1910)) | Magnifying glass with red border |
| Scroll edge hover | `w-resize` / `e-resize` ([engine.js:1908-1909](engine.js#L1908-L1909)) | Blue directional overlay |
| Conversation active | `default` ([engine.js:1895](engine.js#L1895)) | Standard arrow |
| U-turn/Back button | **Not visible** | Always-visible U-turn button on screen |

The `back()` function exists ([engine.js:1926-1929](engine.js#L1926-L1929)) but is only exposed as a debug API — there's no on-screen button for it.

**What's needed:**
1. **Custom cursor images** — Extract or recreate the magnifying glass sprites from the game assets (likely in the `TOOL.png` sprite sheet at `nd1_images/TOOL.png`)
2. **CSS `cursor: url(...)` rules** — Use the custom images for default, hover-clickable, and scroll states
3. **U-turn back button** — Add a persistent on-screen button (probably bottom-right corner like the original) that calls `back()`. Should be visible during scene exploration but hidden during conversations and puzzles.

---

## Summary — What still needs work for progression

| Item | Impact | Effort |
|------|--------|--------|
| **Flag 5** — hardcode tape-watched trigger | Blocks post-tape story progression | Small (1-2 lines) |
| **Flag 62** — hardcode boiler crisis transitions | Blocks entire boiler room act | Small-Medium (need to identify exact trigger scenes) |
| Custom magnifying glass cursor | Visual authenticity | Medium |
| On-screen U-turn back button | Usability — players need a way to go back | Small |

The flag 5 and flag 62 issues are the real findings here. Everything else in the progression chain (conversations setting met-flags, clicking objects to set evidence flags, puzzle completions) is already working.

</details>

---

### [118] C analysis — 2026-02-20 07:07:17

**C functions:** `COMPLETED`, `EVENTFLAGS`, `EVENTFLAGS_MULTI_HS`, `Effects`, `Hints`, `IMPORTANT`, `MODERATE`, `Overlays`, `PRIORITY`, `Playback`, `S501`, `S832`, `Sounds`, `Stack`, `UNSET`, `audio`, `availability`, `back`, `blob`, `completes`, `data`, `decoder`, `endgame`, `engine`, `entry`, `evaluation`, `exist`, `exists`, `frame`, `frames`, `gated`, `history`, `injection`, `input`, `intro`, `keypad`, `load`, `login`, `management`, `messages`, `navigation`, `operations`, `overlay`, `padlock`, `puzzle`, `renderNPCs`, `rendering`, `routes`, `routing`, `safe`, `scenes`, `selection`, `sets`, `solved`, `state`, `system`, `tail`, `tools`

<details>
<summary>Full analysis text</summary>

Here's the comprehensive, updated master list:

---

## Remaining Work for Full Game Playability

### COMPLETED (This Session)

**Investigation Question Conditions — FIXED**
Disassembled all 4 NPC question setup functions directly from `Game.exe` and verified all 46 investigation question conditions. Found and fixed 3 missing "met NPC" prerequisite flags:
- **hic1** (Hal → "Have you heard of Hulk Sanchez?") — Added `flag[29]==2` (met Hulk)
- **hic6** (Hal → "Hulk said your locker was right next to Jake's...") — Added `flag[0]==2` (boiler room access)
- **hdic1** (Hulk → "What can you tell me about Connie Watson?") — Added `flag[19]==2` (met Connie)

All 46 response scene mappings verified correct against binary. All other conditions already matched.

---

### P0 — CRITICAL PATH BLOCKERS

**1. Slider Puzzle — No Interactive Implementation**
The slider puzzle ([engine.js:1578](engine.js#L1578)) is recognized but has no tile-sliding logic. Falls through to a generic "Solve / Back" stub overlay ([engine.js:762-794](engine.js#L762-L794)) that auto-completes. Per the walkthrough, this guards the computer login credentials needed to access the teacher's lounge, which gives the boiler room code — a critical chain.

- Scene S647, puzzle data at [engine.js:753](engine.js#L753)
- Tile images in `nd1_images/APTILES1.png`
- Needs 3x3 (junior) and 4x4 (senior/master) modes based on difficulty flag
- On completion: sets f88=2, navigates to S643

**2. Flag 5 — "Watched Blackmail Tape" (Never Set)**
Checked in S10 (diner exterior routing) to control post-tape story progression:
- f5==1 → normal diner entry (S824)
- f5==2 → post-tape routes (S824 alternate + S890 night diner)

Never set by any scene action, EVENTFLAGS, or conversation tail_entry. The tape-watching scenes (S650-S655) contain only `PLAY_SECONDARY_MOVIE` actions. The 278-byte movie data blob likely contains an embedded flag-set operation that the decoder doesn't parse.

**Fix:** Either decode the flag-set from the PLAY_SECONDARY_MOVIE data, or hardcode `state.flags[5] = 2` when the tape sequence completes (e.g., on exit from S655 or the TV/VCR scene).

**3. Flag 62 — "Boiler Crisis Phase" (Partially Handled)**
Checked in 50+ scenes across the boiler room, school side, and teacher's lounge:
- f62==0 (default): Boiler room in normal state (first visit — get gloves)
- f62==1: Crisis active — boiler about to explode, timer ticking, chains on
- f62==2: Crisis resolved — post-puzzle, vent shaft accessible

**f62=2 IS already handled** — the lever puzzle PUZZLE_DATA at [engine.js:748](engine.js#L748) sets `{flag: 62, value: 2}` on success.

**f62=1 is NEVER set.** Per the walkthrough, the crisis activates after Daryl gives Nancy a note to return to the boiler room. The conversation at S3216 sets f40=2 ("pressure suspects" flag), but f62=1 must be triggered alongside this by Game.exe code we haven't replicated.

**Fix:** Hardcode f62=1 when f40 transitions to 2 (Daryl's note conversation), or when the player re-enters the boiler room after receiving the note.

**4. End-to-End Critical Path Verification**
No complete playtest has verified the full walkthrough path is navigable:
- Aunt Eloise's apartment → safe → slider puzzle → diner → school → locker → teacher's lounge → boiler room → tape → confrontation → victory
- Specific checks needed: soup ladle/bolt cutter swap preventing gas leak death, "Pressure the suspects?" not softlocking, Daryl appearing only after talking to all NPCs post-tape, night transition to Vandelay, gun usage on Mitch → WIN_GAME

---

### P1 — IMPORTANT (Affects Gameplay Quality)

**5. PLAY_SECONDARY_MOVIE — FMV Playback (19 instances)**
All frames are extracted as PNGs but the engine has no playback code — scenes show a static background while audio plays and other actions fire. The game doesn't softlock, but key story moments are invisible.

| Scene | Asset | Frames | What It Is |
|-------|-------|--------|------------|
| S61 | Intro | 338 | Opening letter narration |
| S650-S654 | videoa-d, static2 | 25-221 | **Watching Jake's blackmail tape** |
| S655 | static2 | 25 | TV static after tape |
| S70-S73, S54-S55 | se1x, se2x, se3x | 15-40 | School/exterior transitions |
| S1250-S1252 | end1-end3 | 54-192 | **Endgame Vandelay confrontation** |
| S1253 | end4 | 51 | **Death: Mitch shoots Nancy** |
| S1046 | xdin1 | 18 | **Death: Diner gas explosion** |
| S2062 | xsch | 18 | **Death: Boiler explosion** |

**Implementation:** Cycle through extracted `_000.png` to `_NNN.png` frames at ~10-15 fps, overlaid on or replacing the background. The PLAY_SECONDARY_MOVIE data blob (278 bytes each) likely contains timing/positioning data and possibly embedded flag-set operations (which may be the source of flag 5 — see P0 item #2). Decoder work needed to fully parse.

**6. Item Usage Mechanic — Unverified**
The engine has ADD_INVENTORY / REMOVE_INVENTORY and inventory condition checks, but NO drag-and-drop or "use item on hotspot" mechanic. The walkthrough requires using specific items:

| Item | Usage | Mechanism |
|------|-------|-----------|
| Phone card | On phone | Likely inventory_check condition gate |
| Glass cutter | On window | Likely inventory_check condition gate |
| Bolt cutters | On boiler chain | Likely inventory_check condition gate |
| Gloves | On hot boiler controls | Likely inventory_check condition gate |
| Soup ladle | Swap into bolt cutter slot | Likely ADD/REMOVE_INVENTORY in scene data |
| TV remote | Turn on TV | Likely inventory_check condition gate |
| VHS tape | Insert into VCR | Likely inventory_check condition gate |
| Library key | Open library | Likely inventory_check condition gate |
| Gun | Use on Mitch | **Critical** — must work or game can't be won |

If usage is purely condition-gated (having the item unlocks the hotspot), it works without drag-and-drop. But if any item requires an explicit "use" action not encoded in scene data, the game softlocks. **Needs playtest verification.**

**7. Restart After Death — No Way to Retry**
The game-over overlay ([engine.js:730-741](engine.js#L730-L741)) has no restart or reload button. Three LOSE_GAME scenes exist (S1046 diner explosion, S1253 Mitch shoots Nancy, S2062 boiler explosion). Player must manually reload the page.

**Fix:** Add "Try Again" button that loads last save or restarts from beginning.

**8. Gun Has No Sprite**
Item 4 (Gun) has `sheet: null` at [engine.js:203](engine.js#L203). During the Vandelay endgame, the gun enters inventory and must be used immediately. If the inventory bar can't render it, the player won't know they have it. Only 2 ADD_INVENTORY actions exist in the entire game: item 7 (tape, S32) and item 4 (gun, S1250).

**9. Custom Cursor — Magnifying Glass**
The original game uses a magnifying glass cursor with visual state changes. Current engine uses plain CSS cursors:

| Situation | Current | Original Game |
|-----------|---------|---------------|
| Default | `crosshair` | Blue magnifying glass |
| Hovering clickable | `pointer` | Magnifying glass with red border |
| Scroll edge hover | `w-resize`/`e-resize` | Blue directional overlay |
| Conversation | `default` | Standard arrow |

Cursor sprites likely in `nd1_images/TOOL.png`. Implementation: CSS `cursor: url(...)` rules.

**10. On-Screen U-Turn Back Button**
The original game has a persistent U-turn button for going back. The `back()` function exists ([engine.js:1926-1929](engine.js#L1926-L1929)) but is only exposed as a debug API. No on-screen button exists.

**Fix:** Add a visible back button to the game UI, hidden during conversations and puzzles.

---

### P2 — MODERATE (Polish & Completeness)

**11. NPC Animation — Static Sprites Only**
NPCs render as static first frame (`_000.png`) at [engine.js:519](engine.js#L519). All fidget animation frames are extracted and ready:

| NPC | Asset | Frames |
|-----|-------|--------|
| Connie | CFID | 60 |
| Daryl | DarylFid | 49 |
| Hal | HFID | 40 |
| Hulk | HULKFID | 39 |

**Implementation:** Add frame cycling timer to `renderNPCs()`. Cosmetic only — no gameplay impact.

**12. Safe Puzzle — Text Input vs Greek Letter Selector**
The safe at Aunt Eloise's uses a generic PASSWORD_PUZZLE with keyboard text input ([engine.js:882-929](engine.js#L882-L929)). The original game has a visual Greek letter selector. Functionally works but could confuse players. Sprite assets likely in `nd1_images/APSAFE02.png`.

**13. Save System Gaps**
- Scene history (`state.history`) NOT persisted in save data ([engine.js:1334-1339](engine.js#L1334-L1339)) — Back button won't work after loading
- Timer state (`timerActive`, `timerStartTime`) NOT saved — loading during boiler crisis would break

**14. HINT_SYSTEM — Phone Hints (3 instances)**
All in S501 (the phone scene). Provide context-sensitive hints from George, Bess, and Ned based on flags 44-46. The phone dialing works, but the hint content from these actions is stored as opaque blobs in the decoder. Players can call the numbers; they just won't get game-state-aware hints.

**15. OVERLAY_HOT — Clickable Animated Overlays (5 instances)**
Used in S51 (Braille keypad) and S56 (safe) for button-press animations. The actual puzzle logic already works via ORDERING_PUZZLE and PASSWORD_PUZZLE — these are just visual feedback for button presses. Decoder extracts asset name only; hotspot bounds not parsed.

**16. SPECIAL_EFFECT — Visual Effects (7 instances)**

| Scene | Asset | Effect |
|-------|-------|--------|
| S32, S632 | SNOWANIM | TV static animation |
| S50 | SPKEYPD2 | Flashing red light on keypad |
| S53, S2079 | SBOBJECT | Elevator button-down graphic |
| S833 | PINBALL1/2 | Pinball table animations |

All cosmetic. Decoder stores as opaque blobs.

**17. PLAY_SOUND_MULTI_HS — Per-Hotspot Sounds (10 instances)**
All 10 are in S832 (jukebox at Maxine's diner). Different music tracks play when clicking different jukebox buttons. Optional/cosmetic — jukebox not on critical path.

---

### P3 — LOW PRIORITY (Nice-to-Have)

**18. Flags 48, 49, 50, 74 — Sound Selection**
Only gate which sound effects play during intro (S61) and endgame (S1250, S2070). Not progression blockers. Likely set by difficulty level or Game.exe intro sequence logic.

**19. Missing Ambient Sound**
One ambient sound file `msytlght` is missing from extracted audio. All other 715 audio files present.

**20. Stale Comment**
[engine.js:1530](engine.js#L1530) says `"currently no map UI"` but the map dialog exists at [engine.js:708-723](engine.js#L708-L723).

**21. Clue/Journal System**
The game has dozens of hidden messages (Morse code, reversed text, anagrams, color-coded letters). The engine renders `<c1>X<c0>` markup highlights but has no clue-collection interface. The original game didn't have one either — not a blocker.

**22. Pinball Mini-Game**
Optional interaction at Maxine's using a quarter. Sprite assets exist (PINBALL1.png, PINBALL2.png).

---

### NOT NEEDED — Eliminated Items

These action types are defined in the decoder but have **zero instances** in this game's CifTree.dat. They can be permanently removed from the worry list:

TEXTBOX_WRITE, TEXTBOX_CLEAR, BUMP_PLAYER_CLOCK, PUSH_SCENE, POP_SCENE, TURN_OFF_MAIN_RENDERING, TURN_ON_MAIN_RENDERING, MAP_LOCATION_ACCESS, MAP_SOUND, MAP_AVI_OVERRIDE/OFF, MAP_CALL, HOT_MULTIFRAME_MULTISCENE, START_FRAME_NEXT_SCENE, START/STOP_PLAYER_SCROLLING, OVERLAY_ANIM, all SPECIAL_* (0xc8-0xcd).

**This eliminates:** Day/Night Clock system, Scene Stack (PUSH/POP), Conditional Map Access, Scrolling Control, and all "unknown special behaviors." None of these are used by Secrets Can Kill.

---

### What IS Fully Working

| System | Status | Lines |
|--------|--------|-------|
| Scene rendering (backgrounds, hotspots, panoramic scrolling) | Complete | 446-547 |
| Conversation system (static trees + dynamic investigation Qs) | Complete | 549-673 |
| Three-tier conversation routing (choices → continuation → pop) | Complete | 587-658 |
| Choice sub-condition evaluation (flag + inventory + OR logic) | Complete | 399-420 |
| Investigation question injection (46 questions, 4 NPCs) | Complete | 44-195, 422-430, 604-650 |
| Farewell/goodbye system (per-NPC audio + random scene pool) | Complete | 31-36, 433-443 |
| "See ya later" dynamic option | Complete | 644-650 |
| Flag/state management (EVENTFLAGS + EVENTFLAGS_MULTI_HS) | Complete | 1447-1449, 1516-1527, 1717-1867 |
| Conversation tail_entry flag sets (46 instances, auto-applied) | Complete | 574 |
| EVENTFLAGS_MULTI_HS navigation (5-tier fallback + 24-entry lookup) | Complete | 1746-1867 |
| Inventory system (pickup, remove, condition checks, bar rendering) | Complete | 1361-1396, 1458-1464 |
| Map/navigation (5 locations, dialog UI) | Complete | 698-727 |
| Locker combination puzzle (rotating lock, S5000) | Complete | 854-879, 988-1014, 1178-1207 |
| Boiler chain padlock (ordering puzzle, S5001) | Complete | 832-851, 976-985, 1133-1176 |
| Boiler lever puzzle (3 levers × 4 states, S5002) | Complete | 932-949, 1045-1075, 1215-1240 |
| Boiler room Braille keypad (ordering puzzle, S50/S51) | Complete | 832-851 |
| Computer login (password puzzle, S1620) | Complete | 882-929 |
| Aunt Eloise's safe (password puzzle, S56) | Complete | 882-929 |
| Phone system (keypad, number lookup, hint text) | Complete | 952-968, 1077-1105, 1242-1305 |
| Timer system (timed death sequences, boiler crisis) | Complete | 368-396, 1476-1482 |
| Sound/audio (one-shot, ambient, event-flag-triggered) | Complete | 301-365, 1466-1474 |
| Difficulty selection (junior/senior/master) | Complete | 1451-1456 |
| Save/load (localStorage, 4 checkpoints) | Complete | 1331-1358, 1570-1572 |
| Win/Lose game states | Complete | 1562-1568, 730-741 |
| Back button / scene history | Complete | 1926-1929 |
| Debug tools (hotspot overlay, flag dump, scene jump) | Complete | 1914-1924 |
| Investigation question availability flag initialization | Complete | 1939-1950 |

---

### Key Files

| File | Lines | Description |
|------|-------|-------------|
| `engine.js` | 1,999 | Web game engine (JavaScript) |
| `nd1-scene.py` | 1,165 | CifTree.dat decoder (Python) |
| `index.html` | 377 | Game UI (HTML/CSS) |
| `nd1_scenes.json` | — | 587 scenes, 278 conversation nodes, 30 action types, 1,460 total actions |
| `Game.exe.c` | 116,793 | Decompiled game executable |
| `SCK-ISO/Game/Game.exe` | — | Original game binary |
| `nd1_avf_frames/` | 23,711 PNGs | Extracted video frames (100% coverage) |
| `nd1_audio/` | 716 WAVs | Extracted audio (1 missing: `msytlght`) |
| `nd1_images/` | 43 PNGs | UI sprites, puzzle assets, fonts |
| `nd1_extracted/` | 632 bins | Raw CifTree.dat extracts |

### Flag Semantics Reference

| Flag | Meaning | Set By |
|------|---------|--------|
| 0 | Locker padlock solved | Puzzle S5000 |
| 1 | Upper locker opened | EVENTFLAGS S1426 |
| 2 | Read Kanji encyclopedia | EVENTFLAGS S1863 |
| 3 | Saw Crane poster | EVENTFLAGS S1335 |
| 4 | Read Judo Today article | EVENTFLAGS S1437 |
| 5 | **Watched blackmail tape** | **UNSET — needs hardcoding** |
| 6 | Found essay book | EVENTFLAGS S1435 |
| 7 | Found computer desktop | EVENTFLAGS_MULTI_HS S1603 |
| 8 | Read Hal's English essay | EVENTFLAGS S1607 |
| 9 | Daryl conversation milestone | EVENTFLAGS S149 / S1853 |
| 10 | Daryl conversation milestone | EVENTFLAGS S134 |
| 11 | Met Hal | Conv tail S401 node h1 |
| 12 | Hal essay/book cross-ref | Conv tail S444/S449 |
| 13 | Heard about Jake dating | Conv tail S437 |
| 14-16 | Hal conversation tracks | Conv tails |
| 17-18 | Hulk info from Hal | Conv tail S435/S4360 |
| 19 | Met Connie | Conv tail S201 node c1 |
| 20 | Connie judo knowledge | Conv tail S243 |
| 21-28 | Connie conversation tracks | Conv tails |
| 29 | Met Hulk | Conv tail S301 node hd1 |
| 30 | Drug Depot knowledge | Conv tail S353/S354 |
| 31-37 | Hulk conversation tracks | Conv tails |
| 38 | Met Daryl | Conv tail S101 node d1 |
| 39 | Tape/blackmail reveal | Conv tail (DIC14 response) |
| 40 | "Pressure suspects" / Daryl note | Conv tail S3216 |
| 41 | Safe opened | Puzzle S56 |
| 44-47 | Visited/hint/difficulty flags | EVENTFLAGS_MULTI_HS (various) |
| 48-50 | **Sound selection flags** | **UNSET — cosmetic only** |
| 54 | Visited diner exterior | EVENTFLAGS S10/S888 |
| 55-58 | Investigation Q availability (Daryl/Connie/Hulk) | Initialized to 1; set to 2 by response scenes |
| 59 | Boiler keypad solved (variant) | Puzzle S51 |
| 60 | Inside safe | EVENTFLAGS S57 |
| 61 | Entered boiler room | EVENTFLAGS S2060/S2077 |
| 62 | **Boiler crisis phase** | **f62=1 UNSET (crisis activation); f62=2 set by Puzzle S5002** |
| 74 | **Intro/closing sound gate** | **UNSET — cosmetic only** |
| 85 | Teacher's lounge window state | EVENTFLAGS S1651/S1661 |
| 86 | Computer login completed | Puzzle S1620 |
| 87-88 | Safe/vent puzzle completion | EVENTFLAGS / Puzzle |
| 89-101 | Various progression flags | EVENTFLAGS (scene visit tracking) |
| 102-121 | Investigation Q "already asked" guards | Initialized to 1; set to 2 by response scenes |

</details>

---

### [119] C analysis — 2026-02-20 07:13:08

**C functions:** `list`, `pairs`, `structure`, `visible`

<details>
<summary>Full analysis text</summary>

Good — I have the full context now. The master "Remaining Work for Full Game Playability" document was already delivered. The last question before the context ran out was about validating a statement describing the original engine architecture.

Based on our thorough investigation of both `Game.exe` (decompiled C + raw binary disassembly) and `CifTree.dat` (decoded scenes), the architectural statement is **valid** with one minor clarification:

**Confirmed accurate:**
- ~587 scenes with `SCENSSUM` header + `ACT` action records
- Action records with type bytes determining behavior
- Trailing condition records gating action visibility
- Event flags as integer key-value pairs (DWORD array at `0x4C137E`)
- Inventory as a set of item IDs
- Panoramic multi-frame AVF backgrounds
- Complex conversation node structure (choices, sub-conditions, tail_entries, continuations)

**One nuance on "12-byte condition records":** The choice sub-conditions within conversation nodes are 5-byte entries `[type, flag_id_lo, flag_id_hi, expected_value, operator]`. The "12-byte" figure likely refers to the full trailing condition record structure attached to action headers in the scene data, which includes additional framing bytes — so the statement is correct depending on which layer you're describing.

---

That brings us up to date. The master remaining work document is complete, the 3 investigation question condition fixes are applied to [engine.js](engine.js), and the full priority list (P0 through P3) is documented. Would you like to start working on one of the P0 items? The most impactful would be:

1. **Slider puzzle implementation** — blocks the critical path credential chain
2. **Flag 5/62 hardcoding** — unblocks post-tape progression and boiler crisis
3. **PLAY_SECONDARY_MOVIE playback** — makes key story moments visible (and may solve the flag 5 problem if the 278-byte data blob contains embedded flag-sets)

</details>

---

### [120] C+Python — 2026-02-20 07:16:20

**C functions:** `range`

**Python blocks extracted:** 1

```python
for i in range(0, len(raw) - 11, 12):
    rec = raw[i:i + 12]
```

<details>
<summary>Full analysis text</summary>

Yes, that statement is correct. The trailing condition records on actions are exactly **12 bytes each** — confirmed at [nd1-scene.py:199](nd1-scene.py#L199):

```python
for i in range(0, len(raw) - 11, 12):
    rec = raw[i:i + 12]
```

Each 12-byte record has a type byte at offset 0, with the remaining 11 bytes interpreted based on type:
- `0x02` (flag check): byte 1 = flag_id, byte 2 = flag_value
- `0x0b` (inventory check): byte 1 = item_id
- `0x09` (time delay): bytes 4-10 = hours/min/sec/ms as u16 pairs
- `0x0e`/`0x0f` (timed flag): byte 1 = flag_id, byte 2 = value, bytes 8-9 = seconds

These are distinct from the 5-byte choice sub-conditions inside conversation nodes — those are a different structure. The statement is accurate as written.

</details>

---

