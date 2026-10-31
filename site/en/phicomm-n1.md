---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-30
title: Phicomm N1 TV box as the relay (Linux relay)
description: Set up a Phicomm N1 as the OpenXPlay Linux relay. Write Armbian to a USB drive and install it to the eMMC, install the N1 device package and the relay over SSH, set the Wi-Fi country, add your CarPlay identity, pair your iPhone and open CarPlay in the head unit’s browser.
breadcrumb: Phicomm N1 as the relay
schema: howto
howtoName: Use a Phicomm N1 TV box as the Linux relay and show iPhone CarPlay in the head unit’s browser
howtoTools:
  - iPhone with CarPlay
  - Phicomm N1 TV box with its 12 V power supply
  - USB drive of 8 GB or more
  - Computer with SSH, and a router for the N1’s network cable
  - Apple accessory (MFi) identity that you supply
  - Android head unit with a browser that supports WebCodecs
next:
  text: Everyday use and settings
  link: /en/daily-use
---

# Phicomm N1 as the relay <Badge type="info" text="Advanced" />

The Phicomm N1 is a TV box with an Amlogic S905D. With Armbian installed, it runs the OpenXPlay Linux relay: the relay starts whenever the box is powered, its hotspot can use 5 GHz, and the head unit shows CarPlay in its own browser or Carlink app. [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/PhicommN1) provides the N1’s device package.

