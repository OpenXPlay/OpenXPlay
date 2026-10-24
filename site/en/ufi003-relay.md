---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: UFI003 USB dongle as the relay (Linux relay)
description: Set up a UFI003 USB dongle as the OpenXPlay Linux relay. The recommended way is to let an AI assistant on your computer read the install instructions and install it with OpenXPlay Flasher; you can also install it yourself in the Flasher app. Then add your CarPlay identity, pair your iPhone and open CarPlay in the head unit’s browser.
breadcrumb: UFI003 as the relay
schema: howto
howtoName: Show iPhone CarPlay in the head unit’s browser with a UFI003 USB dongle as the Linux relay
howtoTools:
  - iPhone with CarPlay
  - UFI003 USB dongle
  - A computer with Windows 10 / 11 or macOS 12 or later
  - Apple accessory (MFi) identity that you supply
  - Android head unit with a browser that supports WebCodecs
next:
  text: Everyday use and settings
  link: /en/daily-use
---

# UFI003 USB dongle as the relay

The UFI003 is an msm8916 4G USB dongle. With the OpenStick Debian 11 system flashed onto it, it runs the OpenXPlay Linux relay: the relay starts by itself when the dongle is powered, and the head unit shows CarPlay in its own browser. [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003) has the support files it needs.

The UFI003’s Wi-Fi has no 5 GHz band, so its hotspot runs on 2.4 GHz.

## Two ways to install {#install}

