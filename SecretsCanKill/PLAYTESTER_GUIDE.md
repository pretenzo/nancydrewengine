# Secrets Can Kill - Play Tester's Guide

Welcome, and thank you for helping test this fan-made web recreation of Nancy Drew: Secrets Can Kill! Your job is to play through the game from start to finish and let us know if you hit any walls that prevent you from progressing. Don't worry about small visual glitches or minor oddities — we're focused on making sure the game is **completable from beginning to end**.

---

## Getting Started

Open the game in your web browser (Chrome or Firefox recommended). You'll see the main game screen. You can start a new game or load a save file from the original game (more on that below).

### Controls

- **Click** to interact with the world — doors, objects, characters, etc.
- **Hover** your mouse to discover interactive areas ("hotspots") in each scene.
- Your **inventory** appears at the bottom of the screen. You'll collect items throughout the game.

---

## What to Focus On

We need to know if anything **stops you from finishing the game**. Specifically:

- Can you get from one location to the next?
- Can you talk to every character you need to?
- Do conversations flow correctly — do the right dialogue options appear?
- Can you pick up the items you need?
- Can you progress through the major story beats?
- Does the game ever get stuck with no way to move forward?

**If you hit a dead end where you can't progress, that's the most important thing to report.**

---

## Known Issues (Don't Report These)

These are things we already know about. You don't need to flag them:

- **Character/video animations may load slowly** depending on your internet connection. If you experience repeated buffering or freezing during character animations, we recommend turning them off in the settings to keep testing smooth.
- **Character audio may load slowly or start late.** Clicking one of Nancy's dialogue responses may cause her audio to overlap with the other character still talking. This is a known timing issue.
- **Certain investigative questions and their responses play their audio too fast.** Some of Nancy's investigative questions (and the character's responses) play too fast and sound like Alvin and the Chipmunks. Note which conversation dialogue lines this happens on so it can be corrected.
- **The telephone dialing system is not implemented.** You won't be able to dial numbers on the phone.
- **Some music plays at the wrong time**, and some sound effects don't play or play incorrectly.
- **Not all puzzles are implemented yet.** If you reach a puzzle that doesn't seem to respond, note which one it is and move on.
- **Clicking inventory items onto hotspots doesn't work yet.** For example, you can't drag the TV remote item in your inventory onto a TV to turn it on. However, **if you have the required item in your inventory and click the hotspot normally, the game should still progress.** Just click the hotspot — don't worry about dragging items.
- **Day/Night transitions don't trigger on their own**, but the game should still be playable through to the end.
- **Picking up items doesn't play the "add to inventory" sound.**
- **Game credits don't work yet.**

---

## The DEBUG Menu

There's a **DEBUG menu** built into the game to help you test. It has a lot of options — here's what's most useful:

- **Hotspot overlays**: Turning these on will highlight all the clickable areas on screen. This is really helpful if you're stuck and can't figure out where to click. You'll see colored boxes showing exactly where you can interact.
- **Scene navigation**: You can jump to specific scenes if you need to re-test something or skip past a section.
- **Flags and inventory**: You can view and change game flags and inventory items, which can help you get past a stuck point to continue testing the rest of the game.

If you ever get completely stuck and can't progress, try using the DEBUG menu to skip ahead so you can keep testing the rest of the game. Then report where you got stuck.

---

## Saving and Loading

- **Save your game** by exporting a SAV file. This downloads a save file to your computer.
- **Load a saved game** by clicking LOAD SAV and selecting a save file. This works with save files from the original game too, so if you have old saves lying around, feel free to try them!

We recommend **saving often**, especially before talking to characters or entering new areas. If something breaks, you can reload and try again or report exactly where the problem happened.

---

## How to Report Issues

When you find something that blocks your progress, please include:

1. **Where you are** — What scene or location? Who were you talking to?
2. **What you were trying to do** — "I clicked the door to the library" or "I chose the second dialogue option talking to Connie."
3. **What happened** — "Nothing happened," "The screen went black," "The game froze," etc.
4. **What you expected** — "I expected the door to open" or "I expected the conversation to continue."

A screenshot is always helpful if you can grab one.

---

## Quick Refresher: Game Walkthrough Overview

If you haven't played Secrets Can Kill in a while, here's a rough outline of what should happen. Use this to check whether you're able to hit all the major beats:

1. **Arrive at Paseo Del Mar High School** — Explore the school hallways.
2. **Meet the suspects** — Talk to Connie, Hal, Hulk, and Daryl at various locations around the school.
3. **Investigate Jake Rogers' locker and the crime scene.**
4. **Search key locations** — The library, gym, teacher's lounge, Aunt Eloise's house, the diner, etc.
5. **Solve puzzles** — Boiler room, safe combinations, and more.
6. **Gather evidence** — Collect items, read documents, and put the clues together.
7. **Confront the culprit** — The final confrontation and ending.

Try to get through all of these. If you get stuck at any point and can't figure out the next step, check the DEBUG menu for hotspot overlays to make sure you haven't missed a clickable area.

---

## Thank You!

Your testing helps make this game a reality. Don't worry about being too detailed or too picky — even a quick "I got stuck here" message is valuable. Have fun replaying a classic!