You install everything from a computer over SSH, so this guide is for people who are comfortable with the command line. OpenXPlay Flasher can’t install the N1 yet; see [OpenXPlay Flasher](#flasher).

::: warning At your own risk
- Writing Armbian to the eMMC erases the N1’s current system.
- We haven’t yet tested CarPlay end to end with an iPhone on the N1. Every Linux relay release so far is a pre-release; [Other Linux devices](/en/linux-devices) lists what hasn’t been tested on a device yet.
- Tell the [community](/en/community) how it went, with the relay and device package versions.
:::

| N1 hardware | What it means for the relay |
| --- | --- |
| BCM43455 Wi-Fi, 2.4 GHz and 5 GHz | The relay’s hotspot can use 5 GHz, so the picture stutters less |
| BCM4345C0 Bluetooth, Classic and Low Energy | Both wireless CarPlay and Carlink work |
| Gigabit Ethernet | Connects to a router while you install and manage it |
| Two USB 2.0 ports | Room for a USB Wi-Fi adapter; see [Network and Wi-Fi](#wifi) |
| 12 V DC power | In the car, too, it needs a supply that delivers a steady 12 V |

## What you need {#requirements}

| You need | Notes |
| --- | --- |
| A Phicomm N1 | With its 12 V power supply |
| A USB drive | 8 GB or more; everything on it is erased. Keep it afterwards as a rescue drive |
| A network cable and a router | The N1 is wired to the router while you install; the computer joins the same router |
| A computer | Windows, macOS or Linux that can write a USB drive and run `ssh` (built into Windows 10 and 11) |
| An Apple accessory (MFi) identity | `identity.pk8` and `certificate.p7b`, supplied by you; see [What is an Apple accessory (MFi) identity?](/en/quick-start#mfi-identity) |

## Write Armbian to a USB drive {#usb .step}

We test with ophub’s [amlogic-s9xxx-armbian](https://github.com/ophub/amlogic-s9xxx-armbian): from the release [`Armbian_trixie_arm64_server_2026.10`](https://github.com/ophub/amlogic-s9xxx-armbian/releases/tag/Armbian_trixie_arm64_server_2026.10), download `Armbian_26.11.0_amlogic_s905d_trixie_6.12.112_server_2026.10.15.img.gz` (Debian 13, kernel 6.12). Its SHA-256 should be:

```text
2a5838ff490db59065f9ab29c6762ea459b08e7ff6802ef22fa1329bfaf37fff
```

Check it with `certutil -hashfile <file> SHA256` on Windows, `shasum -a 256 <file>` on macOS or `sha256sum <file>` on Linux. Then unpack the `.img` file and write it to the USB drive with [balenaEtcher](https://etcher.balena.io/) or [Rufus](https://rufus.ie/) (Windows).

The device package needs Debian 13 (trixie). ophub’s other Debian 13 images for the N1, such as the one with kernel 6.18, should work too but haven’t been tested.

## Boot the N1 from the USB drive {#boot .step}

1. Connect the N1 to the router with a network cable, plug in the USB drive, then plug in the power.
2. After about 2 minutes, find the device named Armbian in the router’s device list and note its IP address.

::: details The N1 didn’t boot from the USB drive? {#boot-usb}
- An N1 that has run a third-party system such as Armbian or OpenWrt usually boots from the USB drive as soon as it is powered with the drive in.
- An N1 that still runs Phicomm’s original system needs ADB debugging turned on in that system first. Then run these two commands on the computer, and the N1 restarts from the USB drive. Some versions of the original system can’t turn on ADB until they are downgraded; follow an N1 community guide for that.

  ```sh
  adb connect <N1 IP>
  adb shell reboot update
  ```

- Try the other USB port.

ophub’s documentation covers this in [Setting the box to boot from USB/TF/SD](https://github.com/ophub/amlogic-s9xxx-armbian/blob/main/documents/README.md#124-setting-the-box-to-boot-from-usbtfsd).
:::

## Install the system to the eMMC {#emmc .step}

Sign in to the N1 from the computer. The default user is `root` with the password `1234`:

```sh
ssh root@<N1 IP>
```

On the first sign-in, Armbian asks you to change the root password and to create a user; follow the prompts, and sign in as that user from then on. Then write the system to the eMMC:

```sh
armbian-install
```

Enter `101` (Phicomm-N1), then `1` (ext4), and wait for it to finish. Then shut down:

```sh
poweroff
```

After about 30 seconds, unplug the power and the USB drive, then plug the power back in: while the USB drive is in, the N1 boots from it first. Once the N1 has booted from the eMMC, sign in as the user you created. The IP address usually stays the same; if it changed, look it up in the router again.

```sh
ssh <user>@<N1 IP>
```

::: details Want to keep the original system? {#backup}
Before writing to the eMMC, run `armbian-ddbr` in Armbian on the USB drive and enter `b`. It backs up the original system to `/ddbr/BACKUP-arm-64-emmc.img.gz` on the USB drive; copy that file to your computer. To go back later, boot from the USB drive, run the same command and enter `r`. ophub’s documentation covers this in [Backup and Restore Using Armbian-ddbr](https://github.com/ophub/amlogic-s9xxx-armbian/blob/main/documents/README.md#1231-backup-and-restore-using-armbian-ddbr).
:::

## Install the device package {#device .step}

From the OpenXPlay-Hardware [Releases](https://github.com/OpenXPlay/OpenXPlay-Hardware/releases), choose the newest `phicomm-n1-device-v` release (all are pre-releases so far; 0.1.1-beta.1 or later is required). On the N1, download it, check its SHA-256, unpack it and run its installer. Set `V` to the newest version; `--dry-run` checks everything without changing anything:

```sh
V=0.1.1-beta.1
base=https://github.com/OpenXPlay/OpenXPlay-Hardware/releases/download/phicomm-n1-device-v$V
curl -fL -O "$base/openxplay-phicomm-n1-device-$V.tar.gz" -O "$base/SHA256SUMS"
sha256sum --ignore-missing -c SHA256SUMS
tar -xzf openxplay-phicomm-n1-device-$V.tar.gz
D=openxplay-phicomm-n1-device-$(echo "$V" | sed 's/-/~/')
sudo sh "$D/install-device.sh" --dry-run
sudo sh "$D/install-device.sh"
sudo reboot
```

The unpacked folder writes a pre-release version with `~` in place of `-` (such as `0.1.1~beta.1`); `D` is that folder. After the reboot, sign in again and check the install:

```sh
V=0.1.1-beta.1
sudo sh "openxplay-phicomm-n1-device-$(echo "$V" | sed 's/-/~/')/install-device.sh" --verify
```

| Command | Its last line should be |
| --- | --- |
| `--dry-run` | `OXP-STAGE device preflight-ok version=<version>` |
| Install | `OXP-STAGE device ok version=<version> reboot=required` |
| `--verify` | `OXP-STAGE device verified version=<version>` |

`<version>` is written as in the folder name.

The device package brings the Debian packages the relay needs that Armbian lacks, such as BlueZ, so it installs offline. It:

- installs the host profile `/etc/openxplay/host.json`;
- gives Wi-Fi and Bluetooth their own addresses, derived from the Ethernet MAC address; otherwise every N1 shares the same ones;
- fixes the Ethernet PHY at boot, and again after a kernel update with `armbian-update`;
- installs newer Cypress Wi-Fi firmware, so 5 GHz channels 36 to 48 work under the CN country code. The stock firmware allows only 149 to 165; 52 to 144 stay disabled.

::: details The N1 can’t reach GitHub? {#offline}
Download both files on the computer, check the SHA-256 there, copy them to the N1, set `V` there, and carry on from the `tar` line:

```sh
scp openxplay-phicomm-n1-device-<version>.tar.gz SHA256SUMS <user>@<N1 IP>:
```

Copy the relay package in the next step the same way.
:::

## Install the relay {#relay .step}

Take the newest `linux-v` release from [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases) (all are pre-releases so far); it is `linux-v0.1.6-beta.3` now:

```sh
V=0.1.6-beta.3
base=https://github.com/OpenXPlay/OpenXPlay-Relay/releases/download/linux-v$V
curl -fL -O "$base/openxplay-relay_${V}_arm64.deb" -O "$base/SHA256SUMS"
sha256sum --ignore-missing -c SHA256SUMS
sudo apt-get install --no-install-recommends ./openxplay-relay_${V}_arm64.deb
```

Set `V` to the newest version. The device package already installed the dependencies, so this step works offline. The relay runs as a system service and starts at boot; [Install the relay](/en/linux-devices#install) lists what the package installs.

## Open the admin page {#admin .step}

On a phone or computer on the same network, open `https://<N1 IP>:6975`. The browser warns that the certificate isn’t trusted; continue to the page. The first password is `openxplay`: sign in, then change it. If you forget it, see [Forgot the admin password?](/en/linux-devices#reset-password)

## Set the Wi-Fi country {#country .step}

In the admin page, open **iPhone connection → Wireless network** and set **Wi-Fi country** to where you are, for example `CN` in mainland China.

Left at *System setting*, the N1 usually follows the worldwide rules (`00`): no 5 GHz channel may host a hotspot, so the relay opens its hotspot on 2.4 GHz channel 6. With `CN` and the device package installed, the N1 can host its hotspot on 5 GHz channels 36 to 48 and 149 to 165.

## Add your CarPlay identity {#identity .step}

In the admin page, open **Developer options → Identity and certificates** and choose `identity.pk8` and `certificate.p7b`, or a ZIP that contains both. You can also [put the files in place by hand](/en/linux-devices#identity).

## Answer the setup guide {#setup .step}

Work through the admin page’s setup guide: your car, the output (the head unit’s browser, its Carlink app, or both) and the network, then what it lists under getting ready. The relay’s own hotspot is `OpenXPlay-Linux-XXXX` with the password `openxplay`, unless you set your own. [Answer the setup guide](/en/linux-devices#setup) explains each choice.

## Pair the iPhone {#pair .step}

Choose *Pair iPhone*; pairing stays open for 10 minutes. On the iPhone, open Settings → Bluetooth and choose `OpenXPlay Linux`.

## Open CarPlay on the head unit {#head-unit .step}

Join the relay’s hotspot from the head unit and open `https://10.77.0.1:8443/` in its browser; the admin page lists the head-unit address. Accept the certificate warning the first time; [Troubleshooting](/en/troubleshooting#certificate-warning) explains why it appears. For the Carlink app, see [Carlink app](/en/carlink).

The N1 is now ready for the car: give it 12 V and the relay starts by itself. In the car, a phone that joins the relay’s hotspot reaches the admin page at `https://10.77.0.1:6975`.

## Network and Wi-Fi {#wifi}

- The N1 can run its hotspot and a Wi-Fi station connection together only on one shared channel.
- With Carlink, the relay joins the car’s Wi-Fi as a station. The N1 has one Wi-Fi radio, so the iPhone follows the relay onto the car’s network.
- You can add a USB Wi-Fi adapter (for example an RTL8822BU) and give it Carlink or the admin hotspot under **iPhone connection → Wireless network → Interfaces and network roles** in the admin page. This hasn’t been fully tested yet.
- The network cable can stay plugged in: at home, open the admin page or sign in over SSH at the address the router gave the N1.

## Updates {#updates}

- **Relay:** download and check the new `.deb`, then run `sudo openxplay-relay-update openxplay-relay_<version>_arm64.deb`. If the new version doesn’t come up, it puts the previous one back; see [Update the relay](/en/linux-devices#update).
- **Device package:** install the newer bundle as in [Install the device package](#device), then reboot. The installer never downgrades installed packages.
- **Armbian kernel:** after `armbian-update` installs a new kernel, the device package fixes the Ethernet PHY again by itself.

## OpenXPlay Flasher {#flasher}

OpenXPlay Flasher has an N1 profile that installs the device package and the relay over SSH on the network, and its signed package list lists both N1 packages. Installing the N1 with Flasher hasn’t been tested on a real device yet, so install by hand with this guide until it has. Flasher doesn’t install Armbian.

## Uninstall {#uninstall}

```sh
sudo apt-get purge openxplay-relay
sudo apt-get purge openxplay-phicomm-n1
```

The first command removes the relay and keeps the settings, pairings and identity in `/var/lib/openxplay`; delete them with `sudo rm -rf /var/lib/openxplay` once you no longer need them. The second removes the device package and puts the original boot device tree back. To go back to the original system, see [Want to keep the original system?](#backup)

The device package uses the OpenXPlay-Hardware licence: open source, no commercial use; see [Licensing](/en/licensing#licenses).

## Next {#next-steps}

- [Everyday use and settings](/en/daily-use): connecting on each drive, and the head-unit page’s settings.
- [Trusted HTTPS](/en/trusted-https): remove the certificate warning with a free domain name.
- Something not working? See [Troubleshooting](/en/troubleshooting), and tell the [community](/en/community) how your N1 did.
