// SPDX-FileCopyrightText: 2026 OpenXPlay.org
// SPDX-License-Identifier: MIT
// Created by riko chen on 2026-11-12

// The car database: one YAML file per car under data/cars/<brand>/<model>.yaml and the tests
// outside a car in data/bench.yaml. The Head units pages hold markers such as
// `<!-- @cars in-car -->`; every reader of the page source (the Markdown renderer through
// carsPlugin, llms-full.txt through expandCars) sees the Markdown generated from the data, so
// the pages, the outline and the text exports stay in step with the database.
//
// Adding a car:
//   1. Create data/cars/<brand>/<model>.yaml with the brand and model IDs of the apps' car catalog
//      (car-models.json), for example data/cars/nio/et5t.yaml with `brand: nio` and `model: et5t`.
//   2. Start the file with the SPDX header (CC-BY-4.0, like every page) and fill in the fields
//      described by the Car interface below; copy an existing car as a template.
//   3. Text fields take Markdown. A plain string is shown in both languages; use `{en: …, zh: …}`
//      when the wording differs, with /en/ links in the English text and /zh/ links in the Chinese text.
//   4. `npm run build`: a missing field, an unknown key, a bad date or a wrong value stops the build
//      with the file and the field at fault.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import { parse } from 'yaml'
import { pageRoute, type LocaleKey } from './site'

const DATA_DIR = fileURLToPath(new URL('../data', import.meta.url))
const CARS_DIR = path.join(DATA_DIR, 'cars')
const BENCH_FILE = path.join(DATA_DIR, 'bench.yaml')
const MARKER = /^[ \t]*<!--\s*@cars\s+([\w-]+)\s*-->[ \t]*$/gm

// ---------------------------------------------------------------------------------------------
// Data model

/** Markdown shown in both languages, or per language. */
export type Text = string | { en: string; zh: string }

export const ROUTES = ['browser', 'carlink', 'carlife', 'dlna', 'airplay'] as const
export type Route = typeof ROUTES[number]

/** pass/fail/fixed carry a label before the text; `unrecorded` alone reads “Not recorded”; `note` has no label. */
export const STATUSES = ['pass', 'fail', 'fixed', 'unrecorded', 'note'] as const
export type Status = typeof STATUSES[number]

export const RESULT_ITEMS = ['picture', 'touch', 'sound', 'reverse', 'fullscreen', 'vehicle-info', 'reconnect'] as const
export type ResultItem = typeof RESULT_ITEMS[number]

/** Wire names of the web receiver protocol. */
export const AUDIO_CODECS = ['AAC_LC', 'PCM_S16LE', 'OPUS'] as const
export type AudioCodec = typeof AUDIO_CODECS[number]

export const DECODE = ['hardware', 'software', 'unsupported'] as const
export type Decode = typeof DECODE[number]

/**
 * A date (2026-10-14), a range (2026-10-15..2026-10-18) or separate days (2026-10-22, 2026-10-27).
 * Shown compactly: 2026-10-15—18, 2026-10-22, 10-27.
 */
export type DateText = string

export interface Test {
  /** Catalog year ID, for example g6-2023, when the model year is known. */
  year?: string
  /** Shown after the car's name, for example 2023 / 2023 款. */
  variant?: Text
  /** Head-unit browser or app and version; omitted reads “Not recorded”. */
  software?: Text
  route: Route
  /** Shown after the route, for example Wi-Fi in “CarLife (Wi-Fi)”. */
  routeDetail?: Text
  relay: Text
  date: DateText
  result: Text
}

export interface BenchTest {
  receiver: Text
  route: Route
  routeDetail?: Text
  relay: Text
  date: DateText
  result: Text
}

export interface Cell { status: Status; text?: Text }
export type ResultRow = { item: ResultItem } & Partial<Record<Route, Cell>>

/** A list item with a bold lead-in. */
export interface Point { label?: Text; text: Text }

