---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: CarPlay en el receptor de transmisión de la unidad principal (transmisión inalámbrica, experimental)
description: Cuando la unidad principal solo puede recibir transmisión de pantalla (DLNA o Miracast), un teléfono Android como retransmisor puede transmitirle la imagen de CarPlay mientras manejas CarPlay en el teléfono retransmisor. Una función experimental — cómo elegir DLNA o Miracast, la red, el sonido y la imagen.
breadcrumb: Transmisión inalámbrica
---

# Transmisión inalámbrica <Badge type="warning" text="Experimental" />

Si la unidad principal no tiene un navegador que sirva, Carlink ni CarLife, pero puede recibir transmisión de pantalla (DLNA o Miracast), prueba esta ruta: la unidad principal muestra solo la imagen de CarPlay y no se puede tocar; manejas CarPlay en el teléfono retransmisor.

Esta página trata del retransmisor. La [app OpenXPlay para iPhone](/es/#iphone-app) también puede transmitir directamente a la unidad principal, sin retransmisor.

::: warning Función experimental
Necesita la app de Android 0.2.5 o posterior; [descarga la versión más reciente](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk). El retransmisor Linux no tiene salida de transmisión inalámbrica.
:::

## Elige DLNA o Miracast {#step-choose .step}

Elige *Wireless display* en la página *Car display* del asistente de configuración o en Settings → Output, y luego una de estas opciones:

| Tipo | Para | Ten en cuenta |
| --- | --- | --- |
| DLNA | Unidades principales con una app receptora de transmisión | La unidad principal reproduce lo que envía el retransmisor, con unos segundos de retraso. |
| Miracast | Unidades principales que reciben la transmisión de pantalla de un teléfono | Menos latencia; usa Wi-Fi Direct. |

## DLNA: conecta el receptor {#dlna}

1. La unidad principal se conecta al punto de acceso del teléfono retransmisor, o ambos se conectan a la misma red Wi-Fi; luego abre la app receptora en la unidad principal.
2. En Settings → Output → *Wireless display*, toca *Receiver* y elige la unidad principal de la lista. Si no aparece, revisa la red y la app receptora, y luego toca *Search again*.

El retransmisor sigue enviando la imagen a ese receptor y vuelve a intentarlo cuando el receptor deja de reproducir.

## Miracast: inicia la transmisión de pantalla {#miracast}

1. En Settings → Output → *Wireless display*, permite *Display over other apps*, para que CarPlay siga en la unidad principal mientras el retransmisor está en segundo plano.
2. Toca *Open screen casting* y elige la unidad principal en la lista de transmisión de Android.

Miracast y Carlink usan Wi-Fi Direct; la mayoría de los teléfonos solo pueden usar uno a la vez. Miracast también puede reemplazar el grupo Wi-Fi Direct propio de CarPlay, así que usa *This phone’s hotspot* o USB para CarPlay; la app te ofrece cambiar.

## Maneja CarPlay en el teléfono retransmisor {#operate}

Solo con transmisión inalámbrica, el teléfono retransmisor muestra CarPlay y recibe el control táctil, con un botón para regresar. Mientras está conectado, Home ofrece *Show CarPlay*.

## Sonido {#audio}

Con Settings → Sound → *CarPlay audio over the car’s Bluetooth* desactivado, todo el sonido de CarPlay (música, alertas, Siri y llamadas) va a la unidad principal con la transmisión; DLNA lo reproduce con unos segundos de retraso, igual que su imagen. Siri y las llamadas usan el micrófono del teléfono retransmisor. Con la opción activada, el sonido sale del iPhone por su conexión Bluetooth con el auto.

## Imagen {#picture}

- **DLNA** usa la pantalla del auto medida por el navegador y guardada, o la pantalla del modelo de auto elegido; si no, 16:9, en el tamaño definido en Settings → CarPlay picture → *Resolution*.
- **Miracast** usa el tamaño que Android negoció con la unidad principal. La unidad principal recibe lo que envía la transmisión de pantalla de Android; estos ajustes cambian la forma de CarPlay dentro de ella, no su nitidez. Si la unidad principal estira la imagen transmitida a su pantalla, activa *Fill the screen* para que CarPlay se vea con las proporciones correctas.
