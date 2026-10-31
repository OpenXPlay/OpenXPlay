---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-29
title: 'Tesla: CarPlay in the Tesla browser (experimental)'
description: The Tesla browser doesn’t open local-network addresses, so the OpenXPlay relay adds an address it can open. Requirements, the four ways to reach the relay (TeslaMirror-style recommended) and how to set it up on the Android relay. Not yet tested in a Tesla.
breadcrumb: Tesla
---

# Tesla <Badge type="warning" text="Experimental" />

A Tesla shows CarPlay in its own browser, like other head units, with one difference: the Tesla browser doesn’t open local-network addresses such as `192.168.43.20`. The relay therefore adds an address the Tesla can open, through a local VPN on the relay phone; nothing leaves the phone.

::: warning Not yet tested in a Tesla
This adaptation is new in Android app 0.2.0 and hasn’t been tested in a Tesla yet. If you try it, please share the result in the [community](/en/community).
:::

## What you need {#requirements}

- Android app 0.2.0 or later ([download the latest version](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk)); from 0.2.2 it has its own settings page.
- A Tesla with MCU2 or later.
- Wireless CarPlay: the USB connection already uses Android’s only VPN.
- *Car browser* as the output.
- The Tesla on the relay phone’s hotspot (5 GHz if possible) or on its Wi-Fi Direct network. *Use the car’s hotspot* doesn’t work: the car’s hotspot doesn’t pass the address to the phone.
- *Remain Connected in Drive* turned on in the Tesla’s Wi-Fi settings.

## Set it up {#setup}

1. Set up the relay as in [Android phone as the relay](/en/android-relay), and choose Tesla and your model under *Your car*.
2. In the app, open Settings → *Tesla browser* and choose one of the ways below. The ones with a trusted name need [Trusted HTTPS](/en/trusted-https) first. Android asks for VPN consent the first time.
3. Start CarPlay. The home screen lists the Tesla address first; open it in the Tesla browser.

| Way | Address on the phone | What to know |
| --- | --- | --- |
| Trusted name + shared range address (TeslaMirror, recommended) | `100.88.0.1` | Needs Trusted HTTPS; the Tesla opens your trusted name without a certificate warning. |
| Trusted name, link-local address | `169.254.88.1` | Needs Trusted HTTPS. The Tesla needs internet through the phone’s hotspot to look up the name. |
| Direct link-local address | `169.254.88.1` | No account needed: open `https://169.254.88.1:8443` and continue past the certificate warning. Works only if the Tesla browser lets you continue. |
| Public-range address (like TeslaAndroid) | `3.3.3.1` | Open the address and continue past the certificate warning. |
| Off | | The default. |

You can change the address on the phone. Switching between ways keeps CarPlay running.

::: details Android 13 and later
Android 13 and later may drop connections from the hotspot to an address outside `169.254`; this was seen on Android 15. If the Tesla can’t open the page, use a way with a `169.254` address. The app warns when this applies.
:::

## Linux relay {#linux}

The Linux relay has the same ways from 0.1.6-beta.2, a pre-release: in its admin page, turn on the Tesla browser, with *Car browser* as the output and the relay’s own hotspot. The relay adds the address to its hotspot and removes it when you stop the relay; the trusted-name ways need Trusted HTTPS here too.
