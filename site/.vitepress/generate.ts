// SPDX-FileCopyrightText: 2026 OpenXPlay.org
// SPDX-License-Identifier: MIT
// Created by riko chen on 2026-10-17

// Files written into the build output after the pages: robots.txt, llms.txt, llms-full.txt, the
// agent skills mirror (agents/skills/) and CNAME. They are generated from the page sources, the
// repository's skills/ and the site URL, so they stay in sync.

import fs from 'node:fs'
import path from 'node:path'
import type { PageData, SiteConfig } from 'vitepress'
import { readSkills, writeSkills, SKILLS_PATH, type SkillEntry } from './agent-skills'
import { llmsMarkdown } from './markdown-text'
import {
  GITHUB_ORG, LOCALES, PAGE_SLUGS, SITE_HOST, SITE_NAME, SITE_ROOT, SUPPORT_EMAIL,
  pageRoute, pageUrl, type LocaleKey,
} from './site'

interface PageSummary {
  relativePath: string
  title: string
  description: string
  frontmatter: Record<string, any>
}

const pages = new Map<string, PageSummary>()

/** Called from transformPageData: keeps what the generated files need from each page. */
export function rememberPage(pageData: PageData): void {
  pages.set(pageData.relativePath, {
    relativePath: pageData.relativePath,
    title: pageData.title,
    description: pageData.description,
    frontmatter: pageData.frontmatter,
  })
}

const SUMMARY = 'OpenXPlay shows iPhone CarPlay on Android head units that cannot install apps. A relay — an Android phone running the OpenXPlay Relay app, or a small Linux device such as the UFI003 USB dongle — connects to the iPhone as a CarPlay receiver and passes video, audio and touch on to software the head unit already has: its browser (the web receiver, which decodes H.264 with WebCodecs) or a Carlink app. Nothing is installed on the head unit. The code is open source under AGPL-3.0, with commercial exemptions available from ' + SUPPORT_EMAIL + '.'

const NOTES = [
  'Terminology: a "head unit" (Chinese: 车机) is the car’s built-in Android infotainment screen; a "relay" (Chinese: 中继) is the device between the iPhone and the head unit.',
  'The site is available in Simplified Chinese (the default, at the root) and in English; every English page has the same path under /en/.',
]

const REPOSITORIES: [string, string][] = [
  ['OpenXPlay', 'Project entry: README and diagrams'],
  ['OpenXPlay-Relay', 'OpenXPlay Relay: the Android app and the Linux relay (AGPL-3.0-only; DiPlay/xcertplay-derived files GPL-3.0-only)'],
  ['OpenXPlay-Stream', 'Outputs to head-unit receivers: browser, Carlink and screen casting (AGPL-3.0-only)'],
  ['OpenXPlay-DiPlay', 'CarPlay receiver used by the Android relay, forked from DiPlay (GPL-3.0)'],
  ['OpenXPlay-Hardware', 'Device support files for relay hardware such as the UFI003 (OpenXPlay-Hardware License: open source, no commercial use; kernel parts GPL-2.0-only)'],
  ['OpenXPlay-Web-Plugins', 'Optional, offline plugins for the web receiver (Apache-2.0 OR MIT)'],
]

const COMPONENT_TEXT: Record<LocaleKey, Record<string, string>> = {
  root: {
    HeadUnitCheck: '［交互式检测：在车机浏览器中打开本页即可运行，全部在浏览器本地完成。］',
    RouteChooser: '［方案选择：安卓手机 + 车机浏览器（推荐），见[安卓手机作中继](/android-relay)；UFI003 随身 Wi-Fi + 车机浏览器，见[UFI003 作中继](/ufi003-relay)；斐讯 N1 电视盒子（进阶），见[斐讯 N1 作中继](/phicomm-n1)；安卓手机、UFI003 或斐讯 N1 + Carlink 应用（实验性），见[Carlink 应用](/carlink)。］',
  },
  en: {
    HeadUnitCheck: '[Interactive check: open this page in the head unit’s browser to run it. It runs entirely in the browser.]',
    RouteChooser: '[Setup chooser: Android phone + head-unit browser (recommended), see [Android phone as the relay](/en/android-relay); UFI003 USB dongle + head-unit browser, see [UFI003 as the relay](/en/ufi003-relay); Phicomm N1 TV box (advanced), see [Phicomm N1 as the relay](/en/phicomm-n1); Android phone, UFI003 or Phicomm N1 + Carlink app (experimental), see [Carlink app](/en/carlink).]',
  },
}

function orderedPages(): PageSummary[] {
  const result: PageSummary[] = []
  for (const locale of Object.keys(LOCALES) as LocaleKey[]) {
    for (const slug of PAGE_SLUGS) {
      const relativePath = `${LOCALES[locale].prefix}${slug || 'index'}.md`
      const page = pages.get(relativePath)
      if (!page) throw new Error(`generate: no page data for ${relativePath}`)
      result.push(page)
    }
  }
  return result
}