/** What the browser reported about itself, as in Check your head unit. */
export interface BrowserReport {
  date: DateText
  browser?: Text
  gpu?: Text
  cpu?: Text
  memory?: Text
  screen?: Text
  window?: Text
  touch?: Text
  apis?: Text
  audio?: Text
}

export interface VideoReport {
  /** Frame rates every listed format is supported at. */
  rates: number[]
  sizes: string[]
  formats: { name: string; decode: Decode[] }[]
  notes?: Text[]
}

/** A codec the browser declares but can't actually play, and what to do about it. */
export interface BrokenCodec {
  codec: AudioCodec
  symptom: Text
  workaround?: Text
}

/** Browser sound as observed in a car: what the browser declares and what really plays. */
export interface AudioReport {
  date: DateText
  declared: AudioCodec[]
  works: AudioCodec[]
  broken?: BrokenCodec[]
  note?: Text
}

export interface BrowserSection {
  intro?: Text
  points?: Point[]
  audio?: AudioReport
  report?: BrowserReport
  video?: VideoReport
}

export interface CarlinkSection {
  intro?: Text
  video?: { h264?: Text; native?: Text; h265?: Text; display?: Text; audio?: Text; notes?: Text }
  connection?: { wifi?: Text; pairing?: Text; 'vehicle-info'?: Text }
}

export interface Car {
  /** Catalog brand ID, for example xpeng. */
  brand: string
  /** Catalog model ID, for example g6. */
  model: string
  name: Text
  /** Paragraphs under the car's heading. */
  summary?: Text
  /** Tests in the car, one row each in the in-car table. */
  tests: Test[]
  results?: ResultRow[]
  setup?: Point[]
  browser?: BrowserSection
  carlink?: CarlinkSection
}

// ---------------------------------------------------------------------------------------------
// Validation

class DataError extends Error {}

type Shape = Record<string, (value: unknown, where: string) => void>

function fail(where: string, message: string): never {
  throw new DataError(`${where}: ${message}`)
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function object(value: unknown, where: string, required: Shape, optional: Shape = {}): void {
  if (!isObject(value)) fail(where, 'expected a mapping')
  for (const key of Object.keys(value)) {
    if (!(key in required) && !(key in optional)) fail(`${where}.${key}`, 'unknown field')
  }
  for (const [key, check] of Object.entries(required)) {
    if (value[key] === undefined || value[key] === null) fail(`${where}.${key}`, 'missing')
    check(value[key], `${where}.${key}`)
  }
  for (const [key, check] of Object.entries(optional)) {
    if (value[key] !== undefined && value[key] !== null) check(value[key], `${where}.${key}`)
  }
}

const id = (value: unknown, where: string) => {
  if (typeof value !== 'string' || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)) fail(where, 'expected a lowercase catalog ID such as p7-plus')
}

const text = (value: unknown, where: string) => {
  if (typeof value === 'string') { if (!value.trim()) fail(where, 'empty text'); return }
  object(value, where, { en: nonEmpty, zh: nonEmpty })
}

const nonEmpty = (value: unknown, where: string) => {
  if (typeof value !== 'string' || !value.trim()) fail(where, 'expected text')
}

function oneOf<T extends string>(values: readonly T[]) {
  return (value: unknown, where: string) => {
    if (!values.includes(value as T)) fail(where, `expected one of ${values.join(', ')}`)
  }
}

function list(check: (value: unknown, where: string) => void, minimum = 1) {
  return (value: unknown, where: string) => {
    if (!Array.isArray(value) || value.length < minimum) fail(where, `expected a list of at least ${minimum}`)
    value.forEach((entry, index) => check(entry, `${where}[${index}]`))
  }
}

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/

function days(value: DateText): string[] {
  const range = value.split('..').map(part => part.trim())
  return range.length === 2 ? range : value.split(',').map(part => part.trim())
}

