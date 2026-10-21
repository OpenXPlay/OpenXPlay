// SPDX-FileCopyrightText: 2026 OpenXPlay.org
// SPDX-License-Identifier: MIT
// Created by riko chen on 2026-10-17

// Per-page <head> tags added at build time: canonical URL, hreflang alternates, Open Graph and
// Twitter cards, and JSON-LD structured data.

import fs from 'node:fs'
import path from 'node:path'
import type { HeadConfig, TransformContext } from 'vitepress'
import { extractFaq, extractHowTo } from './markdown-text'
import {
  FALLBACK_LOCALE, GITHUB_ORG, LOCALES, SITE_NAME, SITE_ROOT, SUPPORT_EMAIL,
  assetUrl, pageRoute, pageUrl, type LocaleKey,
} from './site'

const SOCIAL_IMAGE = {
  root: {
    file: 'og-image-zh.png',
    alt: 'OpenXPlay 中继连接路线：iPhone 经 Android 或 Linux 中继连接车机的浏览器、Carlink、无线投屏或有线投屏',
  },
  en: {
    file: 'og-image-en.png',
    alt: 'OpenXPlay relay route: an iPhone connects through an Android or Linux relay to the head unit’s browser, Carlink, wireless display or wired display',
  },
} as const

const SOFTWARE_DESCRIPTION: Record<LocaleKey, string> = {
  root: '开源中继软件：让无法安装应用的安卓车机通过车机自带的浏览器或 Carlink 应用显示 iPhone CarPlay。可作为 Android 应用运行，也可运行在小型 Linux 设备上。',
  en: 'Open-source relay software that shows iPhone CarPlay on Android head units that cannot install apps, through the head unit’s browser or Carlink app. Runs as an Android app or on small Linux devices.',
}

const organizationId = `${SITE_ROOT}#organization`
const websiteId = `${SITE_ROOT}#website`

function jsonLd(data: object): HeadConfig {
  // Escape "<" so the JSON can never close the script element.
  return ['script', { type: 'application/ld+json' }, JSON.stringify(data).replace(/</g, '\\u003c')]
}

function sourceExists(srcDir: string, locale: LocaleKey, slug: string): boolean {
  return fs.existsSync(path.join(srcDir, `${LOCALES[locale].prefix}${slug || 'index'}.md`))
}

export function seoHead(context: TransformContext): HeadConfig[] {
  const { pageData, siteConfig, title, description } = context
  if (pageData.isNotFound || pageData.relativePath === '404.md') {
    return [['meta', { name: 'robots', content: 'noindex' }]]
  }
  const { locale, slug } = pageRoute(pageData.relativePath)
  const info = LOCALES[locale]
  const url = pageUrl(locale, slug)
  const frontmatter = pageData.frontmatter
  const locales = (Object.keys(LOCALES) as LocaleKey[]).filter(key => sourceExists(siteConfig.srcDir, key, slug))
  const image = SOCIAL_IMAGE[locale]
  const head: HeadConfig[] = [['link', { rel: 'canonical', href: url }]]

  for (const key of locales) {
    head.push(['link', { rel: 'alternate', hreflang: LOCALES[key].lang, href: pageUrl(key, slug) }])
  }
  if (locales.includes(FALLBACK_LOCALE)) {
    head.push(['link', { rel: 'alternate', hreflang: 'x-default', href: pageUrl(FALLBACK_LOCALE, slug) }])
  }

  head.push(
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:locale', content: info.ogLocale }],
    ...locales.filter(key => key !== locale)
      .map((key): HeadConfig => ['meta', { property: 'og:locale:alternate', content: LOCALES[key].ogLocale }]),
    ['meta', { property: 'og:image', content: assetUrl(image.file) }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: image.alt }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: assetUrl(image.file) }],
    ['meta', { name: 'twitter:image:alt', content: image.alt }],
  )

  const source = fs.readFileSync(path.join(siteConfig.srcDir, pageData.relativePath), 'utf8')
  const modified = typeof pageData.lastUpdated === 'number' && Number.isFinite(pageData.lastUpdated) && pageData.lastUpdated > 0
    ? new Date(pageData.lastUpdated).toISOString()
    : undefined
  const pageName = String(frontmatter.breadcrumb ?? pageData.title ?? SITE_NAME)
  const graph: object[] = []
  const webPage: Record<string, unknown> = {
    '@type': frontmatter.schema === 'faq' ? 'FAQPage' : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: info.lang,
    isPartOf: { '@id': websiteId },
    publisher: { '@id': organizationId },
    primaryImageOfPage: { '@type': 'ImageObject', url: assetUrl(image.file), width: 1200, height: 630 },
    ...(modified ? { dateModified: modified } : {}),
  }
  graph.push(webPage)

  if (!slug) {
    graph.push(
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: SITE_NAME,
        alternateName: 'OpenXPlay.org',
        url: SITE_ROOT,
        logo: { '@type': 'ImageObject', url: assetUrl('logo.png'), width: 512, height: 512 },
        email: SUPPORT_EMAIL,
        sameAs: [GITHUB_ORG],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: SITE_NAME,
        url: SITE_ROOT,
        inLanguage: Object.values(LOCALES).map(entry => entry.lang),
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_ROOT}#software`,
        name: SITE_NAME,
        description: SOFTWARE_DESCRIPTION[locale],
        url: SITE_ROOT,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Android, Linux',
        license: 'https://www.gnu.org/licenses/agpl-3.0.html',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@id': organizationId },
        image: assetUrl(image.file),
        softwareHelp: { '@type': 'CreativeWork', url: pageUrl(locale, 'quick-start') },
      },
    )
    webPage.about = { '@id': `${SITE_ROOT}#software` }
  } else {
    webPage.breadcrumb = { '@id': `${url}#breadcrumb` }
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: info.home, item: pageUrl(locale, '') },
        { '@type': 'ListItem', position: 2, name: pageName, item: url },
      ],
    })
  }

  if (frontmatter.schema === 'faq') {
    webPage.mainEntity = extractFaq(source).map(item => ({
      '@type': 'Question',
      name: item.question,
      ...(item.id ? { url: `${url}#${item.id}` } : {}),
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    }))
  }

  if (frontmatter.schema === 'howto') {
    const tools = Array.isArray(frontmatter.howtoTools) ? frontmatter.howtoTools.map(String) : []
    graph.push({
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: String(frontmatter.howtoName ?? pageData.title),
      description,
      inLanguage: info.lang,
      url,
      image: assetUrl(image.file),
      tool: tools.map(name => ({ '@type': 'HowToTool', name })),
      step: extractHowTo(source).map(section => ({
        '@type': 'HowToSection',
        name: section.name,
        itemListElement: section.steps.map((entry, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: entry.name,
          text: entry.text,
          ...(entry.id ?? section.id ? { url: `${url}#${entry.id ?? section.id}` } : {}),
        })),
      })),
    })
  }

  head.push(jsonLd({ '@context': 'https://schema.org', '@graph': graph }))
  return head
}
