---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: 'Tesla: CarPlay en el navegador de Tesla (experimental)'
description: El navegador de Tesla no abre direcciones de la red local, así que el retransmisor OpenXPlay agrega una dirección que sí puede abrir. Requisitos, las cuatro formas de llegar al retransmisor (se recomienda la de estilo TeslaMirror) y cómo configurarlo en los retransmisores Android y Linux.
breadcrumb: Tesla
---

# Tesla <Badge type="warning" text="Experimental" />

Un Tesla muestra CarPlay en su propio navegador, como otras unidades principales, con una diferencia: el navegador de Tesla no abre direcciones de la red local como `192.168.43.20`. Por eso el retransmisor agrega una dirección que el Tesla sí puede abrir, mediante una VPN local en el teléfono retransmisor; nada sale del teléfono.

::: tip Versión
La app de Android 0.2.0 y el retransmisor Linux 0.1.6 tienen esta adaptación. Cuéntanos cómo te funciona en la [comunidad](/es/community).
:::

## Qué necesitas {#requirements}

- La app de Android 0.2.0 o posterior ([descarga la versión más reciente](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk)); desde la 0.2.2 tiene su propia página de configuración.
- Un Tesla con MCU2 o posterior.
- CarPlay inalámbrico: la conexión USB ya usa la única VPN de Android.
- *Car browser* como salida.
- El Tesla conectado al punto de acceso del teléfono retransmisor (de 5 GHz si es posible) o a su red Wi-Fi Direct. *Use the car’s hotspot* no funciona: el punto de acceso del auto no le pasa la dirección al teléfono.
- *Remain Connected in Drive* activado en la configuración de Wi-Fi del Tesla.

## Configúralo {#setup}

1. Configura el retransmisor como en [Teléfono Android como retransmisor](/es/android-relay), y elige Tesla y tu modelo en *Your car*.
2. En la app, abre Settings → *Tesla browser* y elige una de las formas de abajo. Las que usan un nombre de confianza necesitan primero [HTTPS de confianza](/es/trusted-https). La primera vez, Android pide tu autorización para la VPN.
3. Inicia CarPlay. La pantalla de inicio muestra primero la dirección para el Tesla; ábrela en el navegador del Tesla.

| Forma | Dirección en el teléfono | Qué saber |
| --- | --- | --- |
| Nombre de confianza + dirección del rango compartido (TeslaMirror, recomendado) | `100.88.0.1` | Necesita HTTPS de confianza; el Tesla abre tu nombre de confianza sin advertencia de certificado. |
| Nombre de confianza, dirección de enlace local | `169.254.88.1` | Necesita HTTPS de confianza. El Tesla necesita internet a través del punto de acceso del teléfono para resolver el nombre. |
| Dirección de enlace local directa | `169.254.88.1` | No necesita cuenta: abre `https://169.254.88.1:8443` y continúa pese a la advertencia de certificado. Funciona solo si el navegador del Tesla te deja continuar. |
| Dirección de rango público (como TeslaAndroid) | `3.3.3.1` | Abre la dirección y continúa pese a la advertencia de certificado. |
| Desactivado | | El valor predeterminado. |

Puedes cambiar la dirección en el teléfono. Cambiar de una forma a otra mantiene CarPlay funcionando.

::: details Android 13 y posteriores
Android 13 y posteriores pueden descartar las conexiones del punto de acceso a una dirección fuera de `169.254`; se observó en Android 15. Si el Tesla no puede abrir la página, usa una forma con dirección `169.254`. La app te avisa cuando esto aplica.
:::

## Retransmisor Linux {#linux}

El retransmisor Linux tiene las mismas formas desde la 0.1.6: en su página de administración, activa el navegador de Tesla, con *Car browser* como salida y el propio punto de acceso del retransmisor. El retransmisor agrega la dirección a su punto de acceso y la quita cuando detienes el retransmisor; las formas con nombre de confianza también necesitan HTTPS de confianza aquí.
