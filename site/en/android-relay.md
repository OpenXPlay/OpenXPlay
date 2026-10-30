---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 'Android phone as the relay: CarPlay in the head unit’s browser'
description: Set up an Android phone as the OpenXPlay relay step by step. Install OpenXPlay Relay, answer its setup guide (your car, how the car shows CarPlay, how the iPhone connects, the network), pair your iPhone, then open CarPlay in the head unit’s browser. Nothing is installed on the head unit.
breadcrumb: Android phone as the relay
schema: howto
howtoName: Show iPhone CarPlay in the head unit’s browser with an Android phone as the relay
howtoTools:
  - iPhone with CarPlay
  - Android phone (Android 8.0 or later) with the OpenXPlay Relay app
  - Apple accessory (MFi) identity that you supply
  - Android head unit with a browser that supports WebCodecs
next:
  text: Everyday use and settings
  link: /en/daily-use
---

# Android phone as the relay

The recommended setup: an Android phone as the relay and the head unit’s own browser to show CarPlay. Nothing is installed on the head unit. The first setup takes about 10 minutes. This guide follows OpenXPlay Relay 0.2.2.

::: tip Before you start
- An iPhone with CarPlay
- An Android phone with Android 8.0 or later (Android 10 or later for [Carlink](/en/carlink))
- An Apple accessory (MFi) identity: `identity.pk8` and `certificate.p7b`, which you [supply yourself](/en/quick-start#mfi-identity)
:::

## Check the head unit’s browser {#step-check .step}

In the head unit’s browser, open [openxplay.org/check](/en/check). The page tests whether the browser can decode CarPlay’s video; continue once it says the browser works. If it doesn’t, try the [Carlink app](/en/carlink) instead. In a Tesla, see [Tesla](/en/tesla).

## Install OpenXPlay Relay {#step-install .step}

On the relay phone, download and install [openxplay-relay.apk](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk) (the latest release). If Android asks, allow installing apps from your browser or file manager.

::: details Need an earlier version, or want to build it yourself?
Earlier versions are on [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases), and what changed in each is in the [changelog](/en/changelog). You can also build the app yourself as the [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) README describes.
:::

## Answer the setup guide {#step-guide .step}

The first time you open the app, a setup guide takes you through a few pages; a bar at the top shows how far you are.

1. **Your car:** choose the brand and the model; the year can stay *Not sure*. The list has XPeng, Tesla and ZEEKR; if your car isn’t listed, choose *Other* and type its name. Different cars get different settings: the XPeng G6 2023 comes with its screen data, a Tesla needs the [Tesla browser](/en/tesla) setting, and for a ZEEKR the guide suggests [Trusted HTTPS](/en/trusted-https).
2. **Car display:** choose *Car browser*. *Carlink app* is experimental, see [Carlink](/en/carlink). *Wireless display* (DLNA, Miracast) shows *Coming soon* and can’t be chosen yet.
3. **iPhone connection:** choose *Wireless*: in the car, the iPhone connects by itself over Bluetooth and Wi-Fi. *USB cable* is not recommended: the relay phone has to power the iPhone through the cable, and only some cables work; a USB-C iPhone on a USB-C to USB-C cable usually isn’t found (see [Troubleshooting](/en/troubleshooting#usb-iphone-not-found)). The app asks you to confirm when you choose it.
4. **Wireless network:** the iPhone, the relay phone and the head unit must reach each other. Choose one for your car; open it for details:

::: details Wi-Fi Direct (recommended): the relay phone joins the head unit’s hotspot or another Wi-Fi {#network-wifi-direct}
The iPhone connects straight to the relay phone. The head unit reaches the relay phone over the relay phone’s normal Wi-Fi, for example the car’s hotspot. Not available together with Carlink, which can replace CarPlay’s Wi-Fi Direct group: the guide then recommends *This phone’s hotspot*.
:::

::: details This phone’s hotspot: the head unit has no hotspot but can join a Wi-Fi network {#network-hotspot}
The iPhone and the head unit both join the relay phone’s hotspot.

- Enter the hotspot name and password in the app exactly as in Android’s hotspot settings.
- Choose 5 GHz for the band, here and in Android’s hotspot settings: on 2.4 GHz the picture stutters easily. Switch back to 2.4 GHz only if the head unit can’t join a 5 GHz hotspot.
- Some phones open only a 2.4 GHz hotspot while connected to Wi-Fi; disconnect Wi-Fi first. Some turn Wi-Fi off when the hotspot is on, which Carlink can’t work with.
:::

::: details Use the car’s hotspot: everyone joins the head unit’s hotspot {#network-car-hotspot}
The iPhone and the relay phone both join the car’s hotspot. Connect the relay phone to it first and save it in the app; the hotspot must let devices reach each other.
:::

5. **Get ready:** the page lists only what is still missing; work through it. You do this once; the app remembers it.
   - **Permissions:** nearby devices (Bluetooth), nearby Wi-Fi devices, notifications and the microphone. CarPlay offers Siri and calls only when the microphone is allowed. USB and the Tesla setting also ask for Android VPN consent.
   - **Import the CarPlay identity:** select `identity.pk8` and `certificate.p7b` together or one after the other, in any order, or a ZIP containing them. If you pick only one, the app asks for the other.
   - **Pair the iPhone** (wireless): allow the relay phone to become visible when it asks, then on the iPhone open Settings → Bluetooth, choose the relay phone and allow CarPlay.
   - **Save the car’s hotspot** (only with *Use the car’s hotspot*).
6. **Ready to start:** check the summary. *Connect automatically* is on: next time the app opens, it starts after a short countdown. *Start on boot* starts the relay when the phone starts.

## Connect the head unit’s network {#step-network .step}

Put the head unit and the relay phone on the network you chose:

- **Wi-Fi Direct:** turn on the head unit’s Wi-Fi hotspot and join it from the relay phone.
- **This phone’s hotspot:** turn on the relay phone’s hotspot and join it from the head unit.
- **Use the car’s hotspot:** turn on the head unit’s hotspot and join it from the relay phone; the iPhone joins it by itself.

::: warning Give the hotspot a password
The Android relay uses no pairing code: opening the address connects. Be sure to give the hotspot a password and let only your own devices join.
:::

## Start CarPlay {#step-start .step}

On the guide’s last page, tap *Start CarPlay*. For the first connection, keep the iPhone unlocked and near the relay phone.

The app’s home screen shows three tiles, the iPhone, this phone and the car; the links between them fill as the connection comes up. Under them are one line saying what is happening and at most one button. If something is still off, such as Bluetooth or the hotspot, the button fixes it or the app waits and starts once it is on. Tap a tile, or pull up the panel, to see every step with its details.

When no car screen is known yet, CarPlay waits up to 20 seconds for the head unit to report its size; *Start now* skips the wait. Once the step reads *Open this address in the car’s browser*, the address is shown under it with a copy button: it starts with `https://` and ends in `:8443`, such as `https://192.168.43.20:8443/`.

## Open the address in the head unit’s browser {#step-open .step}

1. Type the address from the home screen into the head unit’s browser. Note that it starts with `https://`, not `http://`, and include the port number after the colon.
2. The first time, the browser warns that it can’t verify the certificate. This is expected: choose *Advanced* (or similar), then continue to the page.
3. Bookmark the page so you can open it directly next time.

::: details Why the certificate warning, and is it safe?
The connection is still encrypted. Browsers allow WebCodecs video decoding only on secure pages, so the relay serves the page over HTTPS; the relay creates its own certificate, which no public authority has signed, so the browser can’t verify it and warns. Check that the address is your relay’s, then continue. See [Troubleshooting](/en/troubleshooting#certificate-warning); to remove the warning for good, see [Trusted HTTPS](/en/trusted-https).
:::

## Start using it {#step-use .step}

When the page asks for a tap, tap the screen once: the page goes full screen and turns on sound, and the tap doesn’t reach CarPlay. CarPlay then runs on the head unit’s screen and responds to your touches; the home screen says *CarPlay is live*.

To change the picture, the sound or full screen, tap the OpenXPlay icon in CarPlay: the page’s settings slide in. See [Head-unit page settings](/en/daily-use#web-settings).

## Next {#next-steps}

- [Everyday use and settings](/en/daily-use): how to connect on every drive after this, and the app’s settings.
- [Trusted HTTPS](/en/trusted-https): remove the certificate warning with a free domain name.
- Something not working? See [Troubleshooting](/en/troubleshooting).
