---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 'Android phone as the relay: CarPlay in the head unit’s browser'
description: Set up an Android phone as the OpenXPlay relay step by step. Install OpenXPlay Relay, choose the network in the setup guide, pair your iPhone, then open CarPlay in the head unit’s browser. Nothing is installed on the head unit.
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

The recommended setup: an Android phone as the relay and the head unit’s own browser to show CarPlay. Nothing is installed on the head unit. The first setup takes about 10 minutes.

::: tip Before you start
- An iPhone with CarPlay
- An Android phone with Android 8.0 or later
- An Apple accessory (MFi) identity: `identity.pk8` and `certificate.p7b`, which you [supply yourself](/en/quick-start#mfi-identity)
:::

## Check the head unit’s browser {#step-check .step}

In the head unit’s browser, open [openxplay.org/check](/en/check). The page tests whether the browser can decode CarPlay’s video; continue once it says the browser works.

## Install OpenXPlay Relay {#step-install .step}

On the relay phone, download and install [openxplay-relay.apk](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk) (the latest release). If Android asks, allow installing apps from your browser or file manager.

::: details Need an earlier version, or want to build it yourself?
Earlier versions are on [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases), and what changed in each is in the [changelog](/en/changelog). You can also build the app yourself as the [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) README describes.
:::

## Answer the setup guide {#step-guide .step}

The first time you open the app, a setup guide asks three questions:

1. **How does the car show CarPlay?** Choose *Car browser*.
2. **How does the iPhone connect to this phone?** Choose *Wireless*: in the car, the iPhone connects by itself over Bluetooth and Wi-Fi. *USB cable* is not recommended: the relay phone has to power the iPhone through the cable, and only some cables work; a USB-C iPhone on a USB-C to USB-C cable usually isn’t found (see [Troubleshooting](/en/troubleshooting#usb-iphone-not-found)). The app asks you to confirm when you choose it.
3. **Which network does wireless CarPlay use?** The iPhone, the relay phone and the head unit must reach each other. Choose one for your car; open it for details:

::: details Wi-Fi Direct (recommended): the head unit has its own Wi-Fi hotspot {#network-wifi-direct}
The iPhone connects straight to the relay phone; the relay phone joins the head unit’s hotspot (or another Wi-Fi), over which the head unit opens the page.
:::

::: details This phone’s hotspot: the head unit has no hotspot but can join a Wi-Fi network {#network-hotspot}
The iPhone and the head unit both join the relay phone’s hotspot.

- Enter the hotspot name and password in the app exactly as in Android’s hotspot settings.
- Set the band to 5 GHz in Android’s hotspot settings: on 2.4 GHz the picture stutters easily. Switch back to 2.4 GHz only if the head unit can’t join a 5 GHz hotspot.
- Some phones open only a 2.4 GHz hotspot while connected to Wi-Fi; disconnect Wi-Fi first.
:::

::: details Shared Wi-Fi: there is already a Wi-Fi everyone can join {#network-shared}
The iPhone, the relay phone and the head unit join one Wi-Fi, such as a portable router. The router must let devices reach each other.
:::

## Finish the preparation {#step-prepare .step}

The guide lists what is still missing; work through it. You do this once; the app remembers it.

- **Allow the permissions:** nearby devices (Bluetooth), nearby Wi-Fi devices, notifications and the microphone. CarPlay offers Siri and calls only when the microphone is allowed. The USB connection also asks for Android VPN consent, which routes the iPhone’s network.
- **Import the CarPlay identity:** select `identity.pk8` and `certificate.p7b`, both at once in the file picker or one after the other in any order, or select a ZIP that contains both. If you pick only one, the app says which one is still missing.
- **Pair the iPhone** (wireless): on the iPhone, open Settings → Bluetooth, choose the relay phone and allow CarPlay when the iPhone asks.

## Connect the head unit’s network {#step-network .step}

Put the head unit and the relay phone on the network you chose in step 3:

- **Wi-Fi Direct:** turn on the head unit’s Wi-Fi hotspot and join it from the relay phone.
- **This phone’s hotspot:** turn on the relay phone’s hotspot and join it from the head unit.
- **Shared Wi-Fi:** join that Wi-Fi from both the relay phone and the head unit.

::: warning Give the hotspot a password
The Android relay uses no pairing code: opening the address connects. Be sure to give the hotspot a password and let only your own devices join.
:::

## Start CarPlay {#step-start .step}

On the guide’s last step, tap *Start CarPlay*. For the first connection, keep the iPhone unlocked and near the relay phone. If you chose *This phone’s hotspot* and the hotspot is off, the app says so and opens the hotspot settings; when you come back with it on, CarPlay starts by itself. Once CarPlay runs, the app’s home screen shows *Open this address in the car’s browser* with an address that starts with `https://`, such as `https://192.168.43.20:8443/`.

## Open the address in the head unit’s browser {#step-open .step}

1. Type the address from the home screen into the head unit’s browser. Note that it starts with `https://`, not `http://`, and include the port number after the colon.
2. The first time, the browser warns that it can’t verify the certificate. This is expected: choose *Advanced* (or similar), then continue to the page.
3. Bookmark the page so you can open it directly next time.

::: details Why the certificate warning, and is it safe?
The connection is still encrypted. Browsers allow WebCodecs video decoding only on secure pages, so the relay serves the page over HTTPS; the relay creates its own certificate, which no public authority has signed, so the browser can’t verify it and warns. Check that the address is your relay’s, then continue. See [Troubleshooting](/en/troubleshooting#certificate-warning); to remove the warning for good, see [Trusted HTTPS](/en/trusted-https).
:::

## Start using it {#step-use .step}

When the page asks for a tap, tap the screen once: the page goes full screen and turns on sound, and the tap doesn’t reach CarPlay. CarPlay then runs on the head unit’s screen and responds to your touches.

The gear button in a corner of the page adjusts the resolution, the CarPlay screen width and full screen; see [Head-unit page settings](/en/daily-use#web-settings).

## Next {#next-steps}

- [Everyday use and settings](/en/daily-use): how to connect on every drive after this, and the optional [car setting](/en/daily-use#car-model).
- [Trusted HTTPS](/en/trusted-https): remove the certificate warning with a free domain name.
- Something not working? See [Troubleshooting](/en/troubleshooting).
