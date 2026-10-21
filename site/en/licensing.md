---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: Licensing and commercial exemptions
description: The licences of the OpenXPlay repositories — AGPL-3.0 for Stream and Relay with commercial exemptions, the GPL-derived parts, OpenXPlay-Hardware (open source, no commercial use), Apache-2.0 OR MIT for plugins — plus trademarks and this website’s licence.
breadcrumb: Licensing
---

# Licensing

OpenXPlay-Stream and OpenXPlay-Relay are open source under AGPL-3.0, and organisations that can’t use AGPL-3.0 can ask for an exemption at [support@openxplay.org](mailto:support@openxplay.org); the device support files in OpenXPlay-Hardware follow OpenStick’s terms: open source, no commercial use.

## Licences of each part {#licenses}

- **AGPL-3.0-only.** OpenXPlay-Stream and OpenXPlay-Relay are licensed under the GNU Affero General Public License v3.0, version 3 only.
- **Attribution.** Additional terms under AGPL-3.0 section 7 apply to OpenXPlay-Stream and OpenXPlay-Relay: modified versions must keep the notice “Powered by OpenXPlay.” and a visible link to the original project in their legal notices and in any prominent about, legal, footer or attribution location of their user interface. See their NOTICE files.
- **Network use.** Relay builds include OpenXPlay-Stream, so the relay offers its source to everyone who uses it over a network, including through the head-unit browser.
- **GPL-derived parts.** The CarPlay protocol crates `rust/carplay-iap2` and `rust/carplay-airplay`, and a few files in `rust/direlay-linux/src/network/`, are derived from DiPlay and xcertplay and stay GPL-3.0-only; GPLv3 section 13 permits combining them with the AGPL project. OpenXPlay-DiPlay is GPL-3.0.
- **OpenXPlay-Hardware: open source, no commercial use.** The device support files follow the terms of [OpenStick](https://github.com/OpenStick/OpenStick) under the OpenXPlay-Hardware License: whoever distributes them or a derivative must publish the complete source under the same license, and commercial use is prohibited, including selling system images, packages or their derivatives that contain them, distributing build outputs for a fee, and selling devices with them installed in batches. Files taken from or built from the Linux kernel stay GPL-2.0-only.
- **Plugins.** OpenXPlay-Web-Plugins is Apache-2.0 OR MIT, at your option. Some plugin assets have their own licences; see [Plugins](/en/developers#plugins).
- **No Apple identity.** The repositories and their builds contain no Apple accessory (MFi) identity; a working setup needs one supplied by the user.

## Commercial exemptions {#exemptions}

If your organisation’s policies don’t permit AGPL-3.0 software, or you want to avoid the obligations of AGPL-3.0, contact [support@openxplay.org](mailto:support@openxplay.org). Exemptions cover the code OpenXPlay owns in OpenXPlay-Stream and OpenXPlay-Relay; the parts derived from DiPlay and xcertplay stay under GPL-3.0. OpenXPlay-Hardware has no exemptions.

## Trademarks {#trademarks}

CarPlay and iPhone are trademarks of Apple Inc. OpenXPlay is an independent project and is not affiliated with, endorsed or certified by Apple or by any head-unit or box maker. Third-party code, dependencies and assets keep their own licences; see the licence and notice files in each repository.

## This website {#website}

The code of this website is licensed under MIT and its written content under CC BY 4.0. Images taken from the OpenXPlay repository keep their own terms. The source is in the `site` directory of [OpenXPlay](https://github.com/OpenXPlay/OpenXPlay/tree/main/site).
