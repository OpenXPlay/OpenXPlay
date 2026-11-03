<!--
SPDX-FileCopyrightText: 2026 OpenXPlay.org
SPDX-License-Identifier: CC-BY-4.0
Created by riko chen on 2026-10-29
-->

# Facts this skill was written against

A snapshot from 2026-10-29 (versions and the Linux relay updated 2026-11-01), taken from the release tags and code. Versions move: before you rely on one, check the live source named in each section. English labels are quoted here; for another language, read the same label from the site page in that language or from the string resources named below.

## Versions

| Part | Version | Check the latest |
| --- | --- | --- |
| Android app (stable) | 0.2.5 (2026-11-02): CarLife output and *Wireless display* (both experimental); *Carlink app* no longer marked experimental | `gh release list -R OpenXPlay/OpenXPlay-Relay`, or `https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest` |
| Linux relay | 0.1.6 (2026-11-01), the first Linux release since 0.1.3: a release, not a pre-release, with limited hardware and in-car testing (below); GitHub marks the Android app as Latest, never a Linux release | tags `linux-v…` in the same repository |
| UFI003 in the Flasher's signed list | base OpenStick v1, device support 0.2.1, relay 0.1.6 (beta catalog, sequence 6) | `FLASHER catalog fetch` then `FLASHER files` |
| OpenXPlay Flasher | 0.2.0-beta.2 (macOS 12 or later, Windows 10 or 11) | `gh release list -R OpenXPlay/OpenXPlay-Flasher` |
| Phicomm N1 device package | 0.1.1-beta.1 (pre-release); the Flasher's signed list pairs it with relay 0.1.6, but installing the N1 with the Flasher is not yet tested on a real device, so the site recommends the manual install | tags `phicomm-n1-device-v…` in `OpenXPlay/OpenXPlay-Hardware` |

Every release has a `SHA256SUMS` asset, and GitHub reports a SHA-256 digest for each asset.

## Android app 0.2.2

