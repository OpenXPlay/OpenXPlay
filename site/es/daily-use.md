---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: Uso diario y configuración
description: Después de configurar OpenXPlay — cómo conectarte en cada viaje, la configuración de imagen, cuadros por segundo, códec y pantalla completa de la página de la unidad principal, cómo elegir tu auto, archivos de configuración, registros, opciones experimentales y actualizaciones.
breadcrumb: Uso diario y configuración
---

# Uso diario y configuración

Esta página trata sobre el retransmisor. Una vez hecha la primera configuración, cada viaje empieza con el retransmisor y la misma dirección en el navegador de la unidad principal.

## En cada viaje {#daily}

Con un teléfono Android como retransmisor:

1. Abre OpenXPlay Relay. Con *Connect automatically* activado (la opción predeterminada), el botón *Connect* hace una cuenta regresiva de cinco segundos y luego CarPlay se inicia; *Not now* lo pausa. Con *Start on boot* activado (Settings → Startup), el retransmisor se inicia cuando enciende el teléfono.
2. Comprueba que la unidad principal y el teléfono retransmisor estén en la misma red.
3. Abre la dirección guardada en favoritos en el navegador de la unidad principal y toca la pantalla una vez.

Con un UFI003 u otro dispositivo Linux, el retransmisor funciona como un servicio del sistema y se inicia solo cuando el dispositivo recibe energía; cuando la unidad principal esté en la red del retransmisor, abre la dirección guardada en favoritos.

## Configuración de la página de la unidad principal {#web-settings}

Con el retransmisor Android, toca el ícono de OpenXPlay en CarPlay para abrir la configuración de la página; antes de que CarPlay se reproduzca, la tarjeta de estado tiene un botón de configuración. La configuración se despliega desde un costado, con mosaicos rápidos para el sonido, la pantalla completa y el relleno, y menús para la imagen, el sonido y el micrófono, los plugins y la información. Después de cambiar la resolución, el ancho de pantalla, el códec o los cuadros por segundo, CarPlay se vuelve a conectar en unos segundos.

