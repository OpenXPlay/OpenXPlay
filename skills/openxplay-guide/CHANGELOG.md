<!--
SPDX-FileCopyrightText: 2026 OpenXPlay.org
SPDX-License-Identifier: CC-BY-4.0
Created by riko chen on 2026-10-29
-->

# Changelog

Every change to this skill raises `metadata.version` in `SKILL.md` and adds an entry here; the website build refuses a changed skill without both. MAJOR: older copies would give wrong or unsafe guidance (also raise `minimum-version`). MINOR: a new route, device or step. PATCH: wording and links.

## 0.6.1 (2026-11-02)

- Facts: Carlink, CarLife and wireless display no longer described as untested in a car.

## 0.6.0 (2026-11-02)

- Routes: CarLife and wireless display (DLNA, Miracast) as display routes, from Android app 0.2.5; both experimental and Android only.
- Facts: Android app 0.2.5 is the stable release; *Carlink app* no longer marked experimental.

## 0.5.0 (2026-11-01)

- Linux relay 0.1.6 is described as a release with limited hardware and in-car testing, no longer as a pre-release; the Phicomm N1 device package is still a pre-release.
- Carlink: an Android 10 or later relay, or a Linux relay with two suitable Wi-Fi radios (a Phicomm N1 with a USB adapter); the stock UFI003 has one radio and offers the browser only.
- Tesla: the Linux 0.1.6 route next to the Android one; neither has been tested in a Tesla.
- Phicomm N1: its own guide (`phicomm-n1`). Its packages are in the Flasher's signed list, but the Flasher's N1 install is not yet tested on a device, so install by hand.
- Linux devices: requirements by route. Wired (USB) CarPlay is in 0.1.6 (not yet tested on a device), so a missing Bluetooth Classic rules out only wireless CarPlay. Identity files are the default source; a remote MFi server or an I2C or CH341 authentication chip can be used instead.
- Facts: Android beta 0.2.5-beta.1 (*Wireless display* selectable, *Carlink app* unmarked); labels follow the installed version; the XPeng G6 results name their builds and what is still unconfirmed; audio plays over the car's Bluetooth by default.

## 0.4.1 (2026-11-01)

- Facts: the Flasher's signed list (beta, sequence 6) installs relay 0.1.6 on the UFI003 and the Phicomm N1; the facts still said 0.1.5~beta.2.

## 0.4.0 (2026-11-01)

- Linux relay 0.1.6: one Wi-Fi radio means the browser route only; Carlink (and both outputs) needs a second Wi-Fi adapter. The UFI003 is browser-only.
- Admin page names: `openxplay-car.local` on the relay's hotspot, `openxplay-admin.local` on the home network and the admin hotspot; the admin hotspot needs a second adapter.
- Facts: Android app 0.2.4 and Linux relay 0.1.6 (a release, no longer a pre-release). The Linux facts add the admin page's Home and Settings menus, wired CarPlay, removing paired devices and the HTTPS redirect, and fix the hotspot mode's name (*This relay’s hotspot*).

## 0.3.0 (2026-10-30)

- New *About OpenXPlay* section: introduces the project, who it is for, what it needs, where it stands, and the website (openxplay.org, English at openxplay.org/en/) when someone asks what OpenXPlay is.
- New *Community* section: whenever the user runs into a problem, the skill keeps helping and tells them they can join the community groups (QQ 1015739350, WeChat, Discord), and what to include when they ask.

## 0.2.0 (2026-10-30)

- Renamed from openxplay-setup to openxplay-guide: the skill now lives in `skills/openxplay-guide/` and is mirrored at `openxplay.org/agents/skills/openxplay-guide/`. The old name stays as a stub that points installed copies and old links here.

## 0.1.0 (2026-10-29)

- First version: interviews the user about the car, iPhone, relay candidates and computer; recommends a route (Android phone, UFI003 or another arm64 Linux device; browser, Carlink or Tesla browser); assesses unlisted Linux devices; guides the setup step by step.
- Built-in safety rules: four risk levels with a consent card, typed device identifier for anything that erases, SHA-256 checks on every download, and the MFi identity, passwords and logs left to the user.
- Update check against GitHub (mirror on openxplay.org) at the start of a conversation; updates only after the user says yes.
