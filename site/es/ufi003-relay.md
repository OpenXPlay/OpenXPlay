---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: Módem USB UFI003 como retransmisor (retransmisor Linux)
description: Configura un módem USB UFI003 como retransmisor Linux de OpenXPlay. La forma recomendada es dejar que un asistente de IA en tu computadora lea las instrucciones de instalación y lo instale con OpenXPlay Flasher; también puedes instalarlo tú mismo en la app Flasher. Luego agrega tu identidad de CarPlay, enlaza tu iPhone y abre CarPlay en el navegador de la unidad principal.
breadcrumb: UFI003 como retransmisor
schema: howto
howtoName: Mostrar CarPlay del iPhone en el navegador de la unidad principal con un módem USB UFI003 como retransmisor Linux
howtoTools:
  - iPhone con CarPlay
  - Módem USB UFI003
  - Una computadora con Windows 10 / 11 o macOS 12 o posterior
  - Identidad de accesorio de Apple (MFi) que aportas tú
  - Unidad principal Android con un navegador compatible con WebCodecs
next:
  text: Uso diario y configuración
  link: /es/daily-use
---

# Módem USB UFI003 como retransmisor

El UFI003 es un módem USB 4G con msm8916. Con el sistema OpenStick Debian 11 flasheado, ejecuta el retransmisor Linux de OpenXPlay: el retransmisor se inicia solo cuando el módem recibe energía, y la unidad principal muestra CarPlay en su propio navegador. [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware/tree/main/UFI003) tiene los archivos de soporte que necesita.

El Wi-Fi del UFI003 no tiene banda de 5 GHz, así que su punto de acceso funciona en 2.4 GHz.

## Dos formas de instalarlo {#install}

