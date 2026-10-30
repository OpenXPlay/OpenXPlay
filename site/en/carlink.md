---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: CarPlay in the head unit’s Carlink app (experimental)
description: When the head unit has no usable browser, the OpenXPlay relay can bring CarPlay to its Carlink app over Wi-Fi. An experimental feature — how to turn it on, the pairing code, and what to know about Android phone, UFI003 and Phicomm N1 relays.
breadcrumb: Carlink app
---

# Carlink app <Badge type="warning" text="Experimental" />

If the head unit has no usable browser but does have a Carlink app, try this route: the relay connects to the head unit’s Carlink app over Wi-Fi. When the head unit reports H.265 support, the Android relay sends the iPhone’s H.265 picture as it is; otherwise it converts the picture to H.264.

::: warning Experimental feature
The Carlink output is still experimental and may fail to connect. Use Android app [0.1.5](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.1.5) or later: it fixes a black screen with sound on some head units, such as the Xpeng G6, shows the picture in the shape of the car’s Carlink window and lands touches where you tap. Test results are under [Head units](/en/head-units#xpeng-g6).
:::

## Turn on the Carlink output {#step-enable .step}

In the setup guide, choose *Carlink app* on the *Car display* page; the guide then recommends *This phone’s hotspot* for wireless CarPlay. To run the browser and Carlink together, use Settings → Developer options → *Combine outputs*. The rest of the relay setup is the same as for the browser route; see [Android phone as the relay](/en/android-relay) or [UFI003 as the relay](/en/ufi003-relay).

## Open Carlink on the head unit {#step-open .step}

Start the head unit’s Carlink app.

## Enter the pairing code {#step-pair .step}

Enter the pairing code shown on the car screen into the relay and connect straight away; the code changes every 2 minutes.

## What to know for each relay {#relays}

| Relay | What to know |
| --- | --- |
| Android phone | Carlink needs Android 10 or later. The relay phone joins the car’s Carlink network as a Wi-Fi client, so its Wi-Fi must be on (it needn’t be connected to anything). For wireless CarPlay choose *This phone’s hotspot*: the relay runs its hotspot for the iPhone and joins the car over Wi-Fi at the same time. Some phones turn Wi-Fi off when their hotspot is on; they can’t do both. |
| UFI003 | Its Wi-Fi is 2.4 GHz only, so it can’t join a head unit whose Carlink Wi-Fi runs on 5 GHz. |
| Phicomm N1 | It can join a 5 GHz Carlink network. With one Wi-Fi radio, the iPhone follows the relay onto the car’s network; a USB Wi-Fi adapter can take Carlink on its own, see [Network and Wi-Fi](/en/phicomm-n1#wifi). Not yet tested in a car. |

::: details Sound but a black picture on the head unit? {#black-screen}
Some head units recognise a key frame only at the very start of a frame, and Android app 0.1.3 and earlier show a black screen on them. Update to Android app [0.1.5](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.1.5) or later. The newer version also brings the picture back after the head unit shows the reverse camera.
:::

::: details The head unit stops at about 30 %? {#stuck-30}
The relay phone’s Wi-Fi is off. Carlink has the relay phone join the car’s network as a Wi-Fi client; turn Wi-Fi on and connect again. From Android app 0.1.5, a manual start checks this and tells you.
:::

::: details The picture doesn’t fill the screen after the car switches to full screen? {#full-screen}
The car tells the relay its window size only when Carlink connects. When you switch its area during a session, for example from two thirds of the screen to full screen, the car just scales the existing picture up and leaves bars at the sides; touches still land right. Turn on Settings → Output → *Reconnect when the window size changes*: after a switch, the first touch reconnects, and the picture stops for a few seconds. Whether the Xpeng G6 reports its full-screen size after reconnecting is still being tested.
:::
