---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 用车机的 Carlink 应用显示 CarPlay（实验性）
description: 车机没有可用的浏览器时，OpenXPlay 中继可以经 Wi-Fi 把 CarPlay 送到车机上的 Carlink 应用。实验性功能：开启方法、配对码，以及安卓手机、UFI003 和斐讯 N1 中继的注意事项。
breadcrumb: Carlink 应用
---

# Carlink 应用 <Badge type="warning" text="实验性" />

车机没有可用的浏览器、但装有 Carlink 应用时，可以试试这条路线：中继通过 Wi-Fi 连接车机上的 Carlink 应用。车机声明支持 H.265 时，安卓中继直接发送 iPhone 的 H.265 画面；否则把画面转换为 H.264。

::: warning 实验性功能
Carlink 输出仍是实验性功能，有可能连接失败。需要安卓应用 0.1.5 及以上版本，请[下载最新版本](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk)：从 0.1.5 起，部分车机（例如小鹏 G6）有声音但画面全黑的问题已修复，画面按车机 Carlink 窗口的比例显示，触控位置也准确。实测情况见[车机资料](/head-units#xpeng-g6)。
:::

## 开启 Carlink 输出 {#step-enable .step}

在设置向导的“车机显示”页选择“Carlink 应用”，向导会推荐无线 CarPlay 使用“此手机的热点”。想同时使用浏览器和 Carlink，在“设置 → 开发者选项 → 同时使用多种输出”中打开。中继的其他设置与浏览器路线相同，见[安卓手机作中继](/android-relay)或 [UFI003 作中继](/ufi003-relay)。

## 在车机上打开 Carlink {#step-open .step}

启动车机上的 Carlink 应用。

## 输入配对码 {#step-pair .step}

把车机屏幕上显示的配对码输入中继，并马上连接；配对码每 2 分钟更换一次。

## 不同中继的注意事项 {#relays}

| 中继 | 注意事项 |
| --- | --- |
| 安卓手机 | Carlink 需要 Android 10 及以上。中继手机以 Wi-Fi 客户端加入车机的 Carlink 网络，所以中继手机的 Wi-Fi 必须打开（不用连接任何网络）。无线 CarPlay 请选“此手机的热点”：中继一边开热点给 iPhone，一边用 Wi-Fi 连车机。有些手机打开热点后会自动关闭 Wi-Fi，这类手机无法同时使用两者。 |
| UFI003 | 它的 Wi-Fi 仅支持 2.4 GHz，无法连接 Carlink Wi-Fi 工作在 5 GHz 的车机。 |
| 斐讯 N1 | 能连接 5 GHz 的 Carlink 网络。它只有一块 Wi-Fi 网卡，所以 iPhone 会跟着中继转到车机的网络上；另接一块 USB Wi-Fi 网卡时，可以让它专门负责 Carlink，见[网络与 Wi-Fi](/phicomm-n1#wifi)。还没有在车上测试过。 |

::: details 车机上有声音，但画面是黑的？ {#black-screen}
部分车机只在一帧的最开头识别关键帧，0.1.3 及更早的安卓应用在这些车机上会黑屏。需要安卓应用 0.1.5 及以上版本，请[更新到最新版本](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk)。车机显示倒车影像后，新版本的画面也能恢复。
:::

::: details 车机停在 30% 左右，连不上？ {#stuck-30}
中继手机的 Wi-Fi 没有打开。Carlink 要让中继手机以 Wi-Fi 客户端加入车机的网络，打开 Wi-Fi 后重新连接即可。安卓应用 0.1.5 起，手动开启时会先检查并提醒。
:::

::: details 车机切换为全屏后，画面没有铺满？ {#full-screen}
车机只在 Carlink 连接时告诉中继窗口大小。会话中切换显示区域（例如从三分之二屏切到全屏）时，车机只是把原来的画面按比例放大，两侧会留黑边，触控位置仍然准确。可以在“设置 → 输出”中打开“窗口尺寸变化时重新连接”：切换后第一次触摸屏幕时，中继会重新连接，画面中断几秒。小鹏 G6 重新连接后能否报告全屏尺寸，还在测试。
:::
