---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: Flashear la imagen base del UFI003 (OpenStick Debian 11)
description: La imagen base OpenStick v1 que necesita el UFI003 para ejecutar el retransmisor Linux de OpenXPlay. Descargas, sumas de verificación SHA-256, precauciones antes de flashear y los comandos para volver a flashear un módem que ya ejecuta OpenStick.
breadcrumb: Flashear la imagen base del UFI003
prev:
  text: UFI003 como retransmisor
  link: /es/ufi003-relay
next:
  text: 'Continúa: instala el paquete de dispositivo'
  link: /es/ufi003-relay#step-device
---

# Flashear la imagen base del UFI003

El UFI003 ejecuta OpenStick [versión v1](https://github.com/OpenStick/OpenStick/releases/tag/v1) (publicada el 2022-02-08), un sistema Debian 11. Esta página es el primer paso de la [instalación por línea de comandos sin Flasher](/es/ufi003-relay#manual); una vez flasheado el módem, vuelve a [UFI003 como retransmisor](/es/ufi003-relay#step-device) para instalar el paquete de dispositivo y el retransmisor. Las formas recomendadas son [dejar que un asistente de IA lo instale](/es/ufi003-relay#ai) o [instalarlo tú mismo con Flasher](/es/ufi003-relay#flasher): OpenXPlay Flasher hace los pasos de esta página y respalda automáticamente las cuatro particiones del módem. El bootloader original no puede leer esas particiones, así que en una primera instalación desde el sistema original, Flasher primero reemplaza el bootloader y borra la partición boot, luego hace el respaldo, e instala el sistema solo cuando el respaldo se completó correctamente.

::: danger Antes de flashear
- El paquete de flasheo reemplaza la tabla de particiones y el bootloader. El sistema Android original deja de funcionar después, y OpenStick no ofrece forma de volver atrás.
- Respalda todo el dispositivo antes del primer flasheo, y como mínimo las particiones `modemst1`, `modemst2`, `fsc` y `fsg`: contienen datos de calibración del módem exclusivos de este dispositivo que no se pueden recuperar de ningún otro lugar.
- Flashear borra todo lo que hay en el dispositivo, incluida la identidad de CarPlay que agregaste, los enlaces con el iPhone y la configuración de Wi-Fi.
:::

## Descarga y verifica los archivos {#downloads}

OpenStick prohíbe el uso comercial, y OpenXPlay no redistribuye estos archivos: descárgalos de la página de la versión de OpenStick y verifica su SHA-256 (`shasum -a 256 FILE` en macOS, `sha256sum FILE` en Linux):

| Archivo | Para qué sirve |
| --- | --- |
| [`debian.zip`](https://github.com/OpenStick/OpenStick/releases/download/v1/debian.zip) (unos 377 MB) | El sistema de archivos raíz de Debian 11 `rootfs.img`, más una copia de `boot.img` |
| [`boot-ufi001c.img`](https://github.com/OpenStick/OpenStick/releases/download/v1/boot-ufi001c.img) | La partición de arranque del kernel para el UFI003; no es el mismo archivo que el `boot.img` genérico de `debian.zip` |
| [`base-generic.zip`](https://github.com/OpenStick/OpenStick/releases/download/v1/base-generic.zip) | El bootloader y otras particiones de bajo nivel con un script de flasheo; solo se necesita para el primer flasheo desde el sistema original |

::: details Sumas de verificación SHA-256 {#checksums}
| Archivo | SHA-256 |
| --- | --- |
| `debian.zip` | `8be6f100e8fc3f612e0b03c199d01f51d38b953a19343ad0f4cf7a2f7a57f603` |
| `boot-ufi001c.img` | `a2b527e98a5cee0a4c3cad5099af7ce0648246f19d20d13ef2c168e400c81b33` |
| `base-generic.zip` | `b609b91c94b07d7cde4141a578df5c1440fbe75140f0c645c7124356774e2418` |
:::

Los demás archivos `boot-*.img` y `firmware-*.zip` de la página de la versión son para otros modelos; el UFI003 no los necesita.

## Primer flasheo desde el sistema original {#first-flash}

El primer flasheo necesita el bootloader y el script de flasheo `flash.sh` de `base-generic.zip`. **No ejecutes el script tal cual**, por los motivos que se explican abajo: ejecuta sus comandos línea por línea, y continúa solo cuando las cuatro particiones se hayan leído de tu dispositivo y los archivos realmente se hayan reemplazado.

::: details ¿Por qué no ejecutar simplemente flash.sh? {#flash-script}
`flash.sh` primero borra la partición boot e instala el nuevo bootloader, solo después respalda las particiones `modemst1`, `modemst2`, `fsc` y `fsg` en archivos `.bin` con los mismos nombres, y al final las vuelve a escribir. El zip ya contiene cuatro archivos `.bin` de ese tipo, tres de ellos con contenido real que no son los datos de tu dispositivo. El script no se detiene cuando falla un paso, así que si el respaldo falla, lo que se escribe en tu dispositivo son los archivos del zip.
:::

## Volver a flashear un módem que ejecuta OpenStick {#reflash}

Para volver a flashear un UFI003 que ya ejecuta OpenStick, solo hay que escribir el sistema de archivos raíz y la partición boot. Descomprime `debian.zip`, coloca `boot-ufi001c.img` en su directorio `debian` y ejecuta ahí estos comandos. No ejecutes tal cual el `flash.sh` de ese directorio: escribe el `boot.img` genérico.

```sh
adb reboot bootloader
fastboot -S 200M flash rootfs rootfs.img
fastboot flash boot boot-ufi001c.img
fastboot reboot
```

::: warning Escribe rootfs.img con -S 200M
Escribe `rootfs.img` con la opción `-S 200M` de fastboot (así lo hace el `flash.sh` de `debian.zip`). Con los bloques predeterminados de unos 256 MB, el UFI003 falla a mitad de la escritura.
:::
