---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: TV box Phicomm N1 como retransmisor (retransmisor Linux)
description: Configura un Phicomm N1 como retransmisor Linux de OpenXPlay. Graba Armbian en una memoria USB e instálalo en la eMMC, instala por SSH el paquete de dispositivo del N1 y el retransmisor, define el país del Wi-Fi, agrega tu identidad de CarPlay, enlaza tu iPhone y abre CarPlay en el navegador de la unidad principal.
breadcrumb: Phicomm N1 como retransmisor
schema: howto
howtoName: Usar un TV box Phicomm N1 como retransmisor Linux y mostrar CarPlay del iPhone en el navegador de la unidad principal
howtoTools:
  - iPhone con CarPlay
  - TV box Phicomm N1 con su fuente de alimentación de 12 V
  - Memoria USB de 8 GB o más
  - Computadora con SSH, y un router para el cable de red del N1
  - Identidad de accesorio de Apple (MFi) que aportas tú
  - Unidad principal Android con un navegador compatible con WebCodecs
next:
  text: Uso diario y configuración
  link: /es/daily-use
---

# Phicomm N1 como retransmisor <Badge type="info" text="Avanzado" />

El Phicomm N1 es un TV box con un Amlogic S905D. Con Armbian instalado, ejecuta el retransmisor Linux de OpenXPlay: el retransmisor se inicia cada vez que el TV box recibe energía, su punto de acceso puede usar 5 GHz y la unidad principal muestra CarPlay en su propio navegador; agrega un adaptador Wi-Fi USB y también funciona la app Carlink de la unidad principal. [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/PhicommN1) proporciona el paquete de dispositivo del N1.

