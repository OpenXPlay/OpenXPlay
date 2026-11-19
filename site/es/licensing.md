---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: Licencias y exenciones comerciales
description: Las licencias de los repositorios de OpenXPlay — AGPL-3.0 para Stream y Relay con exenciones comerciales, las partes derivadas de GPL, OpenXPlay-Hardware (código abierto, sin uso comercial), Apache-2.0 OR MIT para los plugins — además de las marcas comerciales y la licencia de este sitio web.
breadcrumb: Licencias
---

# Licencias

OpenXPlay-Stream y OpenXPlay-Relay son de código abierto bajo AGPL-3.0, y las organizaciones que no pueden usar AGPL-3.0 pueden pedir una exención en [support@openxplay.org](mailto:support@openxplay.org); los archivos de soporte de dispositivos de OpenXPlay-Hardware siguen los términos de OpenStick: código abierto, sin uso comercial.

## Licencias de cada parte {#licenses}

- **AGPL-3.0-only.** OpenXPlay-Stream y OpenXPlay-Relay tienen licencia GNU Affero General Public License v3.0, solo la versión 3.
- **Atribución.** A OpenXPlay-Stream y OpenXPlay-Relay se aplican términos adicionales según la sección 7 de la AGPL-3.0: las versiones modificadas deben conservar el aviso “Powered by OpenXPlay.” y un enlace visible al proyecto original en sus avisos legales y en cualquier lugar destacado de su interfaz de usuario dedicado a información, avisos legales, pie de página o atribución. Consulta sus archivos NOTICE.
- **Uso en red.** Las compilaciones del retransmisor incluyen OpenXPlay-Stream, así que el retransmisor ofrece su código fuente a todas las personas que lo usan por red, incluso a través del navegador de la unidad principal.
- **Partes derivadas de GPL.** Los crates del protocolo CarPlay `rust/carplay-iap2` y `rust/carplay-airplay`, y algunos archivos de `rust/direlay-linux/src/network/`, derivan de DiPlay y xcertplay y siguen bajo GPL-3.0-only; la sección 13 de la GPLv3 permite combinarlos con el proyecto AGPL. OpenXPlay-DiPlay es GPL-3.0.
- **OpenXPlay-Hardware: código abierto, sin uso comercial.** Los archivos de soporte de dispositivos siguen los términos de [OpenStick](https://github.com/OpenStick/OpenStick) bajo la OpenXPlay-Hardware License: quien los distribuya a ellos o a una obra derivada debe publicar el código fuente completo bajo la misma licencia, y se prohíbe el uso comercial, incluida la venta de imágenes del sistema, paquetes o sus derivados que los contengan, la distribución de resultados de compilación a cambio de un pago y la venta por lotes de dispositivos que los tengan instalados. Los archivos tomados del kernel de Linux o compilados a partir de él siguen bajo GPL-2.0-only.
- **Plugins.** OpenXPlay-Web-Plugins es Apache-2.0 OR MIT, a tu elección. Algunos recursos de los plugins tienen sus propias licencias; consulta [Plugins](/es/developers#plugins).
- **Sin identidad de Apple.** Los repositorios y sus compilaciones no contienen ninguna identidad de accesorio de Apple (MFi); para que funcione se necesita una que aporte el usuario.

## Exenciones comerciales {#exemptions}

Si las políticas de tu organización no permiten software AGPL-3.0, o quieres evitar las obligaciones de la AGPL-3.0, escribe a [support@openxplay.org](mailto:support@openxplay.org). Las exenciones cubren el código propiedad de OpenXPlay en OpenXPlay-Stream y OpenXPlay-Relay; las partes derivadas de DiPlay y xcertplay siguen bajo GPL-3.0. OpenXPlay-Hardware no tiene exenciones.

## Marcas comerciales {#trademarks}

CarPlay y iPhone son marcas comerciales de Apple Inc. OpenXPlay es un proyecto independiente y no está afiliado, respaldado ni certificado por Apple ni por ningún fabricante de unidades principales o adaptadores. El código, las dependencias y los recursos de terceros conservan sus propias licencias; consulta los archivos de licencia y de avisos de cada repositorio.

## Este sitio web {#website}

El código de este sitio web tiene licencia MIT y su contenido escrito, CC BY 4.0. Las imágenes tomadas del repositorio OpenXPlay conservan sus propios términos. El código fuente está en el directorio `site` de [OpenXPlay](https://github.com/OpenXPlay/OpenXPlay/tree/main/site).
