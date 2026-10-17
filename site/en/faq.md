---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: FAQ and troubleshooting
description: Answers about OpenXPlay and fixes for common problems — the certificate warning, head units that only see 2.4 GHz Wi-Fi, Bluetooth pairing, iPhone connection, delay, power cuts and privacy.
breadcrumb: FAQ
schema: faq
---

# FAQ and troubleshooting

Most problems come down to the head unit’s browser, the Wi-Fi band or Bluetooth pairing. Find your question below. If it isn’t answered, ask the [community](/en/#community) and include the head unit model, its system version, the route you used and what happened.

## About OpenXPlay {#about}

### What is OpenXPlay? {#what-is-openxplay}

OpenXPlay shows iPhone CarPlay on Android head units that can’t install apps. A relay — an Android phone running the OpenXPlay Relay app, or a small Linux device such as the UFI003 USB dongle — connects to the iPhone and passes CarPlay to software the head unit already has, such as its browser or a Carlink app.

### Do I need to install anything on the head unit? {#install-on-head-unit}

No. The relay does the receiving and connecting, and the head unit uses what it already has: its browser or its Carlink app. The head unit’s system is never modified.

### Which head units work? {#which-head-units}

The head units OpenXPlay has tested are listed under [Head units](/en/head-units), starting with the Xpeng G6. For the web receiver, what matters is the head unit’s browser: it needs WebCodecs H.264 decoding. If your head unit hasn’t been tested yet, open [Check your head unit](/en/check) in its browser to test it, and share the result with the community.

### How is OpenXPlay different from DiPlay? {#diplay}

DiPlay is for head units that can install apps: you install it on a compatible Android head unit, which receives and shows CarPlay itself. OpenXPlay is mainly for head units that can’t install apps: a phone or external device does the work, and CarPlay appears through the head unit’s existing browser, Carlink app or similar entry points.

### Is OpenXPlay free? {#free}

Yes. The software is open source under AGPL-3.0 and free to use. A working setup also needs an Apple accessory (MFi) identity that you supply; the repositories and their builds contain none. Organisations that can’t use AGPL-3.0 can ask for an exemption at [support@openxplay.org](mailto:support@openxplay.org).

## Setup and connection {#setup}

### Why does the browser show a certificate warning? {#certificate-warning}

The relay serves the receiver page over HTTPS, because browsers allow WebCodecs video decoding only on secure pages, and it signs the certificate itself. The browser can’t verify a self-made certificate, so it warns the first time. The connection is still encrypted: check that the address is your relay’s and continue. The warning can come back when the relay makes a new certificate. On the Android relay you can import your own certificate instead. See [About the certificate warning](/en/quick-start#certificate-warning).

### My head unit only sees 2.4 GHz Wi-Fi networks {#only-2-4-ghz}

Use a 2.4 GHz network for the head unit:

- The UFI003 dongle’s Wi-Fi has no 5 GHz band, so its hotspot is always 2.4 GHz.
- On the Android relay, set the car-hotspot band to 2.4 GHz in the app’s settings.
- With shared Wi-Fi, the network must offer 2.4 GHz. The UFI003 only sees 2.4 GHz networks anyway.

For Carlink, the UFI003 can’t join a head unit whose Carlink Wi-Fi runs on 5 GHz.

### The iPhone doesn’t pair over Bluetooth {#bluetooth-pairing}

Pair only while the relay is ready for it:

- On the Linux relay, choose Pair iPhone in the admin page. Pairing stays open for 10 minutes. On the iPhone, open Settings → Bluetooth and choose the relay.
- On the Android relay, allow the “Nearby devices” permission for OpenXPlay Relay, and tap Allow on the relay phone when it asks to become visible to your iPhone.
- If the iPhone forgot the relay, or this is a new iPhone, open pairing again on the relay.
- If several phones are paired with the relay, choose your iPhone under Preferred iPhone in the settings.
- On the UFI003, a Bluetooth guard restarts the Bluetooth controller when it fails. If the admin page says Bluetooth didn’t start, unplug the dongle and plug it back in.

### The iPhone doesn’t connect to CarPlay {#iphone-not-connecting}

Check these in order:

- Keep the iPhone near the relay with Bluetooth and Wi-Fi turned on.
- Make sure the relay has a valid CarPlay identity. The Android app doesn’t start CarPlay without one.
- With shared Wi-Fi, the iPhone, the relay and the head unit must be on the same network, and the router must let devices reach each other.
- Look at the relay’s status in the app or admin page: waiting for iPhone, connecting or connected.
- After you change the network mode, the iPhone moves to the new network by itself and CarPlay reconnects in about 30 seconds.
- If it still fails, restart the relay services from the admin page.

### The head unit’s browser says “Video not supported” {#video-not-supported}

The browser lacks WebCodecs video decoding, or the page wasn’t opened over HTTPS. Open the relay’s `https://` address, try another browser on the head unit if it has one, and run [Check your head unit](/en/check). If no browser works, try the [Carlink route](/en/quick-start#carlink).

### The page says “Relay unreachable” {#relay-unreachable}

The head unit isn’t on the relay’s network, or the relay is off. Keep the relay on, join the relay’s hotspot (or the shared Wi-Fi) on the head unit, and open the address the relay shows.

### There is no sound {#no-sound}

Browsers block sound until you touch the page. If the receiver says sound is paused, tap the screen once. If there is still no sound, run [Check your head unit](/en/check): the browser needs AudioWorklet to play CarPlay audio.

### Siri or calls can’t hear me {#microphone}

The browser asks for the microphone the first time CarPlay needs your voice; choose Allow. The microphone works only over HTTPS. On the Android relay, also allow the microphone permission; the app’s microphone source setting chooses between the head unit and the relay phone.

## Performance {#performance}

### How much delay should I expect? {#delay}

The repositories don’t publish delay figures yet. The relay sends the iPhone’s video (H.264 or H.265) over a secure WebSocket, and the head unit’s browser decodes it with WebCodecs, so the delay depends mostly on the Wi-Fi link and the head unit’s decoder. In the web receiver’s settings, *Speed* gives the lowest delay but may skip frames, *Quality* gives the smoothest motion with a little more delay, and *Smart* balances the two for your network.

### Video stutters {#stutter}

- Run [Check your head unit](/en/check). If the browser decodes only in software, video may stutter.
- In the web receiver’s settings, try a lower frame rate or the *Speed* playback mode.
- On the Android relay with Carlink, wired USB CarPlay is more reliable than wireless.

## In the car {#in-the-car}

### What happens when the car cuts the power? {#power-cuts}

The relay starts again when power comes back:

- The Linux relay runs as a system service that starts at boot and restarts if it fails. It doesn’t wait for Internet access or time synchronisation, and its certificates stay valid even if the device clock is wrong. If the clock was wrong when certificates were made, the relay replaces them once the clock is synchronised, and the browser may ask you to accept the new certificate.
- The Android app can start automatically when the phone boots. Some phones block this; if OpenXPlay Relay doesn’t open, open it yourself.

## Privacy {#privacy}

### Does OpenXPlay send my data anywhere? {#data}

OpenXPlay works over local connections. The relay serves the receiver page and its admin page itself; video, audio and touch travel between the iPhone, the relay and the head unit over Bluetooth, Wi-Fi or USB, and the Linux relay starts without waiting for Internet access. Plugins are off by default and run offline in the head-unit browser. Vehicle information from Carlink is collected only when you turn it on and stays on the relay phone. This website has no analytics, and its check page runs only in your browser.

### Is the relay’s admin page protected? {#admin-password}

Yes. The admin page uses HTTPS and asks for an admin password. The login page shows the first-time password; change it right away. The admin page warns you while the default password is still in use.
