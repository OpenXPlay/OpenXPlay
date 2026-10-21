// SPDX-FileCopyrightText: 2026 OpenXPlay.org
// SPDX-License-Identifier: MIT
// Created by riko chen on 2026-10-17

import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'
import { rememberPage, writeGeneratedFiles } from './generate'
import { seoHead } from './seo'
import {
  BASE, DISCORD_URL, FALLBACK_LOCALE, GITHUB_ORG, LOCALES, SITE_HOST, SITE_NAME, SITE_ROOT,
  SUPPORT_EMAIL, pageRoute,
} from './site'

const repository = (name: string) => `<a href="${GITHUB_ORG}/${name}">${name.replace(/^OpenXPlay-/, '')}</a>`
const repositoryLinks = ['OpenXPlay', 'OpenXPlay-Relay', 'OpenXPlay-Stream', 'OpenXPlay-Hardware', 'OpenXPlay-Web-Plugins', 'OpenXPlay-DiPlay']
  .map(repository).join(' · ')
const mail = `<a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>`
const tag = (kind: 'warning' | 'info', text: string) => `<span class="VPBadge ${kind} oxp-sidebar-tag">${text}</span>`

// Pages that belong to "Get started" in the nav: the start page and every setup guide.
const GUIDE_PAGES = 'quick-start|check|android-relay|ufi003-relay|ufi003-flash|carlink|daily-use|trusted-https'
// Pages that belong to "FAQ" in the nav.
const HELP_PAGES = 'faq|troubleshooting|head-units'

const english: DefaultTheme.Config = {
  nav: [
    { text: 'Get started', link: '/en/quick-start', activeMatch: `^/en/(${GUIDE_PAGES})$` },
    { text: 'How it works', link: '/en/how-it-works' },
    { text: 'FAQ', link: '/en/faq', activeMatch: `^/en/(${HELP_PAGES})$` },
    { text: 'Community', link: '/en/community' },
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
        { text: `Carlink app ${tag('warning', 'Experimental')}`, link: '/en/carlink' },
      ],
    },
    {
      text: 'Using it',
      items: [
        { text: 'Everyday use and settings', link: '/en/daily-use' },
        { text: `Trusted HTTPS ${tag('info', 'Soon')}`, link: '/en/trusted-https' },
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
      ],
    },
  ],
  footer: {
    message: `GitHub: ${repositoryLinks}<br>Contact: ${mail} · <a href="${BASE}en/developers">Developers</a> · <a href="${BASE}en/licensing">Licensing</a> · Site code: <a href="https://opensource.org/license/mit">MIT</a> · Content: <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>`,
    copyright: 'CarPlay and iPhone are trademarks of Apple Inc. OpenXPlay is an independent project and is not affiliated with, endorsed or certified by Apple.',
  },
  outline: { level: [2, 3], label: 'On this page' },
  lastUpdated: { text: 'Last updated', formatOptions: { dateStyle: 'medium' } },
  notFound: {
    title: 'Page not found',
    quote: 'This page doesn’t exist or has moved.',
    linkLabel: 'Go to the home page',
    linkText: 'Take me home',
  },
}

const chinese: DefaultTheme.Config = {
  nav: [
    { text: '开始使用', link: '/quick-start', activeMatch: `^/(${GUIDE_PAGES})$` },
    { text: '工作原理', link: '/how-it-works' },
    { text: '常见问题', link: '/faq', activeMatch: `^/(${HELP_PAGES})$` },
    { text: '交流群', link: '/community' },
  ],
  sidebar: [
    {
      text: '入门',
      items: [
        { text: '工作原理', link: '/how-it-works' },
        { text: '开始使用', link: '/quick-start' },
        { text: '检测车机', link: '/check' },
      ],
    },
    {
      text: '安装中继',
      items: [
        { text: '安卓手机', link: '/android-relay' },
        {
          text: 'UFI003 随身 Wi-Fi',
          link: '/ufi003-relay',
          items: [{ text: '刷入基础镜像', link: '/ufi003-flash' }],
        },
        { text: `Carlink 应用 ${tag('warning', '实验性')}`, link: '/carlink' },
      ],
    },
    {
      text: '使用',
      items: [
        { text: '日常使用与设置', link: '/daily-use' },
        { text: `可信 HTTPS ${tag('info', '即将推出')}`, link: '/trusted-https' },
      ],
    },
    {
      text: '帮助',
      items: [
        { text: '故障排查', link: '/troubleshooting' },
        { text: '常见问题', link: '/faq' },
        { text: '车机资料', link: '/head-units' },
      ],
    },
    {
      text: '项目',
      items: [
        { text: '更新日志', link: '/changelog' },
        { text: '交流群', link: '/community' },
        { text: '开发者', link: '/developers' },
        { text: '许可证', link: '/licensing' },
      ],
    },
  ],
  footer: {
    message: `GitHub：${repositoryLinks}<br>联系：${mail} · <a href="${BASE}developers">开发者</a> · <a href="${BASE}licensing">许可证</a> · 网站代码：<a href="https://opensource.org/license/mit">MIT</a> · 内容：<a href="https://creativecommons.org/licenses/by/4.0/deed.zh-hans">CC BY 4.0</a>`,
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

export default defineConfig({
  base: BASE,
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['README.md'],
  title: SITE_NAME,

  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${BASE}favicon-32.png` }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '192x192', href: `${BASE}icon-192.png` }],
    ['link', { rel: 'apple-touch-icon', href: `${BASE}apple-touch-icon.png` }],
    ['meta', { name: 'theme-color', content: '#f5f5f7', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#1b1b1f', media: '(prefers-color-scheme: dark)' }],
    ['meta', { name: 'author', content: 'OpenXPlay.org' }],
  ],

  // Keep in step with LOCALES in site.ts.
  locales: {
    root: {
      label: '简体中文',
      lang: LOCALES.root.lang,
      title: SITE_NAME,
      titleTemplate: `:title | ${SITE_NAME}`,
      description: 'OpenXPlay 让无法安装应用的安卓车机，通过车机自带的浏览器或 Carlink 应用显示 iPhone CarPlay。',
      themeConfig: chinese,
    },
    en: {
      label: 'English',
      lang: LOCALES.en.lang,
      link: '/en/',
      title: SITE_NAME,
      titleTemplate: `:title | ${SITE_NAME}`,
      description: 'OpenXPlay shows iPhone CarPlay on Android head units that can’t install apps, through the head unit’s browser or Carlink app.',
      themeConfig: english,
    },
  },

  themeConfig: {
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
      // Add x-default (the fallback locale's page, as in seo.ts) to every group of language alternates.
      return items.map(item => {
        if (!item.links?.length) return item
        const fallback = item.links.find(link => link.lang === LOCALES[FALLBACK_LOCALE].lang)
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
    rememberPage(pageData)
  },

  transformHead: seoHead,

  buildEnd: writeGeneratedFiles,

  vite: {
    // The How it works and Community pages show the diagrams and the group QR codes from the
    // repository's assets/ and Group/, which the development server serves only when allowed.
    server: { fs: { allow: [fileURLToPath(new URL('../..', import.meta.url))] } },
  },
})