const date = (value: unknown, where: string) => {
  // YAML reads an unquoted 2026-10-14 as a string with the yaml package's default (core) schema.
  if (typeof value !== 'string') fail(where, 'expected a date such as 2026-10-14')
  const parts = days(value)
  if (value.includes('..') && parts.length !== 2) fail(where, 'a range has two dates: 2026-10-15..2026-10-18')
  for (const part of parts) {
    if (!ISO_DAY.test(part) || Number.isNaN(Date.parse(part))) fail(where, `“${part}” is not a date such as 2026-10-14`)
  }
  if ([...parts].sort().join() !== parts.join()) fail(where, 'dates must be in order')
}

const number = (value: unknown, where: string) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) fail(where, 'expected a number')
}

const point = (value: unknown, where: string) => object(value, where, { text }, { label: text })

const testFields: Shape = { route: oneOf(ROUTES), relay: text, date, result: text }
const test = (value: unknown, where: string) =>
  object(value, where, testFields, { year: id, variant: text, software: text, routeDetail: text })
const benchTest = (value: unknown, where: string) =>
  object(value, where, { receiver: text, ...testFields }, { routeDetail: text })

const cell = (value: unknown, where: string) => {
  object(value, where, { status: oneOf(STATUSES) }, { text })
  const { status, text: body } = value as unknown as Cell
  if ((status === 'note' || status === 'pass' || status === 'fail' || status === 'fixed') && !body) fail(`${where}.text`, `a ${status} cell needs text`)
}

const resultRow = (value: unknown, where: string) => {
  const routes = Object.fromEntries(ROUTES.map(route => [route, cell]))
  object(value, where, { item: oneOf(RESULT_ITEMS) }, routes)
}

const audioReport = (value: unknown, where: string) => {
  const codec = oneOf(AUDIO_CODECS)
  object(value, where, { date, declared: list(codec), works: list(codec, 0) }, {
    broken: list(entry => object(entry, `${where}.broken`, { codec, symptom: text }, { workaround: text })),
    note: text,
  })
  const report = value as unknown as AudioReport
  for (const entry of report.broken ?? []) {
    if (report.works.includes(entry.codec)) fail(`${where}.broken`, `${entry.codec} is listed both as working and as broken`)
  }
}

const videoReport = (value: unknown, where: string) => {
  object(value, where, { rates: list(number), sizes: list(nonEmpty), formats: list(entry => object(entry, `${where}.formats`, { name: nonEmpty, decode: list(oneOf(DECODE)) })) },
    { notes: list(text) })
  const report = value as unknown as VideoReport
  report.formats.forEach((format, index) => {
    if (format.decode.length !== report.sizes.length) fail(`${where}.formats[${index}].decode`, `expected one value per size (${report.sizes.length})`)
  })
}

const browserReport = (value: unknown, where: string) => object(value, where, { date }, {
  browser: text, gpu: text, cpu: text, memory: text, screen: text, window: text, touch: text, apis: text, audio: text,
})

const browserSection = (value: unknown, where: string) => object(value, where, {}, {
  intro: text, points: list(point), audio: audioReport, report: browserReport, video: videoReport,
})

const carlinkSection = (value: unknown, where: string) => object(value, where, {}, {
  intro: text,
  video: (video, at) => object(video, at, {}, { h264: text, native: text, h265: text, display: text, audio: text, notes: text }),
  connection: (connection, at) => object(connection, at, {}, { wifi: text, pairing: text, 'vehicle-info': text }),
})

function validateCar(value: unknown, file: string): Car {
  object(value, file, { brand: id, model: id, name: text, tests: list(test) }, {
    summary: text, results: list(resultRow), setup: list(point), browser: browserSection, carlink: carlinkSection,
  })
  const car = value as unknown as Car
  const expected = `${car.brand}/${car.model}.yaml`
  if (!file.endsWith(expected)) fail(file, `brand and model say the file should be data/cars/${expected}`)
  car.tests.forEach((entry, index) => {
    if (entry.year && !entry.year.startsWith(`${car.model}-`)) fail(`${file}.tests[${index}].year`, `expected a ${car.model}-… catalog year ID`)
  })
  return car
}

