// SPDX-FileCopyrightText: 2026 OpenXPlay.org
// SPDX-License-Identifier: MIT
// Created by riko chen on 2026-10-17

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'
import { carNames, carsPlugin } from './cars'
import { rememberPage, writeGeneratedFiles } from './generate'
import { seoHead } from './seo'
import {
  BASE, DEFAULT_LOCALE, DISCORD_URL, GITHUB_ORG, LOCALES, SITE_HOST, SITE_NAME, SITE_ROOT,
  PAGE_SLUGS, SUPPORT_EMAIL, pageRoute, type LocaleKey,
} from './site'

const SRC_DIR = fileURLToPath(new URL('..', import.meta.url))

/**
 * A link to a page that a language doesn't have yet, such as /es/<slug> before that page is
 * translated. The page simply has no version in that language: the build doesn't stop on links to it,
 * and the sitemap, hreflang alternates (seo.ts) and llms files (generate.ts) leave it out.
 */
function untranslatedPage(url: string): boolean {
  const match = /^\/([a-z]+)\/(.*)$/.exec(url)
  if (!match || !(match[1] in LOCALES)) return false
  const slug = match[2].replace(/(^|\/)index$/, '')
  return (PAGE_SLUGS as readonly string[]).includes(slug)
    && fs.existsSync(path.join(SRC_DIR, LOCALES[DEFAULT_LOCALE].prefix, `${slug || 'index'}.md`))
    && !fs.existsSync(path.join(SRC_DIR, LOCALES[match[1] as LocaleKey].prefix, `${slug || 'index'}.md`))
}

const repository = (name: string) => `<a href="${GITHUB_ORG}/${name}">${name.replace(/^OpenXPlay-/, '')}</a>`
const repositoryLinks = ['OpenXPlay', 'OpenXPlay-Relay', 'OpenXPlay-Stream', 'OpenXPlay-Hardware', 'OpenXPlay-Web-Plugins', 'OpenXPlay-DiPlay']
  .map(repository).join(' · ')
const mail = `<a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>`
const tag = (kind: 'warning' | 'info', text: string) => `<span class="VPBadge ${kind} oxp-sidebar-tag">${text}</span>`

// Pages that belong to "Get started" in the nav: the start page and every setup guide.
const GUIDE_PAGES = 'quick-start|check|android-relay|ufi003-relay|ufi003-flash|phicomm-n1|linux-devices|carlink|carlife|wireless-display|tesla|daily-use|trusted-https'
// Pages that belong to "FAQ" in the nav.
const HELP_PAGES = 'faq|troubleshooting|head-units'

