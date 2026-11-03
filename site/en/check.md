---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: Check your head unit’s browser
description: Open this page in your Android head unit’s browser to check whether it has the features the OpenXPlay web receiver uses — WebCodecs H.264 and H.265 decoding, audio, microphone, multi-touch and screen size. Runs locally; it doesn’t replace a test in the car.
breadcrumb: Check your head unit
---

<script setup>
import HeadUnitCheck from '../.vitepress/theme/components/HeadUnitCheck.vue'
</script>

# Check your head unit

Open this page in your head unit’s browser to check whether it has the features the OpenXPlay web receiver uses: WebCodecs H.264 and H.265 video decoding, WebSocket, audio, the microphone, multi-touch and the screen size. It then gives a verdict and a report you can copy. It runs entirely in the browser: nothing is uploaded and nothing is stored.

On the head unit, type <code>{{ $frontmatter.checkAddress }}</code> into the browser’s address bar. The head unit needs Internet access for this, for example through your phone’s hotspot. Without Internet, the relay serves its own decoder probe at `/probe/` on the receiver address, such as `https://10.77.0.1:8443/probe/`.

## Result {#result}

<HeadUnitCheck />

## What the results mean {#meaning}

| Verdict | Meaning |
| --- | --- |
| Checks passed, with H.265 | The browser reports the video, sound and microphone features the web receiver uses, and suggests it can decode H.265 (HEVC) in hardware, so the relay can use H.265. |
| Checks passed, H.264 only | The browser reports these features but doesn’t suggest hardware H.265 decoding. The relay uses H.264 for any screen that can’t decode H.265 in hardware. |
| Picture checks passed; some features are missing | Everything needed for the picture is there, but sound (AudioWorklet) or the microphone API is missing: CarPlay shows, but sound, Siri or calls may not work through the browser. |
| Not supported: needs a browser with WebCodecs | A required feature is missing, most often WebCodecs video decoding. Try another browser on the head unit, if it has one, or use the [Carlink app](/en/carlink). |

The check only asks the browser what it supports: it doesn’t play video, connect to a relay, record sound or send touches. So a passing result can’t promise smooth playback, which also depends on the head unit’s hardware and the Wi-Fi connection. Results from cars are under [Head units](/en/head-units).

## What is checked {#what-is-checked}

::: details What each check tests and why it matters {#checked-items}
| Check | Why it matters |
| --- | --- |
| Secure page (HTTPS) | Browsers enable WebCodecs only on secure pages, which is why the relay serves the receiver over HTTPS. |
| WebCodecs VideoDecoder | The web receiver decodes CarPlay video with it. Without it, the browser can’t show CarPlay. |
| H.264 (AVC) | The baseline video format. The relay falls back to it whenever H.265 isn’t possible. |
| H.265 (HEVC) | Used only when every screen showing CarPlay decodes it in hardware. |
| Hardware decoding | Software decoding uses more processing power and video may stutter. |
| Web Workers and OffscreenCanvas | The receiver decodes and draws video away from the page’s main thread. |
| WebSocket | Carries video, audio and touch between the relay and the browser. |
| AudioContext and AudioWorklet | Play CarPlay’s sound. AAC decoding through WebCodecs AudioDecoder is optional. |
| Microphone (getUserMedia) | Lets Siri and calls use the head unit’s microphone, after you allow it in the browser. |
| Touch points | Touches go back to the iPhone. Two or more points allow multi-finger gestures. |
| Screen size and pixel ratio | The receiver reports them to the relay together with the video formats it can decode. |
:::

## Share your result {#share}

Copy the report and post it in the [community](/en/community) together with the head unit model and its system version. Reports help other drivers with the same head unit.
