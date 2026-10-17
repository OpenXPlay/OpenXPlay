<!--
SPDX-FileCopyrightText: 2026 OpenXPlay.org
SPDX-License-Identifier: MIT
Created by riko chen on 2026-10-17
-->
<script setup lang="ts">
// Checks, inside the head unit's own browser, the features the OpenXPlay web receiver relies on.
// Everything runs locally: no network requests, no storage, no analytics.
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

type Lang = 'en' | 'zh'
type Verdict = 'full' | 'h264' | 'unsupported' | 'insecure'
type Tri = boolean | undefined

interface VideoCase { family: 'H.264' | 'H.265'; profile: string; codec: string; width: number; height: number }
interface VideoResult extends VideoCase {
  supported: boolean
  hardware: Tri
  software: Tri
  smooth: Tri
  powerEfficient: Tri
}
interface Row { key: string; label: string; value: string; ok?: boolean }
interface Results {
  secure: boolean
  videoDecoder: boolean
  worker: boolean
  offscreen: boolean
  webSocket: boolean
  audioContext: boolean
  audioWorklet: boolean
  audioDecoder: boolean
  aac: Tri
  opus: Tri
  microphone: boolean
  fullscreen: boolean
  mediaCapabilities: boolean
  sampleRate?: number
  video: VideoResult[]
  screen: { width: number; height: number; dpr: number; viewportWidth: number; viewportHeight: number; orientation: string; colorDepth: number; refreshHz?: number }
  touch: { maxTouchPoints: number; coarsePointer: boolean }
  browser: { userAgent: string; brands: string; platform: string; mobile: string; languages: string; cores: string; memory: string }
}

const VIDEO_CASES: VideoCase[] = [
  { family: 'H.264', profile: 'Constrained Baseline', codec: 'avc1.42E01F', width: 1280, height: 720 },
  { family: 'H.264', profile: 'Constrained Baseline', codec: 'avc1.42E028', width: 1920, height: 1080 },
  { family: 'H.264', profile: 'Main', codec: 'avc1.4D401F', width: 1280, height: 720 },
  { family: 'H.264', profile: 'Main', codec: 'avc1.4D4028', width: 1920, height: 1080 },
  { family: 'H.264', profile: 'High', codec: 'avc1.64001F', width: 1280, height: 720 },
  { family: 'H.264', profile: 'High', codec: 'avc1.640028', width: 1920, height: 1080 },
  { family: 'H.265', profile: 'Main (hvc1)', codec: 'hvc1.1.6.L93.B0', width: 1280, height: 720 },
  { family: 'H.265', profile: 'Main (hvc1)', codec: 'hvc1.1.6.L120.B0', width: 1920, height: 1080 },
  { family: 'H.265', profile: 'Main (hev1)', codec: 'hev1.1.6.L93.B0', width: 1280, height: 720 },
  { family: 'H.265', profile: 'Main (hev1)', codec: 'hev1.1.6.L120.90', width: 1920, height: 1080 },
]

