---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-05
title: 隐私政策
description: OpenXPlay iPhone App 如何处理你的数据：无需账号、不做跟踪；投屏画面只发送到你选择的车机或电视；日志只有在你主动上传时才离开 iPhone，并在 72 小时内删除。
breadcrumb: 隐私
---

# 隐私政策

本政策适用于 OpenXPlay.org 发布的 iPhone 版 OpenXPlay App。最近更新：2026 年 11 月 5 日。

## 概要 {#summary}

- OpenXPlay 没有账号，没有广告，不做统计分析，也不跟踪你。
- 投屏内容直接从你的 iPhone 发送到你在本地网络中选择的车机或电视，不经过我们的服务器。
- 日志保存在你的 iPhone 上，只有你主动上传时才会发送；上传的日志在 72 小时内删除。

## 留在 iPhone 上的数据 {#on-device}

- **屏幕画面。** 广播期间，iPhone 屏幕的画面和声音只通过本地 Wi-Fi 或个人热点，发送给你选择的接收端：车机浏览器、CarLink 或 CarLife 车机、AirPlay 接收端或 DLNA 电视。车机上的触控也经同样的路径传回 iPhone。
- **设置。** 你的选择、用过的车机和它们的 Wi-Fi 名称保存在 iPhone 上。在「设置 › 重置 OpenXPlay」中可以全部删除。
- **本地网络和蓝牙。** OpenXPlay 在本地网络中查找车机和电视，并用蓝牙查找 CarLink 车机、获取加入其 Wi-Fi 的方式。这些只在你的设备之间进行，不会发送给我们。
- **日志。** OpenXPlay 在 iPhone 上保存诊断日志。写入之前，密码、密钥、PIN、电话号码、姓名和精确位置都会被替换。日志保留手机型号、iOS 版本、IP 地址和 Wi-Fi 名称，因为排查连接问题需要它们。

## 数据何时离开 iPhone {#sent}

只有以下情况，并且都由你主动发起：

- **上传日志。** 在「设置 › 日志」中同意页面上的说明后，可以上传日志。日志会发送到 OpenXPlay.org 运营的 `logs.openxplay.org`，仅用于诊断你反馈的问题。同一 App 的上传通过一个随机 ID 关联，这个 ID 与你的 iPhone 或车辆无关。回执可在 48 小时内查看，日志最多 72 小时后永久删除。如果介意，也可以只保存文件，再通过邮件发送到 [support@openxplay.org](mailto:support@openxplay.org)。
- **可信 HTTPS。** 如果你为车机浏览器设置了可信地址，OpenXPlay 会用你填写的令牌，把 iPhone 当前的 IP 地址发送给你选择的动态域名服务（DuckDNS 或 dynv6），并向 Let's Encrypt 申请该域名的证书。这些服务适用它们各自的隐私政策。这些数据都不会发送给我们。
- **链接。** App 中的链接会在浏览器中打开 openxplay.org、交流群页面或 GitHub。

我们不会出售或与任何人共享数据，App 中也没有收集数据的第三方 SDK。

## 儿童 {#children}

OpenXPlay 不面向儿童，也不会有意收集儿童的数据。

## 变更与联系 {#contact}

本政策如有变更，新版本会以新的日期发布在本页面。关于你的数据的问题或请求，请联系 [support@openxplay.org](mailto:support@openxplay.org)。
