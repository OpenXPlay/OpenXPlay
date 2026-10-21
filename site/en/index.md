---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
layout: home
title: 'OpenXPlay: CarPlay for Android head units that can’t install apps'
titleTemplate: false
description: OpenXPlay shows iPhone CarPlay on Android head units that can’t install apps. An Android phone or a small Linux device relays CarPlay to the head unit’s browser or Carlink app. Open source.
hero:
  name: OpenXPlay
  text: CarPlay for head units that can’t install apps
  tagline: Use an Android phone or a UFI003 USB dongle as the relay, and your iPhone’s CarPlay shows up in the head unit’s own browser. Nothing is installed on the head unit.
  actions:
    - theme: brand
      text: Get started
      link: /en/quick-start
    - theme: alt
      text: Check my head unit
      link: /en/check
featuresTitle: Three steps to CarPlay
features:
  - title: Check your head unit
    details: Open openxplay.org/check in the head unit’s browser to see whether it can show CarPlay.
    link: /en/check
    linkText: Run the check
  - title: Prepare a relay
    details: Install the OpenXPlay Relay app on an Android phone, or turn a UFI003 USB dongle into a relay.
    link: /en/quick-start
    linkText: Choose a setup
  - title: Connect in the car
    details: Once the iPhone is connected to the relay, open the address the relay shows in the head unit’s browser and tap the screen once to start.
    link: /en/android-relay
    linkText: Read the guide
---

## What you need {#requirements}

<div class="oxp-checklist">

- **An iPhone with CarPlay**: it connects to the relay wirelessly or by USB cable.
- **A relay**: an Android phone with Android 8.0 or later, or a UFI003 USB dongle.
- **An Apple accessory (MFi) identity**: two files that you supply yourself; the project doesn’t include one. [Learn more](/en/quick-start#mfi-identity)
- **The head unit’s browser**: it must decode video with WebCodecs; you can [check it first](/en/check).

</div>

## Who OpenXPlay is for {#who-it-is-for}

OpenXPlay is for **drivers who want CarPlay but can’t install third-party apps on their Android head unit**. The head unit’s system is never modified: a phone or an external device does the receiving and connecting, and CarPlay appears through an entry point the head unit already has.

| Your head unit | What to use |
| --- | --- |
| Can’t install apps | **OpenXPlay**: a phone or external device does the work, and CarPlay appears in the head unit’s browser, its Carlink app or a similar entry point. |
| Can install apps | **[DiPlay](https://github.com/shihabal3amri/DiPlay)**: install the app on a compatible Android head unit, which receives and shows CarPlay itself. |

To see how it works in detail and which head-unit entry points it supports, read [How it works](/en/how-it-works).

## Common questions {#questions}

::: details Do I need to install anything on the head unit?
No. The relay does the receiving and connecting, and the head unit uses what it already has: its browser or its Carlink app. The head unit’s system is never modified.
:::

::: details Is it free?
Yes. The software is open source under AGPL-3.0. A working setup also needs an Apple accessory (MFi) identity that you supply. See [Licensing](/en/licensing).
:::

::: details Will my head unit work?
What matters is the head unit’s browser: it needs WebCodecs video decoding. Open [Check your head unit](/en/check) in its browser to find out; the head units OpenXPlay has tested are listed under [Head units](/en/head-units).
:::

::: details Does it send my data anywhere?
OpenXPlay works over local connections: video, audio and touch travel between the iPhone, the relay and the head unit over Bluetooth, Wi-Fi or USB, and the relay serves the receiver page and its admin page itself. See the [FAQ](/en/faq#data).
:::

More answers are in the [FAQ](/en/faq); for problems with the connection, the picture or the sound, see [Troubleshooting](/en/troubleshooting).

## Join the community {#join}

Share how OpenXPlay works with your head unit, report problems, or help test and develop the project: [Discord](https://discord.gg/j3cKd5Tax), QQ group **1015739350** and a WeChat group. The QR codes are on the [Community](/en/community) page.
