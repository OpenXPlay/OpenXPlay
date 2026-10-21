---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: 'Quick start: CarPlay in the head unit’s browser'
description: Set up OpenXPlay step by step. Use an Android phone as the relay, pair your iPhone, then open CarPlay in the head unit’s browser. The UFI003 USB dongle and Carlink app routes are covered too.
breadcrumb: Quick start
schema: howto
howtoName: Show iPhone CarPlay in the head unit’s browser with an Android phone as the relay
howtoTools:
  - iPhone with CarPlay
  - Android phone (Android 8.0 or later) with the OpenXPlay Relay app
  - Apple accessory (MFi) identity that you supply
  - Android head unit with a browser that supports WebCodecs
---

# Quick start

The recommended setup is an Android phone as the relay and the head unit’s own browser to show CarPlay. Nothing is installed on the head unit. The first setup takes about 10 minutes; after that, each drive starts with opening the app and the same address in the head unit’s browser.

## What you need {#requirements}

| You need | Details |
| --- | --- |
| An iPhone with CarPlay | It connects to the relay phone wirelessly (Bluetooth and Wi-Fi) or by USB cable. |
| An Android phone as the relay | Android 8.0 or later, with the OpenXPlay Relay app. |
| An Apple accessory (MFi) identity | The two files `identity.pk8` and `certificate.p7b`. The repositories and their builds contain none; you supply your own. |
| The head unit’s browser | It must decode video with WebCodecs; step 1 checks it. |