[OpenXPlay Flasher](https://github.com/OpenXPlay/OpenXPlay-Flasher), en tu computadora, se encarga de la instalación. Coloca tres capas en el módem: el sistema base (OpenStick Debian 11), el soporte del dispositivo y el retransmisor de OpenXPlay. Cuando sale una nueva versión del retransmisor, normalmente solo hay que actualizar la capa del retransmisor, sin volver a flashear.

| | Dejar que un asistente de IA lo instale (recomendado) | Instalarlo tú mismo con Flasher |
| --- | --- | --- |
| Qué haces tú | Envías un mensaje al asistente de IA de tu computadora y confirmas en los momentos clave | Abres la app Flasher y sigues sus pasos |
| Descarga y verificación de archivos | La IA los descarga según la lista firmada de paquetes y los verifica | Tú los descargas desde los enlaces que muestra Flasher; Flasher los verifica |
| Te conviene si | Ya usas un asistente de IA que puede ejecutar comandos, como Claude Code o Codex | Quieres ver cada paso tú mismo, o no usas un asistente así |

Ambas formas usan el mismo Flasher y la misma lista firmada de paquetes, con el mismo respaldo de las particiones del módem y las mismas comprobaciones de seguridad. Windows tiene compatibilidad nativa con adb y fastboot desde la 0.2.0-beta.2; más abajo encontrarás sus requisitos de controladores y los resultados de la validación en hardware.

## Dejar que un asistente de IA lo instale (recomendado) {#ai}

Escribimos [instrucciones de instalación para asistentes de IA](https://openxplay.org/agents/ufi003-install.md). Un asistente que las haya leído descarga Flasher y los archivos necesarios en tu computadora, verifica su SHA-256 e instala todo con la línea de comandos de Flasher; cuando algo sale mal, puede adaptarse a la situación real de tu computadora. Necesitas un asistente de IA que pueda ejecutar comandos en tu computadora, como [Claude Code](https://claude.com/claude-code) u [OpenAI Codex](https://github.com/openai/codex).

1. Conecta el UFI003 directamente a la computadora por USB, no a través de un hub sin alimentación. Si puedes, desconecta otros teléfonos.
2. Abre el asistente de IA y envíale este mensaje:

   ```text
   Read https://openxplay.org/agents/ufi003-install.md
   and follow it exactly to turn the UFI003 USB dongle plugged into
   this computer into an OpenXPlay relay with OpenXPlay Flasher.
   Tell me what each step will do before you run it, and wait for me
   to type the dongle's serial number before anything erases it.
   ```

3. Responde las preguntas del asistente. Estas cosas dependen de ti:
   - comprobar, por su número de serie, que el dispositivo que encontró el asistente es tu UFI003;
   - escribir tú mismo el número de serie del módem antes de que algo lo borre;
   - mantener el módem conectado, y la computadora encendida y sin suspenderse, durante la instalación;
   - agregar tu propia identidad de CarPlay, como se describe en [Agrega tu identidad de CarPlay](#step-identity).

Cuando termine la instalación, el asistente te dice cómo abrir la página de administración del retransmisor. Luego continúa desde [Elige la red](#step-network).

::: warning Revisa los comandos que ejecuta el asistente
El asistente de IA ejecuta comandos en tu computadora. Usa un asistente de confianza y revisa cada comando que quiera ejecutar; pídele que te explique lo que no entiendas. Las instrucciones le indican trabajar solo con este UFI003, no tocar los demás dispositivos de la computadora, nunca leer tus archivos de identidad, nunca desactivar la verificación de firma y nunca reescribir particiones con fastboot por su cuenta.
:::

## Instalarlo tú mismo con Flasher {#flasher}

Flasher es una app de escritorio para Windows y macOS. Conecta el UFI003 a la computadora por USB y Flasher reconoce el módem, muestra la versión de cada capa y te guía por la instalación.

::: info En Windows
Las versiones 0.2.0-beta.2 y posteriores son compatibles con adb y fastboot de forma nativa a través de WinUSB. No se necesita un servidor adb externo; un servidor adb que ya esté en ejecución se puede seguir usando.

Para listar dispositivos no se necesita un controlador adb, pero la comunicación requiere que la interfaz correspondiente use el controlador **WinUSB**. Si un dispositivo aparece en la lista pero no se puede comunicar con él, revisa su **interfaz ADB** en el Administrador de dispositivos, o su **interfaz fastboot** después de entrar al bootloader; cada modo puede necesitar que instales su controlador por separado. Cambia solo esa interfaz. No toques el **adaptador de red RNDIS** ni su controlador de red, y no reemplaces el controlador de todo el dispositivo USB compuesto.

Para un dispositivo fastboot UFI003 con el identificador de hardware `USB\VID_18D1&PID_D00D`, el [controlador firmado Android Bootloader Interface del Catálogo de Microsoft Update](https://www.catalog.update.microsoft.com/ScopedViewInline.aspx?updateid=76f2c233-6100-4a64-8bee-113c2da0991d) se verificó en Windows 11. Instálalo solo para el dispositivo fastboot con ese identificador exacto; no toques los controladores del adaptador RNDIS ni los de todo el dispositivo compuesto.
:::

### Avisos e instalación de controladores en Windows {#flasher-windows-drivers}

**¿La app avisa sobre los controladores?** En la 0.2.0-beta.2, los errores al leer un dispositivo o al abrir fastboot aparecen en el área de errores de la app. Si falta una interfaz WinUSB registrada, puede aparecer `needs a WinUSB driver`, `install the ADB/fastboot WinUSB driver` o `has no WinUSB … interface`. Estos detalles técnicos pueden quedar en inglés. La app no descarga ni instala controladores y no tiene un instalador de controladores de un clic.

1. Busca la interfaz ADB o fastboot de este UFI003 en el Administrador de dispositivos. Abre Propiedades → Detalles → Id. de hardware y revisa el identificador de su modo actual. No selecciones el adaptador RNDIS ni todo el dispositivo USB compuesto.
2. Descarga y extrae un controlador firmado que corresponda a ese identificador de hardware, a la versión de Windows y a la arquitectura. El controlador del Catálogo de Microsoft Update mencionado arriba cubre la interfaz fastboot verificada `USB\VID_18D1&PID_D00D`; otros identificadores necesitan su propio controlador correspondiente.
3. Haz clic con el botón derecho en esa interfaz, elige Actualizar controlador → Buscar controladores en mi equipo y selecciona la carpeta extraída. Consulta las [instrucciones de Microsoft para la instalación manual](https://support.microsoft.com/en-us/windows/update-drivers-through-device-manager-in-windows-ec62f46c-ff14-c91d-eead-d7126dc1f7b6). Mantén activada la comprobación obligatoria de la firma de controladores.
4. Vuelve a Flasher y elige Read again. ADB y fastboot son interfaces distintas, así que la interfaz fastboot que aparezca puede necesitar otra instalación de controlador. Si falló una tarea de instalación, sigue las indicaciones de la app para volver a leer el dispositivo y elige Repair; no flashees particiones a mano.

Si al conectar el módem no aparece ningún dispositivo USB nuevo en el Administrador de dispositivos, revisa primero la alimentación, la conexión USB y que esté en un puerto USB directo. Esto es distinto de un dispositivo que aparece en la lista pero al que le falta el controlador de comunicación. No desconectes el módem para diagnosticar mientras el flasheo está en curso.

::: info Verificado en hardware con Windows
La compilación oficial 0.2.0-beta.2 para Windows amd64 completó una instalación en un UFI003 desde el Android 4.4 original hasta OpenStick Debian 11 (kernel `5.15.0-handsomekernel+`), el soporte del dispositivo 0.2.1 y el retransmisor 0.1.5~beta.2. Pasaron los 49 pasos de instalación y las comprobaciones de capas, incluidos el respaldo y la restauración automáticos de las cuatro particiones de calibración del módem. También pasaron por separado una actualización del retransmisor, la identificación del dispositivo fastboot y la transferencia de datos a la RAM. Los controladores siguen teniendo que corresponder a las interfaces USB y los identificadores de hardware reales del dispositivo.

La lista firmada de paquetes recomienda el [paquete de soporte del dispositivo](https://github.com/OpenXPlay/OpenXPlay-Hardware/releases) corregido, versión 0.2.1 o posterior. Mantén activada la verificación de firma y usa archivos que coincidan con la lista.
:::

::: details Descarga y abre Flasher {#flasher-download}
Elige **0.2.0-beta.2 o posterior**, incluidas las versiones preliminares, en [Releases](https://github.com/OpenXPlay/OpenXPlay-Flasher/releases). Descarga la compilación para tu sistema y compara su SHA-256 con el archivo `SHA256SUMS` de esa versión. Las compilaciones no están firmadas con un certificado de Apple ni de Microsoft, así que el sistema pide confirmación antes de abrirlas la primera vez.

- **macOS 12 o posterior** (Apple silicon e Intel, `OpenXPlay-Flasher-<version>-macos-universal.dmg`): arrastra la app a Aplicaciones y ábrela una vez. En macOS 15 o posterior, cuando diga que la app no se abrió, elige Listo, luego ve a Configuración del Sistema → Privacidad y seguridad y elige Abrir igualmente junto al aviso sobre OpenXPlay Flasher. En macOS 12 a 14, haz clic en la app con la tecla Control presionada, elige Abrir y luego Abrir de nuevo.
- **Windows 10 u 11** (`openxplay-flasher-windows-amd64.exe`, o `-arm64.exe` en PC con Arm): cuando aparezca Windows protegió su PC, elige Más información y luego Ejecutar de todas formas. Si la app dice que falta el entorno de ejecución Microsoft Edge WebView2, instálalo y vuelve a abrir la app.
:::

Una vez abierto, Flasher te guía por estos pasos:

1. **Conectar**: conecta el UFI003 a la computadora. Flasher muestra el número de serie del módem y la versión de cada capa. Un módem nuevo todavía ejecuta su firmware original y aparece en la lista de *other Android devices … connected and ignored*, con su modelo (normalmente `msm8916_32_512`) y su número de serie; revísalos, luego elige *This is a UFI003 with its original firmware*, y Flasher lee el modelo para confirmarlo.
2. **Elegir**: la acción sugerida aparece primero, por ejemplo *Install OpenXPlay from the original firmware* para un módem nuevo o *Install / update relay* para uno que ya está configurado. Las demás acciones que borran el módem (reinstalar el sistema base, reinstalación completa, reparación) están en *Reflash (erases the device)*.
3. **Preparar**: Flasher enumera cada archivo que necesita con su SHA-256 y sus enlaces de descarga, pero no descarga nada por sí mismo. Descarga los archivos desde los enlaces o desde otra fuente de confianza y luego elige *Choose file…* o *Choose several files…*. Flasher reconoce los archivos por su SHA-256, así que sus nombres no importan. No los muevas ni los borres hasta que termine la instalación.
4. **Respaldar** (solo cuando se flashea el sistema base): Flasher lee del módem las particiones `modemst1`, `modemst2`, `fsc` y `fsg` y las guarda en `OpenXPlay Backups`, dentro de tu carpeta Documentos. Contienen datos de calibración del módem exclusivos de este módem, así que conserva esa carpeta para siempre. El bootloader original no puede leer esas particiones, así que en una instalación desde el firmware original, Flasher primero reemplaza el bootloader y borra la partición boot, luego hace el respaldo, e instala el sistema solo cuando el respaldo se completó correctamente. Las acciones que borran el módem también te piden escribir su número de serie.
5. **Flashear**: Flasher primero muestra qué hace esta instalación y cuánto tarda aproximadamente (de 6 a 7 minutos desde el firmware original). El módem se reinicia varias veces; no lo desconectes. Si la conexión se pierde en el camino, vuelve a conectarlo y elige *Repair*: Flasher continúa donde se detuvo y restaura esas cuatro particiones desde el respaldo anterior.
6. **Listo**: Flasher comprueba la versión de cada capa y, en *Next steps*, ofrece botones para [agregar tu identidad de CarPlay](#step-identity) y para abrir la página de administración del retransmisor por USB.

::: details Lista de paquetes y firma {#flasher-catalog}
Flasher lee de este sitio web una lista firmada de paquetes con la versión, los enlaces de descarga y el SHA-256 de cada capa. La firma demuestra que la lista proviene de OpenXPlay, y cada archivo que elijas debe coincidir con el SHA-256 que aparece en ella. Si necesitas tu propia lista de paquetes, puedes desactivar *Verify the package list signature* en la configuración; los archivos se siguen comprobando con el SHA-256 de la lista, y los archivos del sistema base deben seguir coincidiendo exactamente con OpenStick v1.
:::

## Después de la instalación {#after-install}

Sin importar cómo lo instalaste, los siguientes pasos son los mismos.

## Agrega tu identidad de CarPlay {#step-identity .step}

Los paquetes de instalación nunca contienen una identidad de accesorio de Apple (MFi); tú aportas la tuya. Con el módem conectado a la computadora por USB, abre Flasher y elige *Choose identity files or ZIP…* en *Next steps*. Selecciona la clave privada y el certificado (DER o PEM, en cualquier orden y con cualquier nombre de archivo), o un ZIP que contenga `identity.pk8` y `certificate.p7b`. Flasher los copia al módem por USB y reinicia el retransmisor.

## Abre la página de administración {#step-admin .step}

Con el módem conectado a la computadora por USB, elige *Open the relay admin page over USB* en *Next steps* de Flasher. En el auto, conecta un teléfono al punto de acceso del retransmisor `OpenXPlay-Linux-XXXX` (la contraseña es `openxplay` a menos que definas una propia) y luego abre `https://openxplay-car.local:6975` o `https://10.77.0.1:6975`. El navegador muestra una advertencia de certificado; continúa a la página. La contraseña inicial es `openxplay`, que también aparece en la página de inicio de sesión; después de iniciar sesión, la página te pide definir la tuya.

Home muestra hasta dónde llegó la conexión, iPhone → este retransmisor → auto, con debajo solo lo único que hay que hacer ahora. Toca cualquier paso para ver sus detalles y cómo resolverlo. El engranaje en la parte superior de Home abre la configuración.

Con el punto de acceso del auto (consulta el siguiente paso), conecta el teléfono al punto de acceso del auto y abre `https://openxplay-car.local:6975`, o la IP que el punto de acceso del auto le dio al retransmisor: `https://<IP del retransmisor>:6975/`. Los iPhone, las Mac y las computadoras con Windows abren direcciones `.local`; muchos teléfonos Android no, así que ahí usa la dirección IP. Una dirección escrita sin `https://` también se abre. El UFI003 tiene un solo radio Wi-Fi, así que no puede ejecutar el punto de acceso de administración.

## Elige la red {#step-network .step}

En la página de administración, en **Settings → iPhone connection → Wireless network**, elige cómo llegan al retransmisor el iPhone y la unidad principal:

- **This relay’s hotspot** (la opción predeterminada): abre el punto de acceso propio del retransmisor; el iPhone se conecta a él automáticamente y la unidad principal también se conecta.
- **Use the car’s hotspot**: el retransmisor, el iPhone y la unidad principal se conectan al punto de acceso del auto, o a otra red existente de 2.4 GHz.

El UFI003 muestra CarPlay solo en el navegador de la unidad principal; Carlink necesita un segundo adaptador Wi-Fi, consulta [App Carlink](/es/carlink).

## Enlaza el iPhone {#step-pair .step}

Cuando Home te pida enlazar el iPhone, toca *Pair*; el enlace queda abierto durante 10 minutos. En el iPhone, abre Configuración → Bluetooth y elige `OpenXPlay Linux`. Para un iPhone nuevo, elimina el dispositivo enlazado anterior en Home o en Settings → iPhone connection.

## Ábrelo en el navegador de la unidad principal {#step-open .step}

Conecta la unidad principal a la red del retransmisor y abre `https://10.77.0.1:8443/` (con el punto de acceso propio del retransmisor) o `https://openxplay-car.local:8443/`. Acepta la advertencia del certificado la primera vez; [Solución de problemas](/es/troubleshooting#certificate-warning) explica por qué aparece.

Si *Require pairing code* está activado en la página de administración, en Settings → Head-unit access, ingresa el código de 8 dígitos que muestra el retransmisor.

## Instalar por línea de comandos sin Flasher {#manual}

Si quieres usar solo la línea de comandos y no Flasher, puedes flashear el módem a mano y luego instalar el paquete de dispositivo y el paquete del retransmisor. Así te saltas el respaldo y las comprobaciones de Flasher, y el flasheo reemplaza el sistema original del módem, así que asegúrate de entender cada paso.

::: details Mostrar los pasos por línea de comandos

### Flashea la imagen base {#step-image}

Flashea la imagen OpenStick Debian 11 (kernel `5.15.0-handsomekernel+`, aarch64) en el UFI003. Las descargas, las sumas de verificación y las precauciones que debes leer antes de flashear están en [Flashear la imagen base del UFI003](/es/ufi003-flash).

### Instala el paquete de dispositivo {#step-device}

En [Releases](https://github.com/OpenXPlay/OpenXPlay-Hardware/releases) de OpenXPlay-Hardware, elige la versión `ufi003-device-v` más reciente (se requiere 0.2.1 o posterior), descarga `openxplay-ufi003-device-<version>.tar.gz` y `SHA256SUMS` y verifícalos. Copia el paquete al módem y abre su shell (root):

```sh
V=0.2.1
adb push openxplay-ufi003-device-$V.tar.gz /root/
adb shell
```

Asigna a `V` la versión que descargaste. En el módem, asigna `V` de la misma forma, luego descomprime el paquete y ejecuta el instalador. `--dry-run` lo revisa todo sin cambiar nada; después de la instalación, reinicia:

```sh
V=0.2.1
cd /root
tar -xzf openxplay-ufi003-device-$V.tar.gz
sh openxplay-ufi003-device-$V/install-device.sh --dry-run
sh openxplay-ufi003-device-$V/install-device.sh
reboot
```

Después del reinicio, vuelve a abrir `adb shell` y comprueba el dispositivo con `--verify`:

```sh
V=0.2.1
sh /root/openxplay-ufi003-device-$V/install-device.sh --verify
```

El paquete de dispositivo trae los paquetes de Debian que necesita, así que se instala sin conexión a internet. Agrega el módulo Bluetooth RFCOMM que necesita CarPlay inalámbrico, un controlador Bluetooth corregido, una protección de Bluetooth y el perfil de host, y activa la sincronización de la hora.

### Instala el retransmisor {#step-install}

En [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases), elige la versión `linux-v` más reciente, descarga el `.deb` y `SHA256SUMS` y verifícalos; luego ejecuta en tu computadora:

```sh
V=0.1.6
adb push openxplay-relay_${V}_arm64.deb /root/
adb shell dpkg -i /root/openxplay-relay_${V}_arm64.deb
```

Asigna a `V` la versión más reciente. El paquete de dispositivo ya instaló las dependencias, así que no se necesita acceso a internet. [Instala el retransmisor](/es/linux-devices#install) describe lo que configura el paquete.

Para compilarlos tú mismo: el paquete de dispositivo con `UFI003/package/build-bundle.sh` en [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware), y el paquete del retransmisor con `rust/packaging/build-deb.sh` en [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay).

Luego continúa desde [Abre la página de administración](#step-admin). Sin Flasher, agrega tu identidad de CarPlay en la página de administración, en **Settings → Identity and certificates**, o [coloca los archivos de identidad a mano](/es/linux-devices#identity).

:::

## Siguientes pasos {#next-steps}

- En autos como el XPeng G6, consulta la configuración recomendada en [Unidades principales](/es/head-units), por ejemplo ajustar los cuadros por segundo a 30 en 2.4 GHz: cámbialo en la página de administración, en **Settings → CarPlay picture → Frame rate**, y la página de la unidad principal lo sigue.
- Para reportar un problema, guarda los registros como archivo en **Settings → Logs**, o envíalos y mándanos el ID del registro.
- [HTTPS de confianza](/es/trusted-https): elimina la advertencia del certificado con un nombre de dominio gratuito.
- ¿Algo no funciona? Consulta [Solución de problemas](/es/troubleshooting).
