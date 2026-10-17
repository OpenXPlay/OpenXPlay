---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: Check your head unit’s browser
description: Open this page in your Android head unit’s browser to test whether it can run the OpenXPlay web receiver — WebCodecs H.264 and H.265 decoding, audio, multi-touch and screen size. Runs locally.
breadcrumb: Check your head unit
---

<script setup>
import HeadUnitCheck from '../.vitepress/theme/components/HeadUnitCheck.vue'
</script>

# Check your head unit

Open this page in your head unit’s browser to see whether it can run the OpenXPlay web receiver. The check tests WebCodecs H.264 and H.265 video decoding, WebSocket, audio, multi-touch and the screen size, then gives a verdict and a report you can copy. It runs entirely in the browser: nothing is uploaded and nothing is stored.

On the head unit, type <code>{{ $frontmatter.checkAddress }}</code> into the browser’s address bar. The head unit needs Internet access for this, for example through your phone’s hotspot. Without Internet, the relay serves its own decoder probe at `/probe/` on the receiver address, such as `https://10.77.0.1:8443/probe/`.

## Result {#result}

<HeadUnitCheck />

## What the results mean {#meaning}

| Verdict | Meaning |
| --- | --- |
| Works with the web receiver | The browser has everything the web receiver needs and can decode H.265 (HEVC) in hardware, so the relay can use H.265. |
| Works, H.264 only | The browser can show CarPlay with H.264. The relay uses H.264 for any screen that can’t decode H.265 in hardware. |
| Not supported: needs a browser with WebCodecs | A required feature is missing, most often WebCodecs video decoding. Try another browser on the head unit, if it has one, or use the [Carlink route](/en/quick-start#carlink). |

A passing result means the browser has the features the web receiver uses. It can’t promise smooth playback, which also depends on the head unit’s hardware and the Wi-Fi connection.

## What is checked {#what-is-checked}

| Check | Why it matters |
| --- | --- |
| Secure page (HTTPS) | Browsers enable WebCodecs only on secure pages, which is why the relay serves the receiver over HTTPS. |
| WebCodecs VideoDecoder | The web receiver decodes CarPlay video with it. Without it, the browser can’t show CarPlay. |
| H.264 (AVC) | The baseline video format. The relay falls back to it whenever H.265 isn’t possible, and Carlink always uses it. |
| H.265 (HEVC) | Used only when every screen showing CarPlay decodes it in hardware. |
| Hardware decoding | Software decoding uses more processing power and video may stutter. |
| Web Workers and OffscreenCanvas | The receiver decodes and draws video away from the page’s main thread. |
| WebSocket | Carries video, audio and touch between the relay and the browser. |
| AudioContext and AudioWorklet | Play CarPlay’s sound. AAC decoding through WebCodecs AudioDecoder is optional. |
| Microphone (getUserMedia) | Lets Siri and calls use the head unit’s microphone, after you allow it in the browser. |
| Touch points | Touches go back to the iPhone. Two or more points allow multi-finger gestures. |
| Screen size and pixel ratio | The receiver reports them to the relay together with the video formats it can decode. |

## Share your result {#share}

Copy the report and post it in the [community](/en/#community) together with the head unit model and its system version. Reports help other drivers with the same head unit.
