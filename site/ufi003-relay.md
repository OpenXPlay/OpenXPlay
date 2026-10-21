---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 用 UFI003 随身 Wi-Fi 作中继（Linux 中继）
description: 一步步把 UFI003 USB 随身 Wi-Fi 设为 OpenXPlay Linux 中继：刷入 OpenStick Debian，制作并安装中继，添加 CarPlay 身份，配对 iPhone，然后在车机浏览器中打开 CarPlay。
breadcrumb: UFI003 作中继
schema: howto
howtoName: 用 UFI003 随身 Wi-Fi 作 Linux 中继，在车机浏览器中显示 iPhone CarPlay
howtoTools:
  - 支持 CarPlay 的 iPhone
  - UFI003 USB 随身 Wi-Fi
  - 一台电脑
  - 你自行提供的 Apple 配件（MFi）身份
  - 浏览器支持 WebCodecs 的安卓车机
next:
  text: 日常使用与设置
  link: /daily-use
---

# 用 UFI003 随身 Wi-Fi 作中继

UFI003 是一款 msm8916 4G USB 随身 Wi-Fi。刷入 OpenStick Debian 11 系统后，它可以运行 OpenXPlay 的 Linux 中继：通电后自动启动，车机用自带的浏览器显示 CarPlay。[OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003) 提供了所需的支持文件。

::: warning 需要一定的动手能力
这条路线要用电脑刷机、在命令行中运行脚本，刷机会改写设备原有的系统。没有把握时，推荐[用安卓手机作中继](/android-relay)。UFI003 的 Wi-Fi 没有 5 GHz 频段，热点工作在 2.4 GHz。
:::

## 刷入基础镜像 {#step-image .step}

在 UFI003 上刷入 OpenStick Debian 11 镜像（内核 `5.15.0-handsomekernel+`，aarch64）。下载地址、校验值和刷机前的注意事项见[刷入 UFI003 基础镜像](/ufi003-flash)。

## 获取中继 {#step-get .step}

从 [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases) 下载 `openxplay-relay-<版本>-linux-aarch64.tar.gz` 并解压。其中有两个 aarch64 可执行文件（`bin/openxplay-relay`、`bin/oxp-relay`）、网页接收端（`web/`）、管理页面（`admin/`）和 `rust/packaging/`。

::: details 想自行构建？
构建网页接收端（[OpenXPlay-Stream](https://github.com/OpenXPlay/OpenXPlay-Stream) 的 `rust/web-receiver/`）、管理页面（[OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) 的 `admin-web/`），并在两个仓库中用 `rust/scripts/build-aarch64.sh` 构建 aarch64 可执行文件。
:::

## 制作安装包 {#step-bundle .step}

在电脑上运行 `UFI003/install/make-bundle.sh`，传入构建产物、`UFI003/install/debs.txt` 中记录的 Debian 软件包，以及中继的 packaging 目录：

```sh
sh UFI003/install/make-bundle.sh /tmp/ufi003-bundle /path/to/openxplay-relay /path/to/oxp-relay /path/to/web/dist /path/to/admin/dist /path/to/debs /path/to/OpenXPlay-Relay/rust/packaging
```

## 在设备上安装 {#step-install .step}

把 `.tar.gz` 复制到随身 Wi-Fi 上，解压到一个空目录，然后以 root 身份运行其中的 `UFI003/install/install-ufi003.sh`。在参数前加上 `--dry-run` 可以只做校验、不做任何改动。

安装程序会安装无线 CarPlay 所需的蓝牙 RFCOMM 模块、修复后的蓝牙驱动和蓝牙守护程序，并部署中继。

## 添加 CarPlay 身份 {#step-identity .step}

安装包中绝不包含 Apple 配件（MFi）身份。请按 [UFI003 README](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003#one-step-installer) 的说明另行放入你自己的身份，然后启动中继。

## 打开管理页面 {#step-admin .step}

在连入中继网络的手机或电脑上打开 `https://openxplay-linux.local:6975`。接受证书警告后登录（登录页会显示首次使用的密码），并设置你自己的管理密码。

::: info 待确认
刚安装好的设备如何首次连入其网络，仓库中暂时还没有说明。遇到问题可以到[交流群](/community)提问。
:::

## 选择网络 {#step-network .step}

在管理页面中选择 iPhone 和车机怎样连接中继：

- **此设备的热点**（默认）：打开中继自己的热点，iPhone 自动加入，车机也连接这个热点。
- **共用 Wi-Fi**：中继、iPhone 和车机都连接同一个现有的 2.4 GHz 网络。

## 配对 iPhone {#step-pair .step}

点“配对 iPhone”，配对窗口会开放 10 分钟。在 iPhone 上打开“设置 → 蓝牙”，选择这台中继。

## 在车机浏览器中打开 {#step-open .step}

车机连接中继的网络，在浏览器中打开 `https://10.77.0.1:8443/`（使用中继自己的热点时），也可以用 `https://openxplay-linux.local:8443/`。第一次打开时接受证书警告，原因见[故障排查](/troubleshooting#certificate-warning)。

如果在管理页面开启了配对码，输入中继上显示的 8 位数字。

## 接下来 {#next-steps}

- 在小鹏 G6 等车上使用时，可以参考[车机资料](/head-units)中的推荐设置，例如 2.4 GHz 下把帧率设为 30。
- [可信 HTTPS](/trusted-https)：用免费域名去掉证书警告。
- 遇到问题？请看[故障排查](/troubleshooting)。
