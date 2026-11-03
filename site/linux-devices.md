---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-29
title: 在其他设备上运行 Linux 中继：设备要求与手动安装
description: 检查一台 arm64 Linux 开发板、电视盒子或随身 Wi-Fi 能否运行 OpenXPlay Linux 中继，用 Debian 软件包手动安装中继，添加 CarPlay 身份并配对 iPhone，以及怎样更新和卸载中继。
breadcrumb: 其他设备上的 Linux 中继
schema: howto
howtoName: 在 arm64 Linux 设备上手动安装 OpenXPlay Linux 中继
howtoTools:
  - 支持 CarPlay 的 iPhone
  - 带 systemd、NetworkManager 和可开热点 Wi-Fi 的 arm64 Linux 设备（无线连接 iPhone 还需要 BlueZ 和经典蓝牙）
  - 你自行提供的 Apple 配件（MFi）身份
  - 浏览器支持 WebCodecs 的安卓车机
next:
  text: 日常使用与设置
  link: /daily-use
---

# 其他设备上的 Linux 中继 <Badge type="info" text="进阶" />

除了 UFI003，OpenXPlay 的 Linux 中继也能在其他 arm64 Linux 设备上运行，例如开发板、电视盒子和随身 Wi-Fi。本页面向熟悉 SSH 和命令行的用户：怎样判断一台设备能否运行中继、怎样手动安装，以及怎样更新和卸载。和其他方案一样，车机上不需要安装任何东西。

UFI003 有自己的引导式安装，见[用 UFI003 随身 Wi-Fi 作中继](/ufi003-relay)。斐讯 N1 也有自己的教程，见[用斐讯 N1 作中继](/phicomm-n1)。OpenXPlay Flasher 暂时还不能安装其他设备。

::: warning 风险自负
在其他设备上手动安装中继，风险由你自己承担。0.1.6 还没有在真机上验证过这些情况：用 iPhone 运行 CarPlay、有线 CarPlay、在车上使用 Carlink、特斯拉、UFI003、WPA3、申请可信 HTTPS 证书、硬件编码、Wi-Fi 直连、I2C、CH341 和远程 MFi，以及在中继上播放音频。请到[交流群](/community)反馈哪些可用、哪些不可用，并附上设备、系统和中继版本。
:::

## 设备要求 {#requirements}

