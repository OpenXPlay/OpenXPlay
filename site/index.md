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
  tagline: 用一部安卓手机或一个 UFI003 随身 Wi-Fi 作中继，iPhone 的 CarPlay 就能显示在车机自带的浏览器里。车机上什么都不用装。
  actions:
    - theme: brand
      text: 开始使用
      link: /quick-start
    - theme: alt
      text: 检测我的车机
      link: /check
featuresTitle: 三步用上 CarPlay
features:
  - title: 检测车机
    details: 在车机浏览器中打开 openxplay.org/check，看看它能否显示 CarPlay。
    link: /check
    linkText: 开始检测
  - title: 准备中继
    details: 在安卓手机上安装 OpenXPlay Relay 应用，或者把 UFI003 随身 Wi-Fi 刷成中继。
    link: /quick-start
    linkText: 选择方案
  - title: 上车连接
    details: iPhone 连上中继后，在车机浏览器中打开中继显示的地址，轻触一下屏幕即可开始。
    link: /android-relay
    linkText: 查看教程
---

## 开始前需要准备 {#requirements}

<div class="oxp-checklist">

- **支持 CarPlay 的 iPhone**：通过无线或 USB 线连接中继。
- **一台中继**：Android 8.0 及以上的安卓手机，或 UFI003 随身 Wi-Fi。
- **Apple 配件（MFi）身份**：两个文件，需要由你自行提供，项目不附带。[了解更多](/quick-start#mfi-identity)
- **车机浏览器**：需要支持 WebCodecs 视频解码，可以[先检测](/check)。

</div>

## 适合谁 {#who-it-is-for}

OpenXPlay 主要面向**无法在车机上安装第三方软件、但希望使用 CarPlay 的车主**。它不会修改车机系统：接收和连接由手机或外部设备完成，CarPlay 通过车机已有的入口显示。

| 你的车机 | 适合的方案 |
| --- | --- |
| 无法安装应用 | **OpenXPlay**：由手机或外部设备承接相关能力，借助车机已有的浏览器、Carlink 应用等入口显示 CarPlay。 |
| 可以安装应用 | **[DiPlay](https://github.com/shihabal3amri/DiPlay)**：在兼容的安卓车机上安装应用，由车机直接接收并显示 CarPlay。 |

想知道它具体怎样工作、支持哪些车机入口，请看[工作原理](/how-it-works)。

## 常见疑问 {#questions}

::: details 车机上需要安装什么吗？
不需要。接收和连接都由中继完成，车机只用它已有的浏览器或 Carlink 应用，也不会修改车机系统。
:::

::: details 免费吗？
免费。软件以 AGPL-3.0 开源。要正常使用，还需要一个由你自行提供的 Apple 配件（MFi）身份。详见[许可证](/licensing)。
:::

::: details 我的车机能用吗？
关键在于车机浏览器：它需要支持 WebCodecs 视频解码。在车机浏览器中打开[检测车机](/check)就能知道；实测过的车机列在[车机资料](/head-units)中。
:::

::: details 会把我的数据发到别处吗？
OpenXPlay 通过本地连接工作：视频、音频和触控经蓝牙、Wi-Fi 或 USB 在 iPhone、中继和车机之间传输，网页接收端和管理页面都由中继自己提供。详见[常见问题](/faq#data)。
:::

更多问题见[常见问题](/faq)；遇到连接、画面或声音的问题，请看[故障排查](/troubleshooting)。

## 加入交流群 {#join}

分享车机适配情况、反馈问题，或参与测试与开发：QQ 群 **1015739350**，另有微信群和 [Discord](https://discord.gg/j3cKd5Tax)。入群二维码见[交流群](/community)。