| Opción | Qué hace |
| --- | --- |
| Ajuste de imagen | *Fit* muestra la imagen completa; *Fill* llena la página. |
| Pantalla completa | Hace que la página ocupe toda la pantalla de la unidad principal. |
| Resolución | Automatic, Native, 1080p, 720p, Whole screen. Native usa los píxeles propios de la pantalla de la unidad principal: la imagen más nítida, pero necesita más ancho de banda Wi-Fi, y el retransmisor la reduce cuando el navegador no puede decodificarla. |
| Ancho de pantalla de CarPlay | 125, 200, 250 o 300 mm. Es el tamaño que se informa al iPhone: los valores mayores muestran más íconos en una página; el predeterminado es 200 mm. |
| Códec de video | *Automatic (recommended)* usa H.265 cuando el navegador lo decodifica por hardware y vuelve a H.264 si falla. *Force H.265* y *Force H.264* son para pruebas. |
| Cuadros por segundo | Automático (sigue la frecuencia de actualización negociada con la unidad principal, entre 30 y 60 fps), o 30, 35, 40, 45, 50, 55 o 60 fps. Con Wi-Fi de 2.4 GHz, 30 es más fluido. |
| Reproducción | *Smart* equilibra fluidez y retraso según tu red, *Quality* da el movimiento más fluido con un poco más de retraso, *Speed* el menor retraso, pero puede saltarse cuadros. |
| Tocar para volver a pantalla completa | Una cámara de reversa u otra pantalla puede hacer que el navegador salga de la pantalla completa. Al volver a la página, esta muestra *Tap to return to full screen*; un toque regresa a pantalla completa (consulta el [problema conocido](#fullscreen-known-issue)). Con esta opción desactivada, la página queda como ventana y CarPlay se ajusta a ella. |

El retransmisor guarda la resolución, el ancho de pantalla, el códec y los cuadros por segundo, así que la app muestra las mismas opciones en Settings → CarPlay picture.

La app también acepta valores manuales, que se aplican en la siguiente conexión de CarPlay:

- **Resolución:** elige *Manual* e ingresa ancho, alto y densidad (dpi). Debajo, la app muestra el tamaño que usaría *Automatic* en este momento; toca *Use* para partir de él.
- **Ancho de pantalla de CarPlay:** elige *Custom* e ingresa de 100 a 400 mm en pasos de 5. Debajo se muestra el ancho que *Automatic* declara en este momento. La página de la unidad principal ofrece solo los cuatro anchos predefinidos; elegir otro ahí borra un ancho personalizado.

::: details ¿Por qué volver a pantalla completa necesita un toque?
Los navegadores permiten la pantalla completa solo después de un toque, así que la página no puede volver a pantalla completa por sí sola. Este toque no llega a CarPlay.
:::

::: info Problema conocido {#fullscreen-known-issue}
En la app de Android 0.2.4 y anteriores y en el retransmisor Linux 0.1.6, es posible que un toque no regrese a pantalla completa, y en algunos navegadores entrar o salir de pantalla completa puede hacer que CarPlay se vuelva a conectar. La app de Android 0.2.5 lo corrige; la corrección del retransmisor Linux llega con su próxima versión.
:::

## Elige tu auto {#car-model}

En la app, en Settings → Car and screen, elige la marca, el modelo y, si lo sabes, el año. La lista incluye todas las líneas de modelos de XPeng vendidas en China, los modelos de Tesla y ZEEKR; el XPeng G6 2023 trae datos de pantalla integrados. Si tu auto no aparece, elige *Other* y escribe su nombre. Hasta que elijas un auto, la pantalla principal muestra *Choose your car*.

*CarPlay view areas*, en el mismo lugar, está activado de forma predeterminada: cuando la ventana del navegador de la unidad principal cambia (al entrar o salir de pantalla completa, pantalla dividida), CarPlay reorganiza su diseño para ajustarse sin volver a conectarse (con excepciones en algunos navegadores; consulta el [problema conocido](#fullscreen-known-issue)). La sección también muestra los datos de pantalla de la unidad principal que detectó el retransmisor, lo que ayuda a optimizar la imagen en el siguiente inicio de CarPlay.

*CarPlay view areas* puede estar en *Automatic* o *Manual*. *Automatic* elige los tamaños de ventana más usados que registró el navegador de la unidad principal; *Manual* usa solo el tamaño de pantalla completa o de ventana (o ambos) que ingreses, con los tamaños más usados de esta unidad principal como referencia. Las áreas de visualización funcionan solo con una resolución automática, y los cambios se aplican en la siguiente conexión.

Con un Tesla, configura también el [navegador de Tesla](/es/tesla).

::: tip Ayuda a que más autos funcionen desde el primer momento
Si tu auto no aparece, toca *Copy my head-unit screen data* y envíalo a los desarrolladores en la [comunidad](/es/community), para que una versión futura incluya tu auto.
:::

## Más opciones {#more-settings}

| En la configuración de la app | Para qué sirve |
| --- | --- |
| Archivos de configuración | Exporta e importa una *User configuration* (conexión, salidas, imagen y el resto de la configuración) y una *Privacy configuration* (el nombre de HTTPS de confianza, su certificado y sus claves; mantenla en privado). Úsalas para pasar a otro teléfono o para reinstalar. El enlace del iPhone, la confianza del auto en Carlink y la identidad de CarPlay no se transfieren. |
| Registros | La app guarda en el teléfono aproximadamente las últimas 24 horas de sus propios registros, con contraseñas, claves, números de teléfono, nombres, mensajes y ubicación precisa reemplazados. Exporta los últimos 10 minutos, 30 minutos o 24 horas como ZIP y luego elige *Save to a file on this phone* o *Upload online and show QR code* para un reporte de error. El envío llega a logs.openxplay.org solo después de que aceptes el aviso de privacidad; el comprobante se puede ver durante 48 horas y los registros se eliminan en un plazo de 30 días. |
| Sonido | *CarPlay audio over the car’s Bluetooth (experimental)* está activado de forma predeterminada. Si el sonido de CarPlay sale del iPhone en lugar del auto, desactívalo, o mantén el iPhone enlazado con el auto y elige Bluetooth como fuente de audio del auto. |
| Opciones experimentales | Opciones para problemas de conexión, activadas de forma predeterminada y agrupadas según la versión que las agregó. Los cambios se aplican en la siguiente conexión. Si CarPlay o Carlink se conecta peor después de una actualización, desactiva *Use experimental options*; tus elecciones se conservan. |

## Actualizaciones {#updates}

En la app, Settings → About → *Check for updates* muestra la versión más reciente con sus notas de la versión y descarga el APK en el navegador; ahí mismo elige el canal *Stable* o *Beta*. La app se comunica con GitHub solo cuando lo tocas. Todas las versiones también están en [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases), y lo que cambió en cada una está en el [historial de cambios](/es/changelog). Después de actualizar la app de Android, la página de la unidad principal se recarga sola una vez con la nueva versión.

El retransmisor Linux: en el UFI003, actualízalo con OpenXPlay Flasher; en el Phicomm N1 y otros dispositivos Linux, usa el comando `openxplay-relay-update`, que restaura la versión anterior si la nueva no arranca; consulta [Actualiza el retransmisor](/es/linux-devices#update).
