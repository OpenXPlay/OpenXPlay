// SPDX-FileCopyrightText: 2026 OpenXPlay.org
// SPDX-License-Identifier: MIT
// Created by riko chen on 2026-10-21

// Keeps links into the site working after the 2026-10 restructure, and makes links into folded
// content useful:
//   - an anchor that moved to another page (such as /quick-start#ufi003-relay) is forwarded to its
//     new place, replacing the old URL in the history so Back doesn't bounce;
//   - a link to a <details> block, or into one, opens it.
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute, useRouter, withBase } from 'vitepress'

/** Old anchor → new location, per page slug ('' is the home page). Same for every locale. */
const MOVED: Record<string, Record<string, string>> = {
  '': {
    community: 'community',
    'relay-route': 'how-it-works',
    combinations: 'how-it-works#combinations',
    lean: 'how-it-works#lean',
  },
  'quick-start': {
    'browser-step-by-step': 'android-relay',
    'step-check': 'android-relay#step-check',
    'step-install': 'android-relay#step-install',
    'step-guide': 'android-relay#step-guide',
    'step-prepare': 'android-relay#step-prepare',
    'step-network': 'android-relay#step-network',
    'step-start': 'android-relay#step-start',
    'step-open': 'android-relay#step-open',
    'step-use': 'android-relay#step-use',
    'step-car': 'daily-use#car-model',
    daily: 'daily-use#daily',
    'other-routes': 'quick-start#choose-relay',
    'ufi003-relay': 'ufi003-relay',
    'ufi003-base-image': 'ufi003-flash',
    carlink: 'carlink',
    'certificate-warning': 'troubleshooting#certificate-warning',
    'next-steps': 'quick-start#after-setup',
  },
  faq: {
    setup: 'troubleshooting#connection',
    'certificate-warning': 'troubleshooting#certificate-warning',
    'only-2-4-ghz': 'troubleshooting#only-2-4-ghz',
    'bluetooth-pairing': 'troubleshooting#bluetooth-pairing',
    'iphone-not-connecting': 'troubleshooting#iphone-not-connecting',
    'video-not-supported': 'troubleshooting#video-not-supported',
    'relay-unreachable': 'troubleshooting#relay-unreachable',
    'no-sound': 'troubleshooting#no-sound',
    microphone: 'troubleshooting#microphone',
    performance: 'faq#usage',
    stutter: 'troubleshooting#stutter',
    'in-the-car': 'faq#usage',
  },
  developers: {
    licensing: 'licensing#licenses',
    exemptions: 'licensing#exemptions',
    trademarks: 'licensing#trademarks',
    website: 'licensing#website',
  },
  'trusted-https': {
    android: 'trusted-https#android-settings',
    linux: 'trusted-https#linux-admin',
  },
}

function currentHash(): string {
  try {
    return decodeURIComponent(window.location.hash.slice(1))
  } catch {
    return ''
  }
}

/** Opens every closed <details> that is, or contains, the element with this id. */
function openDetailsFor(id: string): void {
  const target = id ? document.getElementById(id) : null
  if (!target) return
  let opened = false
  for (let node: Element | null = target; node; node = node.parentElement?.closest('details') ?? null) {
    const details = node instanceof HTMLDetailsElement ? node : node.closest('details')
    if (!details) break
    if (!details.open) {
      details.open = true
      opened = true
    }
    node = details
  }
  if (opened) requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }))
}

export function useAnchorFixes(): void {
  const route = useRoute()
  const router = useRouter()

  function check(): void {
    const id = currentHash()
    const path = window.location.pathname.slice(withBase('/').length - 1)
    const locale = path.startsWith('/en/') || path === '/en' ? 'en/' : ''
    const slug = path.slice(locale.length + 1).replace(/(^|\/)index(\.html)?$/, '').replace(/\.html$/, '')
    const moved = id ? MOVED[slug]?.[id] : undefined
    if (moved) {
      const href = withBase(`/${locale}${moved}`)
      window.history.replaceState(window.history.state, '', href)
      router.go(href)
      return
    }
    openDetailsFor(id)
  }

  // After VitePress has rendered the page and scrolled to the hash.
  const later = () => nextTick(() => requestAnimationFrame(() => requestAnimationFrame(check)))

  onMounted(() => {
    later()
    window.addEventListener('hashchange', later)
  })
  onBeforeUnmount(() => window.removeEventListener('hashchange', later))
  watch(() => route.path, later)
}
