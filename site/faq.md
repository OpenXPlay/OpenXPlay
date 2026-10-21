---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: 常见问题
description: 关于 OpenXPlay 的常见问题：它是什么、车机上要不要装软件、哪些车机能用、和 DiPlay 的区别、是否免费、延迟、断电和隐私。
breadcrumb: 常见问题
schema: faq
---

# 常见问题

::: tip 遇到问题？
证书警告、Wi-Fi、蓝牙配对、画面或声音的问题，请看[故障排查](/troubleshooting)。
:::

## 关于 OpenXPlay {#about}

### OpenXPlay 是什么？ {#what-is-openxplay}

OpenXPlay 让无法安装应用的安卓车机也能显示 iPhone CarPlay。由一台中继（运行 OpenXPlay Relay 应用的安卓手机，或 UFI003 USB 随身 Wi-Fi 这类小型 Linux 设备）连接 iPhone，再把 CarPlay 交给车机上已有的软件显示，例如车机浏览器或 Carlink 应用。详见[工作原理](/how-it-works)。

### 车机上需要安装什么吗？ {#install-on-head-unit}

不需要。接收和连接都由中继完成，车机只用它已有的浏览器或 Carlink 应用，也不会修改车机系统。

### 哪些车机可以用？ {#which-head-units}

OpenXPlay 实测过的车机列在[车机资料](/head-units)中，目前收录了小鹏 G6。对网页接收端来说，关键在于车机浏览器：它需要支持 WebCodecs H.264 解码。如果你的车机还没有测试过，请在车机浏览器中打开[检测车机](/check)测试，并把结果分享到[交流群](/community)。

### OpenXPlay 和 DiPlay 有什么区别？ {#diplay}

DiPlay 面向能够安装应用的车机：在兼容的安卓车机上安装后，由车机直接接收并显示 CarPlay。OpenXPlay 主要面向无法安装应用的车机：由手机或外部设备承接相关能力，借助车机已有的浏览器、Carlink 应用等入口显示 CarPlay。

### OpenXPlay 免费吗？ {#free}

免费。软件以 AGPL-3.0 开源，可以免费使用。要正常使用，还需要一个由你自行提供的 Apple 配件（MFi）身份；各仓库及其构建产物都不包含该身份。无法使用 AGPL-3.0 的组织可以发邮件到 [support@openxplay.org](mailto:support@openxplay.org) 申请豁免。UFI003 等设备的支持文件（OpenXPlay-Hardware）沿用 OpenStick 的条款，个人可以免费使用，但禁止商用，也不提供豁免。详见[许可证](/licensing)。

## 使用 {#usage}

### 延迟大概有多少？ {#delay}

仓库中暂时还没有公布延迟数据。中继把 iPhone 的视频（H.264 或 H.265）经安全 WebSocket 发给车机，由车机浏览器用 WebCodecs 解码，所以延迟主要取决于 Wi-Fi 连接和车机的解码能力。在网页接收端设置的“播放模式”中，“速度优先”延迟最低，但可能跳过部分画面；“质量优先”画面最流畅，延迟略高；“智能”会根据网络自动平衡两者。

### 汽车断电后会怎样？ {#power-cuts}

恢复供电后，中继会重新启动：

- Linux 中继作为系统服务运行，开机自动启动，出错时自动重启。它启动时不等待网络连接或时间同步；即使设备时钟不准，证书也依然有效。如果生成证书时时钟不准，中继会在时钟同步后替换这些证书，浏览器可能需要你重新接受新证书。
- 安卓应用可以在手机开机时自动启动。部分手机会阻止自启动；如果 OpenXPlay Relay 没有打开，请手动打开。

## 隐私与安全 {#privacy}

### OpenXPlay 会把我的数据发到别处吗？ {#data}

OpenXPlay 通过本地连接工作。网页接收端和管理页面都由中继自己提供；视频、音频和触控经蓝牙、Wi-Fi 或 USB 在 iPhone、中继和车机之间传输，Linux 中继启动时也不等待互联网连接。插件默认关闭，在车机浏览器中离线运行。来自 Carlink 的车辆信息只在你开启后才会收集，并且只保存在中继手机上。本网站没有任何统计分析，检测页也只在你的浏览器中运行。

### 中继的管理页面有保护吗？ {#admin-password}

有。管理页面使用 HTTPS，并需要管理密码登录。登录页会显示首次使用的密码，请登录后立即修改。只要还在使用默认密码，管理页面就会提醒你。
