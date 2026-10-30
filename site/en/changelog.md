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

## 0.2.2 {#v0-2-2}

2026-10-28 · [Download](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.2)

Android app: a steadier CarPlay picture when the iPhone reconnects, ZEEKR in the car list, a Settings page of its own for the Tesla browser adaptation and a single Home.

**New**

- Android app: three options under Settings → Experimental, on by default, for handing the CarPlay picture over from an old iPhone connection to a new one: *Isolate screen sessions*, *Reset screen state on reconnect* and *Synchronize screen handoff*.
- Android app: ZEEKR in the car list. With a ZEEKR chosen, Settings → Car and screen and the setup guide suggest [Trusted HTTPS](/en/trusted-https) and offer a button to set it up.
- Android app: the [Tesla browser adaptation](/en/tesla) moves to its own page, Settings → Tesla browser, always listed after Car and screen; the TeslaMirror-style address comes first and is marked as recommended. Saved choices stay as they were.
- Android app: exported logs record what DLNA and Miracast did (state, failures and statistics every 10 seconds, without web addresses), for testing wireless display through developer options.

**Changes**

- Android app: when the iPhone opens a new connection while the old one is still closing, the new CarPlay picture stays on screen; late frames from the old connection and its closing no longer stop it.
- Android app: DLNA casting, still reachable only through developer options, receives the iPhone’s H.264 or H.265 directly. The transcoding from H.265 to H.264 is gone (when it failed, the receiver stayed blank), and Xiaomi hyperDLNA receivers keep playing H.265.
- Android app: a single Home. Notifications, starting at boot, pairing and the CarPlay overlay no longer open a second Home; Back passes each page at most once, and only one dialog or sheet shows at a time.
- Android app: the admin page in the browser looks like the app: Home shows the same connection view, Settings uses the app’s menus, and it comes in light and dark.

**Notes**

- The three new options are experimental, and each can be turned off in Settings → Experimental; changes apply to the next connection.
- Full release notes: [GitHub Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.2).

## 0.2.1 {#v0-2-1}

2026-10-27 · [Download](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.1)

Android app: improvements to how a connection starts, and a head-unit page that says what it is waiting for.

**New**

- Android app: five options under Settings → Experimental for starting a connection, on by default. CarPlay counts as playing only once the head-unit browser shows its picture; a queued retry is cancelled when the connection has already recovered; the head-unit page shows connection progress; each stage up to the first picture is recorded in the log; and network checks the phone does not support are not repeated within one attempt.

**Changes**