function urlOf(page: PageSummary): string {
  const { locale, slug } = pageRoute(page.relativePath)
  return pageUrl(locale, slug)
}

/** Site-relative link (with or without base) to an absolute URL. */
function absolute(link: string): string {
  return SITE_ROOT + link.replace(/^\/+/, '')
}

function robotsTxt(): string {
  const agents = [
    '*', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
    'anthropic-ai', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Meta-ExternalAgent',
    'Amazonbot', 'Bytespider',
  ]
  return [
    '# Every crawler, including search and AI crawlers, may read the whole site.',
    ...agents.map(agent => `User-agent: ${agent}`),
    'Allow: /',
    '',
    `Sitemap: ${SITE_ROOT}sitemap.xml`,
    '',
  ].join('\n')
}

function llmsTxt(list: PageSummary[], skills: SkillEntry[]): string {
  const lines = [`# ${SITE_NAME}`, '', `> ${SUMMARY}`, '', ...NOTES.flatMap(note => [note, ''])]
  for (const locale of Object.keys(LOCALES) as LocaleKey[]) {
    lines.push(`## ${LOCALES[locale].docsHeading}`, '')
    for (const page of list.filter(entry => pageRoute(entry.relativePath).locale === locale)) {
      lines.push(`- [${page.title}](${urlOf(page)}): ${page.description}`)
    }
    lines.push('')
  }
  lines.push('## Source code', '')
  for (const [name, role] of REPOSITORIES) lines.push(`- [${name}](${GITHUB_ORG}/${name}): ${role}`)
  lines.push(
    '',
    '## Instructions for AI agents',
    '',
    ...skills.filter(skill => !skill.replacedBy)
      .map(skill => `- [Agent skill ${skill.name} ${skill.version}](${skill.url}): ${skill.description}`),
    `- [Install OpenXPlay on a UFI003 USB dongle](${SITE_ROOT}agents/ufi003-install.md): step-by-step instructions for an AI agent with a terminal on the user's computer, using OpenXPlay Flasher's command line`,
    `- [Agent skill index](${SITE_ROOT}${SKILLS_PATH}/index.json): each skill's version, minimum version, files and SHA-256, mirrored from GitHub for update checks`,
    '',
    '## Optional',
    '',
    `- [Full text](${SITE_ROOT}llms-full.txt): every page of this site in both languages as Markdown`,
    `- [Sitemap](${SITE_ROOT}sitemap.xml): all page URLs with their language alternates`,
    '',
  )
  return lines.join('\n')
}

function homeIntro(page: PageSummary): string {
  const hero = page.frontmatter.hero ?? {}
  const features: { title?: string; details?: string; link?: string }[] = page.frontmatter.features ?? []
  const lines = [`# ${hero.name}: ${hero.text}`, '', String(hero.tagline ?? ''), '']
  for (const feature of features) {
    lines.push(`- [${feature.title}](${absolute(String(feature.link ?? '/'))}): ${feature.details}`)
  }
  return lines.join('\n')
}

function llmsFullTxt(list: PageSummary[], srcDir: string): string {
  const rule = '='.repeat(72)
  const parts = [
    `# ${SITE_NAME}: full text of ${SITE_ROOT}`,
    '',
    `> ${SUMMARY}`,
    '',
    'Every page of the site in Simplified Chinese and English, generated from the page sources at build time.',
  ]
  for (const page of list) {
    const { locale } = pageRoute(page.relativePath)
    const source = fs.readFileSync(path.join(srcDir, page.relativePath), 'utf8')
    const body = llmsMarkdown(source, page.frontmatter, absolute, COMPONENT_TEXT[locale])
    const intro = page.frontmatter.layout === 'home' ? `${homeIntro(page)}\n\n` : ''
    parts.push(
      '',
      rule,
      `Page: ${page.title}`,
      `URL: ${urlOf(page)}`,
      `Language: ${LOCALES[locale].lang}`,
      `Description: ${page.description}`,
      rule,
      '',
      intro + body,
    )
  }
  return parts.join('\n') + '\n'
}

/** Called from buildEnd. */
export function writeGeneratedFiles(siteConfig: SiteConfig): void {
  const out = siteConfig.outDir
  const list = orderedPages()
  const skills = readSkills(siteConfig.srcDir)
  writeSkills(siteConfig.srcDir, out, skills)
  fs.writeFileSync(path.join(out, 'robots.txt'), robotsTxt())
  fs.writeFileSync(path.join(out, 'llms.txt'), llmsTxt(list, skills))
  fs.writeFileSync(path.join(out, 'llms-full.txt'), llmsFullTxt(list, siteConfig.srcDir))

  // GitHub Pages: a custom domain needs CNAME; a *.github.io address must not have one.
  const cname = path.join(out, 'CNAME')
  const custom = !/(^|\.)github\.io$/i.test(SITE_HOST) && SITE_HOST !== 'localhost' && !/^[\d.]+$/.test(SITE_HOST)
  if (custom) fs.writeFileSync(cname, `${SITE_HOST}\n`)
  else fs.rmSync(cname, { force: true })
}
