---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 用车机的 Carlink 应用显示 CarPlay（实验性）
description: 车机没有可用的浏览器时，OpenXPlay 中继可以经 Wi-Fi 把 CarPlay 送到车机上的 Carlink 应用。实验性功能：开启方法、配对码，以及安卓手机和 UFI003 中继的注意事项。
breadcrumb: Carlink 应用
---

# Carlink 应用 <Badge type="warning" text="实验性" />

车机没有可用的浏览器、但装有 Carlink 应用时，可以试试这条路线：中继通过 Wi-Fi 连接车机上的 Carlink 应用。车机声明支持 H.265 时，安卓中继直接发送 iPhone 的 H.265 画面；否则把画面转换为 H.264。

::: warning 实验性功能
Carlink 输出仍是实验性功能，有可能连接失败。请使用安卓应用 [0.1.5-beta.1](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.1.5-beta.1) 或更新版本，它修复了部分车机（例如小鹏 G6）有声音但画面全黑的问题。实测情况见[车机资料](/head-units#xpeng-g6)。
:::

## 开启 Carlink 输出 {#step-enable .step}

在设置向导中把车机显示方式选为“Carlink 应用”，或在中继中把输出方式设为“浏览器和 Carlink”。中继的其他设置与浏览器路线相同，见[安卓手机作中继](/android-relay)或 [UFI003 作中继](/ufi003-relay)。

## 在车机上打开 Carlink {#step-open .step}

启动车机上的 Carlink 应用。

## 输入配对码 {#step-pair .step}

把车机屏幕上显示的配对码输入中继，并马上连接；配对码每 2 分钟更换一次。

## 不同中继的注意事项 {#relays}

| 中继 | 注意事项 |
| --- | --- |
| 安卓手机 | Carlink 需要 Android 10 及以上。单个 Wi-Fi 射频可能无法同时支持无线 CarPlay 和 Carlink，用 USB 连接 CarPlay 更可靠。 |
| UFI003 | 它的 Wi-Fi 仅支持 2.4 GHz，无法连接 Carlink Wi-Fi 工作在 5 GHz 的车机。 |

::: details 车机上有声音，但画面是黑的？ {#black-screen}
部分车机只在一帧的最开头识别关键帧，0.1.3 及更早的安卓应用在这些车机上会黑屏。请更新到安卓应用 [0.1.5-beta.1](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.1.5-beta.1) 或更新版本。车机显示倒车影像后，新版本的画面也能恢复。
:::
