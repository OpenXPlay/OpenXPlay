---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 用 UFI003 随身 Wi-Fi 作中继（Linux 中继）
description: 把 UFI003 USB 随身 Wi-Fi 设为 OpenXPlay Linux 中继：推荐让电脑上的 AI 助手读安装说明、用 OpenXPlay Flasher 安装，也可以自己用 Flasher 图形界面安装；装好后添加 CarPlay 身份、配对 iPhone，在车机浏览器中打开 CarPlay。
breadcrumb: UFI003 作中继
schema: howto
howtoName: 用 UFI003 随身 Wi-Fi 作 Linux 中继，在车机浏览器中显示 iPhone CarPlay
howtoTools:
  - 支持 CarPlay 的 iPhone
  - UFI003 USB 随身 Wi-Fi
  - Windows 10 / 11 或 macOS 12 及以上的电脑
  - 你自行提供的 Apple 配件（MFi）身份
  - 浏览器支持 WebCodecs 的安卓车机
next:
  text: 日常使用与设置
  link: /daily-use
---

# 用 UFI003 随身 Wi-Fi 作中继

UFI003 是一款 msm8916 4G USB 随身 Wi-Fi。刷入 OpenStick Debian 11 系统后，它可以运行 OpenXPlay 的 Linux 中继：通电后自动启动，车机用自带的浏览器显示 CarPlay。[OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003) 提供了所需的支持文件。

UFI003 的 Wi-Fi 没有 5 GHz 频段，热点工作在 2.4 GHz。

## 两种安装方式 {#install}