- Needs Android 8.0 or later; Carlink needs Android 10 or later. Package name `org.openxplay.relay`.
- Setup guide pages: *Your car* (brand and model required, year may stay *Not sure*, *Other* for unlisted cars; catalog: XPeng, Tesla, ZEEKR), *Car display* (*Car browser* recommended; up to 0.2.4 *Carlink app* experimental and *Wireless display* *Coming soon*; from 0.2.5 *Carlink app* unmarked, *Wireless display* (DLNA or Miracast) and *CarLife* selectable, both marked experimental), *iPhone connection* (*Wireless* recommended, *USB cable* not recommended), *Wireless network* (*Wi-Fi Direct* recommended, *This phone's hotspot*, *Use the car's hotspot*), *Get ready* (permissions, *Import* the identity, pair the iPhone, save the car's hotspot), *Ready to start* (*Connect automatically* on, *Start on boot* off, *Start CarPlay*).
- With Carlink or Miracast on, *Wi-Fi Direct* is disabled and *This phone's hotspot* is recommended.
- Home: three tiles (iPhone, this phone, car), one status line, at most one button (*Connect*, *Stop*, or the current step's fix such as *Import*, *Allow*, *Retry*, *Enter*, *Start now*). With *Connect automatically* on, *Connect* counts down 5 seconds; *Not now* pauses. When no car screen is known yet, it waits up to 20 seconds; *Start now* skips. The head-unit address appears under *Open this address in the car's browser*, as `https://<address>:8443/`, with a copy button. Running: *CarPlay is live*.
- Identity: import `identity.pk8` and `certificate.p7b` together, one after the other, or as a ZIP (each file at most 16 KiB). Also under Settings → *Identity and certificates*, where *MFi target* can also choose a remote MFi server or an authentication chip (*USB I2C (CH341)*, *Linux I2C device*) instead of the files (*Local*, the default).
- Head-unit page settings open from the OpenXPlay icon in CarPlay: *Picture fit*, *Full screen*, *Resolution*, *CarPlay screen width*, *Video codec* (*Automatic (recommended)*), *Frame rate*, *Playback* (*Smart*, *Quality*, *Speed*), *Tap to return to full screen*.
- Settings worth knowing: *Car and screen*; *Tesla browser*; *CarPlay picture*; *Sound* (*CarPlay audio over the car's Bluetooth (experimental)*, on); *Configuration files* (user and privacy configuration); *Logs* (save to the phone, or upload to logs.openxplay.org after a privacy notice; receipt 48 hours, deleted within 72 hours); *Experimental* (on by default; *Use experimental options* turns them all off); About → *Check for updates* (*Stable* or *Beta*).
- DLNA and Miracast: up to 0.2.4 only under Developer options → *Combine outputs*; from 0.2.5 also *Wireless display* in the setup guide and Settings → *Output*. The head unit shows the picture only; with wireless display only, the relay phone shows CarPlay and takes touch, and Home offers *Show CarPlay*. DLNA: the head unit joins the relay phone's hotspot or the same Wi-Fi, then *Receiver* picks it; a few seconds behind. Miracast: allow *Display over other apps*, then *Open screen casting*. With *CarPlay audio over the car's Bluetooth* off, all CarPlay sound goes with the cast.
- CarLife (0.2.5 and later, experimental): Settings → *Output* → *CarLife*, *CarLife head-unit IP address* optional (empty finds it automatically). The head unit joins the same Wi-Fi or the relay phone's hotspot, or connects over USB as an accessory; sound stays on the iPhone's Bluetooth link to the car. The Linux relay has no CarLife.
- Labels such as *Experimental* follow the installed version, not new testing: check which version the user runs before quoting them.
- Since 0.2.2: Home draws the iPhone, this phone and the car joined by cables, with *Swipe up for all steps* on the step drawer (0.2.3); Settings → Display → high performance mode, on (0.2.3); Settings → Background asks for unrestricted background running and opens the maker's autostart and battery pages (0.2.3); three Experimental options for iPhones, such as on iOS 16, that connect but never show a picture (0.2.3); Settings → Network offers *Copy to settings (recommended)* and *Use my existing hotspot* for this phone's hotspot (0.2.4). Details: `https://openxplay.org/en/changelog`.
- Labels in other languages: `android/app/src/main/res/values-zh-rCN/` at tag `android-v0.2.5` of `OpenXPlay/OpenXPlay-Relay`; English in `values/`.

## Tesla browser (Android 0.2.0 and later, Linux 0.1.6)

Not yet tested in a Tesla on either relay. Needs MCU2 or later and *Remain Connected in Drive* on in the Tesla. Android: wireless CarPlay, *Car browser*, the relay phone's hotspot (5 GHz if possible) or Wi-Fi Direct. Ways, in the app's order: trusted name + shared range address `100.88.0.1` (TeslaMirror, recommended, needs Trusted HTTPS); trusted name + link-local `169.254.88.1` (needs Trusted HTTPS); direct link-local `169.254.88.1` (continue past the certificate warning); public-range `3.3.3.1` (like TeslaAndroid); off. Android 13 and later may drop connections to addresses outside `169.254`.

Linux 0.1.6: the same ways in the admin page's Settings → *Tesla browser* (listed once a Tesla is chosen under *Car and screen*), with the browser output and *This relay’s hotspot*; the relay adds the address to its hotspot and removes it on Stop. The trusted-name ways need Trusted HTTPS here too.

## Linux relay 0.1.6

- Admin page `https://<device address>:6975` (self-signed certificate; first password `openxplay`); the relay's hotspot `OpenXPlay-Linux-XXXX` with password `openxplay` unless the user set one; optional admin hotspot (needs a second Wi-Fi adapter) at `https://10.79.0.1:6975`. Names: `openxplay-car.local` on the relay's hotspot (or the car's hotspot in *Use the car's hotspot*), `openxplay-admin.local` on the home network and the admin hotspot; they resolve on iPhones, Macs and Windows, often not on Android. Bluetooth name *OpenXPlay Linux*. Head-unit page on port 8443, for example `https://10.77.0.1:8443/` on the relay's hotspot. Plain `http://` on the admin port redirects to `https://`.
- Home shows the path iPhone → this relay → car and one action; the gear opens Settings: *Output*, *Car and screen*, *Tesla browser*, *CarPlay picture* (*Resolution*, *CarPlay screen width*, *Video codec*, *Frame rate*), *Audio*, *iPhone connection* (→ *Wireless network* → *Interfaces and network roles*), *Startup*, *Head-unit access* (*Trusted HTTPS*, *Admin page*, *Require pairing code*), *Identity and certificates*, *Configuration files*, *Logs*, *About* (*Check for updates*, *Stable* or *Beta*), *Developer options*, *Experimental*.
- Network modes (Settings → *iPhone connection* → *Wireless network*): *This relay’s hotspot* (default), *Use the car’s hotspot*. *Pair iPhone* on Home opens pairing for 10 minutes; paired devices can be removed on Home and in Settings → *iPhone connection*.
- Outputs: browser, Carlink, or both; Carlink and both need a second Wi-Fi adapter (one radio = browser only); Tesla browser adaptation; no DLNA. Wired CarPlay: Settings → *iPhone connection* → *USB cable*, with the iPhone on a USB-A port of the relay (USB-A to Lightning or USB-A to USB-C cable); the head unit still reaches the relay over Wi-Fi, and wireless stays the default.
- Identity: the files `identity.pk8` and `certificate.p7b` are the default source (*MFi target*: *Local*); the relay can instead use a remote MFi server or an authentication chip over I2C or a CH341 adapter.
- Tested on a Phicomm N1 without an iPhone or a car. Not yet tested on a device in this release: CarPlay with an iPhone, wired CarPlay, pairing an iPhone again after removing it, `openxplay-car.local` from an iPhone, Carlink with a car, the iOS 16 options, CarPlay audio over the car's Bluetooth, a Tesla, the UFI003, WPA3, Trusted HTTPS issuance, hardware encoding, Wi-Fi Direct, I2C, CH341 or remote MFi, and audio on the relay.
- Admin page text: `admin-web/src/i18n.ts` at tag `linux-v0.1.6` of `OpenXPlay/OpenXPlay-Relay`.

## Known limits that shape recommendations

- The UFI003 has one Wi-Fi radio, 2.4 GHz only: browser route only (no Carlink), 30 fps suggested.
- A USB-C iPhone on a USB-C to USB-C cable usually takes the host role and is not found; use wireless, or an OTG adapter with a USB-A to USB-C cable.
- Android relay: some phones turn Wi-Fi off when their hotspot is on; Carlink needs both. Linux relay: Carlink needs a second Wi-Fi radio that can join 5 GHz networks (the Phicomm N1 with a USB adapter); not yet tested with a car.
- HyperOS and MIUI freeze background apps; the relay keeps a low-priority notification while an output runs, so allow notifications.
- Tested head unit: XPeng G6 2023, in October 2026 with development builds, not the current releases. Browser (Chromium 120, on a UFI003 and on the Android relay): CarPlay picture shown, fitted to the browser's areas; the browser reports H.264 and H.265 hardware decoding. Carlink (`v2.0.4`, on the Android relay): picture shown in H.264 and H.265; still to be checked in the car with the released fixes: touch accuracy, the picture after the reverse camera, full-screen size, sound, Siri and calls, and quick reconnect; the car sent no vehicle data. Details and dates: `https://openxplay.org/en/head-units`. Other cars: run `openxplay.org/check`.