const english: DefaultTheme.Config = {
  nav: [
    { text: 'Get started', link: '/en/quick-start', activeMatch: `^/en/(${GUIDE_PAGES})$` },
    { text: 'How it works', link: '/en/how-it-works' },
    { text: 'FAQ', link: '/en/faq', activeMatch: `^/en/(${HELP_PAGES})$` },
    { text: 'Join a group', link: 'https://openxplay.com/en/join' },
  ],
  sidebar: [
    {
      text: 'Start here',
      items: [
        { text: 'How it works', link: '/en/how-it-works' },
        { text: 'Get started', link: '/en/quick-start' },
        { text: 'Check your head unit', link: '/en/check' },
      ],
    },
    {
      text: 'Set up a relay',
      items: [
        { text: 'Android phone', link: '/en/android-relay' },
        {
          text: 'UFI003 USB dongle',
          link: '/en/ufi003-relay',
          items: [{ text: 'Flash the base image', link: '/en/ufi003-flash' }],
        },
        { text: `Phicomm N1 TV box ${tag('info', 'Advanced')}`, link: '/en/phicomm-n1' },
        { text: `Other Linux devices ${tag('info', 'Advanced')}`, link: '/en/linux-devices' },
        { text: 'Carlink app', link: '/en/carlink' },
        { text: `CarLife ${tag('warning', 'Experimental')}`, link: '/en/carlife' },
        { text: `Wireless display ${tag('warning', 'Experimental')}`, link: '/en/wireless-display' },
        { text: `Tesla ${tag('warning', 'Experimental')}`, link: '/en/tesla' },
      ],
    },
    {
      text: 'Using it',
      items: [
        { text: 'Everyday use and settings', link: '/en/daily-use' },
        { text: 'Trusted HTTPS', link: '/en/trusted-https' },
      ],
    },
    {
      text: 'Help',
      items: [
        { text: 'Troubleshooting', link: '/en/troubleshooting' },
        { text: 'FAQ', link: '/en/faq' },
        { text: 'Head units', link: '/en/head-units' },
      ],
    },
    {
      text: 'Project',
      items: [
        { text: 'Changelog', link: '/en/changelog' },
        { text: 'Community', link: '/en/community' },
        { text: 'Developers', link: '/en/developers' },
        { text: 'Licensing', link: '/en/licensing' },
        { text: 'Privacy', link: '/en/privacy' },
      ],
    },
  ],
  footer: {
    message: `GitHub: ${repositoryLinks}<br>Contact: ${mail} · <a href="${BASE}en/developers">Developers</a> · <a href="${BASE}en/licensing">Licensing</a> · <a href="${BASE}en/privacy">Privacy</a> · Site code: <a href="https://opensource.org/license/mit">MIT</a> · Content: <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>`,
    copyright: 'CarPlay and iPhone are trademarks of Apple Inc. OpenXPlay is an independent project and is not affiliated with, endorsed or certified by Apple.',
  },
  outline: { level: [2, 3], label: 'On this page' },
  lastUpdated: { text: 'Last updated', formatOptions: { dateStyle: 'medium' } },
  // Set in full, so the default language's top-level theme labels never show on English pages.
  docFooter: { prev: 'Previous page', next: 'Next page' },
  darkModeSwitchLabel: 'Appearance',
  lightModeSwitchTitle: 'Switch to light theme',
  darkModeSwitchTitle: 'Switch to dark theme',
  sidebarMenuLabel: 'Menu',
  returnToTopLabel: 'Return to top',
  langMenuLabel: 'Change language',
  skipToContentLabel: 'Skip to content',
  notFound: {
    title: 'Page not found',
    quote: 'This page doesn’t exist or has moved.',
    linkLabel: 'Go to the home page',
    linkText: 'Take me home',
  },
}

