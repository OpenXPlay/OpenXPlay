---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 刷入 UFI003 基础镜像（OpenStick Debian 11）
description: UFI003 运行 OpenXPlay Linux 中继所需的 OpenStick v1 基础镜像：下载地址、SHA-256 校验值、刷机前的注意事项，以及已运行 OpenStick 时的重刷命令。
breadcrumb: 刷入 UFI003 基础镜像
prev:
  text: UFI003 作中继
  link: /ufi003-relay
next:
  text: 继续：获取中继
  link: /ufi003-relay#step-get
---

# 刷入 UFI003 基础镜像

UFI003 使用 OpenStick 的 [v1 版本](https://github.com/OpenStick/OpenStick/releases/tag/v1)（2022-02-08 发布），系统为 Debian 11。本页是[手动安装](/ufi003-relay#manual)的第一步，刷好后回到 [UFI003 作中继](/ufi003-relay#step-get)继续安装中继。推荐的安装方式是 [OpenXPlay Flasher](/ufi003-relay#flasher)，它的安装功能即将推出。

::: danger 刷机前请注意
- 刷机包会覆盖原机的分区表和引导程序，之后无法再运行原厂安卓系统，OpenStick 也不提供恢复方法。
- 第一次刷机前先做整机备份，至少保留 `modemst1`、`modemst2`、`fsc`、`fsg` 四个分区：它们存有这台设备独有的基带校准数据，丢失后无法从别处找回。
- 重刷会清空设备上的所有数据，包括你放入的 CarPlay 身份、iPhone 配对记录和 Wi-Fi 设置。
:::

## 下载并校验文件 {#downloads}

OpenStick 禁止商用，OpenXPlay 不转发这些文件；请从 OpenStick 的发布页下载，并核对 SHA-256（macOS 用 `shasum -a 256 文件名`，Linux 用 `sha256sum 文件名`）：

| 文件 | 用途 |
| --- | --- |
| [`debian.zip`](https://github.com/OpenStick/OpenStick/releases/download/v1/debian.zip)（约 377 MB） | Debian 11 根文件系统 `rootfs.img`，另带一份 `boot.img` |
| [`boot-ufi001c.img`](https://github.com/OpenStick/OpenStick/releases/download/v1/boot-ufi001c.img) | 内核引导分区，UFI003 用这一个；与 `debian.zip` 中的 `boot.img` 完全相同 |
| [`base-generic.zip`](https://github.com/OpenStick/OpenStick/releases/download/v1/base-generic.zip) | 引导程序等底层分区和刷机脚本，只在第一次从原厂系统刷机时需要 |

::: details SHA-256 校验值 {#checksums}
| 文件 | SHA-256 |
| --- | --- |
| `debian.zip` | `8be6f100e8fc3f612e0b03c199d01f51d38b953a19343ad0f4cf7a2f7a57f603` |
| `boot-ufi001c.img` | `a2b527e98a5cee0a4c3cad5099af7ce0648246f19d20d13ef2c168e400c81b33` |
| `base-generic.zip` | `b609b91c94b07d7cde4141a578df5c1440fbe75140f0c645c7124356774e2418` |
:::

发布页上的其他 `boot-*.img` 和 `firmware-*.zip` 属于其他型号，UFI003 用不到。

## 第一次从原厂系统刷机 {#first-flash}

第一次刷机需要 `base-generic.zip` 中的引导程序和刷机脚本 `flash.sh`。**不要直接运行这个脚本**，原因如下；请逐条执行其中的命令，确认四个分区都已从你的设备取回、文件确实被替换后再继续。

::: details 为什么不能直接运行 flash.sh？ {#flash-script}
`flash.sh` 先擦除引导分区、换上新的引导程序，然后才把 `modemst1`、`modemst2`、`fsc`、`fsg` 四个分区备份成同名的 `.bin` 文件，最后再写回设备。压缩包里本来就带着这四个 `.bin` 文件，其中三个有实际内容，但不是你这台设备的数据；脚本不会因为某一步失败而停下，备份失败时，写回设备的就是压缩包里的这几个文件。
:::

## 已运行 OpenStick 时重刷 {#reflash}

已经运行 OpenStick 的 UFI003 重刷时，只需要写入根文件系统和引导分区。解压 `debian.zip`，在其中的 `debian` 目录里执行下面的命令，后三行与目录中的 `flash.sh` 相同：

```sh
adb reboot bootloader
fastboot -S 200M flash rootfs rootfs.img
fastboot flash boot boot.img
fastboot reboot
```

::: warning 写入 rootfs.img 时要加 -S 200M
用 fastboot 写入 `rootfs.img` 时加上 `-S 200M`（`debian.zip` 自带的 `flash.sh` 已经这样做）。按默认的约 256 MB 分块传输，UFI003 会在中途失败。
:::
