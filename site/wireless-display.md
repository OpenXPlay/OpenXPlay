---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-02
title: 用车机的投屏接收功能显示 CarPlay（无线投屏，实验性）
description: 车机只有 DLNA 或 Miracast 投屏接收功能时，安卓手机中继可以把 CarPlay 的画面投到车机，在中继手机上操作 CarPlay。实验性功能：DLNA 和 Miracast 的选择、网络、声音和画面。
breadcrumb: 无线投屏
---

# 无线投屏 <Badge type="warning" text="实验性" />

车机没有可用的浏览器、Carlink 或 CarLife，但能接收投屏（DLNA 或 Miracast）时，可以用这条路线：车机只显示 CarPlay 的画面，不能在车机上触控；CarPlay 在中继手机上操作。

::: warning 实验性功能
需要安卓应用 0.2.5 及以上版本，请[下载最新版本](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk)。Linux 中继没有无线投屏输出。
:::

## 选择 DLNA 或 Miracast {#step-choose .step}

在设置向导的“车机显示”页选择“无线投屏”，或在“设置 → 输出”中选择，再选一种：

| 方式 | 适合 | 注意 |
| --- | --- | --- |
| DLNA | 车机有投屏接收应用 | 车机播放中继推送的画面，会延迟几秒。 |
| Miracast | 车机能接收手机的系统投屏 | 延迟更低，会占用 Wi-Fi 直连。 |

## DLNA：连接接收端 {#dlna}

1. 车机连接中继手机的热点，或与中继手机连接同一个 Wi-Fi，然后打开车机上的投屏接收应用。
2. 在“设置 → 输出 → 无线投屏”中点“接收端”，从搜索到的列表中选择车机。找不到时检查网络和接收应用，再点“重新搜索”。

中继会一直向这台接收端推送画面，接收端停止播放时自动重试。

## Miracast：启动系统投屏 {#miracast}

1. 在“设置 → 输出 → 无线投屏”中允许“显示在其他应用上层”，中继退到后台后仍能在车机上显示 CarPlay。
2. 点“打开系统投屏”，在安卓的投屏列表中选择车机。

Miracast 和 Carlink 都使用 Wi-Fi 直连，大多数手机无法同时使用两者。Miracast 还可能替换 CarPlay 自己的 Wi-Fi 直连群组，所以无线 CarPlay 请用“此手机的热点”或 USB，应用会提示切换。

## 在中继手机上操作 CarPlay {#operate}

只使用无线投屏时，中继手机显示 CarPlay 并可触控，带返回按钮。连接期间，首页提供“显示 CarPlay”。

## 声音 {#audio}

关闭“设置 → 声音 → 通过车辆蓝牙播放 CarPlay 音频”时，CarPlay 的全部声音（音乐、提示音、Siri 和通话）随投屏送到车机；DLNA 的声音和画面一样延迟几秒。Siri 和通话使用中继手机的麦克风。打开这个选项时，声音由 iPhone 通过蓝牙直接连接车机播放。

## 画面 {#picture}

- **DLNA**：使用浏览器测量并保存的车机屏幕，或所选车型的屏幕，没有时用 16:9；大小由“设置 → CarPlay 画面 → 分辨率”决定。
- **Miracast**：使用安卓与车机协商的尺寸。车机收到的是系统投屏发送的画面，这里的设置只改变 CarPlay 在其中的比例，不改变清晰度。如果车机把投屏画面拉伸到全屏，打开“铺满屏幕”，CarPlay 就会按正确的比例显示。
