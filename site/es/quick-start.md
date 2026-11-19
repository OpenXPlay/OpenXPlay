---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: 'Inicio rápido: deja que un asistente de IA te guíe'
description: '¿Primera vez con OpenXPlay? Usa la app OpenXPlay para iPhone, que se conecta directamente a la unidad principal (beta pública), o configura un retransmisor. Para un retransmisor, instala la skill openxplay-guide y un asistente de IA en tu computadora te pregunta por tu auto y tus dispositivos, te recomienda una configuración y te guía paso a paso. O elige tú mismo un retransmisor (un teléfono Android, un módem USB UFI003 o un Phicomm N1) y cómo muestra CarPlay la unidad principal, y sigue la guía correspondiente.'
breadcrumb: Inicio rápido
---

<script setup>
import RouteChooser from '../.vitepress/theme/components/RouteChooser.vue'
</script>

# Inicio rápido

OpenXPlay lleva CarPlay de tu iPhone a la unidad principal de una de dos formas:

- **Conexión directa del iPhone**: la app OpenXPlay para iPhone conecta el iPhone directamente a la unidad principal, sin retransmisor.
- **Retransmisor**: un teléfono Android o un dispositivo Linux conecta el iPhone a la unidad principal. El resto de esta página configura un retransmisor.

## Conexión directa del iPhone <Badge type="warning" text="Beta" /> {#iphone-direct}

