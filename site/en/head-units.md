---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: 'Head units: compatibility list and recommended settings'
description: Which cars OpenXPlay has been tested in — the route (browser or Carlink), the relay and its version, the test date and the result for each car, with recommended settings. Tests in a car, tests outside a car and features not yet tested are listed separately. Currently the XPeng G6 and the XPeng P7+.
breadcrumb: Head units
pageClass: oxp-reference
---

# Head units

This page lists the cars OpenXPlay has been tested in, which route and which relay version were used, and what the tests showed. The same car may behave differently with another head-unit system, another relay or another version.

## Tested in a car with an iPhone {#in-car}

| Car | Head-unit software | Route | Relay | Date | Result |
| --- | --- | --- | --- | --- | --- |
| [XPeng G6](#xpeng-g6) 2023 | Chromium 120.0.6099.144 | Browser | UFI003, Linux relay development build; Android phone, 0.1.3 development build | 2026-10-15—18 | Picture shown; with the Android relay, it fits full screen and windows |
| [XPeng G6](#xpeng-g6) 2023 | Carlink v2.0.4-202512161819-c0d784a | Carlink | Android phone, 0.1.4-rc.1 test builds and later development builds | 2026-10-20—22 | Picture shown in H.264 and H.265; the touch and reverse-camera fixes await a retest |
| [XPeng P7+](#xpeng-p7-plus) | Not recorded | Carlink | Android phone, 0.2.3 | 2026-10-31 | No picture; the cause is still being investigated (owner’s log) |

The table shows the relay and version used at the time. The current releases (Android app 0.2.5, Linux relay 0.1.6) haven’t yet been fully tested in a car.

## Tests outside a car {#bench}

| Receiver | Route | Relay and picture source | Date | Result |
| --- | --- | --- | --- | --- |
| Samsung Internet 21.1 on a Samsung Galaxy S20+ phone (Android 13), standing in for the head unit | Browser | Development builds of the Android relay and of the Linux relay on a UFI003, with a real iPhone; also replayed video | 2026-10-14—20 | H.264 and H.265 picture and touch work; tap to return to full screen failed, and entering or leaving full screen made CarPlay reconnect (see the [known issue](/en/daily-use#fullscreen-known-issue)); sound and microphone not tested |
| Carlink demo app 2.0.6 on the same S20+, standing in for the head unit | Carlink | Development tools on a Raspberry Pi 5, replaying recorded video | 2026-10-14 | Picture and touch positions correct; no real CarPlay, sound not tested |
| Xiaomi REDMI G Pro 27U monitor (Xiaomi hyperDLNA) | Wireless display (DLNA) | Development tool on a Mac, replaying a recording of the iPhone’s picture | 2026-10-22, 10-27 | H.264 and H.265 keep playing; the picture and the delay haven’t been checked by eye yet; no touch |
| CarLife 4.0.0.43 on a Samsung phone, standing in for the head unit | CarLife (Wi-Fi) | Android phone Redmi 14C, 0.2.5 development build, with a real iPhone; also replayed H.265 video | 2026-11-02 | 1920×864 picture; touch correct for opening Settings, Back, Home and swiping between pages, and the picture returns after CarLife restarts; H.265 keeps playing after the relay phone’s hardware converts it to H.264; sound and USB not tested |

## Built, not yet tested in a car {#not-tested}

- **Tesla browser**: from Android app 0.2.0 and Linux relay 0.1.6; see [Tesla](/en/tesla).
- **Carlink on the Linux relay**: from Linux relay 0.1.6, with a second Wi-Fi adapter joining the car; see [Carlink app](/en/carlink).
- **Car list**: the XPeng model lines, Tesla and ZEEKR in the app’s Settings → Car and screen are there to choose screen data; being in the list doesn’t mean a car has been tested.

Your car isn’t listed? Open [Check your head unit](/en/check) in its browser and post the report in the [community](/en/community), with the car model, the head-unit system version and the relay version. The check shows only that the browser has the features needed; it doesn’t count as a test in the car.

## XPeng G6 {#xpeng-g6}

2023 model; the car’s system version wasn’t recorded.

### Test results {#xpeng-g6-results}

| Item | Browser | Carlink |
| --- | --- | --- |
| Picture | Pass: UFI003 (10-15—16), Android relay (10-18) | Pass: H.264 and H.265 (10-20—22) |
| Touch | Not recorded | Retest pending: touches landed off target with the picture in the Carlink window’s shape (10-21); the fix shipped in Android app 0.1.5 |
| Sound | Not tested | Not tested |
| Microphone and calls | Not tested | Not tested |
| After the reverse camera | The browser leaves full screen and the page can’t return by itself (10-18) | Retest pending: the H.265 picture stayed black (10-20); the fix shipped in Android app 0.1.5 |
| Full screen | Pass: with the Android relay, the picture fits full screen and windows and switches without reconnecting (10-18) | Fail: switching to full screen during a session doesn’t fill the screen (10-22) |
| Vehicle information | | Fail: the car sent no data (10-20) |
| Connecting again | | Fail: an owner reported that every later connection still needs the car’s pairing-code page open (10-23); related improvements await a retest |

### Recommended setup {#xpeng-g6-setup}

- **Which to choose:** Both routes have shown a picture in the car. The browser route has been tested more and runs full screen with the Android relay; the Carlink route uses the car’s own Carlink app.
- **Browser route:** Use the Android relay and choose XPeng G6 2023 in Settings → Car and screen. On a relay with only 2.4 GHz Wi-Fi, such as the UFI003, set the frame rate to 30 in the web receiver’s settings. If the picture takes long to appear with H.265, set *Video codec* to *Force H.264*.
- **Carlink route:** Use Android app 0.1.5 or later ([download the latest version](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk)) on a relay phone with 5 GHz Wi-Fi (Carlink needs Android 10 or later); on the first connection, enter the pairing code shown on the car’s screen into the relay. Leave *Video codec* on *Automatic* and the relay sends the H.265 picture as it is.

### Browser (web receiver) {#xpeng-g6-browser}

The XPeng G6 has a built-in browser based on Chromium 120 with WebCodecs. What follows is what the browser itself reports, the same kind of items as [Check your head unit](/en/check): H.264 (Baseline, Main and High) and H.265 at 720p and 1080p, at 30 and 60 fps, all reported as hardware decoding. The screen is 1372×686 CSS pixels. Outside full screen the page gets about 876×518; in full screen it gets either the whole screen or 876×579, and about 489×579 in split screen. The browser reports 5 touch points and AudioWorklet (needed to play CarPlay sound in the browser); sound hasn’t been tested in the car yet.

- **Video format:** In the test with the Linux relay on a UFI003 on 2026-10-16, H.264 was the most reliable: with H.265, a page opened or reloaded mid-session once waited more than 40 seconds for a picture. The Linux relay has since learned to switch to H.264 when the picture waits too long; that hasn’t been retested in the car. There is no test record yet of the Android relay sending H.265 to this car’s browser.
- **Frame rate:** On a relay with only 2.4 GHz Wi-Fi, such as the UFI003, set the frame rate to 30 in the web receiver’s settings. In the tests of 2026-10-15—16, 60 fps stuttered over the 2.4 GHz link; 30 fps was clearly smoother, with occasional slight stutter.
- **Full screen and reversing:** With the Android relay the page runs full screen by default. The reverse camera makes the browser leave full screen, and this car’s browser doesn’t let the page return by itself (2026-10-18); back on the page, a tap restores full screen. For the current releases, see the [known issue](/en/daily-use#fullscreen-known-issue).
- **Car setting:** In the Android relay’s Settings → Car and screen, choose XPeng G6 2023: the relay uses its built-in screen data so CarPlay fits full screen, windows and split screen, switching without reconnecting.

::: details Browser details {#xpeng-g6-browser-details}
What OpenXPlay read from the car’s browser on 2026-10-16. [Check your head unit](/en/check) reports the same kinds of items, so you can compare.

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

Tested in the car with development builds of the Android relay; the picture shows, and the [test results](#xpeng-g6-results) list each item. Android app 0.1.3 and earlier play sound on this car but keep the picture black; 0.1.5 fixes this. The car creates its own 5 GHz Wi-Fi network for Carlink and the relay joins it, so the relay needs 5 GHz Wi-Fi. The UFI003 can’t use Carlink; the Linux relay runs Carlink on a second Wi-Fi adapter, which hasn’t been tested in this car yet.

::: details Carlink video support {#xpeng-g6-carlink-video}
| Item | The car’s Carlink app |
| --- | --- |
| H.264 | Constrained Baseline only, no Constrained High; level 3.1 |
| Native video mode | 1280×720, progressive, 30 fps |
| H.265 | Reported as supported (`iccoa_support_hevc`); shows the iPhone’s H.265 picture directly, measured at up to about 58 fps |
| Display size | The Carlink window (two thirds of the screen) is 1532×1013 at 240 dpi, unlike the 1280×720 video mode. From Android app 0.1.5, CarPlay takes this window’s shape and H.265 is sent at about 1532×1014; the car maps touches by the size of the picture it receives. When you switch to full screen during a session, the car doesn’t tell the relay the new size |
| Media audio | AAC |

The codec requested from the iPhone and the codec of the Carlink session aren’t always the same. This car reports H.265 support, so with the developer option *Carlink H.265* on *Automatic (default)*, the Carlink session uses H.265 from start to finish. With *Video codec* on *Automatic*, the relay passes the iPhone’s H.265 picture to the car unchanged when its format and size fit, with no transcoding on the phone; if the iPhone sends H.264 instead (for example with *Force H.264*), the relay converts it to H.265.

The session uses H.264 only with *Carlink H.265* set to *Off*. The iPhone then sends H.264 High, which the car’s Carlink app can’t show, so the relay converts it to H.264 Constrained Baseline 3.1, scaled in the Carlink window’s shape to fit that level; the Android relay does this with its hardware encoder.
:::

::: details Connection and pairing {#xpeng-g6-carlink-connection}
| Item | What happens |
| --- | --- |
| Wi-Fi | The car creates its own 5 GHz Wi-Fi network for Carlink and the relay joins it, so the relay needs 5 GHz Wi-Fi, switched on. With wireless CarPlay on *This phone’s hotspot*, the Android relay ran a 5 GHz hotspot and joined the car over Wi-Fi at the same time, steadily for about an hour in testing. |
| Pairing | On the first connection, enter the pairing code shown on the car’s screen into the relay. The relay remembers the pairing, so the code normally isn’t needed again; connecting by itself after the car starts still has to be retested on this car, and may need the car’s Carlink pairing-code page open. |
| Vehicle information | Tested with this Carlink version (2026-10-20): the car accepted the vehicle information connection, but sent no data after changing gear, switching the lights and changing the day/night theme. |
:::

## XPeng P7+ {#xpeng-p7-plus}

On 2026-10-31 an owner connected Carlink with Android app 0.2.3 on an Android 15 phone, and no CarPlay picture appeared: the car and the relay set up the Carlink connection, but the iPhone never started sending its picture to the relay. The same phone showed the same problem with *This phone’s hotspot*, so the cause isn’t necessarily the car; it is still being investigated. The model year, the head-unit system and the Carlink version weren’t recorded.