const TEXT = {
  en: {
    checking: 'Checking this browser…',
    fallback: 'If this message doesn’t change, this browser can’t run the check. It is most likely too old for the web receiver, which needs WebCodecs.',
    privacy: 'Everything runs inside this page. Nothing is uploaded or stored.',
    verdicts: {
      full: ['Works with the web receiver', 'This browser has everything the web receiver needs, including H.265 (HEVC) decoding in hardware, which the relay can use for sharper video.'],
      h264: ['Works, H.264 only', 'This browser can show CarPlay with H.264 video. It doesn’t offer hardware H.265 decoding, so the relay sends H.264 to this screen.'],
      unsupported: ['Not supported: needs a browser with WebCodecs', ''],
      insecure: ['Open this page over HTTPS', 'Browsers turn on WebCodecs only on secure (HTTPS) pages, so the check can’t run here. Open this page’s https:// address instead.'],
    },
    reasons: {
      noDecoder: 'This browser has no WebCodecs VideoDecoder, which the web receiver uses to decode CarPlay video. Try another browser on the head unit, if it has one.',
      noH264: 'WebCodecs is present, but it reports no H.264 decoding, which the web receiver needs.',
      noWorker: 'The browser lacks Web Workers or OffscreenCanvas, which the web receiver uses to decode and draw video.',
      noSocket: 'The browser lacks WebSocket, which carries the CarPlay session from the relay.',
    },
    notes: {
      software: 'The browser doesn’t report hardware H.264 decoding. CarPlay may still work, but video may stutter.',
      noAudio: 'No AudioWorklet: the browser can show CarPlay but can’t play its sound.',
      noAac: 'No AAC decoding: the web receiver can still play uncompressed (PCM) audio.',
      noMic: 'No microphone access: Siri and calls can’t use the head unit’s microphone through this browser.',
      singleTouch: 'Only one touch point is reported, so multi-finger gestures won’t work.',
      noTouch: 'No touch screen reported. Touch may still reach the browser as mouse input.',
    },
    sections: { video: 'Video decoding (WebCodecs)', features: 'Browser features', audio: 'Audio and microphone', screen: 'Screen and touch', browser: 'Browser' },
    columns: { format: 'Format', size: 'Size', codec: 'Codec string', supported: 'Supported', hardware: 'Hardware', software: 'Software', efficient: 'Power-efficient' },
    hardwareNote: '“Hardware” and “Software” are the browser’s answers for the prefer-hardware and prefer-software decoder hints; “Power-efficient” comes from Media Capabilities and usually means a hardware decoder. Some browsers answer these loosely.',
    labels: {
      secure: 'Secure page (HTTPS)', videoDecoder: 'WebCodecs VideoDecoder', worker: 'Web Workers', offscreen: 'OffscreenCanvas transfer',
      webSocket: 'WebSocket', fullscreen: 'Fullscreen', mediaCapabilities: 'Media Capabilities',
      audioContext: 'AudioContext', audioWorklet: 'AudioWorklet', audioDecoder: 'WebCodecs AudioDecoder', aac: 'AAC (mp4a.40.2)', opus: 'Opus',
      microphone: 'Microphone API (getUserMedia)', sampleRate: 'Output sample rate',
      screenSize: 'Screen (CSS pixels)', pixels: 'Screen (device pixels)', dpr: 'Device pixel ratio', viewport: 'Viewport', orientation: 'Orientation',
      colorDepth: 'Color depth', refresh: 'Estimated refresh rate', touchPoints: 'Touch points (maxTouchPoints)', pointer: 'Coarse pointer (touch)',
      userAgent: 'User agent', brands: 'Brands (UA client hints)', platform: 'Platform', mobile: 'Mobile', languages: 'Languages', cores: 'CPU cores', memory: 'Device memory',
    },
    yes: 'Yes', no: 'No', unknown: 'Unknown', notExposed: 'Not exposed', required: 'required',
    copy: 'Copy report', copied: 'Report copied.', copyFailed: 'Copying is blocked here. Select the report text below and copy it.',
    rerun: 'Run again', report: 'Show the report text',
  },
  zh: {
    checking: '正在检测此浏览器……',
    fallback: '如果这条信息一直不变，说明此浏览器无法运行检测，很可能版本太旧，不支持网页接收端所需的 WebCodecs。',
    privacy: '检测全部在本页面内完成，不上传、不保存任何数据。',
    verdicts: {
      full: ['可以使用网页接收端', '此浏览器具备网页接收端所需的全部功能，并支持 H.265（HEVC）硬件解码，中继可以用它传输更清晰的画面。'],
      h264: ['可以使用，仅支持 H.264', '此浏览器可以用 H.264 视频显示 CarPlay。它不提供 H.265 硬件解码，因此中继会向这块屏幕发送 H.264。'],
      unsupported: ['不支持：需要支持 WebCodecs 的浏览器', ''],
      insecure: ['请通过 HTTPS 打开本页', '浏览器只在安全（HTTPS）页面中启用 WebCodecs，因此这里无法检测。请改用本页的 https:// 地址打开。'],
    },
    reasons: {
      noDecoder: '此浏览器没有 WebCodecs VideoDecoder，而网页接收端要用它解码 CarPlay 视频。如果车机上还有其他浏览器，可以换一个试试。',
      noH264: '浏览器支持 WebCodecs，但不支持网页接收端所需的 H.264 解码。',
      noWorker: '浏览器缺少 Web Worker 或 OffscreenCanvas，网页接收端要用它们解码和绘制视频。',
      noSocket: '浏览器缺少 WebSocket，无法从中继接收 CarPlay 会话。',
    },
    notes: {
      software: '浏览器没有报告 H.264 硬件解码。CarPlay 也许仍能使用，但画面可能卡顿。',
      noAudio: '没有 AudioWorklet：浏览器能显示 CarPlay，但无法播放声音。',
      noAac: '不支持 AAC 解码：网页接收端仍可播放未压缩（PCM）音频。',
      noMic: '无法使用麦克风：Siri 和通话不能通过此浏览器使用车机麦克风。',
      singleTouch: '只检测到一个触摸点，多指手势无法使用。',
      noTouch: '没有检测到触摸屏。触摸可能仍会以鼠标输入的形式传给浏览器。',
    },
    sections: { video: '视频解码（WebCodecs）', features: '浏览器功能', audio: '音频与麦克风', screen: '屏幕与触控', browser: '浏览器' },
    columns: { format: '格式', size: '分辨率', codec: '编码字符串', supported: '支持', hardware: '硬件', software: '软件', efficient: '低功耗' },
    hardwareNote: '“硬件”和“软件”是浏览器对 prefer-hardware、prefer-software 解码提示的回答；“低功耗”来自 Media Capabilities，通常表示有硬件解码器。部分浏览器的回答并不严格。',
    labels: {
      secure: '安全页面（HTTPS）', videoDecoder: 'WebCodecs VideoDecoder', worker: 'Web Worker', offscreen: 'OffscreenCanvas 转移',
      webSocket: 'WebSocket', fullscreen: '全屏', mediaCapabilities: 'Media Capabilities',
      audioContext: 'AudioContext', audioWorklet: 'AudioWorklet', audioDecoder: 'WebCodecs AudioDecoder', aac: 'AAC（mp4a.40.2）', opus: 'Opus',
      microphone: '麦克风接口（getUserMedia）', sampleRate: '输出采样率',
      screenSize: '屏幕（CSS 像素）', pixels: '屏幕（物理像素）', dpr: '设备像素比', viewport: '可视区域', orientation: '方向',
      colorDepth: '色深', refresh: '估算刷新率', touchPoints: '触摸点数（maxTouchPoints）', pointer: '粗指针（触摸）',
      userAgent: 'User agent', brands: '品牌（UA Client Hints）', platform: '平台', mobile: '移动设备', languages: '语言', cores: 'CPU 核心数', memory: '设备内存',
    },
    yes: '是', no: '否', unknown: '未知', notExposed: '未提供', required: '必需',
    copy: '复制报告', copied: '报告已复制。', copyFailed: '此处无法自动复制。请选中下方报告文字后手动复制。',
    rerun: '重新检测', report: '显示报告文字',
  },
} as const

