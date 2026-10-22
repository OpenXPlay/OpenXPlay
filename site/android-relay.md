---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 用安卓手机作中继：在车机浏览器中显示 CarPlay
description: 一步步把安卓手机设为 OpenXPlay 中继：安装 OpenXPlay Relay，按设置向导选择网络，配对 iPhone，然后在车机浏览器中打开 CarPlay。车机上不用安装任何软件。
breadcrumb: 安卓手机作中继
schema: howto
howtoName: 用安卓手机作中继，在车机浏览器中显示 iPhone CarPlay
howtoTools:
  - 支持 CarPlay 的 iPhone
  - 装有 OpenXPlay Relay 应用的安卓手机（Android 8.0 及以上）
  - 你自行提供的 Apple 配件（MFi）身份
  - 浏览器支持 WebCodecs 的安卓车机
next:
  text: 日常使用与设置
  link: /daily-use
---

# 用安卓手机作中继

推荐的用法：一部安卓手机作中继，车机用自带的浏览器显示 CarPlay，车机上不用安装任何软件。第一次设置大约需要 10 分钟。

::: tip 开始前请准备
- 支持 CarPlay 的 iPhone
- Android 8.0 及以上的安卓手机
- Apple 配件（MFi）身份：`identity.pk8` 和 `certificate.p7b`，需要[自行提供](/quick-start#mfi-identity)
:::

## 检测车机浏览器 {#step-check .step}

在车机浏览器中打开 [openxplay.org/check](/check)。页面会检测浏览器能否解码 CarPlay 的视频；显示可以使用，再继续下面的步骤。

## 安装 OpenXPlay Relay {#step-install .step}

在中继手机上下载并安装 [openxplay-relay.apk](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk)（最新版本）。安装时如果系统提示，请允许从浏览器或文件管理器安装应用。

::: details 想要历史版本，或者自行构建？
历史版本见 [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases)，每个版本的变化见[更新日志](/changelog)。也可以按 [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) README 的说明自行构建。
:::

## 在设置向导中选择 {#step-guide .step}

第一次打开应用会进入设置向导，按顺序回答三个问题：

1. **车机用什么显示 CarPlay？** 选“车载浏览器”。
2. **iPhone 怎么连接这台手机？** 选“无线”：上车后 iPhone 会通过蓝牙和 Wi-Fi 自动连上。不推荐“USB 数据线”：中继手机要通过数据线给 iPhone 供电，而且对数据线有要求，USB-C 接口的 iPhone 用两头都是 USB-C 的线通常连不上（见[故障排查](/troubleshooting#usb-iphone-not-found)），选择时应用也会提醒。
3. **无线 CarPlay 用哪种网络？** iPhone、中继手机和车机之间需要能互相连通。按你的车选择一种，点开看说明：

::: details Wi-Fi 直连（推荐）：车机有自己的 Wi-Fi 热点 {#network-wifi-direct}
iPhone 直接连接中继手机；中继手机连接车机的热点（或其他 Wi-Fi），车机通过这个 Wi-Fi 打开网页。
:::

::: details 此手机的热点：车机没有热点，但能连接外部 Wi-Fi {#network-hotspot}
iPhone 和车机都连接中继手机的个人热点。

- 要在应用里填写与 Android 热点设置中相同的热点名称和密码。
- 建议在 Android 热点设置中把频段改为 5 GHz，2.4 GHz 下画面容易卡顿；车机连不上 5 GHz 热点时再改回 2.4 GHz。
- 部分手机连着 Wi-Fi 时只能开 2.4 GHz 热点，请先断开 Wi-Fi。
:::

::: details 共用 Wi-Fi：已经有一个大家都能连的 Wi-Fi {#network-shared}
iPhone、中继手机和车机都连接同一个 Wi-Fi，例如随身 Wi-Fi。路由器需要允许设备之间互相访问。
:::

## 完成准备 {#step-prepare .step}

向导列出还没完成的准备项，逐项处理。这些只需要做一次，之后会自动记住。

- **允许所需权限**：附近的设备（蓝牙）、附近的 Wi-Fi 设备、通知和麦克风。只有允许了麦克风，CarPlay 才会提供 Siri 和通话功能。使用 USB 连接时，还需要同意 Android 的 VPN 请求，用于转发 iPhone 的网络。
- **导入 CarPlay 身份**：选择 `identity.pk8` 和 `certificate.p7b`。可以在文件选择器中一次选中两个，也可以先后各选一个，顺序不限；也可以选择包含这两个文件的 ZIP。只选了一个时，应用会提示还缺哪一个。
- **配对 iPhone**（无线连接）：在 iPhone 上打开“设置 → 蓝牙”，选择这台中继手机，并按 iPhone 的提示允许使用 CarPlay。

## 连接车机网络 {#step-network .step}

让车机和中继手机连上第 3 步选择的网络：

- **Wi-Fi 直连**：在车机上打开 Wi-Fi 热点，中继手机连接这个热点。
- **此手机的热点**：在中继手机上打开个人热点，车机连接这个热点。
- **共用 Wi-Fi**：中继手机和车机都连接那个 Wi-Fi。

::: warning 请给热点设置密码
安卓中继不用配对码，车机打开地址即可连接。请务必给热点设置密码，只让你自己的设备连接。
:::

## 开启 CarPlay {#step-start .step}

在向导最后一步点“开启 CarPlay”。第一次连接时，请把 iPhone 解锁并放在中继手机附近。如果选了“此手机的热点”而热点还没打开，应用会提示，并可以直接打开热点设置；打开后回到应用，CarPlay 会自动开启。CarPlay 运行后，应用首页会显示“在车载浏览器中打开此地址”和一个以 `https://` 开头的地址，例如 `https://192.168.43.20:8443/`。

## 在车机浏览器中打开地址 {#step-open .step}

1. 在车机浏览器的地址栏中输入首页显示的地址。注意以 `https://` 开头，不是 `http://`，冒号后面的端口号也要一起输入。
2. 第一次打开时，浏览器会提示无法验证证书。这是正常现象：点“高级”（或类似选项），再选择继续访问。
3. 建议把这个页面加入书签，下次直接打开。

::: details 为什么会有证书警告？安全吗？
连接仍然是加密的。浏览器只在安全页面中提供 WebCodecs 视频解码，所以中继通过 HTTPS 提供网页；中继的证书是它自己生成的，没有经过公共机构签发，浏览器无法验证，所以会警告。确认地址是你的中继后继续访问即可。详见[故障排查](/troubleshooting#certificate-warning)；想彻底去掉警告，见[可信 HTTPS](/trusted-https)。
:::

## 开始使用 {#step-use .step}

页面提示轻触时，轻触一下屏幕：网页会进入全屏并开启声音，这一下不会点到 CarPlay。之后 CarPlay 就会在车机屏幕上运行，可以直接用手指操作。

点网页角落的齿轮按钮可以调整分辨率、CarPlay 屏幕宽度和全屏，见[车机网页的设置](/daily-use#web-settings)。

## 接下来 {#next-steps}

- [日常使用与设置](/daily-use)：以后每次上车怎么连接，以及可选的[车型设置](/daily-use#car-model)。
- [可信 HTTPS](/trusted-https)：用免费域名去掉证书警告。
- 遇到问题？请看[故障排查](/troubleshooting)。
