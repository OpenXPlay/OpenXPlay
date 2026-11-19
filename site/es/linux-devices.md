---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: 'Retransmisor Linux en otros dispositivos: requisitos e instalación manual'
description: Comprueba si una placa, un TV box o un módem USB con Linux arm64 puede ejecutar el retransmisor Linux de OpenXPlay, instala el retransmisor a mano desde su paquete Debian, agrega tu identidad de CarPlay, enlaza tu iPhone, y actualiza o elimina el retransmisor.
breadcrumb: Retransmisor Linux en otros dispositivos
schema: howto
howtoName: Instalar a mano el retransmisor Linux de OpenXPlay en un dispositivo Linux arm64
howtoTools:
  - iPhone con CarPlay
  - Dispositivo Linux arm64 con systemd, NetworkManager y un Wi-Fi capaz de funcionar como punto de acceso (además de BlueZ y Bluetooth Classic para conectar el iPhone de forma inalámbrica)
  - Identidad de accesorio de Apple (MFi) que aportas tú
  - Unidad principal Android con un navegador compatible con WebCodecs
next:
  text: Uso diario y configuración
  link: /es/daily-use
---

# Retransmisor Linux en otros dispositivos <Badge type="info" text="Avanzado" />

Además del UFI003, el retransmisor Linux de OpenXPlay puede funcionar en otros dispositivos Linux arm64: placas, TV boxes y módems USB. Esta página es para quienes se sienten cómodos con SSH y la línea de comandos. Muestra cómo saber si un dispositivo puede ejecutar el retransmisor, cómo instalarlo a mano y cómo actualizarlo y eliminarlo. Como siempre, no se instala nada en la unidad principal.

El UFI003 tiene su propio instalador guiado: consulta [Módem USB UFI003 como retransmisor](/es/ufi003-relay). El Phicomm N1 también tiene su propia guía: consulta [Phicomm N1 como retransmisor](/es/phicomm-n1). OpenXPlay Flasher todavía no puede instalar el retransmisor en otros dispositivos.

::: warning Bajo tu propio riesgo
Instalar el retransmisor a mano en otro dispositivo es bajo tu propio riesgo. Cuéntale a la [comunidad](/es/community) qué funcionó y qué no, con el dispositivo, su sistema y la versión del retransmisor.
:::

## Requisitos {#requirements}