const { lang } = useData()
const language = computed<Lang>(() => (lang.value.startsWith('zh') ? 'zh' : 'en'))
const t = computed(() => TEXT[language.value])

const state = ref<'idle' | 'running' | 'done'>('idle')
const results = ref<Results | null>(null)
const copyState = ref<'' | 'copied' | 'failed'>('')
const reportOpen = ref(false)
const reportArea = ref<HTMLTextAreaElement | null>(null)

/** Resolves to undefined if the promise rejects or takes longer than the timeout. */
function settle<T>(work: () => Promise<T> | T, timeout = 4000): Promise<T | undefined> {
  return new Promise(resolve => {
    const timer = setTimeout(() => resolve(undefined), timeout)
    Promise.resolve().then(work).then(
      value => { clearTimeout(timer); resolve(value) },
      () => { clearTimeout(timer); resolve(undefined) },
    )
  })
}

const g = globalThis as any

async function decoderSupported(config: Record<string, unknown>): Promise<Tri> {
  if (typeof g.VideoDecoder?.isConfigSupported !== 'function') return undefined
  const result = await settle(() => g.VideoDecoder.isConfigSupported(config))
  return result === undefined ? undefined : Boolean((result as { supported?: boolean }).supported)
}

async function probeVideo(test: VideoCase): Promise<VideoResult> {
  const base = { codec: test.codec, codedWidth: test.width, codedHeight: test.height, optimizeForLatency: true }
  const [any, hardware, software, info] = await Promise.all([
    decoderSupported(base),
    decoderSupported({ ...base, hardwareAcceleration: 'prefer-hardware' }),
    decoderSupported({ ...base, hardwareAcceleration: 'prefer-software' }),
    typeof navigator.mediaCapabilities?.decodingInfo === 'function'
      ? settle(() => navigator.mediaCapabilities.decodingInfo({
        type: 'file',
        video: { contentType: `video/mp4; codecs="${test.codec}"`, width: test.width, height: test.height, bitrate: 8_000_000, framerate: 60 },
      }))
      : Promise.resolve(undefined),
  ])
  return {
    ...test,
    supported: Boolean(any || hardware || software),
    hardware,
    software,
    smooth: info?.supported ? info.smooth : info ? false : undefined,
    powerEfficient: info?.supported ? info.powerEfficient : info ? false : undefined,
  }
}

