<!--
SPDX-FileCopyrightText: 2026 OpenXPlay.org
SPDX-License-Identifier: MIT
Created by riko chen on 2026-10-21
-->
<script setup lang="ts">
// Two questions (which relay, which head-unit entry) and the guide that answers them. The
// recommended route is selected from the start, so the page reads correctly before any choice and
// without JavaScript.
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'

type Relay = 'android' | 'ufi003' | 'n1'
type Display = 'browser' | 'carlink'
type RouteKey = `${Relay}-${Display}`

interface Option<K extends string> { key: K; name: string; tag?: string; tagKind?: 'tip' | 'warning' | 'info'; desc: string }
interface Result {
  title: string
  summary: string
  needs: string[]
  note?: string
  action: string
  link: string
  secondary: { text: string; link: string }
}
interface Text {
  relayQuestion: string
  displayQuestion: string
  yourRoute: string
  needsLabel: string
  relays: Option<Relay>[]
  displays: Option<Display>[]
  results: Record<RouteKey, Result>
}

const ICONS: Record<Relay | Display, string> = {
  android: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  ufi003: '<rect x="8" y="9" width="8" height="12.5" rx="2"/><path d="M9.5 9V4h5v5"/><path d="M11 6.5h.01M13 6.5h.01"/><circle cx="12" cy="17.5" r=".6"/>',
  n1: '<rect x="2.5" y="8" width="19" height="8" rx="2.5"/><path d="M6.5 12h.01"/><path d="M14 12h3.5"/><path d="M6 19h12"/>',
  browser: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M3 9h18"/><path d="M6 6.75h.01M8.5 6.75h.01"/>',
  carlink: '<path d="M4.5 13 6.6 7.6A2 2 0 0 1 8.46 6.3h7.08a2 2 0 0 1 1.86 1.3L19.5 13"/><rect x="3.5" y="13" width="17" height="5" rx="1.5"/><path d="M6 20.5V18M18 20.5V18"/><path d="M7.5 15.5h.01M16.5 15.5h.01"/>',
}

