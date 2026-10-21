---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: 快速开始：用车机浏览器显示 CarPlay
description: 一步步设置 OpenXPlay：把安卓手机设为中继，配对 iPhone，然后在车机浏览器中打开 CarPlay。也介绍 UFI003 USB 随身 Wi-Fi 和 Carlink 应用路线。
breadcrumb: 快速开始
schema: howto
howtoName: 用安卓手机作中继，在车机浏览器中显示 iPhone CarPlay
howtoTools:
  - 支持 CarPlay 的 iPhone
  - 装有 OpenXPlay Relay 应用的安卓手机（Android 8.0 及以上）
  - 你自行提供的 Apple 配件（MFi）身份
  - 浏览器支持 WebCodecs 的安卓车机
---

# 快速开始

推荐的用法是：一部安卓手机作中继，车机用自带的浏览器显示 CarPlay。车机上不用安装任何软件。第一次设置大约需要 10 分钟，之后每次上车只要打开应用、在车机浏览器里打开同一个地址。

## 准备工作 {#requirements}

| 需要准备 | 说明 |
| --- | --- |
| 支持 CarPlay 的 iPhone | 通过无线（蓝牙和 Wi-Fi）或 USB 线连接中继手机。 |
| 一部安卓手机作中继 | Android 8.0 及以上，安装 OpenXPlay Relay 应用。 |
| Apple 配件（MFi）身份 | `identity.pk8` 和 `certificate.p7b` 两个文件。各仓库及其构建产物都不包含该身份，需要由你自行提供。 |
| 车机浏览器 | 需要支持 WebCodecs 视频解码，第 1 步会检测。 |