- Android app: six Experimental options from [0.2.0](#v0-2-0) are now standard behaviour, always on and without switches. *Send this phone’s Bluetooth address* still stays off until you turn it on.
- Android app: upgrading turns the new options on and keeps your other settings; a Bluetooth address you entered but left off stays off.
- Head-unit page (Android relay): while CarPlay starts, the page shows whether it is waiting for the iPhone or for its CarPlay picture.

**Notes**

- The five new options are experimental, and each can be turned off in Settings → Experimental.
- Full release notes: [GitHub Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.1).

## 0.2.0 {#v0-2-0}

2026-10-26 · [Download](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.0)

Android app: a redesigned app that checks the connection step by step, car selection by model and year, frame-rate and Carlink picture-size settings, head-unit page settings from CarPlay’s OpenXPlay icon, log export and update checks.

**New**

- Android app: a redesigned app that shows the connection as one path, iPhone → relay phone → car, and checks each step live. Home has three tiles, one headline and at most one action: *Connect*, the fix for the current step, *Retry* or *Start now*. Tap a tile or pull up the drawer below to see every step, why it matters and what to do, such as turning on Bluetooth, pairing the iPhone or entering the Carlink code. A failure says what went wrong and what to do, with its code and time. The running page looks the same.
- Android app: light and dark appearance, following the system.
- Android app: Settings → Car and screen chooses the car by brand, model and year: every XPeng model sold in China with its model years, and the Tesla models. Built-in screen data is still only for the XPeng G6 2023. The setup guide now starts with *Your car* and needs a brand and a model; the year can stay *Not sure*. Earlier choices carry over, and setups without a car keep working, with *Choose your car* on Home until you pick one.
- Android app: the [Tesla browser adaptation](/en/tesla). The Tesla browser does not open local-network addresses, so with a Tesla chosen, Settings → Car and screen → *Tesla browser* adds an address on the relay phone through a local VPN (169.254.88.1 by default; nothing leaves the phone). There are four ways to reach the page: a trusted name or a direct address on that link-local address, or a TeslaMirror-style or TeslaAndroid-style address; the trusted-name ways need [Trusted HTTPS](/en/trusted-https) and open without a certificate warning. It needs wireless CarPlay, the *Car browser* output and the relay phone’s hotspot or Wi-Fi Direct; switching between the ways keeps CarPlay running.
- Android app: Settings → CarPlay picture → *Frame rate*: *Auto* (30 or 60 fps, from the head unit’s refresh rate) or 30–60 fps in steps of 5. The head-unit page shows and changes the same setting. A change restarts a running session once. It replaces the frame-rate override in developer options; an override that was on carries over.
- Android app: Settings → CarPlay picture → *Carlink picture size*: *Automatic* (the car’s Carlink window, as before), six presets (1280×720, 1920×1080, 1280×800, 1920×720, 1024×600 and 1024×768) and up to five sizes of your own. The starred size is used for every connection; choosing another tries it for this connection only, restarting CarPlay if Carlink is running.
- Head-unit page (Android relay): tapping the OpenXPlay icon in CarPlay opens the page’s settings instead of the relay phone’s home screen. They slide in from the right, with quick tiles for sound, full screen and fill, menus for picture, sound and microphone, plugins and about, and choice pages instead of drop-down lists. The floating gear is gone; before CarPlay plays, the status card has a settings button.
- Android app: Settings → Logs. The app keeps about the last 24 hours of its own logs on the relay phone; passwords, keys, phone numbers, names, messages and precise location are replaced before anything is stored. *Export logs* for the past 10 minutes, 30 minutes or 24 hours as a ZIP, then choose *Save to a file on this phone* (no network use) or *Upload online and show QR code*. An upload goes to logs.openxplay.org only after you agree to the privacy notice and gives a log ID and QR code for your bug report; the receipt can be viewed for 48 hours, and the logs are deleted within 72 hours.
- Android app: Settings → Configuration files exports and imports a *User configuration* (connection, outputs, picture and the other settings, including developer and experimental options) and a *Privacy configuration* (the trusted HTTPS name, its certificate and keys, and saved DNS provider setups; keep this file private), to move to another phone or reinstall. Importing a user configuration also completes the setup guide. iPhone pairing, Carlink car trust and the Apple accessory identity do not carry over.
- Android app: Settings → About → *Check for updates*, with a *Stable* or *Beta* channel, shows the newest version and its release notes in the app’s language and downloads the APK in the browser. The app contacts GitHub only when you tap *Check for updates*.
- Android app: Settings → Experimental, for connection problems: *Check and recover the iPhone Wi-Fi connection* (when Wi-Fi connects but CarPlay does not start), *Isolate the Carlink network*, *Wait for Carlink before connecting the iPhone*, *Remember the Bluetooth subscription method* (skips a 2-second wait on cars such as the XPeng G6), *Keep scanning for the car*, *Record all Bluetooth advertisements* (only with Carlink debug on) and *Send this phone’s Bluetooth address*. *Use experimental options* and every option except the last are on by default; changes apply to the next connection.

**Changes**

- Android app: Carlink on Xiaomi phones with MIUI on Android 10 and 11 no longer fails to join the head unit’s Wi-Fi after 12 seconds on a system confirmation that cannot be answered. Thanks to @hellowalker.
- Android app: while an output is on, the relay runs with a low-priority “OpenXPlay Relay” notification, so Carlink and the head-unit page keep working in the background and with the screen off. Before, HyperOS froze the app seconds after it left the screen, and Carlink could not find the car.
- Android app: starting checks Bluetooth for wireless CarPlay and Carlink, and Wi-Fi for Wi-Fi Direct, Carlink and the car’s hotspot. If something is still off, *Connect* and an automatic start wait and begin once it is on, instead of showing a dialog or failing. A session stopped because Bluetooth, Wi-Fi or the hotspot went off restarts once when it comes back.
- Android app: when the car’s screen is not known yet, CarPlay waits up to 20 seconds for the car to report it, so it no longer restarts once the size arrives; *Start now* skips the wait.
- Android app: Home no longer says “Waiting for iPhone” while the iPhone is connecting. Home and the running page show the same stage: connecting over Bluetooth, starting CarPlay over Bluetooth or USB, waiting for the picture or reconnecting.
- Android app: the launch page is gone, and the app opens on Home. With *Connect automatically* on, the *Connect* button counts down five seconds; *Not now* pauses it.
- Android app: a calmer setup guide, with a progress bar, compact choices that expand only when selected, one network diagram for the chosen network and a preparation page that lists only the steps still open.
- Android app: far less CPU and battery use while idle, and smoother when opening Settings and going back.
- Android app: long labels wrap instead of being cut off, also with larger text.
- Android app: the *Shared Wi-Fi* network mode is now *Use the car’s hotspot* (Settings → iPhone connection → Network): the iPhone and the relay phone both join the car’s hotspot. The diagram shows the car as the hotspot, the waiting step names the car hotspot the relay phone is on, and the band field is now *Hotspot band*. The admin page still says *Shared Wi-Fi*.
- Android app: Developer options → *Combine outputs* replaces *Both outputs at once*: any outputs can run together, and at least one stays on. Existing choices carry over.

**Notes**

- This release contains only the Android app; the Linux relay is released separately.
- Wireless display (DLNA, Miracast) shows as *Coming soon* in the setup guide and in Settings → Output, and cannot be chosen yet.
- The Experimental options start on, also after upgrading. If Carlink or wireless CarPlay connects worse than before, turn off Settings → Experimental → *Use experimental options*; your choices are kept.
- A configuration file exported by 0.2.0 with a car chosen does not import into older versions; older files import into 0.2.0.
- If CarPlay sound plays from the iPhone instead of the car, turn off Settings → Sound → *CarPlay audio over the car’s Bluetooth*, or keep the iPhone paired with the car and choose Bluetooth as the car’s audio source.
- Full release notes: [GitHub Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.0).
- Known issues: the XPeng G6 does not tell the phone its new size when you switch its Carlink area during a session, and whether reconnecting makes it report the full-screen size is not verified yet; wired CarPlay with a USB-C iPhone on a USB-C to USB-C cable usually does not work (use an OTG adapter or wireless); some phones turn Wi-Fi off when their hotspot is on, and Carlink needs both; navigation prompts and ringtones over Carlink may be silent (not yet verified); on Carlink head units that need H.264, transcoding on the phone can stop after a timestamp jump, and the original stream is sent instead; on the head-unit page, a tap meant to return to full screen may neither restore it nor reach CarPlay; on Android 13 and later, connections to a Tesla address outside 169.254 may be dropped (the app warns).
- Not yet tested in a car: the Tesla browser adaptation, Carlink picture sizes other than *Automatic*, the head-unit page settings from the OpenXPlay icon, and the Experimental options with wireless CarPlay and Carlink together.

## 0.1.5 {#v0-1-5}

2026-10-22 · [Download](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.1.5)

Android app: H.265, Carlink in the car’s window shape with correct touch, trusted HTTPS with a free domain name, reorganised settings and clearer connection hints.

**New**

- Android app: H.265 video. Settings → CarPlay picture → *Video codec*: Automatic, Force H.265 or Force H.264, shared with the head-unit page.
- Android app: when the head unit reports H.265 support, Carlink gets the iPhone’s H.265 picture unchanged: no transcoding on the phone, smoother motion and lower latency.
- Android app: the Carlink picture takes the shape of the car’s Carlink window instead of a squeezed 1280×720 (1532×1013 on the Xpeng G6, for example), and CarPlay view areas work with Carlink too.
- Android app: Settings → Output → *Reconnect when the window size changes* (off by default). After the car switches its Carlink area, the first touch reconnects so the picture can follow the new size.
- Android app: [Trusted HTTPS](/en/trusted-https). Settings → Head-unit access → Trusted HTTPS uses a free name from DuckDNS or dynv6, so the head-unit browser opens the page without a certificate warning.
- Android app: Settings → Sound → *CarPlay audio over the car’s Bluetooth (experimental)*, on by default.
- Android app: video statistics on the home screen, under Settings → CarPlay picture → *Video statistics*.
- Android app: a manual start checks the relay phone’s Wi-Fi and hotspot, says what is off and opens the right settings; when Carlink fails because Wi-Fi is off, the home screen says so at once.
- Android app: when a wired session finds the relay phone attached as a USB device, the home screen explains why and suggests an OTG adapter.
- Android app: the home screen lists every connection problem, with details you can expand.
- Android app: settings are grouped into menus, and developer options get a master switch and a switch per option.

**Changes**

- Android app: Carlink touches land where you tap when the picture is not 1280×720.
- Android app: fixes a black Carlink picture with sound on some head units, such as the Xpeng G6; the picture comes back after the reverse camera; a changed head-unit pairing key asks for the pairing code again instead of needing a reinstall. Thanks to @PicoHug.
- Android app: *USB cable* is marked “Not recommended” and switching to it asks first; with Carlink, the setup guide recommends *This phone’s hotspot*.
- Android app: a change of the phone’s network no longer restarts the web receiver or drops the head-unit page.
- Head-unit page (Android relay): the relay-wide *Video codec* setting replaces the per-browser “H.264 only” option.
- Android app: a new animated splash screen and one page transition for every page.

**Notes**

- This release contains only the Android app; the Linux relay is released separately. The 0.1.4 release candidates were withdrawn, and everything in them is in this release.
- Full release notes: [GitHub Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.1.5).
- Known issues: the Xpeng G6 does not tell the phone its new size when you switch its Carlink area during a session; wired CarPlay with a USB-C iPhone on a USB-C to USB-C cable usually does not work.

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
