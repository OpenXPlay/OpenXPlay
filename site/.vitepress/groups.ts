// SPDX-FileCopyrightText: 2026 OpenXPlay.org
// SPDX-License-Identifier: MIT
// Created by riko chen on 2026-11-13

// The groups of the Join a group pages: data/groups.yaml (described there), checked at build time
// and served to the JoinGroups component as the module `virtual:oxp-groups`. The module imports
// each QR image it lists, so Vite bundles only those images from Group/.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import { parse } from 'yaml'

const DATA_FILE = fileURLToPath(new URL('../data/groups.yaml', import.meta.url))
const GROUP_DIR = fileURLToPath(new URL('../../Group', import.meta.url))
const MODULE_ID = 'virtual:oxp-groups'
const RESOLVED_ID = `\0${MODULE_ID}`

const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/
const DATE = /^\d{4}-\d{2}-\d{2}$/

/** A group as the component sees it: `qr` is the image URL. */
export interface Group {
  qr: string
  updated?: string
}

export interface Brand {
  id: string
  name: { zh: string; en: string }
  group?: Group
}

export interface Groups {
  fallback: Group
  brands: Brand[]
}

type Fields = Record<string, unknown>

function fail(where: string, message: string): never {
  throw new Error(`data/groups.yaml: ${where}: ${message}`)
}

function fields(value: unknown, where: string, allowed: string[]): Fields {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(where, 'expected a mapping')
  const unknown = Object.keys(value).filter(key => !allowed.includes(key))
  if (unknown.length) fail(where, `unknown key ${unknown.join(', ')}`)
  return value as Fields
}

function text(value: unknown, where: string): string {
  if (typeof value !== 'string' || !value.trim()) fail(where, 'expected text')
  return value.trim()
}

/** Checks a QR image path and returns its absolute file. */
function qrFile(value: unknown, where: string): string {
  const file = path.resolve(GROUP_DIR, text(value, where))
  if (!file.startsWith(GROUP_DIR + path.sep)) fail(where, 'must be a path under Group/')
  if (!fs.existsSync(file)) fail(where, `Group/${value} doesn't exist`)
  return file
}

function updated(value: unknown, where: string): string | undefined {
  if (value === undefined) return undefined
  const day = text(value, where)
  if (!DATE.test(day) || Number.isNaN(Date.parse(day))) fail(where, 'expected a date such as 2026-11-13')
  return day
}

/** The data with absolute image files in place of URLs. */
function readGroups(): Groups {
  const data = fields(parse(fs.readFileSync(DATA_FILE, 'utf8')), 'top level', ['fallback', 'brands'])
  const fallback = fields(data.fallback, 'fallback', ['qr', 'updated'])
  if (!Array.isArray(data.brands)) fail('brands', 'expected a list')
  const seen = new Set<string>()
  const brands = data.brands.map((entry, index): Brand => {
    const brand = fields(entry, `brands[${index}]`, ['id', 'name', 'qr', 'updated'])
    const id = text(brand.id, `brands[${index}].id`)
    const where = `brand ${id}`
    if (!ID.test(id)) fail(`${where}.id`, 'use lowercase letters, digits and hyphens')
    if (seen.has(id)) fail(`${where}.id`, 'appears twice')
    seen.add(id)
    let name: Brand['name']
    if (typeof brand.name === 'string') {
      name = { zh: text(brand.name, `${where}.name`), en: text(brand.name, `${where}.name`) }
    } else {
      const names = fields(brand.name, `${where}.name`, ['zh', 'en'])
      name = { zh: text(names.zh, `${where}.name.zh`), en: text(names.en, `${where}.name.en`) }
    }
    if (brand.qr === undefined && brand.updated !== undefined) fail(`${where}.updated`, 'needs qr')
    const group = brand.qr === undefined ? undefined : {
      qr: qrFile(brand.qr, `${where}.qr`),
      updated: updated(brand.updated, `${where}.updated`),
    }
    return { id, name, group }
  })
  return {
    fallback: { qr: qrFile(fallback.qr, 'fallback.qr'), updated: updated(fallback.updated, 'fallback.updated') },
    brands,
  }
}

/** JavaScript for the module: one import per image, then the data with the imported URLs. */
function groupsModule(): string {
  const groups = readGroups()
  const imports: string[] = []
  const image = (file: string) => {
    imports.push(`import qr${imports.length} from ${JSON.stringify(file)}`)
    return `qr${imports.length - 1}`
  }
  const group = (value: Group) => `{ qr: ${image(value.qr)}, updated: ${JSON.stringify(value.updated)} }`
  const brands = groups.brands.map(brand =>
    `{ id: ${JSON.stringify(brand.id)}, name: ${JSON.stringify(brand.name)}, group: ${brand.group ? group(brand.group) : 'undefined'} }`)
  const fallback = group(groups.fallback)
  return `${imports.join('\n')}\nexport default { fallback: ${fallback}, brands: [${brands.join(', ')}] }\n`
}

export function groupsPlugin(): Plugin {
  return {
    name: 'openxplay-groups',
    resolveId(id) {
      return id === MODULE_ID ? RESOLVED_ID : null
    },
    load(id) {
      if (id !== RESOLVED_ID) return null
      this.addWatchFile(DATA_FILE)
      return groupsModule()
    },
  }
}