// ---------------------------------------------------------------------------------------------
// Loading

function readYaml(file: string): unknown {
  try {
    return parse(fs.readFileSync(file, 'utf8'))
  } catch (error) {
    throw new DataError(`${path.relative(DATA_DIR, file)}: ${(error as Error).message}`)
  }
}

export interface Database { cars: Car[]; bench: BenchTest[]; files: string[] }

export function loadDatabase(): Database {
  const files: string[] = []
  const cars: Car[] = []
  for (const brand of fs.readdirSync(CARS_DIR, { withFileTypes: true }).filter(entry => entry.isDirectory())) {
    for (const name of fs.readdirSync(path.join(CARS_DIR, brand.name)).filter(entry => entry.endsWith('.yaml'))) {
      const file = path.join(CARS_DIR, brand.name, name)
      files.push(file)
      cars.push(validateCar(readYaml(file), path.relative(DATA_DIR, file)))
    }
  }
  const benchData = readYaml(BENCH_FILE)
  object(benchData, 'bench.yaml', { tests: list(benchTest) })
  files.push(BENCH_FILE)
  // Cars appear in the order they were first tested.
  cars.sort((a, b) => firstDay(a.tests).localeCompare(firstDay(b.tests)) || anchor(a).localeCompare(anchor(b)))
  return { cars, bench: (benchData as { tests: BenchTest[] }).tests, files }
}

function firstDay(tests: { date: DateText }[]): string {
  return tests.map(entry => days(entry.date)[0]).sort()[0] ?? ''
}

// ---------------------------------------------------------------------------------------------
// Markdown

interface Words {
  notRecorded: string
  status: Record<Exclude<Status, 'unrecorded' | 'note'>, string>
  route: Record<Route, string>
  item: Record<ResultItem, string>
  inCarHead: string[]
  benchHead: string[]
  item0: string
  results: string
  setup: string
  browser: string
  carlink: string
  colon: (label: string) => string
  paren: (text: string) => string
  listJoin: string
  browserDetails: string
  browserDetailsIntro: (date: string) => string
  report: Record<Exclude<keyof BrowserReport, 'date'>, string>
  reportHead: string[]
  video: string
  videoRates: (rates: string) => string
  decode: Record<Decode, string>
  hardwareMeans: string
  formatHead: string
  audio: string
  audioHead: string[]
  audioObserved: (date: string) => string
  audioCodec: Record<AudioCodec, string>
  yes: string
  no: string
  carlinkVideo: string
  carlinkVideoHead: string[]
  carlinkVideoRow: Record<'h264' | 'native' | 'h265' | 'display' | 'audio', string>
  connection: string
  connectionHead: string[]
  connectionRow: Record<'wifi' | 'pairing' | 'vehicle-info', string>
  workaround: string
}

