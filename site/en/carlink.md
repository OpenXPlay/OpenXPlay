---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: CarPlay in the head unit’s Carlink app (experimental)
description: When the head unit has no usable browser, the OpenXPlay relay can bring CarPlay to its Carlink app over Wi-Fi. An experimental feature — how to turn it on, the pairing code, and what to know about Android phone and UFI003 relays.
breadcrumb: Carlink app
---

# Carlink app <Badge type="warning" text="Experimental" />

If the head unit has no usable browser but does have a Carlink app, try this route: the relay connects to the head unit’s Carlink app over Wi-Fi and always uses H.264 video.

::: warning Experimental feature
The Carlink output may fail to connect. On some head units, such as the Xpeng G6, the picture stays black; this is being investigated, see [Head units](/en/head-units#xpeng-g6). When the browser works, use the [browser route](/en/android-relay) instead.
:::

## Turn on the Carlink output {#step-enable .step}

In the setup guide, choose *Carlink app* for how the car shows CarPlay, or set the relay’s output to browser and Carlink. The rest of the relay setup is the same as for the browser route; see [Android phone as the relay](/en/android-relay) or [UFI003 as the relay](/en/ufi003-relay).

## Open Carlink on the head unit {#step-open .step}

Start the head unit’s Carlink app.

## Enter the pairing code {#step-pair .step}

Enter the pairing code shown on the car screen into the relay and connect straight away; the code changes every 2 minutes.

## What to know for each relay {#relays}

| Relay | What to know |
| --- | --- |
| Android phone | Carlink needs Android 10 or later. A single Wi-Fi radio may not handle wireless CarPlay and Carlink together, so USB CarPlay is more reliable. |
| UFI003 | Its Wi-Fi is 2.4 GHz only, so it can’t join a head unit whose Carlink Wi-Fi runs on 5 GHz. |
