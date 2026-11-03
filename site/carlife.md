---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-02
title: 用车机的 CarLife 显示 CarPlay（实验性）
description: 车机装有 CarLife 时，安卓手机中继可以把 CarPlay 的画面和触控送到车机的 CarLife，经同一 Wi-Fi、中继手机的热点或 USB 附件连接。实验性功能：开启方法、网络和声音。
breadcrumb: CarLife
---

# CarLife <Badge type="warning" text="实验性" />

车机装有 CarLife（百度 CarLife）时，可以用这条路线：中继把 CarPlay 的画面和触控送到车机的 CarLife，声音仍通过 iPhone 与车机的蓝牙连接播放。CarLife 使用 H.264；iPhone 发出 H.265 时，中继手机用硬件编解码器把它转换为 H.264。

::: warning 实验性功能
需要安卓应用 0.2.5 及以上版本，请[下载最新版本](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk)。Linux 中继没有 CarLife 输出。
:::

## 开启 CarLife 输出 {#step-enable .step}

在设置向导的“车机显示”页选择“CarLife”，或在“设置 → 输出”中选择。“CarLife 车机 IP 地址”可以留空，中继会自动发现车机；自动发现找不到时，填入车机的 IPv4 地址。中继的其他设置与浏览器路线相同，见[安卓手机作中继](/android-relay)。

## 连接车机 {#step-connect .step}

任选一种：

- **Wi-Fi**：车机连接中继手机的热点，或与中继手机连接同一个 Wi-Fi。
- **USB**：用数据线连接车机的 USB 接口和中继手机，以 USB 附件方式连接。

## 在车机上打开 CarLife {#step-open .step}

打开车机上的 CarLife，在中继上开始连接。首页显示“正在发送 CarPlay 画面”后，请在车机上确认画面。

## 声音 {#audio}

CarLife 只传输画面和触控。音乐、导航和通话由 iPhone 通过蓝牙直接连接车机播放，请先在车机上配对 iPhone 的蓝牙。
