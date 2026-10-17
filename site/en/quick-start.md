---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: 'Quick start: set up CarPlay through a relay'
description: Set up OpenXPlay step by step. Use an Android phone or a UFI003 USB dongle as the relay, pair your iPhone, then open CarPlay in the head unit’s browser or Carlink app.
breadcrumb: Quick start
schema: howto
howtoName: Set up OpenXPlay to show iPhone CarPlay on an Android head unit
howtoTools:
  - iPhone with CarPlay
  - 'Relay: an Android phone with the OpenXPlay Relay app, or a UFI003 USB dongle with the Linux relay'
  - Apple accessory (MFi) identity that you supply
  - Android head unit with a browser that supports WebCodecs, or a Carlink app
---

# Quick start

To use OpenXPlay you need an iPhone, a relay and a head unit whose browser supports WebCodecs (or that has a Carlink app). Set up the relay, pair your iPhone with it over Bluetooth, then open the car-screen address the relay shows in the head unit’s browser and accept the certificate warning the first time.

## What you need {#requirements}

| You need | Details |
| --- | --- |
| An iPhone with CarPlay | It connects to the relay wirelessly (Bluetooth and Wi-Fi), or by USB cable on the Android relay. |
| A relay | An Android phone (Android 8.0 or later) running the OpenXPlay Relay app, or a UFI003 USB dongle running the Linux relay. |
| An Apple accessory (MFi) identity | The repositories and their builds contain none. A working setup needs one that you supply. |
| An entry point on the head unit | A browser with WebCodecs video decoding — test it with [Check your head unit](/en/check) — or a Carlink app (experimental). |

## Choose a route {#choose-a-route}

| | Android phone as relay | UFI003 USB dongle |
| --- | --- | --- |
| Relay software | OpenXPlay Relay app | Linux relay |
| iPhone connection | Wireless (Wi-Fi Direct, this phone’s hotspot or shared Wi-Fi) or USB cable | Wireless, through the dongle’s own hotspot or a shared Wi-Fi |
| Hotspot band | Automatic, 2.4 GHz or 5 GHz | 2.4 GHz only |
| Carlink output | Needs Android 10 or later | Yes, experimental |
| Settings | In the app, and in the web admin page on port 6975 | In the web admin page on port 6975 |
| Getting the software | Build it from [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) | Build it and install a bundle with [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003) |

## Route A: Android phone as relay {#android-relay}

The OpenXPlay Relay app runs on an Android phone. It uses OpenXPlay-DiPlay as its CarPlay receiver and serves the web receiver to the head unit.

