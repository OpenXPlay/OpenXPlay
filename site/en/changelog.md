---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-19
title: 'Changelog: what changed in each OpenXPlay Relay release'
description: What each OpenXPlay Relay release (the Android app and the Linux relay) added, changed and fixed, with download links.
breadcrumb: Changelog
---

# Changelog

What changed in each OpenXPlay Relay release, newest first. Packages and checksums are on GitHub [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases); installation and setup start at [Get started](/en/quick-start).

## 0.1.3 {#v0-1-3}

2026-10-19 · [Download](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/v0.1.3)

CarPlay fits the head-unit browser window without reconnecting, with car models, a Native resolution and a CarPlay screen width setting.

**New**

- Android app: CarPlay view areas, on by default. When the head-unit browser enters or leaves full screen, goes split screen or comes back as a window after the reverse camera, CarPlay re-lays out to fit without reconnecting, and the page shows only that area, without black bars.
- Android app: Settings → Car and screen. Choose the car’s brand and model (XPeng G6 2023 built in, or Other). The screen sizes the relay detects are shown there and used at the next start; owners of unlisted cars can copy their screen data and send it to the developers.
- Android app: the last head unit’s screen is remembered, so CarPlay fits correctly even when it starts before the head-unit page opens.
- Head-unit page (Android relay): Resolution (Automatic, Native, 1080p, 720p, Whole screen) and CarPlay screen width (125, 200, 250 or 300 mm, default 200) settings, also in the app’s settings. Native uses the head unit’s own pixels when its browser can decode them; a larger screen width shows more icons on one page.
- Head-unit page (Android relay): after the browser leaves full screen, for example for the reverse camera, one tap returns to full screen without reaching CarPlay; a setting turns this off.
- Head-unit page (Android relay): shows the page version with its commit and the app version, and reloads itself once after the app is updated.
- Android app: the accessory identity import takes both files at once, in any order, or a ZIP that contains them.
- Android app: a Carlink debug trace in the developer screen (live log, saved files, video capture).

**Changes**

- Android app: no pairing code any more; opening the address connects. Give the relay’s hotspot a password.
- Android app: the home screen shows the full `https://` address, notes that it is https and not http, and lists only addresses the head unit can reach.
- Android app: the hotspot choice recommends the 5 GHz band, and the setup guide scrolls to the fields still to fill in.
- Android app: the Carlink output is marked as experimental and possibly failing.
- Android app: English and Simplified Chinese only; the partial translations into other languages were removed.

**Notes**

- Refresh the head-unit page once after updating to 0.1.3; later updates reload it automatically.
- Carlink output: on some head units, such as the XPeng G6, the screen stays black; this is being investigated.
- The Linux relay has no functional changes in this release.

## 0.1.2 {#v0-1-2}

2026-10-18 · [Download](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/v0.1.2)

A stability release for the Android app, with a video codec setting on the head-unit page.

**New**

- Head-unit page: a Video codec setting (Automatic or H.264 only), remembered by that head unit’s browser. The settings also show the codec in use.
- Head-unit page: reports the higher H.264 levels the browser can decode, so a capable browser receives the iPhone’s video directly instead of a slower re-encoded copy.

**Fixes**

- Android app: fixed a deadlock that could freeze the picture, stop touch input and make the app stop responding.
- Android app: accepts the iPhone’s H.265 configuration. For now the Android app asks the iPhone for H.264, which has been verified end to end.
- Linux relay: admin sign-in, the Bluetooth pairing window and the Carlink pairing code keep working when the device clock is wrong or jumps (the UFI003 has no clock battery).

**Notes**

- On the Linux relay, sign in to the admin page again after each restart of the device.

## 0.1.1 {#v0-1-1}

2026-10-18 · [Download](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/v0.1.1)

The first release with ready-made packages.

**New**

- Android app: a setup guide walks you through how the car shows CarPlay (car browser or Carlink app), how the iPhone connects (wireless or USB cable) and, for wireless, which network to use. It then checks permissions, the accessory identity and iPhone pairing, and starts CarPlay.
- Android app: each time you open the app with a saved setup, you can start with the last setup or set it up again. With automatic start on, the last setup starts by itself after 5 seconds.
- Android app: Home shows the current mode (car display, iPhone connection, network), each line opening the guide at that step, and this phone’s network (Wi-Fi and IP addresses).
- Signed Android app and an aarch64 Linux relay package (for devices such as the UFI003), built by GitHub Actions, with SHA-256 checksums.

**Fixes**

- Choosing the car browser after Carlink no longer asks for a hotspot name; a hotspot that was never named goes back to Wi-Fi Direct.
- Home shows “Connected” instead of “Unavailable” when Android hides the Wi-Fi name.

---

The Android package name is `org.openxplay.relay`. You supply your own Apple accessory (MFi) identity; no build contains one.
