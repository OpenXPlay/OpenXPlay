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

For the web receiver, what matters is the head unit’s built-in browser: it needs WebCodecs video decoding. If your head unit isn’t listed, open [Check your head unit](/en/check) in its browser to test it, and share the result in the [community](/en/#community).

## Xpeng G6 {#xpeng-g6}

Tested in October 2026.

| Route | Works? | Notes |
| --- | --- | --- |
| Browser | Yes | Tested with the Linux relay on a UFI003 USB dongle. Built-in Chromium 120 browser that decodes H.264 and H.265 in hardware. The browser doesn’t run full screen, so CarPlay fills only part of the screen. |
| Carlink | Yes | Tested with the Android relay. The Carlink app accepts only 720p H.264 at 30 fps, so the relay converts the video. The relay needs 5 GHz Wi-Fi. |

### Browser (web receiver) {#xpeng-g6-browser}

The Xpeng G6 has a built-in browser based on Chromium 120 with WebCodecs. It decodes H.264 (Baseline, Main and High) and H.265 in hardware at 720p and 1080p, at 30 and 60 fps. The browser doesn’t run full screen: of the 1372×686 CSS-pixel screen, the page gets about 876×518. It supports 5 touch points and AudioWorklet, so CarPlay audio can play in the browser.

#### Browser details {#xpeng-g6-browser-details}

What OpenXPlay read from the car’s browser during the test. [Check your head unit](/en/check) reports the same kinds of items, so you can compare.

| Item | Result |
| --- | --- |
| Browser | Chromium 120.0.6099.144 (its user agent claims desktop Linux x86_64) |
| GPU | Qualcomm Adreno 640 through ANGLE, OpenGL ES 3.2; maximum texture size 4096; no WebGPU |
| CPU | 8 cores |
| Memory | 8 GB reported device memory; JavaScript heap limit about 1.1 GB |
| Screen | 1372×686 CSS pixels at device pixel ratio 1.75 (about 2400×1200 physical pixels), landscape, 59.9 Hz |
| Browser window | 876×518 CSS pixels (not full screen) |
| Touch | 5 touch points |
| Web APIs | WebCodecs (VideoDecoder, VideoFrame), OffscreenCanvas, requestVideoFrameCallback, AudioWorklet; secure context |
| Audio | AAC and Opus decoders; 48 kHz; 5 ms base latency |

#### Video decoding {#xpeng-g6-browser-video}

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

#### Tips {#xpeng-g6-browser-tips}

- **Video format:** H.264 is the most reliable for now. The car also decodes H.265 in hardware, but with H.265 a page opened or reloaded mid-session can take a long time to show a picture; this is still being fixed.
- **Frame rate:** On a relay with only 2.4 GHz Wi-Fi, such as the UFI003, set the frame rate to 30 in the web receiver’s settings. In the test, 60 fps stuttered over the 2.4 GHz link; 30 fps was clearly smoother, with occasional slight stutter.

### Carlink app {#xpeng-g6-carlink}

Tested with the Android relay, and it works.

#### Carlink video support {#xpeng-g6-carlink-video}

| Item | The car’s Carlink app |
| --- | --- |
| Video format | H.264 Constrained Baseline only; no Constrained High |
| Level | 3.1 |
| Native video mode | 1280×720, progressive, 30 fps |
| H.265 | Not supported |
| Display size | The Carlink app reports 1156×764, which differs from the 1280×720 video mode; the relay streams at exactly 1280×720 |
| Media audio | AAC |

The iPhone sends H.264 High, which the car’s Carlink app can’t show, so the relay converts it to H.264 Constrained Baseline 3.1 at 1280×720; the Android relay does this with its hardware encoder. As the browser results above show, the car’s hardware decodes far more than its Carlink app accepts: the limit is the Carlink app, not the chip.

#### Connection {#xpeng-g6-carlink-connection}

| Item | What happens |
| --- | --- |
| Wi-Fi | The car creates its own 5 GHz Wi-Fi network for Carlink and the relay joins it, so the relay needs 5 GHz Wi-Fi. The UFI003, which has only 2.4 GHz, can’t join. |
| Pairing | On the first connection, enter the pairing code shown on the car’s screen into the relay; later connections reconnect automatically. |
| Vehicle information | Not tested yet over Carlink. |

### Recommended setup {#xpeng-g6-setup}

- **Browser route:** On a relay with only 2.4 GHz Wi-Fi, such as the UFI003, set the frame rate to 30 in the web receiver’s settings. H.264 is the most reliable video format for now.
- **Carlink route:** Use an Android phone with 5 GHz Wi-Fi as the relay (Carlink needs Android 10 or later). On the first connection, enter the pairing code shown on the car’s screen into the relay.
- **Which to choose:** The browser route shows the iPhone’s video as it is, without conversion, but the browser doesn’t run full screen. On the Carlink route the relay converts the video to 720p at 30 fps.
