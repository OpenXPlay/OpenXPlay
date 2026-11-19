---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: 'HTTPS de confianza con un nombre de dominio gratuito'
description: Usa un nombre gratuito de DuckDNS o dynv6 y un certificado de Let’s Encrypt para que el navegador de la unidad principal abra la página del retransmisor de OpenXPlay sin advertencia de certificado. Incluye el registro, la configuración de los retransmisores Android y Linux, los mensajes de estado, la privacidad y la solución de problemas.
breadcrumb: HTTPS de confianza
schema: howto
howtoName: Activar HTTPS de confianza en un retransmisor de OpenXPlay con un nombre de dominio gratuito
howtoTools:
  - Un nombre de dominio gratuito de DuckDNS o dynv6
  - OpenXPlay Relay con HTTPS de confianza (app de Android o retransmisor Linux)
  - Acceso a internet en el retransmisor (datos móviles en el retransmisor Android)
---

# HTTPS de confianza

Abre la página de la unidad principal sin advertencia de certificado, con un nombre de dominio gratuito. El retransmisor publica su dirección con tu nombre gratuito y obtiene un certificado de Let’s Encrypt para ese nombre; cuando el navegador de la unidad principal abre la página con ese nombre, el certificado se valida. No se instala ni se cambia nada en la unidad principal.

