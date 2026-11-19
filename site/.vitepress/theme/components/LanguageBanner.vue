<!--
SPDX-FileCopyrightText: 2026 OpenXPlay.org
SPDX-License-Identifier: MIT
Created by riko chen on 2026-10-17
-->
<script setup lang="ts">
// Offers the visitor's language on a page in another language. On an English page it offers
// Simplified Chinese, Russian or Spanish, whichever comes first in the browser's languages; on a
// Chinese, Russian or Spanish page it offers, to visitors whose browser doesn't have the page's language, the first of
// the other languages in the browser's list, or English. It renders only in the browser (never
// during the build), never redirects, and floats over the page so nothing moves when it appears.
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

type Language = 'zh' | 'en' | 'ru' | 'es'

// The page language the visitor chose to stay in ('zh-Hans', 'en', 'ru' or 'es-419').
const STORAGE_KEY = 'openxplay.languagePrompt'
const TAGS: Record<Language, RegExp> = {
  // zh, zh-CN, zh-TW, zh-Hans, zh-Hant, ... and the ISO 639-3 Chinese languages (cmn, yue, ...).
  zh: /^(zh|cmn|yue|wuu|hak|nan|gan|hsn|cdo|cjy|cpx|czh|czo|mnp|lzh)(?:[-_]|$)/i,
  en: /^en(?:[-_]|$)/i,
  ru: /^ru(?:[-_]|$)/i,
  // Any Spanish (es, es-419, es-MX, es-ES, ...): Latin American Spanish is the site's only Spanish.
  es: /^es(?:[-_]|$)/i,
}

interface Words {
  /** BCP 47 tag of the page and of the banner text. */
  lang: string
  /** Name of the language selector, in this language. */
  label: string
  /** "This site is also available in <language>.", in this language. */
  available: Record<Language, string>
  /** Switch to this language, in this language. */
  switchText: string
  /** "Stay in <language>", in this language. */
  stay: Record<Language, string>
}

const WORDS: Record<Language, Words> = {
  zh: {
    lang: 'zh-Hans',
    label: '语言选择',
    available: { zh: '本站提供简体中文版。', en: '本站提供英文版。', ru: '本站提供俄文版。', es: '本站提供西班牙文版。' },
    switchText: '切换到简体中文',
    stay: { zh: '继续使用简体中文', en: '继续使用英文', ru: '继续使用俄文', es: '继续使用西班牙文' },
  },
  en: {
    lang: 'en',
    label: 'Language',
    available: {
      zh: 'This site is also available in Simplified Chinese.',
      en: 'This site is also available in English.',
      ru: 'This site is also available in Russian.',
      es: 'This site is also available in Spanish.',
    },
    switchText: 'Switch to English',
    stay: { zh: 'Stay in Chinese', en: 'Stay in English', ru: 'Stay in Russian', es: 'Stay in Spanish' },
  },
  ru: {
    lang: 'ru',
    label: 'Язык',
    available: {
      zh: 'Этот сайт доступен и на упрощённом китайском языке.',
      en: 'Этот сайт доступен и на английском языке.',
      ru: 'Этот сайт доступен и на русском языке.',
      es: 'Этот сайт доступен и на испанском языке.',
    },
    switchText: 'Перейти на русский',
    stay: { zh: 'Остаться на китайском', en: 'Остаться на английском', ru: 'Остаться на русском', es: 'Остаться на испанском' },
  },
  es: {
    lang: 'es-419',
    label: 'Idioma',
    available: {
      zh: 'Este sitio también está disponible en chino simplificado.',
      en: 'Este sitio también está disponible en inglés.',
      ru: 'Este sitio también está disponible en ruso.',
      es: 'Este sitio también está disponible en español.',
    },
    switchText: 'Cambiar a español',
    stay: { zh: 'Seguir en chino', en: 'Seguir en inglés', ru: 'Seguir en ruso', es: 'Seguir en español' },
  },
}

const LANGUAGES = Object.keys(WORDS) as Language[]

const { localeIndex, page } = useData()
const route = useRoute()
const mounted = ref(false)
const browserLanguages = ref<Language[]>([])
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
  browserLanguages.value = browserTags()
    .map(tag => LANGUAGES.find(language => TAGS[language].test(tag.trim())))
    .filter((language): language is Language => !!language)
  stayedIn.value = readStayedIn()
  updateHash()
  window.addEventListener('hashchange', updateHash)
  mounted.value = true
})

onBeforeUnmount(() => window.removeEventListener('hashchange', updateHash))

watch(() => route.path, () => { if (mounted.value) updateHash() })

const pageLanguage = computed(() => LANGUAGES.find(language => language === localeIndex.value))

/** The language to offer: none when the visitor reads the page's language (English is everyone's fallback). */
const target = computed<Language | undefined>(() => {
  const current = pageLanguage.value
  if (!current) return undefined
  if (current === 'en') return browserLanguages.value.find(language => language !== 'en')
  if (browserLanguages.value.includes(current)) return undefined
  return browserLanguages.value.find(language => language !== current) ?? 'en'
})

const offer = computed(() => {
  const from = pageLanguage.value
  const to = target.value
  if (!from || !to) return undefined
  return {
    pageLang: WORDS[from].lang,
    targetLang: WORDS[to].lang,
    label: `${WORDS[to].label} / ${WORDS[from].label}`,
    headline: WORDS[to].available[to],
    second: WORDS[from].available[to],
    switchText: WORDS[to].switchText,
    stayText: WORDS[to].stay[from],
    prefix: `${to}/`,
  }
})

const visible = computed(() => {
  const current = offer.value
  return mounted.value && !!current && !page.value.isNotFound && stayedIn.value !== current.pageLang
})

const targetHref = computed(() => {
  const slug = page.value.relativePath.replace(/^(zh|en|ru|es)\//, '').replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
  return withBase(`/${offer.value?.prefix ?? ''}${slug}`) + hash.value
})

function stay(): void {
  const current = offer.value
  if (!current) return
  stayedIn.value = current.pageLang
  try { window.localStorage.setItem(STORAGE_KEY, current.pageLang) } catch { /* the choice lasts for this page view */ }
}
</script>

<template>
  <Transition name="oxp-language">
    <aside v-if="visible && offer" class="oxp-language" :lang="offer.targetLang" :aria-label="offer.label">
      <p class="oxp-language__text">
        <strong>{{ offer.headline }}</strong>
        <span :lang="offer.pageLang">{{ offer.second }}</span>
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
