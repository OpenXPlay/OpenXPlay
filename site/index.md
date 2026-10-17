---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
layout: home
title: OpenXPlay：车机装不了软件，也能用 CarPlay
titleTemplate: false
description: OpenXPlay 让无法安装应用的安卓车机也能显示 iPhone CarPlay：由安卓手机或小型 Linux 设备作为中继，通过车机自带的浏览器或 Carlink 应用显示。开源项目。
hero:
  name: OpenXPlay
  text: 车机装不了软件，也能用 CarPlay
  tagline: OpenXPlay 让无法安装第三方应用的安卓车机也能显示 iPhone CarPlay。由一台中继设备（安卓手机或小型 Linux 设备）连接 iPhone，再把 CarPlay 交给车机上已有的软件显示，例如车机浏览器或 Carlink 应用。
  actions:
    - theme: brand
      text: 快速开始
      link: /quick-start
    - theme: alt
      text: 检测车机
      link: /check
features:
  - title: 快速开始
    details: 把安卓手机或 UFI003 USB 随身 Wi-Fi 设为中继，配对 iPhone，然后在车机上打开 CarPlay。
    link: /quick-start
    linkText: 开始设置
  - title: 检测车机
    details: 在车机浏览器中打开检测页，看看它能否运行网页接收端。
    link: /check
    linkText: 开始检测
  - title: 常见问题与故障排查
    details: 证书警告、2.4 GHz Wi-Fi、蓝牙配对、延迟、断电和隐私。
    link: /faq
    linkText: 查看解答
  - title: 开发者与许可证
    details: 架构、仓库、AGPL-3.0 与商业豁免、参与贡献和插件。
    link: /developers
    linkText: 参与开发
---

## 适合谁 {#who-it-is-for}

OpenXPlay 主要面向**无法在车机上安装第三方软件、但希望使用 CarPlay 的车主**。车机上不需要安装任何东西，也不会修改车机系统：接收和连接由手机或外部设备完成，CarPlay 通过车机已有的入口显示。

| 你的车机 | 适合的方案 |
| --- | --- |
| 无法安装应用 | **OpenXPlay**：由手机或外部设备承接相关能力，借助车机已有的浏览器、Carlink 应用等入口显示 CarPlay。 |
| 可以安装应用 | **[DiPlay](https://github.com/shihabal3amri/DiPlay)**：在兼容的安卓车机上安装应用，由车机直接接收并显示 CarPlay。 |

开发者也可以基于同一套组件进行开发：输入、输出和中继之间只通过一个共享的会话模型交互。详见[开发者与许可证](/developers)。

## 中继连接路线 {#relay-route}

iPhone 连接到一台中继：运行 OpenXPlay Relay 应用的安卓手机，或 UFI003 USB 随身 Wi-Fi 这类小型 Linux 设备。中继充当 CarPlay 接收端，再把视频、音频和触控转给车机。

<figure class="oxp-figure">
  <img src="../assets/openxplay-relay-animated-zh.svg" width="1800" height="1120" loading="lazy" decoding="async" alt="OpenXPlay 中继连接路线：iPhone 通过 Wi-Fi 或 USB 连接安卓中继或 Linux 中继，再经车机的浏览器、Carlink、无线投屏或有线投屏入口显示在车机屏幕上。">
  <figcaption>OpenXPlay 的一条中继路线，仅涵盖项目的部分方案组合。</figcaption>
</figure>

目前，中继可以把 CarPlay 送到这些车机入口：

| 车机入口 | 工作方式 | 触控 | 状态 |
| --- | --- | --- | --- |
| 浏览器（网页接收端） | H.264 视频经安全 WebSocket 传输，由 WebCodecs 解码 | 支持 | 开发中 |
| Carlink 应用 | 经 Wi-Fi 连接 | 支持 | 实验性 |
| 投屏接收端（DLNA） | 投屏 | 不支持 | 计划中 |

## 最多 28 种组合 {#combinations}

你可以把 OpenXPlay 理解为一套可自由组合的 CarPlay 接入方案：Android、Linux 和 iOS 端实现，USB、蓝牙和 Wi-Fi 连接，以及浏览器、Carlink 等显示方式。它涵盖部分市售 CarPlay 盒子的能力，同时提供更多连接与显示路径。**本项目提供的技术通过不同组合，最多可形成 28 种解决方案**，你可以根据车机条件和手头设备选择适合自己的组合。

## 极致精简，成本低廉 {#lean}

| 指标 | 占用／成本 |
| --- | --- |
| 常驻内存 | 4.3 MB |
| 磁盘占用 | 5 MB |
| 硬件成本 | 低至 15 元人民币／3 美元，不含 MFi 部分 |

以上数据对应特定方案与运行配置，实际资源占用和成本随所选方案、设备及环境而变化。

## 加入交流群 {#community}

欢迎分享车机适配情况、交流使用体验、反馈问题，参与项目测试与开发。

| 渠道 | 加入方式 |
| --- | --- |
| QQ 群 | 1015739350，或扫描下方二维码 |
| 微信群 | 扫描下方二维码 |
| Discord | [discord.gg/j3cKd5Tax](https://discord.gg/j3cKd5Tax) |

<figure class="oxp-figure is-narrow">
  <img src="../Group/Wechat_QQ_Group.jpg" width="1086" height="814" loading="lazy" decoding="async" alt="OpenXPlay QQ 群和微信群的入群二维码">
  <figcaption>微信群二维码会定期过期，二维码更新后这张图片也会随之更新。如果已经过期，可以先加入 QQ 群或 Discord，请大家帮忙邀请。</figcaption>
</figure>

反馈兼容性问题时，请尽量提供车机型号、系统版本、所选方案及问题现象。附上[检测车机](/check)生成的报告也很有帮助。
