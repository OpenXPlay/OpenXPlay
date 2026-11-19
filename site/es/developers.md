---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: 'Desarrolladores: arquitectura, repositorios, compilación y plugins'
description: Cómo está construido OpenXPlay — entradas, salidas y shells del retransmisor que se comunican solo a través del modelo OXP-Stream —, además de qué hace cada repositorio, los comandos de compilación y prueba, cómo contribuir y los plugins del receptor web.
breadcrumb: Desarrolladores
---

# Desarrolladores

OpenXPlay está construido con componentes independientes: entradas que reciben una sesión de proyección, salidas que la entregan al software de la unidad principal y shells del retransmisor que conectan unas con otras. Los componentes se comunican entre sí solo a través del modelo OXP-Stream. Las licencias y las exenciones comerciales están en [Licencias](/es/licensing).

## Arquitectura {#architecture}

Cada componente es una entrada, una salida o un shell del retransmisor, y ningún componente depende de otro:

| Parte | Función | Dónde se encuentra |
| --- | --- | --- |
| Entrada | Recibe la sesión del teléfono. La entrada de CarPlay es el receptor de CarPlay del retransmisor. | OpenXPlay-DiPlay (app de Android); el receptor de CarPlay en Rust `openxplay-relay` con los crates `carplay-iap2` y `carplay-airplay` (retransmisor Linux) |
| Modelo OXP-Stream | El modelo de sesión compartido: video, audio, control táctil y teclas. Los componentes lo usan dentro del proceso o a través del protocolo de red de Stream. | `core` en OpenXPlay-Stream |
| Salida | Entrega la sesión al software que la unidad principal ya tiene: navegador (`web`), Carlink (`clink`) y transmisión de pantalla (`cast`). | OpenXPlay-Stream |
| Shell del retransmisor | Conecta una entrada con las salidas y traduce entre ellas. | OpenXPlay-Relay: la app de Android y el retransmisor Linux |

Como las salidas se comunican solo con el modelo OXP-Stream, las mismas salidas sirven a todos los retransmisores. El modelo y las salidas se implementan una vez por entorno de ejecución: Kotlin/JVM para la app de Android y Rust para el retransmisor Linux. La página del receptor que abre el navegador de la unidad principal está escrita en TypeScript, con código separado para el retransmisor Android y el retransmisor Linux. Los vectores de prueba compartidos del protocolo mantienen las implementaciones sincronizadas.

La salida web envía video H.264 o H.265 por un WebSocket seguro; el navegador de la unidad principal lo decodifica con WebCodecs y devuelve el control táctil al iPhone. En el retransmisor Linux, las salidas en Rust funcionan como un proceso `oxp-relay` separado junto al receptor de CarPlay `openxplay-relay`.

## Repositorios {#repositories}