const WORDS: Record<LocaleKey, Words> = {
  en: {
    notRecorded: 'Not recorded',
    status: { pass: 'Pass', fail: 'Fail', fixed: 'Fixed' },
    route: { browser: 'Browser', carlink: 'Carlink', carlife: 'CarLife', dlna: 'Wireless display (DLNA)', airplay: 'AirPlay' },
    item: {
      picture: 'Picture', touch: 'Touch', sound: 'Sound', reverse: 'After the reverse camera', fullscreen: 'Full screen',
      'vehicle-info': 'Vehicle information', reconnect: 'Connecting again',
    },
    inCarHead: ['Car', 'Head-unit software', 'Route', 'Relay', 'Date', 'Result'],
    benchHead: ['Receiver', 'Route', 'Relay and picture source', 'Date', 'Result'],
    item0: 'Item',
    results: 'Test results',
    setup: 'Recommended setup',
    browser: 'Browser (web receiver)',
    carlink: 'Carlink app',
    colon: label => `**${label}:**`,
    paren: value => ` (${value})`,
    listJoin: ', ',
    browserDetails: 'Browser details',
    browserDetailsIntro: day => `What OpenXPlay read from the car’s browser on ${day}. [Check your head unit](/en/check) reports the same kinds of items, so you can compare.`,
    report: { browser: 'Browser', gpu: 'GPU', cpu: 'CPU', memory: 'Memory', screen: 'Screen', window: 'Browser window', touch: 'Touch', apis: 'Web APIs', audio: 'Audio' },
    reportHead: ['Item', 'Result'],
    video: 'Video decoding',
    videoRates: rates => `Every format below is supported at both ${rates} fps.`,
    decode: { hardware: 'Hardware', software: 'Software', unsupported: 'Not supported' },
    hardwareMeans: '“Hardware” means the browser reported the format as power efficient, which normally means a hardware decoder handles it.',
    formatHead: 'Format',
    audio: 'Sound in the browser',
    audioHead: ['Audio format', 'Browser declares', 'Plays'],
    audioObserved: day => `Observed in the car on ${day}.`,
    audioCodec: { AAC_LC: 'AAC', PCM_S16LE: 'PCM', OPUS: 'Opus' },
    yes: 'Yes',
    no: 'No',
    carlinkVideo: 'Carlink video support',
    carlinkVideoHead: ['Item', 'The car’s Carlink app'],
    carlinkVideoRow: { h264: 'H.264', native: 'Native video mode', h265: 'H.265', display: 'Display size', audio: 'Media audio' },
    connection: 'Connection and pairing',
    connectionHead: ['Item', 'What happens'],
    connectionRow: { wifi: 'Wi-Fi', pairing: 'Pairing', 'vehicle-info': 'Vehicle information' },
    workaround: 'What to do',
  },
  zh: {
    notRecorded: '未记录',
    status: { pass: '通过', fail: '未通过', fixed: '已修复' },
    route: { browser: '浏览器', carlink: 'Carlink', carlife: 'CarLife', dlna: '无线投屏（DLNA）', airplay: 'AirPlay' },
    item: {
      picture: '画面', touch: '触控', sound: '声音', reverse: '倒车影像之后', fullscreen: '全屏',
      'vehicle-info': '车辆信息', reconnect: '再次连接',
    },
    inCarHead: ['车', '车机软件', '路线', '中继', '日期', '结果'],
    benchHead: ['接收端', '路线', '中继和画面来源', '日期', '结果'],
    item0: '项目',
    results: '测试结果',
    setup: '推荐设置',
    browser: '浏览器（网页接收端）',
    carlink: 'Carlink 应用',
    colon: label => `**${label}：**`,
    paren: value => `（${value}）`,
    listJoin: '、',
    browserDetails: '浏览器参数',
    browserDetailsIntro: day => `${day} OpenXPlay 从车机浏览器读取到的信息。[检测车机](/zh/check)会报告同类项目，可以拿来对照。`,
    report: { browser: '浏览器', gpu: '图形处理器', cpu: '处理器', memory: '内存', screen: '屏幕', window: '浏览器窗口', touch: '触控', apis: 'Web API', audio: '音频' },
    reportHead: ['项目', '结果'],
    video: '视频解码',
    videoRates: rates => `下表中的格式在 ${rates} 帧/秒下都受支持。`,
    decode: { hardware: '硬件解码', software: '软件解码', unsupported: '不支持' },
    hardwareMeans: '“硬件解码”表示浏览器报告可以低功耗解码这种格式，通常意味着由硬件解码器处理。',
    formatHead: '格式',
    audio: '浏览器中的声音',
    audioHead: ['音频格式', '浏览器声明支持', '实际能播放'],
    audioObserved: day => `${day} 在车上观察到的情况。`,
    audioCodec: { AAC_LC: 'AAC', PCM_S16LE: 'PCM', OPUS: 'Opus' },
    yes: '是',
    no: '否',
    carlinkVideo: 'Carlink 视频支持',
    carlinkVideoHead: ['项目', '车机的 Carlink 应用'],
    carlinkVideoRow: { h264: 'H.264', native: '原生视频模式', h265: 'H.265', display: '显示尺寸', audio: '媒体音频' },
    connection: '连接与配对',
    connectionHead: ['项目', '情况'],
    connectionRow: { wifi: 'Wi-Fi', pairing: '配对', 'vehicle-info': '车辆信息' },
    workaround: '怎么办',
  },
}

