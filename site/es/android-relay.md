---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: 'Teléfono Android como retransmisor: CarPlay en el navegador de la unidad principal'
description: 'Configura paso a paso un teléfono Android como retransmisor de OpenXPlay. Instala OpenXPlay Relay, responde su asistente de configuración (tu auto, cómo muestra CarPlay el auto, cómo se conecta el iPhone, la red), enlaza tu iPhone y luego abre CarPlay en el navegador de la unidad principal. No se instala nada en la unidad principal.'
breadcrumb: Teléfono Android como retransmisor
schema: howto
howtoName: Mostrar CarPlay del iPhone en el navegador de la unidad principal con un teléfono Android como retransmisor
howtoTools:
  - iPhone con CarPlay
  - Teléfono Android (Android 8.0 o posterior) con la app OpenXPlay Relay
  - Identidad de accesorio de Apple (MFi) que aportas tú
  - Unidad principal Android con un navegador compatible con WebCodecs
next:
  text: Uso diario y configuración
  link: /es/daily-use
---

# Teléfono Android como retransmisor

La configuración recomendada: un teléfono Android como retransmisor y el navegador propio de la unidad principal para mostrar CarPlay. No se instala nada en la unidad principal. La primera configuración toma unos 10 minutos. Esta guía corresponde a OpenXPlay Relay 0.2.6.

