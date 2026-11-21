---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
layout: home
title: 'OpenXPlay: CarPlay para unidades principales Android que no pueden instalar apps'
titleTemplate: false
description: OpenXPlay muestra CarPlay del iPhone en unidades principales Android que no pueden instalar apps, a través del navegador, Carlink, CarLife o el receptor de transmisión de la unidad principal. Conéctate directamente con la app OpenXPlay para iPhone, o usa como retransmisor un teléfono Android o un pequeño dispositivo Linux. Código abierto.
hero:
  name: OpenXPlay
  text: CarPlay para unidades principales que no pueden instalar apps
  tagline: Conéctate directamente con la app OpenXPlay para iPhone, o usa como retransmisor un teléfono Android o un módem USB UFI003. CarPlay de tu iPhone aparece en el propio navegador de la unidad principal, y no se instala nada en ella.
  actions:
    - theme: brand
      text: Inicio rápido
      link: /es/quick-start
    - theme: alt
      text: Verificar mi unidad principal
      link: /es/check
    - theme: alt
      text: Conexión directa del iPhone
      link: https://openxplay.com/es/
featuresTitle: Tres pasos para tener CarPlay
features:
  - title: Verifica tu unidad principal
    details: Abre openxplay.org/es/check en el navegador de la unidad principal para saber si puede mostrar CarPlay.
    link: /es/check
    linkText: Hacer la verificación
  - title: Elige una configuración
    details: Conéctate directamente con la app OpenXPlay para iPhone, o prepara un retransmisor en un teléfono Android o en un módem USB UFI003.
    link: /es/quick-start
    linkText: Elegir una configuración
  - title: Conéctate en el auto
    details: Abre en el navegador de la unidad principal la dirección que muestra la app para iPhone o el retransmisor, y toca la pantalla una vez para empezar.
    link: /es/quick-start
    linkText: Ver la guía
---

## Conexión directa del iPhone (beta) {#iphone-app}

La app OpenXPlay para iPhone muestra CarPlay de tu iPhone en la unidad principal directamente, sin retransmisor. La conexión directa del iPhone se volvió muy popular entre los conductores, así que ahora tiene su propio sitio web: **[openxplay.com](https://openxplay.com/es/)**, con [compatibilidad de autos](https://openxplay.com/es/cars) y [guías de configuración](https://openxplay.com/es/start) (en chino).

La app está en beta pública: escanea el código QR con la cámara de tu iPhone, o abre [openxplay.com](https://openxplay.com/es/) en tu iPhone.

<figure class="oxp-figure is-qr">
  <a href="https://openxplay.com/es/"><img src="/iphone-app-qr.svg" width="37" height="37" loading="lazy" decoding="async" alt="Código QR para unirse a la beta de la app OpenXPlay para iPhone en TestFlight"></a>
</figure>

## Qué necesitas {#requirements}

<div class="oxp-checklist">

- **Un iPhone con CarPlay**.
- **La app para iPhone o un retransmisor**: la [app OpenXPlay para iPhone](#iphone-app) se conecta directamente; un retransmisor es un teléfono con Android 8.0 o posterior, o un módem USB UFI003.
- **Una identidad de accesorio de Apple (MFi)**: normalmente dos archivos que tú mismo aportas; el proyecto no incluye ninguna. [Más información](/es/quick-start#mfi-identity)
- **El navegador de la unidad principal**: debe decodificar video con WebCodecs; puedes [verificarlo primero](/es/check).

</div>

## Para quién es OpenXPlay {#who-it-is-for}

OpenXPlay es para **conductores que quieren CarPlay pero no pueden instalar apps de terceros en su unidad principal Android**. El sistema de la unidad principal nunca se modifica: la app para iPhone o un retransmisor se encarga de recibir y conectar, y CarPlay aparece a través de algo que la unidad principal ya tiene.

| Tu unidad principal | Qué usar |
| --- | --- |
| No puede instalar apps | **OpenXPlay**: la app para iPhone o un retransmisor hace el trabajo, y CarPlay aparece en el navegador, Carlink, CarLife o el receptor de transmisión de la unidad principal. |
| Puede instalar apps | **[DiPlay](https://github.com/shihabal3amri/DiPlay)**: instala la app en una unidad principal Android compatible, que recibe y muestra CarPlay por sí misma. |

Para ver en detalle cómo funciona y qué entradas de la unidad principal admite, lee [Cómo funciona](/es/how-it-works).

## Preguntas comunes {#questions}

::: details ¿Tengo que instalar algo en la unidad principal?
No. La app para iPhone o el retransmisor se encarga de recibir y conectar, y la unidad principal usa lo que ya tiene: su navegador, Carlink, CarLife o receptor de transmisión. El sistema de la unidad principal nunca se modifica.
:::

::: details ¿Es gratis?
Sí. El software es de código abierto bajo AGPL-3.0. Para que funcione también se necesita una identidad de accesorio de Apple (MFi) que tú aportas. Consulta [Licencias](/es/licensing).
:::

::: details ¿Funcionará mi unidad principal?
Lo que importa es el navegador de la unidad principal: necesita decodificación de video con WebCodecs. Abre [Verifica tu unidad principal](/es/check) en su navegador para saberlo; las unidades principales que OpenXPlay ha probado aparecen en [Unidades principales](/es/head-units).
:::

::: details ¿Envía mis datos a algún lado?
OpenXPlay funciona con conexiones locales: el video, el audio y el control táctil viajan entre el iPhone, el retransmisor si usas uno, y la unidad principal por Bluetooth, Wi-Fi o USB, y la propia app para iPhone o el retransmisor sirve la página del receptor. Consulta las [Preguntas frecuentes](/es/faq#data).
:::

Hay más respuestas en las [Preguntas frecuentes](/es/faq); para problemas con la conexión, la imagen o el sonido, consulta [Solución de problemas](/es/troubleshooting).

## Únete a la comunidad {#join}

Cuenta cómo funciona OpenXPlay con tu unidad principal, reporta problemas o ayuda a probar y desarrollar el proyecto: [Discord](https://discord.gg/j3cKd5Tax), el grupo de QQ **627265786** y un grupo de WeChat. Los códigos QR están en la página [Comunidad](/es/community).