async function audioDecoderSupported(codec: string): Promise<Tri> {
  if (typeof g.AudioDecoder?.isConfigSupported !== 'function') return undefined
  const result = await settle(() => g.AudioDecoder.isConfigSupported({ codec, sampleRate: 48000, numberOfChannels: 2 }))
  return result === undefined ? undefined : Boolean((result as { supported?: boolean }).supported)
}

async function probeAudioContext(): Promise<{ exists: boolean; worklet: boolean; sampleRate?: number }> {
  const Context = g.AudioContext ?? g.webkitAudioContext
  if (typeof Context !== 'function') return { exists: false, worklet: false }
  const worklet = typeof g.AudioWorkletNode === 'function'
  try {
    const context = new Context()
    const sampleRate = context.sampleRate as number
    const hasWorklet = worklet && Boolean(context.audioWorklet)
    void settle(() => context.close(), 1000)
    return { exists: true, worklet: hasWorklet, sampleRate }
  } catch {
    return { exists: true, worklet }
  }
}

function estimateRefreshHz(): Promise<number | undefined> {
  if (typeof requestAnimationFrame !== 'function') return Promise.resolve(undefined)
  return settle(() => new Promise<number | undefined>(resolve => {
    const stamps: number[] = []
    const frame = (time: number) => {
      stamps.push(time)
      if (stamps.length < 31) { requestAnimationFrame(frame); return }
      const gaps = stamps.slice(1).map((value, index) => value - stamps[index]).sort((a, b) => a - b)
      const median = gaps[Math.floor(gaps.length / 2)]
      resolve(median > 0 ? Math.round(1000 / median) : undefined)
    }
    requestAnimationFrame(frame)
  }), 2000)
}

function browserInfo(): Results['browser'] {
  const data = (navigator as any).userAgentData
  return {
    userAgent: navigator.userAgent,
    brands: Array.isArray(data?.brands) ? data.brands.map((b: { brand: string; version: string }) => `${b.brand} ${b.version}`).join(', ') : '',
    platform: typeof data?.platform === 'string' ? data.platform : '',
    mobile: typeof data?.mobile === 'boolean' ? String(data.mobile) : '',
    languages: (Array.isArray(navigator.languages) ? navigator.languages : [navigator.language]).join(', '),
    cores: navigator.hardwareConcurrency ? String(navigator.hardwareConcurrency) : '',
    memory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : '',
  }
}

