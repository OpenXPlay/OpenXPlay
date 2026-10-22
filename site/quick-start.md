---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: 开始使用：选择适合你的方案
description: 第一次使用 OpenXPlay：选择中继（安卓手机或 UFI003 随身 Wi-Fi）和车机显示方式（浏览器或 Carlink 应用），了解要准备什么，再按对应的教程一步步设置。
breadcrumb: 开始使用
---

<script setup>
import RouteChooser from './.vitepress/theme/components/RouteChooser.vue'
</script>

# 开始使用

OpenXPlay 用一台中继把 iPhone 的 CarPlay 送到车机上。先选好中继和车机的显示方式，再按对应的教程一步步设置。

<RouteChooser />

## 开始前需要准备 {#requirements}

| 需要准备 | 说明 |
| --- | --- |
| 支持 CarPlay 的 iPhone | 通过无线（蓝牙和 Wi-Fi）或 USB 线连接中继。 |
| 一台中继 | Android 8.0 及以上的安卓手机，安装 OpenXPlay Relay 应用；或者一个 UFI003 USB 随身 Wi-Fi，外加一台电脑用来刷机和安装。 |
| Apple 配件（MFi）身份 | `identity.pk8` 和 `certificate.p7b` 两个文件，需要由你自行提供，见下方说明。 |
| 车机浏览器 | 需要支持 WebCodecs 视频解码。在车机浏览器中打开[检测车机](/check)就能知道。 |

::: details 什么是 Apple 配件（MFi）身份？ {#mfi-identity}
中继要用这个身份向 iPhone 完成配件认证，CarPlay 才会启动；没有身份时，安卓应用不会启动 CarPlay。它由 `identity.pk8` 和 `certificate.p7b` 两个文件组成。各仓库及其构建产物都不包含该身份，需要由你自行提供。
:::

## 两种中继怎么选 {#choose-relay}

| | 安卓手机（推荐） | UFI003 随身 Wi-Fi |
| --- | --- | --- |
| 需要准备 | Android 8.0 及以上的手机 | UFI003 随身 Wi-Fi 和一台电脑 |
| 怎样安装 | 安装应用，按设置向导操作，第一次大约 10 分钟 | 推荐让电脑上的 AI 助手读安装说明，用 OpenXPlay Flasher 安装；也可以自己用 Flasher 应用安装。第一次安装需要 Mac |
| Wi-Fi 频段 | 可以用 5 GHz 热点，画面不容易卡顿 | 只有 2.4 GHz |
| 怎样设置 | 在应用中设置 | 在网页管理页面中设置 |
| 供电与启动 | 每次上车打开应用 | 作为系统服务运行，通电后自动启动 |

## 设置完成以后 {#after-setup}

- [日常使用与设置](/daily-use)：每次上车怎么连接，车机网页的分辨率、全屏等设置。
- [可信 HTTPS](/trusted-https)：用免费域名去掉车机浏览器的证书警告。
- [故障排查](/troubleshooting)：连接、画面或声音出了问题时。