Todo se instala desde una computadora por SSH, así que esta guía es para quienes se sienten cómodos con la línea de comandos. Esta guía recomienda instalar a mano; OpenXPlay Flasher también puede instalar el N1, consulta [OpenXPlay Flasher](#flasher).

::: warning Bajo tu propio riesgo
- Grabar Armbian en la eMMC borra el sistema actual del N1.
- Cuéntale a la [comunidad](/es/community) cómo te fue, con las versiones del retransmisor y del paquete de dispositivo.
:::

| Hardware del N1 | Qué significa para el retransmisor |
| --- | --- |
| Wi-Fi BCM43455, 2.4 GHz y 5 GHz | El punto de acceso del retransmisor puede usar 5 GHz, así que la imagen se entrecorta menos |
| Bluetooth BCM4345C0, Classic y Low Energy | Funcionan tanto CarPlay inalámbrico como Carlink |
| Ethernet Gigabit | Se conecta a un router mientras lo instalas y lo administras |
| Dos puertos USB 2.0 | Un adaptador Wi-Fi USB en uno de ellos habilita Carlink; consulta [Uno o dos adaptadores](#adapters) |
| Alimentación de 12 V CC | También en el auto necesita una fuente que entregue 12 V estables |

## Uno o dos adaptadores {#adapters}

El adaptador Wi-Fi integrado del N1 es suficiente para el navegador de la unidad principal. Para la app Carlink de la unidad principal, agrega un segundo adaptador Wi-Fi en un puerto USB (por ejemplo, un RTL8822BU).

| | Un adaptador (integrado) | Dos adaptadores (más un adaptador Wi-Fi USB) |
| --- | --- | --- |
| La unidad principal muestra CarPlay en | Su navegador | Su navegador, su app Carlink o ambos |
| Adaptador integrado | Ejecuta el punto de acceso del retransmisor; el iPhone y la unidad principal se conectan a él | Ejecuta el punto de acceso del retransmisor para el iPhone y el navegador de la unidad principal |
| Adaptador USB | | Se conecta al Wi-Fi de Carlink de la unidad principal; ejecuta el punto de acceso de administración mientras Carlink no está conectado |
| Página de administración en el auto | El teléfono se conecta al punto de acceso del retransmisor | El teléfono se conecta al punto de acceso del retransmisor o al punto de acceso de administración |

Con un solo adaptador, el asistente de configuración no ofrece *Carlink app* ni *Both*. Desconecta el adaptador USB y Carlink se pausa; vuelve a conectarlo y Carlink se reanuda. Estas reglas necesitan el retransmisor Linux 0.1.6 o posterior.

[Uso en el auto](#in-car) muestra cómo conectarte en cada caso.

## Lo que necesitas {#requirements}

| Necesitas | Notas |
| --- | --- |
| Un Phicomm N1 | Con su fuente de alimentación de 12 V |
| Una memoria USB | De 8 GB o más; se borra todo su contenido. Guárdala después como memoria de rescate |
| Un cable de red y un router | El N1 está conectado por cable al router durante la instalación; la computadora se conecta al mismo router |
| Una computadora | Windows, macOS o Linux que pueda grabar una memoria USB y ejecutar `ssh` (integrado en Windows 10 y 11) |
| Una identidad de accesorio de Apple (MFi) | `identity.pk8` y `certificate.p7b`, que aportas tú; consulta [¿Qué es una identidad de accesorio de Apple (MFi)?](/es/quick-start#mfi-identity) |
| Un adaptador Wi-Fi USB (opcional) | Solo para Carlink; consulta [Uno o dos adaptadores](#adapters) |

## Graba Armbian en una memoria USB {#usb .step}

Hacemos las pruebas con [amlogic-s9xxx-armbian](https://github.com/ophub/amlogic-s9xxx-armbian) de ophub: de la versión [`Armbian_trixie_arm64_server_2026.10`](https://github.com/ophub/amlogic-s9xxx-armbian/releases/tag/Armbian_trixie_arm64_server_2026.10), descarga `Armbian_26.11.0_amlogic_s905d_trixie_6.12.112_server_2026.10.15.img.gz` (Debian 13, kernel 6.12). Su SHA-256 debe ser:

```text
2a5838ff490db59065f9ab29c6762ea459b08e7ff6802ef22fa1329bfaf37fff
```

Compruébalo con `certutil -hashfile <file> SHA256` en Windows, `shasum -a 256 <file>` en macOS o `sha256sum <file>` en Linux. Luego descomprime el archivo `.img` y grábalo en la memoria USB con [balenaEtcher](https://etcher.balena.io/) o [Rufus](https://rufus.ie/) (Windows).

El paquete de dispositivo necesita Debian 13 (trixie). Las otras imágenes de Debian 13 de ophub para el N1, como la del kernel 6.18, también deberían funcionar.

## Arranca el N1 desde la memoria USB {#boot .step}

1. Conecta el N1 al router con un cable de red, conecta la memoria USB y luego conecta la alimentación.
2. Después de unos 2 minutos, busca el dispositivo llamado Armbian en la lista de dispositivos del router y anota su dirección IP.

::: details ¿El N1 no arrancó desde la memoria USB? {#boot-usb}
- Un N1 que ya ejecutó un sistema de terceros, como Armbian u OpenWrt, normalmente arranca desde la memoria USB en cuanto recibe energía con la memoria conectada.
- Un N1 que todavía tiene el sistema original de Phicomm necesita primero que actives la depuración por ADB en ese sistema. Luego ejecuta estos dos comandos en la computadora, y el N1 se reinicia desde la memoria USB. Algunas versiones del sistema original no permiten activar ADB hasta que se instala una versión anterior; para eso, sigue una guía de la comunidad del N1.

  ```sh
  adb connect <N1 IP>
  adb shell reboot update
  ```

- Prueba con el otro puerto USB.

La documentación de ophub lo explica en [Setting the box to boot from USB/TF/SD](https://github.com/ophub/amlogic-s9xxx-armbian/blob/main/documents/README.md#124-setting-the-box-to-boot-from-usbtfsd).
:::

## Instala el sistema en la eMMC {#emmc .step}

Inicia sesión en el N1 desde la computadora. El usuario predeterminado es `root` con la contraseña `1234`:

```sh
ssh root@<N1 IP>
```

La primera vez que inicies sesión, Armbian te pide cambiar la contraseña de root y crear un usuario; sigue las indicaciones y, a partir de entonces, inicia sesión con ese usuario. Luego graba el sistema en la eMMC:

```sh
armbian-install
```

Ingresa `101` (Phicomm-N1), luego `1` (ext4), y espera a que termine. Luego apágalo:

```sh
poweroff
```

Después de unos 30 segundos, desconecta la alimentación y la memoria USB, y vuelve a conectar la alimentación: mientras la memoria USB esté conectada, el N1 arranca primero desde ella. Cuando el N1 haya arrancado desde la eMMC, inicia sesión con el usuario que creaste. La dirección IP normalmente sigue siendo la misma; si cambió, búscala de nuevo en el router.

```sh
ssh <user>@<N1 IP>
```

::: details ¿Quieres conservar el sistema original? {#backup}
Antes de grabar en la eMMC, ejecuta `armbian-ddbr` en el Armbian de la memoria USB e ingresa `b`. Esto crea una copia de seguridad del sistema original en `/ddbr/BACKUP-arm-64-emmc.img.gz` en la memoria USB; copia ese archivo a tu computadora. Para volver a él más adelante, arranca desde la memoria USB, ejecuta el mismo comando e ingresa `r`. La documentación de ophub lo explica en [Backup and Restore Using Armbian-ddbr](https://github.com/ophub/amlogic-s9xxx-armbian/blob/main/documents/README.md#1231-backup-and-restore-using-armbian-ddbr).
:::

## Instala el paquete de dispositivo {#device .step}

En [Releases](https://github.com/OpenXPlay/OpenXPlay-Hardware/releases) de OpenXPlay-Hardware, elige la versión `phicomm-n1-device-v` más reciente (por ahora todas son versiones preliminares; se requiere 0.1.1-beta.1 o posterior). En el N1, descárgala, verifica su SHA-256, descomprímela y ejecuta su instalador. Asigna a `V` la versión más reciente; `--dry-run` lo revisa todo sin cambiar nada:

```sh
V=0.1.1-beta.1
base=https://github.com/OpenXPlay/OpenXPlay-Hardware/releases/download/phicomm-n1-device-v$V
curl -fL -O "$base/openxplay-phicomm-n1-device-$V.tar.gz" -O "$base/SHA256SUMS"
sha256sum --ignore-missing -c SHA256SUMS
tar -xzf openxplay-phicomm-n1-device-$V.tar.gz
D=openxplay-phicomm-n1-device-$(echo "$V" | sed 's/-/~/')
sudo sh "$D/install-device.sh" --dry-run
sudo sh "$D/install-device.sh"
sudo reboot
```

La carpeta descomprimida escribe una versión preliminar con `~` en lugar de `-` (como `0.1.1~beta.1`); `D` es esa carpeta. Después del reinicio, vuelve a iniciar sesión y comprueba la instalación:

```sh
V=0.1.1-beta.1
sudo sh "openxplay-phicomm-n1-device-$(echo "$V" | sed 's/-/~/')/install-device.sh" --verify
```

| Comando | Su última línea debe ser |
| --- | --- |
| `--dry-run` | `OXP-STAGE device preflight-ok version=<version>` |
| Instalación | `OXP-STAGE device ok version=<version> reboot=required` |
| `--verify` | `OXP-STAGE device verified version=<version>` |

`<version>` se escribe igual que en el nombre de la carpeta.

El paquete de dispositivo trae los paquetes de Debian que necesita el retransmisor y que le faltan a Armbian, como BlueZ, así que se instala sin conexión a internet. El paquete:

- instala el perfil de host `/etc/openxplay/host.json`;
- da al Wi-Fi y al Bluetooth sus propias direcciones, derivadas de la dirección MAC de Ethernet; de lo contrario, todos los N1 comparten las mismas;
- corrige el PHY de Ethernet al arrancar, y de nuevo después de una actualización del kernel con `armbian-update`;
- instala un firmware Wi-Fi de Cypress más reciente, para que los canales de 5 GHz del 36 al 48 funcionen con el código de país CN. El firmware original solo permite del 149 al 165; del 52 al 144 siguen deshabilitados.

::: details ¿El N1 no puede llegar a GitHub? {#offline}
Descarga ambos archivos en la computadora, verifica ahí el SHA-256, cópialos al N1, asigna `V` ahí y continúa desde la línea de `tar`:

```sh
scp openxplay-phicomm-n1-device-<version>.tar.gz SHA256SUMS <user>@<N1 IP>:
```

Copia de la misma forma el paquete del retransmisor del siguiente paso.
:::

## Instala el retransmisor {#relay .step}

Toma la versión `linux-v` más reciente de [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases); ahora es `linux-v0.1.6`:

```sh
V=0.1.6
base=https://github.com/OpenXPlay/OpenXPlay-Relay/releases/download/linux-v$V
curl -fL -O "$base/openxplay-relay_${V}_arm64.deb" -O "$base/SHA256SUMS"
sha256sum --ignore-missing -c SHA256SUMS
sudo apt-get install --no-install-recommends ./openxplay-relay_${V}_arm64.deb
```

Asigna a `V` la versión más reciente. El paquete de dispositivo ya instaló las dependencias, así que este paso funciona sin conexión a internet. El retransmisor funciona como un servicio del sistema y se inicia al arrancar; [Instala el retransmisor](/es/linux-devices#install) enumera lo que instala el paquete.

## Abre la página de administración {#admin .step}

En un teléfono o una computadora en la misma red, abre `https://<N1 IP>:6975`; un iPhone, una Mac o una computadora con Windows también pueden abrir `https://openxplay-admin.local:6975`. El navegador advierte que el certificado no es de confianza; continúa a la página. La contraseña inicial es `openxplay`: inicia sesión y luego cámbiala. Si la olvidas, consulta [¿Olvidaste la contraseña de administración?](/es/linux-devices#reset-password)

## Define el país del Wi-Fi {#country .step}

En la página de administración, abre **iPhone connection → Wireless network** y ajusta **Wi-Fi country** al lugar donde estás, por ejemplo `CN` en China continental.

Si se deja en *System setting*, el N1 normalmente sigue las reglas mundiales (`00`): ningún canal de 5 GHz puede alojar un punto de acceso, así que el retransmisor abre su punto de acceso en el canal 6 de 2.4 GHz. Con `CN` y el paquete de dispositivo instalado, el N1 puede alojar su punto de acceso en los canales de 5 GHz del 36 al 48 y del 149 al 165.

## Agrega tu identidad de CarPlay {#identity .step}

En la página de administración, abre **Settings → Identity and certificates** y elige `identity.pk8` y `certificate.p7b`, o un ZIP que contenga ambos. También puedes [colocar los archivos a mano](/es/linux-devices#identity).

## Responde el asistente de configuración {#setup .step}

Completa el asistente de configuración de la página de administración: tu auto, la salida (el navegador de la unidad principal, su app Carlink o ambos; con un solo adaptador, solo el navegador) y la red, y luego lo que aparece en la preparación. El punto de acceso propio del retransmisor es `OpenXPlay-Linux-XXXX` con la contraseña `openxplay`, a menos que definas una propia. [Responde el asistente de configuración](/es/linux-devices#setup) explica cada opción.

## Enlaza el iPhone {#pair .step}

Cuando Home te pida enlazar el iPhone, toca *Pair*; el enlace queda abierto durante 10 minutos. En el iPhone, abre Configuración → Bluetooth y elige `OpenXPlay Linux`.

## Abre CarPlay en la unidad principal {#head-unit .step}

Conecta la unidad principal al punto de acceso del retransmisor y abre `https://10.77.0.1:8443/` en su navegador; la página de administración muestra la dirección para la unidad principal. Acepta la advertencia del certificado la primera vez; [Solución de problemas](/es/troubleshooting#certificate-warning) explica por qué aparece. Para la app Carlink, consulta [App Carlink](/es/carlink).

El N1 ya está listo para el auto: dale 12 V y el retransmisor se inicia solo. [Uso en el auto](#in-car) muestra cómo conectarte.

## Uso en el auto {#in-car}

### Un adaptador {#in-car-one}

1. El iPhone se conecta solo al punto de acceso del retransmisor `OpenXPlay-Linux-XXXX` y se inicia CarPlay inalámbrico.
2. La unidad principal se conecta al mismo punto de acceso y abre `https://10.77.0.1:8443/` en su navegador.
3. Página de administración: conecta tu teléfono al punto de acceso del retransmisor y abre `https://openxplay-car.local:6975` o `https://10.77.0.1:6975`.

### Dos adaptadores {#in-car-two}

1. El iPhone se conecta solo al punto de acceso del retransmisor `OpenXPlay-Linux-XXXX` y se inicia CarPlay inalámbrico.
2. Inicia la app Carlink de la unidad principal; el retransmisor se conecta solo al Wi-Fi de Carlink de la unidad principal con el adaptador USB, consulta [App Carlink](/es/carlink). Para usar también el navegador de la unidad principal, la unidad principal se conecta al punto de acceso del retransmisor, igual que con un adaptador.
3. Página de administración: conecta tu teléfono al punto de acceso del retransmisor y abre `https://openxplay-car.local:6975` o `https://10.77.0.1:6975`. Mientras Carlink no esté conectado, también puedes conectarte al punto de acceso de administración `OpenXPlay-Admin` y abrir `https://openxplay-admin.local:6975` o `https://10.79.0.1:6975`. El punto de acceso de administración está desactivado de forma predeterminada; actívalo en **iPhone connection → Wireless network → Interfaces and network roles**.

`openxplay-car.local` funciona en la red del iPhone: el punto de acceso del retransmisor, o el punto de acceso del auto si lo elegiste; `openxplay-admin.local` funciona en las demás redes, como el punto de acceso de administración y la red de tu casa. Los iPhone, las Mac y las computadoras con Windows abren estas direcciones `.local`; muchos teléfonos Android no pueden, así que ahí usa la dirección IP. La primera vez, agrega la página a favoritos o a la pantalla de inicio, y no tendrás que volver a escribir la dirección.

## Red y Wi-Fi {#wifi}

- El N1 puede ejecutar su punto de acceso y una conexión Wi-Fi como cliente al mismo tiempo solo en un mismo canal compartido.
- Conecta un adaptador Wi-Fi USB y el retransmisor le asigna Carlink por sí solo; también puedes asignarlo a mano, o darle el punto de acceso de administración, en **iPhone connection → Wireless network → Interfaces and network roles** en la página de administración.
- El cable de red puede quedarse conectado: en casa, abre `https://openxplay-admin.local:6975` o la dirección que el router le dio al N1, o inicia sesión por SSH.

## Actualizaciones {#updates}

- **Retransmisor:** descarga y verifica el nuevo `.deb`, luego ejecuta `sudo openxplay-relay-update openxplay-relay_<version>_arm64.deb`. Si la nueva versión no arranca, restaura la anterior; consulta [Actualiza el retransmisor](/es/linux-devices#update).
- **Paquete de dispositivo:** instala el paquete más reciente como en [Instala el paquete de dispositivo](#device) y luego reinicia. El instalador nunca instala versiones anteriores de los paquetes ya instalados.
- **Kernel de Armbian:** después de que `armbian-update` instale un kernel nuevo, el paquete de dispositivo vuelve a corregir el PHY de Ethernet por sí solo.

## OpenXPlay Flasher {#flasher}

OpenXPlay Flasher tiene un perfil del N1 que instala el paquete de dispositivo y el retransmisor por SSH a través de la red, y su lista firmada de paquetes incluye ambos paquetes del N1. Se recomienda instalar a mano con esta guía. Flasher no instala Armbian.

## Desinstalación {#uninstall}

```sh
sudo apt-get purge openxplay-relay
sudo apt-get purge openxplay-phicomm-n1
```

El primer comando elimina el retransmisor y conserva la configuración, los enlaces y la identidad en `/var/lib/openxplay`; bórralos con `sudo rm -rf /var/lib/openxplay` cuando ya no los necesites. El segundo elimina el paquete de dispositivo y restaura el device tree de arranque original. Para volver al sistema original, consulta [¿Quieres conservar el sistema original?](#backup)

El paquete de dispositivo usa la licencia de OpenXPlay-Hardware: código abierto, sin uso comercial; consulta [Licencias](/es/licensing#licenses).

## Siguientes pasos {#next-steps}

- [Uso diario y configuración](/es/daily-use): cómo conectarte en cada viaje y la configuración de la página de la unidad principal.
- [HTTPS de confianza](/es/trusted-https): elimina la advertencia del certificado con un nombre de dominio gratuito.
- ¿Algo no funciona? Consulta [Solución de problemas](/es/troubleshooting) y cuéntale a la [comunidad](/es/community) cómo le fue a tu N1.
