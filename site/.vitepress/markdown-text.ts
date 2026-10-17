// SPDX-FileCopyrightText: 2026 OpenXPlay.org
// SPDX-License-Identifier: MIT
// Created by riko chen on 2026-10-17

// Reads the site's own Markdown at build time, so structured data and llms-full.txt come from
// the same text the pages render. It understands the subset of Markdown these pages use:
// headings with {#id} anchors, paragraphs, lists, tables, fenced code and ::: containers.

export interface FaqItem {
  id?: string
  question: string
  answer: string
}

export interface HowToSection {
  id?: string
  name: string
  steps: { name: string; text: string }[]
}

const HEADING = /^(#{1,6})\s+(.*?)\s*$/
const ANCHOR = /\s*\{#([\w-]+)\}\s*$/
const ORDERED_ITEM = /^(\d+)\.\s+(.*)$/
const UNORDERED_ITEM = /^[-*+]\s+(.*)$/
const FENCE = /^\s*(```|~~~)/
const CJK = /[㐀-鿿豈-﫿]/

export function stripFrontmatter(source: string): string {
  return source.replace(/^﻿?---\r?\n[\s\S]*?\r?\n---[ \t]*\r?\n?/, '')
}

/** The Markdown body without frontmatter, Vue blocks and HTML comments, split into lines. */
function bodyLines(source: string): string[] {
  return stripFrontmatter(source)
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .split(/\r?\n/)
}

/** Plain text of one line of inline Markdown. */
export function inlineText(text: string): string {
  return text
    .replace(ANCHOR, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|[^\w*])\*([^*\s][^*]*?)\*(?!\w)/g, '$1$2')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\{\{[^}]*\}\}/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function endSentence(text: string): string {
  if (!text || /[.!?:;。！？：；)）]$/.test(text)) return text
  return text + (CJK.test(text) ? '。' : '.')
}

/** Plain text of a block of Markdown lines: lists and table rows become sentences, code is dropped. */
export function blockText(lines: string[]): string {
  const parts: string[] = []
  let paragraph: string[] = []
  let fenced = false
  const flush = () => {
    if (paragraph.length) parts.push(inlineText(paragraph.join(' ')))
    paragraph = []
  }
  for (const raw of lines) {
    if (FENCE.test(raw)) { fenced = !fenced; flush(); continue }
    if (fenced) continue
    const line = raw.trim()
    if (!line || line.startsWith(':::')) { flush(); continue }
    if (line.startsWith('|')) {
      flush()
      if (/^\|[\s|:-]+\|$/.test(line)) continue
      const cells = line.replace(/^\||\|$/g, '').split('|').map(cell => inlineText(cell)).filter(Boolean)
      if (cells.length) parts.push(endSentence(cells.join(': ')))
      continue
    }
    const item = ORDERED_ITEM.exec(line) ?? UNORDERED_ITEM.exec(line)
    if (item) { flush(); paragraph.push(item[item.length - 1]); continue }
    paragraph.push(line)
  }
  flush()
  return parts.map(endSentence).filter(Boolean)
    .reduce((text, part) => (!text ? part : /[。！？：；）]$/.test(text) ? text + part : `${text} ${part}`), '')
    .replace(/\s+/g, ' ').trim()
}

interface Section {
  level: number
  title: string
  id?: string
  lines: string[]
}

/** Splits the body into heading sections; fenced code never starts a heading. */
function sections(source: string): Section[] {
  const result: Section[] = []
  let current: Section = { level: 0, title: '', lines: [] }
  let fenced = false
  for (const line of bodyLines(source)) {
    if (FENCE.test(line)) fenced = !fenced
    const heading = fenced ? null : HEADING.exec(line)
    if (heading) {
      result.push(current)
      current = { level: heading[1].length, title: inlineText(heading[2]), id: ANCHOR.exec(heading[2])?.[1], lines: [] }
    } else {
      current.lines.push(line)
    }
  }
  result.push(current)
  return result
}

/** Every level-3 heading is a question; its text up to the next heading is the answer. */
export function extractFaq(source: string): FaqItem[] {
  return sections(source)
    .filter(section => section.level === 3)
    .map(section => ({ id: section.id, question: section.title, answer: blockText(section.lines) }))
    .filter(item => item.question && item.answer)
}

/** Splits an ordered-list item into a step name (its leading bold text) and the rest. */
function step(lines: string[]): { name: string; text: string } {
  const first = lines[0] ?? ''
  const bold = /^\*\*(.+?)\*\*\s*(.*)$/.exec(first)
  const rest = bold ? [bold[2], ...lines.slice(1)] : lines
  const text = blockText(rest)
  const name = bold ? inlineText(bold[1]).replace(/[.。:：]$/, '') : inlineText(first).split(/(?<=[.。])\s*/)[0]
  return { name, text: text || name }
}

/** The first top-level ordered list of each level-2 or level-3 section becomes a HowTo section. */
export function extractHowTo(source: string): HowToSection[] {
  const result: HowToSection[] = []
  for (const section of sections(source)) {
    if (section.level < 2 || section.level > 3) continue
    const items: string[][] = []
    let current: string[] | null = null
    let blank = false
    let fenced = false
    for (const line of section.lines) {
      if (current && FENCE.test(line)) { fenced = !fenced; current.push(line.trim()); continue }
      if (fenced) { current?.push(line); continue }
      const item = ORDERED_ITEM.exec(line)
      if (item) { current = [item[2]]; items.push(current); blank = false; continue }
      if (!current) continue
      if (!line.trim()) { blank = true; continue }
      if (/^\s{2,}\S/.test(line) || !blank) { current.push(line.trim()); blank = false; continue }
      break
    }
    if (items.length) result.push({ id: section.id, name: section.title, steps: items.map(step) })
  }
  return result
}

/**
 * The page's Markdown for llms-full.txt: frontmatter, Vue blocks, comments and heading anchors
 * removed, Vue interpolations of frontmatter values filled in, HTML images reduced to their alt
 * text and site-relative links made absolute.
 */
export function llmsMarkdown(
  source: string,
  frontmatter: Record<string, unknown>,
  absolute: (path: string) => string,
  components: Record<string, string>,
): string {
  let text = stripFrontmatter(source)
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\{\{\s*\$frontmatter\.(\w+)\s*\}\}/g, (_, key: string) => String(frontmatter[key] ?? ''))
    .replace(/<code>([^<]*)<\/code>/g, '`$1`')
    .replace(/<img\b[^>]*?\balt="([^"]*)"[^>]*>/g, (_, alt: string) => `[Image: ${alt}]`)
    .replace(/<figure\b[^>]*>([\s\S]*?)<\/figure>/g, (_, inner: string) => inner
      .replace(/<figcaption>([\s\S]*?)<\/figcaption>/g, '$1')
      .split('\n').map(line => line.trim()).filter(Boolean).join('\n\n'))
    .replace(/^[ \t]*\{#[\w-]+\}[ \t]*$/gm, '')
    .replace(/[ \t]*\{#[\w-]+\}[ \t]*$/gm, '')
    .replace(/^:::\s*\w+[ \t]*(.*)$/gm, (_, title: string) => (title ? `**${title.trim()}**` : ''))
    .replace(/^:::[ \t]*$/gm, '')
    .replace(/\]\((\/[^)\s]*)\)/g, (_, path: string) => `](${absolute(path)})`)
  for (const [name, replacement] of Object.entries(components)) {
    text = text.replace(new RegExp(`<${name}\\b[^>]*/>`, 'g'), replacement)
  }
  return text.replace(/\n{3,}/g, '\n\n').trim()
}
