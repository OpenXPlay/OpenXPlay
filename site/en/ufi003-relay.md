---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: UFI003 USB dongle as the relay (Linux relay)
description: Set up a UFI003 USB dongle as the OpenXPlay Linux relay, preferably with OpenXPlay Flasher, or by hand. Flash OpenStick Debian, make and install the relay, add your CarPlay identity, pair your iPhone, then open CarPlay in the head unit’s browser.
breadcrumb: UFI003 as the relay
schema: howto
howtoName: Show iPhone CarPlay in the head unit’s browser with a UFI003 USB dongle as the Linux relay
howtoTools:
  - iPhone with CarPlay
  - UFI003 USB dongle
  - A computer
  - Apple accessory (MFi) identity that you supply
  - Android head unit with a browser that supports WebCodecs
next:
  text: Everyday use and settings
  link: /en/daily-use
---

# UFI003 USB dongle as the relay

The UFI003 is an msm8916 4G USB dongle. With the OpenStick Debian 11 system flashed onto it, it runs the OpenXPlay Linux relay: the relay starts by itself when the dongle is powered, and the head unit shows CarPlay in its own browser. [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003) has the support files it needs.

The UFI003’s Wi-Fi has no 5 GHz band, so its hotspot runs on 2.4 GHz.

## Install with OpenXPlay Flasher (recommended) {#flasher}

