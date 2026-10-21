---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 用车机的 Carlink 应用显示 CarPlay（实验性）
description: 车机没有可用的浏览器时，OpenXPlay 中继可以经 Wi-Fi 把 CarPlay 送到车机上的 Carlink 应用。实验性功能：开启方法、配对码，以及安卓手机和 UFI003 中继的注意事项。
breadcrumb: Carlink 应用
---

# Carlink 应用 <Badge type="warning" text="实验性" />

车机没有可用的浏览器、但装有 Carlink 应用时，可以试试这条路线：中继通过 Wi-Fi 连接车机上的 Carlink 应用，始终使用 H.264 视频。

::: warning 实验性功能
Carlink 输出有可能连接失败。在部分车机上（例如小鹏 G6）画面一直是黑的，正在排查，见[车机资料](/head-units#xpeng-g6)。能用浏览器时，推荐用[浏览器路线](/android-relay)。
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
