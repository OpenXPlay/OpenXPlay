---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: 开发者：架构、仓库、构建与插件
description: OpenXPlay 的构成：输入、输出和中继外壳只通过 OXP-Stream 模型交互；各仓库的作用、构建与测试命令、参与贡献的方式，以及网页接收端插件。
breadcrumb: 开发者
---

# 开发者

OpenXPlay 由相互独立的组件构成：输入负责接收投屏会话，输出负责把会话交给车机上的软件，中继外壳把两者连接起来。组件之间只通过 OXP-Stream 模型交互。许可证和商业豁免见[许可证](/licensing)。

## 架构 {#architecture}

每个组件都是输入、输出或中继外壳之一，组件之间互不依赖：

| 部分 | 作用 | 所在位置 |
| --- | --- | --- |
| 输入 | 从手机接收会话。CarPlay 输入就是中继里的 CarPlay 接收端。 | OpenXPlay-DiPlay（安卓应用）；Rust 编写的 CarPlay 接收端 `openxplay-relay` 及 `carplay-iap2`、`carplay-airplay` crate（Linux 中继） |
| OXP-Stream 模型 | 共享的会话模型：视频、音频、触控和按键。组件可以在进程内使用它，也可以通过 Stream 传输协议使用。 | OpenXPlay-Stream 的 `core` |
| 输出 | 把会话交给车机上已有的软件：浏览器（`web`）、Carlink（`clink`）和投屏（`cast`）。 | OpenXPlay-Stream |
| 中继外壳 | 把输入接到输出，并负责两者之间的转换。 | OpenXPlay-Relay：安卓应用和 Linux 中继 |

由于输出只与 OXP-Stream 模型交互，同一套输出可以服务所有中继。模型和各输出按运行时分别实现了三套：安卓应用用 Kotlin/JVM，Linux 中继用 Rust，浏览器用 TypeScript；共享的协议测试向量让三套实现保持一致。

Web 输出把 H.264 视频经安全 WebSocket 发给车机，车机浏览器用 WebCodecs 解码，并把触控传回 iPhone。在 Linux 中继上，Rust 版输出作为独立的 `oxp-relay` 进程，与 CarPlay 接收端 `openxplay-relay` 并行运行。

## 仓库 {#repositories}

