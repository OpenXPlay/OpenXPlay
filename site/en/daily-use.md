---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: Everyday use and settings
description: After setting up OpenXPlay — how to connect on each drive, the head-unit page’s resolution, CarPlay screen width and full-screen settings, choosing your car, and updating the app.
breadcrumb: Everyday use and settings
---

# Everyday use and settings

Once the first setup is done, every drive starts with the relay and the same address in the head unit’s browser.

## Every drive {#daily}

With an Android phone as the relay:

1. Open OpenXPlay Relay and tap *Start with the last setup*. With automatic start on, the last setup starts by itself after 5 seconds.
2. Check that the head unit and the relay phone are on the same network.
3. Open the bookmarked address in the head unit’s browser and tap the screen once.

With a UFI003, the relay runs as a system service and starts by itself when the dongle is powered; once the head unit is on the relay’s network, open the bookmarked address.

## Head-unit page settings {#web-settings}

With the Android relay, the gear button in a corner of the head-unit page opens the settings. After you change the resolution or the screen width, CarPlay reconnects in a few seconds.

| Setting | What it does |
| --- | --- |
| Resolution | Automatic, Native, 1080p, 720p, Whole screen. Native uses the head unit’s own screen pixels: the sharpest picture, but it needs more Wi-Fi bandwidth, and the relay lowers it when the browser can’t decode it. |
| CarPlay screen width | 125, 200, 250 or 300 mm. It is the size reported to the iPhone: larger values show more icons on one page; the default is 200 mm. |
| Full screen | Makes the page fill the head unit’s screen. |
| Tap to return to full screen | A reverse camera or another screen can make the browser leave full screen. Back on the page, it shows *Tap to return to full screen*; tap once and it does. With this off, the page stays a window and CarPlay fits it. |

::: details Why does returning to full screen need a tap?
Browsers allow full screen only after a tap, so the page can’t return to full screen by itself. This tap doesn’t reach CarPlay.
:::

## Choose your car (optional) {#car-model}

In the app’s Settings → Car and screen, choose the car’s brand and model; the XPeng G6 2023 comes with built-in screen data. If your car isn’t listed, choose *Other* and type the brand and model.

*CarPlay view areas*, in the same place, is on by default: when the head unit’s browser window changes (entering or leaving full screen, split screen), CarPlay re-lays out to fit without reconnecting. The section also shows the head-unit screen data the relay has detected, which helps optimize the display at the next CarPlay start.

::: tip Help more cars work out of the box
If your car isn’t listed, tap *Copy my head-unit screen data* and send it to the developers in the [community](/en/community), so a later release can include your car.
:::

## Updates {#updates}

New releases are published on [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases), and what changed in each is in the [changelog](/en/changelog). After an Android app update, the head-unit page reloads itself once to the new version.
