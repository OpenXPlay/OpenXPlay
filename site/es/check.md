---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: Verifica el navegador de tu unidad principal
description: Abre esta página en el navegador de tu unidad principal Android para comprobar si tiene las funciones que usa el receptor web de OpenXPlay — decodificación H.264 y H.265 con WebCodecs, audio, micrófono, multitáctil y tamaño de pantalla. Se ejecuta localmente; no reemplaza una prueba en el auto.
breadcrumb: Verifica tu unidad principal
---

<script setup>
import HeadUnitCheck from '../.vitepress/theme/components/HeadUnitCheck.vue'
</script>

# Verifica tu unidad principal

Abre esta página en el navegador de tu unidad principal para comprobar si tiene las funciones que usa el receptor web de OpenXPlay: decodificación de video H.264 y H.265 con WebCodecs, WebSocket, audio, el micrófono, multitáctil y el tamaño de la pantalla. Después te da un resultado y un informe que puedes copiar. Todo se ejecuta en el navegador: no se envía ni se guarda nada.

En la unidad principal, escribe <code>{{ $frontmatter.checkAddress }}</code> en la barra de direcciones del navegador. Para esto, la unidad principal necesita acceso a internet, por ejemplo a través del punto de acceso de tu teléfono. Sin internet, el retransmisor sirve su propia prueba de decodificador en `/probe/` de la dirección del receptor, como `https://10.77.0.1:8443/probe/`.

## Resultado {#result}

<HeadUnitCheck />

## Qué significan los resultados {#meaning}

| Resultado | Significado |
| --- | --- |
| Verificación superada, con H.265 | El navegador informa las funciones de video, sonido y micrófono que usa el receptor web, e indica que puede decodificar H.265 (HEVC) por hardware, así que el retransmisor puede usar H.265. |
| Verificación superada, solo H.264 | El navegador informa estas funciones pero no indica decodificación de H.265 por hardware. El retransmisor usa H.264 para cualquier pantalla que no pueda decodificar H.265 por hardware. |
| Habrá imagen, pero faltan algunas funciones | Está todo lo necesario para la imagen, pero falta el sonido (AudioWorklet) o la API del micrófono: CarPlay se muestra, pero el sonido, Siri o las llamadas pueden no funcionar a través del navegador. |
| No compatible: se necesita un navegador con WebCodecs | Falta una función obligatoria, casi siempre la decodificación de video con WebCodecs. Si la unidad principal tiene otro navegador, pruébalo, o usa la [app Carlink](/es/carlink). |

La verificación solo le pregunta al navegador qué admite: no reproduce video, no se conecta a un retransmisor, no graba sonido ni envía toques. Por eso un resultado favorable no puede garantizar una reproducción fluida, que también depende del hardware de la unidad principal y de la conexión Wi-Fi. Los resultados en autos están en [Unidades principales](/es/head-units).

## Qué se verifica {#what-is-checked}

::: details Qué prueba cada elemento y por qué importa {#checked-items}
| Elemento | Por qué importa |
| --- | --- |
| Página segura (HTTPS) | Los navegadores activan WebCodecs solo en páginas seguras; por eso el retransmisor sirve el receptor por HTTPS. |
| WebCodecs VideoDecoder | El receptor web lo usa para decodificar el video de CarPlay. Sin él, el navegador no puede mostrar CarPlay. |
| H.264 (AVC) | El formato de video base. El retransmisor recurre a él siempre que H.265 no es posible. |
| H.265 (HEVC) | Se usa solo cuando todas las pantallas que muestran CarPlay lo decodifican por hardware. |
| Decodificación por hardware | La decodificación por software usa más capacidad de procesamiento y el video puede trabarse. |
| Web Workers y OffscreenCanvas | El receptor decodifica y dibuja el video fuera del hilo principal de la página. |
| WebSocket | Lleva el video, el audio y el control táctil entre el retransmisor y el navegador. |
| AudioContext y AudioWorklet | Reproducen el sonido de CarPlay. La decodificación de AAC con WebCodecs AudioDecoder es opcional. |
| Micrófono (getUserMedia) | Permite que Siri y las llamadas usen el micrófono de la unidad principal, después de que lo autorices en el navegador. |
| Puntos táctiles | Los toques vuelven al iPhone. Dos o más puntos permiten gestos con varios dedos. |
| Tamaño de pantalla y densidad de píxeles | El receptor los informa al retransmisor junto con los formatos de video que puede decodificar. |
:::

## Comparte tu resultado {#share}

Copia el informe y publícalo en la [comunidad](/es/community) junto con el modelo de la unidad principal y la versión de su sistema. Los informes ayudan a otros conductores con la misma unidad principal.