async function run(): Promise<void> {
  state.value = 'running'
  copyState.value = ''
  const [video, audio, aac, opus, refreshHz] = await Promise.all([
    Promise.all(VIDEO_CASES.map(probeVideo)),
    probeAudioContext(),
    audioDecoderSupported('mp4a.40.2'),
    audioDecoderSupported('opus'),
    estimateRefreshHz(),
  ])
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null
  let coarsePointer = false
  try { coarsePointer = window.matchMedia('(pointer: coarse)').matches } catch { /* unsupported */ }
  results.value = {
    secure: window.isSecureContext === true,
    videoDecoder: typeof g.VideoDecoder === 'function',
    worker: typeof g.Worker === 'function',
    offscreen: typeof g.OffscreenCanvas === 'function' && typeof (canvas as any)?.transferControlToOffscreen === 'function',
    webSocket: typeof g.WebSocket === 'function',
    audioContext: audio.exists,
    audioWorklet: audio.worklet,
    audioDecoder: typeof g.AudioDecoder === 'function',
    aac,
    opus,
    microphone: typeof navigator.mediaDevices?.getUserMedia === 'function',
    fullscreen: Boolean((document as any).fullscreenEnabled ?? (document as any).webkitFullscreenEnabled),
    mediaCapabilities: typeof navigator.mediaCapabilities?.decodingInfo === 'function',
    sampleRate: audio.sampleRate,
    video,
    screen: {
      width: screen.width,
      height: screen.height,
      dpr: window.devicePixelRatio || 1,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      orientation: screen.orientation?.type ?? '',
      colorDepth: screen.colorDepth,
      refreshHz,
    },
    touch: { maxTouchPoints: navigator.maxTouchPoints ?? 0, coarsePointer },
    browser: browserInfo(),
  }
  state.value = 'done'
}

const hardwareOrEfficient = (result: VideoResult) => result.hardware === true || result.powerEfficient === true

const verdict = computed<{ kind: Verdict; reason?: keyof typeof TEXT.en.reasons } | null>(() => {
  const r = results.value
  if (!r) return null
  const h264 = r.video.filter(v => v.family === 'H.264' && v.supported)
  const h265 = r.video.filter(v => v.family === 'H.265' && v.supported && hardwareOrEfficient(v))
  if (!r.secure) return { kind: 'insecure' }
  if (!r.videoDecoder) return { kind: 'unsupported', reason: 'noDecoder' }
  if (!h264.length) return { kind: 'unsupported', reason: 'noH264' }
  if (!r.worker || !r.offscreen) return { kind: 'unsupported', reason: 'noWorker' }
  if (!r.webSocket) return { kind: 'unsupported', reason: 'noSocket' }
  return { kind: h265.length ? 'full' : 'h264' }
})

const notes = computed<string[]>(() => {
  const r = results.value
  const v = verdict.value
  if (!r || !v || v.kind === 'insecure' || v.kind === 'unsupported') return []
  const n = t.value.notes
  const list: string[] = []
  if (!r.video.some(x => x.family === 'H.264' && x.supported && hardwareOrEfficient(x))) list.push(n.software)
  if (!r.audioWorklet) list.push(n.noAudio)
  else if (r.aac !== true) list.push(n.noAac)
  if (!r.microphone) list.push(n.noMic)
  if (r.touch.maxTouchPoints === 1) list.push(n.singleTouch)
  if (r.touch.maxTouchPoints === 0) list.push(n.noTouch)
  return list
})

const answer = (value: Tri, exposed = true): string =>
  !exposed ? t.value.notExposed : value === undefined ? t.value.unknown : value ? t.value.yes : t.value.no

const featureRows = computed<Row[]>(() => {
  const r = results.value
  if (!r) return []
  const l = t.value.labels
  const required = (label: string) => `${label} (${t.value.required})`
  return [
    { key: 'secure', label: required(l.secure), value: answer(r.secure), ok: r.secure },
    { key: 'videoDecoder', label: required(l.videoDecoder), value: answer(r.videoDecoder), ok: r.videoDecoder },
    { key: 'worker', label: required(l.worker), value: answer(r.worker), ok: r.worker },
    { key: 'offscreen', label: required(l.offscreen), value: answer(r.offscreen), ok: r.offscreen },
    { key: 'webSocket', label: required(l.webSocket), value: answer(r.webSocket), ok: r.webSocket },
    { key: 'fullscreen', label: l.fullscreen, value: answer(r.fullscreen) },
    { key: 'mediaCapabilities', label: l.mediaCapabilities, value: answer(r.mediaCapabilities) },
  ]
})

const audioRows = computed<Row[]>(() => {
  const r = results.value
  if (!r) return []
  const l = t.value.labels
  return [
    { key: 'audioContext', label: l.audioContext, value: answer(r.audioContext), ok: r.audioContext },
    { key: 'audioWorklet', label: l.audioWorklet, value: answer(r.audioWorklet), ok: r.audioWorklet },
    { key: 'sampleRate', label: l.sampleRate, value: r.sampleRate ? `${r.sampleRate} Hz` : t.value.unknown },
    { key: 'audioDecoder', label: l.audioDecoder, value: answer(r.audioDecoder) },
    { key: 'aac', label: l.aac, value: answer(r.aac, r.audioDecoder) },
    { key: 'opus', label: l.opus, value: answer(r.opus, r.audioDecoder) },
    { key: 'microphone', label: l.microphone, value: answer(r.microphone) },
  ]
})

