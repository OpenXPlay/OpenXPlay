---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-05
title: Privacy policy
description: Privacy and security of the OpenXPlay relay — no account, no tracking; CarPlay travels only between your iPhone, the relay and the head unit; the Android app's logs leave the phone only when you upload them. For the iPhone app, see openxplay.com.
breadcrumb: Privacy
---

# Privacy policy

This policy covers the relay solution published by OpenXPlay.org: the OpenXPlay Relay Android app, the Linux relay and this website. Last updated: 13 November 2026.

::: tip iPhone direct connection
The OpenXPlay iPhone app, which connects to the head unit without a relay, has its own [privacy policy on openxplay.com](https://openxplay.com/privacy).
:::

## In short {#summary}

- OpenXPlay has no account, no advertising, no analytics and no tracking.
- CarPlay's video, audio and touch travel only between your iPhone, the relay and the head unit. They never pass through our servers.
- The Android app's logs stay on the relay phone unless you choose to upload them. Uploaded logs are deleted within 30 days.

## What stays on the relay {#on-device}

- **CarPlay.** The relay serves the receiver page and its admin page itself. Video, audio and touch travel between the iPhone, the relay and the head unit over Bluetooth, Wi-Fi or USB.
- **Settings.** Your settings, the iPhone pairing and the head units the relay trusts are stored on the relay.
- **Vehicle information.** Information Carlink head units report about the car is collected only when you turn it on, and stays on the relay.
- **Plugins.** Plugins are off by default and run offline in the head-unit browser.
- **Logs.** The Android app keeps about the last 24 hours of its own logs on the phone. Before anything is stored, passwords, keys, phone numbers, names, messages and precise location are replaced. Technical details such as the phone model, system version, Bluetooth and Wi-Fi addresses, IP addresses and Wi-Fi names are kept, because they are needed to find connection problems.

## When data leaves the relay {#sent}

- **Uploading logs (Android app).** An upload happens only after you agree to the notice in Settings › Logs. The log goes to `logs.openxplay.org`, run by OpenXPlay.org, and is used only to diagnose problems. Uploads pass through Cloudflare, which forwards them without storing them, to a server that may be in an AWS data center in the United States. Uploads from one app are linked by a random ID that is not derived from your iPhone, car or phone hardware. Uploaded logs cannot be downloaded publicly and are permanently deleted after at most 30 days; to have one deleted sooner, send its log ID to [support@openxplay.org](mailto:support@openxplay.org). If you prefer, save the file instead and send it privately.
- **Trusted HTTPS.** If you set up a trusted name for head-unit browsers, the relay sends its address to the dynamic DNS provider you chose (DuckDNS or dynv6), using your token, and requests a certificate from Let's Encrypt. The name and the private address it points to become public; see [Trusted HTTPS › Privacy](/trusted-https#privacy). These services' own privacy policies apply.
- **Checking for updates.** The relay asks GitHub for the list of OpenXPlay Relay releases. GitHub sees the public address of the relay's internet connection.

We do not sell or share data with anyone.

## Security {#security}

The admin page uses HTTPS and needs the admin password. The login page shows the first-use password; change it after you sign in. The admin page reminds you while the default password is still in use.

## This website {#website}

openxplay.org has no analytics, and its [check page](/check) runs only in your browser.

## Children {#children}

OpenXPlay is not directed at children and does not knowingly collect data from them.

## Changes and contact {#contact}

If this policy changes, the new version is published on this page with a new date. Questions or requests about your data: [support@openxplay.org](mailto:support@openxplay.org).