const TEXT: Record<'root' | 'en', Text> = {
  root: {
    relayQuestion: '用什么作中继？',
    displayQuestion: '车机用什么显示 CarPlay？',
    yourRoute: '你的方案',
    needsLabel: '需要准备',
    relays: [
      { key: 'android', name: '安卓手机', tag: '推荐', tagKind: 'tip', desc: '安装一个应用，按向导设置。需要 Android 8.0 及以上。' },
      { key: 'ufi003', name: 'UFI003 随身 Wi-Fi', desc: '低成本的小设备，通电自动启动；需要用电脑安装。' },
      { key: 'n1', name: '斐讯 N1 电视盒子', tag: '进阶', tagKind: 'info', desc: '热点可以用 5 GHz，通电自动启动；需要用命令行安装。' },
    ],
    displays: [
      { key: 'browser', name: '车机浏览器', tag: '推荐', tagKind: 'tip', desc: '直接显示 iPhone 的画面，支持触控。需要浏览器支持 WebCodecs。' },
      { key: 'carlink', name: 'Carlink 应用', tag: '实验性', tagKind: 'warning', desc: '车机没有可用的浏览器、但装有 Carlink 应用时可以试试。' },
    ],
    results: {
      'android-browser': {
        title: '安卓手机 + 车机浏览器',
        summary: '推荐的方案。在手机上安装 OpenXPlay Relay，按设置向导操作，第一次设置大约需要 10 分钟。车机上不用安装任何软件。',
        needs: ['支持 CarPlay 的 iPhone', 'Android 8.0 及以上的安卓手机', 'Apple 配件（MFi）身份', '浏览器支持 WebCodecs 的车机'],
        action: '查看安卓手机教程',
        link: 'android-relay',
        secondary: { text: '先检测车机浏览器', link: 'check' },
      },
      'android-carlink': {
        title: '安卓手机 + Carlink 应用',
        summary: '中继经 Wi-Fi 连接车机上的 Carlink 应用。实验性功能，有可能连接失败；请使用安卓应用 0.1.5 或更新版本。',
        needs: ['支持 CarPlay 的 iPhone', 'Android 10 及以上的安卓手机', 'Apple 配件（MFi）身份', '装有 Carlink 应用的车机'],
        note: '中继手机的 Wi-Fi 要保持打开；无线 CarPlay 请选“此手机的热点”。',
        action: '查看 Carlink 教程',
        link: 'carlink',
        secondary: { text: '查看实测车机', link: 'head-units' },
      },
      'ufi003-browser': {
        title: 'UFI003 随身 Wi-Fi + 车机浏览器',
        summary: '用电脑把系统和 Linux 中继装进 UFI003：推荐让 AI 助手按安装说明用 OpenXPlay Flasher 安装，也可以自己用 Flasher 应用安装。装好后，中继通电自动启动。',
        needs: ['支持 CarPlay 的 iPhone', 'UFI003 USB 随身 Wi-Fi 和一台电脑', 'Apple 配件（MFi）身份', '浏览器支持 WebCodecs、能连接 2.4 GHz Wi-Fi 的车机'],
        note: '第一次安装需要 Mac 或 Windows 电脑。UFI003 的 Wi-Fi 只有 2.4 GHz。',
        action: '查看 UFI003 教程',
        link: 'ufi003-relay',
        secondary: { text: '先检测车机浏览器', link: 'check' },
      },
      'ufi003-carlink': {
        title: 'UFI003 随身 Wi-Fi + Carlink 应用',
        summary: '中继经 Wi-Fi 连接车机上的 Carlink 应用。实验性功能，有可能连接失败。',
        needs: ['支持 CarPlay 的 iPhone', 'UFI003 USB 随身 Wi-Fi 和一台电脑', 'Apple 配件（MFi）身份', '装有 Carlink 应用的车机'],
        note: 'UFI003 的 Wi-Fi 只有 2.4 GHz，无法连接 Carlink Wi-Fi 工作在 5 GHz 的车机，例如小鹏 G6。',
        action: '查看 Carlink 教程',
        link: 'carlink',
        secondary: { text: '查看实测车机', link: 'head-units' },
      },
      'n1-browser': {
        title: '斐讯 N1 电视盒子 + 车机浏览器',
        summary: '在 N1 上装好 Armbian，再通过 SSH 安装设备支持包和 Linux 中继，适合熟悉命令行的用户。装好后，中继通电自动启动，热点可以用 5 GHz。',
        needs: ['支持 CarPlay 的 iPhone', '斐讯 N1、U 盘、网线和一台电脑', 'Apple 配件（MFi）身份', '浏览器支持 WebCodecs 的车机'],
        note: '我们还没有在 N1 上用 iPhone 完整测试过 CarPlay。',
        action: '查看斐讯 N1 教程',
        link: 'phicomm-n1',
        secondary: { text: '先检测车机浏览器', link: 'check' },
      },
      'n1-carlink': {
        title: '斐讯 N1 电视盒子 + Carlink 应用',
        summary: '中继经 Wi-Fi 连接车机上的 Carlink 应用。实验性功能，有可能连接失败。',
        needs: ['支持 CarPlay 的 iPhone', '斐讯 N1、U 盘、网线和一台电脑', 'Apple 配件（MFi）身份', '装有 Carlink 应用的车机'],
        note: 'N1 只有一块 Wi-Fi 网卡：中继连接车机的 Carlink 网络时，iPhone 会跟着转到车机的网络上。',
        action: '查看斐讯 N1 教程',
        link: 'phicomm-n1',
        secondary: { text: '查看 Carlink 教程', link: 'carlink' },
      },
    },
  },
  en: {
    relayQuestion: 'What will be the relay?',
    displayQuestion: 'How will the head unit show CarPlay?',
    yourRoute: 'Your setup',
    needsLabel: 'You need',
    relays: [
      { key: 'android', name: 'Android phone', tag: 'Recommended', tagKind: 'tip', desc: 'Install an app and follow its setup guide. Needs Android 8.0 or later.' },
      { key: 'ufi003', name: 'UFI003 USB dongle', desc: 'A low-cost little device that starts when powered; installing needs a computer.' },
      { key: 'n1', name: 'Phicomm N1 TV box', tag: 'Advanced', tagKind: 'info', desc: 'Its hotspot can use 5 GHz and it starts when powered; installed from the command line.' },
    ],
    displays: [
      { key: 'browser', name: 'Head-unit browser', tag: 'Recommended', tagKind: 'tip', desc: 'Shows the iPhone’s picture directly, with touch. The browser must support WebCodecs.' },
      { key: 'carlink', name: 'Carlink app', tag: 'Experimental', tagKind: 'warning', desc: 'Worth a try when the head unit has no usable browser but has a Carlink app.' },
    ],
    results: {
      'android-browser': {
        title: 'Android phone + head-unit browser',
        summary: 'The recommended setup. Install OpenXPlay Relay on the phone and follow the setup guide; the first setup takes about 10 minutes. Nothing is installed on the head unit.',
        needs: ['An iPhone with CarPlay', 'An Android phone with Android 8.0 or later', 'An Apple accessory (MFi) identity', 'A head unit whose browser supports WebCodecs'],
        action: 'Read the Android phone guide',
        link: 'android-relay',
        secondary: { text: 'Check the head unit’s browser first', link: 'check' },
      },
      'android-carlink': {
        title: 'Android phone + Carlink app',
        summary: 'The relay connects to the head unit’s Carlink app over Wi-Fi. This is experimental and may fail to connect; use Android app 0.1.5 or later.',
        needs: ['An iPhone with CarPlay', 'An Android phone with Android 10 or later', 'An Apple accessory (MFi) identity', 'A head unit with a Carlink app'],
        note: 'Keep the relay phone’s Wi-Fi on, and use This phone’s hotspot for wireless CarPlay.',
        action: 'Read the Carlink guide',
        link: 'carlink',
        secondary: { text: 'See tested head units', link: 'head-units' },
      },
      'ufi003-browser': {
        title: 'UFI003 USB dongle + head-unit browser',
        summary: 'Install the system and the Linux relay onto the UFI003 from a computer: preferably let an AI assistant follow the install instructions with OpenXPlay Flasher, or install it yourself in the Flasher app. Once installed, the relay starts whenever the dongle is powered.',
        needs: ['An iPhone with CarPlay', 'A UFI003 USB dongle and a computer', 'An Apple accessory (MFi) identity', 'A head unit whose browser supports WebCodecs and that can join 2.4 GHz Wi-Fi'],
        note: 'The first install needs a Mac or a Windows PC. The UFI003’s Wi-Fi is 2.4 GHz only.',
        action: 'Read the UFI003 guide',
        link: 'ufi003-relay',
        secondary: { text: 'Check the head unit’s browser first', link: 'check' },
      },
      'ufi003-carlink': {
        title: 'UFI003 USB dongle + Carlink app',
        summary: 'The relay connects to the head unit’s Carlink app over Wi-Fi. This is experimental and may fail to connect.',
        needs: ['An iPhone with CarPlay', 'A UFI003 USB dongle and a computer', 'An Apple accessory (MFi) identity', 'A head unit with a Carlink app'],
        note: 'The UFI003’s Wi-Fi is 2.4 GHz only, so it can’t join a head unit whose Carlink Wi-Fi runs on 5 GHz, such as the XPeng G6.',
        action: 'Read the Carlink guide',
        link: 'carlink',
        secondary: { text: 'See tested head units', link: 'head-units' },
      },
      'n1-browser': {
        title: 'Phicomm N1 TV box + head-unit browser',
        summary: 'Install Armbian on the N1, then the device package and the Linux relay over SSH; this suits people who are comfortable with the command line. Once installed, the relay starts whenever the box is powered, and its hotspot can use 5 GHz.',
        needs: ['An iPhone with CarPlay', 'A Phicomm N1, a USB drive, a network cable and a computer', 'An Apple accessory (MFi) identity', 'A head unit whose browser supports WebCodecs'],
        note: 'We haven’t yet tested CarPlay end to end with an iPhone on the N1.',
        action: 'Read the Phicomm N1 guide',
        link: 'phicomm-n1',
        secondary: { text: 'Check the head unit’s browser first', link: 'check' },
      },
      'n1-carlink': {
        title: 'Phicomm N1 TV box + Carlink app',
        summary: 'The relay connects to the head unit’s Carlink app over Wi-Fi. This is experimental and may fail to connect.',
        needs: ['An iPhone with CarPlay', 'A Phicomm N1, a USB drive, a network cable and a computer', 'An Apple accessory (MFi) identity', 'A head unit with a Carlink app'],
        note: 'The N1 has one Wi-Fi radio: when the relay joins the car’s Carlink network, the iPhone follows it there.',
        action: 'Read the Phicomm N1 guide',
        link: 'phicomm-n1',
        secondary: { text: 'Read the Carlink guide', link: 'carlink' },
      },
    },
  },
}

