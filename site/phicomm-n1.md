---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-30
title: 用斐讯 N1 电视盒子作中继（Linux 中继）
description: 把斐讯 N1 设为 OpenXPlay Linux 中继：把 Armbian 写入 U 盘并装进 eMMC，通过 SSH 安装 N1 设备支持包和中继，设置 Wi-Fi 国家或地区，添加 CarPlay 身份、配对 iPhone，在车机浏览器中打开 CarPlay。
breadcrumb: 斐讯 N1 作中继
schema: howto
howtoName: 用斐讯 N1 电视盒子作 Linux 中继，在车机浏览器中显示 iPhone CarPlay
howtoTools:
  - 支持 CarPlay 的 iPhone
  - 斐讯 N1 电视盒子及其 12 V 电源
  - 8 GB 或更大的 U 盘
  - 能用 SSH 的电脑，以及给 N1 接网线的路由器
  - 你自行提供的 Apple 配件（MFi）身份
  - 浏览器支持 WebCodecs 的安卓车机
next:
  text: 日常使用与设置
  link: /daily-use
---

# 用斐讯 N1 作中继 <Badge type="info" text="进阶" />

斐讯 N1 是一款采用晶晨 S905D 的电视盒子。装上 Armbian 后，它可以运行 OpenXPlay 的 Linux 中继：通电后自动启动，热点可以用 5 GHz，车机用自带的浏览器或 Carlink 应用显示 CarPlay。[OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/PhicommN1) 提供了 N1 的设备支持包。

