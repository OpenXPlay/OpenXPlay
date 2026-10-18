---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-17
title: 快速开始：通过中继使用 CarPlay
description: 一步步设置 OpenXPlay：把安卓手机或 UFI003 USB 随身 Wi-Fi 设为中继，配对 iPhone，然后在车机浏览器或 Carlink 应用中打开 CarPlay。
breadcrumb: 快速开始
schema: howto
howtoName: 设置 OpenXPlay，在安卓车机上显示 iPhone CarPlay
howtoTools:
  - 支持 CarPlay 的 iPhone
  - 中继：装有 OpenXPlay Relay 应用的安卓手机，或运行 Linux 中继的 UFI003 USB 随身 Wi-Fi
  - 你自行提供的 Apple 配件（MFi）身份
  - 浏览器支持 WebCodecs 或带有 Carlink 应用的安卓车机
---

# 快速开始

使用 OpenXPlay 需要一部 iPhone、一台中继，以及浏览器支持 WebCodecs（或带有 Carlink 应用）的车机。先设置好中继，用蓝牙把 iPhone 和中继配对，再在车机浏览器中打开中继显示的车机访问地址（以 `https://` 开头）；第一次打开时接受证书警告即可。

## 准备工作 {#requirements}

| 需要准备 | 说明 |
| --- | --- |
| 支持 CarPlay 的 iPhone | 通过无线（蓝牙和 Wi-Fi）连接中继；使用安卓中继时也可以用 USB 线连接。 |
| 一台中继 | 运行 OpenXPlay Relay 应用的安卓手机（Android 8.0 及以上），或运行 Linux 中继的 UFI003 USB 随身 Wi-Fi。 |
| Apple 配件（MFi）身份 | 各仓库及其构建产物都不包含该身份。要正常使用，需要由你自行提供。 |
| 车机上的入口 | 支持 WebCodecs 视频解码的浏览器（可用[检测车机](/check)测试），或 Carlink 应用（实验性）。 |

## 选择路线 {#choose-a-route}

| | 安卓手机作中继 | UFI003 USB 随身 Wi-Fi |
| --- | --- | --- |
| 中继软件 | OpenXPlay Relay 应用 | Linux 中继 |
| iPhone 连接方式 | 无线（Wi-Fi 直连、此手机的热点或共用 Wi-Fi）或 USB 线缆 | 无线，经随身 Wi-Fi 自己的热点或共用 Wi-Fi |
| 热点频段 | 自动、2.4 GHz 或 5 GHz（推荐 5 GHz） | 仅 2.4 GHz |
| Carlink 输出 | 需要 Android 10 及以上 | 支持（实验性） |
| 设置位置 | 应用内，以及 6975 端口的网页管理页面 | 6975 端口的网页管理页面 |
| 获取软件 | [下载安装包](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk)，或从源码构建 | 下载 [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases) 中的 Linux 中继包或自行构建，再用 [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003) 打包安装 |

## 路线一：安卓手机作中继 {#android-relay}

OpenXPlay Relay 应用运行在安卓手机上，使用 OpenXPlay-DiPlay 作为 CarPlay 接收端，并向车机提供网页接收端。

1. **安装 OpenXPlay Relay。** 在中继手机上下载并安装 [openxplay-relay.apk](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk)（最新版本；历史版本见 [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases)），需要 Android 8.0 及以上，Carlink 输出需要 Android 10 及以上。安装时如果系统提示，请允许从浏览器或文件管理器安装应用。也可以按 [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) README 的说明自行构建。
2. **按设置向导选择。** 第一次打开应用会进入设置向导：先选车机显示方式（车载浏览器或 Carlink 应用），再选 iPhone 连接方式（无线或 USB 数据线）；选无线时，还要选网络（Wi-Fi 直连、此手机的热点或共用 Wi-Fi）。向导会标出推荐的选项。选“此手机的热点”时，建议在 Android 热点设置中把频段改为 5 GHz，2.4 GHz 下画面容易卡顿；车机连不上 5 GHz 热点时再改回 2.4 GHz。
3. **完成准备。** 向导列出还没完成的准备项，逐项处理：
   - **权限**：附近的设备（蓝牙）、附近的 Wi-Fi 设备、通知和麦克风。只有允许了麦克风，CarPlay 才会提供 Siri 和通话功能。使用 USB 连接时，还需要同意 Android 的 VPN 请求，用于转发 iPhone 的网络。
   - **CarPlay 身份**：导入你自行提供的配件身份，即 `identity.pk8` 和 `certificate.p7b` 两个文件。可以在文件选择器中一次选中两个，也可以先后各选一个，顺序不限；也可以选择包含这两个文件的 ZIP。没有有效身份时，应用不会启动 CarPlay。
   - **配对 iPhone**（无线连接）：在 iPhone 上打开“设置 → 蓝牙”，选择这台中继。
