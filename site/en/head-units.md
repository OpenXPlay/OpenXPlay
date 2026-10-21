---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: 'Head units: tested models and recommended settings'
description: Android head units OpenXPlay has tested — whether the browser (web receiver) and the Carlink app work, which video formats they decode, and the recommended settings. Currently the Xpeng G6.
breadcrumb: Head units
pageClass: oxp-reference
---

# Head units

This page records the head units OpenXPlay has tested: whether the head unit’s browser and Carlink app can show CarPlay, which video formats they decode, and how to set things up for the best result. All results come from OpenXPlay’s own tests; the same car may behave differently on another system version.

| Head unit | Browser | Carlink app | Tested |
| --- | --- | --- | --- |
| [Xpeng G6](#xpeng-g6) (2023 model) | Yes; decodes H.264 and H.265 in hardware | Not yet | October 2026 |

Your head unit isn’t listed? Open [Check your head unit](/en/check) in its browser to test it, and share the result in the [community](/en/community).

## Xpeng G6 {#xpeng-g6}

Tested in October 2026 on the 2023 model.

| Route | Works? | Notes |
| --- | --- | --- |
| Browser | Yes | Tested with the Android relay and with the Linux relay on a UFI003 USB dongle. Built-in Chromium 120 browser that decodes H.264 and H.265 in hardware. With the Android relay the page runs full screen; reversing makes the browser leave full screen, and one tap brings it back. |
| Carlink | Not yet | Tested with the Android relay: it connects, but the car’s screen stays black; still being investigated. The Carlink app accepts only 720p H.264 at 30 fps, so the relay converts the video. The relay needs 5 GHz Wi-Fi. |

### Recommended setup {#xpeng-g6-setup}

- **Which to choose:** The browser route. It shows the iPhone’s video as it is, without conversion, and runs full screen with the Android relay.
- **Browser route:** Use the Android relay and choose XPeng G6 2023 in Settings → Car and screen. On a relay with only 2.4 GHz Wi-Fi, such as the UFI003, set the frame rate to 30 in the web receiver’s settings. H.264 is the most reliable video format for now.
- **Carlink route:** Not recommended for now: on this car the screen stays black after connecting. It needs an Android phone with 5 GHz Wi-Fi as the relay (Carlink needs Android 10 or later); on the first connection, enter the pairing code shown on the car’s screen into the relay.

### Browser (web receiver) {#xpeng-g6-browser}

The Xpeng G6 has a built-in browser based on Chromium 120 with WebCodecs. It decodes H.264 (Baseline, Main and High) and H.265 in hardware at 720p and 1080p, at 30 and 60 fps. The screen is 1372×686 CSS pixels. Outside full screen the page gets about 876×518; in full screen it gets either the whole screen or 876×579, and about 489×579 in split screen. It supports 5 touch points and AudioWorklet, so CarPlay audio can play in the browser.

- **Video format:** H.264 is the most reliable for now. The car also decodes H.265 in hardware, but with H.265 a page opened or reloaded mid-session can take a long time to show a picture; this is still being fixed.
- **Frame rate:** On a relay with only 2.4 GHz Wi-Fi, such as the UFI003, set the frame rate to 30 in the web receiver’s settings. In the test, 60 fps stuttered over the 2.4 GHz link; 30 fps was clearly smoother, with occasional slight stutter.
- **Full screen and reversing:** With the Android relay the page runs full screen by default. The reverse camera makes the browser leave full screen; back on the page, one tap restores it. This car’s browser doesn’t let the page return to full screen by itself.
- **Car setting:** In the Android relay’s Settings → Car and screen, choose XPeng G6 2023: the relay uses its built-in screen data so CarPlay fits full screen, windows and split screen, switching without reconnecting.

::: details Browser details {#xpeng-g6-browser-details}
What OpenXPlay read from the car’s browser during the test. [Check your head unit](/en/check) reports the same kinds of items, so you can compare.

| Item | Result |
| --- | --- |
| Browser | Chromium 120.0.6099.144 (its user agent claims desktop Linux x86_64) |
| GPU | Qualcomm Adreno 640 through ANGLE, OpenGL ES 3.2; maximum texture size 4096; no WebGPU |
| CPU | 8 cores |
| Memory | 8 GB reported device memory; JavaScript heap limit about 1.1 GB |
| Screen | 1372×686 CSS pixels at device pixel ratio 1.75 (about 2400×1200 physical pixels), landscape, 59.9 Hz |
| Browser window | 876×518 CSS pixels outside full screen; 1372×686 or 876×579 in full screen; about 489×579 in split screen |
| Touch | 5 touch points |
| Web APIs | WebCodecs (VideoDecoder, VideoFrame), OffscreenCanvas, requestVideoFrameCallback, AudioWorklet; secure context |
| Audio | AAC and Opus decoders; 48 kHz; 5 ms base latency |
:::

::: details Video decoding {#xpeng-g6-browser-video}
Every format below is supported at both 30 and 60 fps.

| Format | 1280×720 | 1920×1080 |
| --- | --- | --- |
| H.264 Baseline | Hardware | Hardware |
| H.264 Main | Hardware | Hardware |
| H.264 High | Hardware | Hardware |
| H.265 Main | Hardware | Hardware |

“Hardware” means the browser reported the format as power efficient, which normally means a hardware decoder handles it.

- The browser’s “smooth” flag is unreliable: it reported H.264 High at 720p and 30 fps as not smooth, but 60 fps and 1080p as smooth.
- Measured decode latency: about 33–59 ms per frame for H.264 and about 28 ms for H.265. This is the hardware decoder’s pipeline latency, not a throughput limit.
:::

### Carlink app {#xpeng-g6-carlink}

Tested with the Android relay: it connects, but the car’s screen stays black; still being investigated. The car creates its own 5 GHz Wi-Fi network for Carlink and the relay joins it, so the relay needs 5 GHz Wi-Fi; the UFI003, which has only 2.4 GHz, can’t join.

::: details Carlink video support {#xpeng-g6-carlink-video}
| Item | The car’s Carlink app |
| --- | --- |
| Video format | H.264 Constrained Baseline only; no Constrained High |
| Level | 3.1 |
| Native video mode | 1280×720, progressive, 30 fps |
| H.265 | Not supported |
| Display size | The Carlink app reports 1156×764, which differs from the 1280×720 video mode; the relay streams at exactly 1280×720 |
| Media audio | AAC |

The iPhone sends H.264 High, which the car’s Carlink app can’t show, so the relay converts it to H.264 Constrained Baseline 3.1 at 1280×720; the Android relay does this with its hardware encoder. As the browser results above show, the car’s hardware decodes far more than its Carlink app accepts: the limit is the Carlink app, not the chip.
:::

::: details Connection and pairing {#xpeng-g6-carlink-connection}
| Item | What happens |
| --- | --- |
| Wi-Fi | The car creates its own 5 GHz Wi-Fi network for Carlink and the relay joins it, so the relay needs 5 GHz Wi-Fi. The UFI003, which has only 2.4 GHz, can’t join. |
| Pairing | On the first connection, enter the pairing code shown on the car’s screen into the relay; later connections reconnect automatically. |
| Vehicle information | Not tested yet over Carlink. |
:::
