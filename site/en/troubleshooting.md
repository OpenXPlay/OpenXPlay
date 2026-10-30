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
- **Can I avoid it?** Yes, with a free domain name: the relay gets a trusted certificate for it, and the page opens by that name without a warning. See [Trusted HTTPS](/en/trusted-https) (available from an upcoming relay release). On the Android relay you can also import your own certificate (a PKCS #12 `.p12` file) in the app.

## Connection {#connection}

### My head unit only sees 2.4 GHz Wi-Fi networks {#only-2-4-ghz}

Use a 2.4 GHz network for the head unit:

- The UFI003 dongle’s Wi-Fi has no 5 GHz band, so its hotspot is always 2.4 GHz.
- On the Android relay, set the car-hotspot band to 2.4 GHz in the app’s settings.
- With *Use the car’s hotspot* (Android) or *Shared Wi-Fi* (Linux), the network must offer 2.4 GHz. The UFI003 only sees 2.4 GHz networks anyway.

For Carlink, the UFI003 can’t join a head unit whose Carlink Wi-Fi runs on 5 GHz.

### The iPhone doesn’t pair over Bluetooth {#bluetooth-pairing}

Pair only while the relay is ready for it:

- On the Linux relay, choose Pair iPhone in the admin page. Pairing stays open for 10 minutes. On the iPhone, open Settings → Bluetooth and choose the relay.
- On the Android relay, allow the “Nearby devices” permission for OpenXPlay Relay, and tap Allow on the relay phone when it asks to become visible to your iPhone.
- If the iPhone forgot the relay, or this is a new iPhone, open pairing again on the relay.
- If several phones are paired with the relay, choose your iPhone under Preferred iPhone in the settings.
- On the UFI003, a Bluetooth guard restarts the Bluetooth controller when it fails. If the admin page says Bluetooth didn’t start, unplug the dongle and plug it back in.

### The iPhone doesn’t connect to CarPlay {#iphone-not-connecting}

Check these in order:

1. Keep the iPhone near the relay with Bluetooth and Wi-Fi turned on.
2. Make sure the relay has a valid CarPlay identity. The Android app doesn’t start CarPlay without one.
3. With *Use the car’s hotspot* (Android) or *Shared Wi-Fi* (Linux), the iPhone, the relay and the head unit must be on the same network, and the router must let devices reach each other.
4. Look at the relay’s status in the app or admin page: waiting for iPhone, connecting or connected.
5. After you change the network mode, the iPhone moves to the new network by itself and CarPlay reconnects in about 30 seconds.
6. If it still fails, restart the relay services from the admin page.

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

Browsers block sound until you touch the page. If the receiver says sound is paused, tap the screen once. If there is still no sound, run [Check your head unit](/en/check): the browser needs AudioWorklet to play CarPlay audio.

### Siri or calls can’t hear me {#microphone}

The browser asks for the microphone the first time CarPlay needs your voice; choose Allow. The microphone works only over HTTPS. On the Android relay, also allow the microphone permission; it uses the head unit’s microphone by default; to use the relay phone’s, turn on *Microphone source* under Settings → Developer options.

## Still stuck? {#still-stuck}

Ask in the [community](/en/community), with the head unit model, its system version, the route you used and what happened. A report from [Check your head unit](/en/check) helps too.
