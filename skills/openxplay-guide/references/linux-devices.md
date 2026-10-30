<!--
SPDX-FileCopyrightText: 2026 OpenXPlay.org
SPDX-License-Identifier: CC-BY-4.0
Created by riko chen on 2026-10-29
-->

# Can this Linux device be a relay?

Use this when the user offers a Linux device that has no guided installer: a Phicomm N1, a Raspberry Pi, another TV box, board or dongle. Most arm64 Linux devices can run the OpenXPlay Linux relay if they meet the requirements below. The facts come from the Linux relay's code and packaging (`OpenXPlay/OpenXPlay-Relay`: `rust/packaging/`, `rust/direlay-linux/src/host_capabilities.rs`, `wifi_capabilities.rs`, `host_profile.rs`) as of linux-v0.1.6-beta.3; the user-facing install steps are on `https://openxplay.org/en/linux-devices` (Chinese: `https://openxplay.org/linux-devices`).

The UFI003 has its own guided installer; use that instead. OpenXPlay Flasher cannot install any other device yet: it lists only the UFI003 in its signed package list, and its N1 profile is not usable until N1 packages are listed.

## How to assess

1. **Ask first what you can learn without logging in:** device model, chip (SoC), Wi-Fi and Bluetooth chips if known, operating system and version, and whether it boots from eMMC, SD card or USB. A device that clearly fails a hard requirement (a 32-bit board, OpenWrt, no Bluetooth) needs no probing.
2. **Probe, with permission.** Logging in to the device is level 0 but needs the user's yes first (SSH host, user name; they type the password). Run only the read-only commands below, a few at a time, and explain what each result means. `sudo` commands: let the user type the password at the prompt.
3. **Give a verdict** in the user's language, using the table at the end: *ready*, *ready with limits*, *needs work* (with exactly what is missing and whether it can be added), or *not possible*. Then, if ready, follow the site page's install steps with the safety rules (installing packages is level 2; writing an image to eMMC is level 3).

## Hard requirements