const screenRows = computed<Row[]>(() => {
  const r = results.value
  if (!r) return []
  const l = t.value.labels
  const s = r.screen
  return [
    { key: 'screenSize', label: l.screenSize, value: `${s.width} × ${s.height}` },
    { key: 'pixels', label: l.pixels, value: `${Math.round(s.width * s.dpr)} × ${Math.round(s.height * s.dpr)}` },
    { key: 'dpr', label: l.dpr, value: String(Math.round(s.dpr * 100) / 100) },
    { key: 'viewport', label: l.viewport, value: `${s.viewportWidth} × ${s.viewportHeight}` },
    { key: 'orientation', label: l.orientation, value: s.orientation || t.value.unknown },
    { key: 'colorDepth', label: l.colorDepth, value: s.colorDepth ? `${s.colorDepth} bit` : t.value.unknown },
    { key: 'refresh', label: l.refresh, value: s.refreshHz ? `${s.refreshHz} Hz` : t.value.unknown },
    { key: 'touchPoints', label: l.touchPoints, value: String(r.touch.maxTouchPoints), ok: r.touch.maxTouchPoints >= 2 },
    { key: 'pointer', label: l.pointer, value: answer(r.touch.coarsePointer) },
  ]
})

const browserRows = computed<Row[]>(() => {
  const r = results.value
  if (!r) return []
  const l = t.value.labels
  const b = r.browser
  return [
    { key: 'userAgent', label: l.userAgent, value: b.userAgent },
    { key: 'brands', label: l.brands, value: b.brands || t.value.notExposed },
    { key: 'platform', label: l.platform, value: b.platform || t.value.notExposed },
    { key: 'mobile', label: l.mobile, value: b.mobile ? answer(b.mobile === 'true') : t.value.notExposed },
    { key: 'languages', label: l.languages, value: b.languages },
    { key: 'cores', label: l.cores, value: b.cores || t.value.notExposed },
    { key: 'memory', label: l.memory, value: b.memory || t.value.notExposed },
  ]
})

const verdictText = computed(() => {
  const v = verdict.value
  if (!v) return null
  const [title, detail] = t.value.verdicts[v.kind]
  return { title, detail: v.reason ? t.value.reasons[v.reason] : detail }
})

/** The report stays in English so anyone can read it, whatever the page language. */
const report = computed(() => {
  const r = results.value
  const v = verdict.value
  if (!r || !v) return ''
  const yn = (value: Tri) => (value === undefined ? 'unknown' : value ? 'yes' : 'no')
  const lines = [
    'OpenXPlay head-unit check',
    `Date: ${new Date().toISOString()}`,
    `Page: ${location.origin}${location.pathname}`,
    `Verdict: ${TEXT.en.verdicts[v.kind][0]} (${v.kind}${v.reason ? `, ${v.reason}` : ''})`,
    '',
    '[Video decoding]',
    ...r.video.map(x => `${x.family} ${x.profile} ${x.width}x${x.height} ${x.codec}: supported=${yn(x.supported)} hardware=${yn(x.hardware)} software=${yn(x.software)} smooth=${yn(x.smooth)} powerEfficient=${yn(x.powerEfficient)}`),
    '',
    '[Browser features]',
    `Secure context: ${yn(r.secure)}`,
    `VideoDecoder: ${yn(r.videoDecoder)}`,
    `Worker: ${yn(r.worker)}`,
    `OffscreenCanvas transfer: ${yn(r.offscreen)}`,
    `WebSocket: ${yn(r.webSocket)}`,
    `Fullscreen: ${yn(r.fullscreen)}`,
    `MediaCapabilities: ${yn(r.mediaCapabilities)}`,
    '',
    '[Audio]',
    `AudioContext: ${yn(r.audioContext)}`,
    `AudioWorklet: ${yn(r.audioWorklet)}`,
    `Sample rate: ${r.sampleRate ?? 'unknown'}`,
    `AudioDecoder: ${yn(r.audioDecoder)}`,
    `AAC (mp4a.40.2): ${yn(r.aac)}`,
    `Opus: ${yn(r.opus)}`,
    `getUserMedia: ${yn(r.microphone)}`,
    '',
    '[Screen and touch]',
    `Screen: ${r.screen.width}x${r.screen.height} CSS px, devicePixelRatio ${r.screen.dpr}`,
    `Viewport: ${r.screen.viewportWidth}x${r.screen.viewportHeight}`,
    `Orientation: ${r.screen.orientation || 'unknown'}`,
    `Color depth: ${r.screen.colorDepth}`,
    `Refresh rate (estimate): ${r.screen.refreshHz ?? 'unknown'}`,
    `maxTouchPoints: ${r.touch.maxTouchPoints}`,
    `Coarse pointer: ${yn(r.touch.coarsePointer)}`,
    '',
    '[Browser]',
    `User agent: ${r.browser.userAgent}`,
    `Brands: ${r.browser.brands || 'not exposed'}`,
    `Platform: ${r.browser.platform || 'not exposed'}`,
    `Mobile: ${r.browser.mobile || 'not exposed'}`,
    `Languages: ${r.browser.languages}`,
    `CPU cores: ${r.browser.cores || 'not exposed'}`,
    `Device memory: ${r.browser.memory || 'not exposed'}`,
  ]
  return lines.join('\n')
})