La app para iPhone hace el trabajo del retransmisor en el propio iPhone; la unidad principal muestra CarPlay en su navegador, Carlink, CarLife o receptor de transmisión, igual que con un retransmisor. Está en beta pública: abre [openxplay.com](https://openxplay.com/es/) en tu iPhone, o escanea el código QR de la [página de inicio](/es/#iphone-app). CarPlay necesita una [identidad de accesorio de Apple (MFi)](#mfi-identity) que tú aportas, igual que con un retransmisor.

<div class="oxp-recommended">

## Deja que un asistente de IA te guíe <Badge type="tip" text="Recomendado" /> {#ai-assistant}

El asistente te pregunta por tu auto, tu iPhone y los dispositivos que tengas disponibles, te recomienda una configuración (incluido si otro dispositivo Linux puede ser el retransmisor) y te guía paso a paso, descargando y verificando los archivos por su cuenta. Te pregunta antes de hacer cualquier cosa que cambie tu computadora o un dispositivo, y nunca te pide tus archivos de identidad de CarPlay ni contraseñas.

1. Envía este mensaje en [Claude Code](https://claude.com/claude-code) o [Codex](https://github.com/openai/codex) para instalar la skill openxplay-guide:

   ::: code-group
   ```text [Claude Code]
   Install the openxplay-guide skill from https://openxplay.org/agents/skills/index.json into ~/.claude/skills/openxplay-guide/ and check every file’s SHA-256.
   ```

   ```text [Codex]
   Install the openxplay-guide skill from https://openxplay.org/agents/skills/index.json into ~/.agents/skills/openxplay-guide/ and check every file’s SHA-256.
   ```
   :::

2. Empieza una conversación nueva y escribe “Ayúdame a configurar OpenXPlay”.

Al inicio de cada conversación, la skill busca una versión más reciente y solo se actualiza si estás de acuerdo; lo que cambió en cada versión está en su [historial de cambios](https://github.com/OpenXPlay/OpenXPlay/blob/main/skills/openxplay-guide/CHANGELOG.md).

::: details Otros asistentes: úsala una vez, sin instalarla {#ai-prompt}
Sirve cualquier asistente que pueda leer páginas web. Envíale este mensaje:

```text
Read https://openxplay.org/agents/skills/openxplay-guide/SKILL.md
and follow it to help me set up OpenXPlay.
```
:::

::: details Copiar la carpeta de la skill a mano {#ai-skill}
Copia la carpeta [skills/openxplay-guide](https://github.com/OpenXPlay/OpenXPlay/tree/main/skills/openxplay-guide) en la carpeta de skills de tu asistente y luego empieza una conversación nueva:

| Asistente | Carpeta de skills |
| --- | --- |
| Claude Code | `~/.claude/skills/openxplay-guide/` |
| Codex | `~/.agents/skills/openxplay-guide/` |
:::

</div>

## Configúralo tú mismo {#manual}

<RouteChooser />

### Qué necesitas {#requirements}

| Necesitas | Detalles |
| --- | --- |
| Un iPhone con CarPlay | Se conecta al retransmisor de forma inalámbrica (Bluetooth y Wi-Fi) o con un cable USB. |
| Un retransmisor | Un teléfono con Android 8.0 o posterior y la app OpenXPlay Relay; o un módem USB UFI003, más una computadora para flashearlo e instalarlo; o un TV box Phicomm N1: consulta [Phicomm N1 como retransmisor](/es/phicomm-n1). Otros dispositivos Linux arm64 se pueden instalar a mano: consulta [Otros dispositivos Linux](/es/linux-devices). |
| Una identidad de accesorio de Apple (MFi) | Normalmente los dos archivos `identity.pk8` y `certificate.p7b`, que tú mismo aportas; consulta abajo. |
| El navegador de la unidad principal | Debe decodificar video con WebCodecs. Abre [Verifica tu unidad principal](/es/check) en el navegador de la unidad principal para saberlo. En un Tesla, consulta [Tesla](/es/tesla). |

::: details ¿Qué es una identidad de accesorio de Apple (MFi)? {#mfi-identity}
OpenXPlay usa esta identidad para autenticarse con el iPhone como accesorio, y solo entonces arranca CarPlay; sin identidad, la app de Android no inicia CarPlay. Las guías de este sitio usan la forma más común: los dos archivos `identity.pk8` y `certificate.p7b`. Los repositorios y sus compilaciones no incluyen ninguno; tú aportas los tuyos.

Si no tienes estos dos archivos pero sí otra fuente de autenticación, elige un servidor MFi remoto, o un chip de autenticación por I2C o con un adaptador CH341, en Settings → Identity and certificates → MFi target en el retransmisor. Estas opciones también necesitan tu propia fuente de autenticación; las guías de este sitio no las cubren.
:::

### Qué retransmisor elegir {#choose-relay}

| | Teléfono Android (recomendado) | Módem USB UFI003 | TV box Phicomm N1 (avanzado) |
| --- | --- | --- | --- |
| Qué necesitas | Un teléfono con Android 8.0 o posterior | Un módem USB UFI003 y una computadora | Un Phicomm N1, una memoria USB, un cable de red y una computadora |
| Cómo se instala | Instala la app y sigue el asistente de configuración; la primera configuración toma unos 10 minutos | De preferencia, deja que un asistente de IA en tu computadora lea las instrucciones de instalación y lo instale con OpenXPlay Flasher; o instálalo tú mismo en la app Flasher. La primera instalación necesita una Mac o una PC con Windows | Graba Armbian en una memoria USB e instálalo en la eMMC, y luego instala por SSH el paquete del dispositivo y el retransmisor; requiere la línea de comandos |
| Banda Wi-Fi | Puede usar un punto de acceso de 5 GHz, así que la imagen se traba menos | Solo 2.4 GHz | Puede usar un punto de acceso de 5 GHz |
| Dónde se configura | En la app | En una página web de administración | En una página web de administración |
| Energía y arranque | Abre la app en cada viaje | Funciona como servicio del sistema y arranca solo al recibir energía | Funciona como servicio del sistema y arranca solo con alimentación de 12 V |

## Después de la configuración {#after-setup}

- [Uso diario y configuración](/es/daily-use): cómo conectarte en cada viaje, y la resolución, la pantalla completa y otras opciones de la página de la unidad principal.
- [HTTPS de confianza](/es/trusted-https): elimina la advertencia de certificado del navegador de la unidad principal con un nombre de dominio gratuito.
- [Solución de problemas](/es/troubleshooting): cuando falla la conexión, la imagen o el sonido.
