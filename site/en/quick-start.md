---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: 'Get started: let an AI assistant guide you'
description: First time with OpenXPlay? Install the openxplay-guide skill and an AI assistant on your computer asks about your car and devices, recommends a setup and guides you through it step by step. Or choose a relay (an Android phone or a UFI003 USB dongle) and how the head unit shows CarPlay yourself, and follow the matching guide.
breadcrumb: Get started
---

<script setup>
import RouteChooser from '../.vitepress/theme/components/RouteChooser.vue'
</script>

# Get started

OpenXPlay uses a relay to bring your iPhone’s CarPlay to the head unit.

<div class="oxp-recommended">

## Let an AI assistant guide you <Badge type="tip" text="Recommended" /> {#ai-assistant}

The assistant asks about your car, iPhone and spare devices, recommends a setup (including whether another Linux device can be the relay) and guides you through it one step at a time, downloading and checking the files itself. It asks before anything that changes your computer or a device, and never asks for your CarPlay identity files or passwords.

1. Send this message in [Claude Code](https://claude.com/claude-code) or [Codex](https://github.com/openai/codex) to install the openxplay-guide skill:

   ::: code-group
   ```text [Claude Code]
   Install the openxplay-guide skill from https://openxplay.org/agents/skills/index.json into ~/.claude/skills/openxplay-guide/ and check every file’s SHA-256.
   ```

   ```text [Codex]
   Install the openxplay-guide skill from https://openxplay.org/agents/skills/index.json into ~/.agents/skills/openxplay-guide/ and check every file’s SHA-256.
   ```
   :::

2. Start a new conversation and say “Help me set up OpenXPlay”.

At the start of each conversation the skill checks for a newer version, and it updates only after you agree; what changed in each version is in its [changelog](https://github.com/OpenXPlay/OpenXPlay/blob/main/skills/openxplay-guide/CHANGELOG.md).

::: details Other assistants: use it once, without installing {#ai-prompt}
Any assistant that can read web pages works. Send it this message:

```text
Read https://openxplay.org/agents/skills/openxplay-guide/SKILL.md
and follow it to help me set up OpenXPlay.
```
:::

::: details Copy the skill folder by hand {#ai-skill}
Copy the folder [skills/openxplay-guide](https://github.com/OpenXPlay/OpenXPlay/tree/main/skills/openxplay-guide) into your assistant’s skills folder, then start a new conversation:

| Assistant | Skills folder |
| --- | --- |
| Claude Code | `~/.claude/skills/openxplay-guide/` |
| Codex | `~/.agents/skills/openxplay-guide/` |
:::

</div>

## Set it up yourself {#manual}

<RouteChooser />

### What you need {#requirements}

| You need | Details |
| --- | --- |
| An iPhone with CarPlay | It connects to the relay wirelessly (Bluetooth and Wi-Fi) or by USB cable. |
| A relay | An Android phone with Android 8.0 or later and the OpenXPlay Relay app; or a UFI003 USB dongle, plus a computer to flash and install it. Other arm64 Linux devices, such as the Phicomm N1, can be installed by hand: see [Other Linux devices](/en/linux-devices). |
| An Apple accessory (MFi) identity | The two files `identity.pk8` and `certificate.p7b`, which you supply yourself; see below. |
| The head unit’s browser | It must decode video with WebCodecs. Open [Check your head unit](/en/check) in the head unit’s browser to find out. In a Tesla, see [Tesla](/en/tesla). |

::: details What is an Apple accessory (MFi) identity? {#mfi-identity}
The relay uses this identity to authenticate with the iPhone as an accessory, and only then does CarPlay start; without an identity, the Android app doesn’t start CarPlay. It consists of the two files `identity.pk8` and `certificate.p7b`. The repositories and their builds contain none; you supply your own.
:::

### Which relay to choose {#choose-relay}

| | Android phone (recommended) | UFI003 USB dongle |
| --- | --- | --- |
| What you need | A phone with Android 8.0 or later | A UFI003 USB dongle and a computer |
| How you install it | Install the app and follow the setup guide; the first setup takes about 10 minutes | Preferably let an AI assistant on your computer read the install instructions and install it with OpenXPlay Flasher; or install it yourself in the Flasher app. The first install needs a Mac or a Windows PC |
| Wi-Fi band | Can use a 5 GHz hotspot, so the picture stutters less | 2.4 GHz only |
| Where you set it up | In the app | In a web admin page |
| Power and start | Open the app on each drive | Runs as a system service and starts by itself when powered |

## After setup {#after-setup}

- [Everyday use and settings](/en/daily-use): connecting on each drive, and the head-unit page’s resolution, full-screen and other settings.
- [Trusted HTTPS](/en/trusted-https): remove the head-unit browser’s certificate warning with a free domain name.
- [Troubleshooting](/en/troubleshooting): when the connection, the picture or the sound goes wrong.