function language(locale: LocaleKey): 'en' | 'zh' {
  return locale === 'zh' ? 'zh' : 'en'
}

function t(value: Text | undefined, locale: LocaleKey): string {
  if (value === undefined) return ''
  return (typeof value === 'string' ? value : value[language(locale)]).trim()
}

/** One table cell: no line breaks, pipes escaped. */
function cellText(value: string): string {
  return value.replace(/\s*\n\s*/g, ' ').replace(/(?<!\\)\|/g, '\\|')
}

function table(head: string[], rows: string[][]): string {
  return [
    `| ${head.join(' | ')} |`,
    `| ${head.map(() => '---').join(' | ')} |`,
    ...rows.map(row => `| ${row.map(value => cellText(value)).join(' | ')} |`.replace(/\|\s{2,}\|/g, '| |')),
  ].join('\n')
}

/** 2026-10-15—18, 2026-10-20—11-02, 2026-10-22, 10-27 (2026-10-22、10-27 in Chinese). */
export function formatDate(value: DateText, locale: LocaleKey): string {
  const parts = days(value)
  const short = (day: string, first: string) =>
    day.slice(0, 4) !== first.slice(0, 4) ? day : day.slice(0, 7) === first.slice(0, 7) && value.includes('..') ? day.slice(8) : day.slice(5)
  if (value.includes('..')) return `${parts[0]}—${short(parts[1], parts[0])}`
  return parts.map((day, index) => (index ? short(day, parts[0]) : day)).join(WORDS[locale].listJoin)
}

function points(entries: Point[], locale: LocaleKey): string {
  const words = WORDS[locale]
  return entries.map(entry => `- ${entry.label ? `${words.colon(t(entry.label, locale))} ` : ''}${t(entry.text, locale)}`).join('\n')
}

function routeName(route: Route, detail: Text | undefined, locale: LocaleKey): string {
  const words = WORDS[locale]
  return words.route[route] + (detail ? words.paren(t(detail, locale)) : '')
}

function anchor(car: Car): string {
  return `${car.brand}-${car.model}`
}

function inCar(db: Database, locale: LocaleKey): string {
  const words = WORDS[locale]
  const rows = db.cars.flatMap(car => [...car.tests]
    .sort((a, b) => days(a.date)[0].localeCompare(days(b.date)[0]))
    .map(entry => [
      `[${t(car.name, locale)}](#${anchor(car)})${entry.variant ? ` ${t(entry.variant, locale)}` : ''}`,
      t(entry.software, locale) || words.notRecorded,
      routeName(entry.route, entry.routeDetail, locale),
      t(entry.relay, locale),
      formatDate(entry.date, locale),
      t(entry.result, locale),
    ]))
  return table(words.inCarHead, rows)
}

function bench(db: Database, locale: LocaleKey): string {
  const words = WORDS[locale]
  return table(words.benchHead, db.bench.map(entry => [
    t(entry.receiver, locale),
    routeName(entry.route, entry.routeDetail, locale),
    t(entry.relay, locale),
    formatDate(entry.date, locale),
    t(entry.result, locale),
  ]))
}

function resultCell(value: Cell | undefined, locale: LocaleKey): string {
  if (!value) return ''
  const words = WORDS[locale]
  const body = t(value.text, locale)
  if (value.status === 'note') return body
  const label = value.status === 'unrecorded' ? words.notRecorded : words.status[value.status]
  return body ? `${label}${locale === 'zh' ? '：' : ': '}${body}` : label
}

