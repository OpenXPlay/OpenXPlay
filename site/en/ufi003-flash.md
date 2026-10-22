---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: Flash the UFI003 base image (OpenStick Debian 11)
description: The OpenStick v1 base image the UFI003 needs to run the OpenXPlay Linux relay. Downloads, SHA-256 checksums, cautions before flashing, and the commands to re-flash a dongle that already runs OpenStick.
breadcrumb: Flash the UFI003 base image
prev:
  text: UFI003 as the relay
  link: /en/ufi003-relay
next:
  text: 'Continue: get the relay'
  link: /en/ufi003-relay#step-get
---

# Flash the UFI003 base image

The UFI003 runs OpenStick [release v1](https://github.com/OpenStick/OpenStick/releases/tag/v1) (published 2022-02-08), a Debian 11 system. This page is the first step of the [command-line install without Flasher](/en/ufi003-relay#manual); once the dongle is flashed, go back to [UFI003 as the relay](/en/ufi003-relay#step-get) to install the relay. The recommended ways are to [let an AI assistant install it](/en/ufi003-relay#ai) or to [install it yourself with Flasher](/en/ufi003-relay#flasher): OpenXPlay Flasher does the steps on this page and backs up the four modem partitions before flashing.

::: danger Before you flash
- The flash package replaces the partition table and the bootloader. The stock Android system won’t run afterwards, and OpenStick offers no way back.
- Back up the whole device before the first flash, and at the very least the partitions `modemst1`, `modemst2`, `fsc` and `fsg`: they hold modem calibration data unique to this device that can’t be recovered from anywhere else.
- Flashing erases everything on the device, including the CarPlay identity you added, the iPhone pairings and the Wi-Fi settings.
:::

## Download and check the files {#downloads}

OpenStick forbids commercial use, and OpenXPlay doesn’t redistribute these files: download them from OpenStick’s release page and check their SHA-256 (`shasum -a 256 FILE` on macOS, `sha256sum FILE` on Linux):

| File | Purpose |
| --- | --- |
| [`debian.zip`](https://github.com/OpenStick/OpenStick/releases/download/v1/debian.zip) (about 377 MB) | The Debian 11 root file system `rootfs.img`, plus a copy of `boot.img` |
| [`boot-ufi001c.img`](https://github.com/OpenStick/OpenStick/releases/download/v1/boot-ufi001c.img) | The kernel boot partition for the UFI003; not the same file as the generic `boot.img` in `debian.zip` |
| [`base-generic.zip`](https://github.com/OpenStick/OpenStick/releases/download/v1/base-generic.zip) | The bootloader and other low-level partitions with a flash script, needed only for the first flash from the stock system |

::: details SHA-256 checksums {#checksums}
| File | SHA-256 |
| --- | --- |
| `debian.zip` | `8be6f100e8fc3f612e0b03c199d01f51d38b953a19343ad0f4cf7a2f7a57f603` |
| `boot-ufi001c.img` | `a2b527e98a5cee0a4c3cad5099af7ce0648246f19d20d13ef2c168e400c81b33` |
| `base-generic.zip` | `b609b91c94b07d7cde4141a578df5c1440fbe75140f0c645c7124356774e2418` |
:::

The other `boot-*.img` and `firmware-*.zip` files on the release page are for other models; the UFI003 doesn’t need them.

## First flash from the stock system {#first-flash}

The first flash needs the bootloader and the flash script `flash.sh` from `base-generic.zip`. **Don’t run the script as is**, for the reasons below: run its commands line by line, and continue only once all four partitions have been read from your device and the files really were replaced.

::: details Why not just run flash.sh? {#flash-script}
`flash.sh` erases the boot partition and installs the new bootloader first, only then backs up the partitions `modemst1`, `modemst2`, `fsc` and `fsg` to `.bin` files of the same names, and finally writes them back. The zip already contains four such `.bin` files, three of them with real content that isn’t your device’s data. The script doesn’t stop when a step fails, so if the backup fails, the zip’s files are what gets written to your device.
:::

## Re-flash a dongle that runs OpenStick {#reflash}

To re-flash a UFI003 that already runs OpenStick, only the root file system and the boot partition need writing. Unpack `debian.zip`, put `boot-ufi001c.img` in its `debian` directory and run these commands there. Don’t run that directory’s `flash.sh` as it is: it writes the generic `boot.img`.

```sh
adb reboot bootloader
fastboot -S 200M flash rootfs rootfs.img
fastboot flash boot boot-ufi001c.img
fastboot reboot
```

::: warning Write rootfs.img with -S 200M
Write `rootfs.img` with fastboot’s `-S 200M` (the `flash.sh` in `debian.zip` does). With the default chunks of about 256 MB, the UFI003 fails halfway through.
:::
