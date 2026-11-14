<!--
SPDX-FileCopyrightText: 2026 OpenXPlay.org
SPDX-License-Identifier: MIT
Created by riko chen on 2026-11-13
-->
<script setup lang="ts">
// One group's QR code and the brands to choose from. The link picks the brand (/zh/join#byd), so a
// brand's link opens its owner group directly; with no brand, an unknown one, or a brand without a
// group, the card shows the community group. Without JavaScript the page shows the community group.
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
// @ts-ignore: provided by groupsPlugin in .vitepress/groups.ts
import data from 'virtual:oxp-groups'
import type { Brand, Groups } from '../../groups'

interface Text {
  community: string
  ownerGroup: (brand: string) => string
  noGroup: (brand: string) => string
  qrAlt: (group: string) => string
  scan: string
  updated: (day: string) => string
  brands: string
  other: string
  copy: string
  copied: string
}

const TEXT: Record<'zh' | 'en', Text> = {
  zh: {
    community: 'OpenXPlay 交流群',
    ownerGroup: brand => `${brand}车主群`,
    noGroup: brand => `还没有${brand}车主群，先加入交流群`,
    qrAlt: group => `${group}的入群二维码`,
    scan: '扫码或长按识别',
    updated: day => `${day} 更新`,
    brands: '按品牌找车主群',
    other: '其他品牌',
    copy: '复制本群链接',
    copied: '已复制',
  },
  en: {
    community: 'Community group',
    ownerGroup: brand => `${brand} owners`,
    noGroup: brand => `No ${brand} group yet; join the community group`,
    qrAlt: group => `QR code for joining the ${group}`,
    scan: 'Scan, or press and hold',
    updated: day => `Updated ${day}`,
    brands: 'Owner groups by brand',
    other: 'Other brands',
    copy: 'Copy the link to this group',
    copied: 'Copied',
  },
}

const groups = data as Groups
const { localeIndex } = useData()
const lang = computed(() => (localeIndex.value === 'en' ? 'en' : 'zh'))
const t = computed(() => TEXT[lang.value])

const chosen = ref('')
const brand = computed<Brand | undefined>(() => groups.brands.find(item => item.id === chosen.value))
const group = computed(() => brand.value?.group ?? groups.fallback)
const title = computed(() =>
  brand.value?.group ? t.value.ownerGroup(brand.value.name[lang.value]) : t.value.community)

const card = ref<HTMLElement>()
const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

function fromHash(): void {
  let id = ''
  try {
    id = decodeURIComponent(window.location.hash.slice(1)).trim().toLowerCase()
  } catch {}
  chosen.value = groups.brands.some(item => item.id === id) ? id : ''
}

function choose(id: string): void {
  chosen.value = id
  const { pathname, search } = window.location
  // Replace, not push: trying brands shouldn't fill the history.
  window.history.replaceState(window.history.state, '', id ? `#${id}` : pathname + search)
  const top = card.value?.getBoundingClientRect().top ?? 0
  if (top < 0 || top > window.innerHeight * 0.5) card.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function copyWithSelection(text: string): void {
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.style.cssText = 'position:fixed;opacity:0'
  document.body.append(field)
  field.select()
  try {
    document.execCommand('copy')
  } finally {
    field.remove()
  }
}

async function copyLink(): Promise<void> {
  const { origin, pathname } = window.location
  const link = origin + pathname + (chosen.value ? `#${chosen.value}` : '')
  try {
    await navigator.clipboard.writeText(link)
  } catch {
    // Head-unit and in-app browsers may lack the Clipboard API.
    copyWithSelection(link)
  }
  copied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => (copied.value = false), 1600)
}

onMounted(() => {
  fromHash()
  window.addEventListener('hashchange', fromHash)
})
onBeforeUnmount(() => {
  window.removeEventListener('hashchange', fromHash)
  clearTimeout(copiedTimer)
})
</script>