| Repositorio | Función | Licencia |
| --- | --- | --- |
| [OpenXPlay](https://github.com/OpenXPlay/OpenXPlay) | Entrada del proyecto: README y diagramas | — |
| [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) | OpenXPlay Relay: la app de Android y el retransmisor Linux, con la página web de administración que comparten | AGPL-3.0-only; los archivos derivados de DiPlay y xcertplay siguen bajo GPL-3.0-only |
| [OpenXPlay-Stream](https://github.com/OpenXPlay/OpenXPlay-Stream) | Salidas hacia los receptores de la unidad principal — navegador, Carlink y transmisión de pantalla — y el modelo compartido | AGPL-3.0-only |
| [OpenXPlay-DiPlay](https://github.com/OpenXPlay/OpenXPlay-DiPlay) | El receptor de CarPlay que usa el retransmisor Android, un fork de DiPlay | GPL-3.0 |
| [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware) | Archivos de soporte para dispositivos retransmisores, un directorio por dispositivo, como `UFI003/` | OpenXPlay-Hardware License (código abierto, sin uso comercial); las partes del kernel de Linux siguen bajo GPL-2.0-only |
| [OpenXPlay-Web-Plugins](https://github.com/OpenXPlay/OpenXPlay-Web-Plugins) | Plugins opcionales para el receptor web: especificación, SDK, host, herramientas y plugins oficiales | Apache-2.0 OR MIT |

## Compilación y pruebas {#build}

La app de Android empaqueta `kotlin/web-receiver/dist` de Stream y el retransmisor Linux, `rust/web-receiver/dist`, así que compila ese receptor web antes que el retransmisor.

::: details Comandos de compilación y prueba de cada parte {#build-commands}
| Parte | Requisitos | Comandos |
| --- | --- | --- |
| Receptor web para el retransmisor Android (Stream) | Node.js 20.19+ o 22.12+ | `cd kotlin/web-receiver && npm ci && npm test && npm run build` |
| Receptor web para el retransmisor Linux (Stream) | Node.js 20.19+ o 22.12+ | `cd rust/web-receiver && npm ci && npm test && npm run build` |
| Salidas en Kotlin (Stream) | JDK 17 | `cd kotlin && ./gradlew test` |
| Salidas en Rust (Stream) | Rust stable | `cd rust && cargo test --workspace` |
| Página de administración (Relay) | Node.js 20.19+ o 22.12+ | `cd admin-web && npm ci && npm test && npm run build` |
| App de Android (Relay) | JDK 17, Android SDK; la página de administración y `kotlin/web-receiver/dist` de Stream compilados antes | `cd android && ./gradlew testDebugUnitTest assembleDebug` |
| Retransmisor Linux (Relay) | Rust stable | `cd rust && cargo test` |
| Compilaciones para Linux aarch64 (Stream y Relay) | `rustup target add aarch64-unknown-linux-musl`, `llvm-tools`, clang | `rust/scripts/build-aarch64.sh` |
| Plugins (Web-Plugins) | Node 22 | `npm ci && npm run build && npm test` |
:::

La compilación de Android incluye DiPlay y Stream como compilaciones compuestas de Gradle (composite builds) y espera encontrarlos junto a OpenXPlay-Relay (`../OpenXPlay-DiPlay`, `../OpenXPlay-Stream`); `-Pdiplay.dir=PATH` y `-Pstream.dir=PATH` (que apunta al directorio `kotlin/` de Stream) indican otra ubicación.

## Cómo contribuir {#contributing}

| Repositorio | Cómo se aceptan las contribuciones |
| --- | --- |
| Todos los repositorios | Bajo el [Acuerdo de Licencia de Contribuidor de OpenXPlay](https://github.com/OpenXPlay/OpenXPlay/blob/main/CLA.md) (CLA). Acéptalo una sola vez respondiendo en un pull request a cualquier repositorio de OpenXPlay, como lo pide la verificación del CLA; a partir de ahí la verificación pasa en todos ellos. Para contribuir en nombre de una organización, primero escribe a [support@openxplay.org](mailto:support@openxplay.org) para firmar un acuerdo corporativo. |
| OpenXPlay-DiPlay | El fork se mantiene cerca del DiPlay original, así que los cambios deben ser mínimos y genéricos. |

Este proyecto no hizo ingeniería inversa de cajas comerciales de CarPlay. Partes del receptor de Android reutilizan código de DiPlay y xcertplay; gracias a los proyectos originales y a sus colaboradores.

## Plugins {#plugins}

Los plugins agregan pequeños extras sin conexión al receptor web. Son opcionales y están **desactivados de forma predeterminada**: con los plugins desactivados, el receptor de referencia no crea ningún marco de plugin ni hace solicitudes de plugins, y las rutas y canales de plugins del retransmisor niegan el acceso. Stream y Relay implementan por su cuenta el contrato de plugins (`oxp-web-plugin/0`) y nunca dependen de OpenXPlay-Web-Plugins. Los paquetes de plugins revisados funcionan sin acceso a la red, protegidos por un sandbox, CSP y capas de resguardo. Activa los plugins en la página de administración del retransmisor; se ejecutan en el navegador de la unidad principal y no afectan a CarPlay.

| Plugin oficial | Qué hace | Licencia |
| --- | --- | --- |
| Cozy Cats (`cats`) | Cuatro gatos pixelados con rutinas diarias tranquilas y un cuarto de juegos mientras el auto está estacionado | Código Apache-2.0 OR MIT; arte de los gatos CC0 1.0 |
| Pocket Playroom (`games`) | Juegos táctiles sin conexión para los momentos con el auto estacionado | Apache-2.0 OR MIT |
| Quiet Lights (`visuals`) | Progreso de la canción, brillo de la portada del álbum, un cielo según la hora local y una chimenea con el auto estacionado | Apache-2.0 OR MIT |
| Whale Girl (`whale-girl`) | Un personaje acompañante opcional y no comercial de la comunidad | Código Apache-2.0 OR MIT; arte CC BY-NC-SA 4.0 y 大肥鱼项目署名许可 1.0 |

**Atribución de Whale Girl.** 鲸鱼娘 de 上善无形 ([fuente](https://www.bilibili.com/opus/1231977657712771073)), CC BY-NC-SA 4.0. Diseño de maid de ZipZipPipe ([fuente](https://www.pixiv.net/artworks/148186519)), CC BY-NC-SA 4.0. Atlas de sprites de YunYueSama ([codex-deepseek-pet](https://github.com/YunYueSama/codex-deepseek-pet)), 大肥鱼项目署名许可 1.0. Modificado por OpenXPlay.org el 2026-10-16 (se quitó el emblema del delantal y se reetiquetaron las filas) y publicado bajo [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). El personaje es un personaje de fans de la comunidad, no está afiliado a DeepSeek ni cuenta con su respaldo, y sus recursos no pueden usarse con fines comerciales.

**Atribución de Cozy Cats.** Pet Cats Pack de LuizMelo ([fuente](https://luizmelo.itch.io/pet-cat-pack)), CC0 1.0, recoloreado por OpenXPlay.org.

Para crear tu propio plugin, empieza con el simulador: `npm run dev -- --enable` en OpenXPlay-Web-Plugins carga los plugins oficiales en `http://localhost:5173`. `npm run validate` revisa un paquete y `npm run pack` genera uno; el [README del repositorio](https://github.com/OpenXPlay/OpenXPlay-Web-Plugins) cubre el resto.