const chinese: DefaultTheme.Config = {
  nav: [
    { text: '开始使用', link: '/zh/quick-start', activeMatch: `^/zh/(${GUIDE_PAGES})$` },
    { text: '工作原理', link: '/zh/how-it-works' },
    { text: '常见问题', link: '/zh/faq', activeMatch: `^/zh/(${HELP_PAGES})$` },
    { text: '加入群聊', link: 'https://openxplay.com/join' },
  ],
  sidebar: [
    {
      text: '入门',
      items: [
        { text: '工作原理', link: '/zh/how-it-works' },
        { text: '开始使用', link: '/zh/quick-start' },
        { text: '检测车机', link: '/zh/check' },
      ],
    },
    {
      text: '安装中继',
      items: [
        { text: '安卓手机', link: '/zh/android-relay' },
        {
          text: 'UFI003 随身 Wi-Fi',
          link: '/zh/ufi003-relay',
          items: [{ text: '刷入基础镜像', link: '/zh/ufi003-flash' }],
        },
        { text: `斐讯 N1 电视盒子 ${tag('info', '进阶')}`, link: '/zh/phicomm-n1' },
        { text: `其他 Linux 设备 ${tag('info', '进阶')}`, link: '/zh/linux-devices' },
        { text: 'Carlink 应用', link: '/zh/carlink' },
        { text: `CarLife ${tag('warning', '实验性')}`, link: '/zh/carlife' },
        { text: `无线投屏 ${tag('warning', '实验性')}`, link: '/zh/wireless-display' },
        { text: `特斯拉 ${tag('warning', '实验性')}`, link: '/zh/tesla' },
      ],
    },
    {
      text: '使用',
      items: [
        { text: '日常使用与设置', link: '/zh/daily-use' },
        { text: '可信 HTTPS', link: '/zh/trusted-https' },
      ],
    },
    {
      text: '帮助',
      items: [
        { text: '故障排查', link: '/zh/troubleshooting' },
        { text: '常见问题', link: '/zh/faq' },
        { text: '车机资料', link: '/zh/head-units' },
      ],
    },
    {
      text: '项目',
      items: [
        { text: '更新日志', link: '/zh/changelog' },
        { text: '交流群', link: '/zh/community' },
        { text: '开发者', link: '/zh/developers' },
        { text: '许可证', link: '/zh/licensing' },
        { text: '隐私', link: '/zh/privacy' },
      ],
    },
  ],
  footer: {
    message: `GitHub：${repositoryLinks}<br>联系：${mail} · <a href="${BASE}zh/developers">开发者</a> · <a href="${BASE}zh/licensing">许可证</a> · <a href="${BASE}zh/privacy">隐私</a> · 网站代码：<a href="https://opensource.org/license/mit">MIT</a> · 内容：<a href="https://creativecommons.org/licenses/by/4.0/deed.zh-hans">CC BY 4.0</a>`,
    copyright: 'CarPlay 和 iPhone 是 Apple Inc. 的商标。OpenXPlay 为独立项目，与 Apple 不存在隶属、认可或认证关系。',
  },
  outline: { level: [2, 3], label: '本页内容' },
  lastUpdated: { text: '最后更新', formatOptions: { dateStyle: 'medium' } },
  docFooter: { prev: '上一页', next: '下一页' },
  darkModeSwitchLabel: '外观',
  lightModeSwitchTitle: '切换到浅色模式',
  darkModeSwitchTitle: '切换到深色模式',
  sidebarMenuLabel: '菜单',
  returnToTopLabel: '回到顶部',
  langMenuLabel: '切换语言',
  skipToContentLabel: '跳到正文',
  notFound: {
    title: '找不到页面',
    quote: '这个页面不存在或已经移动。',
    linkLabel: '返回首页',
    linkText: '返回首页',
  },
}