const { localeIndex } = useData()
const locale = computed(() => (localeIndex.value === 'en' ? 'en' : 'root'))
const t = computed(() => TEXT[locale.value])
const prefix = computed(() => (locale.value === 'en' ? '/en/' : '/'))

const relay = ref<Relay>('android')
const display = ref<Display>('browser')
const key = computed<RouteKey>(() => `${relay.value}-${display.value}`)
const result = computed(() => t.value.results[key.value])

const href = (slug: string) => withBase(prefix.value + slug)
</script>

<template>
  <div class="oxp-chooser" :class="`is-${relay}`">
    <div class="oxp-chooser__questions">
      <fieldset class="oxp-chooser__question">
        <legend>{{ t.relayQuestion }}</legend>
        <label
          v-for="option in t.relays"
          :key="option.key"
          class="oxp-chooser__option"
          :class="[`is-${option.key}`, { 'is-selected': relay === option.key }]"
        >
          <input v-model="relay" type="radio" name="oxp-chooser-relay" :value="option.key">
          <svg class="oxp-chooser__icon" viewBox="0 0 24 24" aria-hidden="true" v-html="ICONS[option.key]" />
          <span class="oxp-chooser__text">
            <span class="oxp-chooser__name">
              {{ option.name }}
              <span v-if="option.tag" class="VPBadge" :class="option.tagKind">{{ option.tag }}</span>
            </span>
            <span class="oxp-chooser__desc">{{ option.desc }}</span>
          </span>
        </label>
      </fieldset>

      <fieldset class="oxp-chooser__question">
        <legend>{{ t.displayQuestion }}</legend>
        <label
          v-for="option in t.displays"
          :key="option.key"
          class="oxp-chooser__option"
          :class="[`is-${option.key}`, { 'is-selected': display === option.key }]"
        >
          <input v-model="display" type="radio" name="oxp-chooser-display" :value="option.key">
          <svg class="oxp-chooser__icon" viewBox="0 0 24 24" aria-hidden="true" v-html="ICONS[option.key]" />
          <span class="oxp-chooser__text">
            <span class="oxp-chooser__name">
              {{ option.name }}
              <span v-if="option.tag" class="VPBadge" :class="option.tagKind">{{ option.tag }}</span>
            </span>
            <span class="oxp-chooser__desc">{{ option.desc }}</span>
          </span>
        </label>
      </fieldset>
    </div>

    <div class="oxp-chooser__result" aria-live="polite">
      <Transition name="oxp-chooser" mode="out-in">
        <div :key="key" class="oxp-chooser__card">
          <p class="oxp-chooser__eyebrow">{{ t.yourRoute }}</p>
          <p class="oxp-chooser__title">{{ result.title }}</p>
          <p class="oxp-chooser__summary">{{ result.summary }}</p>
          <p class="oxp-chooser__needs-label">{{ t.needsLabel }}</p>
          <ul class="oxp-chooser__needs">
            <li v-for="need in result.needs" :key="need">{{ need }}</li>
          </ul>
          <p v-if="result.note" class="oxp-chooser__note">{{ result.note }}</p>
          <div class="oxp-chooser__actions">
            <a class="oxp-chooser__go" :href="href(result.link)">{{ result.action }}</a>
            <a class="oxp-chooser__secondary" :href="href(result.secondary.link)">{{ result.secondary.text }}</a>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.oxp-chooser {
  --chooser-accent: var(--oxp-android);
  --chooser-accent-soft: var(--oxp-android-soft);
  --chooser-action: var(--oxp-android-strong);
  margin: 24px 0 40px;
}

