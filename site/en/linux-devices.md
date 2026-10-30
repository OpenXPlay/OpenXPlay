---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-29
title: 'Linux relay on other devices: requirements and manual install'
description: Check whether an arm64 Linux board, TV box or dongle can run the OpenXPlay Linux relay, install the relay by hand from its Debian package, add your CarPlay identity and pair your iPhone. Includes what is known about the Phicomm N1.
breadcrumb: Linux relay on other devices
schema: howto
howtoName: Install the OpenXPlay Linux relay by hand on an arm64 Linux device
howtoTools:
  - iPhone with CarPlay
  - arm64 Linux device with systemd, NetworkManager, BlueZ, Bluetooth Classic and Wi-Fi that can run an access point
  - Apple accessory (MFi) identity that you supply
  - Android head unit with a browser that supports WebCodecs
next:
  text: Everyday use and settings
  link: /en/daily-use
---

# Linux relay on other devices <Badge type="info" text="Advanced" />

Besides the UFI003, the OpenXPlay Linux relay can run on other arm64 Linux devices: boards, TV boxes and dongles. This page is for people who are comfortable with SSH and the command line. It shows how to tell whether a device can run the relay, how to install it by hand, and what is known about the Phicomm N1. As always, nothing is installed on the head unit.

The UFI003 has its own guided installer: see [UFI003 USB dongle as the relay](/en/ufi003-relay). OpenXPlay Flasher can’t install other devices yet. On a Phicomm N1, start with [its section](#phicomm-n1).

::: warning At your own risk
Installing the relay by hand on another device is at your own risk. Every Linux release so far is a pre-release, and 0.1.6-beta.3 has not yet been tested on a device with: CarPlay with an iPhone, Carlink with a car, a Tesla, the UFI003, WPA3, issuing a Trusted HTTPS certificate, hardware encoding, Wi-Fi Direct, I2C, CH341 and remote MFi, and audio on the relay. Tell the [community](/en/community) what worked and what didn’t, with the device, its system and the relay version.
:::

## Requirements {#requirements}

| Requirement | Why it matters | How to check | |
| --- | --- | --- | --- |
| 64-bit ARM (aarch64) | Releases are built only for aarch64. They are static musl binaries, so the glibc or Debian version doesn’t matter to them. | `uname -m` prints `aarch64`; for the `.deb`, `dpkg --print-architecture` prints `arm64` | Required |
| systemd as init | The relay runs as the systemd service `openxplay-relay.service`. | `ps -p 1 -o comm=` prints `systemd` | Required |
| NetworkManager | `nmcli` builds every hotspot and Wi-Fi connection; its shared mode, with `dnsmasq-base`, hands out addresses (DHCP). | `systemctl is-active NetworkManager` | Required |
| BlueZ | The relay uses `bluetoothd` over D-Bus and the tools `sdptool`, `hciconfig` and `btmgmt`. | `systemctl is-active bluetooth`; `command -v sdptool hciconfig btmgmt` | Required |
| `iw` | The relay reads the Wi-Fi adapter’s modes, channels and country with it. | `command -v iw` | Required |
| Bluetooth Classic (BR/EDR) | Wireless CarPlay talks iAP2 over RFCOMM, a Bluetooth Classic protocol. An adapter with only Bluetooth Low Energy can’t work. | `btmgmt info` lists `br/edr` | Required |
| RFCOMM in the kernel | For the same reason. The UFI003’s kernel lacked it; its device package adds `rfcomm.ko`. | `sudo modprobe rfcomm` | Required |
| Wi-Fi that can run an access point (AP mode) | The relay’s own hotspot, the default network, needs it. | `iw list` shows `AP` under *Supported interface modes* | Required |
| Free ports | 6975 TCP (admin page), 8443 TCP (head-unit page), 7000 upward (AirPlay), 5353 UDP (mDNS, which the relay answers itself; running avahi alongside is untested). | `ss -ltnup` | Required |
| Apple accessory (MFi) identity | Without it, the relay only serves the admin page. | You supply it; see [Add your CarPlay identity](#identity) | Required |
| 5 GHz Wi-Fi | The automatic band uses 5 GHz when a 5 GHz channel can host the hotspot, otherwise 2.4 GHz channel 6. 2.4 GHz only works (the UFI003 runs CarPlay on it); set the frame rate to 30 on the head-unit page. | `iw list`; `iw reg get` | Not required |
| For Carlink: a 5 GHz station, ideally on a second Wi-Fi adapter | In a real car, Carlink needs the relay to join the car’s 5 GHz Wi-Fi as a station. With one Wi-Fi adapter, the iPhone follows the relay onto the car’s network. Carlink also uses Bluetooth LE; Wi-Fi Direct is optional. | `nmcli device`; `btmgmt info` lists `le` | Not required |

The relay itself is small: on the UFI003 (382 MB of RAM) it uses about 2.9 MB of resident memory plus 1.5 MB for its output process, and about 5 MB of disk.

| System | |
| --- | --- |
| Debian 11 (bullseye), 12 (bookworm) and 13 (trixie) | The `.deb` is tested on each |
| OpenStick Debian 11 on the UFI003 (NetworkManager 1.30, BlueZ 5.55) | In use |
| Armbian trixie on the Phicomm N1 (NetworkManager 1.52, BlueZ 5.82) | In use |
| Debian 13 on a Raspberry Pi 5 | The developers’ reference board; no device package for it yet |
| Ubuntu and other distributions | Untested |

::: details Commands to check a device {#check}
Run these on the device over SSH. The commands with `sudo` need root.

```sh
uname -m; dpkg --print-architecture; . /etc/os-release; echo "$ID $VERSION_ID"
ps -p 1 -o comm=
systemctl is-active NetworkManager bluetooth
nmcli --version
nmcli device
command -v nmcli iw sdptool hciconfig btmgmt
sudo iw list
sudo iw reg get
printf '' | sudo btmgmt --index 0 info
sudo modprobe rfcomm && lsmod | grep rfcomm
ss -ltnup | grep -E ':(6975|8443|7000|5353)\b'
```

| Command | Look for |
| --- | --- |
| `uname -m`, `dpkg --print-architecture` | `aarch64` and `arm64`; the rest of the line prints the distribution and its version |
| `ps -p 1 -o comm=` | `systemd` |
| `systemctl is-active` | `active`, twice |
| `nmcli device` | The Wi-Fi interfaces (type `wifi`); a name other than `wlan0` needs a [host profile](#host-profile) |
| `command -v` | One path per tool; a missing line is a missing tool |
| `iw list` | `AP` under *Supported interface modes*; *valid interface combinations* that allow AP and station (`managed`) together; the 5 GHz channels and their flags |
| `iw reg get` | The Wi-Fi country, which sets the channel flags |
| `btmgmt info` | `br/edr` under *supported settings*, and `le` for Carlink |
| `modprobe rfcomm` | `rfcomm` in the module list; only a hint |
| `ss` | Nothing, or only programs you can stop |

For its own hotspot, the relay tries 5 GHz channels 36, 40, 44, 48 and 149 to 165. A channel can host the hotspot only if `iw list` doesn’t mark it disabled, no IR or radar detection; joining a 5 GHz network only needs the channel not to be disabled. If no 5 GHz channel qualifies, the relay uses 2.4 GHz channel 6.

Keep the empty `printf` in the `btmgmt` line: `btmgmt` hangs when its input is `/dev/null`. `--index 0` is the first adapter, `hci0`.

After installing, the admin page’s **Diagnostics → This host** shows what the relay itself finds: RFCOMM; Bluetooth BR/EDR, LE and Secure Connections; AP and station support for each interface; the 5 GHz channels that can host the hotspot; the Wi-Fi country; and missing tools. Trust that view over these commands.
:::

## Install the relay {#install .step}

Take the newest `linux-v` release from [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases), including pre-releases: every Linux release so far is a pre-release, and the newest is `linux-v0.1.6-beta.3`. Download the `.deb` and `SHA256SUMS`, check the SHA-256, then install the package with its dependencies:

```sh
V=0.1.6-beta.3
base=https://github.com/OpenXPlay/OpenXPlay-Relay/releases/download/linux-v$V
curl -fL -O "$base/openxplay-relay_${V}_arm64.deb" -O "$base/SHA256SUMS"
sha256sum --ignore-missing -c SHA256SUMS
sudo apt-get install --no-install-recommends ./openxplay-relay_${V}_arm64.deb
```

Set `V` to the newest version. File names write a pre-release as `0.1.6-beta.3`; inside the package, its version is `0.1.6~beta.3`.

`apt-get` also installs `bluez`, `network-manager`, `iw`, `dnsmasq-base` and `init-system-helpers` 1.54 or later. The package:

- installs the relay to `/opt/openxplay`;
- adds the systemd service `openxplay-relay.service`, enabled and started on the first install;
- adds the update command `/usr/sbin/openxplay-relay-update`;
- adds two NetworkManager configuration files: Wi-Fi power saving off, and no random MAC address while scanning;
- adds a clock guard, which works with systemd-timesyncd and does nothing with chrony.

Removing the package keeps `/var/lib/openxplay`.

::: details Install from the tarball instead {#tarball}
Download `openxplay-relay-<version>-linux-aarch64.tar.gz` and `SHA256SUMS` from the same release and check them. The tarball installs no dependencies, so install `bluez`, `network-manager`, `iw` and `dnsmasq-base` first. Then:

```sh
tar -xzf openxplay-relay-$V-linux-aarch64.tar.gz
cd openxplay-relay-$V-linux-aarch64
sudo sh rust/packaging/install.sh bin/openxplay-relay bin/oxp-relay web admin
```
:::

::: details Wi-Fi not called wlan0? Add a host profile {#host-profile}
The relay reads an optional host profile, `/etc/openxplay/host.json`. A device package normally writes it; on other devices you can write it yourself. Every field is optional:

| Field | Default |
| --- | --- |
| `model` | None |
| `devicePreset` | `auto`: detects MSM8916 dongles and the Phicomm N1 from the device tree, otherwise `generic` |
| `wifiInterface` | `wlan0` |
| `carlinkInterface` | Empty: the same as `wifiInterface` |
| `hotspotChannel` | `0`: automatic |
| `bluetoothAdapter` | The lowest `hciN` |
| `hotspotDownGapSeconds` | `15` (0 to 60): how long the hotspot stays down before the next one starts |
| `secureConnections` | `pairing-off`: Bluetooth Secure Connections off only while pairing is open; or `untouched` |
| `bluetoothGuardStatus` | `/run/openxplay/bluetooth-guard.json` |

For example, for Wi-Fi on `wlan1`:

```sh
sudo mkdir -p /etc/openxplay
echo '{"wifiInterface": "wlan1"}' | sudo tee /etc/openxplay/host.json
sudo systemctl restart openxplay-relay
```

One invalid field makes the relay ignore the whole file and show the error in the admin page. Settings apply in this order, each overriding the one before: built-in defaults, the host profile, the admin page’s settings, the command line.
:::

## Open the admin page {#admin .step}

On a phone or computer on the same network as the device, open `https://<device IP>:6975` (`hostname -I` on the device prints its addresses). Where `.local` names resolve, `https://openxplay-linux.local:6975` works too; many Android phones and car browsers don’t resolve them. The browser warns about the relay’s self-signed certificate; continue to the page. The first password is `openxplay`: sign in, then change it.

The optional admin hotspot `OpenXPlay-Admin` is off by default. Once you turn it on in the admin page, join it and open `https://10.79.0.1:6975`.

::: details Forgot the admin password? {#reset-password}
```sh
sudo systemctl stop openxplay-relay
sudo /opt/openxplay/bin/openxplay-relay --reset-admin-password
sudo systemctl start openxplay-relay
```

The second command resets the password to `openxplay` and exits.
:::

## Add your CarPlay identity {#identity .step}

Install packages never contain an Apple accessory (MFi) identity; you supply your own. In the admin page, open **Developer options → Identity and certificates** and choose `identity.pk8` and `certificate.p7b`, or a ZIP that contains both.

Or put the files in place by hand, owned by root with mode 0600, and restart the relay:

```sh
sudo install -D -m 0600 -o root -g root -t /var/lib/openxplay/mfi identity.pk8 certificate.p7b
sudo systemctl restart openxplay-relay
```

## Answer the setup guide {#setup .step}

The admin page’s setup guide asks about:

1. **Your car**.
2. **Output**: the head unit’s browser, its Carlink app, or both. A Tesla’s browser needs its own adaptation; see [Tesla](/en/tesla). The screen-casting receiver (DLNA) output is not available on Linux.
3. **Network**: *This device’s hotspot* or *Use the car’s hotspot*. The relay’s own hotspot is `OpenXPlay-Linux-XXXX` with the password `openxplay` (WPA2), unless you set your own.
4. **Get ready**: work through what it lists.

## Pair the iPhone {#pair .step}

Choose *Pair iPhone*; pairing stays open for 10 minutes. On the iPhone, open Settings → Bluetooth and choose `OpenXPlay Linux`. The iPhone connects wirelessly: wired (USB) CarPlay is not in any Linux release yet.

## Open CarPlay on the head unit {#head-unit .step}

Join the relay’s hotspot from the head unit and open `https://10.77.0.1:8443/` in its browser. The relay takes the first free `10.77.x.1` address, and the admin page lists the head-unit address; with *Use the car’s hotspot*, open the address it lists. Accept the certificate warning the first time; [Troubleshooting](/en/troubleshooting#certificate-warning) explains why it appears.

For the Carlink app, see [Carlink app](/en/carlink).

## Phicomm N1 {#phicomm-n1}

The Phicomm N1 is a TV box with an Amlogic S905D, BCM43455 Wi-Fi with 5 GHz, BCM4345C0 Bluetooth over UART, and Ethernet. It runs the relay on ophub Armbian (Debian 13) with a device package from [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/PhicommN1).

1. **Install Armbian yourself.** From the release [`Armbian_trixie_arm64_server_2026.10`](https://github.com/ophub/amlogic-s9xxx-armbian/releases/tag/Armbian_trixie_arm64_server_2026.10) of ophub’s [amlogic-s9xxx-armbian](https://github.com/ophub/amlogic-s9xxx-armbian), download `Armbian_26.11.0_amlogic_s905d_trixie_6.12.112_server_2026.10.15.img.gz` (Debian 13, kernel 6.12). Boot the N1 from it on a USB drive, then run `armbian-install` and choose `101` (Phicomm-N1) and `1` (ext4) to install it to the eMMC.
2. **Install the device package.** From the OpenXPlay-Hardware pre-release [phicomm-n1-device-v0.1.1-beta.1](https://github.com/OpenXPlay/OpenXPlay-Hardware/releases/tag/phicomm-n1-device-v0.1.1-beta.1), download `openxplay-phicomm-n1-device-0.1.1-beta.1.tar.gz` and `SHA256SUMS`, and check them. Unpack it on the N1 and run its installer as root. `--dry-run` checks everything without changing anything; after the install, reboot, then check the device with `--verify`.

   ```sh
   tar -xzf openxplay-phicomm-n1-device-0.1.1-beta.1.tar.gz
   sudo sh openxplay-phicomm-n1-device-0.1.1~beta.1/install-device.sh --dry-run
   sudo sh openxplay-phicomm-n1-device-0.1.1~beta.1/install-device.sh
   sudo reboot
   # after the reboot
   sudo sh openxplay-phicomm-n1-device-0.1.1~beta.1/install-device.sh --verify
   ```

3. **Install the relay** as in [Install the relay](#install), then carry on from [Open the admin page](#admin).

The device package needs Debian 13, arm64 and the device-tree model `Phicomm N1` (`tr -d '\0' < /proc/device-tree/model` prints it), and installs offline. It:

- installs the host profile;
- gives Wi-Fi and Bluetooth their own addresses, derived from the Ethernet MAC address; otherwise every N1 shares the same ones;
- fixes the Ethernet PHY at boot, and again after kernel updates;
- installs newer Cypress Wi-Fi firmware, so 5 GHz channels 36 to 48 work under the CN country code. The stock firmware allows only 149 to 165; 52 to 144 stay disabled.

On the N1, a hotspot and a Wi-Fi station connection can run together only on one shared channel, and the USB ports are USB 2 only.

OpenXPlay Flasher has an N1 profile that installs over SSH, but it can’t install the N1 yet: its signed package list doesn’t list N1 packages. Flasher support is coming. The device package uses the OpenXPlay-Hardware licence: open source, no commercial use; see [Licensing](/en/licensing#licenses).

## Not supported {#not-supported}

| Device or system | Why |
| --- | --- |
| OpenWrt, and other systems without systemd or NetworkManager | The relay needs both |
| 32-bit ARM (armv7), x86 and RISC-V boards | There is no build for them |
| Bluetooth adapters with only Bluetooth Low Energy | Wireless CarPlay needs Bluetooth Classic (RFCOMM) |
| ESP32 and other microcontrollers | They don’t run Linux |

## Next {#next-steps}

- [Everyday use and settings](/en/daily-use): connecting on each drive, and the head-unit page’s settings.
- [Trusted HTTPS](/en/trusted-https): remove the certificate warning with a free domain name.
- Something not working? See [Troubleshooting](/en/troubleshooting), and tell the [community](/en/community) how your device did.