const russian: DefaultTheme.Config = {
  nav: [
    { text: 'Быстрый старт', link: '/ru/quick-start', activeMatch: `^/ru/(${GUIDE_PAGES})$` },
    { text: 'Как это работает', link: '/ru/how-it-works' },
    { text: 'Частые вопросы', link: '/ru/faq', activeMatch: `^/ru/(${HELP_PAGES})$` },
    { text: 'Вступить в чат', link: 'https://openxplay.com/ru/join' },
  ],
  sidebar: [
    {
      text: 'С чего начать',
      items: [
        { text: 'Как это работает', link: '/ru/how-it-works' },
        { text: 'Быстрый старт', link: '/ru/quick-start' },
        { text: 'Проверка головного устройства', link: '/ru/check' },
      ],
    },
    {
      text: 'Настройка ретранслятора',
      items: [
        { text: 'Телефон Android', link: '/ru/android-relay' },
        {
          text: 'USB-модем UFI003',
          link: '/ru/ufi003-relay',
          items: [{ text: 'Прошивка базового образа', link: '/ru/ufi003-flash' }],
        },
        { text: `ТВ-приставка Phicomm N1 ${tag('info', 'Для опытных')}`, link: '/ru/phicomm-n1' },
        { text: `Другие устройства на Linux ${tag('info', 'Для опытных')}`, link: '/ru/linux-devices' },
        { text: 'Приложение Carlink', link: '/ru/carlink' },
        { text: `CarLife ${tag('warning', 'Экспериментально')}`, link: '/ru/carlife' },
        { text: `Беспроводная трансляция ${tag('warning', 'Экспериментально')}`, link: '/ru/wireless-display' },
        { text: `Tesla ${tag('warning', 'Экспериментально')}`, link: '/ru/tesla' },
      ],
    },
    {
      text: 'Использование',
      items: [
        { text: 'Повседневное использование и настройки', link: '/ru/daily-use' },
        { text: 'Доверенный HTTPS', link: '/ru/trusted-https' },
      ],
    },
    {
      text: 'Помощь',
      items: [
        { text: 'Решение проблем', link: '/ru/troubleshooting' },
        { text: 'Частые вопросы', link: '/ru/faq' },
        { text: 'Головные устройства', link: '/ru/head-units' },
      ],
    },
    {
      text: 'Проект',
      items: [
        { text: 'История изменений', link: '/ru/changelog' },
        { text: 'Сообщество', link: '/ru/community' },
        { text: 'Разработчикам', link: '/ru/developers' },
        { text: 'Лицензии', link: '/ru/licensing' },
        { text: 'Конфиденциальность', link: '/ru/privacy' },
      ],
    },
  ],
  footer: {
    message: `GitHub: ${repositoryLinks}<br>Контакты: ${mail} · <a href="${BASE}ru/developers">Разработчикам</a> · <a href="${BASE}ru/licensing">Лицензии</a> · <a href="${BASE}ru/privacy">Конфиденциальность</a> · Код сайта: <a href="https://opensource.org/license/mit">MIT</a> · Содержимое: <a href="https://creativecommons.org/licenses/by/4.0/deed.ru">CC BY 4.0</a>`,
    copyright: 'CarPlay и iPhone — товарные знаки Apple Inc. OpenXPlay — независимый проект, не связанный с Apple, не одобренный и не сертифицированный ею.',
  },
  outline: { level: [2, 3], label: 'На этой странице' },
  lastUpdated: { text: 'Обновлено', formatOptions: { dateStyle: 'medium' } },
  docFooter: { prev: 'Предыдущая страница', next: 'Следующая страница' },
  darkModeSwitchLabel: 'Оформление',
  lightModeSwitchTitle: 'Включить светлую тему',
  darkModeSwitchTitle: 'Включить тёмную тему',
  sidebarMenuLabel: 'Меню',
  returnToTopLabel: 'Наверх',
  langMenuLabel: 'Сменить язык',
  skipToContentLabel: 'Перейти к содержимому',
  notFound: {
    title: 'Страница не найдена',
    quote: 'Этой страницы нет или она перемещена.',
    linkLabel: 'Перейти на главную страницу',
    linkText: 'На главную',
  },
}