function selectReport(): void {
  reportOpen.value = true
  requestAnimationFrame(() => {
    const area = reportArea.value
    if (!area) return
    area.focus()
    area.select()
  })
}

async function copyReport(): Promise<void> {
  const text = report.value
  let copied = false
  try {
    if (window.isSecureContext && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      copied = true
    }
  } catch { /* fall back below */ }
  if (!copied) {
    try {
      const area = document.createElement('textarea')
      area.value = text
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      copied = document.execCommand('copy')
      area.remove()
    } catch { /* fall back below */ }
  }
  copyState.value = copied ? 'copied' : 'failed'
  if (!copied) selectReport()
}

onMounted(() => { void run() })
</script>

<template>
  <div class="oxp-check">
    <div v-if="state !== 'done'" class="oxp-check__pending" role="status" aria-live="polite">
      <p class="oxp-check__checking">{{ t.checking }}</p>
      <p v-if="state === 'idle'" class="oxp-check__fallback">{{ t.fallback }}</p>
    </div>

    <template v-else-if="results && verdictText && verdict">
      <section class="oxp-check__verdict" :class="`is-${verdict.kind}`" role="status" aria-live="polite">
        <p class="oxp-check__title">{{ verdictText.title }}</p>
        <p class="oxp-check__detail">{{ verdictText.detail }}</p>
        <ul v-if="notes.length" class="oxp-check__notes">
          <li v-for="note in notes" :key="note">{{ note }}</li>
        </ul>
      </section>

      <div class="oxp-check__actions">
        <button type="button" class="oxp-check__button is-primary" @click="copyReport">{{ t.copy }}</button>
        <button type="button" class="oxp-check__button" @click="run">{{ t.rerun }}</button>
        <span class="oxp-check__copy-state" role="status" aria-live="polite">
          {{ copyState === 'copied' ? t.copied : copyState === 'failed' ? t.copyFailed : '' }}
        </span>
      </div>
      <p class="oxp-check__privacy">{{ t.privacy }}</p>

      <details class="oxp-check__report" :open="reportOpen" @toggle="reportOpen = ($event.target as HTMLDetailsElement).open">
        <summary>{{ t.report }}</summary>
        <textarea ref="reportArea" :value="report" readonly rows="12" spellcheck="false" :aria-label="t.report" />
      </details>

      <h3 class="oxp-check__heading">{{ t.sections.video }}</h3>
      <table class="oxp-check__table">
        <thead>
          <tr>
            <th scope="col">{{ t.columns.format }}</th>
            <th scope="col">{{ t.columns.size }}</th>
            <th scope="col">{{ t.columns.codec }}</th>
            <th scope="col">{{ t.columns.supported }}</th>
            <th scope="col">{{ t.columns.hardware }}</th>
            <th scope="col">{{ t.columns.software }}</th>
            <th scope="col">{{ t.columns.efficient }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in results.video" :key="row.codec">
            <th scope="row">{{ row.family }} {{ row.profile }}</th>
            <td>{{ row.height }}p</td>
            <td><code>{{ row.codec }}</code></td>
            <td :class="row.supported ? 'is-yes' : 'is-no'">{{ answer(row.supported) }}</td>
            <td>{{ answer(row.hardware, results.videoDecoder) }}</td>
            <td>{{ answer(row.software, results.videoDecoder) }}</td>
            <td>{{ answer(row.powerEfficient, results.mediaCapabilities) }}</td>
          </tr>
        </tbody>
      </table>
      <p class="oxp-check__hint">{{ t.hardwareNote }}</p>

      <template v-for="group in [
        { title: t.sections.features, rows: featureRows },
        { title: t.sections.audio, rows: audioRows },
        { title: t.sections.screen, rows: screenRows },
        { title: t.sections.browser, rows: browserRows },
      ]" :key="group.title">
        <h3 class="oxp-check__heading">{{ group.title }}</h3>
        <table class="oxp-check__table">
          <tbody>
            <tr v-for="row in group.rows" :key="row.key">
              <th scope="row">{{ row.label }}</th>
              <td :class="row.ok === undefined ? '' : row.ok ? 'is-yes' : 'is-no'" class="oxp-check__value">{{ row.value }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </template>
  </div>
</template>

<style scoped>
.oxp-check {
  margin: 24px 0;
}

.oxp-check__pending {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.oxp-check__checking {
  margin: 0;
  font-weight: 600;
}

/* Shown only if the check has not started after a few seconds, e.g. in a browser too old to run
   it. Pure CSS, so it also works where the page's JavaScript cannot run. */
.oxp-check__fallback {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
  visibility: hidden;
  animation: oxp-check-reveal 0s linear 6s forwards;
}

@keyframes oxp-check-reveal {
  to { visibility: visible; }
}

.oxp-check__verdict {
  padding: 20px 24px;
  border: 1px solid transparent;
  border-radius: 12px;
}

.oxp-check__verdict.is-full {
  border-color: var(--vp-c-success-1);
  background: var(--vp-c-success-soft);
}

.oxp-check__verdict.is-h264 {
  border-color: var(--vp-c-tip-1);
  background: var(--vp-c-tip-soft);
}

.oxp-check__verdict.is-unsupported {
  border-color: var(--vp-c-danger-1);
  background: var(--vp-c-danger-soft);
}

.oxp-check__verdict.is-insecure {
  border-color: var(--vp-c-warning-1);
  background: var(--vp-c-warning-soft);
}

.vp-doc .oxp-check__title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
}

.vp-doc .oxp-check__detail {
  margin: 8px 0 0;
}

.vp-doc .oxp-check__notes {
  margin: 12px 0 0;
}

.oxp-check__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}

.oxp-check__button {
  min-height: 44px;
  padding: 0 20px;
  border: 1px solid var(--vp-button-alt-border);
  border-radius: 22px;
  background: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.oxp-check__button.is-primary {
  border-color: var(--vp-button-brand-border);
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}

.oxp-check__button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.oxp-check__copy-state {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.vp-doc .oxp-check__privacy,
.vp-doc .oxp-check__hint {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.oxp-check__report {
  margin: 16px 0;
}

.oxp-check__report summary {
  cursor: pointer;
  font-weight: 600;
}

.oxp-check__report textarea {
  box-sizing: border-box;
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  line-height: 1.5;
  resize: vertical;
}

.vp-doc .oxp-check__heading {
  margin-top: 32px;
}

.oxp-check__value {
  overflow-wrap: anywhere;
}

.vp-doc .oxp-check__table th,
.vp-doc .oxp-check__table td {
  padding: 6px 10px;
  font-size: 13px;
  line-height: 1.5;
}

.oxp-check__table code {
  white-space: nowrap;
}

.oxp-check__table .is-yes {
  color: var(--vp-c-success-1);
  font-weight: 600;
}

.oxp-check__table .is-no {
  color: var(--vp-c-danger-1);
  font-weight: 600;
}
</style>
