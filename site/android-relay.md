---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 用安卓手机作中继：在车机浏览器中显示 CarPlay
description: 一步步把安卓手机设为 OpenXPlay 中继：安装 OpenXPlay Relay，按设置向导选择车型、车机显示方式、iPhone 连接方式和网络，配对 iPhone，再在车机浏览器中打开 CarPlay。车机上不用安装任何软件。
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

推荐的用法：一部安卓手机作中继，车机用自带的浏览器显示 CarPlay，车机上不用安装任何软件。第一次设置大约需要 10 分钟。本教程按 OpenXPlay Relay 0.2.2 编写。

::: tip 开始前请准备
- 支持 CarPlay 的 iPhone
- Android 8.0 及以上的安卓手机（使用 [Carlink](/carlink) 需要 Android 10 及以上）
- Apple 配件（MFi）身份：`identity.pk8` 和 `certificate.p7b`，需要[自行提供](/quick-start#mfi-identity)
:::

## 检测车机浏览器 {#step-check .step}

在车机浏览器中打开 [openxplay.org/check](/check)。页面会检测浏览器能否解码 CarPlay 的视频；显示可以使用，再继续下面的步骤。检测不通过时，可以改用 [Carlink 应用](/carlink)；特斯拉请看[特斯拉](/tesla)。

## 安装 OpenXPlay Relay {#step-install .step}

在中继手机上下载并安装 [openxplay-relay.apk](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk)（最新版本）。安装时如果系统提示，请允许从浏览器或文件管理器安装应用。

::: details 想要历史版本，或者自行构建？
历史版本见 [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases)，每个版本的变化见[更新日志](/changelog)。也可以按 [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) README 的说明自行构建。
:::

## 在设置向导中选择 {#step-guide .step}

第一次打开应用会进入设置向导，顶部的进度条显示当前在第几步。

1. **你的车**：选择品牌和车型，年款可以选“不确定”。列表中有小鹏、特斯拉和极氪；没有你的车时选“其他”并填写名称。不同车型使用不同的设置：小鹏 G6 2023 款自带屏幕数据，特斯拉需要设置[特斯拉浏览器适配](/tesla)，极氪车主向导会建议设置[可信 HTTPS](/trusted-https)。
2. **车机显示**：选“车载浏览器”。“Carlink 应用”是实验性功能，见 [Carlink](/carlink)。“无线投屏”（DLNA、Miracast）显示“待开放”，暂时不能选择。
3. **iPhone 连接**：选“无线”：上车后 iPhone 会通过蓝牙和 Wi-Fi 自动连上。不推荐“USB 数据线”：中继手机要通过数据线给 iPhone 供电，而且对数据线有要求，USB-C 接口的 iPhone 用两头都是 USB-C 的线通常连不上（见[故障排查](/troubleshooting#usb-iphone-not-found)），选择时应用也会再确认一次。
4. **无线网络**：iPhone、中继手机和车机之间需要能互相连通。按你的车选择一种，点开看说明：

::: details Wi-Fi 直连（推荐）：中继手机连接车机热点或其他 Wi-Fi {#network-wifi-direct}
iPhone 直接连接中继手机；车机通过中继手机平时连接的 Wi-Fi 访问它，例如车机热点。不能和 Carlink 一起使用，因为 Carlink 可能替换 CarPlay 的 Wi-Fi 直连群组；这时向导会推荐“此手机的热点”。
:::

::: details 此手机的热点：车机没有热点，但能连接外部 Wi-Fi {#network-hotspot}
iPhone 和车机都连接中继手机的个人热点。

- 要在应用里填写与 Android 热点设置中相同的热点名称和密码。
- 频段请选 5 GHz（应用里和 Android 热点设置里都要选），2.4 GHz 下画面容易卡顿；车机连不上 5 GHz 热点时再改回 2.4 GHz。
- 部分手机连着 Wi-Fi 时只能开 2.4 GHz 热点，请先断开 Wi-Fi。也有手机一开热点就关闭 Wi-Fi，这样的手机不能用 Carlink。
:::

::: details 使用车机热点：大家都连接车机的热点 {#network-car-hotspot}
iPhone 和中继手机都连接车机的热点。先让中继手机连上车机热点，并在应用里保存它；车机热点需要允许设备之间互相访问。
:::

5. **完成准备**：页面只列出还没完成的项目，逐项处理。这些只需要做一次，之后会自动记住。
   - **允许权限**：附近的设备（蓝牙）、附近的 Wi-Fi 设备、通知和麦克风。只有允许了麦克风，CarPlay 才会提供 Siri 和通话功能。使用 USB 连接或特斯拉适配时，还需要同意 Android 的 VPN 请求。
   - **导入 CarPlay 身份**：选择 `identity.pk8` 和 `certificate.p7b`，可同时选择或先后选择，顺序不限；也可选择包含它们的 ZIP。只选了一个时，应用会提示选择另一个。
   - **配对 iPhone**（无线连接）：中继手机请求让 iPhone 发现时点允许，然后在 iPhone 上打开“设置 → 蓝牙”，选择这台中继手机，并按提示允许使用 CarPlay。
   - **保存车机热点**（仅“使用车机热点”时需要）。
6. **准备开启**：核对汇总。“自动连接”默认打开：以后打开应用时，倒计时结束就会开始连接。“开机启动”会在手机开机时启动中继。

## 连接车机网络 {#step-network .step}

让车机和中继手机连上你选择的网络：

- **Wi-Fi 直连**：在车机上打开 Wi-Fi 热点，中继手机连接这个热点。
- **此手机的热点**：在中继手机上打开个人热点，车机连接这个热点。
- **使用车机热点**：在车机上打开热点，中继手机连接这个热点；iPhone 会自动加入。

::: warning 请给热点设置密码
安卓中继不用配对码，车机打开地址即可连接。请务必给热点设置密码，只让你自己的设备连接。
:::

## 开启 CarPlay {#step-start .step}

在向导最后一页点“开启 CarPlay”。第一次连接时，请把 iPhone 解锁并放在中继手机附近。

应用首页有三个图块：iPhone、此手机和车机，连接逐步建立时，它们之间的连线会逐段填满。下面有一行文字说明当前进展，最多一个按钮。如果蓝牙、热点等还没打开，按钮会帮你打开，或者应用等它打开后自动开始。点任意图块或上拉面板，可以查看每一步和它的详情。

还不知道车机屏幕的尺寸时，CarPlay 最多等待 20 秒，让车机报告尺寸；点“现在开始”可以跳过等待。当步骤显示“在车机浏览器打开此地址”时，地址就显示在下面，旁边有复制按钮：以 `https://` 开头、以 `:8443` 结尾，例如 `https://192.168.43.20:8443/`。

## 在车机浏览器中打开地址 {#step-open .step}

1. 在车机浏览器的地址栏中输入首页显示的地址。注意以 `https://` 开头，不是 `http://`，冒号后面的端口号也要一起输入。
2. 第一次打开时，浏览器会提示无法验证证书。这是正常现象：点“高级”（或类似选项），再选择继续访问。
3. 建议把这个页面加入书签，下次直接打开。

::: details 为什么会有证书警告？安全吗？
连接仍然是加密的。浏览器只在安全页面中提供 WebCodecs 视频解码，所以中继通过 HTTPS 提供网页；中继的证书是它自己生成的，没有经过公共机构签发，浏览器无法验证，所以会警告。确认地址是你的中继后继续访问即可。详见[故障排查](/troubleshooting#certificate-warning)；想彻底去掉警告，见[可信 HTTPS](/trusted-https)。
:::

## 开始使用 {#step-use .step}

页面提示轻触时，轻触一下屏幕：网页会进入全屏并开启声音，这一下不会点到 CarPlay。之后 CarPlay 就会在车机屏幕上运行，可以直接用手指操作；应用首页显示“CarPlay 已连接”。

要调整画面、声音或全屏，在 CarPlay 里点 OpenXPlay 图标，网页的设置会从侧边滑出，见[车机网页的设置](/daily-use#web-settings)。

## 接下来 {#next-steps}

- [日常使用与设置](/daily-use)：以后每次上车怎么连接，以及应用的设置。
- [可信 HTTPS](/trusted-https)：用免费域名去掉证书警告。
- 遇到问题？请看[故障排查](/troubleshooting)。
