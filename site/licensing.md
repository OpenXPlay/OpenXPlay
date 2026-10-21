---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 许可证与商业豁免
description: OpenXPlay 各仓库的许可证：Stream 和 Relay 采用 AGPL-3.0 并可申请商业豁免，GPL 派生部分，OpenXPlay-Hardware 开源但禁止商用，插件采用 Apache-2.0 OR MIT；以及商标和本网站的许可。
breadcrumb: 许可证
---

# 许可证

OpenXPlay-Stream 和 OpenXPlay-Relay 以 AGPL-3.0 开源，无法使用 AGPL-3.0 的组织可以发邮件到 [support@openxplay.org](mailto:support@openxplay.org) 申请豁免；设备支持文件（OpenXPlay-Hardware）沿用 OpenStick 的条款，开源但禁止商用。

## 各部分的许可证 {#licenses}

- **AGPL-3.0-only。** OpenXPlay-Stream 和 OpenXPlay-Relay 采用 GNU Affero General Public License v3.0，仅限第 3 版。
- **署名要求。** OpenXPlay-Stream 和 OpenXPlay-Relay 适用依据 AGPL-3.0 第 7 条设定的附加条款：修改版本必须在相应的法律声明中，以及用户界面中任何显著的“关于”、法律、页脚或署名位置，保留署名声明“Powered by OpenXPlay.”，并附上指向原项目的可见链接。详见两者的 NOTICE 文件。
- **网络使用。** 中继的构建产物包含 OpenXPlay-Stream，因此中继会向所有通过网络使用它的人提供源代码，包括通过车机浏览器使用的人。
- **GPL 派生部分。** CarPlay 协议 crate `rust/carplay-iap2`、`rust/carplay-airplay` 以及 `rust/direlay-linux/src/network/` 中的少量文件派生自 DiPlay 和 xcertplay，仍为 GPL-3.0-only；GPLv3 第 13 条允许将它们与 AGPL 项目组合。OpenXPlay-DiPlay 为 GPL-3.0。
- **OpenXPlay-Hardware：开源，禁止商用。** 设备支持文件沿用 [OpenStick](https://github.com/OpenStick/OpenStick) 的条款，采用 OpenXPlay-Hardware License：分发它或其衍生品时，必须以同一许可证公开完整源代码；禁止商用，包括售卖包含它的系统镜像、安装包或它们的衍生品，收费发布构建产物，以及批量售卖装有它的设备。其中取自或构建自 Linux 内核的文件仍为 GPL-2.0-only。
- **插件。** OpenXPlay-Web-Plugins 采用 Apache-2.0 OR MIT，由你任选其一。部分插件素材另有许可证，见[插件](/developers#plugins)。
- **不含 Apple 身份。** 各仓库及其构建产物都不包含 Apple 配件（MFi）身份；要正常使用，需要由用户自行提供。

## 商业豁免 {#exemptions}

如果贵组织的政策不允许使用 AGPL-3.0 软件，或你希望免于履行 AGPL-3.0 的开源义务，请联系 [support@openxplay.org](mailto:support@openxplay.org)。豁免范围为 OpenXPlay-Stream 和 OpenXPlay-Relay 中 OpenXPlay 拥有的代码；派生自 DiPlay 和 xcertplay 的部分仍受 GPL-3.0 约束。OpenXPlay-Hardware 不提供豁免。

## 商标 {#trademarks}

CarPlay 和 iPhone 是 Apple Inc. 的商标。OpenXPlay 为独立项目，与 Apple 及相关车机、盒子厂商不存在隶属、认可或认证关系。第三方代码、依赖及素材遵循各自的许可证，详见各仓库中的许可证和声明文件。

## 关于本网站 {#website}

本网站的代码采用 MIT 许可，文字内容采用 CC BY 4.0 许可。取自 OpenXPlay 仓库的图片沿用其原有条款。网站源码位于 [OpenXPlay](https://github.com/OpenXPlay/OpenXPlay/tree/main/site) 仓库的 `site` 目录。
