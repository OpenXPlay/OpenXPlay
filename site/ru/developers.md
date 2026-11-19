---
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: CC-BY-4.0
# Created by riko chen on 2026-11-19
title: 'Разработчикам: архитектура, репозитории, сборка и плагины'
description: Как устроен OpenXPlay — входы, выходы и оболочки ретранслятора, которые взаимодействуют только через модель OXP-Stream, — а также назначение каждого репозитория, команды сборки и тестирования, участие в разработке и плагины веб-приёмника.
breadcrumb: Разработчикам
---

# Разработчикам

OpenXPlay состоит из независимых компонентов: входов, которые принимают сеанс проекции, выходов, которые доставляют его в программы на головном устройстве, и оболочек ретранслятора, которые связывают одно с другим. Компоненты взаимодействуют друг с другом только через модель OXP-Stream. Лицензии и коммерческие исключения описаны в разделе [Лицензии](/ru/licensing).

## Архитектура {#architecture}

Каждый компонент — это вход, выход или оболочка ретранслятора, и ни один компонент не зависит от другого:

| Часть | Роль | Где находится |
| --- | --- | --- |
| Вход | Принимает сеанс от телефона. Вход CarPlay — это приёмник CarPlay ретранслятора. | OpenXPlay-DiPlay (приложение для Android); приёмник CarPlay на Rust `openxplay-relay` с крейтами `carplay-iap2` и `carplay-airplay` (Linux-ретранслятор) |
| Модель OXP-Stream | Общая модель сеанса: видео, звук, касания и клавиши. Компоненты используют её внутри процесса или через сетевой протокол Stream. | `core` в OpenXPlay-Stream |
| Выход | Доставляет сеанс в программы, которые уже есть на головном устройстве: браузер (`web`), Carlink (`clink`) и трансляцию экрана (`cast`). | OpenXPlay-Stream |
| Оболочка ретранслятора | Связывает вход с выходами и выполняет преобразование между ними. | OpenXPlay-Relay: приложение для Android и Linux-ретранслятор |

Поскольку выходы взаимодействуют только с моделью OXP-Stream, одни и те же выходы обслуживают все ретрансляторы. Модель и выходы реализованы по одному разу для каждой среды выполнения: Kotlin/JVM для приложения для Android и Rust для Linux-ретранслятора. Страница приёмника, которую открывает браузер головного устройства, написана на TypeScript, с отдельным кодом для ретранслятора на Android и для Linux-ретранслятора. Общие тестовые векторы протокола поддерживают согласованность реализаций.

Веб-выход отправляет видео H.264 или H.265 через защищённый WebSocket; браузер головного устройства декодирует его с помощью WebCodecs и возвращает касания на iPhone. В Linux-ретрансляторе выходы на Rust работают в отдельном процессе `oxp-relay` рядом с приёмником CarPlay `openxplay-relay`.

## Репозитории {#repositories}