::: info Versiones compatibles
Necesitas la app de Android 0.1.5 o posterior ([descarga la versión más reciente](https://github.com/OpenXPlay/OpenXPlay-Relay/releases/latest/download/openxplay-relay.apk)), o el retransmisor Linux 0.1.6 o posterior (elige la versión `linux-v` más reciente en [Releases](https://github.com/OpenXPlay/OpenXPlay-Relay/releases)).
:::

## Cómo funciona {#how-it-works}

Un navegador confía en un certificado solo cuando lo firmó una autoridad de certificación pública y el nombre que contiene coincide con la barra de direcciones. El certificado propio del retransmisor no está firmado por una autoridad pública, y una dirección IP no le da al navegador ningún nombre que comprobar, así que el navegador muestra una advertencia (consulta [Advertencia de certificado](/es/troubleshooting#certificate-warning)). Con HTTPS de confianza activado, el retransmisor hace tres cosas por sí solo:

- **Publica su dirección:** apunta tu nombre a la dirección privada del retransmisor en la red de la unidad principal, como `192.168.43.20`, y la actualiza cuando la dirección cambia, por ejemplo después de que se reinicia el punto de acceso de Android.
- **Obtiene un certificado:** a través de la API de tu proveedor agrega un registro temporal con ese nombre, que demuestra a Let’s Encrypt que controlas el nombre, y recibe un certificado. Renueva el certificado antes de que venza.
- **Sirve la página:** cuando el navegador de la unidad principal abre `https://<tu nombre>:8443/`, el retransmisor presenta ese certificado.

La comprobación ocurre solo entre el retransmisor, tu proveedor y Let’s Encrypt: nada en internet se conecta al retransmisor, y su página sigue abriéndose solo en la red de la unidad principal. La función está desactivada de forma predeterminada; mientras esté desactivada, el retransmisor funciona exactamente igual que antes.

## Lo que necesitas {#requirements}

| Necesitas | Detalles |
| --- | --- |
| Un nombre de dominio gratuito | De DuckDNS o dynv6; consulta el paso 1. Guarda el nombre completo y el token. |
| Un retransmisor con HTTPS de confianza | La app de Android 0.1.5 o posterior, o el retransmisor Linux 0.1.6 o posterior. |
| Acceso a internet en el retransmisor | Para publicar la dirección y para obtener y renovar certificados. El retransmisor Android necesita datos móviles. |

::: details ¿Por qué datos móviles en el retransmisor Android? {#why-mobile-data}
La unidad principal tiene que buscar el nombre antes de poder abrir la página. En el punto de acceso del teléfono retransmisor, se lo pregunta al teléfono retransmisor, que solo puede responder si tiene acceso a internet. En el punto de acceso propio de la unidad principal o en una red Wi-Fi compartida, esa red hace la búsqueda y necesita acceso a internet ella misma. El retransmisor Linux en su propio punto de acceso es la excepción: responde el nombre dentro del punto de acceso, así que la unidad principal lo encuentra incluso sin acceso a internet. El retransmisor también necesita acceso a internet para publicar su dirección, que en Android puede cambiar cada vez que se inicia el punto de acceso.
:::

::: details ¿Con qué frecuencia necesita acceso a internet? {#how-often-online}
Los certificados vencen: los certificados de Let’s Encrypt duran como máximo unos meses, y su vigencia es cada vez más corta. El retransmisor los renueva con anticipación, pero solo mientras está en línea, así que déjalo conectarse a internet al menos cada pocas semanas. Cuando un certificado vence, el navegador vuelve a mostrar la advertencia; la dirección IP sigue funcionando como antes.
:::

## Registra un nombre gratuito {#register .step}

Registra un nombre nuevo solo para el retransmisor. El retransmisor sobrescribe la dirección del nombre, así que no uses un nombre que ya uses para otra cosa, como acceder desde fuera a dispositivos de tu casa. Dale a cada retransmisor su propio nombre, o se sobrescribirán la dirección entre sí. El nombre se vuelve público, así que elige uno que no te identifique; consulta [Privacidad](#privacy).

Ambos proveedores son gratuitos y el retransmisor es compatible con los dos: {#choose-provider}

| Proveedor | Nombre de ejemplo | Registro | Qué puede cambiar el token |
| --- | --- | --- | --- |
| DuckDNS | `myrelay.duckdns.org` | Inicio de sesión con GitHub, Google, Reddit o X (Twitter); sin contraseña aparte | Todos los nombres de la cuenta |
| dynv6 | `myrelay.dynv6.net` | Correo electrónico y contraseña | Toda la cuenta, o una zona (nombre) |

Nuestra sugerencia: si tienes cuenta de GitHub, elige DuckDNS, que requiere menos pasos; si no, elige dynv6, que solo necesita una dirección de correo electrónico y cuyo token se puede limitar a este único nombre.

::: details DuckDNS: cómo registrarte {#duckdns}
1. Inicia sesión en DuckDNS con GitHub. En un navegador de tu computadora o teléfono, abre [duckdns.org](https://www.duckdns.org/) y elige GitHub; también se ofrecen Google, Reddit y X, pero normalmente no funcionan desde China continental.
2. Agrega un nombre. Escribe un nombre como `myrelay` en el campo que termina en `.duckdns.org` y agrégalo. Luego aparece `myrelay.duckdns.org` en la lista. Ignora la dirección a la que apunta; el retransmisor la actualiza.
3. Busca el token cerca de la parte superior de la página. Se ve como `a1b2c3d4-0000-0000-0000-000000000000`, y es el token que ingresas en el retransmisor.

**Qué guardar:** el nombre completo, como `myrelay.duckdns.org` (no solo `myrelay`), y el token. Un token de DuckDNS puede cambiar todos los nombres de la cuenta, así que cuídalo como una contraseña; consulta [Cómo proteger el token](#token-safety).
:::

::: details dynv6: cómo registrarte {#dynv6}
1. Crea una cuenta de dynv6. En [dynv6.com](https://dynv6.com/), elige *Sign up*, ingresa tu correo electrónico y una contraseña (de al menos 8 caracteres) y luego abre el enlace del correo de confirmación.
2. Crea una zona (así llama dynv6 a un nombre). Una vez que inicies sesión, escribe un nombre y elige el sufijo `dynv6.net`, por ejemplo `myrelay.dynv6.net`. No elijas otro sufijo; el siguiente punto explica por qué.
3. Obtén un token HTTP. Abre la página Keys ([dynv6.com/keys](https://dynv6.com/keys)) y crea o copia un token HTTP; si puedes, limítalo a esta zona.

**Qué guardar:** el nombre completo, como `myrelay.dynv6.net`, y el token HTTP.
:::

::: details ¿Por qué dynv6.net en dynv6? {#why-dynv6-net}
dynv6 también ofrece otros sufijos, pero solo `dynv6.net` está en la Public Suffix List. Let’s Encrypt cuenta su límite semanal de certificados según esa lista: con `dynv6.net` tu nombre se cuenta por separado; con otro sufijo comparte un mismo límite con todos los usuarios de ese sufijo, y las solicitudes fallan con facilidad.
:::

::: details ¿Funciona desde China continental? {#in-mainland-china}
Probado el 2026-10-20: en DuckDNS, la API y los nombres funcionan con banda ancha doméstica y con datos móviles de China Unicom, y de las opciones de inicio de sesión solo GitHub es práctica; en dynv6, la API es accesible en la misma prueba, y el sufijo `dynv6.net` se elige al registrarte.
:::

::: details Cómo proteger el token {#token-safety}
El token funciona como una contraseña del nombre: cualquiera que lo tenga puede apuntar tu nombre a otro lugar.

- Guarda el token en un administrador de contraseñas. No lo publiques en un chat ni compartas capturas de pantalla de la configuración o del archivo de configuración.
- El token se queda en el retransmisor. Una vez ingresado, la app y la página de administración solo muestran *Token saved*, nunca el token.
- Después de importar un archivo de configuración, borra el archivo del teléfono.

Si el token se filtra, obtén uno nuevo de tu proveedor e ingrésalo en el retransmisor (o vuelve a importar el archivo de configuración):

| Proveedor | Cómo reemplazar el token |
| --- | --- |
| DuckDNS | En la página de la cuenta, selecciona las tres líneas pequeñas junto al correo electrónico con el que iniciaste sesión y luego *recreate token*. El nuevo token abarca todos los nombres de la cuenta. |
| dynv6 | En la página Keys, borra el token HTTP anterior y crea uno nuevo. |
:::

## Configúralo en el retransmisor {#setup .step}

Elige una forma para tu retransmisor; todas hacen lo mismo. Let’s Encrypt emite el certificado gratis, y primero te pide aceptar su [Subscriber Agreement](https://letsencrypt.org/repository/): el retransmisor nunca acepta por ti, y no solicita ningún certificado hasta que aceptes. El retransmisor crea su cuenta de Let’s Encrypt sin dirección de correo electrónico ni ningún otro dato de contacto. {#letsencrypt-terms}

::: details Retransmisor Android: en la app {#android-settings}
1. Abre OpenXPlay Relay y ve a Settings → Head-unit access → Trusted HTTPS.
2. Activa *Use a free domain name*.
3. En *DNS provider*, elige DuckDNS o dynv6. La página muestra cómo registrarte con ese proveedor, con enlaces a su sitio y a esta guía. Cada proveedor guarda su propio nombre y token; al cambiar de proveedor se muestra lo que tiene guardado.
4. En *Domain name*, ingresa el nombre completo. Usa, por ejemplo, `myrelay.duckdns.org`, no solo `myrelay`.
5. Pega el token del proveedor en *Token*. Una vez guardado, el campo solo muestra *Token saved*; si después lo dejas vacío, se conserva el token guardado.
6. Marca *I agree to the Let’s Encrypt Subscriber Agreement*.
7. Toca *Save*. La línea de estado muestra *Updating the domain’s address…*, luego *Requesting a certificate…* y, al final, *Ready: … (certificate valid until …)*.
:::

::: details Retransmisor Android: importar un archivo de configuración {#android-import}
Si prefieres no escribir un token largo en el teléfono, escribe un archivo de configuración en una computadora e impórtalo.

1. Escribe el archivo en una computadora. En un editor de texto, crea un archivo como `public-name.json`, complétalo como se describe en [Formato del archivo de configuración](#config-file) y guárdalo como texto sin formato UTF-8.
2. Copia el archivo al teléfono retransmisor con un cable USB, por ejemplo a la carpeta Download, o créalo en el teléfono con una app de edición de texto. El archivo contiene el token, así que evita enviarlo por apps de chat o almacenamiento en la nube.
3. En Settings → Head-unit access → Trusted HTTPS, toca *Import configuration file* en la parte inferior de la tarjeta del proveedor y elige el archivo en el selector de archivos.
4. Tras una importación correcta, la app muestra solo el proveedor y el nombre, cambia al proveedor del archivo y la configuración se aplica de inmediato. Si el archivo tiene un error, la app indica qué entrada está mal.
5. Borra el archivo del teléfono.

A menos que el archivo diga `"enabled": false`, importarlo activa *Use a free domain name*.
:::

::: details Retransmisor Linux: en la página de administración {#linux-admin}
1. Abre la página de administración e inicia sesión. Usa un teléfono o una computadora en la red del retransmisor, por ejemplo con `https://openxplay-admin.local:6975`, o `https://openxplay-car.local:6975` en el punto de acceso del retransmisor.
2. Abre *Settings* y busca *Trusted HTTPS*.
3. Activa *Use a free domain name*, elige el *DNS provider*, ingresa el *Domain name* y el *Token*, y marca *I agree to the Let’s Encrypt Subscriber Agreement*. Cada campo se guarda por separado, y la página muestra *Saved*.
4. Cuando la línea de estado muestre *Ready: … (certificate valid until …)*, abre la página en la unidad principal. *Request certificate now* vuelve a intentarlo de inmediato cuando haga falta.

El token no se vuelve a mostrar una vez guardado; si después dejas el campo vacío, se conserva el token guardado.
:::

::: details Retransmisor Linux: editar el archivo de configuración {#linux-file}
La página de administración guarda esta configuración en `/var/lib/openxplay/public-name.json`. También puedes escribir ese archivo tú mismo, en el [formato del archivo de configuración](#config-file):

1. Escribe el archivo en una computadora y cópialo al retransmisor. Por ejemplo, cópialo a `/root/public-name.json`.
2. Como root, colócalo en el directorio de estado del retransmisor, con lectura y escritura solo para root (modo 0600), y luego borra la copia:

   ```sh
   install -o root -g root -m 0600 /root/public-name.json /var/lib/openxplay/public-name.json
   rm /root/public-name.json
   ```

3. El retransmisor revisa el archivo cada pocos segundos y lo vuelve a leer después de un cambio, sin reiniciar. Luego revisa el estado en la página de administración.

Este archivo es independiente de `settings.json`; no pongas esta configuración en `settings.json`.
:::

::: details Formato del archivo de configuración {#config-file}
El archivo que importa el retransmisor Android y el `/var/lib/openxplay/public-name.json` del retransmisor Linux comparten un mismo formato, un objeto JSON:

| Clave | Obligatoria | Significado |
| --- | --- | --- |
| `version` | Sí | Siempre `1`. |
| `enabled` | No | `true` la activa (valor predeterminado), `false` la desactiva. |
| `provider` | Sí | `duckdns` o `dynv6`. |
| `name` | Sí | El nombre completo, sin punto final, en mayúsculas o minúsculas. Para DuckDNS debe ser `<name>.duckdns.org`; para dynv6, el nombre que administra el token, normalmente `<name>.dynv6.net`. |
| `token` | Sí | El token del proveedor, sin espacios. Un token de DuckDNS se ve como `a1b2c3d4-0000-0000-0000-000000000000`. |
| `agreeLetsEncryptTerms` | Sí | `true` significa que aceptas el Subscriber Agreement de Let’s Encrypt. Sin esto, el retransmisor no solicita ningún certificado. |
| `acme` | No | `production` (valor predeterminado). `staging` es solo para pruebas: los navegadores no confían en sus certificados. |

- Las claves que no están en la tabla generan un error que indica la clave, así que un error de escritura no pasa desapercibido.
- El archivo puede ocupar como máximo 16 KiB.

Un ejemplo por proveedor; reemplaza el nombre y el token por los tuyos:

```json
{
  "version": 1,
  "enabled": true,
  "provider": "duckdns",
  "name": "myrelay.duckdns.org",
  "token": "a1b2c3d4-0000-0000-0000-000000000000",
  "agreeLetsEncryptTerms": true
}
```

```json
{
  "version": 1,
  "enabled": true,
  "provider": "dynv6",
  "name": "myrelay.dynv6.net",
  "token": "your-dynv6-token",
  "agreeLetsEncryptTerms": true
}
```
:::

## Ábrelo en la unidad principal {#open .step}

1. Espera a que la línea de estado muestre *Ready: … (certificate valid until …)*. El primer certificado normalmente tarda uno o dos minutos.
2. Abre la página con el nombre en el navegador de la unidad principal. La dirección es `https://` seguido de tu nombre y `:8443/`, por ejemplo `https://myrelay.duckdns.org:8443/`. Cuando esté listo, el retransmisor muestra esta dirección en primer lugar entre las direcciones para la unidad principal.
3. La página se abre de inmediato, sin advertencia de certificado. Agrégala a favoritos en lugar del favorito anterior con la dirección IP.

La dirección IP (como `https://192.168.43.20:8443/`) sigue funcionando como alternativa. Todavía muestra una advertencia de certificado, que ahora puede decir que el certificado pertenece a otro nombre; es lo esperado.

- Cuando se emite o se renueva un certificado, CarPlay no necesita terminar: una página abierta en la unidad principal sigue conectada, y las páginas que se abran después usan el nuevo certificado.
- La página de administración usa el mismo certificado: reemplaza en su dirección la dirección IP o el nombre `.local` por tu nombre, y también se abrirá sin advertencia.

## Mensajes de estado {#status}

La línea de estado de la app y de la página de administración muestra uno de estos mensajes:

| Estado | Significado | Qué hacer |
| --- | --- | --- |
| *Off* | *Use a free domain name* está desactivado. | Actívalo cuando lo quieras usar. |
| *Fill in the provider, domain name and token, and agree to the terms.* | Falta algo, o no está marcada la aceptación. | Completa la configuración. |
| *Waiting for internet access* | El retransmisor no tiene acceso a internet. El retransmisor Linux también lo muestra mientras su reloj todavía no está sincronizado. | En el retransmisor Android, activa los datos móviles; en el retransmisor Linux, conecta una red con acceso a internet. Una vez en línea (y con el reloj sincronizado), el retransmisor vuelve a intentarlo solo. |
| *Updating the domain’s address…* | El retransmisor está publicando su dirección con el nombre. | Espera. |
| *Requesting a certificate…* | El retransmisor está solicitando un certificado a Let’s Encrypt. | Espera; normalmente tarda uno o dos minutos. |
| *Ready: … (certificate valid until …)* | El certificado es válido y el nombre apunta a la dirección actual del retransmisor. | Abre la página de la unidad principal con el nombre. |
| *Problem: …. Next try at ….* | Algo salió mal. El motivo aparece después de los dos puntos, y luego la hora del siguiente intento automático. | Consulta “Motivos de un problema” más abajo. |

::: details Motivos de un problema {#status-reasons}
| Motivo | Qué significa y qué hacer |
| --- | --- |
| *The provider rejected the token* | El token es incorrecto o ya no es válido; consulta [El proveedor rechaza el token](#token-rejected). |
| *The provider doesn’t know this domain name* | El nombre está mal escrito, o no está en esta cuenta del proveedor elegido. Ingresa el nombre completo, como `myrelay.duckdns.org`, y revisa el *DNS provider*. |
| *The provider asked to wait* | Demasiadas solicitudes. No tienes que hacer nada; el retransmisor vuelve a intentarlo a la hora indicada. |
| *Can’t reach the provider* | El retransmisor no tiene conexión o no puede llegar al proveedor. Revisa el acceso a internet del retransmisor; si el proveedor deja de funcionar por un tiempo, el retransmisor sigue intentándolo. |
| *The provider’s name servers didn’t show the change in time* | El registro de comprobación no llegó a tiempo a los servidores de nombres del proveedor, normalmente porque el proveedor estuvo lento un momento. El retransmisor vuelve a intentarlo solo, o elige *Request certificate now* más tarde. |
| *Let’s Encrypt rejected the request: …* | El motivo de Let’s Encrypt aparece después de los dos puntos. Revisa el nombre y el token; si sigue pasando, publica el mensaje en la [comunidad](/es/community). |
| *Let’s Encrypt asked to wait* | Se alcanzó un límite de Let’s Encrypt. Espera hasta la hora indicada; consulta [Te piden esperar](#rate-limits). |
| *No head-unit network address yet* | El retransmisor todavía no está en la red de la unidad principal, así que no tiene ninguna dirección que publicar. Conecta la red de la unidad principal como en el paso [Conecta la red de la unidad principal](/es/android-relay#step-network) de la guía. |

Después de un problema de red o del proveedor, el retransmisor vuelve a intentarlo a intervalos crecientes: 1 minuto, 5 minutos, 30 minutos, 2 horas, 6 horas y luego una vez al día. Una nueva dirección del retransmisor o un cambio de configuración vuelve a empezar en 1 minuto. Para volver a intentarlo de inmediato, elige *Request certificate now*.
:::

## Solución de problemas {#troubleshooting}

::: details La página no se abre con el nombre {#name-not-resolving}
Primero comprueba que la línea de estado muestre *Ready* y que la dirección empiece con `https://` e incluya `:8443`. Luego:

- **El retransmisor no tiene acceso a internet.** En el punto de acceso del retransmisor Android, la unidad principal busca el nombre a través del teléfono retransmisor. Activa los datos móviles del teléfono retransmisor; mientras tanto, abre la página con su dirección IP. El retransmisor Linux en su propio punto de acceso responde el nombre por sí mismo y no necesita acceso a internet para esto.
- **La dirección acaba de cambiar.** Después de que se reinicia el punto de acceso, la dirección puede cambiar y el retransmisor primero tiene que publicar la nueva. Espera a que la línea de estado vuelva a mostrar *Ready*, dale un momento y luego recarga la página de la unidad principal.
- **El router bloquea las direcciones privadas.** En una red Wi-Fi compartida, algunos routers tienen activada la protección contra DNS rebinding, que descarta las respuestas que apuntan a direcciones privadas. Agrega una excepción para tu nombre en el router, o desactiva la protección; si no, usa la dirección IP.
- **Filtrado de DNS.** Un servicio de DNS con filtrado o un bloqueador de anuncios en el teléfono retransmisor o en la unidad principal también puede descartar estas respuestas. Prueba otro DNS, o desactiva el filtro un momento.
:::

::: details El proveedor rechaza el token {#token-rejected}
- Vuelve a copiar el token, sin espacios de más ni caracteres faltantes.
- Comprueba que el token y el nombre pertenezcan a la misma cuenta y que el *DNS provider* sea el correcto.
- DuckDNS: después de volver a crear el token, el anterior deja de funcionar; ingresa el nuevo.
- dynv6: si el token está limitado a una zona, comprueba que sea la zona de este nombre.
:::

::: details Te piden esperar {#rate-limits}
Tanto tu proveedor como Let’s Encrypt limitan con qué frecuencia se les puede hacer solicitudes. Cuando el estado muestra *The provider asked to wait* o *Let’s Encrypt asked to wait*, no hagas nada: el retransmisor vuelve a intentarlo a la hora indicada.

- Let’s Encrypt emite como máximo 5 certificados para el mismo nombre cada 7 días, y permite como máximo 5 comprobaciones fallidas por nombre por hora (las reglas en octubre de 2026). Las renovaciones en el momento que sugiere Let’s Encrypt no cuentan para estos límites.
- No elijas *Remove* y vuelvas a configurarlo una y otra vez. Eliminar borra el certificado, así que cada nueva configuración necesita un certificado nuevo, y el límite se agota rápido.
- El retransmisor también se limita a sí mismo: como máximo 3 certificados nuevos por nombre cada 24 horas, y ninguno mientras al certificado actual le queden más de 7 días y no toque renovarlo.
:::

::: details El nombre todavía muestra una advertencia de certificado {#still-warning}
- Comprueba que la dirección use el nombre, no la dirección IP.
- Comprueba que la línea de estado muestre *Ready*. Una página de la unidad principal abierta antes de que el certificado estuviera listo conserva su conexión anterior; vuelve a abrirla con el nombre.
- Revisa la fecha y la hora de la unidad principal. Si están muy desfasadas, el navegador cree que el certificado todavía no es válido o que ya venció.
- Un sistema o navegador muy antiguo de la unidad principal puede no confiar en los certificados de Let’s Encrypt; en ese caso, sigue usando la dirección IP.
:::

## Privacidad {#privacy}

- **El nombre se vuelve público.** Cada certificado que emite Let’s Encrypt queda registrado en los registros públicos de Certificate Transparency, donde cualquiera puede encontrar tu nombre.
- **También la dirección privada.** Cualquiera que busque el nombre ve la dirección que publicó el retransmisor, como `192.168.43.20`. Pertenece a la red de la unidad principal y no se puede alcanzar desde internet, pero cualquiera puede verla.
- **Elige un nombre que no te identifique.** Evita tu nombre, tu número de placa o tu número de teléfono; lo mejor es una cadena aleatoria de letras y números como `k7m2q9x4.duckdns.org`.
- **Tu proveedor conoce tu cuenta.** DuckDNS conoce la cuenta de GitHub (u otra) con la que inicias sesión; dynv6 conoce tu dirección de correo electrónico. Cuando el retransmisor actualiza la dirección o solicita un certificado, el proveedor y Let’s Encrypt ven la dirección pública de la conexión a internet del retransmisor.
- **El token se queda en el retransmisor;** consulta [Cómo proteger el token](#token-safety).

## Desactivarlo o eliminarlo {#turn-off}

- **Desactivar:** con *Use a free domain name* desactivado, el retransmisor detiene todas las solicitudes y sirve solo su propio certificado, así que el navegador de la unidad principal vuelve a mostrar la advertencia. En el retransmisor Linux, `"enabled": false` en el archivo de configuración hace lo mismo.
- **Eliminar:** *Remove* en la app de Android o en la página de administración del retransmisor Linux (después de que confirmes) borra la configuración, el token, el certificado y sus claves. En el retransmisor Linux, borrar `/var/lib/openxplay/public-name.json` hace lo mismo.
- Ninguna de las dos opciones cambia el nombre en tu proveedor: sigue apuntando a la última dirección publicada. Si ya no lo necesitas, bórralo en el sitio web del proveedor.
