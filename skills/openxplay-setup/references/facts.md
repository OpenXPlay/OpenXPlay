<!--
SPDX-FileCopyrightText: 2026 OpenXPlay.org
SPDX-License-Identifier: CC-BY-4.0
Created by riko chen on 2026-10-29
-->

# Facts this skill was written against

A snapshot from 2026-10-29, taken from the release tags and code. Versions move: before you rely on one, check the live source named in each section. English labels are quoted here; for another language, read the same label from the site page in that language or from the string resources named below.

## Versions

| Part | Version | Check the latest |
| --- | --- | --- |
| Android app (stable) | 0.2.2 (2026-10-28) | `gh release list -R OpenXPlay/OpenXPlay-Relay`, or `https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest` |
| Android app (beta) | 0.2.3-beta.1 (2026-10-29), with five experimental options on by default | the same list, pre-releases |
| Linux relay | 0.1.6-beta.3 (2026-10-28), every Linux release so far is a pre-release | tags `linux-v…` in the same repository |
| UFI003 in the Flasher's signed list | base OpenStick v1, device support 0.2.1, relay 0.1.5~beta.2 | `FLASHER catalog fetch` then `FLASHER files` |
| OpenXPlay Flasher | 0.2.0-beta.2 (macOS 12 or later, Windows 10 or 11) | `gh release list -R OpenXPlay/OpenXPlay-Flasher` |
| Phicomm N1 device package | 0.1.1-beta.1 (pre-release) | tags `phicomm-n1-device-v…` in `OpenXPlay/OpenXPlay-Hardware` |

Every release has a `SHA256SUMS` asset, and GitHub reports a SHA-256 digest for each asset.

## Android app 0.2.2

- Needs Android 8.0 or later; Carlink needs Android 10 or later. Package name `org.openxplay.relay`.
- Setup guide pages: *Your car* (brand and model required, year may stay *Not sure*, *Other* for unlisted cars; catalog: XPeng, Tesla, ZEEKR), *Car display* (*Car browser* recommended; *Carlink app* experimental; *Wireless display* shows *Coming soon*), *iPhone connection* (*Wireless* recommended, *USB cable* not recommended), *Wireless network* (*Wi-Fi Direct* recommended, *This phone's hotspot*, *Use the car's hotspot*), *Get ready* (permissions, *Import* the identity, pair the iPhone, save the car's hotspot), *Ready to start* (*Connect automatically* on, *Start on boot* off, *Start CarPlay*).
- With Carlink or Miracast on, *Wi-Fi Direct* is disabled and *This phone's hotspot* is recommended.
- Home: three tiles (iPhone, this phone, car), one status line, at most one button (*Connect*, *Stop*, or the current step's fix such as *Import*, *Allow*, *Retry*, *Enter*, *Start now*). With *Connect automatically* on, *Connect* counts down 5 seconds; *Not now* pauses. When no car screen is known yet, it waits up to 20 seconds; *Start now* skips. The head-unit address appears under *Open this address in the car's browser*, as `https://<address>:8443/`, with a copy button. Running: *CarPlay is live*.
- Identity: import `identity.pk8` and `certificate.p7b` together, one after the other, or as a ZIP (each file at most 16 KiB). Also under Settings → *Identity and certificates*.
- Head-unit page settings open from the OpenXPlay icon in CarPlay: *Picture fit*, *Full screen*, *Resolution*, *CarPlay screen width*, *Video codec* (*Automatic (recommended)*), *Frame rate*, *Playback* (*Smart*, *Quality*, *Speed*), *Tap to return to full screen*.
- Settings worth knowing: *Car and screen*; *Tesla browser*; *CarPlay picture*; *Sound* (*CarPlay audio over the car's Bluetooth (experimental)*, on); *Configuration files* (user and privacy configuration); *Logs* (save to the phone, or upload to logs.openxplay.org after a privacy notice; receipt 48 hours, deleted within 72 hours); *Experimental* (on by default; *Use experimental options* turns them all off); About → *Check for updates* (*Stable* or *Beta*).
- DLNA and Miracast: only under Developer options → *Combine outputs*; picture only, no touch.
- Labels in other languages: `android/app/src/main/res/values-zh-rCN/` at tag `android-v0.2.2` of `OpenXPlay/OpenXPlay-Relay`; English in `values/`.

## Tesla browser (Android 0.2.0 and later)

Not yet tested in a Tesla. Needs MCU2 or later, wireless CarPlay, *Car browser*, the relay phone's hotspot (5 GHz if possible) or Wi-Fi Direct, and *Remain Connected in Drive* on in the Tesla. Ways, in the app's order: trusted name + shared range address `100.88.0.1` (TeslaMirror, recommended, needs Trusted HTTPS); trusted name + link-local `169.254.88.1` (needs Trusted HTTPS); direct link-local `169.254.88.1` (continue past the certificate warning); public-range `3.3.3.1` (like TeslaAndroid); off. Android 13 and later may drop connections to addresses outside `169.254`.

## Linux relay 0.1.6-beta.3

- Admin page `https://<device address>:6975` (self-signed certificate; first password `openxplay`); the relay's hotspot `OpenXPlay-Linux-XXXX` with password `openxplay` unless the user set one; optional admin hotspot at `https://10.79.0.1:6975`. Bluetooth name *OpenXPlay Linux*. Head-unit page on port 8443, for example `https://10.77.0.1:8443/` on the relay's hotspot.
- Network modes: *This device's hotspot*, *Use the car's hotspot*. Pairing opens for 10 minutes.
- Outputs: browser, Carlink, or both; Tesla browser adaptation; no DLNA. Wired CarPlay is not released.
- Not yet tested on a device in this release: CarPlay with an iPhone, Carlink with a car, a Tesla, the UFI003, WPA3, Trusted HTTPS issuance, hardware encoding, Wi-Fi Direct, I2C, CH341 or remote MFi, and audio on the relay.
- Admin page text: `admin-web/src/` in `OpenXPlay/OpenXPlay-Relay`.

## Known limits that shape recommendations

- The UFI003's Wi-Fi is 2.4 GHz only: no 5 GHz Carlink cars, 30 fps suggested.
- A USB-C iPhone on a USB-C to USB-C cable usually takes the host role and is not found; use wireless, or an OTG adapter with a USB-A to USB-C cable.
- Some phones turn Wi-Fi off when their hotspot is on; Carlink needs both.
- HyperOS and MIUI freeze background apps; the relay keeps a low-priority notification while an output runs, so allow notifications.
- Tested head unit: XPeng G6 2023 (browser: H.264 and H.265 in hardware; Carlink works, experimental). Other cars: run `openxplay.org/check`.