function results(car: Car, locale: LocaleKey): string {
  const words = WORDS[locale]
  const rows = car.results ?? []
  const routes = ROUTES.filter(route => rows.some(row => row[route]))
  return table([words.item0, ...routes.map(route => words.route[route])],
    rows.map(row => [words.item[row.item], ...routes.map(route => resultCell(row[route], locale))]))
}

function details(title: string, id: string, body: string[]): string {
  return [`::: details ${title} {#${id}}`, ...body.filter(Boolean).flatMap((part, index) => (index ? ['', part] : [part])), ':::'].join('\n')
}

function audio(report: AudioReport, id: string, locale: LocaleKey): string {
  const words = WORDS[locale]
  const codecs = AUDIO_CODECS.filter(codec =>
    report.declared.includes(codec) || report.works.includes(codec) || report.broken?.some(entry => entry.codec === codec))
  const rows = codecs.map(codec => {
    const broken = report.broken?.find(entry => entry.codec === codec)
    const plays = report.works.includes(codec) ? words.yes
      : broken ? `${words.no}${locale === 'zh' ? '：' : ': '}${t(broken.symptom, locale)}`
      : words.notRecorded
    return [words.audioCodec[codec], report.declared.includes(codec) ? words.yes : words.no, plays]
  })
  const fixes = (report.broken ?? []).filter(entry => entry.workaround)
  // A browser that declares a codec it can't play is a trap worth a warning box; otherwise a plain table.
  const kind = report.broken?.length ? 'warning' : 'info'
  return [
    `::: ${kind} ${words.audio} {#${id}}`,
    words.audioObserved(formatDate(report.date, locale)),
    '',
    table(words.audioHead, rows),
    ...(report.note ? ['', t(report.note, locale)] : []),
    ...fixes.map(entry => `\n${words.colon(words.workaround)} ${t(entry.workaround, locale)}`),
    ':::',
  ].join('\n')
}

function browser(car: Car, section: BrowserSection, locale: LocaleKey): string {
  const words = WORDS[locale]
  const id = `${anchor(car)}-browser`
  const parts = [`### ${words.browser} {#${id}}`]
  if (section.intro) parts.push(t(section.intro, locale))
  if (section.audio) parts.push(audio(section.audio, `${id}-audio`, locale))
  if (section.points) parts.push(points(section.points, locale))
  if (section.report) {
    const report = section.report
    const keys = (Object.keys(words.report) as (keyof typeof words.report)[]).filter(key => report[key])
    parts.push(details(words.browserDetails, `${id}-details`, [
      words.browserDetailsIntro(formatDate(report.date, locale)),
      table(words.reportHead, keys.map(key => [words.report[key], t(report[key], locale)])),
    ]))
  }
  if (section.video) {
    const video = section.video
    parts.push(details(words.video, `${id}-video`, [
      words.videoRates(video.rates.join(locale === 'zh' ? ' 和 ' : ' and ')),
      table([words.formatHead, ...video.sizes], video.formats.map(format => [format.name, ...format.decode.map(value => words.decode[value])])),
      video.formats.some(format => format.decode.includes('hardware')) ? words.hardwareMeans : '',
      video.notes ? video.notes.map(note => `- ${t(note, locale)}`).join('\n') : '',
    ]))
  }
  return parts.join('\n\n')
}