/* The relay's colour follows the site's convention: blue for Android, purple for Linux. */
.oxp-chooser.is-ufi003,
.oxp-chooser.is-n1 {
  --chooser-accent: var(--oxp-linux);
  --chooser-accent-soft: var(--oxp-linux-soft);
  --chooser-action: var(--oxp-linux-strong);
}

.oxp-chooser__questions {
  display: grid;
  gap: 20px;
}

@media (min-width: 720px) {
  .oxp-chooser__questions {
    grid-template-columns: 1fr 1fr;
  }
}

.oxp-chooser__question {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
}

.oxp-chooser__question legend {
  margin-bottom: 10px;
  padding: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.oxp-chooser__option {
  position: relative;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;
}

.oxp-chooser__option:hover {
  border-color: var(--vp-c-gray-1);
}

.oxp-chooser__option.is-selected {
  border-color: var(--chooser-accent);
  background: var(--chooser-accent-soft);
  box-shadow: 0 0 0 1px var(--chooser-accent);
}

.oxp-chooser__option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.oxp-chooser__option:has(input:focus-visible) {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.oxp-chooser__icon {
  flex: none;
  width: 28px;
  height: 28px;
  margin-top: 1px;
  fill: none;
  stroke: var(--vp-c-text-2);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke 0.2s;
}

.oxp-chooser__option.is-selected .oxp-chooser__icon {
  stroke: var(--chooser-accent);
}

.oxp-chooser__text {
  display: grid;
  gap: 2px;
}

.oxp-chooser__name {
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  color: var(--vp-c-text-1);
}

.oxp-chooser__name .VPBadge {
  margin-left: 4px;
  transform: translateY(-1px);
}

.oxp-chooser__desc {
  font-size: 13px;
  line-height: 20px;
  color: var(--vp-c-text-2);
}

.oxp-chooser__result {
  margin-top: 20px;
}

.oxp-chooser__card {
  padding: 20px 22px 22px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  border-top: 4px solid var(--chooser-accent);
  background: var(--vp-c-bg-soft);
}

.vp-doc .oxp-chooser__eyebrow {
  margin: 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--vp-c-text-2);
}

.vp-doc .oxp-chooser__title {
  margin: 2px 0 0;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: var(--vp-c-text-1);
}

.vp-doc .oxp-chooser__summary {
  margin: 8px 0 0;
  font-size: 15px;
  line-height: 24px;
}

.vp-doc .oxp-chooser__needs-label {
  margin: 18px 0 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
  color: var(--vp-c-text-2);
}

.vp-doc .oxp-chooser__needs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
}

.vp-doc .oxp-chooser__needs li {
  margin: 0;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 13px;
  line-height: 20px;
}

.vp-doc .oxp-chooser__note {
  margin: 16px 0 0;
  padding-left: 12px;
  border-left: 3px solid var(--vp-c-warning-2);
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-2);
}

.oxp-chooser__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
  margin-top: 20px;
}

.vp-doc .oxp-chooser__go {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 22px;
  border-radius: 22px;
  background: var(--chooser-action);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: filter 0.2s;
}

.vp-doc .oxp-chooser__go:hover {
  filter: brightness(1.08);
  color: #fff;
}

.vp-doc .oxp-chooser__secondary {
  font-size: 14px;
  font-weight: 500;
}

.oxp-chooser__go:focus-visible,
.oxp-chooser__secondary:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.oxp-chooser-enter-active,
.oxp-chooser-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.oxp-chooser-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.oxp-chooser-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .oxp-chooser-enter-active,
  .oxp-chooser-leave-active,
  .oxp-chooser__option,
  .oxp-chooser__icon {
    transition: none;
  }
}
</style>
