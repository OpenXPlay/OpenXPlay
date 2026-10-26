---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: 'Developers: architecture, repositories, builds and plugins'
description: How OpenXPlay is built — inputs, outputs and relay shells that talk only through the OXP-Stream model — plus what each repository does, build and test commands, how to contribute, and web receiver plugins.
breadcrumb: Developers
---

# Developers

OpenXPlay is built from independent components: inputs that receive a projection session, outputs that deliver it to software on the head unit, and relay shells that wire the two together. Components talk to each other only through the OXP-Stream model. Licences and commercial exemptions are under [Licensing](/en/licensing).

## Architecture {#architecture}

Every component is an input, an output or a relay shell, and no component depends on another:

| Part | Role | Where it lives |
| --- | --- | --- |
| Input | Receives the session from the phone. The CarPlay input is the relay’s CarPlay receiver. | OpenXPlay-DiPlay (Android app); the Rust CarPlay receiver `openxplay-relay` with the `carplay-iap2` and `carplay-airplay` crates (Linux relay) |
| OXP-Stream model | The shared session model: video, audio, touch and keys. Components use it in process or over the Stream wire protocol. | `core` in OpenXPlay-Stream |
| Output | Delivers the session to software the head unit already has: browser (`web`), Carlink (`clink`) and screen casting (`cast`). | OpenXPlay-Stream |
| Relay shell | Wires an input to outputs and translates between them. | OpenXPlay-Relay: the Android app and the Linux relay |

Because outputs talk only to the OXP-Stream model, the same outputs serve every relay. The model and the outputs are implemented three times — Kotlin/JVM for the Android app, Rust for the Linux relay and TypeScript for the browser — and shared protocol test vectors keep the three in step.

The web output sends H.264 video over a secure WebSocket; the head-unit browser decodes it with WebCodecs and returns touch to the iPhone. On the Linux relay, the Rust outputs run as a separate `oxp-relay` process next to the `openxplay-relay` CarPlay receiver.

## Repositories {#repositories}