| 仓库 | 作用 | 许可证 |
| --- | --- | --- |
| [OpenXPlay](https://github.com/OpenXPlay/OpenXPlay) | 项目入口：README 和示意图 | — |
| [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) | OpenXPlay Relay：安卓应用和 Linux 中继，以及两者共用的网页管理页面 | AGPL-3.0-only；派生自 DiPlay 和 xcertplay 的文件仍为 GPL-3.0-only |
| [OpenXPlay-Stream](https://github.com/OpenXPlay/OpenXPlay-Stream) | 输出到车机接收端（浏览器、Carlink 和投屏），以及共享模型 | AGPL-3.0-only |
| [OpenXPlay-DiPlay](https://github.com/OpenXPlay/OpenXPlay-DiPlay) | 安卓中继使用的 CarPlay 接收端，派生自 DiPlay | GPL-3.0 |
| [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware) | 中继设备的支持文件，每种设备一个目录，例如 `UFI003/` | OpenXPlay-Hardware License（开源，禁止商用）；Linux 内核部分仍为 GPL-2.0-only |
| [OpenXPlay-Web-Plugins](https://github.com/OpenXPlay/OpenXPlay-Web-Plugins) | 网页接收端的可选插件：规范、SDK、宿主、工具和官方插件 | Apache-2.0 OR MIT |

## 构建与测试 {#build}

中继会打包 Stream 的 `web/dist`，因此请先构建网页接收端，再构建中继。

::: details 各部分的构建与测试命令 {#build-commands}
| 部分 | 要求 | 命令 |
| --- | --- | --- |
| 网页接收端（Stream） | Node.js 20.19+ 或 22.12+ | `cd web && npm ci && npm test && npm run build` |
| Kotlin 输出（Stream） | JDK 17 | `cd kotlin && ./gradlew test` |
| Rust 输出（Stream） | Rust 稳定版 | `cd rust && cargo test --workspace` |
| 管理页面（Relay） | Node.js 20.19+ 或 22.12+ | `cd admin-web && npm ci && npm test && npm run build` |
| 安卓应用（Relay） | JDK 17、Android SDK；需先构建管理页面和 Stream 的 `web/dist` | `cd android && ./gradlew testDebugUnitTest assembleDebug` |
| Linux 中继（Relay） | Rust 稳定版 | `cd rust && cargo test` |
| 面向 aarch64 Linux 的构建（Stream 和 Relay） | `rustup target add aarch64-unknown-linux-musl`、`llvm-tools`、clang | `rust/scripts/build-aarch64.sh` |
| 插件（Web-Plugins） | Node 22 | `npm ci && npm run build && npm test` |
:::

安卓构建以 Gradle 复合构建的方式引入 DiPlay 和 Stream，默认要求它们检出在 OpenXPlay-Relay 旁边（`../OpenXPlay-DiPlay`、`../OpenXPlay-Stream`）；可用 `-Pdiplay.dir=PATH` 和 `-Pstream.dir=PATH` 指定其他位置。

## 参与贡献 {#contributing}

| 仓库 | 贡献方式 |
| --- | --- |
| 所有仓库 | 遵循 [OpenXPlay 贡献者许可协议](https://github.com/OpenXPlay/OpenXPlay/blob/main/CLA.md)（协议文本为英文）。在任意一个 OpenXPlay 仓库的 pull request 里按 CLA 检查的提示回复一次即可，之后所有仓库都会通过。如需代表组织贡献，请先联系 [support@openxplay.org](mailto:support@openxplay.org) 签订企业协议。 |
| OpenXPlay-DiPlay | 这个派生仓库与上游 DiPlay 保持同步，请让改动尽量小而通用。 |

本项目未对市售 CarPlay 盒子进行逆向工程。项目部分安卓接收能力复用了 DiPlay 和 xcertplay 的实现，感谢上游项目及贡献者的工作。

## 插件 {#plugins}

插件为网页接收端增加一些离线的小功能。插件是可选的，**默认关闭**：插件关闭时，参考接收端不会创建插件 frame，也不会发出插件请求；中继的插件路由和通道会拒绝访问。Stream 和 Relay 各自实现插件契约（`oxp-web-plugin/0`），从不依赖 OpenXPlay-Web-Plugins。经过审核的插件包在沙箱、CSP 和防护层下运行，无法访问网络。插件可以在中继管理页面中开启，它们在车机浏览器中运行，不影响 CarPlay。

| 官方插件 | 功能 | 许可证 |
| --- | --- | --- |
| 猫咪伙伴（`cats`） | 四种像素猫咪，日常安静陪伴，停车后接球玩耍 | 代码 Apache-2.0 OR MIT；猫咪素材 CC0 1.0 |
| 口袋游戏屋（`games`） | 停车时玩的离线轻触游戏 | Apache-2.0 OR MIT |
| 静谧光景（`visuals`） | 歌曲进度光带、封面氛围光、日夜天空和驻车壁炉 | Apache-2.0 OR MIT |
| 鲸鱼娘（`whale-girl`） | 可选的非商业社区角色伙伴 | 代码 Apache-2.0 OR MIT；素材 CC BY-NC-SA 4.0 及大肥鱼项目署名许可 1.0 |

**鲸鱼娘署名。** 鲸鱼娘 by 上善无形（[来源](https://www.bilibili.com/opus/1231977657712771073)），CC BY-NC-SA 4.0。女仆设计：ZipZipPipe（[来源](https://www.pixiv.net/artworks/148186519)），CC BY-NC-SA 4.0。精灵图集：YunYueSama（[codex-deepseek-pet](https://github.com/YunYueSama/codex-deepseek-pet)），大肥鱼项目署名许可 1.0。由 OpenXPlay.org 于 2026-10-16 修改（移除围裙徽标、重新标注各行），以 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans) 发布。本角色是社区同人角色，与 DeepSeek 无关联，亦未经其认可或代言；素材不得用于商业用途。

**猫咪伙伴署名。** Pet Cats Pack by LuizMelo（[来源](https://luizmelo.itch.io/pet-cat-pack)），CC0 1.0，由 OpenXPlay.org 重新配色。

想开发自己的插件，可以从模拟器开始：在 OpenXPlay-Web-Plugins 中运行 `npm run dev -- --enable`，会在 `http://localhost:5173` 加载官方插件。`npm run validate` 用于校验插件包，`npm run pack` 用于打包；其余内容见[仓库 README](https://github.com/OpenXPlay/OpenXPlay-Web-Plugins)。
