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
  tagline: OpenXPlay shows iPhone CarPlay on Android head units that can’t install apps. A relay — an Android phone or a small Linux device — connects to the iPhone and passes CarPlay to software the head unit already has, such as its browser or a Carlink app.
  actions:
    - theme: brand
      text: Quick start
      link: /en/quick-start
    - theme: alt
      text: Check your head unit
      link: /en/check
features:
  - title: Quick start
    details: Set up an Android phone or a UFI003 USB dongle as the relay, pair your iPhone, then open CarPlay on the head unit.
    link: /en/quick-start
    linkText: Set it up
  - title: Check your head unit
    details: Open the check page in the head unit’s browser to see whether it can run the web receiver.
    link: /en/check
    linkText: Run the check
  - title: FAQ and troubleshooting
    details: Certificate warnings, 2.4 GHz Wi-Fi, Bluetooth pairing, delay, power cuts and privacy.
    link: /en/faq
    linkText: Read the answers
  - title: Developers and licensing
    details: Architecture, repositories, AGPL-3.0 with commercial exemptions, contributing and plugins.
    link: /en/developers
    linkText: Build with OpenXPlay
---

## Who OpenXPlay is for {#who-it-is-for}

OpenXPlay is for drivers who want CarPlay but can’t install third-party apps on their Android head unit. Nothing is installed on the head unit and its system is never modified: a phone or an external device does the receiving and connecting, and CarPlay appears through an entry point the head unit already has.

| Your head unit | What to use |
| --- | --- |
| Can’t install apps | **OpenXPlay**: a phone or external device does the work, and CarPlay appears in the head unit’s browser, its Carlink app or a similar entry point. |
| Can install apps | **[DiPlay](https://github.com/shihabal3amri/DiPlay)**: install the app on a compatible Android head unit, which receives and shows CarPlay itself. |

Developers can build on the same pieces: inputs, outputs and relays that talk to each other only through one shared session model. See [Developers and licensing](/en/developers).

## How the relay route works {#relay-route}

An iPhone connects to a relay — an Android phone running the OpenXPlay Relay app, or a small Linux device such as the UFI003 USB dongle. The relay acts as the CarPlay receiver and passes video, audio and touch on to the head unit.

<figure class="oxp-figure">
  <img src="../../assets/openxplay-relay-animated.svg" width="1800" height="1120" loading="lazy" decoding="async" alt="OpenXPlay relay route: an iPhone connects over Wi-Fi or USB to an Android relay or a Linux relay, which reaches the car’s screen through its browser, Carlink, wireless display or wired display.">
  <figcaption>One route within OpenXPlay. It covers only part of the project’s possible solutions.</figcaption>
</figure>

Today the relay delivers CarPlay to these head-unit entry points:

| Entry point | How it works | Touch | Status |
| --- | --- | --- | --- |
| Browser (web receiver) | H.264 video over a secure WebSocket, decoded with WebCodecs | Yes | In development |
| Carlink app | Over Wi-Fi | Yes | Experimental |
| Screen-casting receivers (DLNA) | Casting | No | Planned |

## Up to 28 combinations {#combinations}

Think of OpenXPlay as a set of CarPlay building blocks that you combine freely: Android, Linux and iOS implementations; USB, Bluetooth and Wi-Fi connections; and browser or Carlink display paths. It covers what some commercial CarPlay boxes do and adds more ways to connect and display. **Combined, the technologies in this project make up to 28 solutions**, so you can pick the one that fits your head unit and the devices you already have.

## Lean and low-cost {#lean}

| Metric | Usage / cost |
| --- | --- |
| Resident memory | 4.3 MB |
| Disk space | 5 MB |
| Hardware cost | From CNY 15 / USD 3, excluding the MFi part |

These figures are for a specific solution and configuration. Actual usage and cost depend on the solution, the devices and the environment.

## Community {#community}

Share how OpenXPlay works with your head unit, swap experiences, report problems, and help test and develop the project.

| Channel | How to join |
| --- | --- |
| Discord | [discord.gg/j3cKd5Tax](https://discord.gg/j3cKd5Tax) |
| QQ group | 1015739350, or scan the QR code below |
| WeChat group | Scan the QR code below |

<figure class="oxp-figure is-narrow">
  <img src="../../Group/Wechat_QQ_Group.jpg" width="1086" height="814" loading="lazy" decoding="async" alt="QR codes for joining the OpenXPlay QQ group and WeChat group">
  <figcaption>WeChat group QR codes expire after a while, so this image is refreshed whenever the code changes. If it has expired, join through QQ or Discord and ask for a new invitation.</figcaption>
</figure>

When you report a compatibility problem, include the head unit model, its system version, the route you used and what happened. A report from [Check your head unit](/en/check) helps too.
