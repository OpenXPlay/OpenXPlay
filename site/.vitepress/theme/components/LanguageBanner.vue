<!--
SPDX-FileCopyrightText: 2026 OpenXPlay.org
SPDX-License-Identifier: MIT
Created by riko chen on 2026-10-17
-->
<script setup lang="ts">
// Offers the other language when the browser suggests it: English on a Chinese page (the default)
// to visitors whose browser has no Chinese language, and Simplified Chinese on an English page to
// visitors whose browser prefers any Chinese language. It renders only in the browser (never
// during the build), never redirects, and floats over the page so nothing moves when it appears.
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

// The page language the visitor chose to stay in ('zh-Hans' or 'en').
const STORAGE_KEY = 'openxplay.languagePrompt'
// zh, zh-CN, zh-TW, zh-Hans, zh-Hant, ... and the ISO 639-3 Chinese languages (cmn, yue, ...).
const CHINESE_TAG = /^(zh|cmn|yue|wuu|hak|nan|gan|hsn|cdo|cjy|cpx|czh|czo|mnp|lzh)(?:[-_]|$)/i

interface Offer {
  /** Language of the page the banner appears on. */
  pageLang: string
  /** Shown to visitors who do (true) or don't (false) read Chinese. */
  forChinese: boolean
  /** Language and path prefix of the offered page. */
  targetLang: string
  targetPrefix: string
  bannerLang: string
  label: string
  headline: string
  secondLang: string
  second: string
  switchText: string
  stayText: string
}

const OFFERS: Record<string, Offer> = {
  root: {
    pageLang: 'zh-Hans',
    forChinese: false,
    targetLang: 'en',
    targetPrefix: 'en/',
    bannerLang: 'en',
    label: 'Language / 语言选择',
    headline: 'This site is also available in English.',
    secondLang: 'zh-Hans',
    second: '本站提供英文版。',
    switchText: 'Switch to English',
    stayText: 'Stay in Chinese',
  },
  en: {
    pageLang: 'en',
    forChinese: true,
    targetLang: 'zh-Hans',
    targetPrefix: '',
    bannerLang: 'zh-Hans',
    label: '语言选择 / Language',
    headline: '本站提供简体中文版。',
    secondLang: 'en',
    second: 'This site is also available in Simplified Chinese.',
    switchText: '切换到简体中文',
    stayText: '继续使用英文',
  },
}

const { localeIndex, page } = useData()
const route = useRoute()
const mounted = ref(false)
const readsChinese = ref(false)
const stayedIn = ref<string | null>(null)
const hash = ref('')

function browserTags(): string[] {
  const tags: string[] = []
  try { if (Array.isArray(navigator.languages)) tags.push(...navigator.languages) } catch { /* unavailable */ }
  try { if (navigator.language) tags.push(navigator.language) } catch { /* unavailable */ }
  try { tags.push(Intl.DateTimeFormat().resolvedOptions().locale) } catch { /* unavailable */ }
  return tags.filter((tag): tag is string => typeof tag === 'string')
}

function readStayedIn(): string | null {
  try { return window.localStorage.getItem(STORAGE_KEY) } catch { return null }
}

function updateHash(): void {
  hash.value = window.location.hash
}

onMounted(() => {
  readsChinese.value = browserTags().some(tag => CHINESE_TAG.test(tag.trim()))
  stayedIn.value = readStayedIn()
  updateHash()
  window.addEventListener('hashchange', updateHash)
  mounted.value = true
})

onBeforeUnmount(() => window.removeEventListener('hashchange', updateHash))

watch(() => route.path, () => { if (mounted.value) updateHash() })

const offer = computed(() => OFFERS[localeIndex.value])

const visible = computed(() => {
  const current = offer.value
  return mounted.value && !!current && !page.value.isNotFound
    && readsChinese.value === current.forChinese && stayedIn.value !== current.pageLang
})

const targetHref = computed(() => {
  const slug = page.value.relativePath.replace(/^en\//, '').replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
  return withBase(`/${offer.value.targetPrefix}${slug}`) + hash.value
})

function stay(): void {
  stayedIn.value = offer.value.pageLang
  try { window.localStorage.setItem(STORAGE_KEY, offer.value.pageLang) } catch { /* the choice lasts for this page view */ }
}
</script>

<template>
  <Transition name="oxp-language">
    <aside v-if="visible" class="oxp-language" :lang="offer.bannerLang" :aria-label="offer.label">
      <p class="oxp-language__text">
        <strong>{{ offer.headline }}</strong>
        <span :lang="offer.secondLang">{{ offer.second }}</span>
      </p>
      <div class="oxp-language__actions">
        <a class="oxp-language__switch" :href="targetHref" :hreflang="offer.targetLang">{{ offer.switchText }}</a>
        <button type="button" class="oxp-language__stay" @click="stay">{{ offer.stayText }}</button>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.oxp-language {
  position: fixed;
  top: 8px;
  left: 50%;
  z-index: calc(var(--vp-z-index-nav) + 10);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  width: min(760px, calc(100% - 32px));
  padding: 10px 12px 10px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
  transform: translateX(-50%);
}

.oxp-language__text {
  display: flex;
  flex-direction: column;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.oxp-language__text span {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.oxp-language__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.oxp-language__switch,
.oxp-language__stay {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  transition: background-color 0.2s, color 0.2s;
}

.oxp-language__switch {
  border: 1px solid var(--vp-button-brand-border);
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  text-decoration: none;
}

.oxp-language__switch:hover {
  background: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-hover-text);
}

.oxp-language__stay {
  border: 1px solid var(--vp-button-alt-border);
  background: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  cursor: pointer;
}

.oxp-language__stay:hover {
  background: var(--vp-button-alt-hover-bg);
}

.oxp-language__switch:focus-visible,
.oxp-language__stay:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.oxp-language-enter-active,
.oxp-language-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.oxp-language-enter-from,
.oxp-language-leave-to {
  opacity: 0;
  transform: translate(-50%, -8px);
}

@media (prefers-reduced-motion: reduce) {
  .oxp-language-enter-active,
  .oxp-language-leave-active {
    transition: none;
  }
}
</style>
