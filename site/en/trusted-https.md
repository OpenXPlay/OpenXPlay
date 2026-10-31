---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-20
title: Trusted HTTPS with a free domain name
description: Use a free DuckDNS or dynv6 name and a Let’s Encrypt certificate so the head unit’s browser opens the OpenXPlay relay page without a certificate warning. Covers registration, setting up the Android and Linux relays, status messages, privacy and troubleshooting.
breadcrumb: Trusted HTTPS
schema: howto
howtoName: Turn on trusted HTTPS for an OpenXPlay relay with a free domain name
howtoTools:
  - A free domain name from DuckDNS or dynv6
  - OpenXPlay Relay with Trusted HTTPS (Android app or Linux relay)
  - Internet access on the relay (mobile data on the Android relay)
---

# Trusted HTTPS

Open the head-unit page without a certificate warning, using a free domain name. The relay publishes its address under your free name and gets a Let’s Encrypt certificate for that name; when the head unit’s browser opens the page by the name, the certificate checks out. Nothing is installed or changed on the head unit.

::: info Supported versions
It needs Android app 0.1.5 or later ([download the latest version](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk)), or Linux relay 0.1.5-beta.2 or later (choose the newest `linux-v` release in [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases)).
:::

## How it works {#how-it-works}

A browser trusts a certificate only when a public certificate authority signed it and the name on it matches the address bar. The relay’s own certificate isn’t signed by a public authority, and an IP address gives the browser no name to check, so the browser warns (see [Certificate warning](/en/troubleshooting#certificate-warning)). With Trusted HTTPS on, the relay does three things by itself:

- **Publishes its address:** it points your name at the relay’s private address on the head unit’s network, such as `192.168.43.20`, and updates it when the address changes, for example after the Android hotspot restarts.
- **Gets a certificate:** through your provider’s API it adds a temporary record under the name, which proves to Let’s Encrypt that you control the name, and receives a certificate. It renews the certificate before it expires.
- **Serves the page:** when the head unit’s browser opens `https://<your name>:8443/`, the relay presents that certificate.

The check runs between the relay, your provider and Let’s Encrypt only: nothing on the internet connects to the relay, and its page still opens only on the head unit’s network. The feature is off by default; while it is off, the relay works exactly as before.

## What you need {#requirements}

| You need | Details |
| --- | --- |
| A free domain name | From DuckDNS or dynv6; see step 1. Keep the full name and the token. |
| A relay with Trusted HTTPS | The Android app 0.1.5 or later, or the Linux relay 0.1.5-beta.2 or later. |
| Internet access on the relay | To publish the address and to get and renew certificates. The Android relay needs mobile data. |

::: details Why mobile data on the Android relay? {#why-mobile-data}
The head unit has to look the name up before it can open the page. On the relay phone’s hotspot, it asks the relay phone, which can answer only with internet access. On the head unit’s own hotspot or a shared Wi-Fi, that network does the lookup and needs internet access itself. The Linux relay on its own hotspot is the exception: it answers the name inside the hotspot, so the head unit finds it even without internet access. The relay also needs internet access to publish its address, which on Android can change every time the hotspot starts.
:::

::: details How often does it need internet access? {#how-often-online}
Certificates expire: Let’s Encrypt certificates last a few months at most, and their lifetime is getting shorter. The relay renews them in good time, but only while it is online, so let it reach the internet at least every few weeks. Once a certificate has expired, the browser warns again; the IP address keeps working as before.
:::

## Register a free name {#register .step}

Register a new name just for the relay. The relay overwrites the name’s address, so don’t use a name you already use for something else, such as reaching devices at home from outside. Give each relay a name of its own, or they overwrite each other’s address. The name becomes public, so choose one that doesn’t identify you; see [Privacy](#privacy).

Both providers are free and the relay supports both: {#choose-provider}

| Provider | Example name | Sign-up | What the token can change |
| --- | --- | --- | --- |
| DuckDNS | `myrelay.duckdns.org` | Sign in with GitHub, Google, Reddit or X (Twitter); no separate password | Every name in the account |
| dynv6 | `myrelay.dynv6.net` | Email and password | The whole account, or one zone (name) |

Our suggestion: with a GitHub account, choose DuckDNS, which takes the fewest steps; without one, choose dynv6, which needs only an email address and whose token can be limited to this one name.

::: details DuckDNS: how to register {#duckdns}
1. Sign in to DuckDNS with GitHub. In a browser on your computer or phone, open [duckdns.org](https://www.duckdns.org/) and choose GitHub; Google, Reddit and X are offered too, but usually don’t work from mainland China.
2. Add a name. Type a name such as `myrelay` into the field that ends in `.duckdns.org` and add it. `myrelay.duckdns.org` then appears in the list. Ignore the address it points to; the relay updates it.
3. Find the token near the top of the page. It looks like `a1b2c3d4-0000-0000-0000-000000000000`, and it is the token you enter on the relay.

**What to save:** the full name, such as `myrelay.duckdns.org` (not just `myrelay`), and the token. A DuckDNS token can change every name in the account, so keep it like a password; see [Keeping the token safe](#token-safety).
:::

::: details dynv6: how to register {#dynv6}
1. Create a dynv6 account. On [dynv6.com](https://dynv6.com/), choose *Sign up*, enter your email and a password (at least 8 characters), then open the link in the confirmation email.
2. Create a zone (dynv6’s word for a name). Once signed in, type a name and choose the `dynv6.net` suffix, for example `myrelay.dynv6.net`. Don’t choose another suffix; the next item explains why.
3. Get an HTTP token. Open the Keys page ([dynv6.com/keys](https://dynv6.com/keys)) and create or copy an HTTP token; limit it to this zone if you can.

OpenXPlay is still testing whether dynv6 accepts private addresses.

**What to save:** the full name, such as `myrelay.dynv6.net`, and the HTTP token.
:::

::: details Why dynv6.net on dynv6? {#why-dynv6-net}
dynv6 offers other suffixes too, but only `dynv6.net` is on the Public Suffix List. Let’s Encrypt counts its weekly certificate limit by that list: under `dynv6.net` your name is counted on its own; under another suffix it shares one limit with every user of that suffix, and requests fail easily.
:::

::: details Does it work from mainland China? {#in-mainland-china}
Tested on 2026-10-20: on DuckDNS, the API and the names work on home broadband and on China Unicom mobile data, and of the sign-in options only GitHub is practical; on dynv6, the API is reachable in the same test, and you choose the `dynv6.net` suffix when you register.
:::

::: details Keeping the token safe {#token-safety}
The token works like a password for the name: anyone who has it can point your name somewhere else.

- Keep the token in a password manager. Don’t post it in a chat, and don’t share screenshots of the settings or the configuration file.
- The token stays on the relay. Once entered, the app and the admin page show only *Token saved*, never the token itself.
- After importing a configuration file, delete the file from the phone.

If the token leaks, get a new one from your provider and enter it on the relay (or import the configuration file again):

| Provider | How to replace the token |
| --- | --- |
| DuckDNS | On the account page, select the three small lines next to your login email, then *recreate token*. The new token covers every name in the account. |
| dynv6 | On the Keys page, delete the old HTTP token and create a new one. |
:::

## Set it up on the relay {#setup .step}

Pick one way for your relay; they all do the same. Let’s Encrypt issues the certificate for free, and asks you to agree to its [Subscriber Agreement](https://letsencrypt.org/repository/) first: the relay never agrees for you, and requests no certificate until you do. The relay creates its Let’s Encrypt account without an email address or any other contact details. {#letsencrypt-terms}

::: details Android relay: in the app {#android-settings}
1. Open OpenXPlay Relay and go to Settings → Head-unit access → Trusted HTTPS.
2. Turn on *Use a free domain name*.
3. Under *DNS provider*, choose DuckDNS or dynv6. The page shows how to register with that provider, with links to its site and to this guide. Each provider keeps its own name and token; switching shows what is saved for it.
4. Under *Domain name*, enter the full name. Use `myrelay.duckdns.org`, for example, not just `myrelay`.
5. Paste the provider’s token under *Token*. Once saved, the field shows only *Token saved*; leaving it empty later keeps the saved token.
6. Tick *I agree to the Let’s Encrypt Subscriber Agreement*.
7. Tap *Save*. The status line shows *Updating the domain’s address…*, then *Requesting a certificate…*, and finally *Ready: … (certificate valid until …)*.
:::

::: details Android relay: import a configuration file {#android-import}
If you’d rather not type a long token on the phone, write a configuration file on a computer and import it.

1. Write the file on a computer. In a text editor, create a file such as `public-name.json`, fill it in as described in [Configuration file format](#config-file) and save it as plain UTF-8 text.
2. Copy the file to the relay phone over a USB cable, for example into the Download folder, or create it on the phone with a text editor app. The file contains the token, so avoid sending it through chat apps or cloud storage.
3. In Settings → Head-unit access → Trusted HTTPS, tap *Import configuration file* at the bottom of the provider card and choose the file in the file picker.
4. After a successful import, the app shows only the provider and the name, switches to the file’s provider, and the settings take effect right away. If the file has a mistake, the app says which entry is wrong.
5. Delete the file from the phone.

Unless the file says `"enabled": false`, importing it turns on *Use a free domain name*.
:::

::: details Linux relay: in the admin page {#linux-admin}
1. Open the admin page and log in. Use a phone or computer on the relay’s network, for example with `https://openxplay-linux.local:6975`.
2. Open *Settings* and find *Trusted HTTPS*.
3. Turn on *Use a free domain name*, choose the *DNS provider*, enter the *Domain name* and the *Token*, and tick *I agree to the Let’s Encrypt Subscriber Agreement*. Each field is saved on its own, and the page shows *Saved*.
4. Once the status line shows *Ready: … (certificate valid until …)*, open the page on the head unit. *Request certificate now* tries again straight away when needed.

The token isn’t shown again once saved; leaving the field empty later keeps the saved token.
:::

::: details Linux relay: edit the configuration file {#linux-file}
The admin page stores these settings in `/var/lib/openxplay/public-name.json`. You can also write that file yourself, in the [configuration file format](#config-file):

1. Write the file on a computer and copy it to the relay. For example, copy it to `/root/public-name.json`.
2. As root, put it into the relay’s state directory, readable and writable by root only (mode 0600), then delete the copy:

   ```sh
   install -o root -g root -m 0600 /root/public-name.json /var/lib/openxplay/public-name.json
   rm /root/public-name.json
   ```

3. The relay checks the file every few seconds and reads it again after a change, with no restart. Then check the status in the admin page.

This file is separate from `settings.json`; don’t put these settings into `settings.json`.
:::

::: details Configuration file format {#config-file}
The file the Android relay imports and the Linux relay’s `/var/lib/openxplay/public-name.json` share one format, a JSON object:

| Key | Required | Meaning |
| --- | --- | --- |
| `version` | Yes | Always `1`. |
| `enabled` | No | `true` turns it on (the default), `false` turns it off. |
| `provider` | Yes | `duckdns` or `dynv6`. |
| `name` | Yes | The full name, without a trailing dot, in any letter case. For DuckDNS it must be `<name>.duckdns.org`; for dynv6, the name the token manages, normally `<name>.dynv6.net`. |
| `token` | Yes | The provider’s token, without spaces. A DuckDNS token looks like `a1b2c3d4-0000-0000-0000-000000000000`. |
| `agreeLetsEncryptTerms` | Yes | `true` means you agree to the Let’s Encrypt Subscriber Agreement. Without it, the relay requests no certificate. |
| `acme` | No | `production` (the default). `staging` is for testing only: its certificates aren’t trusted by browsers. |

- Keys that aren’t in the table are an error that names the key, so a typo can’t slip through.
- The file can be at most 16 KiB.

One example per provider; replace the name and the token with yours:

```json
{
  "version": 1,
  "enabled": true,
  "provider": "duckdns",
  "name": "myrelay.duckdns.org",
  "token": "a1b2c3d4-0000-0000-0000-000000000000",
  "agreeLetsEncryptTerms": true
}
```

```json
{
  "version": 1,
  "enabled": true,
  "provider": "dynv6",
  "name": "myrelay.dynv6.net",
  "token": "your-dynv6-token",
  "agreeLetsEncryptTerms": true
}
```
:::

## Open it on the head unit {#open .step}

1. Wait until the status line shows *Ready: … (certificate valid until …)*. The first certificate usually takes a minute or two.
2. Open the page by the name in the head unit’s browser. The address is `https://` followed by your name and `:8443/`, for example `https://myrelay.duckdns.org:8443/`. Once it is ready, the relay lists this address first among the head-unit addresses.
3. The page opens straight away, without a certificate warning. Bookmark it in place of the old bookmark with the IP address.

The IP address (such as `https://192.168.43.20:8443/`) keeps working as a fallback. It still shows a certificate warning, which may now say that the certificate belongs to another name; that’s expected.

- On the Linux relay, the head-unit page switches to a new certificate only while no CarPlay session is running. If the certificate arrives while CarPlay runs, open the page again after CarPlay ends.
- The admin page uses the same certificate: replace the IP address or `openxplay-linux.local` in its address with your name, and it opens without a warning too.

## Status messages {#status}

The status line in the app and the admin page shows one of these:

| Status | Meaning | What to do |
| --- | --- | --- |
| *Off* | *Use a free domain name* is off. | Turn it on when you want it. |
| *Fill in the provider, domain name and token, and agree to the terms.* | Something is missing, or the agreement isn’t ticked. | Complete the settings. |
| *Waiting for internet access* | The relay has no internet access. The Linux relay also shows this while its clock isn’t synchronised yet. | On the Android relay, turn on mobile data; on the Linux relay, connect a network with internet access. Once online (and the clock is synchronised), the relay retries by itself. |
| *Updating the domain’s address…* | The relay is publishing its address under the name. | Wait. |
| *Requesting a certificate…* | The relay is asking Let’s Encrypt for a certificate. | Wait; it usually takes a minute or two. |
| *Ready: … (certificate valid until …)* | The certificate is valid and the name points at the relay’s current address. | Open the head-unit page by the name. |
| *Problem: …. Next try at ….* | Something went wrong. The reason follows the colon, then the time of the next automatic try. | See “Reasons for a problem” below. |

::: details Reasons for a problem {#status-reasons}
| Reason | What it means and what to do |
| --- | --- |
| *The provider rejected the token* | The token is wrong or no longer valid; see [The provider rejects the token](#token-rejected). |
| *The provider doesn’t know this domain name* | The name is misspelt, or it isn’t in this account at the chosen provider. Enter the full name, such as `myrelay.duckdns.org`, and check the *DNS provider*. |
| *The provider asked to wait* | Too many requests. Nothing to do; the relay tries again at the time shown. |
| *Can’t reach the provider* | The relay is offline or can’t reach the provider. Check the relay’s internet access; if the provider is down for a while, the relay keeps trying. |
| *The provider’s name servers didn’t show the change in time* | The check record didn’t reach the provider’s name servers in time, usually because the provider was slow for a moment. The relay tries again by itself, or choose *Request certificate now* later. |
| *Let’s Encrypt rejected the request: …* | Let’s Encrypt’s reason follows the colon. Check the name and the token; if it keeps happening, post the message in the [community](/en/community). |
| *Let’s Encrypt asked to wait* | A Let’s Encrypt limit was reached. Wait until the time shown; see [Asked to wait](#rate-limits). |
| *No head-unit network address yet* | The relay isn’t on the head unit’s network yet, so it has no address to publish. Connect the head unit’s network as in the guide’s [Connect the head unit’s network](/en/android-relay#step-network). |

After a network or provider problem, the relay tries again at growing intervals: 1 minute, 5 minutes, 30 minutes, 2 hours, 6 hours, then once a day. A new relay address or a settings change starts again at 1 minute. To try again right away, choose *Request certificate now*.
:::

## Troubleshooting {#troubleshooting}

::: details The page doesn’t open by the name {#name-not-resolving}
First check that the status line shows *Ready*, and that the address starts with `https://` and includes `:8443`. Then:

- **The relay has no internet access.** On the Android relay’s hotspot, the head unit looks the name up through the relay phone. Turn on the relay phone’s mobile data; until then, open the page by its IP address. The Linux relay on its own hotspot answers the name itself and needs no internet access for this.
- **The address has just changed.** After the hotspot restarts, the address may change and the relay has to publish the new one first. Wait until the status line shows *Ready* again, give it a moment, then reload the head-unit page.
- **The router blocks private addresses.** On a shared Wi-Fi, some routers have DNS rebinding protection turned on, which drops answers that point at private addresses. Add an exception for your name in the router, or turn the protection off; otherwise use the IP address.
- **DNS filtering.** A filtering DNS service or an ad blocker on the relay phone or the head unit can drop these answers too. Try another DNS, or turn the filter off for a moment.
:::

::: details The provider rejects the token {#token-rejected}
- Copy the token again, without extra spaces or missing characters.
- Check that the token and the name belong to the same account and that the *DNS provider* is right.
- DuckDNS: after you recreate the token, the old one stops working; enter the new one.
- dynv6: if the token is limited to a zone, check that it is this name’s zone.
:::

::: details Asked to wait {#rate-limits}
Both your provider and Let’s Encrypt limit how often they can be asked. When the status shows *The provider asked to wait* or *Let’s Encrypt asked to wait*, do nothing: the relay tries again at the time shown.

- Let’s Encrypt issues at most 5 certificates for the same name every 7 days, and allows at most 5 failed checks for a name per hour (the rules in October 2026). Renewals at the time Let’s Encrypt suggests don’t count against these limits.
- Don’t keep choosing *Remove* and setting it up again. Removing deletes the certificate, so every new setup needs a new certificate, and the limit runs out quickly.
- The relay limits itself too: at most 3 new certificates per name every 24 hours, and none while the current certificate has more than 7 days left and isn’t due for renewal.
:::

::: details The name still shows a certificate warning {#still-warning}
- Check that the address uses the name, not the IP address.
- Check that the status line shows *Ready*. On the Linux relay, the head-unit page switches to a new certificate only while no CarPlay session is running.
- Check the head unit’s date and time. If they are far off, the browser thinks the certificate isn’t valid yet or has expired.
- A very old head-unit system or browser may not trust Let’s Encrypt certificates; then keep using the IP address.
:::

## Privacy {#privacy}

- **The name becomes public.** Every certificate Let’s Encrypt issues is recorded in public Certificate Transparency logs, where anyone can find your name.
- **So does the private address.** Anyone who looks the name up sees the address the relay published, such as `192.168.43.20`. It belongs to the head unit’s network and can’t be reached from the internet, but anyone can see it.
- **Choose a name that doesn’t identify you.** Avoid your name, number plate or phone number; a random string of letters and digits such as `k7m2q9x4.duckdns.org` is best.
- **Your provider knows your account.** DuckDNS knows the GitHub (or other) account you sign in with; dynv6 knows your email address. When the relay updates the address or requests a certificate, the provider and Let’s Encrypt see the public address of the relay’s internet connection.
- **The token stays on the relay;** see [Keeping the token safe](#token-safety).

## Turning it off or removing it {#turn-off}

- **Turn off:** with *Use a free domain name* off, the relay stops all requests and serves only its own certificate, so the head unit’s browser warns again. On the Linux relay, `"enabled": false` in the configuration file does the same.
- **Remove:** *Remove* in the Android app or in the Linux relay’s admin page (after you confirm) deletes the settings, the token, the certificate and its keys. On the Linux relay, deleting `/var/lib/openxplay/public-name.json` does the same.
- Neither changes the name at your provider: it keeps pointing at the last published address. If you no longer need it, delete it on the provider’s website.