const spanish: DefaultTheme.Config = {
  nav: [
    { text: 'Inicio rápido', link: '/es/quick-start', activeMatch: `^/es/(${GUIDE_PAGES})$` },
    { text: 'Cómo funciona', link: '/es/how-it-works' },
    { text: 'Preguntas frecuentes', link: '/es/faq', activeMatch: `^/es/(${HELP_PAGES})$` },
    { text: 'Unirse a un grupo', link: 'https://openxplay.com/es/join' },
  ],
  sidebar: [
    {
      text: 'Empieza aquí',
      items: [
        { text: 'Cómo funciona', link: '/es/how-it-works' },
        { text: 'Inicio rápido', link: '/es/quick-start' },
        { text: 'Verifica tu unidad principal', link: '/es/check' },
      ],
    },
    {
      text: 'Configura un retransmisor',
      items: [
        { text: 'Teléfono Android', link: '/es/android-relay' },
        {
          text: 'Módem USB UFI003',
          link: '/es/ufi003-relay',
          items: [{ text: 'Flashear la imagen base', link: '/es/ufi003-flash' }],
        },
        { text: `TV box Phicomm N1 ${tag('info', 'Avanzado')}`, link: '/es/phicomm-n1' },
        { text: `Otros dispositivos Linux ${tag('info', 'Avanzado')}`, link: '/es/linux-devices' },
        { text: 'App Carlink', link: '/es/carlink' },
        { text: `CarLife ${tag('warning', 'Experimental')}`, link: '/es/carlife' },
        { text: `Transmisión inalámbrica ${tag('warning', 'Experimental')}`, link: '/es/wireless-display' },
        { text: `Tesla ${tag('warning', 'Experimental')}`, link: '/es/tesla' },
      ],
    },
    {
      text: 'Uso',
      items: [
        { text: 'Uso diario y configuración', link: '/es/daily-use' },
        { text: 'HTTPS de confianza', link: '/es/trusted-https' },
      ],
    },
    {
      text: 'Ayuda',
      items: [
        { text: 'Solución de problemas', link: '/es/troubleshooting' },
        { text: 'Preguntas frecuentes', link: '/es/faq' },
        { text: 'Unidades principales', link: '/es/head-units' },
      ],
    },
    {
      text: 'Proyecto',
      items: [
        { text: 'Historial de cambios', link: '/es/changelog' },
        { text: 'Comunidad', link: '/es/community' },
        { text: 'Desarrolladores', link: '/es/developers' },
        { text: 'Licencias', link: '/es/licensing' },
        { text: 'Privacidad', link: '/es/privacy' },
      ],
    },
  ],
  footer: {
    message: `GitHub: ${repositoryLinks}<br>Contacto: ${mail} · <a href="${BASE}es/developers">Desarrolladores</a> · <a href="${BASE}es/licensing">Licencias</a> · <a href="${BASE}es/privacy">Privacidad</a> · Código del sitio: <a href="https://opensource.org/license/mit">MIT</a> · Contenido: <a href="https://creativecommons.org/licenses/by/4.0/deed.es">CC BY 4.0</a>`,
    copyright: 'CarPlay y iPhone son marcas comerciales de Apple Inc. OpenXPlay es un proyecto independiente y no está afiliado, respaldado ni certificado por Apple.',
  },
  outline: { level: [2, 3], label: 'En esta página' },
  lastUpdated: { text: 'Última actualización', formatOptions: { dateStyle: 'medium' } },
  docFooter: { prev: 'Página anterior', next: 'Página siguiente' },
  darkModeSwitchLabel: 'Apariencia',
  lightModeSwitchTitle: 'Cambiar al tema claro',
  darkModeSwitchTitle: 'Cambiar al tema oscuro',
  sidebarMenuLabel: 'Menú',
  returnToTopLabel: 'Volver arriba',
  langMenuLabel: 'Cambiar idioma',
  skipToContentLabel: 'Ir al contenido',
  notFound: {
    title: 'Página no encontrada',
    quote: 'Esta página no existe o se movió.',
    linkLabel: 'Ir a la página de inicio',
    linkText: 'Ir al inicio',
  },
}

const THEMES: Record<LocaleKey, DefaultTheme.Config> = { zh: chinese, en: english, ru: russian, es: spanish }

const DESCRIPTIONS: Record<LocaleKey, string> = {
  zh: 'OpenXPlay 让无法安装应用的安卓车机，通过车机自带的浏览器或 Carlink 应用显示 iPhone CarPlay。',
  en: 'OpenXPlay shows iPhone CarPlay on Android head units that can’t install apps, through the head unit’s browser or Carlink app.',
  ru: 'OpenXPlay показывает iPhone CarPlay на головных устройствах Android, на которые нельзя установить приложения, через встроенный браузер или приложение Carlink.',
  es: 'OpenXPlay muestra CarPlay del iPhone en unidades principales Android que no pueden instalar apps, a través del navegador o la app Carlink de la unidad principal.',
}

