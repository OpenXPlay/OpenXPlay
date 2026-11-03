---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-02
title: CarPlay on the head unit’s screen-casting receiver (wireless display, experimental)
description: When the head unit can only receive screen casting (DLNA or Miracast), an Android phone relay can cast CarPlay’s picture to it while you operate CarPlay on the relay phone. An experimental feature — choosing DLNA or Miracast, the network, sound and picture.
breadcrumb: Wireless display
---

# Wireless display <Badge type="warning" text="Experimental" />

If the head unit has no usable browser, Carlink or CarLife but can receive screen casting (DLNA or Miracast), try this route: the head unit shows CarPlay’s picture only and can’t be touched; you operate CarPlay on the relay phone.

::: warning Experimental feature
It needs Android app 0.2.5 or later; [download the latest version](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk). The Linux relay has no wireless display output. Wireless display hasn’t been tested in a car, and DLNA only on a monitor (see [Head units](/en/head-units#bench)).
:::

## Choose DLNA or Miracast {#step-choose .step}

Choose *Wireless display* on the setup guide’s *Car display* page or in Settings → Output, then one of:

| Kind | For | Keep in mind |
| --- | --- | --- |
| DLNA | Head units with a screen-casting receiver app | The head unit plays what the relay sends, a few seconds behind. |
| Miracast | Head units that receive a phone’s screen casting | Less delay; uses Wi-Fi Direct. |

## DLNA: connect the receiver {#dlna}

1. The head unit joins the relay phone’s hotspot, or both join the same Wi-Fi; then open the receiver app on the head unit.
2. In Settings → Output → *Wireless display*, tap *Receiver* and choose the head unit from the list. If it isn’t there, check the network and the receiver app, then tap *Search again*.

The relay keeps sending the picture to that receiver and retries when the receiver stops playing.

## Miracast: start screen casting {#miracast}

1. In Settings → Output → *Wireless display*, allow *Display over other apps*, so CarPlay stays on the head unit while the relay is in the background.
2. Tap *Open screen casting* and choose the head unit in Android’s casting list.

Miracast and Carlink both use Wi-Fi Direct; most phones can use only one at a time. Miracast can also replace CarPlay’s own Wi-Fi Direct group, so use *This phone’s hotspot* or USB for CarPlay; the app offers to switch.

## Operate CarPlay on the relay phone {#operate}

With wireless display only, the relay phone shows CarPlay and takes touch, with a back button. While connected, Home offers *Show CarPlay*.

## Sound {#audio}

With Settings → Sound → *CarPlay audio over the car’s Bluetooth* off, every CarPlay sound (music, alerts, Siri and calls) goes to the head unit with the cast; DLNA plays it a few seconds late, like its picture. Siri and calls use the relay phone’s microphone. With the option on, sound plays from the iPhone over its Bluetooth link to the car.

## Picture {#picture}

- **DLNA** uses the car screen measured by the browser and saved, or the chosen car model’s screen, otherwise 16:9, at the size set in Settings → CarPlay picture → *Resolution*.
- **Miracast** uses the size Android negotiated with the head unit. The head unit receives what Android’s screen casting sends; these settings change CarPlay’s shape inside it, not its clarity. If the head unit stretches the cast picture to its screen, turn on *Fill the screen* so CarPlay shows in the right proportions.
