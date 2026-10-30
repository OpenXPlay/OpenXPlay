---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 工作原理：iPhone、中继和车机怎样连起来
description: OpenXPlay 的中继连接路线：iPhone 连接安卓或 Linux 中继，中继充当 CarPlay 接收端，再把视频、音频和触控转给车机的浏览器、Carlink 应用等入口。
breadcrumb: 工作原理
---

# 工作原理

iPhone 连接到一台中继：运行 OpenXPlay Relay 应用的安卓手机，或 UFI003 USB 随身 Wi-Fi 这类小型 Linux 设备。中继充当 CarPlay 接收端，再把视频、音频和触控转给车机。车机上不需要安装任何东西，也不会修改车机系统。

<figure class="oxp-figure">
  <img src="../assets/openxplay-relay-animated-zh.svg" width="1800" height="1120" loading="lazy" decoding="async" alt="OpenXPlay 中继连接路线：iPhone 通过 Wi-Fi 或 USB 连接安卓中继或 Linux 中继，再经车机的浏览器、Carlink、无线投屏或有线投屏入口显示在车机屏幕上。">
  <figcaption>OpenXPlay 的一条中继路线，仅涵盖项目的部分方案组合。蓝色和紫色光点分别表示安卓和 Linux 中继的数据流。</figcaption>
</figure>

## 车机入口 {#entries}

目前，中继可以把 CarPlay 送到这些车机入口：

| 车机入口 | 工作方式 | 触控 | 状态 |
| --- | --- | --- | --- |
| 浏览器（网页接收端） | H.264 视频经安全 WebSocket 传输，由 WebCodecs 解码 | 支持 | 开发中 |
| Carlink 应用 | 经 Wi-Fi 连接 | 支持 | 实验性 |
| 投屏接收端（DLNA、Miracast） | 投屏 | 不支持 | 测试中（安卓开发者选项） |
| 特斯拉浏览器 | [网页接收端](/tesla)，使用特斯拉浏览器能打开的地址 | 支持 | 实验性 |

## 最多 28 种组合 {#combinations}

你可以把 OpenXPlay 理解为一套可自由组合的 CarPlay 接入方案：Android、Linux 和 iOS 端实现，USB、蓝牙和 Wi-Fi 连接，以及浏览器、Carlink 等显示方式。它涵盖部分市售 CarPlay 盒子的能力，同时提供更多连接与显示路径。**本项目提供的技术通过不同组合，最多可形成 28 种解决方案**，你可以根据车机条件和手头设备选择适合自己的组合。

## 极致精简，成本低廉 {#lean}

| 指标 | 占用／成本 |
| --- | --- |
| 常驻内存 | 4.3 MB |
| 磁盘占用 | 5 MB |
| 硬件成本 | 低至 15 元人民币／3 美元，不含 MFi 部分 |

以上数据对应特定方案与运行配置，实际资源占用和成本随所选方案、设备及环境而变化。

## 开源 {#open-source}

OpenXPlay 的中继和输出以 AGPL-3.0 开源，组件之间只通过一个共享的会话模型交互。架构、仓库和构建方法见[开发者](/developers)，许可证与商业豁免见[许可证](/licensing)。
