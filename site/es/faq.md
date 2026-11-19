---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: Preguntas frecuentes
description: Preguntas comunes sobre OpenXPlay — qué es, si necesitas un retransmisor, si se instala algo en la unidad principal, qué unidades principales funcionan, en qué se diferencia de DiPlay, si es gratis, latencia, cortes de energía y privacidad.
breadcrumb: Preguntas frecuentes
schema: faq
---

# Preguntas frecuentes

::: tip ¿Algo no funciona?
Para advertencias de certificado, Wi-Fi, enlace por Bluetooth, o problemas de imagen o sonido, consulta [Solución de problemas](/es/troubleshooting).
:::

## Sobre OpenXPlay {#about}

### ¿Qué es OpenXPlay? {#what-is-openxplay}

OpenXPlay muestra CarPlay del iPhone en unidades principales Android que no pueden instalar apps, de una de dos formas: la app OpenXPlay para iPhone conecta el iPhone directamente a la unidad principal, o un retransmisor (un teléfono Android con la app OpenXPlay Relay, o un pequeño dispositivo Linux como el módem USB UFI003) se conecta al iPhone y pasa CarPlay a la unidad principal. En ambos casos, CarPlay aparece en software que la unidad principal ya tiene, como su navegador, Carlink, CarLife o receptor de transmisión. Consulta [Cómo funciona](/es/how-it-works).

### ¿Necesito un retransmisor? {#need-relay}

No. La app OpenXPlay para iPhone se conecta directamente a la unidad principal; está en beta pública y puedes [unirte en TestFlight](/es/#iphone-app). Un retransmisor es la otra forma, y las guías de este sitio te ayudan a configurar uno: consulta [Inicio rápido](/es/quick-start).

### ¿Tengo que instalar algo en la unidad principal? {#install-on-head-unit}

No. La app para iPhone o el retransmisor se encarga de recibir y conectar, y la unidad principal usa lo que ya tiene: su navegador, Carlink, CarLife o receptor de transmisión. El sistema de la unidad principal nunca se modifica.

### ¿Qué unidades principales funcionan? {#which-head-units}

Las unidades principales que OpenXPlay ha probado aparecen en [Unidades principales](/es/head-units), empezando por el XPeng G6. Para el receptor web, lo que importa es el navegador de la unidad principal: necesita decodificación H.264 con WebCodecs. Si tu unidad principal no aparece, abre [Verifica tu unidad principal](/es/check) en su navegador para probarla, y comparte el resultado con la [comunidad](/es/community).

### ¿En qué se diferencia OpenXPlay de DiPlay? {#diplay}

DiPlay es para unidades principales que pueden instalar apps: lo instalas en una unidad principal Android compatible, que recibe y muestra CarPlay por sí misma. OpenXPlay es principalmente para unidades principales que no pueden instalar apps: la app para iPhone o un retransmisor hace el trabajo, y CarPlay aparece a través del navegador, la app Carlink u otras entradas similares que la unidad principal ya tiene.

### ¿OpenXPlay es gratis? {#free}

Sí. El software es de código abierto bajo AGPL-3.0 y de uso gratuito. Para que funcione también se necesita una identidad de accesorio de Apple (MFi) que tú aportas; los repositorios y sus compilaciones no incluyen ninguna. Las organizaciones que no pueden usar AGPL-3.0 pueden pedir una exención en [support@openxplay.org](mailto:support@openxplay.org). Los archivos de soporte de dispositivos como el UFI003 (OpenXPlay-Hardware) siguen los términos de OpenStick: gratis para uso personal, sin uso comercial y sin exenciones. Consulta [Licencias](/es/licensing).

## Uso {#usage}

### ¿Cuánta latencia debo esperar? {#delay}

Los repositorios todavía no publican cifras de latencia. El retransmisor envía el video del iPhone (H.264 o H.265) por un WebSocket seguro, y el navegador de la unidad principal lo decodifica con WebCodecs, así que la latencia depende sobre todo del enlace Wi-Fi y del decodificador de la unidad principal. En la configuración del receptor web, *Speed* da la menor latencia pero puede saltarse cuadros, *Quality* da el movimiento más fluido con un poco más de latencia, y *Smart* equilibra ambos según tu red.

### ¿Qué pasa cuando el auto corta la energía? {#power-cuts}

El retransmisor vuelve a arrancar cuando regresa la energía:

- El retransmisor Linux funciona como un servicio del sistema que arranca al encender y se reinicia si falla. No espera acceso a internet ni sincronización de la hora, y sus certificados siguen siendo válidos aunque el reloj del dispositivo esté mal. Si el reloj estaba mal cuando se crearon los certificados, el retransmisor los reemplaza una vez que el reloj se sincroniza, y el navegador puede pedirte que aceptes el certificado nuevo.
- La app de Android puede iniciarse automáticamente cuando el teléfono arranca. Algunos teléfonos lo bloquean; si OpenXPlay Relay no se abre, ábrela tú.

## Privacidad y seguridad {#privacy}

Estas respuestas se refieren al retransmisor. Para la conexión directa del iPhone, consulta la [política de privacidad en openxplay.com](https://openxplay.com/es/privacy).

### ¿OpenXPlay envía mis datos a algún lado? {#data}

OpenXPlay funciona con conexiones locales. El retransmisor sirve la página del receptor y su página de administración por sí mismo; el video, el audio y el control táctil viajan entre el iPhone, el retransmisor y la unidad principal por Bluetooth, Wi-Fi o USB, y el retransmisor Linux arranca sin esperar acceso a internet. Los plugins están desactivados de forma predeterminada y funcionan sin conexión en el navegador de la unidad principal. La información del vehículo de Carlink se recopila solo cuando la activas y se queda en el dispositivo retransmisor. Consulta la [política de privacidad](/es/privacy). Este sitio web no tiene analíticas, y su página de verificación se ejecuta solo en tu navegador.

### ¿La página de administración del retransmisor está protegida? {#admin-password}

Sí. La página de administración usa HTTPS y pide una contraseña de administrador. La página de inicio de sesión muestra la contraseña inicial; cámbiala de inmediato. La página de administración te avisa mientras sigas usando la contraseña predeterminada.