[OpenXPlay Flasher](https://github.com/OpenXPlay/OpenXPlay-Flasher) is a desktop app for Windows and macOS. Connect the UFI003 to the computer by USB and it recognises the dongle and lists the three layers to install: the base system (OpenStick Debian 11), device support and the OpenXPlay relay. It can install all three from scratch or update just one; when a new relay version comes out, usually only the relay layer needs updating, without flashing again.

::: info On Windows
The Windows version can so far only install and update device support and the relay, not flash the base system, and adb must already be running on the computer (`adb start-server` from the Android SDK Platform-Tools). The first install flashes the base system, so use a Mac for it, or flash the base image with the [manual install](#manual) below.
:::

::: details Download and open Flasher {#flasher-download}
Download the build for your system from [Releases](https://github.com/OpenXPlay/OpenXPlay-Flasher/releases) and check its SHA-256 against the `SHA256SUMS` file there. The builds aren’t signed with an Apple or Microsoft certificate, so the system asks before opening them the first time.

- **macOS 12 or later** (Apple silicon and Intel, `OpenXPlay-Flasher-<version>-macos-universal.dmg`): drag the app to Applications and open it once. On macOS 15 or later, when it says the app wasn’t opened, choose *Done*, then go to System Settings → Privacy & Security and choose *Open Anyway* next to the note about OpenXPlay Flasher. On macOS 12 to 14, Control-click the app, choose *Open*, then *Open* again.
- **Windows 10 or 11** (`openxplay-flasher-windows-amd64.exe`, or `-arm64.exe` on Arm PCs): when *Windows protected your PC* appears, choose *More info*, then *Run anyway*. If the app says the Microsoft Edge WebView2 runtime is missing, install it and open the app again.
:::

Once it’s open, Flasher takes you through these steps:

1. **Connect**: plug the UFI003 into the computer. Flasher shows the dongle’s serial number and the version of each layer. If the dongle still runs its original firmware, first confirm that it really is a UFI003.
2. **Choose**: the suggested action comes first, for example *Install / update relay*. The actions that erase the dongle (reinstall the base system, full reinstall, repair) are under *Reflash (erases the device)*.
3. **Prepare**: Flasher lists each file it needs with its SHA-256 and download links, but doesn’t download anything itself. Download the files from the links or another source you trust, then choose *Choose file…* or *Choose several files…*. Flasher recognises the files by their SHA-256, so their names don’t matter. Don’t move or delete them until the install has finished.
4. **Back up** (only when the base system is flashed): Flasher first reads the `modemst1`, `modemst2`, `fsc` and `fsg` partitions from the dongle and saves them to `OpenXPlay Backups` in your Documents folder. They hold modem calibration data unique to this dongle, so keep that folder for good. Actions that erase the dongle also ask you to type its serial number.
5. **Flash**: the dongle restarts a few times; don’t unplug it. If the connection is lost along the way, reconnect and choose *Repair*: Flasher writes the base system again and restores those four partitions from the earlier backup.
6. **Done**: Flasher checks the version of each layer. Here you can add your own CarPlay identity (choose the identity files, or a ZIP archive containing them, which go to the dongle over USB) and open the relay’s admin page over USB; the password for the first sign-in is shown on the sign-in page. Then carry on from [Choose the network](#step-network).

::: details Package list and signature {#flasher-catalog}
Flasher reads a signed package list from this website with the version, download links and SHA-256 of each layer. The signature shows that the list comes from OpenXPlay, and every file you choose must match the SHA-256 in it. If you need your own package list, you can turn off *Verify the package list signature* in Settings; files are then still checked against the SHA-256 in the list, and the base system’s files must still match OpenStick v1 exactly.
:::

## Manual install {#manual}

Installing by hand means flashing the dongle from a computer and running scripts on the command line, and flashing replaces the dongle’s original system. If you’re unsure, use Flasher above, or [use an Android phone as the relay](/en/android-relay).

## Flash the base image {#step-image .step}

Flash the OpenStick Debian 11 image (kernel `5.15.0-handsomekernel+`, aarch64) onto the UFI003. Downloads, checksums and the cautions to read before flashing are in [Flash the UFI003 base image](/en/ufi003-flash).

## Get the relay {#step-get .step}

Download `openxplay-relay-<version>-linux-aarch64.tar.gz` from [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases) and unpack it: it holds the two aarch64 binaries (`bin/openxplay-relay`, `bin/oxp-relay`), the web receiver (`web/`), the admin page (`admin/`) and `rust/packaging/`.

::: details Want to build it yourself?
Build the web receiver (`rust/web-receiver/` in [OpenXPlay-Stream](https://github.com/OpenXPlay/OpenXPlay-Stream)), the admin page (`admin-web/` in [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay)) and the aarch64 binaries with `rust/scripts/build-aarch64.sh` in both repositories.
:::

## Make an install bundle {#step-bundle .step}

On your computer, run `UFI003/install/make-bundle.sh` with the build outputs, the Debian packages recorded in `UFI003/install/debs.txt` and the relay’s packaging directory:

```sh
sh UFI003/install/make-bundle.sh /tmp/ufi003-bundle /path/to/openxplay-relay /path/to/oxp-relay /path/to/web/dist /path/to/admin/dist /path/to/debs /path/to/OpenXPlay-Relay/rust/packaging
```

## Install it on the dongle {#step-install .step}

Copy the `.tar.gz` to the dongle, unpack it into an empty directory and run `UFI003/install/install-ufi003.sh` from it as root. Put `--dry-run` before the arguments to verify everything without changing anything.

The installer adds the Bluetooth RFCOMM module that wireless CarPlay needs, a fixed Bluetooth driver and a Bluetooth guard, and sets up the relay.

## Add your CarPlay identity {#step-identity .step}

Bundles never contain an Apple accessory (MFi) identity. Supply your own separately, as the [UFI003 README](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003#one-step-installer) describes, then start the relay.

## Open the admin page {#step-admin .step}

From a phone or computer on the relay’s network, open `https://openxplay-linux.local:6975`. Accept the certificate warning, log in (the login page shows the first-time password) and set your own admin password.

::: info To be confirmed
How a freshly installed dongle’s network is first reached isn’t documented in the repositories yet. If you get stuck, ask in the [community](/en/community).
:::

## Choose the network {#step-network .step}

In the admin page, choose how the iPhone and the head unit reach the relay:

- **This device’s hotspot** (the default): opens the relay’s own hotspot; the iPhone joins it automatically and the head unit joins it too.
- **Shared Wi-Fi**: the relay, the iPhone and the head unit join one existing 2.4 GHz network.

## Pair the iPhone {#step-pair .step}

Choose *Pair iPhone*; pairing stays open for 10 minutes. On the iPhone, open Settings → Bluetooth and choose the relay.

## Open it in the head unit’s browser {#step-open .step}

Join the relay’s network from the head unit and open `https://10.77.0.1:8443/` (with the relay’s own hotspot) or `https://openxplay-linux.local:8443/`. Accept the certificate warning the first time; [Troubleshooting](/en/troubleshooting#certificate-warning) explains why it appears.

If pairing codes are turned on in the admin page, enter the 8-digit code the relay shows.

## Next {#next-steps}

- In cars such as the Xpeng G6, see the recommended setup under [Head units](/en/head-units), for example setting the frame rate to 30 on 2.4 GHz.
- [Trusted HTTPS](/en/trusted-https): remove the certificate warning with a free domain name.
- Something not working? See [Troubleshooting](/en/troubleshooting).
