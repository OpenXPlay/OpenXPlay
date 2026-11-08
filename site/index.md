---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
layout: home
title: 'OpenXPlay: CarPlay for Android head units that can’t install apps'
titleTemplate: false
description: OpenXPlay shows iPhone CarPlay on Android head units that can’t install apps, through the head unit’s browser, Carlink, CarLife or screen-casting receiver. Connect with the OpenXPlay iPhone app directly, or relay through an Android phone or a small Linux device. Open source.
hero:
  name: OpenXPlay
  text: CarPlay for head units that can’t install apps
  tagline: Connect with the OpenXPlay iPhone app directly, or use an Android phone or a UFI003 USB dongle as a relay. Your iPhone’s CarPlay shows up in the head unit’s own browser, and nothing is installed on the head unit.
  actions:
    - theme: brand
      text: Get started
      link: /quick-start
    - theme: alt
      text: Check my head unit
      link: /check
featuresTitle: Three steps to CarPlay
features:
  - title: Check your head unit
    details: Open openxplay.org/check in the head unit’s browser to see whether it can show CarPlay.
    link: /check
    linkText: Run the check
  - title: Choose a setup
    details: Connect with the OpenXPlay iPhone app directly, or prepare a relay on an Android phone or a UFI003 USB dongle.
    link: /quick-start
    linkText: Choose a setup
  - title: Connect in the car
    details: Open the address the iPhone app or the relay shows in the head unit’s browser and tap the screen once to start.
    link: /quick-start
    linkText: Read the guide
---

## iPhone direct (beta) {#iphone-app}

The OpenXPlay iPhone app connects your iPhone to the head unit directly, without a relay. It is in public beta: scan the QR code with your iPhone’s camera, or open the [TestFlight invitation](https://testflight.apple.com/join/WbKejMWS) on your iPhone.

<figure class="oxp-figure is-qr">
  <a href="https://testflight.apple.com/join/WbKejMWS"><img src="/iphone-app-qr.svg" width="37" height="37" loading="lazy" decoding="async" alt="QR code for joining the OpenXPlay iPhone app beta on TestFlight"></a>
</figure>

## What you need {#requirements}

<div class="oxp-checklist">

- **An iPhone with CarPlay**.
- **The iPhone app or a relay**: the [OpenXPlay iPhone app](#iphone-app) connects directly; a relay is an Android phone with Android 8.0 or later, or a UFI003 USB dongle.
- **An Apple accessory (MFi) identity**: usually two files that you supply yourself; the project doesn’t include one. [Learn more](/quick-start#mfi-identity)
- **The head unit’s browser**: it must decode video with WebCodecs; you can [check it first](/check).

</div>

## Who OpenXPlay is for {#who-it-is-for}

OpenXPlay is for **drivers who want CarPlay but can’t install third-party apps on their Android head unit**. The head unit’s system is never modified: the iPhone app or a relay does the receiving and connecting, and CarPlay appears through an entry point the head unit already has.

| Your head unit | What to use |
| --- | --- |
| Can’t install apps | **OpenXPlay**: the iPhone app or a relay does the work, and CarPlay appears in the head unit’s browser, Carlink, CarLife or screen-casting receiver. |
| Can install apps | **[DiPlay](https://github.com/shihabal3amri/DiPlay)**: install the app on a compatible Android head unit, which receives and shows CarPlay itself. |

To see how it works in detail and which head-unit entry points it supports, read [How it works](/how-it-works).

## Common questions {#questions}

::: details Do I need to install anything on the head unit?
No. The iPhone app or the relay does the receiving and connecting, and the head unit uses what it already has: its browser, Carlink, CarLife or screen-casting receiver. The head unit’s system is never modified.
:::

::: details Is it free?
Yes. The software is open source under AGPL-3.0. A working setup also needs an Apple accessory (MFi) identity that you supply. See [Licensing](/licensing).
:::

::: details Will my head unit work?
What matters is the head unit’s browser: it needs WebCodecs video decoding. Open [Check your head unit](/check) in its browser to find out; the head units OpenXPlay has tested are listed under [Head units](/head-units).
:::

::: details Does it send my data anywhere?
OpenXPlay works over local connections: video, audio and touch travel between the iPhone, the relay if you use one, and the head unit over Bluetooth, Wi-Fi or USB, and the iPhone app or the relay serves the receiver page itself. See the [FAQ](/faq#data).
:::

More answers are in the [FAQ](/faq); for problems with the connection, the picture or the sound, see [Troubleshooting](/troubleshooting).

## Join the community {#join}

Share how OpenXPlay works with your head unit, report problems, or help test and develop the project: [Discord](https://discord.gg/j3cKd5Tax), QQ group 2 **167458222** and a WeChat group. The QR codes are on the [Community](/community) page.
