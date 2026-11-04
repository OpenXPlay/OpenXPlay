---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-10-21
title: 'Troubleshooting: certificate warnings, connection, picture and sound'
description: Fixes for common OpenXPlay problems — the certificate warning, head units that only see 2.4 GHz Wi-Fi, iPhone Bluetooth pairing, CarPlay not connecting, unsupported browsers, stuttering video, no sound and the microphone.
breadcrumb: Troubleshooting
schema: faq
---

# Troubleshooting

Most problems come down to the head unit’s browser, the Wi-Fi band or Bluetooth pairing. Find your problem by what you see; if it isn’t answered, ask the [community](/en/community) and include the head unit model, its system version, the route you used and what happened.

## Certificates {#certificates}

### Why does the browser show a certificate warning? {#certificate-warning}

The relay serves the receiver page over HTTPS because browsers allow WebCodecs video decoding only on secure pages. The relay creates its own certificate, which no public authority has signed, so the browser shows a warning the first time.

- **Is it safe?** The connection is still encrypted. The warning means the browser can’t verify who issued the certificate. Check that the address is your relay’s, then continue (the option is often under *Advanced*).
- **Why did it come back?** The relay made a new certificate. The Android relay does this when its network addresses change; the Linux relay does it when it replaces certificate files that were created while the device clock was wrong.
- **Can I avoid it?** Yes, with a free domain name: the relay gets a trusted certificate for it, and the page opens by that name without a warning. See [Trusted HTTPS](/en/trusted-https). On the Android relay you can also import your own certificate (a PKCS #12 `.p12` file) in the app.

## Connection {#connection}

### My head unit only sees 2.4 GHz Wi-Fi networks {#only-2-4-ghz}

Use a 2.4 GHz network for the head unit:

- The UFI003 dongle’s Wi-Fi has no 5 GHz band, so its hotspot is always 2.4 GHz.
- With *This phone’s hotspot* on the Android relay, the app can’t change Android’s hotspot settings: set the band to 2.4 GHz in Android’s hotspot settings, then choose 2.4 GHz for *Hotspot band* under Settings → iPhone connection → Network in the app too.
- With *Use the car’s hotspot*, the network must offer 2.4 GHz. The UFI003 only sees 2.4 GHz networks anyway.

The UFI003 has a single Wi-Fi radio, so it offers the head unit’s browser only, not [Carlink](/en/carlink).

### The iPhone doesn’t pair over Bluetooth {#bluetooth-pairing}

Pair only while the relay is ready for it:

- On the Linux relay, tap *Pair* when the admin page’s Home asks you to pair the iPhone. Pairing stays open for 10 minutes. On the iPhone, open Settings → Bluetooth and choose `OpenXPlay Linux`.
- On the Android relay, allow the “Nearby devices” permission for OpenXPlay Relay, and tap Allow on the relay phone when it asks to become visible to your iPhone.
- If the iPhone forgot the relay, or this is a new iPhone, open pairing again on the relay. On the Linux relay, first remove the old paired device on Home or in Settings → iPhone connection.
- If several phones are paired with the relay, choose your iPhone under Preferred iPhone in the settings.
- On the UFI003, a Bluetooth guard restarts the Bluetooth controller when it fails. If the admin page says Bluetooth didn’t start, unplug the dongle and plug it back in.

### The iPhone doesn’t connect to CarPlay {#iphone-not-connecting}

Check these in order:

1. Keep the iPhone near the relay with Bluetooth and Wi-Fi turned on.
2. Make sure the relay has a valid CarPlay identity. The Android app doesn’t start CarPlay without one.
3. With Low Data Mode on for the relay’s Wi-Fi, the iPhone may not connect: on the iPhone, open Settings → Wi-Fi, tap ⓘ next to this Wi-Fi and turn off Low Data Mode.
4. With *Use the car’s hotspot*, the iPhone, the relay and the head unit must be on the same network, and the router must let devices reach each other.
5. Look at the relay’s status in the app or admin page: waiting for iPhone, connecting or connected.
6. After you change the network mode, the iPhone moves to the new network by itself and CarPlay reconnects in about 30 seconds.
7. If it still fails, tap *Reconnect* in the admin page.

### The relay doesn’t find the iPhone over a cable {#usb-iphone-not-found}

A USB-C iPhone on a USB-C to USB-C cable often takes control of the cable, so the relay phone becomes the USB device and can’t see the iPhone. From Android app 0.1.5, the home screen explains this. Try a USB-C OTG adapter (USB-C to USB-A) on the relay phone with a USB-A to USB-C cable to the iPhone; if the phone has an OTG switch, turn it on, then unplug and plug in again. A Lightning iPhone works with a USB-C to Lightning cable. Wireless is the better choice.

### With Carlink, the head unit stops at about 30 % {#carlink-stuck}

The relay phone’s Wi-Fi is off. Carlink has the relay phone join the car’s network as a Wi-Fi client; turn Wi-Fi on (it needn’t be connected to anything) and connect again. Some phones turn Wi-Fi off when their hotspot is on; they can’t also connect the iPhone through the hotspot. See [Carlink app](/en/carlink#stuck-30).

### The page says “Relay unreachable” {#relay-unreachable}

The head unit isn’t on the relay’s network, or the relay is off. Keep the relay on, join the relay’s hotspot (or the shared network) on the head unit, and open the address the relay shows.

## Picture and sound {#picture-and-sound}

### The head unit’s browser says “Video not supported” {#video-not-supported}

The browser lacks WebCodecs video decoding, or the page wasn’t opened over HTTPS. Open the relay’s `https://` address, try another browser on the head unit if it has one, and run [Check your head unit](/en/check). If no browser works, try the [Carlink app](/en/carlink).

### Video stutters {#stutter}

- Run [Check your head unit](/en/check). If the browser decodes only in software, video may stutter.
- In the web receiver’s settings, try a lower frame rate or the *Speed* playback mode.
- On a relay with only 2.4 GHz Wi-Fi, such as the UFI003, set the frame rate to 30.
- On the Android relay with Carlink, use *This phone’s hotspot* for wireless CarPlay and keep the relay phone’s Wi-Fi on.

### There is no sound {#no-sound}

First check *CarPlay audio over the car’s Bluetooth (experimental)* under Settings → Sound (Settings → Audio on the Linux admin page). It is on by default:

- **On:** the sound doesn’t go through the head-unit page; the iPhone plays it over its own Bluetooth connection with the car. Keep the iPhone paired with the car and choose Bluetooth as the car’s audio source. If the sound plays on the iPhone, turn the option off.
- **Off:** the head-unit page plays the sound; reconnect CarPlay after turning the option off. Browsers block sound until you touch the page; if the receiver says sound is paused, tap the screen once. If there is still no sound, run [Check your head unit](/en/check): the browser needs AudioWorklet to play CarPlay audio.

### Siri or calls can’t hear me {#microphone}

While *CarPlay audio over the car’s Bluetooth* is on (the default), Siri and calls also go over the iPhone’s Bluetooth connection with the car and don’t use the browser’s microphone: check that the iPhone is connected to the car’s Bluetooth.

With the option off and CarPlay reconnected, the browser asks for the microphone the first time CarPlay needs your voice; choose Allow. The microphone works only over HTTPS. On the Android relay, also allow the microphone permission; it uses the head unit’s microphone by default; to use the relay phone’s, turn on *Microphone source* under Settings → Developer options.

## Still stuck? {#still-stuck}

Ask in the [community](/en/community), with the head unit model, its system version, the route you used and what happened. A report from [Check your head unit](/en/check) helps too.