export default defineConfig({
  base: BASE,
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['README.md', 'public/**'],
  ignoreDeadLinks: [untranslatedPage],
  title: SITE_NAME,
  // Pages outside the locale directories (only the not-found page) use the default language.
  lang: LOCALES[DEFAULT_LOCALE].lang,
  description: DESCRIPTIONS[DEFAULT_LOCALE],

  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${BASE}favicon-32.png` }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: `${BASE}icon-192.png` }],
    ['link', { rel: 'apple-touch-icon', href: `${BASE}apple-touch-icon.png` }],
    ['meta', { name: 'theme-color', content: '#f5f5f7', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#1b1b1f', media: '(prefers-color-scheme: dark)' }],
    ['meta', { name: 'author', content: 'OpenXPlay.org' }],
  ],

  // Keep in step with LOCALES in site.ts. There is no root locale: every page lives under its
  // language's prefix, and the root URLs redirect to DEFAULT_LOCALE (generate.ts).
  locales: {
    zh: {
      label: '简体中文',
      lang: LOCALES.zh.lang,
      link: '/zh/',
      title: SITE_NAME,
      titleTemplate: `:title | ${SITE_NAME}`,
      description: DESCRIPTIONS.zh,
      themeConfig: chinese,
    },
    en: {
      label: 'English',
      lang: LOCALES.en.lang,
      link: '/en/',
      title: SITE_NAME,
      titleTemplate: `:title | ${SITE_NAME}`,
      description: DESCRIPTIONS.en,
      themeConfig: english,
    },
    ru: {
      label: 'Русский',
      lang: LOCALES.ru.lang,
      link: '/ru/',
      title: SITE_NAME,
      titleTemplate: `:title | ${SITE_NAME}`,
      description: DESCRIPTIONS.ru,
      themeConfig: russian,
    },
    es: {
      label: 'Español',
      lang: LOCALES.es.lang,
      link: '/es/',
      title: SITE_NAME,
      titleTemplate: `:title | ${SITE_NAME}`,
      description: DESCRIPTIONS.es,
      themeConfig: spanish,
    },
  },

  themeConfig: {
    ...THEMES[DEFAULT_LOCALE],
    logo: { src: '/logo.png', alt: '' },
    siteTitle: SITE_NAME,
    externalLinkIcon: true,
    socialLinks: [
      { icon: 'github', link: GITHUB_ORG, ariaLabel: 'OpenXPlay on GitHub' },
      { icon: 'discord', link: DISCORD_URL, ariaLabel: 'OpenXPlay on Discord' },
    ],
  },

  sitemap: {
    hostname: SITE_ROOT,
    transformItems(items) {
      // Add x-default (the default locale's page, as in seo.ts) to every group of language alternates.
      return items.filter(item => item.url !== '404').map(item => {
        if (!item.links?.length) return item
        const fallback = item.links.find(link => link.lang === LOCALES[DEFAULT_LOCALE].lang)
        const links = item.links.filter(link => link.lang !== 'x-default')
        return { ...item, links: fallback ? [...links, { lang: 'x-default', url: fallback.url }] : links }
      })
    },
  },

  transformPageData(pageData) {
    const { locale, slug } = pageRoute(pageData.relativePath)
    if (slug === 'check') {
      // The short address a driver types into the head unit's browser.
      pageData.frontmatter.checkAddress = `${SITE_HOST}${BASE}${LOCALES[locale].prefix}check`
    }
    // A description may list the cars in the car database with {cars}.
    if (pageData.description.includes('{cars}')) {
      pageData.description = pageData.description.replace('{cars}', carNames(locale))
      pageData.frontmatter.description = pageData.description
    }
    rememberPage(pageData)
  },

  transformHead: seoHead,

  buildEnd: writeGeneratedFiles,

  vite: {
    // The Head units pages are generated from the car database in data/.
    plugins: [carsPlugin(SRC_DIR)],
    // The How it works and Community pages show the diagrams and the group QR codes
    // from the repository's assets/ and Group/, which the development server serves only when allowed.
    server: { fs: { allow: [fileURLToPath(new URL('../..', import.meta.url))] } },
  },
})
