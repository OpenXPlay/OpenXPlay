---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: 检测你的车机浏览器
description: 在安卓车机浏览器中打开本页，检测它能否运行 OpenXPlay 网页接收端：WebCodecs H.264／H.265 解码、音频、多点触控和屏幕尺寸。全部在本地运行。
breadcrumb: 检测车机
---

<script setup>
import HeadUnitCheck from './.vitepress/theme/components/HeadUnitCheck.vue'
</script>

# 检测车机

在车机浏览器中打开本页，就能知道它能否运行 OpenXPlay 网页接收端。检测内容包括 WebCodecs H.264 和 H.265 视频解码、WebSocket、音频、多点触控和屏幕尺寸，最后给出结论和一份可复制的报告。检测全部在浏览器中完成，不上传、不保存任何数据。

在车机浏览器的地址栏中输入 <code>{{ $frontmatter.checkAddress }}</code>。这需要车机能上网，例如临时连接手机热点。如果车上没有网络，中继本身也在网页接收端地址的 `/probe/` 路径下提供解码能力探测页，例如 `https://10.77.0.1:8443/probe/`。

## 检测结果 {#result}

<HeadUnitCheck />

## 结果说明 {#meaning}

| 结论 | 含义 |
| --- | --- |
| 可以使用网页接收端 | 浏览器具备网页接收端所需的全部功能，并支持 H.265（HEVC）硬件解码，中继可以使用 H.265。 |
| 可以使用，仅支持 H.264 | 浏览器可以用 H.264 显示 CarPlay。对于无法硬件解码 H.265 的屏幕，中继会使用 H.264。 |
| 不支持：需要支持 WebCodecs 的浏览器 | 缺少必需的功能，最常见的是 WebCodecs 视频解码。如果车机还有其他浏览器，可以换一个试试，或者改用 [Carlink 路线](/quick-start#carlink)。 |

检测通过只说明浏览器具备网页接收端用到的功能，并不保证播放流畅；流畅度还取决于车机硬件和 Wi-Fi 连接。

## 检测项目 {#what-is-checked}

| 检测项 | 为什么重要 |
| --- | --- |
| 安全页面（HTTPS） | 浏览器只在安全页面中启用 WebCodecs，所以中继通过 HTTPS 提供网页接收端。 |
| WebCodecs VideoDecoder | 网页接收端用它解码 CarPlay 视频；没有它，浏览器就无法显示 CarPlay。 |
| H.264（AVC） | 基础视频格式。无法使用 H.265 时，中继都会改用 H.264；Carlink 始终使用 H.264。 |
| H.265（HEVC） | 只有当所有显示 CarPlay 的屏幕都能硬件解码时才会使用。 |
| 硬件解码 | 软件解码更耗费处理能力，画面可能卡顿。 |
| Web Worker 和 OffscreenCanvas | 网页接收端在页面主线程之外解码和绘制视频。 |
| WebSocket | 在中继和浏览器之间传输视频、音频和触控。 |
| AudioContext 和 AudioWorklet | 播放 CarPlay 的声音。通过 WebCodecs AudioDecoder 解码 AAC 是可选项。 |
| 麦克风（getUserMedia） | 在浏览器中允许后，Siri 和通话可以使用车机的麦克风。 |
| 触摸点数 | 触控会传回 iPhone；两个及以上的触摸点才能使用多指手势。 |
| 屏幕尺寸和像素比 | 网页接收端会把它们连同可解码的视频格式一起告诉中继。 |

## 分享检测结果 {#share}

复制报告，连同车机型号和系统版本一起发到[交流群](/#community)。你的报告能帮助使用同款车机的其他车主。