安装由电脑上的 [OpenXPlay Flasher](https://github.com/OpenXPlay/OpenXPlay-Flasher)（应用中显示为“OpenXPlay 刷机工具”）完成。它会把三层装到随身 Wi-Fi 上：基础系统（OpenStick Debian 11）、设备支持和 OpenXPlay 中继。以后中继出新版本时，通常只需要更新中继这一层，不用重新刷机。

| | 让 AI 帮你安装（推荐） | 自己用 Flasher 安装 |
| --- | --- | --- |
| 怎样操作 | 把一段话发给电脑上的 AI 助手，在关键处确认 | 打开 Flasher 应用，按提示一步步操作 |
| 下载和核对文件 | AI 按签名的软件包列表下载并核对 | 你按 Flasher 给出的链接下载，Flasher 核对 |
| 适合 | 已经在用 Claude Code、Codex 等能运行命令的 AI 助手 | 想自己掌握每一步，或者没有这类 AI 助手 |

两种方式用的是同一个 Flasher 和同一份签名的软件包列表，刷机前的备份和各项安全检查也完全相同。Windows 从 0.2.0-beta.2 起原生支持 adb 和 fastboot；所需驱动及预览版验证范围见下文。

## 让 AI 帮你安装（推荐） {#ai}

我们为 AI 助手写了一份[安装说明](https://openxplay.org/agents/ufi003-install.md)。AI 助手读了它，就会在你的电脑上下载 Flasher 和所需文件、核对 SHA-256，再用 Flasher 的命令行完成安装；遇到报错时，它能按电脑的实际情况处理。你需要一个能在电脑上运行命令的 AI 助手，例如 [Claude Code](https://claude.com/claude-code) 或 [OpenAI Codex](https://github.com/openai/codex)。

1. 用 USB 把 UFI003 直接插到电脑上，不要经过无独立供电的集线器。其他手机最好先拔掉。
2. 打开 AI 助手，把下面这段话发给它：

   ```text
   请阅读 https://openxplay.org/agents/ufi003-install.md
   严格按照其中的说明，用 OpenXPlay Flasher 把我插在这台电脑上的
   UFI003 随身 Wi-Fi 装成 OpenXPlay 中继。
   每一步先告诉我要做什么；清空设备之前，等我输入设备序列号确认。
   请用中文和我交流。
   ```

3. 按 AI 的提问回答。这几件事需要你亲自做：
   - 确认 AI 找到的设备就是你的 UFI003，核对它报出的序列号；
   - 清空设备前，亲手输入设备序列号；
   - 安装过程中不要拔出设备，让电脑保持供电、不进入睡眠；
   - 添加你自己的 CarPlay 身份，见下面的[添加 CarPlay 身份](#step-identity)。

装好后，AI 会告诉你怎样打开中继的管理页面，之后从[选择网络](#step-network)继续。

::: warning 请留意 AI 运行的命令
AI 助手会在你的电脑上运行命令。请使用你信任的 AI 助手，并看清它要运行的每条命令；不明白时请它先解释。安装说明要求它只操作这台 UFI003、不碰电脑上的其他设备、不读取你的身份文件、不关闭签名校验，也不自行用 fastboot 改写分区。
:::

## 自己用 Flasher 安装 {#flasher}

Flasher 是 Windows 和 macOS 上的桌面应用。用 USB 把 UFI003 接到电脑上，它会识别设备、列出三层的当前版本，并引导你完成安装。

::: info 在 Windows 上
0.2.0-beta.2 及更新版本通过 WinUSB 原生支持 adb 和 fastboot，无需先运行外部 adb 服务；电脑上已在运行的 adb 服务也可以继续使用。

扫描设备无需 adb 驱动，实际通信需要对应接口使用 **WinUSB** 驱动。设备能列出但无法通信时，请在“设备管理器”中检查 **ADB 接口**或进入引导加载程序后的 **fastboot 接口**；这两种模式可能需要分别安装驱动。只调整对应接口，保留 **RNDIS 网卡**及其网络驱动，不要替换整个 USB 复合设备的驱动。
:::

::: warning 预览版验证范围
已在 Windows 真机上完成中继升级、fastboot 设备身份读取和向 RAM 传输数据的验证；完整擦除并刷入基础系统仍待真机验证。从原厂系统完整安装还需等待签名软件包列表收录已修复的[设备支持包 0.2.1](https://github.com/OpenXPlay/OpenXPlay-Hardware/releases/tag/ufi003-device-v0.2.1)。文件必须与签名列表匹配，不能用新包替换列表中的旧包。
:::

::: details 下载并打开 Flasher {#flasher-download}
从 [Releases](https://github.com/OpenXPlay/OpenXPlay-Flasher/releases) 选择 **0.2.0-beta.2 或更新版本**（包括预发布版），下载对应系统的安装包，并用该版本的 `SHA256SUMS` 核对文件的 SHA-256。安装包没有使用 Apple 或 Microsoft 证书签名，所以第一次打开时系统会先询问。

- **macOS 12 或更高版本**（Apple 芯片和 Intel，`OpenXPlay-Flasher-<版本>-macos-universal.dmg`）：把应用拖进“应用程序”文件夹，然后打开一次。macOS 15 或更高版本出现“未打开”提示时，选择“完成”，再到“系统设置 → 隐私与安全性”中，在关于 OpenXPlay Flasher 的提示旁选择“仍要打开”；macOS 12 至 14 按住 Control 键点按应用，选择“打开”，再选择“打开”。
- **Windows 10 或 11**（`openxplay-flasher-windows-amd64.exe`，Arm 电脑用 `-arm64.exe`）：出现“Windows 已保护你的电脑”时，选择“更多信息”，再选择“仍要运行”。如果提示缺少 Microsoft Edge WebView2 运行时，请安装后重新打开。
:::

打开 Flasher 后，它会按下面的顺序引导你：

1. **连接**：用 USB 把 UFI003 接到电脑上。Flasher 会显示设备的序列号和各层的当前版本。全新的随身 Wi-Fi 还在运行原厂系统，会出现在“另有 … 台 Android 设备已连接，已忽略”的列表中，显示型号（通常是 `msm8916_32_512`）和序列号；核对后选择“这是运行原厂固件的 UFI003”，Flasher 会读取型号确认。
2. **选择**：最上面是建议的操作，例如全新设备的“从原厂固件安装 OpenXPlay”，或已装好设备的“安装 / 更新中继”。其他会清空设备的操作（重刷基础系统、完整重装、修复）收在“重新刷机（擦除设备）”中。
3. **准备**：Flasher 列出所需的每个文件、它的 SHA-256 和下载链接，但不会自己下载。请通过链接或你信任的其他来源下载，再点“选择文件…”或“选择多个文件…”。Flasher 按 SHA-256 识别文件，文件名不影响匹配。安装完成前不要移动或删除这些文件。
4. **备份**（仅在刷入基础系统时）：Flasher 先从设备读取 `modemst1`、`modemst2`、`fsc`、`fsg` 四个分区，保存到电脑“文稿”文件夹中的 `OpenXPlay Backups`。这是这台设备独有的基带校准数据，请长期保留这个文件夹。会清空设备的操作还要你输入设备的序列号确认。
5. **刷写**：Flasher 先显示这次安装的内容和大约要多久（从原厂固件开始约 6 到 7 分钟）。期间设备会重启几次，不要拔出设备。如果中途断开，重新连接后选择“修复”：Flasher 会从中断的地方继续，并用之前的备份恢复这四个分区。
6. **完成**：Flasher 核对各层的版本，并在“接下来”中提供[添加 CarPlay 身份](#step-identity)和通过 USB 打开中继管理页面的按钮。

::: details 软件包列表与签名 {#flasher-catalog}
Flasher 从本网站读取一份签名的软件包列表，其中记录了各层的版本、下载链接和 SHA-256。签名证明这份列表来自 OpenXPlay，你选择的每个文件都要与列表中的 SHA-256 一致。需要用自己的软件包列表时，可以在“设置”中关闭“校验软件包列表签名”；关闭后，文件仍按列表中的 SHA-256 核对，基础系统的文件也仍须与 OpenStick v1 完全一致。
:::

## 安装之后 {#after-install}

无论用哪种方式安装，接下来的步骤都一样。

## 添加 CarPlay 身份 {#step-identity .step}

安装包中绝不包含 Apple 配件（MFi）身份，需要你自己提供。随身 Wi-Fi 用 USB 接在电脑上时，打开 Flasher，在“接下来”中点“选择身份文件或 ZIP…”，选中私钥和证书（DER 或 PEM 格式，顺序和文件名不限），或者包含 `identity.pk8` 和 `certificate.p7b` 的 ZIP。Flasher 会通过 USB 把它们传到设备上，并重启中继。

## 打开管理页面 {#step-admin .step}

随身 Wi-Fi 用 USB 接在电脑上时，在 Flasher 的“接下来”中点“通过 USB 打开中继管理页面”。连入中继的网络后，也可以在手机或电脑上打开 `https://openxplay-linux.local:6975`。浏览器会提示证书警告，继续访问即可；首次登录的密码显示在登录页上，登录后请设置你自己的管理密码。

## 选择网络 {#step-network .step}

在管理页面中选择 iPhone 和车机怎样连接中继：

- **此设备的热点**（默认）：打开中继自己的热点，iPhone 自动加入，车机也连接这个热点。
- **共用 Wi-Fi**：中继、iPhone 和车机都连接同一个现有的 2.4 GHz 网络。

## 配对 iPhone {#step-pair .step}

点“配对 iPhone”，配对窗口会开放 10 分钟。在 iPhone 上打开“设置 → 蓝牙”，选择这台中继。

## 在车机浏览器中打开 {#step-open .step}

车机连接中继的网络，在浏览器中打开 `https://10.77.0.1:8443/`（使用中继自己的热点时），也可以用 `https://openxplay-linux.local:8443/`。第一次打开时接受证书警告，原因见[故障排查](/troubleshooting#certificate-warning)。

如果在管理页面开启了配对码，输入中继上显示的 8 位数字。

## 不用 Flasher 的命令行安装 {#manual}

只想用命令行、不用 Flasher 时，可以手动刷机并用脚本安装中继。这样做没有 Flasher 的备份和检查，刷机会改写设备原有的系统，请确认自己清楚每一步在做什么。

::: details 展开命令行安装步骤

### 刷入基础镜像 {#step-image}

在 UFI003 上刷入 OpenStick Debian 11 镜像（内核 `5.15.0-handsomekernel+`，aarch64）。下载地址、校验值和刷机前的注意事项见[刷入 UFI003 基础镜像](/ufi003-flash)。

### 获取中继 {#step-get}

从 [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases) 下载 `openxplay-relay-<版本>-linux-aarch64.tar.gz` 并解压。其中有两个 aarch64 可执行文件（`bin/openxplay-relay`、`bin/oxp-relay`）、网页接收端（`web/`）、管理页面（`admin/`）和 `rust/packaging/`。

想自行构建时：构建网页接收端（[OpenXPlay-Stream](https://github.com/OpenXPlay/OpenXPlay-Stream) 的 `rust/web-receiver/`）、管理页面（[OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) 的 `admin-web/`），并在两个仓库中用 `rust/scripts/build-aarch64.sh` 构建 aarch64 可执行文件。

### 制作安装包 {#step-bundle}

在电脑上运行 `UFI003/install/make-bundle.sh`，传入构建产物、`UFI003/install/debs.txt` 中记录的 Debian 软件包，以及中继的 packaging 目录：

```sh
sh UFI003/install/make-bundle.sh /tmp/ufi003-bundle /path/to/openxplay-relay /path/to/oxp-relay /path/to/web/dist /path/to/admin/dist /path/to/debs /path/to/OpenXPlay-Relay/rust/packaging
```

### 在设备上安装 {#step-install}

把 `.tar.gz` 复制到随身 Wi-Fi 上，解压到一个空目录，然后以 root 身份运行其中的 `UFI003/install/install-ufi003.sh`。在参数前加上 `--dry-run` 可以只做校验、不做任何改动。安装程序会安装无线 CarPlay 所需的蓝牙 RFCOMM 模块、修复后的蓝牙驱动和蓝牙守护程序，并部署中继。

装好后从[添加 CarPlay 身份](#step-identity)继续。也可以按 [UFI003 README](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003#one-step-installer) 的说明手动放入身份。

:::

## 接下来 {#next-steps}

- 在小鹏 G6 等车上使用时，可以参考[车机资料](/head-units)中的推荐设置，例如 2.4 GHz 下把帧率设为 30。
- [可信 HTTPS](/trusted-https)：用免费域名去掉证书警告。
- 遇到问题？请看[故障排查](/troubleshooting)。