| Repository | Role | Licence |
| --- | --- | --- |
| [OpenXPlay](https://github.com/OpenXPlay/OpenXPlay) | Project entry: README and diagrams | — |
| [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) | OpenXPlay Relay: the Android app and the Linux relay, with the web admin page both share | AGPL-3.0-only; files derived from DiPlay and xcertplay stay GPL-3.0-only |
| [OpenXPlay-Stream](https://github.com/OpenXPlay/OpenXPlay-Stream) | Outputs to head-unit receivers — browser, Carlink and screen casting — and the shared model | AGPL-3.0-only |
| [OpenXPlay-DiPlay](https://github.com/OpenXPlay/OpenXPlay-DiPlay) | The CarPlay receiver used by the Android relay, forked from DiPlay | GPL-3.0 |
| [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware) | Support files for relay devices, one directory per device, such as `UFI003/` | OpenXPlay-Hardware License (open source, no commercial use); Linux kernel parts stay GPL-2.0-only |
| [OpenXPlay-Web-Plugins](https://github.com/OpenXPlay/OpenXPlay-Web-Plugins) | Optional plugins for the web receiver: spec, SDK, host, tools and official plugins | Apache-2.0 OR MIT |

## Build and test {#build}

The relays package Stream’s `web/dist`, so build the web receiver before a relay.

::: details Build and test commands for each part {#build-commands}
| Part | Requirements | Commands |
| --- | --- | --- |
| Web receiver (Stream) | Node.js 20.19+ or 22.12+ | `cd web && npm ci && npm test && npm run build` |
| Kotlin outputs (Stream) | JDK 17 | `cd kotlin && ./gradlew test` |
| Rust outputs (Stream) | Rust stable | `cd rust && cargo test --workspace` |
| Admin page (Relay) | Node.js 20.19+ or 22.12+ | `cd admin-web && npm ci && npm test && npm run build` |
| Android app (Relay) | JDK 17, Android SDK; the admin page and Stream’s `web/dist` built first | `cd android && ./gradlew testDebugUnitTest assembleDebug` |
| Linux relay (Relay) | Rust stable | `cd rust && cargo test` |
| aarch64 Linux builds (Stream and Relay) | `rustup target add aarch64-unknown-linux-musl`, `llvm-tools`, clang | `rust/scripts/build-aarch64.sh` |
| Plugins (Web-Plugins) | Node 22 | `npm ci && npm run build && npm test` |
:::

The Android build includes DiPlay and Stream as Gradle composite builds and expects them next to OpenXPlay-Relay (`../OpenXPlay-DiPlay`, `../OpenXPlay-Stream`); `-Pdiplay.dir=PATH` and `-Pstream.dir=PATH` point elsewhere.

## Contributing {#contributing}

| Repository | How contributions are accepted |
| --- | --- |
| Every repository | Under the [OpenXPlay Contributor License Agreement](https://github.com/OpenXPlay/OpenXPlay/blob/main/CLA.md). Accept it once by replying on a pull request to any OpenXPlay repository, as the CLA check asks; it then passes in all of them. To contribute on behalf of an organisation, contact [support@openxplay.org](mailto:support@openxplay.org) for a corporate agreement first. |
| OpenXPlay-DiPlay | The fork stays close to upstream DiPlay, so keep changes minimal and generic. |

This project did not reverse-engineer commercial CarPlay boxes. Parts of the Android receiver reuse code from DiPlay and xcertplay; thanks to the upstream projects and their contributors.

## Plugins {#plugins}

Plugins add small, offline extras to the web receiver. They are optional and **off by default**: with plugins off, the reference receiver creates no plugin frame and makes no plugin requests, and the relay’s plugin routes and channels refuse access. Stream and Relay implement the plugin contract (`oxp-web-plugin/0`) themselves and never depend on OpenXPlay-Web-Plugins. Reviewed plugin packages run without network access under sandbox, CSP and guard layers. Turn plugins on in the relay admin page; they run in the head-unit browser and don’t affect CarPlay.

| Official plugin | What it does | Licence |
| --- | --- | --- |
| Cozy Cats (`cats`) | Four pixel cats with gentle daily routines and a play room while parked | Code Apache-2.0 OR MIT; cat art CC0 1.0 |
| Pocket Playroom (`games`) | Offline tap games for parked moments | Apache-2.0 OR MIT |
| Quiet Lights (`visuals`) | Song progress, album glow, a local-time sky and a parked fireplace | Apache-2.0 OR MIT |
| Whale Girl (`whale-girl`) | An optional, non-commercial community character companion | Code Apache-2.0 OR MIT; art CC BY-NC-SA 4.0 and 大肥鱼项目署名许可 1.0 |

**Whale Girl attribution.** 鲸鱼娘 by 上善无形 ([source](https://www.bilibili.com/opus/1231977657712771073)), CC BY-NC-SA 4.0. Maid design by ZipZipPipe ([source](https://www.pixiv.net/artworks/148186519)), CC BY-NC-SA 4.0. Sprite atlas by YunYueSama ([codex-deepseek-pet](https://github.com/YunYueSama/codex-deepseek-pet)), 大肥鱼项目署名许可 1.0. Modified by OpenXPlay.org on 2026-10-16 (apron emblem removed, rows relabelled) and released under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). The character is a community fan character, not affiliated with or endorsed by DeepSeek, and its assets may not be used commercially.

**Cozy Cats attribution.** Pet Cats Pack by LuizMelo ([source](https://luizmelo.itch.io/pet-cat-pack)), CC0 1.0, recoloured by OpenXPlay.org.

To build your own plugin, start with the simulator: `npm run dev -- --enable` in OpenXPlay-Web-Plugins loads the official plugins at `http://localhost:5173`. `npm run validate` checks a package and `npm run pack` builds one; the [repository README](https://github.com/OpenXPlay/OpenXPlay-Web-Plugins) covers the rest.