| Requirement | Why | Check |
| --- | --- | --- |
| 64-bit ARM (aarch64) | The only release build is static aarch64 (musl); there is no armv7, x86_64 or RISC-V build | `uname -m` prints `aarch64`; for the Debian package also `dpkg --print-architecture` prints `arm64` |
| systemd | The relay runs as `openxplay-relay.service` | `ps -p 1 -o comm=` prints `systemd` |
| NetworkManager | It creates every hotspot and Wi-Fi connection; its shared mode with `dnsmasq-base` gives addresses | `nmcli --version`; `systemctl is-active NetworkManager` |
| BlueZ with its classic tools | iPhone pairing and the iAP2 channel; the relay calls `sdptool`, `hciconfig` and `btmgmt` | `systemctl is-active bluetooth`; `command -v sdptool hciconfig btmgmt` |
| Bluetooth Classic (BR/EDR) | Wireless CarPlay runs iAP2 over RFCOMM; a Bluetooth LE-only adapter cannot work | `printf '' \| sudo btmgmt --index 0 info`: *supported settings* includes `br/edr` |
| Kernel RFCOMM | Same reason; some vendor kernels lack it (the UFI003 needed an extra module) | `sudo modprobe rfcomm && lsmod \| grep rfcomm` (a hint; after install, the admin page's Diagnostics shows the real answer) |
| Wi-Fi that can run an access point | The relay's own hotspot is the default network | `sudo iw list`: *Supported interface modes* includes `AP` |
| `iw` | Wi-Fi capability and country checks | `command -v iw` |
| The user's own MFi identity | Without it the relay serves only its admin page | Ask (yes or no only) |

The empty `printf` before `btmgmt` matters: `btmgmt` hangs when its input is `/dev/null`.

## Limits, not blockers

| Fact | Consequence |
| --- | --- |
| Wi-Fi is 2.4 GHz only | Works (the UFI003 runs CarPlay this way); suggest 30 fps on the head-unit page. Carlink cars with 5 GHz Carlink Wi-Fi cannot be joined. |
| 5 GHz present | Automatic band uses 5 GHz when a channel can host an access point: tried 36, 40, 44, 48, then 149 to 165; a channel must not be *disabled*, *no IR* or *radar* for that (`sudo iw reg get`, `sudo iw phy <phy> info`). Joining a 5 GHz network only needs the channel not to be disabled. |
| One radio, no AP plus station combination | Fine for the browser route. For Carlink the iPhone follows the relay onto the car's network; a second Wi-Fi adapter keeps the hotspot up. Look at *valid interface combinations* in `iw list`. |
| No Wi-Fi Direct (P2P client) | Optional; only some Carlink cars use it. |
| Bluetooth LE missing but BR/EDR present | Wireless CarPlay works; Carlink needs LE too. |
| Ports already used (6975 admin, 8443 head-unit page, 7000 AirPlay, 5353 mDNS) | `ss -ltnup \| grep -E ':(6975\|8443\|7000\|5353)\b'`. Another mDNS responder (avahi) next to the relay is untested. |
| Wi-Fi interface not called `wlan0`, or several Bluetooth adapters | Write `/etc/openxplay/host.json` (`wifiInterface`, `bluetoothAdapter`); see the site page. |
| Debian 11, 12 or 13 | Tested. Ubuntu and other distributions with systemd, NetworkManager and BlueZ may work but are untested; the Debian package needs `dpkg`/`apt`, otherwise use the tarball and install the dependencies yourself. |
| Memory and storage | Small: about 4.4 MB of memory and 5 MB on disk on the UFI003 (382 MB RAM). Almost any board is enough. |
| Clock | No real-time clock is fine; the relay's clock guard works with systemd-timesyncd and does nothing with chrony. |

## Not possible today

- OpenWrt and other systems without systemd or NetworkManager.
- 32-bit ARM, x86 and RISC-V devices (no build).
- Microcontrollers such as the ESP32 (no Linux).
- Bluetooth LE-only adapters, or no Bluetooth at all.
- Wired (USB) CarPlay on Linux: in development, not in any release.

## Known devices

| Device | Status |
| --- | --- |
| UFI003 (MSM8916 dongle) | Guided install with OpenXPlay Flasher; 2.4 GHz only. Follow `https://openxplay.org/agents/ufi003-install.md`. |
| Phicomm N1 (Amlogic S905D, BCM43455, 5 GHz) | The user installs ophub Armbian (Debian 13), then OpenXPlay's N1 device package (pre-release, `OpenXPlay/OpenXPlay-Hardware` tag `phicomm-n1-device-v…`) and the relay package by hand, as the site page describes. The device package gives each N1 its own Wi-Fi and Bluetooth addresses, fixes the Ethernet PHY and enables 5 GHz channels 36 to 48 under the CN country code. Writing Armbian to eMMC is level 3. |
| Raspberry Pi 5 with Debian 13 | The developers' reference board; meets the requirements. No device package, so there is no `host.json`; defaults usually fit. |
| Other MSM8916 dongles | Unlisted: not every MSM8916 dongle is a UFI003, and the Flasher refuses unknown models. Treat as a generic device; flashing a base system onto one is outside this skill. |

## Verdict

Tell the user plainly which of these applies, with the evidence:

| Verdict | When |
| --- | --- |
| Ready | Every hard requirement met, 5 GHz access point possible. |
| Ready with limits | Hard requirements met, with limits from the table above (2.4 GHz only, one radio, no LE). Name each limit and what it means for their route. |
| Needs work | A missing piece that can be added: install NetworkManager or BlueZ tools, load or build `rfcomm`, add a USB Wi-Fi or Bluetooth Classic adapter, or reinstall a supported system. Say what and how hard. |
| Not possible | A blocker from *Not possible today*. Suggest the Android phone or a UFI003 instead. |

Also say that every Linux release so far is a pre-release, and that a hand install on an unlisted device is at the user's own risk; invite them to share the result in the community.
