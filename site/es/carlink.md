---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: CarPlay en la app Carlink de la unidad principal
description: Cuando la unidad principal no tiene un navegador que sirva, el retransmisor OpenXPlay puede llevar CarPlay a su app Carlink por Wi-Fi — cómo activarlo, el código de enlace y qué saber sobre los retransmisores en teléfono Android, UFI003 y Phicomm N1.
breadcrumb: App Carlink
---

# App Carlink

Si la unidad principal no tiene un navegador que sirva pero sí una app Carlink, prueba esta ruta: el retransmisor se conecta a la app Carlink de la unidad principal por Wi-Fi. Carlink puede usar H.264 o H.265, según lo que admita la unidad principal y la configuración del retransmisor: cuando la unidad principal informa compatibilidad con H.265, el retransmisor Android envía la imagen H.265 del iPhone tal como llega; si no, convierte la imagen, cuando hace falta, a un formato H.264 que la unidad principal pueda mostrar.

Esta página trata del retransmisor. La [app OpenXPlay para iPhone](/es/#iphone-app) también puede conectarse directamente a la app Carlink de la unidad principal, sin retransmisor.

::: tip Versión
Necesita la app de Android 0.1.5 o posterior; [descarga la versión más reciente](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk). Desde la 0.1.5 está corregida la pantalla negra con sonido en algunas unidades principales, como la del XPeng G6, y la imagen toma la forma de la ventana de Carlink del auto. Los resultados en autos están en [Unidades principales](/es/head-units#xpeng-g6).
:::

## Activa la salida a Carlink {#step-enable .step}

**Teléfono Android:** en el asistente de configuración, elige *Carlink app* en la página *Car display*; después, el asistente recomienda *This phone’s hotspot* para CarPlay inalámbrico. Para usar el navegador y Carlink al mismo tiempo, usa Settings → Developer options → *Combine outputs*. El resto de la configuración del retransmisor es igual que para la ruta del navegador; consulta [Teléfono Android como retransmisor](/es/android-relay).

**Retransmisor Linux:** necesita dos adaptadores Wi-Fi: el integrado crea el punto de acceso para el iPhone y el segundo se conecta al Wi-Fi de Carlink de la unidad principal. En el asistente de configuración de la página de administración o en Settings → Output, elige *Carlink* o *Browser and Carlink*; con un solo adaptador, solo se ofrece el navegador. Consulta [Phicomm N1 como retransmisor](/es/phicomm-n1#adapters) u [Otros dispositivos Linux](/es/linux-devices#setup).

## Abre Carlink en la unidad principal {#step-open .step}

Inicia la app Carlink de la unidad principal.

## Ingresa el código de enlace {#step-pair .step}

Ingresa en el retransmisor (la app de Android o la página de administración del retransmisor Linux) el código de enlace que muestra ahora la pantalla del auto, y conéctate de inmediato. El código cambia cada cierto tiempo; la unidad principal decide cuánto dura.

## Qué saber de cada retransmisor {#relays}

| Retransmisor | Qué saber |
| --- | --- |
| Teléfono Android | Carlink necesita Android 10 o posterior. El teléfono retransmisor se conecta a la red de Carlink del auto como cliente Wi-Fi, así que su Wi-Fi debe estar encendido (no hace falta que esté conectado a nada). Para CarPlay inalámbrico elige *This phone’s hotspot*: el retransmisor mantiene su punto de acceso para el iPhone y al mismo tiempo se conecta al auto por Wi-Fi. Algunos teléfonos apagan el Wi-Fi cuando su punto de acceso está encendido; no pueden hacer ambas cosas. |
| UFI003 | Tiene un solo adaptador Wi-Fi, solo de 2.4 GHz, así que Carlink no está disponible; usa el navegador de la unidad principal. |
| Phicomm N1 | Necesita además un adaptador Wi-Fi USB: el adaptador integrado crea el punto de acceso para el iPhone y el adaptador USB se conecta al Wi-Fi de Carlink de la unidad principal; consulta [Uno o dos adaptadores](/es/phicomm-n1#adapters). Solo con el adaptador integrado, Carlink no está disponible. |

::: details ¿Hay sonido pero la imagen en la unidad principal está en negro? {#black-screen}
Algunas unidades principales reconocen un cuadro clave solo al principio exacto de un cuadro, y la app de Android 0.1.3 y anteriores muestran una pantalla negra en ellas. Necesita la app de Android 0.1.5 o posterior; [actualiza a la versión más reciente](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk). La 0.1.5 también recupera la imagen después de la cámara de reversa.
:::

::: details ¿La unidad principal se detiene en un 30 % aproximadamente? {#stuck-30}
El Wi-Fi del teléfono retransmisor está apagado. Carlink hace que el teléfono retransmisor se conecte a la red del auto como cliente Wi-Fi; enciende el Wi-Fi y vuelve a conectarte. Desde la app de Android 0.1.5, un inicio manual lo verifica y te avisa.
:::

::: details ¿La imagen no llena la pantalla después de que el auto cambia a pantalla completa? {#full-screen}
El auto le informa al retransmisor el tamaño de su ventana solo cuando Carlink se conecta. Cuando cambias su área durante una sesión, por ejemplo de dos tercios de la pantalla a pantalla completa, el auto solo agranda la imagen existente y deja barras a los lados. Activa Settings → Output → *Reconnect when the window size changes*: después de un cambio, el primer toque vuelve a conectar, y la imagen se detiene unos segundos.
:::
