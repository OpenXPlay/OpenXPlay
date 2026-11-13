---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-29
title: 'Linux relay on other devices: requirements and manual install'
description: Check whether an arm64 Linux board, TV box or dongle can run the OpenXPlay Linux relay, install the relay by hand from its Debian package, add your CarPlay identity, pair your iPhone, and update or remove the relay.
breadcrumb: Linux relay on other devices
schema: howto
howtoName: Install the OpenXPlay Linux relay by hand on an arm64 Linux device
howtoTools:
  - iPhone with CarPlay
  - arm64 Linux device with systemd, NetworkManager and Wi-Fi that can run an access point (plus BlueZ and Bluetooth Classic to connect the iPhone wirelessly)
  - Apple accessory (MFi) identity that you supply
  - Android head unit with a browser that supports WebCodecs
next:
  text: Everyday use and settings
  link: /en/daily-use
---

# Linux relay on other devices <Badge type="info" text="Advanced" />

Besides the UFI003, the OpenXPlay Linux relay can run on other arm64 Linux devices: boards, TV boxes and dongles. This page is for people who are comfortable with SSH and the command line. It shows how to tell whether a device can run the relay, how to install it by hand, and how to update and remove it. As always, nothing is installed on the head unit.

The UFI003 has its own guided installer: see [UFI003 USB dongle as the relay](/en/ufi003-relay). The Phicomm N1 has its own guide too: see [Phicomm N1 as the relay](/en/phicomm-n1). OpenXPlay Flasher can’t install other devices yet.

::: warning At your own risk
Installing the relay by hand on another device is at your own risk. Tell the [community](/en/community) what worked and what didn’t, with the device, its system and the relay version.
:::

## Requirements {#requirements}