function carlink(car: Car, section: CarlinkSection, locale: LocaleKey): string {
  const words = WORDS[locale]
  const id = `${anchor(car)}-carlink`
  const parts = [`### ${words.carlink} {#${id}}`]
  if (section.intro) parts.push(t(section.intro, locale))
  if (section.video) {
    const video = section.video
    const keys = (Object.keys(words.carlinkVideoRow) as (keyof typeof words.carlinkVideoRow)[]).filter(key => video[key])
    parts.push(details(words.carlinkVideo, `${id}-video`, [
      table(words.carlinkVideoHead, keys.map(key => [words.carlinkVideoRow[key], t(video[key], locale)])),
      t(video.notes, locale),
    ]))
  }
  if (section.connection) {
    const connection = section.connection
    const keys = (Object.keys(words.connectionRow) as (keyof typeof words.connectionRow)[]).filter(key => connection[key])
    parts.push(details(words.connection, `${id}-connection`, [
      table(words.connectionHead, keys.map(key => [words.connectionRow[key], t(connection[key], locale)])),
    ]))
  }
  return parts.join('\n\n')
}

function carSection(car: Car, locale: LocaleKey): string {
  const words = WORDS[locale]
  const parts = [`## ${t(car.name, locale)} {#${anchor(car)}}`]
  if (car.summary) parts.push(t(car.summary, locale))
  if (car.results?.length) parts.push(`### ${words.results} {#${anchor(car)}-results}`, results(car, locale))
  if (car.setup?.length) parts.push(`### ${words.setup} {#${anchor(car)}-setup}`, points(car.setup, locale))
  if (car.browser) parts.push(browser(car, car.browser, locale))
  if (car.carlink) parts.push(carlink(car, car.carlink, locale))
  return parts.join('\n\n')
}

/** Car names in test order, for a page description: “the XPeng G6, the XPeng P7+ and the NIO ET5T”. */
export function carNames(locale: LocaleKey, db = loadDatabase()): string {
  const names = db.cars.map(car => (locale === 'zh' ? '' : 'the ') + t(car.name, locale))
  if (names.length < 2) return names.join('')
  return locale === 'zh'
    ? `${names.slice(0, -1).join('、')} 和${names[names.length - 1]}`
    : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

const BLOCKS: Record<string, (db: Database, locale: LocaleKey) => string> = {
  'in-car': inCar,
  bench,
  cars: (db, locale) => db.cars.map(car => carSection(car, locale)).join('\n\n'),
}

function localeOf(relativePath: string): LocaleKey {
  return pageRoute(relativePath).locale
}

/** Replaces every `<!-- @cars <block> -->` marker in a page source with Markdown generated from the database. */
export function expandCars(source: string, relativePath: string): string {
  if (!/<!--\s*@cars\s/.test(source)) return source
  const db = loadDatabase()
  const locale = localeOf(relativePath)
  return source.replace(MARKER, (_, block: string) => {
    const render = BLOCKS[block]
    if (!render) throw new DataError(`${relativePath}: unknown car block “${block}”; use ${Object.keys(BLOCKS).join(', ')}`)
    return render(db, locale)
  })
}

/** Expands the markers before VitePress renders the page, and refreshes the page when the data changes. */
export function carsPlugin(srcDir: string): Plugin {
  const pagesWithCars = new Set<string>()
  const relative = (file: string) => path.relative(srcDir, file).split(path.sep).join('/')
  return {
    name: 'openxplay-cars',
    enforce: 'pre',
    transform(code, moduleId) {
      const file = moduleId.split('?')[0]
      if (!file.endsWith('.md') || !/<!--\s*@cars\s/.test(code)) return null
      pagesWithCars.add(file)
      return { code: expandCars(code, relative(file)), map: null }
    },
    // VitePress re-renders an edited page from ctx.read(), not through transform.
    handleHotUpdate(ctx) {
      if (!ctx.file.endsWith('.md')) return
      const read = ctx.read
      ctx.read = async () => expandCars(await read(), relative(ctx.file))
    },
    configureServer(server) {
      server.watcher.add(DATA_DIR)
      const refresh = (changed: string) => {
        if (!changed.startsWith(DATA_DIR)) return
        for (const file of pagesWithCars) server.watcher.emit('change', file)
      }
      server.watcher.on('change', refresh)
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
    },
  }
}
