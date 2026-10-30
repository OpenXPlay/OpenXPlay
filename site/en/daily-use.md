---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: Everyday use and settings
description: After setting up OpenXPlay — how to connect on each drive, the head-unit page’s picture, frame rate, codec and full-screen settings, choosing your car, configuration files, logs, experimental options and updates.
breadcrumb: Everyday use and settings
---

# Everyday use and settings

Once the first setup is done, every drive starts with the relay and the same address in the head unit’s browser.

## Every drive {#daily}

With an Android phone as the relay:

1. Open OpenXPlay Relay. With *Connect automatically* on (the default), the *Connect* button counts down five seconds, then CarPlay starts; *Not now* pauses it. With *Start on boot* on (Settings → Startup), the relay starts when the phone starts.
2. Check that the head unit and the relay phone are on the same network.
3. Open the bookmarked address in the head unit’s browser and tap the screen once.

With a UFI003 or another Linux device, the relay runs as a system service and starts by itself when the device is powered; once the head unit is on the relay’s network, open the bookmarked address.

## Head-unit page settings {#web-settings}

With the Android relay, tap the OpenXPlay icon in CarPlay to open the page’s settings; before CarPlay plays, the status card has a settings button. The settings slide in from the side, with quick tiles for sound, full screen and fill, and menus for the picture, sound and microphone, plugins and about. After you change the resolution, the screen width, the codec or the frame rate, CarPlay reconnects in a few seconds.

| Setting | What it does |
| --- | --- |
| Picture fit | *Fit* shows the whole picture; *Fill* fills the page. |
| Full screen | Makes the page fill the head unit’s screen. |
| Resolution | Automatic, Native, 1080p, 720p, Whole screen. Native uses the head unit’s own screen pixels: the sharpest picture, but it needs more Wi-Fi bandwidth, and the relay lowers it when the browser can’t decode it. |
| CarPlay screen width | 125, 200, 250 or 300 mm. It is the size reported to the iPhone: larger values show more icons on one page; the default is 200 mm. |
| Video codec | *Automatic (recommended)* uses H.265 when the browser decodes it in hardware and falls back to H.264 if it fails. *Force H.265* and *Force H.264* are for testing. |
| Frame rate | Automatic (30 or 60 fps from the head unit’s refresh rate) or 30 to 60 fps. Over 2.4 GHz Wi-Fi, 30 is smoother. |
| Playback | *Smart* balances smoothness and delay for your network, *Quality* gives the smoothest motion with a little more delay, *Speed* the lowest delay but may skip frames. |
| Tap to return to full screen | A reverse camera or another screen can make the browser leave full screen. Back on the page, it shows *Tap to return to full screen*; tap once and it does. With this off, the page stays a window and CarPlay fits it. |

The relay keeps the resolution, screen width, codec and frame rate, so the app shows the same choices under Settings → CarPlay picture.

::: details Why does returning to full screen need a tap?
Browsers allow full screen only after a tap, so the page can’t return to full screen by itself. This tap doesn’t reach CarPlay.
:::

## Choose your car {#car-model}

In the app’s Settings → Car and screen, choose the brand, the model and, if you know it, the year. The list has every XPeng model line sold in China, the Tesla models and ZEEKR; the XPeng G6 2023 comes with built-in screen data. If your car isn’t listed, choose *Other* and type its name. Until you choose a car, the home screen shows *Choose your car*.

*CarPlay view areas*, in the same place, is on by default: when the head unit’s browser window changes (entering or leaving full screen, split screen), CarPlay re-lays out to fit without reconnecting. The section also shows the head-unit screen data the relay has detected, which helps optimize the display at the next CarPlay start.

With a Tesla, set up the [Tesla browser](/en/tesla) as well.

::: tip Help more cars work out of the box
If your car isn’t listed, tap *Copy my head-unit screen data* and send it to the developers in the [community](/en/community), so a later release can include your car.
:::

## More settings {#more-settings}

| In the app’s settings | What it is for |
| --- | --- |
| Configuration files | Export and import a *User configuration* (connection, outputs, picture and the other settings) and a *Privacy configuration* (the Trusted HTTPS name, its certificate and keys; keep it private). Use them to move to another phone or to reinstall. iPhone pairing, Carlink car trust and the CarPlay identity are not carried over. |
| Logs | The app keeps about the last 24 hours of its own logs on the phone, with passwords, keys, phone numbers, names, messages and precise location replaced. Export the past 10 minutes, 30 minutes or 24 hours as a ZIP, then *Save to a file on this phone* or *Upload online and show QR code* for a bug report. An upload goes to logs.openxplay.org only after you agree to the privacy notice; the receipt can be viewed for 48 hours and the logs are deleted within 72 hours. |
| Sound | *CarPlay audio over the car’s Bluetooth (experimental)* is on by default. If CarPlay sound plays from the iPhone instead of the car, turn it off, or keep the iPhone paired with the car and choose Bluetooth as the car’s audio source. |
| Experimental | Options for connection problems, on by default and grouped by the release that added them. Changes apply to the next connection. If CarPlay or Carlink connects worse after an update, turn off *Use experimental options*; your choices are kept. |

## Updates {#updates}

In the app, Settings → About → *Check for updates* shows the newest version with its release notes and downloads the APK in the browser; choose the *Stable* or *Beta* channel there. The app contacts GitHub only when you tap it. All releases are also on [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases), and what changed in each is in the [changelog](/en/changelog). After an Android app update, the head-unit page reloads itself once to the new version.

The Linux relay: on the UFI003, update it with OpenXPlay Flasher; on the Phicomm N1 and other Linux devices, use the `openxplay-relay-update` command, which puts the previous version back if the new one doesn’t come up; see [Update the relay](/en/linux-devices#update).
