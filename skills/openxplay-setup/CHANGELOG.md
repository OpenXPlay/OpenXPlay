<!--
SPDX-FileCopyrightText: 2026 OpenXPlay.org
SPDX-License-Identifier: CC-BY-4.0
Created by riko chen on 2026-10-29
-->

# Changelog

Every change to this skill raises `metadata.version` in `SKILL.md` and adds an entry here; the website build refuses a changed skill without both. MAJOR: older copies would give wrong or unsafe guidance (also raise `minimum-version`). MINOR: a new route, device or step. PATCH: wording and links.

## 0.1.0 (2026-10-29)

- First version: interviews the user about the car, iPhone, relay candidates and computer; recommends a route (Android phone, UFI003 or another arm64 Linux device; browser, Carlink or Tesla browser); assesses unlisted Linux devices; guides the setup step by step.
- Built-in safety rules: four risk levels with a consent card, typed device identifier for anything that erases, SHA-256 checks on every download, and the MFi identity, passwords and logs left to the user.
- Update check against GitHub (mirror on openxplay.org) at the start of a conversation; updates only after the user says yes.
