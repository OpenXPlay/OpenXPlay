---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: CarPlay en la app CarLife de la unidad principal (experimental)
description: Cuando la unidad principal tiene CarLife, un teléfono Android como retransmisor puede llevarle la imagen y el control táctil de CarPlay por la misma red Wi-Fi, el punto de acceso del teléfono retransmisor o una conexión de accesorio USB. Una función experimental — cómo activarla, la red y el sonido.
breadcrumb: CarLife
---

# CarLife <Badge type="warning" text="Experimental" />

Si la unidad principal tiene CarLife (Baidu CarLife), prueba esta ruta: el retransmisor envía la imagen y el control táctil de CarPlay al CarLife de la unidad principal, y el sonido sigue por la conexión Bluetooth del iPhone con el auto. CarLife usa H.264; cuando el iPhone envía H.265, el teléfono retransmisor lo convierte a H.264 con sus códecs por hardware.

Esta página trata del retransmisor. La [app OpenXPlay para iPhone](/es/#iphone-app) también puede conectarse directamente al CarLife de la unidad principal, sin retransmisor.

::: warning Función experimental
Necesita la app de Android 0.2.5 o posterior; [descarga la versión más reciente](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk). El retransmisor Linux no tiene salida a CarLife.
:::

## Activa la salida a CarLife {#step-enable .step}

Elige *CarLife* en la página *Car display* del asistente de configuración o en Settings → Output. *CarLife head-unit IP address* puede quedar vacío: el retransmisor encuentra la unidad principal por su cuenta. Si no la encuentra, ingresa la dirección IPv4 de la unidad principal. El resto de la configuración del retransmisor es igual que para la ruta del navegador; consulta [Teléfono Android como retransmisor](/es/android-relay).

## Conecta la unidad principal {#step-connect .step}

Cualquiera de estas opciones:

- **Wi-Fi:** la unidad principal se conecta al punto de acceso del teléfono retransmisor, o ambos se conectan a la misma red Wi-Fi.
- **USB:** un cable del puerto USB de la unidad principal al teléfono retransmisor, como conexión de accesorio USB.

## Abre CarLife en la unidad principal {#step-open .step}

Abre CarLife en la unidad principal e inicia el retransmisor. Cuando la pantalla Home del retransmisor muestre *Sending the CarPlay picture*, revisa la imagen en la unidad principal.

## Sonido {#audio}

CarLife lleva solo la imagen y el control táctil. La música, la navegación y las llamadas se reproducen desde el iPhone por su propia conexión Bluetooth con el auto, así que primero enlaza el iPhone con el Bluetooth del auto.
