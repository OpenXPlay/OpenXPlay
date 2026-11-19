---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: 'Historial de cambios: qué cambió en cada versión de OpenXPlay Relay'
description: Lo que cada versión de OpenXPlay Relay (la app de Android y el retransmisor Linux) agregó, cambió y corrigió, con enlaces de descarga.
breadcrumb: Historial de cambios
---

# Historial de cambios

Qué cambió en cada versión de OpenXPlay Relay, de la más reciente a la más antigua. La app de Android y el retransmisor Linux se publican por separado; las versiones de Linux dicen “Linux” en su título, y las entradas de la app para iPhone dicen “app para iPhone”. Los paquetes y las sumas de verificación están en [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases) de GitHub; la instalación y la configuración empiezan en [Inicio rápido](/es/quick-start).

## Beta pública de la app para iPhone {#iphone-beta}

2026-11-05 · [Únete a través de openxplay.com](https://openxplay.com/es/)

La app OpenXPlay para iPhone conecta el iPhone directamente a la unidad principal, sin retransmisor. Igual que el retransmisor, muestra CarPlay en el navegador, Carlink, CarLife o el receptor de transmisión de la unidad principal. Únete a la beta pública a través de [openxplay.com](https://openxplay.com/es/) o con el código QR de la [página de inicio](/es/#iphone-app).

## 0.2.6 {#v0-2-6}

2026-11-04 · [Descargar](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.6)

App de Android: tamaño de CarPlay, ancho de pantalla y áreas de visualización manuales, un recordatorio en el asistente de configuración para revisar el modo de datos reducidos del iPhone, y se acabaron las advertencias de certificado de HTTPS de confianza en Android 10 y anteriores.

**Novedades**

- App de Android: Settings → CarPlay picture → *Resolution* ofrece *Automatic* o *Manual*. En manual se indican el ancho, el alto y la densidad, y se muestra el tamaño que usaría ahora el modo automático, listo para copiar.
- App de Android: el ancho de pantalla de CarPlay tiene una opción *Custom* de 100 a 400 mm en pasos de 5 mm y muestra el ancho que declara ahora el modo automático.
- App de Android: Settings → Car → *CarPlay view areas* ofrece *Automatic* o *Manual*. En manual se indica un tamaño de pantalla completa y/o de ventana, y se muestran los tamaños más usados registrados para esta unidad principal.

**Cambios**

- App de Android: en el asistente de configuración, Next en la página de red te recuerda revisar, una vez que el iPhone se haya conectado, que el modo de datos reducidos esté desactivado para esta red Wi-Fi en el iPhone (Configuración → Wi-Fi → ⓘ). La página de red y el mensaje que aparece cuando el iPhone no se une al Wi-Fi dicen lo mismo.
- App de Android: con el punto de acceso de este teléfono, el asistente de configuración te pide elegir *Copy to settings* o *Use my existing hotspot* antes de Next; ninguna viene preseleccionada.
- App de Android: [HTTPS de confianza](/es/trusted-https) ya no muestra advertencias de certificado en Android 10 y anteriores cuando hay un certificado de dominio válido configurado, y usa un certificado solo dentro del inicio y el fin de su periodo de validez.

**Notas**

- Incluye todo lo de 0.2.6-beta.1 y 0.2.6-beta.2.
- Los nuevos ajustes de tamaño y ancho se aplican en la siguiente conexión de CarPlay. Las áreas de visualización funcionan solo con un tamaño de CarPlay automático.
- La página de la unidad principal sigue ofreciendo los cuatro anchos predefinidos; elegir uno distinto ahí borra un ancho personalizado. Developer options → *Physical width (calibration)*, cuando está activado, tiene prioridad sobre un ancho personalizado; viene desactivado de forma predeterminada.
- Notas completas de la versión: [GitHub Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.6).

## 0.2.5 {#v0-2-5}

2026-11-02 · [Descargar](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.5)

App de Android: una salida a CarLife, la transmisión inalámbrica como salida operada desde el teléfono, y DiPlay 0.2.22.

**Novedades**

- App de Android: una salida a [CarLife](/es/carlife) (experimental). La imagen y el control táctil de CarPlay van al CarLife del auto por la misma red Wi-Fi, el punto de acceso de este teléfono o una conexión de accesorio USB; el sonido sigue por la conexión Bluetooth del iPhone con el auto. Elígela en el asistente de configuración o en Settings → Output; la dirección IP del auto es opcional.
- App de Android: la [transmisión inalámbrica](/es/wireless-display) (DLNA, Miracast) se puede elegir en el asistente de configuración y en Settings → Output, marcada como *Experimental*. El auto muestra solo la imagen; solo con transmisión inalámbrica, este teléfono muestra CarPlay y recibe el control táctil, con un botón para regresar, y Home ofrece *Show CarPlay* mientras está conectado.
- App de Android: los registros conservan una línea de tiempo de la conexión incluso cuando el registro del sistema descarta entradas, y una exportación indica cuando su captura está incompleta.

**Cambios**

- App de Android: la salida a la app Carlink ya no está marcada como *Experimental* en el asistente de configuración ni en Settings → Output.
- App de Android: la transmisión inalámbrica DLNA lleva todos los sonidos de CarPlay (alertas, Siri, llamadas), no solo la música, cuando el audio por el Bluetooth del auto está desactivado.
- App de Android: la transmisión inalámbrica sigue Settings → CarPlay picture → *Resolution*; DLNA declara la pantalla del auto por sí misma.
- App de Android: con DLNA, el auto ya no se queda en un cuadro viejo después de deslizar, y un reproductor que se conecta empieza con una imagen nueva.
- App de Android: en la página de la unidad principal, tocar vuelve a restablecer la pantalla completa, entrar o salir de pantalla completa ya no reinicia CarPlay (Samsung Internet), y los cuadros que llegan en ráfaga se muestran en lugar de descartarse.
- App de Android: Carlink les da a las unidades principales lentas 4 s para responder la solicitud de MTU (el XPeng G9 tarda 1.8 s), así que la conexión ya no falla en el descubrimiento de servicios. Gracias, hellowalker.
- App de Android: en teléfonos Xiaomi con Android 10 u 11, la preparación del escaneo Wi-Fi de Carlink se ejecuta como máximo una vez cada 2 minutos, dejando los escaneos para el diálogo Wi-Fi del sistema, así que conectarse al Wi-Fi del auto falla con menos frecuencia. Gracias, hellowalker.
- App de Android: DiPlay 0.2.22. CarPlay por cable se conecta al primer intento después de volver a enchufar; un inicio inalámbrico reintenta en cuanto se enciende el Bluetooth; anunciar CarPlay en el punto de acceso ya no espera unos 20 s; la música inalámbrica mantiene la velocidad del iPhone (sin trabas); el micrófono USB graba la voz en lugar de silencio; los gestos con varios dedos son más estables; las conexiones y los datos recibidos se verifican con más rigor.
- App de Android: [HTTPS de confianza](/es/trusted-https) mantiene los límites de solicitudes de la autoridad de certificación por nombre, cuenta o entorno, y los certificados de 45 y 64 días se renuevan a tiempo.

**Notas**

- Incluye todo lo de 0.2.5-beta.1 y 0.2.5-beta.2.
- Notas completas de la versión: [GitHub Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.5).

## Linux 0.1.6 {#linux-v0-1-6}

2026-11-01 · [Descargar](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/linux-v0.1.6)

Retransmisor Linux: la primera versión desde la 0.1.3. La página de administración adopta el diseño de la app de Android pensado primero para el teléfono, CarPlay se ajusta al navegador de la unidad principal, Carlink funciona en un segundo adaptador Wi-Fi, llegan CarPlay por cable y HTTPS de confianza, y OpenXPlay Flasher instala y actualiza el retransmisor.

**Novedades**

- La página de administración tiene el diseño de la app de Android pensado primero para el teléfono, en claro y oscuro. Home muestra la conexión como un solo camino, iPhone → este retransmisor → auto, y cada paso abre sus detalles y su solución; el engranaje en la parte superior de Home abre Settings, con los menús de la app de Android. Después de iniciar sesión con la contraseña predeterminada, la página te pide definir la tuya (puedes omitirlo).
- El enlace con el iPhone nombra al retransmisor como lo muestra el iPhone, OpenXPlay Linux. Los dispositivos enlazados se pueden quitar en Home y en Settings → iPhone connection.
- CarPlay por cable: Settings → iPhone connection → USB cable, con el iPhone conectado a un puerto USB-A del retransmisor mediante un cable USB-A a Lightning o USB-A a USB-C; la unidad principal sigue llegando al retransmisor por Wi-Fi. La conexión inalámbrica sigue siendo la predeterminada.
- Áreas de visualización de CarPlay, activadas de forma predeterminada: cuando el navegador de la unidad principal entra o sale de pantalla completa, CarPlay reorganiza su diseño para ajustarse, sin volver a conectarse y sin barras negras.
- Settings → CarPlay picture: Resolution, CarPlay screen width, Video codec y Frame rate, también en la configuración de la página de la unidad principal. Después de que el navegador de la unidad principal sale de pantalla completa, por ejemplo por la cámara de reversa, un toque la restablece.
- Settings → Car and screen: elige el auto por marca, modelo y año del catálogo de la app de Android (con ZEEKR), con las pantallas guardadas por auto.
- Settings → Audio → CarPlay audio over the car’s Bluetooth (experimental), activado de forma predeterminada: la música, la navegación y las llamadas se reproducen por la propia conexión Bluetooth del iPhone con el auto. Si el sonido sale del iPhone, desactívalo.
- Interfaces y funciones de red: el retransmisor muestra cada interfaz Ethernet y Wi-Fi con lo que puede hacer y elige la que usará para el iPhone, el navegador de la unidad principal y Carlink; también puedes elegir cada una. La banda y el canal del punto de acceso dependen del hardware Wi-Fi, con ajustes de Wi-Fi country y Hotspot security (WPA2 de forma predeterminada).
- Carlink funciona en un segundo adaptador Wi-Fi, así que el punto de acceso de CarPlay sigue activo mientras se conecta al auto. Carlink recuerda cómo hace el traspaso cada auto, sigue buscando hasta que aparece el auto y pasa al iPhone las teclas multimedia del volante.
- Punto de acceso de administración (desactivado de forma predeterminada, necesita un segundo adaptador Wi-Fi): una vez activado, sirve la página de administración en `https://10.79.0.1:6975`, en pausa mientras Carlink usa ese adaptador.
- [HTTPS de confianza](/es/trusted-https) y la [adaptación al navegador de Tesla](/es/tesla), como en Android, desactivados de forma predeterminada.
- Logs, Configuration files y Check for updates, como en Android: guarda los registros como ZIP o envíalos a logs.openxplay.org; el retransmisor contacta a GitHub solo cuando tocas Check for updates.
- Identity and certificates: importa o quita la identidad de accesorio de Apple (archivos o un ZIP), o usa un servidor MFi remoto o un chip de autenticación por I2C o con un adaptador CH341.
- Experimental, todo activado de forma predeterminada, incluidos tres interruptores para iPhones, por ejemplo con iOS 16, que se conectan pero nunca muestran imagen, y Watch for stalls. Si las conexiones empeoran, desactiva Use experimental options.
- Cada versión incluye el paquete Debian y el manifiesto de instalación que [OpenXPlay Flasher](/es/ufi003-relay#install) usa para instalar y actualizar el retransmisor. Otros equipos se pueden describir en un perfil de equipo, `/etc/openxplay/host.json`; consulta [Otros dispositivos Linux](/es/linux-devices).

**Cambios**

- Con un solo radio Wi-Fi, como en el UFI003, el retransmisor ofrece solo la salida al navegador; Carlink necesita un segundo adaptador Wi-Fi. En cuanto aparece un segundo adaptador, Carlink funciona sin reiniciar.
- La página de administración tiene un nombre por red: `openxplay-car.local` en la red del iPhone y `openxplay-admin.local` en las demás, como Ethernet o el punto de acceso de administración; `openxplay-linux.local` sigue funcionando. Una dirección escrita sin `https://` sigue abriendo la página.
- El punto de acceso de CarPlay y el punto de acceso de administración usan la contraseña `openxplay` a menos que definas la tuya en la página de administración. Una contraseña de punto de acceso generada por una versión anterior cambia a `openxplay` al actualizar y el nombre se mantiene, así que la unidad principal necesita la nueva contraseña una vez.
- El punto de acceso de CarPlay sigue activo mientras el retransmisor esté funcionando, también después de un inicio fallido o de Stop, así que la página de administración sigue accesible en el auto.
- Connect automatically arranca en cuanto todo está listo, después de una cuenta regresiva de cinco segundos que Not now cancela; Start on device boot es un ajuste aparte.
- Después de llegar al iPhone, un inicio que falla reintenta cinco veces, luego se detiene con un informe y lo intenta una vez más cuando vuelven el Bluetooth, el Wi-Fi, Carlink o el iPhone.
- Carlink usa la misma identidad en el traspaso por Bluetooth y en la sesión, así que después de actualizar el auto pide el código de Carlink una vez.
- El retransmisor informa su versión real (la 0.1.3 informaba 0.1.2). Una interfaz Wi-Fi faltante ya no lo detiene; la página de administración sigue accesible por Ethernet.

**Notas**

- Incluye todo lo de las betas de Linux 0.1.5 y 0.1.6.
- Recarga la página de la unidad principal una vez después de actualizar desde la 0.1.3; las actualizaciones posteriores la recargan automáticamente.
- Antes de volver a la 0.1.3, restaura una copia de `/var/lib/openxplay/settings.json` de antes de la actualización, o bórralo; la 0.1.3 no arranca con la configuración que escribe esta versión.
- Problemas conocidos: en algunos navegadores de unidades principales la página muestra menos cuadros de los que recibe, lo cual se está investigando; Experimental → Suggest working modes todavía no hace nada en Linux.
- En GitHub, la versión marcada como Latest siempre es la app de Android; las etiquetas de versión de Linux empiezan con `linux-v`.
- Notas completas de la versión: [GitHub Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/linux-v0.1.6).

## 0.2.4 {#v0-2-4}

2026-11-01 · [Descargar](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.4)

App de Android: pantallas más fluidas, un botón en Home que responde al primer toque, datos del punto de acceso para copiar en la configuración del teléfono, y una corrección de Bluetooth para algunos teléfonos MIUI con Android 12.

**Novedades**

- App de Android: cuando el iPhone se conecta por el punto de acceso de este teléfono, Settings → Network ofrece dos formas de configurar el punto de acceso. *Copy to settings (recommended)* sugiere un nombre (OpenXPlay-A-…) y una contraseña de 16 caracteres; cada botón copia uno de ellos y abre la configuración del punto de acceso del teléfono. *Use my existing hotspot* conserva un punto de acceso que configuraste tú: ingresa ahí su nombre y contraseña. El asistente de configuración ofrece la misma opción, y los datos del punto de acceso que ya guardaste se quedan como están.

**Cambios**

- App de Android: pantallas más fluidas. Medido en un Redmi 14C (HyperOS) con Home abierto y sin auto conectado; en otros teléfonos variará:
  - Mientras el retransmisor busca el auto, *Record all Bluetooth advertisements* (Experimental) ya no trabaja en el hilo que dibuja las pantallas. El tiempo de CPU en reposo de ese hilo baja de 64–119 ms a 25–27 ms por segundo, un 60–77% menos.
  - El botón de Home responde al primer toque. Antes, un toque dentro de los 0.5 s posteriores a la aparición del botón, por ejemplo justo al volver de Settings, se ignoraba; ahora responden 4 de 4 toques así.
  - Hasta que la sesión de Carlink del auto está lista, los dos hilos de salida de Carlink se activan cada 50 ms en lugar de cada 5 ms y usan 5 ms de CPU por segundo cada uno en lugar de 24–27, alrededor de un 80% menos.
  - Las pantallas propias de la app se compilan por adelantado al instalarla, así que las páginas abren un poco más rápido las primeras veces: el cuadro más largo al abrir Settings es de 80–96 ms en lugar de 99.6 ms.
  - En total, la app en reposo usa 220–234 ms de CPU por segundo en lugar de 245–336, entre un 10 y un 30% menos.
- App de Android: conserva los permisos de Bluetooth antiguos de Android en Android 12 y posteriores. Algunos teléfonos MIUI con Android 12 todavía los verifican cuando el iPhone se conecta por Bluetooth, y la conexión fallaba de inmediato.

**Notas**

- Problema conocido: al abrir Settings, todavía se retiene un cuadro durante 80–96 ms (unos cinco cuadros a 60 fps) antes de que la página se deslice.
- Notas completas de la versión: [GitHub Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.4).

## 0.2.3 {#v0-2-3}

2026-10-30 · [Descargar](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.3)

App de Android: un Home dibujado como cables, modo de alto rendimiento, acceso en segundo plano, registros que explican bloqueos e interrupciones, y experimentos inalámbricos para iOS 16.

**Novedades**

- App de Android: Home dibuja la conexión de arriba abajo: el iPhone, este teléfono y el auto unidos por cables que se llenan a medida que terminan los pasos, con los pasos completados en cada cable; los pasos propios de este teléfono llenan un anillo a su alrededor. Solo los pasos que te necesitan (!) o que fallaron (x) llevan una insignia, y el asa del panel de pasos dice *Swipe up for all steps* con el conteo general.
- App de Android: modo de alto rendimiento en Settings → Display, activado de forma predeterminada: 20 s después de que CarPlay se conecta, la pantalla se atenúa y se detienen todas las animaciones; solo queda *CarPlay connected*. Toca la pantalla para que vuelva Home.
- App de Android: Settings → Background muestra si OpenXPlay Relay puede funcionar sin restricciones en segundo plano, se lo pide al sistema con un toque, y abre las páginas de inicio automático y ahorro de batería del fabricante del teléfono cuando existen. El paso Background en Home y la última página del asistente de configuración lo abren.
- App de Android: modos de funcionamiento sugeridos. El retransmisor aprende si este teléfono apaga el Wi-Fi mientras su punto de acceso está encendido; cuando la configuración elegida necesita ambos, sugiere modos que funcionan (el navegador del auto o USB para Carlink o Miracast; el punto de acceso de este teléfono, el punto de acceso del auto o USB para la conexión del iPhone), y una elección abre su página de configuración con el cambio hecho.
- App de Android: vigilancia de bloqueos. El registro exportado guarda las pausas del proceso, los hilos bloqueados con sus pilas, los pasos de conexión que dejan de avanzar y el estado de energía; guarda un latido para el siguiente inicio y reinicia un grabador de registros que se quedó en silencio.
- App de Android: tres opciones en Settings → Experimental para iPhones, por ejemplo con iOS 16, que se conectan de forma inalámbrica pero nunca muestran imagen: abrir el canal Wi-Fi de iAP2 solo cuando el iPhone lo ofrece, liberar el Bluetooth cuando el iPhone lo pide, y esperar a que el iPhone se vuelva a conectar. La última también evita que un reinicio en cola de una sesión anterior termine una más nueva.
- App de Android: Settings → Sound: mientras *CarPlay audio over the car’s Bluetooth* está activado, un consejo dice qué hacer cuando el sonido sale del teléfono: abre la configuración de Bluetooth en la pantalla central del auto, busca el iPhone y cambia el ícono a su derecha de silenciado a reproducir.

**Cambios**

- App de Android: el registro exportado guarda cómo terminó cada enlace de la conexión: qué enlace, hasta dónde había llegado, quién lo terminó (el otro lado, el retransmisor, un tiempo de espera o el sistema) y por qué. Cada intento interrumpido del iPhone recibe un resumen con lo que hizo después el retransmisor y el estado del Wi-Fi, el punto de acceso, el Bluetooth, la pantalla y la energía del teléfono. La página del navegador del auto informa cómo terminó su conexión anterior.
- App de Android: el registro exportado guarda cada espera de inicio (red, Carlink, pantalla del auto, reinicio) y cada inicio rechazado con su motivo, y anota cuándo el grabador de registros terminó, se quedó en silencio o dejó un hueco; info.txt agrega los datos del Wi-Fi y del punto de acceso, el estado de energía, el proceso anterior y los motivos de salida recientes.
- App de Android: la página Experimental muestra sus opciones bajo un encabezado por versión, de la más reciente a la más antigua.
- App de Android: la página de administración en el navegador usa el nombre Bluetooth real del retransmisor en los pasos de enlace, muestra un diálogo o panel a la vez con los avisos de tiempo limitado, como el PIN de Carlink, primero, hace de Cancel el botón principal al confirmar algo destructivo, y mantiene marcado con el motivo el paso de configuración que se detuvo.

**Notas**

- El modo de alto rendimiento está activado de forma predeterminada; desactívalo en Settings → Display.
- Las cinco opciones nuevas de Settings → Experimental están activadas de forma predeterminada. Cada una se puede desactivar ahí; el interruptor general las desactiva todas.
- Problemas conocidos: si un iPhone deja de mostrar imagen después de esta actualización, desactiva primero las dos opciones de iOS 16 (el canal Wi-Fi de iAP2 y la liberación del Bluetooth).
- Notas completas de la versión: [GitHub Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.3).

## 0.2.2 {#v0-2-2}

2026-10-28 · [Descargar](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.2)

App de Android: una imagen de CarPlay más estable cuando el iPhone se vuelve a conectar, ZEEKR en la lista de autos, una página propia en Settings para la adaptación al navegador de Tesla y un solo Home.

**Novedades**

- App de Android: tres opciones en Settings → Experimental, activadas de forma predeterminada, para pasar la imagen de CarPlay de una conexión antigua del iPhone a una nueva: *Isolate screen sessions*, *Reset screen state on reconnect* y *Synchronize screen handoff*.
- App de Android: ZEEKR en la lista de autos. Con un ZEEKR elegido, Settings → Car and screen y el asistente de configuración sugieren [HTTPS de confianza](/es/trusted-https) y ofrecen un botón para configurarlo.
- App de Android: la [adaptación al navegador de Tesla](/es/tesla) pasa a su propia página, Settings → Tesla browser, siempre después de Car and screen; la dirección de estilo TeslaMirror aparece primero y está marcada como recomendada. Las elecciones guardadas se quedan como estaban.
- App de Android: los registros exportados guardan lo que hicieron DLNA y Miracast (estado, fallas y estadísticas cada 10 segundos, sin direcciones web), para probar la transmisión inalámbrica desde las opciones para desarrolladores.

**Cambios**

- App de Android: cuando el iPhone abre una conexión nueva mientras la anterior todavía se está cerrando, la nueva imagen de CarPlay se queda en pantalla; los cuadros tardíos de la conexión anterior y su cierre ya no la detienen.
- App de Android: la transmisión DLNA, todavía accesible solo desde las opciones para desarrolladores, recibe el H.264 o H.265 del iPhone directamente. Ya no hay transcodificación de H.265 a H.264 (cuando fallaba, el receptor se quedaba en blanco), y los receptores Xiaomi hyperDLNA siguen reproduciendo H.265.
- App de Android: un solo Home. Las notificaciones, el arranque al encender, el enlace y la superposición de CarPlay ya no abren un segundo Home; Back pasa por cada página como máximo una vez, y solo se muestra un diálogo o panel a la vez.
- App de Android: la página de administración en el navegador se ve como la app: Home muestra la misma vista de conexión, Settings usa los menús de la app, y viene en claro y oscuro.

**Notas**

- Las tres opciones nuevas son experimentales, y cada una se puede desactivar en Settings → Experimental; los cambios se aplican a la siguiente conexión.
- Notas completas de la versión: [GitHub Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.2).

## 0.2.1 {#v0-2-1}

2026-10-27 · [Descargar](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.1)

App de Android: mejoras en cómo empieza una conexión, y una página de la unidad principal que dice qué está esperando.

**Novedades**

- App de Android: cinco opciones en Settings → Experimental para iniciar una conexión, activadas de forma predeterminada. CarPlay cuenta como en reproducción solo cuando el navegador de la unidad principal muestra su imagen; un reintento en cola se cancela cuando la conexión ya se recuperó; la página de la unidad principal muestra el progreso de la conexión; cada etapa hasta la primera imagen se guarda en el registro; y las comprobaciones de red que el teléfono no admite no se repiten dentro de un mismo intento.

**Cambios**

- App de Android: seis opciones experimentales de la [0.2.0](#v0-2-0) ahora son el comportamiento estándar, siempre activas y sin interruptores. *Send this phone’s Bluetooth address* sigue desactivada hasta que la actives.
- App de Android: al actualizar se activan las opciones nuevas y se conserva el resto de tu configuración; una dirección Bluetooth que ingresaste pero dejaste desactivada sigue desactivada.
- Página de la unidad principal (retransmisor Android): mientras CarPlay arranca, la página muestra si está esperando al iPhone o a su imagen de CarPlay.

**Notas**

- Las cinco opciones nuevas son experimentales, y cada una se puede desactivar en Settings → Experimental.
- Notas completas de la versión: [GitHub Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.1).

## 0.2.0 {#v0-2-0}

2026-10-26 · [Descargar](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.0)

App de Android: una app rediseñada que verifica la conexión paso a paso, selección del auto por modelo y año, ajustes de cuadros por segundo y de tamaño de imagen de Carlink, la configuración de la página de la unidad principal desde el ícono de OpenXPlay en CarPlay, exportación de registros y búsqueda de actualizaciones.

**Novedades**

- App de Android: una app rediseñada que muestra la conexión como un solo camino, iPhone → teléfono retransmisor → auto, y verifica cada paso en vivo. Home tiene tres mosaicos, un titular y como máximo una acción: *Connect*, la solución para el paso actual, *Retry* o *Start now*. Toca un mosaico o desliza hacia arriba el panel de abajo para ver cada paso, por qué importa y qué hacer, como encender el Bluetooth, enlazar el iPhone o ingresar el código de Carlink. Una falla dice qué salió mal y qué hacer, con su código y hora. La página en funcionamiento se ve igual.
- App de Android: apariencia clara y oscura, según el sistema.
- App de Android: Settings → Car and screen elige el auto por marca, modelo y año: todos los modelos de XPeng vendidos en China con sus años de modelo, y los modelos de Tesla. Los datos de pantalla integrados siguen siendo solo para el XPeng G6 2023. El asistente de configuración ahora empieza con *Your car* y necesita una marca y un modelo; el año puede quedar en *Not sure*. Las elecciones anteriores se mantienen, y las configuraciones sin auto siguen funcionando, con *Choose your car* en Home hasta que elijas uno.
- App de Android: la [adaptación al navegador de Tesla](/es/tesla). El navegador de Tesla no abre direcciones de la red local, así que con un Tesla elegido, Settings → Car and screen → *Tesla browser* agrega una dirección en el teléfono retransmisor mediante una VPN local (169.254.88.1 de forma predeterminada; nada sale del teléfono). Hay cuatro formas de llegar a la página: un nombre de confianza o una dirección directa en esa dirección de enlace local, o una dirección de estilo TeslaMirror o TeslaAndroid; las formas con nombre de confianza necesitan [HTTPS de confianza](/es/trusted-https) y abren sin advertencia de certificado. Necesita CarPlay inalámbrico, la salida *Car browser* y el punto de acceso o el Wi-Fi Direct del teléfono retransmisor; cambiar de una forma a otra mantiene CarPlay funcionando.
- App de Android: Settings → CarPlay picture → *Frame rate*: *Auto* (30 o 60 fps, según la frecuencia de actualización de la unidad principal) o de 30 a 60 fps en pasos de 5. La página de la unidad principal muestra y cambia el mismo ajuste. Un cambio reinicia una vez la sesión en curso. Reemplaza el ajuste forzado de cuadros por segundo de las opciones para desarrolladores; si estaba activado, se mantiene.
- App de Android: Settings → CarPlay picture → *Carlink picture size*: *Automatic* (la ventana de Carlink del auto, como antes), seis tamaños predefinidos (1280×720, 1920×1080, 1280×800, 1920×720, 1024×600 y 1024×768) y hasta cinco tamaños propios. El tamaño con estrella se usa en cada conexión; elegir otro lo prueba solo en esta conexión, reiniciando CarPlay si Carlink está en funcionamiento.
- Página de la unidad principal (retransmisor Android): tocar el ícono de OpenXPlay en CarPlay abre la configuración de la página en lugar de la pantalla de inicio del teléfono retransmisor. Se desliza desde la derecha, con mosaicos rápidos para sonido, pantalla completa y relleno, menús para imagen, sonido y micrófono, plugins y acerca de, y páginas de opciones en lugar de listas desplegables. El engranaje flotante desaparece; antes de que CarPlay se reproduzca, la tarjeta de estado tiene un botón de configuración.
- App de Android: Settings → Logs. La app guarda en el teléfono retransmisor aproximadamente las últimas 24 horas de sus propios registros; las contraseñas, claves, números de teléfono, nombres, mensajes y la ubicación precisa se reemplazan antes de guardar nada. *Export logs* de los últimos 10 minutos, 30 minutos o 24 horas como ZIP, y luego elige *Save to a file on this phone* (sin usar la red) o *Upload online and show QR code*. Un envío va a logs.openxplay.org solo después de que aceptas el aviso de privacidad, y da un ID de registro y un código QR para tu reporte de error; el comprobante se puede ver durante 48 horas, y los registros se eliminan en un plazo de 72 horas.
- App de Android: Settings → Configuration files exporta e importa una *User configuration* (conexión, salidas, imagen y el resto de los ajustes, incluidas las opciones para desarrolladores y experimentales) y una *Privacy configuration* (el nombre de HTTPS de confianza, su certificado y claves, y las configuraciones guardadas del proveedor de DNS; mantén este archivo en privado), para pasar a otro teléfono o reinstalar. Importar una configuración de usuario también completa el asistente de configuración. El enlace con el iPhone, la confianza del auto con Carlink y la identidad de accesorio de Apple no se transfieren.
- App de Android: Settings → About → *Check for updates*, con un canal *Stable* o *Beta*, muestra la versión más reciente y sus notas en el idioma de la app, y descarga el APK en el navegador. La app contacta a GitHub solo cuando tocas *Check for updates*.
- App de Android: Settings → Experimental, para problemas de conexión: *Check and recover the iPhone Wi-Fi connection* (cuando el Wi-Fi se conecta pero CarPlay no arranca), *Isolate the Carlink network*, *Wait for Carlink before connecting the iPhone*, *Remember the Bluetooth subscription method* (se salta una espera de 2 segundos en autos como el XPeng G6), *Keep scanning for the car*, *Record all Bluetooth advertisements* (solo con la depuración de Carlink activada) y *Send this phone’s Bluetooth address*. *Use experimental options* y todas las opciones excepto la última están activadas de forma predeterminada; los cambios se aplican a la siguiente conexión.

**Cambios**

- App de Android: Carlink en teléfonos Xiaomi con MIUI sobre Android 10 y 11 ya no falla al conectarse al Wi-Fi de la unidad principal después de 12 segundos en una confirmación del sistema que no se puede responder. Gracias a @hellowalker.
- App de Android: mientras una salida está activada, el retransmisor funciona con una notificación de baja prioridad “OpenXPlay Relay”, así que Carlink y la página de la unidad principal siguen funcionando en segundo plano y con la pantalla apagada. Antes, HyperOS congelaba la app segundos después de que salía de la pantalla, y Carlink no podía encontrar el auto.
- App de Android: el inicio verifica el Bluetooth para CarPlay inalámbrico y Carlink, y el Wi-Fi para Wi-Fi Direct, Carlink y el punto de acceso del auto. Si algo sigue apagado, *Connect* y un inicio automático esperan y empiezan en cuanto se enciende, en lugar de mostrar un diálogo o fallar. Una sesión detenida porque el Bluetooth, el Wi-Fi o el punto de acceso se apagó se reinicia una vez cuando vuelve.
- App de Android: cuando todavía no se conoce la pantalla del auto, CarPlay espera hasta 20 segundos a que el auto la informe, así que ya no se reinicia cuando llega el tamaño; *Start now* se salta la espera.
- App de Android: Home ya no dice “Waiting for iPhone” mientras el iPhone se está conectando. Home y la página en funcionamiento muestran la misma etapa: conectando por Bluetooth, iniciando CarPlay por Bluetooth o USB, esperando la imagen o volviendo a conectar.
- App de Android: la página de arranque desaparece, y la app abre en Home. Con *Connect automatically* activado, el botón *Connect* hace una cuenta regresiva de cinco segundos; *Not now* la pausa.
- App de Android: un asistente de configuración más tranquilo, con una barra de progreso, opciones compactas que se expanden solo al seleccionarlas, un diagrama de red para la red elegida y una página de preparación que muestra solo los pasos pendientes.
- App de Android: mucho menos uso de CPU y batería en reposo, y más fluidez al abrir Settings y al regresar.
- App de Android: las etiquetas largas pasan a la siguiente línea en lugar de cortarse, también con texto más grande.
- App de Android: el modo de red *Shared Wi-Fi* ahora es *Use the car’s hotspot* (Settings → iPhone connection → Network): el iPhone y el teléfono retransmisor se conectan al punto de acceso del auto. El diagrama muestra el auto como punto de acceso, el paso de espera nombra el punto de acceso del auto al que está conectado el teléfono retransmisor, y el campo de banda ahora es *Hotspot band*. La página de administración todavía dice *Shared Wi-Fi*.
- App de Android: Developer options → *Combine outputs* reemplaza a *Both outputs at once*: cualquier combinación de salidas puede funcionar a la vez, y al menos una queda activada. Las elecciones existentes se mantienen.

**Notas**

- Esta versión contiene solo la app de Android; el retransmisor Linux se publica por separado.
- La transmisión inalámbrica (DLNA, Miracast) aparece como *Coming soon* en el asistente de configuración y en Settings → Output, y todavía no se puede elegir.
- Las opciones experimentales empiezan activadas, también después de actualizar. Si Carlink o CarPlay inalámbrico se conectan peor que antes, desactiva Settings → Experimental → *Use experimental options*; tus elecciones se conservan.
- Un archivo de configuración exportado por la 0.2.0 con un auto elegido no se importa en versiones anteriores; los archivos anteriores sí se importan en la 0.2.0.
- Si el sonido de CarPlay sale del iPhone en lugar del auto, desactiva Settings → Sound → *CarPlay audio over the car’s Bluetooth*, o mantén el iPhone enlazado con el auto y elige Bluetooth como fuente de audio del auto.
- Notas completas de la versión: [GitHub Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.2.0).
- Problemas conocidos: el XPeng G6 no le informa al teléfono su nuevo tamaño cuando cambias su área de Carlink durante una sesión; CarPlay por cable con un iPhone USB-C y un cable USB-C a USB-C normalmente no funciona (usa un adaptador OTG o la conexión inalámbrica); algunos teléfonos apagan el Wi-Fi cuando su punto de acceso está encendido, y Carlink necesita ambos; las indicaciones de navegación y los tonos de llamada por Carlink pueden no sonar; en unidades principales Carlink que necesitan H.264, la transcodificación en el teléfono puede detenerse después de un salto de marca de tiempo, y se envía el flujo original en su lugar; en la página de la unidad principal, un toque para volver a pantalla completa puede no restablecerla ni llegar a CarPlay; en Android 13 y posteriores, las conexiones a una dirección de Tesla fuera de 169.254 pueden descartarse (la app avisa).

## 0.1.5 {#v0-1-5}

2026-10-22 · [Descargar](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.1.5)

App de Android: H.265, Carlink con la forma de la ventana del auto y control táctil correcto, HTTPS de confianza con un nombre de dominio gratuito, configuración reorganizada y avisos de conexión más claros.

**Novedades**

- App de Android: video H.265. Settings → CarPlay picture → *Video codec*: Automatic, Force H.265 o Force H.264, compartido con la página de la unidad principal.
- App de Android: cuando la unidad principal informa compatibilidad con H.265, Carlink recibe la imagen H.265 del iPhone sin cambios: sin transcodificación en el teléfono, movimiento más fluido y menor latencia.
- App de Android: la imagen de Carlink toma la forma de la ventana de Carlink del auto en lugar de un 1280×720 comprimido (1532×1013 en el XPeng G6, por ejemplo), y las áreas de visualización de CarPlay también funcionan con Carlink.
- App de Android: Settings → Output → *Reconnect when the window size changes* (desactivado de forma predeterminada). Después de que el auto cambia su área de Carlink, el primer toque vuelve a conectar para que la imagen pueda seguir el nuevo tamaño.
- App de Android: [HTTPS de confianza](/es/trusted-https). Settings → Head-unit access → Trusted HTTPS usa un nombre gratuito de DuckDNS o dynv6, para que el navegador de la unidad principal abra la página sin advertencia de certificado.
- App de Android: Settings → Sound → *CarPlay audio over the car’s Bluetooth (experimental)*, activado de forma predeterminada.
- App de Android: estadísticas de video en la pantalla de inicio, en Settings → CarPlay picture → *Video statistics*.
- App de Android: un inicio manual verifica el Wi-Fi y el punto de acceso del teléfono retransmisor, dice qué está apagado y abre la configuración correcta; cuando Carlink falla porque el Wi-Fi está apagado, la pantalla de inicio lo dice de inmediato.
- App de Android: cuando una sesión por cable encuentra el teléfono retransmisor conectado como dispositivo USB, la pantalla de inicio explica por qué y sugiere un adaptador OTG.
- App de Android: la pantalla de inicio muestra cada problema de conexión, con detalles que puedes expandir.
- App de Android: la configuración se agrupa en menús, y las opciones para desarrolladores tienen un interruptor general y uno por opción.

**Cambios**

- App de Android: los toques de Carlink caen donde tocas cuando la imagen no es de 1280×720.
- App de Android: corrige una imagen de Carlink en negro con sonido en algunas unidades principales, como la del XPeng G6; la imagen vuelve después de la cámara de reversa; un cambio en la clave de enlace de la unidad principal vuelve a pedir el código de enlace en lugar de requerir una reinstalación. Gracias a @PicoHug.
- App de Android: *USB cable* está marcado como “Not recommended” y cambiar a él pide confirmación; con Carlink, el asistente de configuración recomienda *This phone’s hotspot*.
- App de Android: un cambio en la red del teléfono ya no reinicia el receptor web ni desconecta la página de la unidad principal.
- Página de la unidad principal (retransmisor Android): el ajuste *Video codec* de todo el retransmisor reemplaza la opción “H.264 only” por navegador.
- App de Android: una nueva pantalla de bienvenida animada y una misma transición para todas las páginas.

**Notas**

- Esta versión contiene solo la app de Android; el retransmisor Linux se publica por separado. Las versiones candidatas 0.1.4 se retiraron, y todo lo que contenían está en esta versión.
- Notas completas de la versión: [GitHub Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/android-v0.1.5).
- Problemas conocidos: el XPeng G6 no le informa al teléfono su nuevo tamaño cuando cambias su área de Carlink durante una sesión; CarPlay por cable con un iPhone USB-C y un cable USB-C a USB-C normalmente no funciona.

## 0.1.3 {#v0-1-3}

2026-10-19 · [Descargar](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/v0.1.3)

CarPlay se ajusta a la ventana del navegador de la unidad principal sin volver a conectarse, con modelos de auto, una resolución Native y un ajuste de ancho de pantalla de CarPlay.

**Novedades**

- App de Android: áreas de visualización de CarPlay, activadas de forma predeterminada. Cuando el navegador de la unidad principal entra o sale de pantalla completa, pasa a pantalla dividida o vuelve como ventana después de la cámara de reversa, CarPlay reorganiza su diseño para ajustarse sin volver a conectarse, y la página muestra solo esa área, sin barras negras.
- App de Android: Settings → Car and screen. Elige la marca y el modelo del auto (XPeng G6 2023 integrado, u Other). Los tamaños de pantalla que detecta el retransmisor se muestran ahí y se usan en el siguiente inicio; los propietarios de autos que no aparecen pueden copiar los datos de su pantalla y enviarlos a los desarrolladores.
- App de Android: se recuerda la pantalla de la última unidad principal, así que CarPlay se ajusta correctamente incluso cuando arranca antes de que se abra la página de la unidad principal.
- Página de la unidad principal (retransmisor Android): ajustes de Resolution (Automatic, Native, 1080p, 720p, Whole screen) y CarPlay screen width (125, 200, 250 o 300 mm, 200 de forma predeterminada), también en la configuración de la app. Native usa los píxeles propios de la unidad principal cuando su navegador puede decodificarlos; un ancho de pantalla mayor muestra más íconos en una página.
- Página de la unidad principal (retransmisor Android): después de que el navegador sale de pantalla completa, por ejemplo por la cámara de reversa, un toque vuelve a pantalla completa sin llegar a CarPlay; un ajuste lo desactiva.
- Página de la unidad principal (retransmisor Android): muestra la versión de la página con su commit y la versión de la app, y se recarga sola una vez después de actualizar la app.
- App de Android: la importación de la identidad de accesorio acepta los dos archivos a la vez, en cualquier orden, o un ZIP que los contenga.
- App de Android: un rastreo de depuración de Carlink en la pantalla para desarrolladores (registro en vivo, archivos guardados, captura de video).

**Cambios**

- App de Android: ya no hay código de enlace; abrir la dirección conecta. Ponle una contraseña al punto de acceso del retransmisor.
- App de Android: la pantalla de inicio muestra la dirección `https://` completa, aclara que es https y no http, y muestra solo direcciones a las que la unidad principal puede llegar.
- App de Android: la elección del punto de acceso recomienda la banda de 5 GHz, y el asistente de configuración se desplaza a los campos que faltan por llenar.
- App de Android: la salida a Carlink está marcada como experimental y con posibles fallas.
- App de Android: solo inglés y chino simplificado; se quitaron las traducciones parciales a otros idiomas.

**Notas**

- Recarga la página de la unidad principal una vez después de actualizar a la 0.1.3; las actualizaciones posteriores la recargan automáticamente.
- Salida a Carlink: en algunas unidades principales, como la del XPeng G6, la pantalla se queda en negro; se está investigando.
- El retransmisor Linux no tiene cambios funcionales en esta versión.

## 0.1.2 {#v0-1-2}

2026-10-18 · [Descargar](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/v0.1.2)

Una versión de estabilidad para la app de Android, con un ajuste de códec de video en la página de la unidad principal.

**Novedades**

- Página de la unidad principal: un ajuste Video codec (Automatic o H.264 only), que recuerda el navegador de esa unidad principal. La configuración también muestra el códec en uso.
- Página de la unidad principal: informa los niveles de H.264 más altos que el navegador puede decodificar, para que un navegador capaz reciba el video del iPhone directamente en lugar de una copia recodificada más lenta.

**Correcciones**

- App de Android: se corrigió un bloqueo mutuo que podía congelar la imagen, detener el control táctil y hacer que la app dejara de responder.
- App de Android: acepta la configuración H.265 del iPhone. Por ahora, la app de Android le pide H.264 al iPhone.
- Retransmisor Linux: el inicio de sesión de administración, la ventana de enlace por Bluetooth y el código de enlace de Carlink siguen funcionando cuando el reloj del dispositivo está mal o salta (el UFI003 no tiene batería de reloj).

**Notas**

- En el retransmisor Linux, vuelve a iniciar sesión en la página de administración después de cada reinicio del dispositivo.

## 0.1.1 {#v0-1-1}

2026-10-18 · [Descargar](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/tag/v0.1.1)

La primera versión con paquetes listos para usar.

**Novedades**

- App de Android: un asistente de configuración te guía por cómo muestra CarPlay el auto (navegador del auto o app Carlink), cómo se conecta el iPhone (inalámbrico o cable USB) y, para la conexión inalámbrica, qué red usar. Luego verifica los permisos, la identidad de accesorio y el enlace con el iPhone, e inicia CarPlay.
- App de Android: cada vez que abres la app con una configuración guardada, puedes iniciar con la última configuración o volver a configurarla. Con el inicio automático activado, la última configuración arranca sola después de 5 segundos.
- App de Android: Home muestra el modo actual (pantalla del auto, conexión del iPhone, red), y cada línea abre el asistente en ese paso, además de la red de este teléfono (Wi-Fi y direcciones IP).
- App de Android firmada y un paquete del retransmisor Linux para aarch64 (para dispositivos como el UFI003), compilados por GitHub Actions, con sumas de verificación SHA-256.

**Correcciones**

- Elegir el navegador del auto después de Carlink ya no pide un nombre de punto de acceso; un punto de acceso al que nunca se le puso nombre vuelve a Wi-Fi Direct.
- Home muestra “Connected” en lugar de “Unavailable” cuando Android oculta el nombre de la red Wi-Fi.

---

El nombre del paquete de Android es `org.openxplay.relay`. Tú aportas tu propia identidad de accesorio de Apple (MFi); ninguna compilación incluye una.