整个安装都在电脑上通过 SSH 完成，适合熟悉命令行的用户。OpenXPlay Flasher 暂时还不能安装 N1，见[OpenXPlay Flasher](#flasher)。

::: warning 风险自负
- 把 Armbian 写入 eMMC 会清除 N1 原有的系统。
- 我们还没有在 N1 上用 iPhone 完整测试过 CarPlay。Linux 中继到目前为止都是预发布版，尚未在真机上验证的功能见[其他 Linux 设备](/linux-devices)。
- 请到[交流群](/community)反馈结果，并附上中继和设备支持包的版本。
:::

| N1 的硬件 | 对中继的意义 |
| --- | --- |
| BCM43455 Wi-Fi，2.4 GHz 和 5 GHz | 中继的热点可以用 5 GHz，画面不容易卡顿 |
| BCM4345C0 蓝牙，经典蓝牙和低功耗蓝牙 | 无线 CarPlay 和 Carlink 都能用 |
| 千兆网口 | 安装和管理时接路由器 |
| 两个 USB 2.0 接口 | 可以再接一块 USB Wi-Fi 网卡，见[网络与 Wi-Fi](#wifi) |
| 12 V 直流供电 | 在车上也需要能稳定提供 12 V 的电源 |

## 需要准备 {#requirements}

| 需要准备 | 说明 |
| --- | --- |
| 斐讯 N1 | 连同它的 12 V 电源 |
| U 盘 | 8 GB 或更大，里面的数据会被清空。装好后可以留作救援盘 |
| 网线和路由器 | 安装时 N1 用网线接路由器，电脑连接同一个路由器 |
| 电脑 | Windows、macOS 或 Linux，能写入 U 盘，能运行 `ssh` 命令（Windows 10 和 11 已自带） |
| Apple 配件（MFi）身份 | `identity.pk8` 和 `certificate.p7b`，由你自行提供，见[什么是 Apple 配件（MFi）身份](/quick-start#mfi-identity) |

## 把 Armbian 写入 U 盘 {#usb .step}

我们用 ophub 的 [amlogic-s9xxx-armbian](https://github.com/ophub/amlogic-s9xxx-armbian) 测试：从版本 [`Armbian_trixie_arm64_server_2026.10`](https://github.com/ophub/amlogic-s9xxx-armbian/releases/tag/Armbian_trixie_arm64_server_2026.10) 下载 `Armbian_26.11.0_amlogic_s905d_trixie_6.12.112_server_2026.10.15.img.gz`（Debian 13，内核 6.12）。它的 SHA-256 应为：

```text
2a5838ff490db59065f9ab29c6762ea459b08e7ff6802ef22fa1329bfaf37fff
```

在 Windows 上用 `certutil -hashfile <文件> SHA256`、在 macOS 上用 `shasum -a 256 <文件>`、在 Linux 上用 `sha256sum <文件>` 核对。然后解压得到 `.img` 文件，用 [balenaEtcher](https://etcher.balena.io/) 或 [Rufus](https://rufus.ie/)（Windows）把它写入 U 盘。

设备支持包要求 Debian 13（trixie）。ophub 其他 Debian 13 的 N1 镜像，例如 6.18 内核的，应该也能用，但还没有测试过。

## 从 U 盘启动 N1 {#boot .step}

1. 用网线把 N1 接到路由器，插上 U 盘，再接通电源。
2. 大约 2 分钟后，在路由器的设备列表中找到名为 Armbian 的设备，记下它的 IP 地址。

::: details N1 没有从 U 盘启动？ {#boot-usb}
- 刷过 Armbian、OpenWrt 等第三方系统的 N1，插着 U 盘通电通常就会从 U 盘启动。
- 还在运行斐讯原厂系统的 N1，要先在原厂系统中开启 ADB 调试，再在电脑上运行下面两条命令，N1 会重启并从 U 盘启动。部分原厂系统版本不能直接开启 ADB，需要先降级，请参考 N1 社区的教程。

  ```sh
  adb connect <N1 的 IP>
  adb shell reboot update
  ```

- 换另一个 USB 接口再试一次。

详见 ophub 文档中的[设置盒子从 USB/TF/SD 中启动](https://github.com/ophub/amlogic-s9xxx-armbian/blob/main/documents/README.cn.md#124-设置盒子从-usbtfsd-中启动)。
:::

## 把系统装进 eMMC {#emmc .step}

在电脑上登录 N1。默认用户是 `root`，密码是 `1234`：

```sh
ssh root@<N1 的 IP>
```

第一次登录时，Armbian 会让你修改 root 密码并创建一个普通用户，按提示完成，以后就用这个用户登录。然后把系统写入 eMMC：

```sh
armbian-install
```

依次输入 `101`（Phicomm-N1）和 `1`（ext4），等它完成。然后关机：

```sh
poweroff
```

约 30 秒后拔掉电源和 U 盘，再重新接通电源：插着 U 盘时，N1 会优先从 U 盘启动。N1 从 eMMC 启动后，用你创建的用户登录。IP 地址通常不变；变了就到路由器中再查一次。

```sh
ssh <用户名>@<N1 的 IP>
```

::: details 想保留原来的系统？ {#backup}
写入 eMMC 之前，在 U 盘上的 Armbian 中运行 `armbian-ddbr`，输入 `b`，原系统会备份到 U 盘的 `/ddbr/BACKUP-arm-64-emmc.img.gz`，请复制到电脑上保存。以后想换回原系统时，从 U 盘启动，运行同一个命令并输入 `r`。详见 ophub 文档中的[使用 armbian-ddbr 备份恢复](https://github.com/ophub/amlogic-s9xxx-armbian/blob/main/documents/README.cn.md#1231-使用-armbian-ddbr-备份恢复)。
:::

## 安装设备支持包 {#device .step}

在 OpenXPlay-Hardware 的 [Releases](https://github.com/OpenXPlay/OpenXPlay-Hardware/releases) 中选择最新的 `phicomm-n1-device-v` 版本（目前都是预发布版，需要 0.1.1-beta.1 及以上），在 N1 上下载、核对 SHA-256，解压后运行安装程序。把 `V` 改成最新的版本号；`--dry-run` 只做检查、不做任何改动：

```sh
V=0.1.1-beta.1
base=https://github.com/OpenXPlay/OpenXPlay-Hardware/releases/download/phicomm-n1-device-v$V
curl -fL -O "$base/openxplay-phicomm-n1-device-$V.tar.gz" -O "$base/SHA256SUMS"
sha256sum --ignore-missing -c SHA256SUMS
tar -xzf openxplay-phicomm-n1-device-$V.tar.gz
D=openxplay-phicomm-n1-device-$(echo "$V" | sed 's/-/~/')
sudo sh "$D/install-device.sh" --dry-run
sudo sh "$D/install-device.sh"
sudo reboot
```

解压出的文件夹名中，预发布版本号的 `-` 写作 `~`（例如 `0.1.1~beta.1`），`D` 就是这个文件夹。重启后重新登录，检查安装结果：

```sh
V=0.1.1-beta.1
sudo sh "openxplay-phicomm-n1-device-$(echo "$V" | sed 's/-/~/')/install-device.sh" --verify
```

| 命令 | 最后一行应为 |
| --- | --- |
| `--dry-run` | `OXP-STAGE device preflight-ok version=<版本>` |
| 安装 | `OXP-STAGE device ok version=<版本> reboot=required` |
| `--verify` | `OXP-STAGE device verified version=<版本>` |

`<版本>` 与文件夹名中的写法相同。

设备支持包自带中继需要、而 Armbian 缺少的 Debian 软件包（例如 BlueZ），安装时不需要联网。它会：

- 安装主机配置 `/etc/openxplay/host.json`；
- 根据以太网 MAC 地址为 Wi-Fi 和蓝牙生成各自的地址；不这样做的话，每台 N1 的这两个地址都相同；
- 在开机时修正以太网 PHY，用 `armbian-update` 更新内核后也会再次修正；
- 安装较新的 Cypress Wi-Fi 固件，让 5 GHz 的 36 至 48 信道在 CN 国家代码下可用。原厂固件只允许 149 至 165 信道；52 至 144 信道仍不可用。

::: details N1 连不上 GitHub？ {#offline}
在电脑上下载这两个文件并核对 SHA-256，再复制到 N1 上，然后在 N1 上设好 `V`，从 `tar` 那一行继续：

```sh
scp openxplay-phicomm-n1-device-<版本>.tar.gz SHA256SUMS <用户名>@<N1 的 IP>:
```

下一步的中继软件包也可以这样复制。
:::

## 安装中继 {#relay .step}

在 [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases) 中选择最新的 `linux-v` 版本（目前都是预发布版），现在是 `linux-v0.1.6-beta.3`：

```sh
V=0.1.6-beta.3
base=https://github.com/OpenXPlay/OpenXPlay-Relay/releases/download/linux-v$V
curl -fL -O "$base/openxplay-relay_${V}_arm64.deb" -O "$base/SHA256SUMS"
sha256sum --ignore-missing -c SHA256SUMS
sudo apt-get install --no-install-recommends ./openxplay-relay_${V}_arm64.deb
```

把 `V` 改成最新的版本号。依赖已由设备支持包装好，这一步不需要联网。中继作为系统服务运行，开机后自动启动；软件包会装哪些东西，见[安装中继](/linux-devices#install)。

## 打开管理页面 {#admin .step}

在同一个局域网中的手机或电脑上打开 `https://<N1 的 IP>:6975`。浏览器会提示证书不受信任，继续访问即可。首次登录的密码是 `openxplay`，登录后请立即修改。忘记密码时，见[忘记了管理密码？](/linux-devices#reset-password)

## 设置 Wi-Fi 国家或地区 {#country .step}

在管理页面中打开“**iPhone 连接 → 无线网络**”，把“**Wi-Fi 国家或地区**”设为你所在的国家或地区，例如中国选 `CN`。

保持“系统设置”时，N1 通常使用全球通用的规则（`00`）：5 GHz 信道都不能开热点，中继只能在 2.4 GHz 的 6 信道开热点。设为 `CN` 后，装好设备支持包的 N1 可以在 5 GHz 的 36 至 48 和 149 至 165 信道开热点。

## 添加 CarPlay 身份 {#identity .step}

在管理页面中打开“**开发者选项 → 认证身份与证书**”，选择 `identity.pk8` 和 `certificate.p7b`，或者包含这两个文件的 ZIP。也可以[手动放入身份文件](/linux-devices#identity)。

## 完成设置向导 {#setup .step}

按管理页面的设置向导，依次选择你的车、输出（车机浏览器、Carlink 应用或两者）和网络，再完成它列出的准备事项。中继自己的热点名为 `OpenXPlay-Linux-XXXX`，密码为 `openxplay`，除非你另行设置。各选项的说明见[完成设置向导](/linux-devices#setup)。

## 配对 iPhone {#pair .step}

点“配对 iPhone”，配对窗口会开放 10 分钟。在 iPhone 上打开“设置 → 蓝牙”，选择 `OpenXPlay Linux`。

## 在车机上打开 CarPlay {#head-unit .step}

车机连接中继的热点，在浏览器中打开 `https://10.77.0.1:8443/`；管理页面会列出车机要打开的地址。第一次打开时接受证书警告，原因见[故障排查](/troubleshooting#certificate-warning)。使用 Carlink 应用时，见 [Carlink 应用](/carlink)。

装好后，N1 就可以放到车上了：接通 12 V 电源，中继就会自动启动。在车上用手机打开管理页面时，地址取决于手机连接的热点：

| 手机连接的热点 | 管理页面 |
| --- | --- |
| 中继的热点 `OpenXPlay-Linux-XXXX` | `https://10.77.0.1:6975` |
| 管理热点，默认名为 `OpenXPlay-Admin`，需要另接一块 USB Wi-Fi 网卡，见[网络与 Wi-Fi](#wifi) | `https://10.79.0.1:6975` |

中继出错停止时，它的热点也会关闭，这时请用管理热点。iPhone 连接管理热点，或与 N1 在同一个局域网时，也可以打开 `https://openxplay-linux.local:6975`。第一次打开后把页面加入书签或添加到主屏幕，以后就不用再输入地址。

## 网络与 Wi-Fi {#wifi}

- N1 的热点和 Wi-Fi 客户端连接只能共用同一个信道同时运行。
- 使用 Carlink 时，中继要以客户端方式连接车机的 Wi-Fi。N1 只有一块 Wi-Fi 网卡，所以 iPhone 会跟着中继转到车机的网络上。
- 可以在 USB 接口上再接一块 USB Wi-Fi 网卡（例如 RTL8822BU），在管理页面的“**iPhone 连接 → 无线网络 → 网卡与网络角色**”中，让它负责 Carlink 或管理热点。这种用法还没有完整测试。
- 网线可以一直接着：在家时，通过路由器分配给 N1 的地址打开管理页面，也可以用 SSH 登录。

## 更新 {#updates}

- **中继**：下载新版本的 `.deb` 并核对后，运行 `sudo openxplay-relay-update openxplay-relay_<版本>_arm64.deb`。新版本起不来时，它会自动装回上一个版本，见[更新中继](/linux-devices#update)。
- **设备支持包**：用新版本的整合包，按[安装设备支持包](#device)的步骤再装一次，然后重启。安装程序不会把已装的软件包降级。
- **Armbian 内核**：`armbian-update` 更新内核后，设备支持包会自动再次修正以太网 PHY。

## OpenXPlay Flasher {#flasher}

OpenXPlay Flasher 已有 N1 的设备配置，通过网络 SSH 安装设备支持包和中继，签名的软件包列表也已列出 N1 的这两个软件包。但用 Flasher 安装 N1 还没有在真机上测试过，在此之前请按本页手动安装。Flasher 不会安装 Armbian。

## 卸载 {#uninstall}

```sh
sudo apt-get purge openxplay-relay
sudo apt-get purge openxplay-phicomm-n1
```

第一条命令卸载中继，`/var/lib/openxplay` 中的设置、配对和身份文件会保留；不再需要时，用 `sudo rm -rf /var/lib/openxplay` 删除。第二条命令卸载设备支持包，并把启动设备树还原为原来的版本。想换回原来的系统，见[想保留原来的系统？](#backup)

设备支持包采用 OpenXPlay-Hardware 许可证：开源，禁止商用，详见[许可证](/licensing#licenses)。

## 接下来 {#next-steps}

- [日常使用与设置](/daily-use)：每次上车怎么连接，以及车机网页的各项设置。
- [可信 HTTPS](/trusted-https)：用免费域名去掉证书警告。
- 遇到问题？请看[故障排查](/troubleshooting)，也欢迎到[交流群](/community)分享你的 N1 运行情况。