<template>
  <div class="oxp-join">
    <section ref="card" class="oxp-join__card" aria-live="polite">
      <div class="oxp-join__head">
        <h2 class="oxp-join__title">{{ title }}</h2>
        <button
          class="oxp-join__copy"
          :class="{ 'is-copied': copied }"
          type="button"
          :aria-label="copied ? t.copied : t.copy"
          :title="copied ? t.copied : t.copy"
          @click="copyLink"
        >
          <svg v-if="copied" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 13.5a4.5 4.5 0 0 0 6.36 0l3-3a4.5 4.5 0 0 0-6.36-6.36l-1.25 1.25" />
            <path d="M14 10.5a4.5 4.5 0 0 0-6.36 0l-3 3a4.5 4.5 0 0 0 6.36 6.36l1.25-1.25" />
          </svg>
        </button>
      </div>
      <p v-if="brand && !brand.group" class="oxp-join__note">{{ t.noGroup(brand.name[lang]) }}</p>
      <img :key="group.qr" class="oxp-join__qr" :src="group.qr" :alt="t.qrAlt(title)" decoding="async">
      <p class="oxp-join__caption">
        <span>{{ t.scan }}</span>
        <span v-if="group.updated">{{ t.updated(group.updated) }}</span>
      </p>
    </section>

    <nav v-if="groups.brands.length" class="oxp-join__brands" :aria-label="t.brands">
      <p class="oxp-join__label">{{ t.brands }}</p>
      <ul>
        <li v-for="item in groups.brands" :key="item.id">
          <a
            :href="`#${item.id}`"
            :aria-current="chosen === item.id ? 'true' : undefined"
            @click.prevent="choose(item.id)"
          >{{ item.name[lang] }}</a>
        </li>
        <li>
          <a href="#" class="is-other" :aria-current="chosen === '' ? 'true' : undefined" @click.prevent="choose('')">{{ t.other }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.oxp-join {
  display: grid;
  gap: 28px;
  margin: 24px 0 40px;
}

@media (min-width: 720px) {
  .oxp-join:has(.oxp-join__brands) {
    grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
    align-items: start;
  }
}

.oxp-join__card {
  width: 100%;
  max-width: 320px;
  padding: 16px 16px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  scroll-margin-top: calc(var(--vp-nav-height) + 16px);
}

.oxp-join__head {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.vp-doc .oxp-join__title {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: normal;
}

.oxp-join__copy {
  flex: none;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: var(--vp-c-text-2);
  transition: color 0.2s, background-color 0.2s;
}

.oxp-join__copy:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-default-soft);
}

.oxp-join__copy.is-copied {
  color: var(--vp-c-brand-1);
}

.oxp-join__copy svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.vp-doc .oxp-join__note {
  margin: 0 0 12px;
  padding: 8px 12px;
  border-radius: 10px;
  background: var(--vp-c-warning-soft);
  font-size: 14px;
  line-height: 22px;
}

.oxp-join__qr {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 10px;
  background: #fff;
}

.vp-doc .oxp-join__caption {
  display: flex;
  flex-wrap: wrap;
  gap: 2px 12px;
  justify-content: center;
  margin: 10px 0 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 20px;
}

.vp-doc .oxp-join__label {
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.oxp-join__brands ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.vp-doc .oxp-join__brands li {
  margin: 0;
}

.vp-doc .oxp-join__brands a {
  display: inline-block;
  padding: 7px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  text-decoration: none;
  transition: border-color 0.2s, background-color 0.2s, color 0.2s;
}

.vp-doc .oxp-join__brands a:hover {
  border-color: var(--vp-c-gray-1);
}

.vp-doc .oxp-join__brands a.is-other {
  border-style: dashed;
  color: var(--vp-c-text-2);
}

.vp-doc .oxp-join__brands a[aria-current='true'] {
  border-color: var(--vp-c-brand-1);
  border-style: solid;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
</style>
