---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 用 UFI003 随身 Wi-Fi 作中继（Linux 中继）
description: 把 UFI003 USB 随身 Wi-Fi 设为 OpenXPlay Linux 中继：推荐用 OpenXPlay Flasher 安装，也可以手动刷入 OpenStick Debian、制作并安装中继，再添加 CarPlay 身份、配对 iPhone，在车机浏览器中打开 CarPlay。
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

UFI003 的 Wi-Fi 没有 5 GHz 频段，热点工作在 2.4 GHz。

## 用 OpenXPlay Flasher 安装（推荐） {#flasher}

[OpenXPlay Flasher](https://github.com/OpenXPlay/OpenXPlay-Flasher) 是 Windows 和 macOS 上的桌面应用，应用中显示为“OpenXPlay 刷机工具”。用 USB 把 UFI003 接到电脑上，它会识别设备，并列出要安装的三层：基础系统（OpenStick Debian 11）、设备支持和 OpenXPlay 中继。它可以从头安装全部三层，也可以只更新其中一层；以后中继出新版本时，通常只需要更新中继这一层，不用重新刷机。

::: info 在 Windows 上
Windows 版目前只能安装和更新设备支持与中继，不能刷入基础系统，而且电脑上要先运行 adb（Android SDK Platform-Tools 中的 `adb start-server`）。第一次安装要刷入基础系统，请用 Mac，或者按下面的[手动安装](#manual)刷入基础镜像。
:::

::: details 下载并打开 Flasher {#flasher-download}
从 [Releases](https://github.com/OpenXPlay/OpenXPlay-Flasher/releases) 下载对应系统的版本，并用其中的 `SHA256SUMS` 核对文件的 SHA-256。安装包没有使用 Apple 或 Microsoft 证书签名，所以第一次打开时系统会先询问。

- **macOS 12 或更高版本**（Apple 芯片和 Intel，`OpenXPlay-Flasher-<版本>-macos-universal.dmg`）：把应用拖进“应用程序”文件夹，然后打开一次。macOS 15 或更高版本出现“未打开”提示时，选择“完成”，再到“系统设置 → 隐私与安全性”中，在关于 OpenXPlay Flasher 的提示旁选择“仍要打开”；macOS 12 至 14 按住 Control 键点按应用，选择“打开”，再选择“打开”。
- **Windows 10 或 11**（`openxplay-flasher-windows-amd64.exe`，Arm 电脑用 `-arm64.exe`）：出现“Windows 已保护你的电脑”时，选择“更多信息”，再选择“仍要运行”。如果提示缺少 Microsoft Edge WebView2 运行时，请安装后重新打开。
:::

打开 Flasher 后，它会按下面的顺序引导你：

1. **连接**：用 USB 把 UFI003 接到电脑上。Flasher 会显示设备的序列号和各层的当前版本。如果设备还在运行原厂系统，需要你先确认这台设备就是 UFI003。
2. **选择**：最上面是建议的操作，例如“安装 / 更新中继”。会清空设备的操作（重刷基础系统、完整重装、修复）收在“重新刷机（擦除设备）”中。
3. **准备**：Flasher 列出所需的每个文件、它的 SHA-256 和下载链接，但不会自己下载。请通过链接或你信任的其他来源下载，再点“选择文件…”或“选择多个文件…”。Flasher 按 SHA-256 识别文件，文件名不影响匹配。安装完成前不要移动或删除这些文件。
4. **备份**（仅在刷入基础系统时）：Flasher 先从设备读取 `modemst1`、`modemst2`、`fsc`、`fsg` 四个分区，保存到电脑“文稿”文件夹中的 `OpenXPlay Backups`。这是这台设备独有的基带校准数据，请长期保留这个文件夹。会清空设备的操作还要你输入设备的序列号确认。
5. **刷写**：期间设备会重启几次，不要拔出设备。如果中途断开，重新连接后选择“修复”：Flasher 会重新写入基础系统，并用之前的备份恢复这四个分区。
6. **完成**：Flasher 核对各层的版本。在这里可以添加你自己的 CarPlay 身份（选择身份文件，或包含它们的 ZIP 压缩包，通过 USB 传到设备上），也可以通过 USB 打开中继管理页面，首次登录的密码显示在登录页上。之后从[选择网络](#step-network)继续。

::: details 软件包列表与签名 {#flasher-catalog}
Flasher 从本网站读取一份签名的软件包列表，其中记录了各层的版本、下载链接和 SHA-256。签名证明这份列表来自 OpenXPlay，你选择的每个文件都要与列表中的 SHA-256 一致。需要用自己的软件包列表时，可以在“设置”中关闭“校验软件包列表签名”；关闭后，文件仍按列表中的 SHA-256 核对，基础系统的文件也仍须与 OpenStick v1 完全一致。
:::

## 手动安装 {#manual}

手动安装要在电脑上刷机、在命令行中运行脚本，刷机会改写设备原有的系统。没有把握时，请用上面的 Flasher，或者[用安卓手机作中继](/android-relay)。

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