| 要求 | 为什么需要 | 怎样检查 | |
| --- | --- | --- | --- |
| 64 位 ARM（aarch64） | 发布版只为 aarch64 构建。它们是静态链接的 musl 可执行文件，与 glibc 和 Debian 的版本无关。 | `uname -m` 输出 `aarch64`；安装 `.deb` 时，`dpkg --print-architecture` 输出 `arm64` | 必需 |
| 以 systemd 为 init | 中继作为 systemd 服务 `openxplay-relay.service` 运行。 | `ps -p 1 -o comm=` 输出 `systemd` | 必需 |
| NetworkManager | 所有热点和 Wi-Fi 连接都由 `nmcli` 建立；它的共享模式配合 `dnsmasq-base` 分配地址（DHCP）。 | `systemctl is-active NetworkManager` | 必需 |
| BlueZ | 中继通过 D-Bus 使用 `bluetoothd`，并使用 `sdptool`、`hciconfig` 和 `btmgmt` 这几个工具。 | `systemctl is-active bluetooth`；`command -v sdptool hciconfig btmgmt` | 无线连接和 Carlink 时必需 |
| `iw` | 中继用它读取 Wi-Fi 网卡的工作模式、信道和国家代码。 | `command -v iw` | 必需 |
| 经典蓝牙（BR/EDR） | 无线 CarPlay 通过 RFCOMM 传输 iAP2，RFCOMM 属于经典蓝牙。只支持低功耗蓝牙（LE）的蓝牙适配器不能用于无线连接。 | `btmgmt info` 中有 `br/edr` | 无线连接时必需 |
| 内核支持 RFCOMM | 原因同上。UFI003 的内核原本没有 RFCOMM，它的设备支持包补上了 `rfcomm.ko`。 | `sudo modprobe rfcomm` | 无线连接时必需 |
| Wi-Fi 能作接入点（AP 模式） | 中继自己的热点（默认网络）需要它。 | `iw list` 的 *Supported interface modes* 中有 `AP` | 必需 |
| 端口未被占用 | 6975 TCP（管理页面）、8443 TCP（车机网页）、7000 起（AirPlay）、5353 UDP（mDNS，由中继自己应答；与 avahi 同时运行尚未测试）。 | `ss -ltnup` | 必需 |
| Apple 配件（MFi）身份 | 没有身份时，中继只提供管理页面。 | 由你自行提供，见[添加 CarPlay 身份](#identity) | 必需 |
| 5 GHz Wi-Fi | 频段为自动时，只要有 5 GHz 信道能开热点就用 5 GHz，否则用 2.4 GHz 的 6 信道。只有 2.4 GHz 也能用（UFI003 就在 2.4 GHz 上运行 CarPlay），这时请在车机网页中把帧率设为 30。 | `iw list`；`iw reg get` | 非必需 |
| 第二块 Wi-Fi 网卡，能以客户端连接 5 GHz | 在真车上使用 Carlink 时，中继要用一块不负责 iPhone 热点的 Wi-Fi 网卡，以客户端（station）方式连接车机的 5 GHz Wi-Fi。只有一块 Wi-Fi 网卡时，中继只提供车机浏览器输出。Carlink 还会用到低功耗蓝牙；Wi-Fi 直连可有可无。 | `nmcli device`；`btmgmt info` 中有 `le` | Carlink 时必需 |
| USB 主机接口（USB-A），内核提供 usbfs 和 TUN/TAP | 用数据线连接时，iPhone 插在中继的 USB-A 接口上；中继通过 usbfs 直接驱动它，并用一块 TAP 虚拟网卡承载 CarPlay 的网络连接。这种连接方式还没有在设备上验证。 | `ls /dev/bus/usb /dev/net/tun` | USB 连接时必需 |

中继本身占用的资源很少。2026 年 10 月 15 日，Rust 版 Linux 中继的第一个开发构建在 UFI003（382 MB 内存）上空闲运行、没有 CarPlay 会话时，中继约占 2.9 MB 常驻内存，输出进程另占约 1.5 MB；磁盘占用约 5 MB。0.1.6 还没有重新测量。

| 系统 | |
| --- | --- |
| Debian 11（bullseye）、12（bookworm）和 13（trixie） | `.deb` 在这三个版本上都经过测试 |
| UFI003 上的 OpenStick Debian 11（NetworkManager 1.30、BlueZ 5.55） | 正在使用 |
| 斐讯 N1 上的 Armbian trixie（NetworkManager 1.52、BlueZ 5.82） | 正在使用 |
| 树莓派 5 上的 Debian 13 | 开发者的参考设备，暂无设备支持包 |
| Ubuntu 和其他发行版 | 尚未测试 |

::: details 检查设备的命令 {#check}
通过 SSH 在设备上运行下面的命令。带 `sudo` 的命令需要 root 权限。

```sh
uname -m; dpkg --print-architecture; . /etc/os-release; echo "$ID $VERSION_ID"
ps -p 1 -o comm=
systemctl is-active NetworkManager bluetooth
nmcli --version
nmcli device
command -v nmcli iw sdptool hciconfig btmgmt
sudo iw list
sudo iw reg get
printf '' | sudo btmgmt --index 0 info
sudo modprobe rfcomm && lsmod | grep rfcomm
ls /dev/bus/usb /dev/net/tun
ss -ltnup | grep -E ':(6975|8443|7000|5353)\b'
```

| 命令 | 应看到 |
| --- | --- |
| `uname -m`、`dpkg --print-architecture` | `aarch64` 和 `arm64`；这一行后面的命令输出发行版和版本号 |
| `ps -p 1 -o comm=` | `systemd` |
| `systemctl is-active` | 两行 `active` |
| `nmcli device` | Wi-Fi 网卡（类型为 `wifi`）；名称不是 `wlan0` 时需要[主机配置](#host-profile) |
| `command -v` | 每个工具一行路径；少了哪一行，就是缺了哪个工具 |
| `iw list` | *Supported interface modes* 中有 `AP`；5 GHz 信道及其标记 |
| `iw reg get` | Wi-Fi 国家代码，它决定各信道的标记 |
| `btmgmt info` | *supported settings* 中有 `br/edr`；使用 Carlink 时还要有 `le` |
| `modprobe rfcomm` | 模块列表中出现 `rfcomm`；仅供参考 |
| `ls` | 两个路径都存在；只有用数据线连接 iPhone 时才需要 |
| `ss` | 没有输出，或者只有你可以停掉的程序 |

中继开自己的热点时，会依次尝试 5 GHz 的 36、40、44、48 和 149 至 165 信道。只有 `iw list` 没有标为 disabled、no IR 或 radar detection 的信道才能开热点；连接 5 GHz 网络时，信道只要不是 disabled 即可。没有合适的 5 GHz 信道时，中继使用 2.4 GHz 的 6 信道。

`btmgmt` 那一行前面的空 `printf` 不能省：输入是 `/dev/null` 时 `btmgmt` 会卡住。`--index 0` 表示第一个蓝牙适配器 `hci0`。

装好中继后，管理页面的“**诊断 → 本机能力**”会显示中继自己检测到的结果：RFCOMM；蓝牙 BR/EDR、LE 和 Secure Connections；每块网卡是否支持 AP 和客户端；能开热点的 5 GHz 信道；Wi-Fi 国家代码；以及缺少的工具。结果与上面的命令不一致时，以管理页面为准。
:::

## 安装中继 {#install .step}

在 [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases) 中选择最新的 `linux-v` 版本，现在是 `linux-v0.1.6`。下载 `.deb` 和 `SHA256SUMS`，核对 SHA-256，再连同依赖一起安装：

```sh
V=0.1.6
base=https://github.com/OpenXPlay/OpenXPlay-Relay/releases/download/linux-v$V
curl -fL -O "$base/openxplay-relay_${V}_arm64.deb" -O "$base/SHA256SUMS"
sha256sum --ignore-missing -c SHA256SUMS
sudo apt-get install --no-install-recommends ./openxplay-relay_${V}_arm64.deb
```

把 `V` 改成最新的版本号。预发布版在文件名中写作 `0.1.7-beta.1` 这样的形式，软件包内部的版本号则是 `0.1.7~beta.1`。

`apt-get` 会同时安装 `bluez`、`network-manager`、`iw`、`dnsmasq-base` 和 1.54 及以上版本的 `init-system-helpers`。这个软件包会：

- 把中继安装到 `/opt/openxplay`；
- 添加 systemd 服务 `openxplay-relay.service`，首次安装时启用并启动它；
- 添加更新命令 `/usr/sbin/openxplay-relay-update`；
- 添加两个 NetworkManager 配置文件：关闭 Wi-Fi 节能，扫描时不使用随机 MAC 地址；
- 添加时钟保护，它配合 systemd-timesyncd 工作，在使用 chrony 的系统上不做任何事。

卸载软件包时会保留 `/var/lib/openxplay`。

::: details 改用压缩包安装 {#tarball}
从同一个版本下载 `openxplay-relay-<版本>-linux-aarch64.tar.gz` 和 `SHA256SUMS` 并核对。压缩包不会安装任何依赖，请先装好 `bluez`、`network-manager`、`iw` 和 `dnsmasq-base`，然后运行：

```sh
tar -xzf openxplay-relay-$V-linux-aarch64.tar.gz
cd openxplay-relay-$V-linux-aarch64
sudo sh rust/packaging/install.sh bin/openxplay-relay bin/oxp-relay web admin
```
:::

::: details Wi-Fi 网卡不叫 wlan0？添加主机配置 {#host-profile}
中继会读取可选的主机配置文件 `/etc/openxplay/host.json`。它通常由设备支持包写入；其他设备可以自己编写。所有字段都可以省略：

| 字段 | 默认值 |
| --- | --- |
| `model` | 无 |
| `devicePreset` | `auto`：根据设备树识别 MSM8916 随身 Wi-Fi 和斐讯 N1，否则为 `generic` |
| `wifiInterface` | `wlan0` |
| `carlinkInterface` | 留空：自动选择另一块 Wi-Fi 网卡 |
| `hotspotChannel` | `0`：自动 |
| `bluetoothAdapter` | 编号最小的 `hciN` |
| `hotspotDownGapSeconds` | `15`（0 至 60）：热点关闭后，要等多久再开启下一个热点 |
| `secureConnections` | `pairing-off`：只在配对窗口开放时关闭蓝牙 Secure Connections；另一个值是 `untouched` |
| `bluetoothGuardStatus` | `/run/openxplay/bluetooth-guard.json` |

例如，Wi-Fi 网卡是 `wlan1` 时：

```sh
sudo mkdir -p /etc/openxplay
echo '{"wifiInterface": "wlan1"}' | sudo tee /etc/openxplay/host.json
sudo systemctl restart openxplay-relay
```

只要有一个字段无效，中继就会忽略整个文件，并在管理页面中显示错误。设置按下面的顺序生效，后者覆盖前者：内置默认值、主机配置、管理页面中的设置、命令行参数。
:::

## 打开管理页面 {#admin .step}

用与设备在同一网络中的手机或电脑打开 `https://<设备 IP>:6975`（在设备上运行 `hostname -I` 可以看到它的地址）。能解析 `.local` 名称时，也可以打开 `https://openxplay-admin.local:6975`；手机连接中继的热点时，打开 `https://openxplay-car.local:6975`。很多安卓手机和车机浏览器无法解析这类名称。浏览器会提示中继的自签名证书不受信任，继续访问即可。首次登录的密码是 `openxplay`，登录后请立即修改。

可选的**管理热点** `OpenXPlay-Admin` 默认关闭，需要第二块 Wi-Fi 网卡。在管理页面中开启后，连接这个热点并打开 `https://openxplay-admin.local:6975` 或 `https://10.79.0.1:6975`。

::: details 忘记了管理密码？ {#reset-password}
```sh
sudo systemctl stop openxplay-relay
sudo /opt/openxplay/bin/openxplay-relay --reset-admin-password
sudo systemctl start openxplay-relay
```

第二条命令把密码重置为 `openxplay` 后退出。
:::

## 添加 CarPlay 身份 {#identity .step}

安装包中绝不包含 Apple 配件（MFi）身份，需要你自己提供。在管理页面中打开“**设置 → 身份与证书**”，选择 `identity.pk8` 和 `certificate.p7b`，或者包含这两个文件的 ZIP。

也可以手动放入这两个文件：属主为 root、权限为 0600，然后重启中继：

```sh
sudo install -D -m 0600 -o root -g root -t /var/lib/openxplay/mfi identity.pk8 certificate.p7b
sudo systemctl restart openxplay-relay
```

没有这两个文件、但有其他认证来源时，可以在“**设置 → 身份与证书 → MFi 认证设备**”中改用远程 MFi 服务器，或通过 I2C、CH341 转接器连接的认证芯片。0.1.6 还没有在设备上验证这些方式。

## 完成设置向导 {#setup .step}

管理页面的设置向导会依次询问：

1. **你的车**。
2. **输出**：车机浏览器、车机的 Carlink 应用，或两者都用。Carlink 需要第二块 Wi-Fi 网卡，只有一块时只能选车机浏览器。特斯拉的浏览器需要专门适配，见[特斯拉](/tesla)。Linux 上没有[无线投屏](/wireless-display)和 [CarLife](/carlife) 输出。
3. **iPhone 连接**：“无线”（默认），或者“USB 数据线”：iPhone 用 USB-A 转 Lightning 或 USB-A 转 USB-C 数据线插在中继的 USB-A 接口上，车机仍通过 Wi-Fi 连接中继。
4. **网络**：“这台中继的热点”或“使用车机热点”。中继自己的热点名为 `OpenXPlay-Linux-XXXX`，密码为 `openxplay`（WPA2），除非你另行设置。
5. **完成准备**：按列出的事项逐项完成。

## 配对 iPhone {#pair .step}

首页提示配对 iPhone 时，点“配对”，配对窗口会开放 10 分钟。在 iPhone 上打开“设置 → 蓝牙”，选择 `OpenXPlay Linux`。

要换一部 iPhone，或者重新配对：在首页或“设置 → iPhone 连接”中移除旧的已配对设备，在 iPhone 的蓝牙设置里忽略 `OpenXPlay Linux`，再重新开放配对。

## 在车机上打开 CarPlay {#head-unit .step}

车机连接中继的热点，在浏览器中打开 `https://10.77.0.1:8443/`。中继使用第一个空闲的 `10.77.x.1` 地址，管理页面会列出车机要打开的地址；选择“使用车机热点”时，请打开管理页面列出的地址。第一次打开时接受证书警告，原因见[故障排查](/troubleshooting#certificate-warning)。

使用 Carlink 应用时，见 [Carlink 应用](/carlink)。

## 更新中继 {#update}

管理页面的“**关于 → 检查更新**”会显示有没有新版本；想同时看到预发布版，请选择“测试版”渠道。像[安装中继](#install)时一样下载新版本的 `.deb` 和 `SHA256SUMS` 并核对，然后运行：

```sh
sudo openxplay-relay-update openxplay-relay_${V}_arm64.deb
```

更新命令会安装新版本，等中继启动后再观察 15 秒，确认它没有退出或重启；新版本起不来时，它会自动装回上一个版本。设置、配对和身份文件保存在 `/var/lib/openxplay`，更新时保持不变。

| 命令 | 作用 |
| --- | --- |
| `sudo openxplay-relay-update --list` | 列出缓存的版本 |
| `sudo openxplay-relay-update --rollback` | 装回缓存中比当前版本旧的最新版本 |

用更新命令装过的版本缓存在 `/var/cache/openxplay/relay`，最多保留 3 个。只有当前版本也在缓存中时才能回退，用 `apt-get` 装的第一个版本不在其中。

## 日志与卸载 {#uninstall}

查看中继本次开机以来的日志，或者实时跟踪：

```sh
journalctl -u openxplay-relay -b
journalctl -u openxplay-relay -f
```

向别人反馈问题时，可以在管理页面的“**日志**”中导出日志文件。

卸载中继：

```sh
sudo apt-get purge openxplay-relay
```

`/var/lib/openxplay` 中的设置、配对、密钥和身份文件会保留；不再需要时，用 `sudo rm -rf /var/lib/openxplay` 删除。

## 不支持的设备和系统 {#not-supported}

| 设备或系统 | 原因 |
| --- | --- |
| OpenWrt，以及其他没有 systemd 或 NetworkManager 的系统 | 中继两者都需要 |
| 32 位 ARM（armv7）、x86 和 RISC-V 设备 | 没有对应的构建 |
| 只支持低功耗蓝牙（LE）的蓝牙适配器 | 无线 CarPlay 需要经典蓝牙（RFCOMM）；用数据线连接时不需要蓝牙，但这种方式还没有在设备上验证 |
| ESP32 等单片机 | 无法运行 Linux |

## 接下来 {#next-steps}

- [日常使用与设置](/daily-use)：每次上车怎么连接，以及车机网页的各项设置。
- [可信 HTTPS](/trusted-https)：用免费域名去掉证书警告。
- 遇到问题？请看[故障排查](/troubleshooting)，也欢迎到[交流群](/community)分享你的设备运行情况。