[OpenXPlay Flasher](https://github.com/OpenXPlay/OpenXPlay-Flasher) on your computer does the installing. It puts three layers on the dongle: the base system (OpenStick Debian 11), device support and the OpenXPlay relay. When a new relay version comes out, usually only the relay layer needs updating, without flashing again.

| | Let an AI assistant install it (recommended) | Install it yourself with Flasher |
| --- | --- | --- |
| What you do | Send one message to the AI assistant on your computer and confirm at the key moments | Open the Flasher app and follow its steps |
| Downloading and checking files | The AI downloads them from the signed package list and checks them | You download them from the links Flasher shows; Flasher checks them |
| Suits you if | You already use an AI assistant that can run commands, such as Claude Code or Codex | You want to see every step yourself, or you don’t use such an assistant |

Both ways use the same Flasher and the same signed package list, with the same backup before flashing and the same safety checks. Windows has native adb and fastboot support from 0.2.0-beta.2; see below for the drivers it needs and the preview's validation status.

## Let an AI assistant install it (recommended) {#ai}

We wrote [install instructions for AI assistants](https://openxplay.org/agents/ufi003-install.md). An assistant that has read them downloads Flasher and the files it needs on your computer, checks their SHA-256 and installs everything with Flasher’s command line; when something goes wrong, it can deal with your computer’s actual situation. You need an AI assistant that can run commands on your computer, such as [Claude Code](https://claude.com/claude-code) or [OpenAI Codex](https://github.com/openai/codex).

1. Plug the UFI003 directly into the computer by USB, not through an unpowered hub. Unplug other phones if you can.
2. Open the AI assistant and send it this message:

   ```text
   Read https://openxplay.org/agents/ufi003-install.md
   and follow it exactly to turn the UFI003 USB dongle plugged into
   this computer into an OpenXPlay relay with OpenXPlay Flasher.
   Tell me what each step will do before you run it, and wait for me
   to type the dongle's serial number before anything erases it.
   ```

3. Answer the assistant’s questions. These things are up to you:
   - check that the device the assistant found is your UFI003, by its serial number;
   - type the dongle’s serial number yourself before anything erases it;
   - keep the dongle plugged in, and keep the computer powered and awake, while it installs;
   - add your own CarPlay identity, as described under [Add your CarPlay identity](#step-identity).

When the install is done, the assistant tells you how to open the relay’s admin page. Then carry on from [Choose the network](#step-network).

::: warning Watch the commands the assistant runs
The AI assistant runs commands on your computer. Use an assistant you trust and look at each command it wants to run; ask it to explain anything you don’t understand. The instructions tell it to work only on this UFI003, leave the computer’s other devices alone, never read your identity files, never turn off the signature check and never rewrite partitions with fastboot by itself.
:::

## Install it yourself with Flasher {#flasher}

Flasher is a desktop app for Windows and macOS. Connect the UFI003 to the computer by USB and it recognises the dongle, shows the version of each layer and takes you through the install.

::: info On Windows
Version 0.2.0-beta.2 and later support adb and fastboot natively through WinUSB. An external adb server is not required; an already-running adb server can still be used.

Listing devices needs no adb driver, but communication requires the matching interface to use the **WinUSB** driver. If a device is listed but cannot communicate, check its **ADB interface** in Device Manager, or its **fastboot interface** after entering the bootloader; each mode may need its driver installed separately. Change only that interface. Keep the **RNDIS network adapter** and its network driver intact, and do not replace the driver for the whole USB composite device.
:::

::: warning Preview validation status
A relay upgrade, fastboot device identification and data transfer to RAM have been verified on real Windows hardware. A complete erase and base-system flash still need hardware validation. A full install from stock firmware also needs the signed package list to include the corrected [device support bundle 0.2.1](https://github.com/OpenXPlay/OpenXPlay-Hardware/releases/tag/ufi003-device-v0.2.1). Files must match the signed list; do not substitute a new bundle for an older one listed there.
:::

::: details Download and open Flasher {#flasher-download}
Choose **0.2.0-beta.2 or later**, including pre-releases, from [Releases](https://github.com/OpenXPlay/OpenXPlay-Flasher/releases). Download the build for your system and check its SHA-256 against that release's `SHA256SUMS` file. The builds aren’t signed with an Apple or Microsoft certificate, so the system asks before opening them the first time.

- **macOS 12 or later** (Apple silicon and Intel, `OpenXPlay-Flasher-<version>-macos-universal.dmg`): drag the app to Applications and open it once. On macOS 15 or later, when it says the app wasn’t opened, choose *Done*, then go to System Settings → Privacy & Security and choose *Open Anyway* next to the note about OpenXPlay Flasher. On macOS 12 to 14, Control-click the app, choose *Open*, then *Open* again.
- **Windows 10 or 11** (`openxplay-flasher-windows-amd64.exe`, or `-arm64.exe` on Arm PCs): when *Windows protected your PC* appears, choose *More info*, then *Run anyway*. If the app says the Microsoft Edge WebView2 runtime is missing, install it and open the app again.
:::

Once it’s open, Flasher takes you through these steps:

1. **Connect**: plug the UFI003 into the computer. Flasher shows the dongle’s serial number and the version of each layer. A brand-new dongle still runs its original firmware and appears in the list of *other Android devices … connected and ignored*, with its model (usually `msm8916_32_512`) and serial number; check them, then choose *This is a UFI003 with its original firmware*, and Flasher reads the model to confirm it.
2. **Choose**: the suggested action comes first, for example *Install OpenXPlay from the original firmware* for a new dongle or *Install / update relay* for one that is already set up. The other actions that erase the dongle (reinstall the base system, full reinstall, repair) are under *Reflash (erases the device)*.
3. **Prepare**: Flasher lists each file it needs with its SHA-256 and download links, but doesn’t download anything itself. Download the files from the links or another source you trust, then choose *Choose file…* or *Choose several files…*. Flasher recognises the files by their SHA-256, so their names don’t matter. Don’t move or delete them until the install has finished.
4. **Back up** (only when the base system is flashed): Flasher first reads the `modemst1`, `modemst2`, `fsc` and `fsg` partitions from the dongle and saves them to `OpenXPlay Backups` in your Documents folder. They hold modem calibration data unique to this dongle, so keep that folder for good. Actions that erase the dongle also ask you to type its serial number.
5. **Flash**: Flasher first shows what this install does and roughly how long it takes (6 to 7 minutes from the original firmware). The dongle restarts a few times; don’t unplug it. If the connection is lost along the way, reconnect and choose *Repair*: Flasher carries on where it stopped and restores those four partitions from the earlier backup.
6. **Done**: Flasher checks the version of each layer, and under *Next steps* offers buttons to [add your CarPlay identity](#step-identity) and to open the relay’s admin page over USB.

::: details Package list and signature {#flasher-catalog}
Flasher reads a signed package list from this website with the version, download links and SHA-256 of each layer. The signature shows that the list comes from OpenXPlay, and every file you choose must match the SHA-256 in it. If you need your own package list, you can turn off *Verify the package list signature* in Settings; files are then still checked against the SHA-256 in the list, and the base system’s files must still match OpenStick v1 exactly.
:::

## After the install {#after-install}

Whichever way you installed, the next steps are the same.

## Add your CarPlay identity {#step-identity .step}

Install packages never contain an Apple accessory (MFi) identity; you supply your own. With the dongle connected to the computer by USB, open Flasher and choose *Choose identity files or ZIP…* under *Next steps*. Select the private key and the certificate (DER or PEM, in any order and with any file names), or a ZIP containing `identity.pk8` and `certificate.p7b`. Flasher copies them to the dongle over USB and restarts the relay.

## Open the admin page {#step-admin .step}

With the dongle connected to the computer by USB, choose *Open the relay admin page over USB* under *Next steps* in Flasher. Once you are on the relay’s network, you can also open `https://openxplay-linux.local:6975` from a phone or computer. The browser shows a certificate warning; carry on to the page. The password for the first sign-in is shown on the sign-in page; after signing in, set your own admin password.

## Choose the network {#step-network .step}

In the admin page, choose how the iPhone and the head unit reach the relay:

- **This device’s hotspot** (the default): opens the relay’s own hotspot; the iPhone joins it automatically and the head unit joins it too.
- **Shared Wi-Fi**: the relay, the iPhone and the head unit join one existing 2.4 GHz network.

## Pair the iPhone {#step-pair .step}

Choose *Pair iPhone*; pairing stays open for 10 minutes. On the iPhone, open Settings → Bluetooth and choose the relay.

## Open it in the head unit’s browser {#step-open .step}

Join the relay’s network from the head unit and open `https://10.77.0.1:8443/` (with the relay’s own hotspot) or `https://openxplay-linux.local:8443/`. Accept the certificate warning the first time; [Troubleshooting](/en/troubleshooting#certificate-warning) explains why it appears.

If pairing codes are turned on in the admin page, enter the 8-digit code the relay shows.

## Install from the command line without Flasher {#manual}

If you want to use only the command line and not Flasher, you can flash the dongle by hand and install the relay with scripts. This skips Flasher’s backup and checks, and flashing replaces the dongle’s original system, so make sure you understand each step.

::: details Show the command-line steps

### Flash the base image {#step-image}

Flash the OpenStick Debian 11 image (kernel `5.15.0-handsomekernel+`, aarch64) onto the UFI003. Downloads, checksums and the cautions to read before flashing are in [Flash the UFI003 base image](/en/ufi003-flash).

### Get the relay {#step-get}

Download `openxplay-relay-<version>-linux-aarch64.tar.gz` from [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases) and unpack it: it holds the two aarch64 binaries (`bin/openxplay-relay`, `bin/oxp-relay`), the web receiver (`web/`), the admin page (`admin/`) and `rust/packaging/`.

To build it yourself, build the web receiver (`rust/web-receiver/` in [OpenXPlay-Stream](https://github.com/OpenXPlay/OpenXPlay-Stream)), the admin page (`admin-web/` in [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay)) and the aarch64 binaries with `rust/scripts/build-aarch64.sh` in both repositories.

### Make an install bundle {#step-bundle}

On your computer, run `UFI003/install/make-bundle.sh` with the build outputs, the Debian packages recorded in `UFI003/install/debs.txt` and the relay’s packaging directory:

```sh
sh UFI003/install/make-bundle.sh /tmp/ufi003-bundle /path/to/openxplay-relay /path/to/oxp-relay /path/to/web/dist /path/to/admin/dist /path/to/debs /path/to/OpenXPlay-Relay/rust/packaging
```

### Install it on the dongle {#step-install}

Copy the `.tar.gz` to the dongle, unpack it into an empty directory and run `UFI003/install/install-ufi003.sh` from it as root. Put `--dry-run` before the arguments to verify everything without changing anything. The installer adds the Bluetooth RFCOMM module that wireless CarPlay needs, a fixed Bluetooth driver and a Bluetooth guard, and sets up the relay.

Then carry on from [Add your CarPlay identity](#step-identity), or put the identity in place by hand as the [UFI003 README](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003#one-step-installer) describes.

:::

## Next {#next-steps}

- In cars such as the Xpeng G6, see the recommended setup under [Head units](/en/head-units), for example setting the frame rate to 30 on 2.4 GHz.
- [Trusted HTTPS](/en/trusted-https): remove the certificate warning with a free domain name.
- Something not working? See [Troubleshooting](/en/troubleshooting).