| Requisito | Por qué importa | Cómo comprobarlo | |
| --- | --- | --- | --- |
| ARM de 64 bits (aarch64) | Las versiones se compilan solo para aarch64. Son binarios estáticos de musl, así que la versión de glibc o de Debian no les importa. | `uname -m` muestra `aarch64`; para el `.deb`, `dpkg --print-architecture` muestra `arm64` | Obligatorio |
| systemd como init | El retransmisor funciona como el servicio de systemd `openxplay-relay.service`. | `ps -p 1 -o comm=` muestra `systemd` | Obligatorio |
| NetworkManager | `nmcli` crea cada punto de acceso y cada conexión Wi-Fi; su modo shared, con `dnsmasq-base`, asigna las direcciones (DHCP). | `systemctl is-active NetworkManager` | Obligatorio |
| BlueZ | El retransmisor usa `bluetoothd` a través de D-Bus y las herramientas `sdptool`, `hciconfig` y `btmgmt`. | `systemctl is-active bluetooth`; `command -v sdptool hciconfig btmgmt` | Obligatorio para la conexión inalámbrica y Carlink |
| `iw` | El retransmisor lee con él los modos, los canales y el país del adaptador Wi-Fi. | `command -v iw` | Obligatorio |
| Bluetooth Classic (BR/EDR) | CarPlay inalámbrico transmite iAP2 por RFCOMM, un protocolo de Bluetooth Classic. Un adaptador que solo tiene Bluetooth Low Energy no puede conectar el iPhone de forma inalámbrica. | `btmgmt info` incluye `br/edr` | Obligatorio para la conexión inalámbrica |
| RFCOMM en el kernel | Por el mismo motivo. Al kernel del UFI003 le faltaba; su paquete de dispositivo agrega `rfcomm.ko`. | `sudo modprobe rfcomm` | Obligatorio para la conexión inalámbrica |
| Wi-Fi capaz de funcionar como punto de acceso (modo AP) | Lo necesita el punto de acceso propio del retransmisor, la red predeterminada. | `iw list` muestra `AP` en *Supported interface modes* | Obligatorio |
| Puertos libres | 6975 TCP (página de administración), 8443 TCP (página de la unidad principal), 7000 en adelante (AirPlay), 5353 UDP (mDNS, que el retransmisor responde por sí mismo). | `ss -ltnup` | Obligatorio |
| Identidad de accesorio de Apple (MFi) | Sin ella, el retransmisor solo sirve la página de administración. | La aportas tú; consulta [Agrega tu identidad de CarPlay](#identity) | Obligatorio |
| Wi-Fi de 5 GHz | La banda automática usa 5 GHz cuando un canal de 5 GHz puede alojar el punto de acceso; si no, el canal 6 de 2.4 GHz. Con solo 2.4 GHz funciona (el UFI003 ejecuta CarPlay en esa banda); ajusta los cuadros por segundo a 30 en la página de la unidad principal. | `iw list`; `iw reg get` | No obligatorio |
| Un segundo adaptador Wi-Fi que pueda funcionar como cliente de 5 GHz | En un auto real, Carlink necesita que el retransmisor se conecte al Wi-Fi de 5 GHz del auto como cliente, en un adaptador que no esté ejecutando el punto de acceso del iPhone. Con un solo adaptador Wi-Fi, el retransmisor ofrece solo la salida al navegador. Carlink también usa Bluetooth LE; Wi-Fi Direct es opcional. | `nmcli device`; `btmgmt info` incluye `le` | Obligatorio para Carlink |
| Un puerto USB host (USB-A), con usbfs y TUN/TAP en el kernel | Para una conexión por cable, el iPhone se conecta a un puerto USB-A del retransmisor; el retransmisor lo controla a través de usbfs y lleva la red de CarPlay por una interfaz virtual TAP. | `ls /dev/bus/usb /dev/net/tun` | Obligatorio para USB |

El retransmisor en sí es pequeño. El 2026-10-15, la primera compilación de desarrollo del retransmisor Linux en Rust, inactiva en un UFI003 (382 MB de RAM) y sin sesión de CarPlay, usaba unos 2.9 MB de memoria residente más 1.5 MB para su proceso de salida, y unos 5 MB de disco.

| Sistema | |
| --- | --- |
| Debian 11 (bullseye), 12 (bookworm) y 13 (trixie) | El `.deb` se prueba en cada uno |
| OpenStick Debian 11 en el UFI003 (NetworkManager 1.30, BlueZ 5.55) | En uso |
| Armbian trixie en el Phicomm N1 (NetworkManager 1.52, BlueZ 5.82) | En uso |
| Debian 13 en una Raspberry Pi 5 | La placa de referencia de los desarrolladores; todavía no tiene paquete de dispositivo |

::: details Comandos para revisar un dispositivo {#check}
Ejecútalos en el dispositivo por SSH. Los comandos con `sudo` necesitan permisos de root.

```sh
uname -m; dpkg --print-architecture; . /etc/os-release; echo "$ID $VERSION_ID"
ps -p 1 -o comm=
systemctl is-active NetworkManager bluetooth
nmcli --version
nmcli device
command -v nmcli iw sdptool hciconfig btmgmt
sudo iw list
sudo iw reg get
printf '' | sudo btmgmt --index 0 info
sudo modprobe rfcomm && lsmod | grep rfcomm
ls /dev/bus/usb /dev/net/tun
ss -ltnup | grep -E ':(6975|8443|7000|5353)\b'
```

| Comando | Qué buscar |
| --- | --- |
| `uname -m`, `dpkg --print-architecture` | `aarch64` y `arm64`; el resto de la línea muestra la distribución y su versión |
| `ps -p 1 -o comm=` | `systemd` |
| `systemctl is-active` | `active`, dos veces |
| `nmcli device` | Las interfaces Wi-Fi (tipo `wifi`); un nombre distinto de `wlan0` necesita un [perfil de host](#host-profile) |
| `command -v` | Una ruta por herramienta; si falta una línea, falta una herramienta |
| `iw list` | `AP` en *Supported interface modes*; los canales de 5 GHz y sus indicadores |
| `iw reg get` | El país del Wi-Fi, que define los indicadores de los canales |
| `btmgmt info` | `br/edr` en *supported settings*, y `le` para Carlink |
| `modprobe rfcomm` | `rfcomm` en la lista de módulos; es solo una pista |
| `ls` | Existen ambas rutas; solo se necesita para conectar el iPhone por cable |
| `ss` | Nada, o solo programas que puedas detener |

Para su propio punto de acceso, el retransmisor prueba los canales de 5 GHz 36, 40, 44, 48 y del 149 al 165. Un canal puede alojar el punto de acceso solo si `iw list` no lo marca como disabled, no IR o radar detection; para conectarse a una red de 5 GHz basta con que el canal no esté disabled. Si ningún canal de 5 GHz cumple, el retransmisor usa el canal 6 de 2.4 GHz.

Conserva el `printf` vacío en la línea de `btmgmt`: `btmgmt` se queda colgado cuando su entrada es `/dev/null`. `--index 0` es el primer adaptador, `hci0`.

Después de instalarlo, **Diagnostics → This host** en la página de administración muestra lo que encuentra el propio retransmisor: RFCOMM; Bluetooth BR/EDR, LE y Secure Connections; compatibilidad con los modos AP y cliente de cada interfaz; los canales de 5 GHz que pueden alojar el punto de acceso; el país del Wi-Fi; y las herramientas que faltan. Confía en esa vista más que en estos comandos.
:::

## Instala el retransmisor {#install .step}

Toma la versión `linux-v` más reciente de [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases); ahora es `linux-v0.1.6`. Descarga el `.deb` y `SHA256SUMS`, verifica el SHA-256 y luego instala el paquete con sus dependencias:

```sh
V=0.1.6
base=https://github.com/OpenXPlay/OpenXPlay-Relay/releases/download/linux-v$V
curl -fL -O "$base/openxplay-relay_${V}_arm64.deb" -O "$base/SHA256SUMS"
sha256sum --ignore-missing -c SHA256SUMS
sudo apt-get install --no-install-recommends ./openxplay-relay_${V}_arm64.deb
```

Asigna a `V` la versión más reciente. Los nombres de archivo escriben una versión preliminar como `0.1.7-beta.1`; dentro del paquete, su versión es `0.1.7~beta.1`.

`apt-get` también instala `bluez`, `network-manager`, `iw`, `dnsmasq-base` e `init-system-helpers` 1.54 o posterior. El paquete:

- instala el retransmisor en `/opt/openxplay`;
- agrega el servicio de systemd `openxplay-relay.service`, habilitado e iniciado en la primera instalación;
- agrega el comando de actualización `/usr/sbin/openxplay-relay-update`;
- agrega dos archivos de configuración de NetworkManager: ahorro de energía del Wi-Fi desactivado y sin dirección MAC aleatoria al buscar redes;
- agrega una protección del reloj, que funciona con systemd-timesyncd y no hace nada con chrony.

Al eliminar el paquete, `/var/lib/openxplay` se conserva.

::: details Instalar desde el archivo tar {#tarball}
Descarga `openxplay-relay-<version>-linux-aarch64.tar.gz` y `SHA256SUMS` de la misma versión y verifícalos. El archivo tar no instala dependencias, así que instala primero `bluez`, `network-manager`, `iw` y `dnsmasq-base`. Luego:

```sh
tar -xzf openxplay-relay-$V-linux-aarch64.tar.gz
cd openxplay-relay-$V-linux-aarch64
sudo sh rust/packaging/install.sh bin/openxplay-relay bin/oxp-relay web admin
```
:::

::: details ¿Tu Wi-Fi no se llama wlan0? Agrega un perfil de host {#host-profile}
El retransmisor lee un perfil de host opcional, `/etc/openxplay/host.json`. Normalmente lo escribe un paquete de dispositivo; en otros dispositivos puedes escribirlo tú. Todos los campos son opcionales:

| Campo | Valor predeterminado |
| --- | --- |
| `model` | Ninguno |
| `devicePreset` | `auto`: detecta los módems MSM8916 y el Phicomm N1 a partir del device tree; si no, `generic` |
| `wifiInterface` | `wlan0` |
| `carlinkInterface` | Vacío: otro adaptador Wi-Fi, elegido automáticamente |
| `hotspotChannel` | `0`: automático |
| `bluetoothAdapter` | El `hciN` de número más bajo |
| `hotspotDownGapSeconds` | `15` (de 0 a 60): cuánto tiempo permanece apagado el punto de acceso antes de que se inicie el siguiente |
| `secureConnections` | `pairing-off`: Bluetooth Secure Connections desactivado solo mientras el enlace está abierto; o `untouched` |
| `bluetoothGuardStatus` | `/run/openxplay/bluetooth-guard.json` |

Por ejemplo, para Wi-Fi en `wlan1`:

```sh
sudo mkdir -p /etc/openxplay
echo '{"wifiInterface": "wlan1"}' | sudo tee /etc/openxplay/host.json
sudo systemctl restart openxplay-relay
```

Un solo campo no válido hace que el retransmisor ignore todo el archivo y muestre el error en la página de administración. La configuración se aplica en este orden, y cada nivel reemplaza al anterior: valores predeterminados integrados, el perfil de host, la configuración de la página de administración, la línea de comandos.
:::

## Abre la página de administración {#admin .step}

En un teléfono o una computadora en la misma red que el dispositivo, abre `https://<IP del dispositivo>:6975` (`hostname -I` en el dispositivo muestra sus direcciones). Donde se resuelven los nombres `.local`, también funciona `https://openxplay-admin.local:6975`, y `https://openxplay-car.local:6975` desde un teléfono conectado al punto de acceso del retransmisor; muchos teléfonos Android y navegadores de autos no los resuelven. El navegador muestra una advertencia sobre el certificado autofirmado del retransmisor; continúa a la página. La contraseña inicial es `openxplay`: inicia sesión y luego cámbiala.

El punto de acceso de administración opcional `OpenXPlay-Admin` está desactivado de forma predeterminada y necesita un segundo adaptador Wi-Fi. Cuando lo actives en la página de administración, conéctate a él y abre `https://openxplay-admin.local:6975` o `https://10.79.0.1:6975`.

::: details ¿Olvidaste la contraseña de administración? {#reset-password}
```sh
sudo systemctl stop openxplay-relay
sudo /opt/openxplay/bin/openxplay-relay --reset-admin-password
sudo systemctl start openxplay-relay
```

El segundo comando restablece la contraseña a `openxplay` y termina.
:::

## Agrega tu identidad de CarPlay {#identity .step}

Los paquetes de instalación nunca contienen una identidad de accesorio de Apple (MFi); tú aportas la tuya. En la página de administración, abre **Settings → Identity and certificates** y elige `identity.pk8` y `certificate.p7b`, o un ZIP que contenga ambos.

O coloca los archivos a mano, con root como propietario y modo 0600, y reinicia el retransmisor:

```sh
sudo install -D -m 0600 -o root -g root -t /var/lib/openxplay/mfi identity.pk8 certificate.p7b
sudo systemctl restart openxplay-relay
```

Si no tienes estos dos archivos pero sí otra fuente de autenticación, elige un servidor MFi remoto, o un chip de autenticación por I2C o mediante un adaptador CH341, en **Settings → Identity and certificates → MFi target**.

## Responde el asistente de configuración {#setup .step}

El asistente de configuración de la página de administración pregunta por:

1. **Tu auto**.
2. **Salida**: el navegador de la unidad principal, su app Carlink o ambos. Carlink necesita un segundo adaptador Wi-Fi; con uno solo, se ofrece únicamente el navegador. El navegador de un Tesla necesita su propia adaptación; consulta [Tesla](/es/tesla). [Transmisión inalámbrica](/es/wireless-display) y [CarLife](/es/carlife) no están disponibles en Linux.
3. **Conexión del iPhone**: *Wireless* (la opción predeterminada), o *USB cable* con el iPhone conectado a un puerto USB-A del retransmisor mediante un cable USB-A a Lightning o USB-A a USB-C; la unidad principal sigue llegando al retransmisor por Wi-Fi.
4. **Red**: *This relay’s hotspot* o *Use the car’s hotspot*. El punto de acceso propio del retransmisor es `OpenXPlay-Linux-XXXX` con la contraseña `openxplay` (WPA2), a menos que definas una propia.
5. **Preparación**: completa lo que aparece en la lista.

## Enlaza el iPhone {#pair .step}

Cuando Home te pida enlazar el iPhone, toca *Pair*; el enlace queda abierto durante 10 minutos. En el iPhone, abre Configuración → Bluetooth y elige `OpenXPlay Linux`.

Para cambiar a otro iPhone o volver a enlazar: elimina el dispositivo enlazado anterior en Home o en Settings → iPhone connection, olvida `OpenXPlay Linux` en la configuración de Bluetooth del iPhone y luego vuelve a abrir el enlace.

## Abre CarPlay en la unidad principal {#head-unit .step}

Conecta la unidad principal al punto de acceso del retransmisor y abre `https://10.77.0.1:8443/` en su navegador. El retransmisor toma la primera dirección `10.77.x.1` libre, y la página de administración muestra la dirección para la unidad principal; con *Use the car’s hotspot*, abre la dirección que aparece ahí. Acepta la advertencia del certificado la primera vez; [Solución de problemas](/es/troubleshooting#certificate-warning) explica por qué aparece.

Para la app Carlink, consulta [App Carlink](/es/carlink).

## Actualiza el retransmisor {#update}

En la página de administración, **About → Check for updates** muestra si existe una versión más reciente; elige el canal *Beta* para ver también las versiones preliminares. Descarga el nuevo `.deb` y `SHA256SUMS` y verifícalos como en [Instala el retransmisor](#install); luego ejecuta:

```sh
sudo openxplay-relay-update openxplay-relay_${V}_arm64.deb
```

El comando de actualización instala la nueva versión, espera a que el retransmisor se inicie y lo vigila durante 15 segundos para asegurarse de que no termine ni se reinicie; si la nueva versión no arranca, restaura la anterior. La configuración, los enlaces y la identidad están en `/var/lib/openxplay` y se quedan como están.

| Comando | Qué hace |
| --- | --- |
| `sudo openxplay-relay-update --list` | Muestra las versiones en caché |
| `sudo openxplay-relay-update --rollback` | Restaura la versión en caché más reciente que sea anterior a la actual |

Las versiones instaladas con el comando de actualización se guardan en caché en `/var/cache/openxplay/relay`, hasta 3. Para revertir, la versión actual también debe estar en la caché; la primera versión, instalada con `apt-get`, no está ahí.

## Registros y desinstalación {#uninstall}

Lee el registro del retransmisor desde este arranque, o síguelo en tiempo real:

```sh
journalctl -u openxplay-relay -b
journalctl -u openxplay-relay -f
```

Para reportar un problema, exporta los registros desde **Logs** en la página de administración.

Desinstala el retransmisor:

```sh
sudo apt-get purge openxplay-relay
```

La configuración, los enlaces, las claves y la identidad en `/var/lib/openxplay` se conservan; bórralos con `sudo rm -rf /var/lib/openxplay` cuando ya no los necesites.

## No compatible {#not-supported}

| Dispositivo o sistema | Motivo |
| --- | --- |
| OpenWrt y otros sistemas sin systemd o NetworkManager | El retransmisor necesita ambos |
| Placas ARM de 32 bits (armv7), x86 y RISC-V | No hay compilación para ellas |
| Adaptadores Bluetooth que solo tienen Bluetooth Low Energy | CarPlay inalámbrico necesita Bluetooth Classic (RFCOMM); una conexión por cable no necesita Bluetooth |
| ESP32 y otros microcontroladores | No ejecutan Linux |

## Siguientes pasos {#next-steps}

- [Uso diario y configuración](/es/daily-use): cómo conectarte en cada viaje y la configuración de la página de la unidad principal.
- [HTTPS de confianza](/es/trusted-https): elimina la advertencia del certificado con un nombre de dominio gratuito.
- ¿Algo no funciona? Consulta [Solución de problemas](/es/troubleshooting) y cuéntale a la [comunidad](/es/community) cómo le fue a tu dispositivo.
