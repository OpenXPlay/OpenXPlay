---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: 常见问题与故障排查
description: OpenXPlay 常见问题与解决办法：证书警告、车机只能连 2.4 GHz Wi-Fi、蓝牙配对、iPhone 连不上、延迟、断电和隐私。
breadcrumb: 常见问题
schema: faq
---

# 常见问题与故障排查

大多数问题都和车机浏览器、Wi-Fi 频段或蓝牙配对有关。请在下面找找你的问题；如果没有找到答案，可以到[交流群](/#community)提问，并附上车机型号、系统版本、所选方案和问题现象。

## 关于 OpenXPlay {#about}

### OpenXPlay 是什么？ {#what-is-openxplay}

OpenXPlay 让无法安装应用的安卓车机也能显示 iPhone CarPlay。由一台中继（运行 OpenXPlay Relay 应用的安卓手机，或 UFI003 USB 随身 Wi-Fi 这类小型 Linux 设备）连接 iPhone，再把 CarPlay 交给车机上已有的软件显示，例如车机浏览器或 Carlink 应用。

### 车机上需要安装什么吗？ {#install-on-head-unit}

不需要。接收和连接都由中继完成，车机只用它已有的浏览器或 Carlink 应用，也不会修改车机系统。

### 哪些车机可以用？ {#which-head-units}

OpenXPlay 实测过的车机列在[车机资料](/head-units)中，目前收录了小鹏 G6。对网页接收端来说，关键在于车机浏览器：它需要支持 WebCodecs H.264 解码。如果你的车机还没有测试过，请在车机浏览器中打开[检测车机](/check)测试，并把结果分享到交流群。

### OpenXPlay 和 DiPlay 有什么区别？ {#diplay}

DiPlay 面向能够安装应用的车机：在兼容的安卓车机上安装后，由车机直接接收并显示 CarPlay。OpenXPlay 主要面向无法安装应用的车机：由手机或外部设备承接相关能力，借助车机已有的浏览器、Carlink 应用等入口显示 CarPlay。

### OpenXPlay 免费吗？ {#free}

免费。软件以 AGPL-3.0 开源，可以免费使用。要正常使用，还需要一个由你自行提供的 Apple 配件（MFi）身份；各仓库及其构建产物都不包含该身份。无法使用 AGPL-3.0 的组织可以发邮件到 [support@openxplay.org](mailto:support@openxplay.org) 申请豁免。

## 设置与连接 {#setup}

### 浏览器为什么显示证书警告？ {#certificate-warning}

浏览器只在安全页面中提供 WebCodecs 视频解码，所以中继通过 HTTPS 提供网页接收端，并使用自己签发的证书。浏览器无法验证这种自签证书，因此第一次打开时会显示警告。连接仍然是加密的：确认地址是你的中继后继续访问即可。中继生成新证书后，警告可能会再次出现。安卓中继也可以改为导入你自己的证书。详见[关于证书警告](/quick-start#certificate-warning)。

### 车机只能搜到 2.4 GHz 的 Wi-Fi {#only-2-4-ghz}

让车机连接 2.4 GHz 网络：

- UFI003 的 Wi-Fi 没有 5 GHz 频段，它的热点始终是 2.4 GHz。
- 使用安卓中继时，在应用设置中把车机热点频段设为 2.4 GHz。
- 使用共用 Wi-Fi 时，这个网络必须提供 2.4 GHz。UFI003 本身也只能发现 2.4 GHz 网络。

使用 Carlink 时，如果车机的 Carlink Wi-Fi 工作在 5 GHz，UFI003 无法连接。

### iPhone 无法通过蓝牙配对 {#bluetooth-pairing}

请在中继准备好配对时再操作：

- 使用 Linux 中继时，在管理页面中点“配对 iPhone”，配对窗口开放 10 分钟。在 iPhone 上打开“设置 → 蓝牙”，选择这台中继。
- 使用安卓中继时，为 OpenXPlay Relay 允许“附近的设备”权限；当中继手机请求对 iPhone 可见时，点“允许”。
- 如果 iPhone 忘记了这台中继，或者换了一部新 iPhone，请在中继上重新开放配对。
- 如果中继配对了多部手机，请在设置的“首选 iPhone”中选择你的 iPhone。
- UFI003 上有蓝牙守护程序，控制器出错时会自动重启。如果管理页面提示蓝牙没有启动，请拔下随身 Wi-Fi 再重新插上。

### iPhone 连不上 CarPlay {#iphone-not-connecting}

请按顺序检查：

- 让 iPhone 靠近中继，并保持蓝牙和 Wi-Fi 开启。
- 确认中继里有有效的 CarPlay 身份。没有身份时，安卓应用不会启动 CarPlay。
- 使用共用 Wi-Fi 时，iPhone、中继和车机必须在同一个网络中，并且路由器允许设备之间互相访问。
- 在应用或管理页面中查看中继状态：等待 iPhone、正在连接或已连接。
- 更改网络模式后，iPhone 会自动切换到新网络，CarPlay 大约 30 秒后重新连接。
- 如果仍然不行，在管理页面中重启中继服务。

### 车机浏览器提示“浏览器不受支持” {#video-not-supported}

浏览器缺少 WebCodecs 视频解码，或者页面不是通过 HTTPS 打开的。请打开中继的 `https://` 地址；如果车机有其他浏览器，换一个试试，并运行[检测车机](/check)。如果所有浏览器都不行，可以试试 [Carlink 路线](/quick-start#carlink)。

### 页面提示“无法连接中继设备” {#relay-unreachable}

车机没有连接中继的网络，或者中继已经关闭。请保持中继开启，在车机上连接中继的热点（或共用 Wi-Fi），再打开中继显示的地址。

### 没有声音 {#no-sound}

浏览器在你触摸页面之前会阻止播放声音。如果网页接收端提示声音已暂停，轻触一下屏幕即可。如果仍然没有声音，请运行[检测车机](/check)：浏览器需要 AudioWorklet 才能播放 CarPlay 音频。

### Siri 或通话听不到我说话 {#microphone}

CarPlay 第一次需要你的声音时，浏览器会请求麦克风权限，请选择“允许”。麦克风只能在 HTTPS 下使用。使用安卓中继时，还要允许应用的麦克风权限；应用中的“麦克风来源”可以选择使用车机还是中继手机的麦克风。

## 性能 {#performance}

### 延迟大概有多少？ {#delay}

仓库中暂时还没有公布延迟数据。中继把 iPhone 的视频（H.264 或 H.265）经安全 WebSocket 发给车机，由车机浏览器用 WebCodecs 解码，所以延迟主要取决于 Wi-Fi 连接和车机的解码能力。在网页接收端设置的“播放模式”中，“速度优先”延迟最低，但可能跳过部分画面；“质量优先”画面最流畅，延迟略高；“智能”会根据网络自动平衡两者。

### 画面卡顿 {#stutter}

- 运行[检测车机](/check)。如果浏览器只能软件解码，画面可能卡顿。
- 在网页接收端的设置中，试试降低帧率，或把播放模式改为“速度优先”。
- 安卓中继同时使用 Carlink 时，用 USB 有线连接 CarPlay 比无线更可靠。

## 车上使用 {#in-the-car}

### 汽车断电后会怎样？ {#power-cuts}

恢复供电后，中继会重新启动：

- Linux 中继作为系统服务运行，开机自动启动，出错时自动重启。它启动时不等待网络连接或时间同步；即使设备时钟不准，证书也依然有效。如果生成证书时时钟不准，中继会在时钟同步后替换这些证书，浏览器可能需要你重新接受新证书。
- 安卓应用可以在手机开机时自动启动。部分手机会阻止自启动；如果 OpenXPlay Relay 没有打开，请手动打开。

## 隐私 {#privacy}

### OpenXPlay 会把我的数据发到别处吗？ {#data}

OpenXPlay 通过本地连接工作。网页接收端和管理页面都由中继自己提供；视频、音频和触控经蓝牙、Wi-Fi 或 USB 在 iPhone、中继和车机之间传输，Linux 中继启动时也不等待互联网连接。插件默认关闭，在车机浏览器中离线运行。来自 Carlink 的车辆信息只在你开启后才会收集，并且只保存在中继手机上。本网站没有任何统计分析，检测页也只在你的浏览器中运行。

### 中继的管理页面有保护吗？ {#admin-password}

有。管理页面使用 HTTPS，并需要管理密码登录。登录页会显示首次使用的密码，请登录后立即修改。只要还在使用默认密码，管理页面就会提醒你。
