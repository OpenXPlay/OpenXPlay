---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: 'Get started: choose the setup that fits you'
description: First time with OpenXPlay? Choose a relay (an Android phone or a UFI003 USB dongle) and how the head unit shows CarPlay (its browser or a Carlink app), see what you need, then follow the matching step-by-step guide.
breadcrumb: Get started
---

<script setup>
import RouteChooser from '../.vitepress/theme/components/RouteChooser.vue'
</script>

# Get started

OpenXPlay uses a relay to bring your iPhone’s CarPlay to the head unit. Choose the relay and how the head unit shows CarPlay, then follow the matching guide step by step.

<RouteChooser />

## What you need {#requirements}

| You need | Details |
| --- | --- |
| An iPhone with CarPlay | It connects to the relay wirelessly (Bluetooth and Wi-Fi) or by USB cable. |
| A relay | An Android phone with Android 8.0 or later and the OpenXPlay Relay app; or a UFI003 USB dongle, plus a computer to flash and install it. |
| An Apple accessory (MFi) identity | The two files `identity.pk8` and `certificate.p7b`, which you supply yourself; see below. |
| The head unit’s browser | It must decode video with WebCodecs. Open [Check your head unit](/en/check) in the head unit’s browser to find out. |

::: details What is an Apple accessory (MFi) identity? {#mfi-identity}
The relay uses this identity to authenticate with the iPhone as an accessory, and only then does CarPlay start; without an identity, the Android app doesn’t start CarPlay. It consists of the two files `identity.pk8` and `certificate.p7b`. The repositories and their builds contain none; you supply your own.
:::

## Which relay to choose {#choose-relay}

| | Android phone (recommended) | UFI003 USB dongle |
| --- | --- | --- |
| What you need | A phone with Android 8.0 or later | A UFI003 USB dongle and a computer |
| How you install it | Install the app and follow the setup guide; the first setup takes about 10 minutes | Preferably with OpenXPlay Flasher on a computer (installing is coming soon); or flash OpenStick Debian by hand and install the relay from the command line |
| Wi-Fi band | Can use a 5 GHz hotspot, so the picture stutters less | 2.4 GHz only |
| Where you set it up | In the app | In a web admin page |
| Power and start | Open the app on each drive | Runs as a system service and starts by itself when powered |

## After setup {#after-setup}

- [Everyday use and settings](/en/daily-use): connecting on each drive, and the head-unit page’s resolution, full-screen and other settings.
- [Trusted HTTPS](/en/trusted-https): remove the head-unit browser’s certificate warning with a free domain name.
- [Troubleshooting](/en/troubleshooting): when the connection, the picture or the sound goes wrong.