| Requirement | Why it matters | How to check | |
| --- | --- | --- | --- |
| 64-bit ARM (aarch64) | Releases are built only for aarch64. They are static musl binaries, so the glibc or Debian version doesn’t matter to them. | `uname -m` prints `aarch64`; for the `.deb`, `dpkg --print-architecture` prints `arm64` | Required |
| systemd as init | The relay runs as the systemd service `openxplay-relay.service`. | `ps -p 1 -o comm=` prints `systemd` | Required |
| NetworkManager | `nmcli` builds every hotspot and Wi-Fi connection; its shared mode, with `dnsmasq-base`, hands out addresses (DHCP). | `systemctl is-active NetworkManager` | Required |
| BlueZ | The relay uses `bluetoothd` over D-Bus and the tools `sdptool`, `hciconfig` and `btmgmt`. | `systemctl is-active bluetooth`; `command -v sdptool hciconfig btmgmt` | Required for wireless and Carlink |
| `iw` | The relay reads the Wi-Fi adapter’s modes, channels and country with it. | `command -v iw` | Required |
| Bluetooth Classic (BR/EDR) | Wireless CarPlay talks iAP2 over RFCOMM, a Bluetooth Classic protocol. An adapter with only Bluetooth Low Energy can’t connect the iPhone wirelessly. | `btmgmt info` lists `br/edr` | Required for wireless |
| RFCOMM in the kernel | For the same reason. The UFI003’s kernel lacked it; its device package adds `rfcomm.ko`. | `sudo modprobe rfcomm` | Required for wireless |
| Wi-Fi that can run an access point (AP mode) | The relay’s own hotspot, the default network, needs it. | `iw list` shows `AP` under *Supported interface modes* | Required |
| Free ports | 6975 TCP (admin page), 8443 TCP (head-unit page), 7000 upward (AirPlay), 5353 UDP (mDNS, which the relay answers itself). | `ss -ltnup` | Required |
| Apple accessory (MFi) identity | Without it, the relay only serves the admin page. | You supply it; see [Add your CarPlay identity](#identity) | Required |
| 5 GHz Wi-Fi | The automatic band uses 5 GHz when a 5 GHz channel can host the hotspot, otherwise 2.4 GHz channel 6. 2.4 GHz only works (the UFI003 runs CarPlay on it); set the frame rate to 30 on the head-unit page. | `iw list`; `iw reg get` | Not required |
| A second Wi-Fi adapter that can be a 5 GHz station | In a real car, Carlink needs the relay to join the car’s 5 GHz Wi-Fi as a station on an adapter that isn’t running the iPhone’s hotspot. With one Wi-Fi adapter, the relay offers the browser output only. Carlink also uses Bluetooth LE; Wi-Fi Direct is optional. | `nmcli device`; `btmgmt info` lists `le` | Required for Carlink |
| A USB host port (USB-A), with usbfs and TUN/TAP in the kernel | For a cable connection, the iPhone plugs into a USB-A port on the relay; the relay drives it through usbfs and carries CarPlay’s network over a TAP virtual interface. | `ls /dev/bus/usb /dev/net/tun` | Required for USB |

The relay itself is small. On 2026-10-15, the first development build of the Rust Linux relay, idle on a UFI003 (382 MB of RAM) with no CarPlay session, used about 2.9 MB of resident memory plus 1.5 MB for its output process, and about 5 MB of disk.

| System | |
| --- | --- |
| Debian 11 (bullseye), 12 (bookworm) and 13 (trixie) | The `.deb` is tested on each |
| OpenStick Debian 11 on the UFI003 (NetworkManager 1.30, BlueZ 5.55) | In use |
| Armbian trixie on the Phicomm N1 (NetworkManager 1.52, BlueZ 5.82) | In use |
| Debian 13 on a Raspberry Pi 5 | The developers’ reference board; no device package for it yet |

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
ls /dev/bus/usb /dev/net/tun
ss -ltnup | grep -E ':(6975|8443|7000|5353)\b'
```

| Command | Look for |
| --- | --- |
| `uname -m`, `dpkg --print-architecture` | `aarch64` and `arm64`; the rest of the line prints the distribution and its version |
| `ps -p 1 -o comm=` | `systemd` |
| `systemctl is-active` | `active`, twice |
| `nmcli device` | The Wi-Fi interfaces (type `wifi`); a name other than `wlan0` needs a [host profile](#host-profile) |
| `command -v` | One path per tool; a missing line is a missing tool |
| `iw list` | `AP` under *Supported interface modes*; the 5 GHz channels and their flags |
| `iw reg get` | The Wi-Fi country, which sets the channel flags |
| `btmgmt info` | `br/edr` under *supported settings*, and `le` for Carlink |
| `modprobe rfcomm` | `rfcomm` in the module list; only a hint |
| `ls` | Both paths exist; needed only to connect the iPhone by cable |
| `ss` | Nothing, or only programs you can stop |

For its own hotspot, the relay tries 5 GHz channels 36, 40, 44, 48 and 149 to 165. A channel can host the hotspot only if `iw list` doesn’t mark it disabled, no IR or radar detection; joining a 5 GHz network only needs the channel not to be disabled. If no 5 GHz channel qualifies, the relay uses 2.4 GHz channel 6.

Keep the empty `printf` in the `btmgmt` line: `btmgmt` hangs when its input is `/dev/null`. `--index 0` is the first adapter, `hci0`.

After installing, the admin page’s **Diagnostics → This host** shows what the relay itself finds: RFCOMM; Bluetooth BR/EDR, LE and Secure Connections; AP and station support for each interface; the 5 GHz channels that can host the hotspot; the Wi-Fi country; and missing tools. Trust that view over these commands.
:::

## Install the relay {#install .step}

Take the newest `linux-v` release from [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases); it is `linux-v0.1.6` now. Download the `.deb` and `SHA256SUMS`, check the SHA-256, then install the package with its dependencies:

```sh
V=0.1.6
base=https://github.com/OpenXPlay/OpenXPlay-Relay/releases/download/linux-v$V
curl -fL -O "$base/openxplay-relay_${V}_arm64.deb" -O "$base/SHA256SUMS"
sha256sum --ignore-missing -c SHA256SUMS
sudo apt-get install --no-install-recommends ./openxplay-relay_${V}_arm64.deb
```

Set `V` to the newest version. File names write a pre-release such as `0.1.7-beta.1`; inside the package, its version is `0.1.7~beta.1`.

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
| `carlinkInterface` | Empty: another Wi-Fi adapter, chosen automatically |
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

On a phone or computer on the same network as the device, open `https://<device IP>:6975` (`hostname -I` on the device prints its addresses). Where `.local` names resolve, `https://openxplay-admin.local:6975` works too, and `https://openxplay-car.local:6975` from a phone on the relay’s hotspot; many Android phones and car browsers don’t resolve them. The browser warns about the relay’s self-signed certificate; continue to the page. The first password is `openxplay`: sign in, then change it.

The optional admin hotspot `OpenXPlay-Admin` is off by default and needs a second Wi-Fi adapter. Once you turn it on in the admin page, join it and open `https://openxplay-admin.local:6975` or `https://10.79.0.1:6975`.

::: details Forgot the admin password? {#reset-password}
```sh
sudo systemctl stop openxplay-relay
sudo /opt/openxplay/bin/openxplay-relay --reset-admin-password
sudo systemctl start openxplay-relay
```

The second command resets the password to `openxplay` and exits.
:::

## Add your CarPlay identity {#identity .step}

Install packages never contain an Apple accessory (MFi) identity; you supply your own. In the admin page, open **Settings → Identity and certificates** and choose `identity.pk8` and `certificate.p7b`, or a ZIP that contains both.

Or put the files in place by hand, owned by root with mode 0600, and restart the relay:

```sh
sudo install -D -m 0600 -o root -g root -t /var/lib/openxplay/mfi identity.pk8 certificate.p7b
sudo systemctl restart openxplay-relay
```

Without these two files but with another authentication source, choose a remote MFi server, or an authentication chip over I2C or a CH341 adapter, under **Settings → Identity and certificates → MFi target**.

## Answer the setup guide {#setup .step}

The admin page’s setup guide asks about:

1. **Your car**.
2. **Output**: the head unit’s browser, its Carlink app, or both. Carlink needs a second Wi-Fi adapter; with one, only the browser is offered. A Tesla’s browser needs its own adaptation; see [Tesla](/en/tesla). [Wireless display](/en/wireless-display) and [CarLife](/en/carlife) aren’t available on Linux.
3. **iPhone connection**: *Wireless* (the default), or *USB cable* with the iPhone plugged into a USB-A port on the relay through a USB-A to Lightning or USB-A to USB-C cable; the head unit still reaches the relay over Wi-Fi.
4. **Network**: *This relay’s hotspot* or *Use the car’s hotspot*. The relay’s own hotspot is `OpenXPlay-Linux-XXXX` with the password `openxplay` (WPA2), unless you set your own.
5. **Get ready**: work through what it lists.

## Pair the iPhone {#pair .step}

When Home asks you to pair the iPhone, tap *Pair*; pairing stays open for 10 minutes. On the iPhone, open Settings → Bluetooth and choose `OpenXPlay Linux`.

To switch to another iPhone or pair again: remove the old paired device on Home or in Settings → iPhone connection, forget `OpenXPlay Linux` in the iPhone’s Bluetooth settings, then open pairing again.

## Open CarPlay on the head unit {#head-unit .step}

Join the relay’s hotspot from the head unit and open `https://10.77.0.1:8443/` in its browser. The relay takes the first free `10.77.x.1` address, and the admin page lists the head-unit address; with *Use the car’s hotspot*, open the address it lists. Accept the certificate warning the first time; [Troubleshooting](/en/troubleshooting#certificate-warning) explains why it appears.

For the Carlink app, see [Carlink app](/en/carlink).

## Update the relay {#update}

In the admin page, **About → Check for updates** shows whether a newer version exists; choose the *Beta* channel to see pre-releases as well. Download the new `.deb` and `SHA256SUMS` and check them as in [Install the relay](#install), then run:

```sh
sudo openxplay-relay-update openxplay-relay_${V}_arm64.deb
```

The update command installs the new version, waits for the relay to start and watches it for 15 seconds to make sure it doesn’t exit or restart; if the new version doesn’t come up, it puts the previous one back. Settings, pairings and the identity live in `/var/lib/openxplay` and stay as they are.

| Command | What it does |
| --- | --- |
| `sudo openxplay-relay-update --list` | Lists the cached versions |
| `sudo openxplay-relay-update --rollback` | Puts back the newest cached version older than the current one |

Versions installed with the update command are cached in `/var/cache/openxplay/relay`, at most 3 of them. Rolling back needs the current version in the cache too; the first version, installed with `apt-get`, isn’t there.

## Logs and removal {#uninstall}

Read the relay’s log since this boot, or follow it live:

```sh
journalctl -u openxplay-relay -b
journalctl -u openxplay-relay -f
```

To report a problem, export the logs from **Logs** in the admin page.

Remove the relay:

```sh
sudo apt-get purge openxplay-relay
```

The settings, pairings, keys and identity in `/var/lib/openxplay` are kept; delete them with `sudo rm -rf /var/lib/openxplay` once you no longer need them.

## Not supported {#not-supported}

| Device or system | Why |
| --- | --- |
| OpenWrt, and other systems without systemd or NetworkManager | The relay needs both |
| 32-bit ARM (armv7), x86 and RISC-V boards | There is no build for them |
| Bluetooth adapters with only Bluetooth Low Energy | Wireless CarPlay needs Bluetooth Classic (RFCOMM); a cable connection needs no Bluetooth |
| ESP32 and other microcontrollers | They don’t run Linux |

## Next {#next-steps}

- [Everyday use and settings](/en/daily-use): connecting on each drive, and the head-unit page’s settings.
- [Trusted HTTPS](/en/trusted-https): remove the certificate warning with a free domain name.
- Something not working? See [Troubleshooting](/en/troubleshooting), and tell the [community](/en/community) how your device did.
