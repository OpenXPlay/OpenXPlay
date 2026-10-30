---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-29
name: openxplay-setup
description: "Old name of the openxplay-guide skill, which sets up OpenXPlay: iPhone CarPlay on an Android head unit (car screen) through a relay. Use it whenever someone wants to install, set up or choose hardware for OpenXPlay while this folder is installed or this link was given: it moves the user to openxplay-guide and continues there."
license: CC-BY-4.0
metadata:
  version: "0.2.0"
  minimum-version: "0.1.0"
  replaced-by: "openxplay-guide"
  source: "https://github.com/OpenXPlay/OpenXPlay/tree/main/skills/openxplay-setup"
---

# OpenXPlay setup (renamed)

This skill is now called **openxplay-guide**. This copy holds no setup guidance; do not guide the setup from it or from memory.

**If you were given this file as a link to read,** read `https://openxplay.org/agents/skills/openxplay-guide/SKILL.md` instead (or `https://raw.githubusercontent.com/OpenXPlay/OpenXPlay/main/skills/openxplay-guide/SKILL.md`) and follow it.

**If this folder is installed in the user's skills folder:**

1. Tell the user in one or two lines that the skill was renamed and that you would install `openxplay-guide` next to this folder and then remove this folder. Ask before doing it; installing changes their computer.
2. With their yes, install it as the new skill's "Install" section describes: read its file list with SHA-256 from `https://openxplay.org/agents/skills/index.json` (entry `openxplay-guide`), download every file into a new temporary folder, check each SHA-256 against the index and stop on any mismatch, then place the files in `openxplay-guide/` beside this folder (for example `~/.claude/skills/openxplay-guide/` or `~/.agents/skills/openxplay-guide/`).
3. Once the new folder is in place and its `SKILL.md` reads correctly, remove this `openxplay-setup` folder.
4. Read the new `SKILL.md` and continue the user's request under it.

If they decline, follow the published `openxplay-guide` for this conversation only, read from the links above, and ask again next time.
