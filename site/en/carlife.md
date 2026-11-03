---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-02
title: CarPlay in the head unit’s CarLife app (experimental)
description: When the head unit has CarLife, an Android phone relay can bring CarPlay’s picture and touch to it over the same Wi-Fi, the relay phone’s hotspot or a USB accessory connection. An experimental feature — how to turn it on, the network and sound.
breadcrumb: CarLife
---

# CarLife <Badge type="warning" text="Experimental" />

If the head unit has CarLife (Baidu CarLife), try this route: the relay sends CarPlay’s picture and touch to the head unit’s CarLife, and sound stays on the iPhone’s Bluetooth link to the car. CarLife uses H.264; when the iPhone sends H.265, the relay phone converts it to H.264 with its hardware codecs.

::: warning Experimental feature
It needs Android app 0.2.5 or later; [download the latest version](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk). The Linux relay has no CarLife output. CarLife has been tested only over Wi-Fi, with a phone running CarLife standing in for the head unit (see [Head units](/en/head-units#bench)); it hasn’t been tested in a car or over a USB cable.
:::

## Turn on the CarLife output {#step-enable .step}

Choose *CarLife* on the setup guide’s *Car display* page or in Settings → Output. *CarLife head-unit IP address* can stay empty: the relay finds the head unit by itself. If it doesn’t, enter the head unit’s IPv4 address. The rest of the relay setup is the same as for the browser route; see [Android phone as the relay](/en/android-relay).

## Connect the head unit {#step-connect .step}

Either:

- **Wi-Fi:** the head unit joins the relay phone’s hotspot, or both join the same Wi-Fi.
- **USB:** a cable from the head unit’s USB port to the relay phone, as a USB accessory connection.

## Open CarLife on the head unit {#step-open .step}

Open CarLife on the head unit and start the relay. When Home shows *Sending the CarPlay picture*, check the picture on the head unit.

## Sound {#audio}

CarLife carries only the picture and touch. Music, navigation and calls play from the iPhone over its own Bluetooth link to the car, so pair the iPhone with the car’s Bluetooth first.
