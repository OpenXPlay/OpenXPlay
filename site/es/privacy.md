---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: Política de privacidad
description: Privacidad y seguridad del retransmisor OpenXPlay — sin cuenta ni rastreo; CarPlay viaja solo entre tu iPhone, el retransmisor y la unidad principal; los registros de la app de Android salen del teléfono solo cuando los envías. Para la app para iPhone, consulta openxplay.com.
breadcrumb: Privacidad
---

# Política de privacidad

Esta política cubre la solución con retransmisor publicada por OpenXPlay.org: la app OpenXPlay Relay para Android, el retransmisor Linux y este sitio web. Última actualización: 13 de noviembre de 2026.

::: tip Conexión directa del iPhone
La app OpenXPlay para iPhone, que se conecta a la unidad principal sin retransmisor, tiene su propia [política de privacidad en openxplay.com](https://openxplay.com/es/privacy).
:::

## En resumen {#summary}

- OpenXPlay no tiene cuentas, publicidad, analíticas ni rastreo.
- El video, el audio y el control táctil de CarPlay viajan solo entre tu iPhone, el retransmisor y la unidad principal. Nunca pasan por nuestros servidores.
- Los registros de la app de Android se quedan en el teléfono retransmisor a menos que decidas enviarlos. Los registros enviados se eliminan en un plazo de 30 días.

## Qué se queda en el retransmisor {#on-device}

- **CarPlay.** El retransmisor sirve la página del receptor y su página de administración por sí mismo. El video, el audio y el control táctil viajan entre el iPhone, el retransmisor y la unidad principal por Bluetooth, Wi-Fi o USB.
- **Configuración.** Tu configuración, el enlace con el iPhone y las unidades principales en las que confía el retransmisor se guardan en el retransmisor.
- **Información del vehículo.** La información sobre el auto que informan las unidades principales con Carlink se recopila solo cuando la activas, y se queda en el retransmisor.
- **Plugins.** Los plugins están desactivados de forma predeterminada y funcionan sin conexión en el navegador de la unidad principal.
- **Registros.** La app de Android guarda en el teléfono aproximadamente las últimas 24 horas de sus propios registros. Antes de guardar nada, se reemplazan contraseñas, claves, números de teléfono, nombres, mensajes y la ubicación precisa. Se conservan detalles técnicos como el modelo del teléfono, la versión del sistema, las direcciones Bluetooth y Wi-Fi, las direcciones IP y los nombres de redes Wi-Fi, porque se necesitan para encontrar problemas de conexión.

## Cuándo salen datos del retransmisor {#sent}

- **Envío de registros (app de Android).** Un envío ocurre solo después de que aceptas el aviso en Settings › Logs. El registro va a `logs.openxplay.org`, operado por OpenXPlay.org, y se usa solo para diagnosticar problemas. Los envíos pasan por Cloudflare, que los reenvía sin guardarlos, a un servidor que puede estar en un centro de datos de AWS en Estados Unidos. Los envíos de una misma app se vinculan con un ID aleatorio que no se deriva de tu iPhone, tu auto ni el hardware de tu teléfono. Los registros enviados no se pueden descargar públicamente y se eliminan de forma permanente en un máximo de 30 días; para que se elimine uno antes, envía su ID de registro a [support@openxplay.org](mailto:support@openxplay.org). Si lo prefieres, guarda el archivo y envíalo en privado.
- **HTTPS de confianza.** Si configuras un nombre de confianza para los navegadores de la unidad principal, el retransmisor envía su dirección al proveedor de DNS dinámico que elegiste (DuckDNS o dynv6), usando tu token, y solicita un certificado a Let's Encrypt. El nombre y la dirección privada a la que apunta se vuelven públicos; consulta [HTTPS de confianza › Privacidad](/es/trusted-https#privacy). Se aplican las políticas de privacidad propias de estos servicios.
- **Búsqueda de actualizaciones.** El retransmisor le pide a GitHub la lista de versiones de OpenXPlay Relay. GitHub ve la dirección pública de la conexión a internet del retransmisor.

No vendemos ni compartimos datos con nadie.

## Seguridad {#security}

La página de administración usa HTTPS y requiere la contraseña de administrador. La página de inicio de sesión muestra la contraseña del primer uso; cámbiala después de iniciar sesión. La página de administración te lo recuerda mientras sigas usando la contraseña predeterminada.

## Este sitio web {#website}

openxplay.org no tiene analíticas, y su [página de verificación](/es/check) se ejecuta solo en tu navegador.

## Niños {#children}

OpenXPlay no está dirigido a niños y no recopila datos de ellos a sabiendas.

## Cambios y contacto {#contact}

Si esta política cambia, la nueva versión se publica en esta página con una fecha nueva. Preguntas o solicitudes sobre tus datos: [support@openxplay.org](mailto:support@openxplay.org).