1. **Install OpenXPlay Relay.** Build the app from [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) as its README describes; the Android build expects OpenXPlay-DiPlay and OpenXPlay-Stream checked out next to it. Ready-made downloads are to be confirmed.
2. **Allow the permissions.** Open the app and allow what it asks for: nearby devices (Bluetooth), nearby Wi-Fi devices, notifications and the microphone. CarPlay offers Siri and calls only when the microphone is allowed. The USB connection also asks for Android VPN consent, which routes the iPhone’s network.
3. **Import your CarPlay identity.** In the app, import the accessory identity you supply. The app doesn’t start CarPlay without a valid one.
4. **Choose the connection and the output.** Under iPhone connection, choose Wireless — Wi-Fi Direct (recommended), this phone’s hotspot or shared Wi-Fi — or USB cable. Under Output, choose Car browser, Carlink app, or both.
5. **Pair the iPhone.** Tap Open Bluetooth settings on the relay phone, then on the iPhone open Settings → Bluetooth and choose the relay.
6. **Start CarPlay.** Tap Start. The app shows the address to open in the car’s browser, plus a pairing code if one is required. Continue with [On the head unit](#head-unit).

## Route B: UFI003 USB dongle (Linux relay) {#ufi003-relay}

The UFI003 is an msm8916 4G USB dongle. [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003) has the support files for running the Linux relay on it with the OpenStick Debian 11 image (kernel `5.15.0-handsomekernel+`, aarch64). The dongle’s Wi-Fi has no 5 GHz band, so its hotspot runs on 2.4 GHz.

1. **Prepare the dongle.** Run the OpenStick Debian 11 image on the UFI003.
2. **Build the relay.** Build the web receiver (`web/` in [OpenXPlay-Stream](https://github.com/OpenXPlay/OpenXPlay-Stream)), the admin page (`admin-web/` in [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay)) and the aarch64 binaries with `rust/scripts/build-aarch64.sh` in both repositories.
3. **Make an install bundle.** On your computer, run `UFI003/install/make-bundle.sh` with the build outputs, the Debian packages recorded in `UFI003/install/debs.txt` and the relay’s packaging directory:

   ```sh
   sh UFI003/install/make-bundle.sh /tmp/ufi003-bundle /path/to/openxplay-relay /path/to/oxp-relay /path/to/web/dist /path/to/admin/dist /path/to/debs /path/to/OpenXPlay-Relay/rust/packaging
   ```

4. **Install it on the dongle.** Copy the `.tar.gz` to the dongle, unpack it into an empty directory and run `UFI003/install/install-ufi003.sh` from it as root. Put `--dry-run` before the arguments to verify everything without changing anything. The installer adds the Bluetooth RFCOMM module that wireless CarPlay needs, a fixed Bluetooth driver and a Bluetooth guard, and sets up the relay.
5. **Add your CarPlay identity.** Bundles never contain an Apple accessory (MFi) identity. Supply your own separately, as the [UFI003 README](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003#one-step-installer) describes, then start the relay.
6. **Open the admin page.** From a phone or computer on the relay’s network, open `https://openxplay-linux.local:6975`. Accept the certificate warning, log in (the login page shows the first-time password) and set your own admin password.
7. **Choose the network.** *This device’s hotspot*, the default, opens the relay’s own hotspot: the iPhone joins it automatically and the head unit joins it too. *Shared Wi-Fi* puts the relay, the iPhone and the head unit on one existing 2.4 GHz network.
8. **Pair the iPhone.** Choose Pair iPhone. Pairing stays open for 10 minutes; on the iPhone, open Settings → Bluetooth and choose the relay. Continue with [On the head unit](#head-unit).

::: info To be confirmed
How a freshly installed dongle’s network is first reached for step 6 isn’t documented in the repositories yet. If you get stuck, ask in the [community](/en/#community).
:::

## On the head unit {#head-unit}

### Browser (web receiver) {#browser}

The web receiver is a page the relay serves to the head unit’s browser. The browser decodes CarPlay video with WebCodecs and sends your touches back to the iPhone. Test the browser first with [Check your head unit](/en/check).

1. **Join the relay’s network.** On the head unit, join the relay’s hotspot with the name and password shown in the relay app or admin page — or the shared Wi-Fi, if you chose that.
2. **Open the car-screen address.** In the head unit’s browser, open the address the relay lists under car-screen addresses. The receiver uses port 8443: with the Linux relay’s own hotspot the address is usually `https://10.77.0.1:8443/`, and the relay also offers a name such as `https://openxplay-linux.local:8443/`.
3. **Accept the certificate warning.** The first time, the browser warns that it can’t verify the certificate. This is expected; see [About the certificate warning](#certificate-warning).
4. **Enter the pairing code if asked.** If the relay requires a pairing code, enter the 8-digit code the relay shows.
5. **Tap for sound.** If the page says sound is paused, tap the screen once to allow audio. CarPlay then runs on the head unit’s screen.

### Carlink app (experimental) {#carlink}

The Carlink output connects to the head unit’s Carlink app over Wi-Fi and always uses H.264 video.

1. **Turn on the Carlink output.** In the relay, set the output to Carlink, or to browser and Carlink.
2. **Open Carlink on the head unit.** Start the head unit’s Carlink app.
3. **Pair with the code.** Enter the pairing code shown on the car screen into the relay and connect straight away; the code changes every 2 minutes.

| Relay | What to know |
| --- | --- |
| Android phone | Carlink needs Android 10 or later. A single Wi-Fi radio may not handle wireless CarPlay and Carlink together, so USB CarPlay is more reliable. |
| UFI003 | Its Wi-Fi is 2.4 GHz only, so it can’t join a head unit whose Carlink Wi-Fi runs on 5 GHz. |

## About the certificate warning {#certificate-warning}

The relay serves the receiver page over HTTPS because browsers allow WebCodecs video decoding only on secure pages. The relay creates its own certificate, which no public authority has signed, so the browser shows a warning the first time.

- **Is it safe?** The connection is still encrypted. The warning means the browser can’t verify who issued the certificate. Check that the address is your relay’s, then continue (the option is often under *Advanced*).
- **Why did it come back?** The relay made a new certificate. The Android relay does this when its network addresses change; the Linux relay does it when it replaces certificate files that were created while the device clock was wrong.
- **Can I avoid it?** On the Android relay you can import your own certificate (a PKCS #12 `.p12` file) in the app.

## Next steps {#next-steps}

- Something not working? See [FAQ and troubleshooting](/en/faq).
- Testing another head unit? Open [Check your head unit](/en/check) in its browser.
- Want to build or contribute? See [Developers and licensing](/en/developers).
