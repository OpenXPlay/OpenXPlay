---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: 'Solución de problemas: advertencias de certificado, conexión, imagen y sonido'
description: Soluciones a problemas comunes de OpenXPlay — la advertencia del certificado, unidades principales que solo ven Wi-Fi de 2.4 GHz, enlace del iPhone por Bluetooth, CarPlay que no se conecta, navegadores no compatibles, video entrecortado, falta de sonido y el micrófono.
breadcrumb: Solución de problemas
schema: faq
---

# Solución de problemas

La mayoría de los problemas se deben al navegador de la unidad principal, a la banda del Wi-Fi o al enlace por Bluetooth. Busca tu problema según lo que ves; si no encuentras la respuesta, pregunta en la [comunidad](/es/community) e incluye el modelo de la unidad principal, la versión de su sistema, la forma de conexión que usaste y lo que pasó.

## Certificados {#certificates}

### ¿Por qué el navegador muestra una advertencia de certificado? {#certificate-warning}

El retransmisor sirve la página del receptor por HTTPS porque los navegadores permiten decodificar video con WebCodecs solo en páginas seguras. El retransmisor crea su propio certificado, que ninguna autoridad pública firmó, así que el navegador muestra una advertencia la primera vez.

- **¿Es seguro?** La conexión sigue cifrada. La advertencia significa que el navegador no puede verificar quién emitió el certificado. Comprueba que la dirección sea la de tu retransmisor y continúa (la opción suele estar en *Configuración avanzada*).
- **¿Por qué volvió a aparecer?** El retransmisor creó un certificado nuevo. El retransmisor Android lo hace cuando cambian sus direcciones de red; el retransmisor Linux lo hace cuando reemplaza archivos de certificado que se crearon mientras el reloj del dispositivo estaba mal.
- **¿Puedo evitarla?** Sí, con un nombre de dominio gratuito: el retransmisor obtiene un certificado de confianza para ese nombre, y la página se abre con él sin advertencia. Consulta [HTTPS de confianza](/es/trusted-https). En el retransmisor Android también puedes importar tu propio certificado (un archivo PKCS #12 `.p12`) en la app.

## Conexión {#connection}

### Mi unidad principal solo ve redes Wi-Fi de 2.4 GHz {#only-2-4-ghz}

Usa una red de 2.4 GHz para la unidad principal:

- El Wi-Fi del módem USB UFI003 no tiene banda de 5 GHz, así que su punto de acceso siempre es de 2.4 GHz.
- Con *This phone’s hotspot* en el retransmisor Android, la app no puede cambiar la configuración del punto de acceso de Android: ajusta la banda a 2.4 GHz en la configuración del punto de acceso de Android y luego elige también 2.4 GHz en *Hotspot band*, en Settings → iPhone connection → Network de la app.
- Con *Use the car’s hotspot*, la red debe ofrecer 2.4 GHz. De todos modos, el UFI003 solo ve redes de 2.4 GHz.

El UFI003 tiene un solo radio Wi-Fi, así que ofrece solo el navegador de la unidad principal, no [Carlink](/es/carlink).

### El iPhone no se enlaza por Bluetooth {#bluetooth-pairing}

Enlaza solo cuando el retransmisor esté listo para hacerlo:

- En el retransmisor Linux, toca *Pair* cuando Home, en la página de administración, te pida enlazar el iPhone. El enlace queda abierto durante 10 minutos. En el iPhone, abre Configuración → Bluetooth y elige `OpenXPlay Linux`.
- En el retransmisor Android, concede a OpenXPlay Relay el permiso “Dispositivos cercanos” y toca Permitir en el teléfono retransmisor cuando pida hacerse visible para tu iPhone.
- Si el iPhone olvidó el retransmisor, o es un iPhone nuevo, vuelve a abrir el enlace en el retransmisor. En el retransmisor Linux, primero elimina el dispositivo enlazado anterior en Home o en Settings → iPhone connection.
- Si hay varios teléfonos enlazados con el retransmisor, elige tu iPhone en Preferred iPhone, en la configuración.
- En el UFI003, una protección de Bluetooth reinicia el controlador Bluetooth cuando falla. Si la página de administración dice que el Bluetooth no se inició, desconecta el módem y vuelve a conectarlo.

### El iPhone no se conecta a CarPlay {#iphone-not-connecting}

Revisa esto en orden:

1. Mantén el iPhone cerca del retransmisor, con el Bluetooth y el Wi-Fi activados.
2. Asegúrate de que el retransmisor tenga una identidad de CarPlay válida. La app de Android no inicia CarPlay sin ella.
3. Con el Modo de datos reducidos activado para el Wi-Fi del retransmisor, es posible que el iPhone no se conecte: en el iPhone, abre Configuración → Wi-Fi, toca ⓘ junto a esta red Wi-Fi y desactiva Modo de datos reducidos.
4. Con *Use the car’s hotspot*, el iPhone, el retransmisor y la unidad principal deben estar en la misma red, y el router debe permitir que los dispositivos se comuniquen entre sí.
5. Revisa el estado del retransmisor en la app o en la página de administración: esperando al iPhone, conectando o conectado.
6. Después de cambiar el modo de red, el iPhone pasa solo a la nueva red y CarPlay se vuelve a conectar en unos 30 segundos.
7. Si sigue fallando, toca *Reconnect* en la página de administración.

### El retransmisor no encuentra el iPhone conectado por cable {#usb-iphone-not-found}

Un iPhone con USB-C en un cable USB-C a USB-C suele tomar el control del cable, así que el teléfono retransmisor pasa a ser el dispositivo USB y no puede ver el iPhone. A partir de la app de Android 0.1.5, la pantalla principal lo explica. Prueba con un adaptador USB-C OTG (USB-C a USB-A) en el teléfono retransmisor y un cable USB-A a USB-C hacia el iPhone; si el teléfono tiene un interruptor OTG, actívalo, y luego desconecta y vuelve a conectar. Un iPhone con Lightning funciona con un cable USB-C a Lightning. La conexión inalámbrica es la mejor opción.

### Con Carlink, la unidad principal se detiene en un 30 % aproximadamente {#carlink-stuck}

El Wi-Fi del teléfono retransmisor está desactivado. Carlink hace que el teléfono retransmisor se conecte a la red del auto como cliente Wi-Fi; activa el Wi-Fi (no hace falta que esté conectado a nada) y vuelve a conectarte. Algunos teléfonos desactivan el Wi-Fi cuando su punto de acceso está activo; esos teléfonos no pueden conectar además el iPhone a través del punto de acceso. Consulta [App Carlink](/es/carlink#stuck-30).

### La página dice “Relay unreachable” {#relay-unreachable}

La unidad principal no está en la red del retransmisor, o el retransmisor está apagado. Mantén encendido el retransmisor, conecta la unidad principal al punto de acceso del retransmisor (o a la red compartida) y abre la dirección que muestra el retransmisor.

## Imagen y sonido {#picture-and-sound}

### El navegador de la unidad principal dice “Video not supported” {#video-not-supported}

Al navegador le falta la decodificación de video con WebCodecs, o la página no se abrió por HTTPS. Abre la dirección `https://` del retransmisor, prueba otro navegador de la unidad principal si tiene uno, y ejecuta [Comprueba tu unidad principal](/es/check). Si ningún navegador funciona, prueba la [app Carlink](/es/carlink).

### El video se entrecorta {#stutter}

- Ejecuta [Comprueba tu unidad principal](/es/check). Si el navegador decodifica solo por software, el video puede entrecortarse.
- En la configuración del receptor web, prueba con menos cuadros por segundo o con el modo de reproducción *Speed*.
- En un retransmisor que solo tiene Wi-Fi de 2.4 GHz, como el UFI003, ajusta los cuadros por segundo a 30.
- En el retransmisor Android con Carlink, usa *This phone’s hotspot* para CarPlay inalámbrico y mantén activado el Wi-Fi del teléfono retransmisor.

### No hay sonido {#no-sound}

Primero revisa *CarPlay audio over the car’s Bluetooth (experimental)* en Settings → Sound (Settings → Audio en la página de administración de Linux). Está activado de forma predeterminada:

- **Activado:** el sonido no pasa por la página de la unidad principal; el iPhone lo reproduce por su propia conexión Bluetooth con el auto. Mantén el iPhone enlazado con el auto y elige Bluetooth como fuente de audio del auto. Si el sonido sale del iPhone, desactiva la opción.
- **Desactivado:** la página de la unidad principal reproduce el sonido; vuelve a conectar CarPlay después de desactivar la opción. Los navegadores bloquean el sonido hasta que tocas la página; si el receptor dice que el sonido está en pausa, toca la pantalla una vez. Si sigue sin haber sonido, ejecuta [Comprueba tu unidad principal](/es/check): el navegador necesita AudioWorklet para reproducir el audio de CarPlay.

### Siri o las llamadas no me escuchan {#microphone}

Mientras *CarPlay audio over the car’s Bluetooth* esté activado (la opción predeterminada), Siri y las llamadas también pasan por la conexión Bluetooth del iPhone con el auto y no usan el micrófono del navegador: comprueba que el iPhone esté conectado al Bluetooth del auto.

Con la opción desactivada y CarPlay reconectado, el navegador pide acceso al micrófono la primera vez que CarPlay necesita tu voz; elige Permitir. El micrófono funciona solo por HTTPS. En el retransmisor Android, permite también el acceso al micrófono; de forma predeterminada usa el micrófono de la unidad principal; para usar el del teléfono retransmisor, activa *Microphone source* en Settings → Developer options.

## ¿Sigues con problemas? {#still-stuck}

Pregunta en la [comunidad](/es/community), con el modelo de la unidad principal, la versión de su sistema, la forma de conexión que usaste y lo que pasó. Un informe de [Comprueba tu unidad principal](/es/check) también ayuda.