4. **启动 CarPlay。** 在向导最后一步点“开启 CarPlay”。应用会显示要在车载浏览器中打开的地址，注意它以 `https://` 开头。接着参照[在车机上](#head-unit)操作。以后每次打开应用，可以直接用上次的配置开启，也可以重新设置。
5. **选择车型（可选）。** 在“设置 → 车型与屏幕”中选择车的品牌和型号，目前内置了小鹏 G6 2023 款的屏幕数据；列表里没有你的车时，选“其他”并输入品牌和型号。同一处的“CarPlay 显示区域”默认开启：车机浏览器窗口变化时（进入或退出全屏、分屏），CarPlay 画面随之调整，不用重新连接。这里还会显示中继检测到的车机屏幕数据，下次启动 CarPlay 时会用这些数据优化显示。如果你的车型不在列表里，欢迎点“点击该按钮复制我的车机屏幕数据”，到[交流群](/#community)发给开发者，之后的版本就会自带你的车型数据。

## 路线二：UFI003 USB 随身 Wi-Fi（Linux 中继） {#ufi003-relay}

UFI003 是一款 msm8916 4G USB 随身 Wi-Fi。[OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003) 提供了在它上面运行 Linux 中继所需的支持文件，系统为 OpenStick Debian 11 镜像（内核 `5.15.0-handsomekernel+`，aarch64）。它的 Wi-Fi 没有 5 GHz 频段，因此热点工作在 2.4 GHz。

1. **准备设备。** 在 UFI003 上运行 OpenStick Debian 11 镜像。
2. **获取中继。** 从 [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases) 下载 `openxplay-relay-<版本>-linux-aarch64.tar.gz` 并解压，其中有两个 aarch64 可执行文件（`bin/openxplay-relay`、`bin/oxp-relay`）、网页接收端（`web/`）、管理页面（`admin/`）和 `rust/packaging/`。也可以自行构建：构建网页接收端（[OpenXPlay-Stream](https://github.com/OpenXPlay/OpenXPlay-Stream) 的 `rust/web-receiver/`）、管理页面（[OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) 的 `admin-web/`），并在两个仓库中用 `rust/scripts/build-aarch64.sh` 构建 aarch64 可执行文件。
3. **制作安装包。** 在电脑上运行 `UFI003/install/make-bundle.sh`，传入构建产物、`UFI003/install/debs.txt` 中记录的 Debian 软件包，以及中继的 packaging 目录：

   ```sh
   sh UFI003/install/make-bundle.sh /tmp/ufi003-bundle /path/to/openxplay-relay /path/to/oxp-relay /path/to/web/dist /path/to/admin/dist /path/to/debs /path/to/OpenXPlay-Relay/rust/packaging
   ```

4. **在设备上安装。** 把 `.tar.gz` 复制到随身 Wi-Fi 上，解压到一个空目录，然后以 root 身份运行其中的 `UFI003/install/install-ufi003.sh`。在参数前加上 `--dry-run` 可以只做校验、不做任何改动。安装程序会安装无线 CarPlay 所需的蓝牙 RFCOMM 模块、修复后的蓝牙驱动和蓝牙守护程序，并部署中继。
5. **添加 CarPlay 身份。** 安装包中绝不包含 Apple 配件（MFi）身份。请按 [UFI003 README](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003#one-step-installer) 的说明另行放入你自己的身份，然后启动中继。
6. **打开管理页面。** 在连入中继网络的手机或电脑上打开 `https://openxplay-linux.local:6975`。接受证书警告后登录（登录页会显示首次使用的密码），并设置你自己的管理密码。
7. **选择网络。** 默认的“此设备的热点”会打开中继自己的热点：iPhone 自动加入，车机也连接这个热点。“共用 Wi-Fi”则让中继、iPhone 和车机都连接同一个现有的 2.4 GHz 网络。
8. **配对 iPhone。** 点“配对 iPhone”，配对窗口会开放 10 分钟；在 iPhone 上打开“设置 → 蓝牙”，选择这台中继。接着参照[在车机上](#head-unit)操作。

::: info 待确认
第 6 步中，刚安装好的设备如何首次连入其网络，仓库中暂时还没有说明。遇到问题可以到[交流群](/#community)提问。
:::

## 在车机上 {#head-unit}

### 浏览器（网页接收端） {#browser}

网页接收端是中继提供给车机浏览器的一个网页。浏览器用 WebCodecs 解码 CarPlay 视频，并把你的触控操作传回 iPhone。建议先用[检测车机](/check)测试一下浏览器。

1. **连接中继的网络。** 在车机上连接中继的热点，名称和密码显示在中继应用或管理页面中；如果选择了共用 Wi-Fi，就连接那个网络。
2. **打开车机访问地址。** 在车机浏览器中打开中继“车机访问地址”中列出的地址。注意地址以 `https://` 开头，不是 `http://`。网页接收端使用 8443 端口：使用 Linux 中继自己的热点时，地址通常是 `https://10.77.0.1:8443/`，中继也提供 `https://openxplay-linux.local:8443/` 这样的域名地址。
3. **接受证书警告。** 第一次打开时，浏览器会提示无法验证证书。这是正常现象，详见[关于证书警告](#certificate-warning)。
4. **Linux 中继：按提示输入配对码。** 如果在管理页面开启了配对码，输入中继上显示的 8 位数字。安卓中继不使用配对码，车机打开地址即可连接，所以请务必给中继的热点设置密码。
5. **轻触开启声音。** 如果页面提示声音已暂停，轻触一下屏幕即可。之后 CarPlay 就会在车机屏幕上运行。

使用安卓中继时，车机网页还有这些功能：

- **恢复全屏**：倒车影像等界面会让浏览器退出全屏。回到网页后，页面会提示“轻触屏幕恢复全屏”，轻触一下即可，这一下不会点到 CarPlay。浏览器规定进入全屏必须由一次点击触发，所以需要轻触这一下。在网页的设置中关闭“轻触恢复全屏”后，页面保持窗口，CarPlay 画面会适配窗口。
- **画面设置**：在网页的设置中可以调整分辨率（自动、1080p、720p、整屏）和图标大小（小、标准、大）。更改后，CarPlay 会在几秒后重新连接。

### Carlink 应用（实验性） {#carlink}

Carlink 输出是实验性功能，有可能连接失败。它通过 Wi-Fi 连接车机上的 Carlink 应用，始终使用 H.264 视频。

1. **开启 Carlink 输出。** 在中继中把输出方式设为 Carlink，或“浏览器和 Carlink”。
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
- 想测试另一台车机？在它的浏览器中打开[检测车机](/check)。
- 想参与构建或贡献？请看[开发者与许可证](/developers)。