::: tip Antes de empezar
- Un iPhone con CarPlay
- Un teléfono con Android 8.0 o posterior (Android 10 o posterior para [Carlink](/es/carlink))
- Una identidad de accesorio de Apple (MFi): `identity.pk8` y `certificate.p7b`, que [aportas tú](/es/quick-start#mfi-identity)
:::

## Comprueba el navegador de la unidad principal {#step-check .step}

En el navegador de la unidad principal, abre [openxplay.org/es/check](/es/check). La página prueba si el navegador puede decodificar el video de CarPlay; continúa cuando indique que el navegador funciona. Si no, prueba en su lugar la [app Carlink](/es/carlink), [CarLife](/es/carlife) o la [transmisión inalámbrica](/es/wireless-display). En un Tesla, consulta [Tesla](/es/tesla).

## Instala OpenXPlay Relay {#step-install .step}

En el teléfono retransmisor, descarga e instala [openxplay-relay.apk](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk) (la versión más reciente). Si Android lo pide, permite instalar apps desde tu navegador o tu administrador de archivos.

::: details ¿Necesitas una versión anterior o quieres compilarla tú?
Las versiones anteriores están en [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases), y lo que cambió en cada una está en el [historial de cambios](/es/changelog). También puedes compilar la app tú mismo como se describe en el README de [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay).
:::

## Responde el asistente de configuración {#step-guide .step}

La primera vez que abres la app, un asistente de configuración te lleva por algunas páginas; una barra en la parte superior muestra cuánto avanzaste.

1. **Tu auto:** elige la marca y el modelo; el año puede quedar en *Not sure*. La lista incluye XPeng, Tesla y ZEEKR; si tu auto no aparece, elige *Other* y escribe su nombre. Cada auto recibe una configuración distinta: el XPeng G6 2023 viene con los datos de su pantalla, un Tesla necesita la opción del [navegador de Tesla](/es/tesla) y, para un ZEEKR, el asistente sugiere [HTTPS de confianza](/es/trusted-https).
2. **Car display:** elige *Car browser*. Si la unidad principal no tiene un navegador que sirva, consulta [App Carlink](/es/carlink), y también las opciones experimentales [Transmisión inalámbrica](/es/wireless-display) (DLNA, Miracast) y [CarLife](/es/carlife).
3. **iPhone connection:** elige *Wireless*: en el auto, el iPhone se conecta solo por Bluetooth y Wi-Fi. *USB cable* no se recomienda: el teléfono retransmisor tiene que alimentar al iPhone a través del cable, y solo algunos cables funcionan; un iPhone con USB-C en un cable USB-C a USB-C normalmente no se detecta (consulta [Solución de problemas](/es/troubleshooting#usb-iphone-not-found)). La app te pide confirmación cuando lo eliges.
4. **Red inalámbrica:** el iPhone, el teléfono retransmisor y la unidad principal deben poder comunicarse entre sí. Elige una opción para tu auto; ábrela para ver los detalles:

::: details Wi-Fi Direct (recomendado): el teléfono retransmisor se conecta al punto de acceso de la unidad principal o a otra red Wi-Fi {#network-wifi-direct}
El iPhone se conecta directamente al teléfono retransmisor. La unidad principal llega al teléfono retransmisor a través de la conexión Wi-Fi normal del teléfono, por ejemplo el punto de acceso del auto. No está disponible junto con Carlink, que puede reemplazar el grupo Wi-Fi Direct de CarPlay: en ese caso el asistente recomienda *This phone’s hotspot*.
:::

::: details This phone’s hotspot: la unidad principal no tiene punto de acceso, pero puede conectarse a una red Wi-Fi {#network-hotspot}
El iPhone y la unidad principal se conectan al punto de acceso del teléfono retransmisor. La app no puede cambiar la configuración del punto de acceso de Android, así que el nombre y la contraseña del punto de acceso deben coincidir en ambos lados. Primero elige una forma; el asistente no preselecciona ninguna y solo avanza cuando eliges:

- **Copiar a la configuración (recomendado):** la app sugiere un nombre (`OpenXPlay-A-…`) y una contraseña de 16 caracteres. Toca *Copy name and open settings* y pégalo como nombre del punto de acceso en la configuración del punto de acceso de Android; vuelve a la app, toca *Copy password and open settings* y pégala como contraseña. Elige la seguridad y la banda que la app muestra abajo, luego guarda la configuración y activa el punto de acceso.
- **Use my existing hotspot:** conserva un punto de acceso que configuraste tú, e ingresa su nombre y contraseña en la app.

Elige la banda de 5 GHz, tanto en *Hotspot band* en la app como en la configuración del punto de acceso de Android: en 2.4 GHz la imagen se entrecorta con facilidad. Vuelve a 2.4 GHz solo si la unidad principal no puede conectarse a un punto de acceso de 5 GHz. Algunos teléfonos abren el punto de acceso solo en 2.4 GHz mientras están conectados a Wi-Fi; desconecta primero el Wi-Fi. Otros desactivan el Wi-Fi cuando el punto de acceso está activo, y así Carlink no puede funcionar.
:::

::: details Use the car’s hotspot: todos se conectan al punto de acceso de la unidad principal {#network-car-hotspot}
El iPhone y el teléfono retransmisor se conectan al punto de acceso del auto. Conecta primero el teléfono retransmisor y guárdalo en la app; el punto de acceso debe permitir que los dispositivos se comuniquen entre sí.
:::

Cuando tocas *Next* después de elegir la red, la app te recuerda revisar en el iPhone, una vez que se haya conectado, que el Modo de datos reducidos esté desactivado para esta red Wi-Fi; toca *Got it* para continuar. Consulta [Empieza a usarlo](#step-use).

5. **Get ready:** la página muestra solo lo que todavía falta; complétalo. Lo haces una sola vez; la app lo recuerda.
   - **Permisos:** dispositivos cercanos (Bluetooth), dispositivos Wi-Fi cercanos, notificaciones y micrófono. CarPlay ofrece Siri y llamadas solo cuando el micrófono está permitido. USB y la opción de Tesla también piden el consentimiento de VPN de Android.
   - **Importar la identidad de CarPlay:** selecciona `identity.pk8` y `certificate.p7b` juntos o uno tras otro, en cualquier orden, o un ZIP que los contenga. Si eliges solo uno, la app te pide el otro.
   - **Enlazar el iPhone** (inalámbrico): permite que el teléfono retransmisor sea visible cuando lo pida y luego, en el iPhone, abre Configuración → Bluetooth, elige el teléfono retransmisor y permite CarPlay.
   - **Guardar el punto de acceso del auto** (solo con *Use the car’s hotspot*).
6. **Ready to start:** revisa el resumen. *Connect automatically* está activado: la próxima vez que abras la app, se iniciará tras una breve cuenta regresiva. *Start on boot* inicia el retransmisor cuando enciende el teléfono. Si la página muestra *Battery optimization*, tócalo y deja que OpenXPlay Relay funcione en segundo plano sin restricciones; de lo contrario, el teléfono puede pausar el retransmisor cuando la pantalla está apagada o hay otra app abierta, y la página de la unidad principal deja de funcionar. Algunos teléfonos también tienen ajustes propios del fabricante para inicio automático y ahorro de batería: ábrelos desde Settings → Background en la app.

## Conecta la red de la unidad principal {#step-network .step}

Conecta la unidad principal y el teléfono retransmisor a la red que elegiste:

- **Wi-Fi Direct:** activa el punto de acceso Wi-Fi de la unidad principal y conéctate a él desde el teléfono retransmisor.
- **This phone’s hotspot:** activa el punto de acceso del teléfono retransmisor y conéctate a él desde la unidad principal.
- **Use the car’s hotspot:** activa el punto de acceso de la unidad principal y conéctate a él desde el teléfono retransmisor; el iPhone se conecta solo.

::: warning Protege el punto de acceso con contraseña
El retransmisor Android no usa código de enlace: abrir la dirección basta para conectarse. Asegúrate de ponerle contraseña al punto de acceso y deja que solo tus propios dispositivos se conecten.
:::

## Inicia CarPlay {#step-start .step}

En la última página del asistente, toca *Start CarPlay*. Para la primera conexión, mantén el iPhone desbloqueado y cerca del teléfono retransmisor.

La pantalla principal de la app muestra tres mosaicos, el iPhone, este teléfono y el auto; los enlaces entre ellos se llenan a medida que se establece la conexión. Debajo hay una línea que dice qué está pasando y como máximo un botón. Si algo todavía está desactivado, como el Bluetooth o el punto de acceso, el botón lo resuelve, o la app espera e inicia cuando se active. Toca un mosaico, o desliza el panel hacia arriba, para ver cada paso con sus detalles.

Cuando todavía no se conoce ninguna pantalla del auto, CarPlay espera hasta 20 segundos a que la unidad principal informe su tamaño; *Start now* omite la espera. Cuando el paso diga *Open this address in the car’s browser*, la dirección aparece debajo con un botón para copiarla: empieza con `https://` y termina en `:8443`, por ejemplo `https://192.168.43.20:8443/`.

## Abre la dirección en el navegador de la unidad principal {#step-open .step}

1. Escribe la dirección de la pantalla principal en el navegador de la unidad principal. Fíjate en que empieza con `https://`, no con `http://`, e incluye el número de puerto después de los dos puntos.
2. La primera vez, el navegador advierte que no puede verificar el certificado. Es lo esperado: elige *Configuración avanzada* (o algo similar) y continúa a la página.
3. Agrega la página a favoritos para abrirla directamente la próxima vez.

::: details ¿Por qué aparece la advertencia del certificado y es seguro?
La conexión sigue cifrada. Los navegadores permiten decodificar video con WebCodecs solo en páginas seguras, así que el retransmisor sirve la página por HTTPS; el retransmisor crea su propio certificado, que ninguna autoridad pública firmó, por lo que el navegador no puede verificarlo y muestra una advertencia. Comprueba que la dirección sea la de tu retransmisor y continúa. Consulta [Solución de problemas](/es/troubleshooting#certificate-warning); para eliminar la advertencia de forma definitiva, consulta [HTTPS de confianza](/es/trusted-https).
:::

## Empieza a usarlo {#step-use .step}

Cuando la página pida un toque, toca la pantalla una vez: la página pasa a pantalla completa, y ese toque no llega a CarPlay. Luego CarPlay funciona en la pantalla de la unidad principal y responde a tus toques; la pantalla principal dice *CarPlay is live*.

::: tip Desactiva el Modo de datos reducidos en el iPhone
Con el Modo de datos reducidos activado para la red Wi-Fi del retransmisor, es posible que el iPhone no se conecte a CarPlay. Cuando el iPhone se haya conectado, abre Configuración → Wi-Fi en el iPhone, toca ⓘ junto a esta red Wi-Fi y comprueba que Modo de datos reducidos esté desactivado.
:::

De forma predeterminada, el sonido de CarPlay se reproduce por el Bluetooth del auto: mantén el iPhone enlazado con el auto y elige Bluetooth como fuente de audio del auto. Para reproducir el sonido en la página de la unidad principal, consulta [No hay sonido](/es/troubleshooting#no-sound).

Para cambiar la imagen, el sonido o la pantalla completa, toca el ícono de OpenXPlay en CarPlay: se despliega la configuración de la página. Consulta [Configuración de la página de la unidad principal](/es/daily-use#web-settings).

## Siguientes pasos {#next-steps}

- [Uso diario y configuración](/es/daily-use): cómo conectarte en cada viaje a partir de ahora, y la configuración de la app.
- [HTTPS de confianza](/es/trusted-https): elimina la advertencia del certificado con un nombre de dominio gratuito.
- ¿Algo no funciona? Consulta [Solución de problemas](/es/troubleshooting).