| Репозиторий | Роль | Лицензия |
| --- | --- | --- |
| [OpenXPlay](https://github.com/OpenXPlay/OpenXPlay) | Точка входа проекта: README и схемы | — |
| [OpenXPlay-Relay](https://github.com/OpenXPlay/OpenXPlay-Relay) | OpenXPlay Relay: приложение для Android и Linux-ретранслятор с общей для них веб-страницей администрирования | AGPL-3.0-only; файлы, производные от DiPlay и xcertplay, остаются под GPL-3.0-only |
| [OpenXPlay-Stream](https://github.com/OpenXPlay/OpenXPlay-Stream) | Выходы на приёмники головного устройства — браузер, Carlink и трансляция экрана — и общая модель | AGPL-3.0-only |
| [OpenXPlay-DiPlay](https://github.com/OpenXPlay/OpenXPlay-DiPlay) | Приёмник CarPlay ретранслятора на Android, форк DiPlay | GPL-3.0 |
| [OpenXPlay-Hardware](https://github.com/OpenXPlay/OpenXPlay-Hardware) | Файлы поддержки устройств-ретрансляторов, по одному каталогу на устройство, например `UFI003/` | OpenXPlay-Hardware License (открытый исходный код, без коммерческого использования); части ядра Linux остаются под GPL-2.0-only |
| [OpenXPlay-Web-Plugins](https://github.com/OpenXPlay/OpenXPlay-Web-Plugins) | Необязательные плагины для веб-приёмника: спецификация, SDK, хост, инструменты и официальные плагины | Apache-2.0 OR MIT |

## Сборка и тестирование {#build}

Приложение для Android включает в пакет `kotlin/web-receiver/dist` из Stream, а Linux-ретранслятор — `rust/web-receiver/dist`, поэтому соберите соответствующий веб-приёмник до ретранслятора.

::: details Команды сборки и тестирования для каждой части {#build-commands}
| Часть | Требования | Команды |
| --- | --- | --- |
| Веб-приёмник для ретранслятора на Android (Stream) | Node.js 20.19+ или 22.12+ | `cd kotlin/web-receiver && npm ci && npm test && npm run build` |
| Веб-приёмник для Linux-ретранслятора (Stream) | Node.js 20.19+ или 22.12+ | `cd rust/web-receiver && npm ci && npm test && npm run build` |
| Выходы на Kotlin (Stream) | JDK 17 | `cd kotlin && ./gradlew test` |
| Выходы на Rust (Stream) | Rust stable | `cd rust && cargo test --workspace` |
| Страница администрирования (Relay) | Node.js 20.19+ или 22.12+ | `cd admin-web && npm ci && npm test && npm run build` |
| Приложение для Android (Relay) | JDK 17, Android SDK; предварительно собранные страница администрирования и `kotlin/web-receiver/dist` из Stream | `cd android && ./gradlew testDebugUnitTest assembleDebug` |
| Linux-ретранслятор (Relay) | Rust stable | `cd rust && cargo test` |
| Сборки для aarch64 Linux (Stream и Relay) | `rustup target add aarch64-unknown-linux-musl`, `llvm-tools`, clang | `rust/scripts/build-aarch64.sh` |
| Плагины (Web-Plugins) | Node 22 | `npm ci && npm run build && npm test` |
:::

Сборка для Android подключает DiPlay и Stream как составные сборки Gradle (composite builds) и ожидает, что они лежат рядом с OpenXPlay-Relay (`../OpenXPlay-DiPlay`, `../OpenXPlay-Stream`); `-Pdiplay.dir=PATH` и `-Pstream.dir=PATH` (указывающий на каталог `kotlin/` в Stream) задают другое расположение.

## Участие в разработке {#contributing}

| Репозиторий | Как принимаются изменения |
| --- | --- |
| Все репозитории | По [лицензионному соглашению участника OpenXPlay](https://github.com/OpenXPlay/OpenXPlay/blob/main/CLA.md) (CLA). Примите его один раз, ответив в pull request в любой репозиторий OpenXPlay, как просит проверка CLA; после этого она проходит во всех репозиториях. Чтобы вносить изменения от имени организации, сначала свяжитесь с [support@openxplay.org](mailto:support@openxplay.org) для заключения корпоративного соглашения. |
| OpenXPlay-DiPlay | Форк остаётся близким к исходному DiPlay, поэтому изменения должны быть минимальными и универсальными. |

Этот проект не занимался обратной разработкой коммерческих приставок CarPlay. Части приёмника на Android повторно используют код из DiPlay и xcertplay; благодарим исходные проекты и их участников.

## Плагины {#plugins}

Плагины добавляют в веб-приёмник небольшие офлайн-дополнения. Они необязательны и **по умолчанию выключены**: при выключенных плагинах эталонный приёмник не создаёт фрейм плагина и не выполняет запросов плагинов, а маршруты и каналы плагинов ретранслятора отказывают в доступе. Stream и Relay сами реализуют контракт плагинов (`oxp-web-plugin/0`) и никогда не зависят от OpenXPlay-Web-Plugins. Проверенные пакеты плагинов работают без доступа к сети под защитой песочницы, CSP и защитных уровней. Включите плагины на странице администрирования ретранслятора; они работают в браузере головного устройства и не влияют на CarPlay.

| Официальный плагин | Что он делает | Лицензия |
| --- | --- | --- |
| Cozy Cats (`cats`) | Четыре пиксельных кота со спокойным распорядком дня и игровая комната на время стоянки | Код Apache-2.0 OR MIT; рисунки котов CC0 1.0 |
| Pocket Playroom (`games`) | Офлайн-игры с касаниями для времени на стоянке | Apache-2.0 OR MIT |
| Quiet Lights (`visuals`) | Прогресс песни, свечение обложки альбома, небо по местному времени и камин на стоянке | Apache-2.0 OR MIT |
| Whale Girl (`whale-girl`) | Необязательный некоммерческий персонаж-компаньон от сообщества | Код Apache-2.0 OR MIT; рисунки CC BY-NC-SA 4.0 и 大肥鱼项目署名许可 1.0 |

**Атрибуция Whale Girl.** 鲸鱼娘, автор 上善无形 ([источник](https://www.bilibili.com/opus/1231977657712771073)), CC BY-NC-SA 4.0. Дизайн горничной — ZipZipPipe ([источник](https://www.pixiv.net/artworks/148186519)), CC BY-NC-SA 4.0. Атлас спрайтов — YunYueSama ([codex-deepseek-pet](https://github.com/YunYueSama/codex-deepseek-pet)), 大肥鱼项目署名许可 1.0. Изменено OpenXPlay.org 2026-10-16 (удалена эмблема на фартуке, переименованы ряды) и выпущено под [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Персонаж является фанатским персонажем сообщества, не связан с компанией DeepSeek и не одобрен ею, а его ресурсы нельзя использовать в коммерческих целях.

**Атрибуция Cozy Cats.** Pet Cats Pack, автор LuizMelo ([источник](https://luizmelo.itch.io/pet-cat-pack)), CC0 1.0, перекрашено OpenXPlay.org.

Чтобы создать собственный плагин, начните с симулятора: `npm run dev -- --enable` в OpenXPlay-Web-Plugins загружает официальные плагины по адресу `http://localhost:5173`. `npm run validate` проверяет пакет, а `npm run pack` собирает его; остальное описано в [README репозитория](https://github.com/OpenXPlay/OpenXPlay-Web-Plugins).
