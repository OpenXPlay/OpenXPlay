// SPDX-FileCopyrightText: 2026 OpenXPlay.org
// SPDX-License-Identifier: MIT
// Created by riko chen on 2026-10-17

// Site-wide constants. The public URL comes from two build-time environment variables:
//   SITE_URL  the origin, without a path (default https://openxplay.org)
//   BASE      the path the site is served under (default /)
// e.g. SITE_URL=https://example.github.io BASE=/OpenXPlay/ npm run build

function readOrigin(value: string | undefined): string {
  const url = new URL((value ?? '').trim() || 'https://openxplay.org')
  if (url.pathname !== '/' || url.search || url.hash) {
    throw new Error(`SITE_URL must be an origin such as https://openxplay.org; put the path in BASE (got ${value})`)
  }
  return url.origin
}

function readBase(value: string | undefined): string {
  let base = (value ?? '').trim() || '/'
  if (!base.startsWith('/')) base = `/${base}`
  if (!base.endsWith('/')) base = `${base}/`
  return base
}

export const SITE_URL = readOrigin(process.env.SITE_URL)
export const BASE = readBase(process.env.BASE)
/** Absolute URL of the site root, always ending in a slash. */
export const SITE_ROOT = SITE_URL + BASE
export const SITE_HOST = new URL(SITE_URL).hostname

export const SITE_NAME = 'OpenXPlay'
export const GITHUB_ORG = 'https://github.com/OpenXPlay'
export const SUPPORT_EMAIL = 'support@openxplay.org'
export const DISCORD_URL = 'https://discord.gg/j3cKd5Tax'

export type LocaleKey = 'zh' | 'en'

export interface LocaleInfo {
  /** BCP 47 tag for <html lang> and hreflang. */
  lang: string
  /** Open Graph locale. */
  ogLocale: string
  /** Path prefix under BASE. */
  prefix: string
  /** Breadcrumb label of the home page. */
  home: string
  /** Name of this locale's documentation section in llms.txt. */
  docsHeading: string
}

// Every language has its own prefix: Simplified Chinese under zh/, English under en/.
export const LOCALES: Record<LocaleKey, LocaleInfo> = {
  zh: { lang: 'zh-Hans', ogLocale: 'zh_CN', prefix: 'zh/', home: '首页', docsHeading: '文档（简体中文）' },
  en: { lang: 'en', ogLocale: 'en_US', prefix: 'en/', home: 'Home', docsHeading: 'Docs (English)' },
}

/**
 * The default language: the root URLs (/ and /<page>) redirect to its pages, and it is the
 * hreflang x-default. Changing it changes nothing else.
 */
export const DEFAULT_LOCALE: LocaleKey = 'zh'

/** The pages every locale has, in reading order. '' is the home page. */
export const PAGE_SLUGS = [
  '', 'how-it-works', 'quick-start', 'check', 'android-relay', 'ufi003-relay', 'ufi003-flash', 'phicomm-n1', 'linux-devices',
  'carlink', 'carlife', 'wireless-display', 'tesla', 'daily-use', 'trusted-https', 'troubleshooting', 'faq', 'head-units', 'changelog', 'join', 'community', 'developers',
  'licensing', 'privacy',
] as const

/** Splits a source path such as 'zh/quick-start.md' into its locale and slug ('' for a home page). */
export function pageRoute(relativePath: string): { locale: LocaleKey; slug: string } {
  const locale = (Object.keys(LOCALES) as LocaleKey[]).find(key => relativePath.startsWith(LOCALES[key].prefix)) ?? DEFAULT_LOCALE
  const rest = relativePath.startsWith(LOCALES[locale].prefix) ? relativePath.slice(LOCALES[locale].prefix.length) : relativePath
  const slug = rest.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
  return { locale, slug }
}

/** Absolute, clean URL of a page. */
export function pageUrl(locale: LocaleKey, slug: string): string {
  return SITE_ROOT + LOCALES[locale].prefix + slug
}

/** Absolute URL of a file in public/. */
export function assetUrl(file: string): string {
  return SITE_ROOT + file.replace(/^\//, '')
}
