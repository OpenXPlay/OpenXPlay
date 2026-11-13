---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-05
title: 隐私政策
description: OpenXPlay 中继方案的隐私与安全：无需账号、不做跟踪；CarPlay 只在你的 iPhone、中继和车机之间传输；安卓应用的日志只有在你主动上传时才离开手机。iPhone App 请看 openxplay.com。
breadcrumb: 隐私
---

# 隐私政策

本政策适用于 OpenXPlay.org 发布的中继方案：安卓应用 OpenXPlay Relay、Linux 中继和本网站。最近更新：2026 年 11 月 13 日。

::: tip iPhone 直连
不需要中继、直接连接车机的 OpenXPlay iPhone App，请查看 [openxplay.com 上的隐私政策](https://openxplay.com/privacy)。
:::

## 概要 {#summary}

- OpenXPlay 没有账号，没有广告，不做统计分析，也不跟踪你。
- CarPlay 的视频、音频和触控只在你的 iPhone、中继和车机之间传输，不经过我们的服务器。
- 安卓应用的日志保存在中继手机上，只有你主动上传时才会发送；上传的日志在 30 天内删除。

## 留在中继上的数据 {#on-device}

- **CarPlay。** 网页接收端和管理页面都由中继自己提供。视频、音频和触控经蓝牙、Wi-Fi 或 USB 在 iPhone、中继和车机之间传输。
- **设置。** 你的设置、iPhone 配对和中继信任的车机都保存在中继上。
- **车辆信息。** Carlink 车机上报的车辆信息只在你开启后才会收集，并且只保存在中继上。
- **插件。** 插件默认关闭，在车机浏览器中离线运行。
- **日志。** 安卓应用在手机上保存自己最近约 24 小时的日志。存储之前，密码、密钥、电话号码、姓名、消息和精确位置都会被替换。手机型号、系统版本、蓝牙和 Wi-Fi 地址、IP 地址、Wi-Fi 名称等技术信息会保留，用于排查连接问题。

## 数据何时离开中继 {#sent}

- **上传日志（安卓应用）。** 只有在“设置 › 日志”中同意隐私说明后才会上传。日志发送到 OpenXPlay.org 运营的 `logs.openxplay.org`，仅用于排查问题。上传经过 Cloudflare 转发（不存储），服务器可能位于美国的 AWS 数据中心。同一应用的上传通过一个随机 ID 关联，这个 ID 与你的 iPhone、车辆和手机硬件无关。上传的日志不提供公开下载，最多 30 天后永久删除；如需提前删除，请把日志 ID 发到 [support@openxplay.org](mailto:support@openxplay.org)。如果介意，也可以只保存文件，再私下发送。
- **可信 HTTPS。** 如果你为车机浏览器设置了可信域名，中继会用你的令牌，把自己的地址发送给你选择的动态域名服务（DuckDNS 或 dynv6），并向 Let's Encrypt 申请证书。域名和它指向的内网地址会公开，见[可信 HTTPS › 隐私](/zh/trusted-https#privacy)。这些服务适用它们各自的隐私政策。
- **检查更新。** 中继会向 GitHub 获取 OpenXPlay Relay 的版本列表，GitHub 能看到中继联网时的公网地址。

我们不会出售或与任何人共享数据。

## 安全 {#security}

管理页面使用 HTTPS，并需要管理密码登录。登录页会显示首次使用的密码，请登录后立即修改。只要还在使用默认密码，管理页面就会提醒你。

## 本网站 {#website}

openxplay.org 没有任何统计分析，[检测页](/zh/check)也只在你的浏览器中运行。

## 儿童 {#children}

OpenXPlay 不面向儿童，也不会有意收集儿童的数据。

## 变更与联系 {#contact}

本政策如有变更，新版本会以新的日期发布在本页面。关于你的数据的问题或请求，请联系 [support@openxplay.org](mailto:support@openxplay.org)。