Without an Android phone, a [UFI003 USB dongle](#ufi003-relay) can be the relay; if the head unit has no usable browser, try the [Carlink app](#carlink) (experimental).

## Head-unit browser, step by step {#browser-step-by-step}

### Step 1: Check the head unit’s browser {#step-check}

In the head unit’s browser, open [openxplay.org/check](/en/check). The page tests whether the browser can decode CarPlay’s video; continue once it says the browser works.

### Step 2: Install OpenXPlay Relay {#step-install}

On the relay phone, download and install [openxplay-relay.apk](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk) (the latest release; earlier versions are on [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases), and what changed is in the [changelog](/en/changelog)). If Android asks, allow installing apps from your browser or file manager. You can also build the app yourself as the [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) README describes.

### Step 3: Answer the setup guide {#step-guide}

The first time you open the app, a setup guide asks three questions:

1. **How does the car show CarPlay?** Choose *Car browser*.
2. **How does the iPhone connect to this phone?** Choose *Wireless*: in the car, the iPhone connects by itself over Bluetooth and Wi-Fi. *USB* connects the iPhone to the relay phone by cable and is the most stable.
3. **Which network does wireless CarPlay use?** The iPhone, the relay phone and the head unit must reach each other. Choose for your car:

| Choice | How it connects | Good for |
| --- | --- | --- |
| Wi-Fi Direct (recommended) | The iPhone connects straight to the relay phone; the relay phone joins the head unit’s hotspot (or another Wi-Fi), over which the head unit opens the page | Head units with their own Wi-Fi hotspot |
| This phone’s hotspot | The iPhone and the head unit both join the relay phone’s hotspot | Head units without a hotspot that can join a Wi-Fi network |
| Shared Wi-Fi | The iPhone, the relay phone and the head unit join one Wi-Fi, such as a portable router | An existing Wi-Fi everyone can join, whose router lets devices reach each other |

With this phone’s hotspot, enter the hotspot name and password exactly as in Android’s hotspot settings. Set the band to 5 GHz there: on 2.4 GHz the picture stutters easily. Switch back to 2.4 GHz only if the head unit can’t join a 5 GHz hotspot. Some phones open only a 2.4 GHz hotspot while connected to Wi-Fi; disconnect Wi-Fi first.

### Step 4: Finish the preparation {#step-prepare}

The guide lists what is still missing; work through it. You do this once; the app remembers it.

- **Allow the permissions:** nearby devices (Bluetooth), nearby Wi-Fi devices, notifications and the microphone. CarPlay offers Siri and calls only when the microphone is allowed. The USB connection also asks for Android VPN consent, which routes the iPhone’s network.
- **Import the CarPlay identity:** select `identity.pk8` and `certificate.p7b`, both at once in the file picker or one after the other in any order, or select a ZIP that contains both. If you pick only one, the app says which one is still missing.
- **Pair the iPhone** (wireless): on the iPhone, open Settings → Bluetooth, choose the relay phone and allow CarPlay when the iPhone asks.

### Step 5: Connect the head unit’s network {#step-network}

Put the head unit and the relay phone on the network you chose in step 3:

- **Wi-Fi Direct:** turn on the head unit’s Wi-Fi hotspot and join it from the relay phone.
- **This phone’s hotspot:** turn on the relay phone’s hotspot and join it from the head unit.
- **Shared Wi-Fi:** join that Wi-Fi from both the relay phone and the head unit.

### Step 6: Start CarPlay {#step-start}

On the guide’s last step, tap *Start CarPlay*. For the first connection, keep the iPhone unlocked and near the relay phone. Once CarPlay runs, the app’s home screen shows *Open this address in the car’s browser* with an address that starts with `https://`, such as `https://192.168.43.20:8443/`.

### Step 7: Open the address in the head unit’s browser {#step-open}

1. Type the address from the home screen into the head unit’s browser. Note that it starts with `https://`, not `http://`, and include the port number after the colon.
2. The first time, the browser warns that it can’t verify the certificate. This is expected: choose *Advanced* (or similar), then continue to the page. See [About the certificate warning](#certificate-warning).
3. Bookmark the page so you can open it directly next time.

### Step 8: Start using it {#step-use}

When the page asks for a tap, tap the screen once: the page goes full screen and turns on sound, and the tap doesn’t reach CarPlay. CarPlay then runs on the head unit’s screen and responds to your touches.

The gear button in a corner of the page opens the settings:

- **Resolution:** Automatic, Native, 1080p, 720p, Whole screen. Native uses the head unit’s own screen pixels: the sharpest picture, but it needs more Wi-Fi bandwidth, and the relay lowers it when the browser can’t decode it.
- **CarPlay screen width:** 125, 200, 250 or 300 mm. It is the size reported to the iPhone: larger values show more icons on one page; the default is 200 mm.
- **Full screen** and **Tap to return to full screen:** a reverse camera or another screen can make the browser leave full screen. Back on the page, it shows *Tap to return to full screen*; tap once and it does. Browsers allow full screen only after a tap, which is why this tap is needed. With *Tap to return to full screen* off, the page stays a window and CarPlay fits it.

After you change the resolution or the screen width, CarPlay reconnects in a few seconds.

### Step 9 (optional): Choose your car {#step-car}

In the app’s Settings → Car and screen, choose the car’s brand and model; the XPeng G6 2023 comes with built-in screen data. If your car isn’t listed, choose *Other* and type the brand and model.

*CarPlay view areas*, in the same place, is on by default: when the head unit’s browser window changes (entering or leaving full screen, split screen), CarPlay re-lays out to fit without reconnecting. The section also shows the head-unit screen data the relay has detected, which helps optimize the display at the next CarPlay start. If your car isn’t listed, tap *Copy my head-unit screen data* and send it to the developers in the [community](/en/#community), so a later release can include your car.

### Every drive after that {#daily}

1. Open OpenXPlay Relay and tap *Start with the last setup*. With automatic start on, the last setup starts by itself after 5 seconds.
2. Check that the head unit and the relay phone are on the same network.
3. Open the bookmarked address in the head unit’s browser and tap the screen once.

After an app update, the head-unit page reloads itself once to the new version.

::: tip No pairing code on the Android relay
Opening the address connects, so give the hotspot a password and let only your own devices join.
:::

## Other routes {#other-routes}

### UFI003 USB dongle (Linux relay) {#ufi003-relay}

The UFI003 is an msm8916 4G USB dongle. [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003) has the support files for running the Linux relay on it with the OpenStick Debian 11 image (kernel `5.15.0-handsomekernel+`, aarch64). The dongle’s Wi-Fi has no 5 GHz band, so its hotspot runs on 2.4 GHz.

1. **Prepare the dongle.** Flash the OpenStick Debian 11 image onto the UFI003; downloads and cautions are under [Base image](#ufi003-base-image) below.
2. **Get the relay.** Download `openxplay-relay-<version>-linux-aarch64.tar.gz` from [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases) and unpack it: it holds the two aarch64 binaries (`bin/openxplay-relay`, `bin/oxp-relay`), the web receiver (`web/`), the admin page (`admin/`) and `rust/packaging/`. Or build them yourself: the web receiver (`rust/web-receiver/` in [OpenXPlay-Stream](https://github.com/OpenXPlay/OpenXPlay-Stream)), the admin page (`admin-web/` in [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay)) and the aarch64 binaries with `rust/scripts/build-aarch64.sh` in both repositories.
3. **Make an install bundle.** On your computer, run `UFI003/install/make-bundle.sh` with the build outputs, the Debian packages recorded in `UFI003/install/debs.txt` and the relay’s packaging directory:

   ```sh
   sh UFI003/install/make-bundle.sh /tmp/ufi003-bundle /path/to/openxplay-relay /path/to/oxp-relay /path/to/web/dist /path/to/admin/dist /path/to/debs /path/to/OpenXPlay-Relay/rust/packaging
   ```

4. **Install it on the dongle.** Copy the `.tar.gz` to the dongle, unpack it into an empty directory and run `UFI003/install/install-ufi003.sh` from it as root. Put `--dry-run` before the arguments to verify everything without changing anything. The installer adds the Bluetooth RFCOMM module that wireless CarPlay needs, a fixed Bluetooth driver and a Bluetooth guard, and sets up the relay.
5. **Add your CarPlay identity.** Bundles never contain an Apple accessory (MFi) identity. Supply your own separately, as the [UFI003 README](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003#one-step-installer) describes, then start the relay.
6. **Open the admin page.** From a phone or computer on the relay’s network, open `https://openxplay-linux.local:6975`. Accept the certificate warning, log in (the login page shows the first-time password) and set your own admin password.
7. **Choose the network.** *This device’s hotspot*, the default, opens the relay’s own hotspot: the iPhone joins it automatically and the head unit joins it too. *Shared Wi-Fi* puts the relay, the iPhone and the head unit on one existing 2.4 GHz network.
8. **Pair the iPhone.** Choose Pair iPhone. Pairing stays open for 10 minutes; on the iPhone, open Settings → Bluetooth and choose the relay.
9. **Open it in the head unit’s browser.** Join the relay’s network from the head unit and open `https://10.77.0.1:8443/` (with the relay’s own hotspot) or `https://openxplay-linux.local:8443/`. Accept the certificate warning the first time. If pairing codes are turned on in the admin page, enter the 8-digit code the relay shows.

::: info To be confirmed
How a freshly installed dongle’s network is first reached for step 6 isn’t documented in the repositories yet. If you get stuck, ask in the [community](/en/#community).
:::

#### Base image {#ufi003-base-image}

The UFI003 runs OpenStick [release v1](https://github.com/OpenStick/OpenStick/releases/tag/v1) (published 2022-02-08). OpenStick forbids commercial use, and OpenXPlay doesn’t redistribute these files: download them from OpenStick’s release page and check their SHA-256 (`shasum -a 256 FILE` on macOS, `sha256sum FILE` on Linux):

| File | Purpose | SHA-256 |
| --- | --- | --- |
| [`debian.zip`](https://github.com/OpenStick/OpenStick/releases/download/v1/debian.zip) (about 377 MB) | The Debian 11 root file system `rootfs.img`, plus a copy of `boot.img` | `8be6f100e8fc3f612e0b03c199d01f51d38b953a19343ad0f4cf7a2f7a57f603` |
| [`boot-ufi001c.img`](https://github.com/OpenStick/OpenStick/releases/download/v1/boot-ufi001c.img) | The kernel boot partition for the UFI003; identical to the `boot.img` in `debian.zip` | `a2b527e98a5cee0a4c3cad5099af7ce0648246f19d20d13ef2c168e400c81b33` |
| [`base-generic.zip`](https://github.com/OpenStick/OpenStick/releases/download/v1/base-generic.zip) | The bootloader and other low-level partitions with a flash script, needed only for the first flash from the stock system | `b609b91c94b07d7cde4141a578df5c1440fbe75140f0c645c7124356774e2418` |

The other `boot-*.img` and `firmware-*.zip` files on the release page are for other models; the UFI003 doesn’t need them.

::: warning Before you flash
- The flash package replaces the partition table and the bootloader. The stock Android system won’t run afterwards, and OpenStick offers no way back.
- Back up the whole device before the first flash, and at the very least the partitions `modemst1`, `modemst2`, `fsc` and `fsg`: they hold modem calibration data unique to this device that can’t be recovered from anywhere else.
- `flash.sh` in `base-generic.zip` erases the boot partition and installs the new bootloader first, only then backs up those four partitions to `.bin` files of the same names, and finally writes them back. The zip already contains four such `.bin` files, three of them with real content that isn’t your device’s data. The script doesn’t stop when a step fails, so if the backup fails, the zip’s files are what gets written to your device. Don’t run the script as is: run it line by line and continue only once all four partitions have been read from your device and the files really were replaced.
- Write `rootfs.img` with fastboot’s `-S 200M` (the `flash.sh` in `debian.zip` does). With the default chunks of about 256 MB, the UFI003 fails halfway through.
- Flashing erases everything on the device, including the CarPlay identity you added, the iPhone pairings and the Wi-Fi settings.
:::

To re-flash a UFI003 that already runs OpenStick, only the root file system and the boot partition need writing. Unpack `debian.zip` and run these commands in its `debian` directory; the last three lines are the same as its `flash.sh`:

```sh
adb reboot bootloader
fastboot -S 200M flash rootfs rootfs.img
fastboot flash boot boot.img
fastboot reboot
```

### Carlink app (experimental) {#carlink}

The Carlink output is experimental and may fail to connect. It connects to the head unit’s Carlink app over Wi-Fi and always uses H.264 video.

1. **Turn on the Carlink output.** In the setup guide, choose *Carlink app* for how the car shows CarPlay, or set the relay’s output to browser and Carlink.
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
- **Can I avoid it?** Yes, with a free domain name: the relay gets a trusted certificate for it, and the page opens by that name without a warning. See [Trusted HTTPS](/en/trusted-https) (available from an upcoming relay release). On the Android relay you can also import your own certificate (a PKCS #12 `.p12` file) in the app.

## Next steps {#next-steps}

- Something not working? See [FAQ and troubleshooting](/en/faq).
- What changed in each release? See the [changelog](/en/changelog).
- Testing another head unit? Open [Check your head unit](/en/check) in its browser.
- Want to build or contribute? See [Developers and licensing](/en/developers).
