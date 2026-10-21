---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 'How it works: the iPhone, the relay and the head unit'
description: The OpenXPlay relay route. An iPhone connects to an Android or Linux relay, which acts as the CarPlay receiver and passes video, audio and touch on to the head unit’s browser, Carlink app or other entry points.
breadcrumb: How it works
---

# How it works

An iPhone connects to a relay — an Android phone running the OpenXPlay Relay app, or a small Linux device such as the UFI003 USB dongle. The relay acts as the CarPlay receiver and passes video, audio and touch on to the head unit. Nothing is installed on the head unit and its system is never modified.

<figure class="oxp-figure">
  <img src="../../assets/openxplay-relay-animated.svg" width="1800" height="1120" loading="lazy" decoding="async" alt="OpenXPlay relay route: an iPhone connects over Wi-Fi or USB to an Android relay or a Linux relay, which reaches the car’s screen through its browser, Carlink, wireless display or wired display.">
  <figcaption>One route within OpenXPlay. It covers only part of the project’s possible solutions. Blue and purple dots show the data flows of the Android and Linux relays.</figcaption>
</figure>

## Head-unit entry points {#entries}

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

## Open source {#open-source}

OpenXPlay’s relays and outputs are open source under AGPL-3.0, and their components talk to each other only through one shared session model. The architecture, repositories and build steps are under [Developers](/en/developers); licences and commercial exemptions are under [Licensing](/en/licensing).