没有安卓手机，也可以用 [UFI003 USB 随身 Wi-Fi](#ufi003-relay) 作中继；车机没有可用的浏览器时，可以试试 [Carlink 应用](#carlink)（实验性）。

## 用车机浏览器：一步一步 {#browser-step-by-step}

### 第 1 步：检测车机浏览器 {#step-check}

在车机浏览器中打开 [openxplay.org/check](/check)。页面会检测浏览器能否解码 CarPlay 的视频；显示可以使用，再继续下面的步骤。

### 第 2 步：安装 OpenXPlay Relay {#step-install}

在中继手机上下载并安装 [openxplay-relay.apk](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk)（最新版本；历史版本和[更新日志](/changelog)见 [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases)）。安装时如果系统提示，请允许从浏览器或文件管理器安装应用。也可以按 [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) README 的说明自行构建。

### 第 3 步：在设置向导中选择 {#step-guide}

第一次打开应用会进入设置向导，按顺序回答三个问题：

1. **车机用什么显示 CarPlay？** 选“车载浏览器”。
2. **iPhone 怎么连接这台手机？** 选“无线”：上车后 iPhone 会通过蓝牙和 Wi-Fi 自动连上。也可以选“数据线”，用 USB 线连接 iPhone 和中继手机，连接最稳定。
3. **无线 CarPlay 用哪种网络？** iPhone、中继手机和车机之间需要能互相连通。按你的车选择：

| 选项 | 怎么连 | 适合 |
| --- | --- | --- |
| Wi-Fi 直连（推荐） | iPhone 直接连接中继手机；中继手机连接车机的热点（或其他 Wi-Fi），车机通过这个 Wi-Fi 打开网页 | 车机有自己的 Wi-Fi 热点 |
| 此手机的热点 | iPhone 和车机都连接中继手机的个人热点 | 车机没有热点，但能连接外部 Wi-Fi |
| 共用 Wi-Fi | iPhone、中继手机和车机都连接同一个 Wi-Fi，例如随身 Wi-Fi | 已经有一个大家都能连的 Wi-Fi，且路由器允许设备之间互相访问 |

选“此手机的热点”时，要在应用里填写与 Android 热点设置中相同的热点名称和密码。建议在 Android 热点设置中把频段改为 5 GHz，2.4 GHz 下画面容易卡顿；车机连不上 5 GHz 热点时再改回 2.4 GHz。部分手机连着 Wi-Fi 时只能开 2.4 GHz 热点，请先断开 Wi-Fi。

### 第 4 步：完成准备 {#step-prepare}

向导列出还没完成的准备项，逐项处理。这些只需要做一次，之后会自动记住。

- **允许所需权限**：附近的设备（蓝牙）、附近的 Wi-Fi 设备、通知和麦克风。只有允许了麦克风，CarPlay 才会提供 Siri 和通话功能。使用 USB 连接时，还需要同意 Android 的 VPN 请求，用于转发 iPhone 的网络。
- **导入 CarPlay 身份**：选择 `identity.pk8` 和 `certificate.p7b`。可以在文件选择器中一次选中两个，也可以先后各选一个，顺序不限；也可以选择包含这两个文件的 ZIP。只选了一个时，应用会提示还缺哪一个。
- **配对 iPhone**（无线连接）：在 iPhone 上打开“设置 → 蓝牙”，选择这台中继手机，并按 iPhone 的提示允许使用 CarPlay。

### 第 5 步：连接车机网络 {#step-network}

让车机和中继手机连上第 3 步选择的网络：

- **Wi-Fi 直连**：在车机上打开 Wi-Fi 热点，中继手机连接这个热点。
- **此手机的热点**：在中继手机上打开个人热点，车机连接这个热点。
- **共用 Wi-Fi**：中继手机和车机都连接那个 Wi-Fi。

### 第 6 步：开启 CarPlay {#step-start}

在向导最后一步点“开启 CarPlay”。第一次连接时，请把 iPhone 解锁并放在中继手机附近。CarPlay 运行后，应用首页会显示“在车载浏览器中打开此地址”和一个以 `https://` 开头的地址，例如 `https://192.168.43.20:8443/`。

### 第 7 步：在车机浏览器中打开地址 {#step-open}

1. 在车机浏览器的地址栏中输入首页显示的地址。注意以 `https://` 开头，不是 `http://`，冒号后面的端口号也要一起输入。
2. 第一次打开时，浏览器会提示无法验证证书。这是正常现象：点“高级”（或类似选项），再选择继续访问。原因见[关于证书警告](#certificate-warning)。
3. 建议把这个页面加入书签，下次直接打开。

### 第 8 步：开始使用 {#step-use}

页面提示轻触时，轻触一下屏幕：网页会进入全屏并开启声音，这一下不会点到 CarPlay。之后 CarPlay 就会在车机屏幕上运行，可以直接用手指操作。

点网页角落的齿轮按钮可以打开设置：

- **分辨率**：自动、原画、1080p、720p、整屏。“原画”按车机屏幕的原始像素显示，画面最清晰，但需要更多 Wi-Fi 带宽；车机浏览器解码不了时会自动降低。
- **CarPlay 屏幕宽度**：125、200、250、300 mm。这是告诉 iPhone 的屏幕尺寸，数值越大，一屏显示的图标越多，默认 200 mm。
- **全屏**和**轻触恢复全屏**：倒车影像等界面会让浏览器退出全屏。回到网页后，页面会提示“轻触屏幕恢复全屏”，轻触一下即可。浏览器规定进入全屏必须由一次点击触发，所以需要轻触这一下。关闭“轻触恢复全屏”后，页面保持窗口，CarPlay 画面会适配窗口。

更改分辨率或屏幕宽度后，CarPlay 会在几秒后重新连接。

### 第 9 步（可选）：选择车型 {#step-car}

在应用的“设置 → 车型与屏幕”中选择车的品牌和型号，目前内置了小鹏 G6 2023 款的屏幕数据；列表里没有你的车时，选“其他”并输入品牌和型号。

同一处的“CarPlay 显示区域”默认开启：车机浏览器窗口变化时（进入或退出全屏、分屏），CarPlay 画面随之调整，不用重新连接。这里还会显示中继检测到的车机屏幕数据，下次启动 CarPlay 时会用这些数据优化显示。如果你的车型不在列表里，欢迎点“点击该按钮复制我的车机屏幕数据”，到[交流群](/#community)发给开发者，之后的版本就会自带你的车型数据。

### 以后每次使用 {#daily}

1. 上车后打开 OpenXPlay Relay，点“用上次的配置开启”。开启自动连接时，5 秒后会自动用上次的配置开启。
2. 确认车机和中继手机已连上同一个网络。
3. 在车机浏览器中打开书签里的地址，轻触一下屏幕。

应用更新后，车机网页会自动刷新一次，换成新版本。

::: tip 安卓中继不用配对码
车机打开地址即可连接，所以请务必给热点设置密码，只让你自己的设备连接。
:::

## 其他路线 {#other-routes}

### UFI003 USB 随身 Wi-Fi（Linux 中继） {#ufi003-relay}

UFI003 是一款 msm8916 4G USB 随身 Wi-Fi。[OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003) 提供了在它上面运行 Linux 中继所需的支持文件，系统为 OpenStick Debian 11 镜像（内核 `5.15.0-handsomekernel+`，aarch64）。它的 Wi-Fi 没有 5 GHz 频段，因此热点工作在 2.4 GHz。

1. **准备设备。** 在 UFI003 上刷入 OpenStick Debian 11 镜像，下载地址和注意事项见下方的[基础镜像](#ufi003-base-image)。
2. **获取中继。** 从 [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases) 下载 `openxplay-relay-<版本>-linux-aarch64.tar.gz` 并解压，其中有两个 aarch64 可执行文件（`bin/openxplay-relay`、`bin/oxp-relay`）、网页接收端（`web/`）、管理页面（`admin/`）和 `rust/packaging/`。也可以自行构建：构建网页接收端（[OpenXPlay-Stream](https://github.com/OpenXPlay/OpenXPlay-Stream) 的 `rust/web-receiver/`）、管理页面（[OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) 的 `admin-web/`），并在两个仓库中用 `rust/scripts/build-aarch64.sh` 构建 aarch64 可执行文件。
3. **制作安装包。** 在电脑上运行 `UFI003/install/make-bundle.sh`，传入构建产物、`UFI003/install/debs.txt` 中记录的 Debian 软件包，以及中继的 packaging 目录：

   ```sh
   sh UFI003/install/make-bundle.sh /tmp/ufi003-bundle /path/to/openxplay-relay /path/to/oxp-relay /path/to/web/dist /path/to/admin/dist /path/to/debs /path/to/OpenXPlay-Relay/rust/packaging
   ```

4. **在设备上安装。** 把 `.tar.gz` 复制到随身 Wi-Fi 上，解压到一个空目录，然后以 root 身份运行其中的 `UFI003/install/install-ufi003.sh`。在参数前加上 `--dry-run` 可以只做校验、不做任何改动。安装程序会安装无线 CarPlay 所需的蓝牙 RFCOMM 模块、修复后的蓝牙驱动和蓝牙守护程序，并部署中继。
5. **添加 CarPlay 身份。** 安装包中绝不包含 Apple 配件（MFi）身份。请按 [UFI003 README](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003#one-step-installer) 的说明另行放入你自己的身份，然后启动中继。
6. **打开管理页面。** 在连入中继网络的手机或电脑上打开 `https://openxplay-linux.local:6975`。接受证书警告后登录（登录页会显示首次使用的密码），并设置你自己的管理密码。
7. **选择网络。** 默认的“此设备的热点”会打开中继自己的热点：iPhone 自动加入，车机也连接这个热点。“共用 Wi-Fi”则让中继、iPhone 和车机都连接同一个现有的 2.4 GHz 网络。
8. **配对 iPhone。** 点“配对 iPhone”，配对窗口会开放 10 分钟；在 iPhone 上打开“设置 → 蓝牙”，选择这台中继。
9. **在车机浏览器中打开。** 车机连接中继的网络，在浏览器中打开 `https://10.77.0.1:8443/`（使用中继自己的热点时），也可以用 `https://openxplay-linux.local:8443/`。第一次打开时接受证书警告。如果在管理页面开启了配对码，输入中继上显示的 8 位数字。

::: info 待确认
第 6 步中，刚安装好的设备如何首次连入其网络，仓库中暂时还没有说明。遇到问题可以到[交流群](/#community)提问。
:::

#### 基础镜像 {#ufi003-base-image}

UFI003 使用 OpenStick 的 [v1 版本](https://github.com/OpenStick/OpenStick/releases/tag/v1)（2022-02-08 发布）。OpenStick 禁止商用，OpenXPlay 不转发这些文件；请从 OpenStick 的发布页下载，并核对 SHA-256（macOS 用 `shasum -a 256 文件名`，Linux 用 `sha256sum 文件名`）：

| 文件 | 用途 | SHA-256 |
| --- | --- | --- |
| [`debian.zip`](https://github.com/OpenStick/OpenStick/releases/download/v1/debian.zip)（约 377 MB） | Debian 11 根文件系统 `rootfs.img`，另带一份 `boot.img` | `8be6f100e8fc3f612e0b03c199d01f51d38b953a19343ad0f4cf7a2f7a57f603` |
| [`boot-ufi001c.img`](https://github.com/OpenStick/OpenStick/releases/download/v1/boot-ufi001c.img) | 内核引导分区，UFI003 用这一个；与 `debian.zip` 中的 `boot.img` 完全相同 | `a2b527e98a5cee0a4c3cad5099af7ce0648246f19d20d13ef2c168e400c81b33` |
| [`base-generic.zip`](https://github.com/OpenStick/OpenStick/releases/download/v1/base-generic.zip) | 引导程序等底层分区和刷机脚本，只在第一次从原厂系统刷机时需要 | `b609b91c94b07d7cde4141a578df5c1440fbe75140f0c645c7124356774e2418` |

发布页上的其他 `boot-*.img` 和 `firmware-*.zip` 属于其他型号，UFI003 用不到。

::: warning 刷机前请注意
- 刷机包会覆盖原机的分区表和引导程序，之后无法再运行原厂安卓系统，OpenStick 也不提供恢复方法。
- 第一次刷机前先做整机备份，至少保留 `modemst1`、`modemst2`、`fsc`、`fsg` 四个分区：它们存有这台设备独有的基带校准数据，丢失后无法从别处找回。
- `base-generic.zip` 中的 `flash.sh` 先擦除引导分区、换上新的引导程序，然后才把上述四个分区备份成同名的 `.bin` 文件，最后再写回设备。压缩包里本来就带着这四个 `.bin` 文件，其中三个有实际内容，但不是你这台设备的数据；脚本不会因为某一步失败而停下，备份失败时，写回设备的就是压缩包里的这几个文件。不要直接运行这个脚本；逐条执行，确认四个分区都已从你的设备取回、文件确实被替换后再继续。
- 用 fastboot 写入 `rootfs.img` 时加上 `-S 200M`（`debian.zip` 自带的 `flash.sh` 已经这样做）。按默认的约 256 MB 分块传输，UFI003 会在中途失败。
- 重刷会清空设备上的所有数据，包括你放入的 CarPlay 身份、iPhone 配对记录和 Wi-Fi 设置。
:::

已经运行 OpenStick 的 UFI003 重刷时，只需要写入根文件系统和引导分区。解压 `debian.zip`，在其中的 `debian` 目录里执行下面的命令，后三行与目录中的 `flash.sh` 相同：

```sh
adb reboot bootloader
fastboot -S 200M flash rootfs rootfs.img
fastboot flash boot boot.img
fastboot reboot
```

### Carlink 应用（实验性） {#carlink}

Carlink 输出是实验性功能，有可能连接失败。它通过 Wi-Fi 连接车机上的 Carlink 应用，始终使用 H.264 视频。

1. **开启 Carlink 输出。** 在设置向导中把车机显示方式选为“Carlink 应用”，或在中继中把输出方式设为“浏览器和 Carlink”。
2. **在车机上打开 Carlink。** 启动车机上的 Carlink 应用。
3. **输入配对码。** 把车机屏幕上显示的配对码输入中继，并马上连接；配对码每 2 分钟更换一次。

| 中继 | 注意事项 |
| --- | --- |
| 安卓手机 | Carlink 需要 Android 10 及以上。单个 Wi-Fi 射频可能无法同时支持无线 CarPlay 和 Carlink，用 USB 连接 CarPlay 更可靠。 |
| UFI003 | 它的 Wi-Fi 仅支持 2.4 GHz，无法连接 Carlink Wi-Fi 工作在 5 GHz 的车机。 |

## 关于证书警告 {#certificate-warning}

浏览器只在安全页面中提供 WebCodecs 视频解码，所以中继通过 HTTPS 提供网页接收端。中继使用自己生成的证书，没有经过公共机构签发，因此浏览器第一次打开时会显示警告。

- **安全吗？** 连接仍然是加密的。警告的意思是浏览器无法验证证书由谁签发。确认地址是你的中继后继续访问即可（选项通常在“高级”里）。
- **为什么又出现了？** 中继生成了新证书。安卓中继在自身网络地址变化时会这样做；Linux 中继在替换设备时钟不准时生成的证书文件后也会这样做。
- **能避免吗？** 安卓中继可以在应用中导入你自己的证书（PKCS #12 格式的 `.p12` 文件）。

## 下一步 {#next-steps}

- 遇到问题？请看[常见问题与故障排查](/faq)。
- 想知道每个版本改了什么？请看[更新日志](/changelog)。
- 想测试另一台车机？在它的浏览器中打开[检测车机](/check)。
- 想参与构建或贡献？请看[开发者与许可证](/developers)。
