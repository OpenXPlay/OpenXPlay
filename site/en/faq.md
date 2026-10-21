---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: FAQ
description: Common questions about OpenXPlay — what it is, whether anything is installed on the head unit, which head units work, how it differs from DiPlay, whether it is free, delay, power cuts and privacy.
breadcrumb: FAQ
schema: faq
---

# FAQ

::: tip Something not working?
For certificate warnings, Wi-Fi, Bluetooth pairing, picture or sound problems, see [Troubleshooting](/en/troubleshooting).
:::

## About OpenXPlay {#about}

### What is OpenXPlay? {#what-is-openxplay}

OpenXPlay shows iPhone CarPlay on Android head units that can’t install apps. A relay — an Android phone running the OpenXPlay Relay app, or a small Linux device such as the UFI003 USB dongle — connects to the iPhone and passes CarPlay to software the head unit already has, such as its browser or a Carlink app. See [How it works](/en/how-it-works).

### Do I need to install anything on the head unit? {#install-on-head-unit}

No. The relay does the receiving and connecting, and the head unit uses what it already has: its browser or its Carlink app. The head unit’s system is never modified.

### Which head units work? {#which-head-units}

The head units OpenXPlay has tested are listed under [Head units](/en/head-units), starting with the Xpeng G6. For the web receiver, what matters is the head unit’s browser: it needs WebCodecs H.264 decoding. If your head unit hasn’t been tested yet, open [Check your head unit](/en/check) in its browser to test it, and share the result with the [community](/en/community).

### How is OpenXPlay different from DiPlay? {#diplay}

DiPlay is for head units that can install apps: you install it on a compatible Android head unit, which receives and shows CarPlay itself. OpenXPlay is mainly for head units that can’t install apps: a phone or external device does the work, and CarPlay appears through the head unit’s existing browser, Carlink app or similar entry points.

### Is OpenXPlay free? {#free}

Yes. The software is open source under AGPL-3.0 and free to use. A working setup also needs an Apple accessory (MFi) identity that you supply; the repositories and their builds contain none. Organisations that can’t use AGPL-3.0 can ask for an exemption at [support@openxplay.org](mailto:support@openxplay.org). The device support files for devices such as the UFI003 (OpenXPlay-Hardware) follow OpenStick’s terms: free for personal use, no commercial use and no exemptions. See [Licensing](/en/licensing).

## Using it {#usage}

### How much delay should I expect? {#delay}

The repositories don’t publish delay figures yet. The relay sends the iPhone’s video (H.264 or H.265) over a secure WebSocket, and the head unit’s browser decodes it with WebCodecs, so the delay depends mostly on the Wi-Fi link and the head unit’s decoder. In the web receiver’s settings, *Speed* gives the lowest delay but may skip frames, *Quality* gives the smoothest motion with a little more delay, and *Smart* balances the two for your network.

### What happens when the car cuts the power? {#power-cuts}

The relay starts again when power comes back:

- The Linux relay runs as a system service that starts at boot and restarts if it fails. It doesn’t wait for Internet access or time synchronisation, and its certificates stay valid even if the device clock is wrong. If the clock was wrong when certificates were made, the relay replaces them once the clock is synchronised, and the browser may ask you to accept the new certificate.
- The Android app can start automatically when the phone boots. Some phones block this; if OpenXPlay Relay doesn’t open, open it yourself.

## Privacy and security {#privacy}

### Does OpenXPlay send my data anywhere? {#data}

OpenXPlay works over local connections. The relay serves the receiver page and its admin page itself; video, audio and touch travel between the iPhone, the relay and the head unit over Bluetooth, Wi-Fi or USB, and the Linux relay starts without waiting for Internet access. Plugins are off by default and run offline in the head-unit browser. Vehicle information from Carlink is collected only when you turn it on and stays on the relay phone. This website has no analytics, and its check page runs only in your browser.

### Is the relay’s admin page protected? {#admin-password}

Yes. The admin page uses HTTPS and asks for an admin password. The login page shows the first-time password; change it right away. The admin page warns you while the default password is still in use.
