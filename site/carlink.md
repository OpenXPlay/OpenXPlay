---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: CarPlay in the head unit’s Carlink app
description: When the head unit has no usable browser, the OpenXPlay relay can bring CarPlay to its Carlink app over Wi-Fi — how to turn it on, the pairing code, and what to know about Android phone, UFI003 and Phicomm N1 relays.
breadcrumb: Carlink app
---

# Carlink app

If the head unit has no usable browser but does have a Carlink app, try this route: the relay connects to the head unit’s Carlink app over Wi-Fi. Carlink can use H.264 or H.265, depending on what the head unit supports and on the relay’s settings: when the head unit reports H.265 support, the Android relay sends the iPhone’s H.265 picture as it is; otherwise it converts the picture, when needed, to an H.264 format the head unit can show.

This page covers the relay. The [OpenXPlay iPhone app](/#iphone-app) can also connect to the head unit’s Carlink app directly, without a relay.

::: tip Version
It needs Android app 0.1.5 or later; [download the latest version](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk). From 0.1.5, the black screen with sound on some head units, such as the XPeng G6, is fixed, and the picture takes the shape of the car’s Carlink window. Results from cars are under [Head units](/head-units#xpeng-g6).
:::

## Turn on the Carlink output {#step-enable .step}

**Android phone:** In the setup guide, choose *Carlink app* on the *Car display* page; the guide then recommends *This phone’s hotspot* for wireless CarPlay. To run the browser and Carlink together, use Settings → Developer options → *Combine outputs*. The rest of the relay setup is the same as for the browser route; see [Android phone as the relay](/android-relay).

**Linux relay:** It needs two Wi-Fi adapters: the built-in one runs the iPhone’s hotspot and the second joins the head unit’s Carlink Wi-Fi. In the admin page’s setup guide or in Settings → Output, choose *Carlink* or *Browser and Carlink*; with one adapter, only the browser is offered. See [Phicomm N1 as the relay](/phicomm-n1#adapters) or [Other Linux devices](/linux-devices#setup).

## Open Carlink on the head unit {#step-open .step}

Start the head unit’s Carlink app.

## Enter the pairing code {#step-pair .step}

Enter the pairing code the car screen shows now into the relay (the Android app, or the Linux relay’s admin page) and connect straight away. The code changes from time to time; the head unit decides how long it lasts.

## What to know for each relay {#relays}

| Relay | What to know |
| --- | --- |
| Android phone | Carlink needs Android 10 or later. The relay phone joins the car’s Carlink network as a Wi-Fi client, so its Wi-Fi must be on (it needn’t be connected to anything). For wireless CarPlay choose *This phone’s hotspot*: the relay runs its hotspot for the iPhone and joins the car over Wi-Fi at the same time. Some phones turn Wi-Fi off when their hotspot is on; they can’t do both. |
| UFI003 | It has one Wi-Fi adapter, 2.4 GHz only, so Carlink isn’t available; use the head unit’s browser. |
| Phicomm N1 | Needs a USB Wi-Fi adapter as well: the built-in adapter runs the iPhone’s hotspot and the USB adapter joins the head unit’s Carlink Wi-Fi, see [One adapter or two](/phicomm-n1#adapters). With the built-in adapter alone, Carlink isn’t available. |

::: details Sound but a black picture on the head unit? {#black-screen}
Some head units recognise a key frame only at the very start of a frame, and Android app 0.1.3 and earlier show a black screen on them. It needs Android app 0.1.5 or later; [update to the latest version](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk). 0.1.5 also brings the picture back after the reverse camera.
:::

::: details The head unit stops at about 30 %? {#stuck-30}
The relay phone’s Wi-Fi is off. Carlink has the relay phone join the car’s network as a Wi-Fi client; turn Wi-Fi on and connect again. From Android app 0.1.5, a manual start checks this and tells you.
:::

::: details The picture doesn’t fill the screen after the car switches to full screen? {#full-screen}
The car tells the relay its window size only when Carlink connects. When you switch its area during a session, for example from two thirds of the screen to full screen, the car just scales the existing picture up and leaves bars at the sides. Turn on Settings → Output → *Reconnect when the window size changes*: after a switch, the first touch reconnects, and the picture stops for a few seconds.
:::
