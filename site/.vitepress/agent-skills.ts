// SPDX-FileCopyrightText: 2026 OpenXPlay.org
// SPDX-License-Identifier: MIT
// Created by riko chen on 2026-10-29

// Agent skills live in the repository's skills/<name>/ directories, where GitHub serves them. At
// build time every skill is checked (frontmatter, version, changelog, and that a changed skill
// carries a new version), then mirrored to agents/skills/<name>/ with agents/skills/index.json for
// readers who cannot reach GitHub. Installed copies compare their version with either.

import { spawnSync } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { GITHUB_ORG, SITE_ROOT } from './site'

export const SKILLS_PATH = 'agents/skills'
const SOURCE_TREE = `${GITHUB_ORG}/OpenXPlay/tree/main/skills`
const SOURCE_RAW = 'https://raw.githubusercontent.com/OpenXPlay/OpenXPlay/main/skills'
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/
const NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/

interface SkillFile {
  path: string
  size: number
  sha256: string
}

export interface SkillEntry {
  name: string
  description: string
  version: string
  /** Copies older than this must not be used; they read the published copy instead. */
  minimumVersion: string
  released: string
  /** SKILL.md on GitHub, the published copy. */
  url: string
  /** The same files on this site. */
  mirror: string
  source: string
  files: SkillFile[]
  changes: string[]
}

function fail(file: string, message: string): never {
  throw new Error(`agent skills: ${file}: ${message}`)
}

function unquote(raw: string): string {
  const value = raw.trim()
  if (value.startsWith('"')) return JSON.parse(value)
  if (value.startsWith("'")) return value.slice(1, -1).replace(/''/g, "'")
  return value
}

/**
 * The frontmatter as flat fields ('name', 'metadata.version'). Skills use a small YAML subset:
 * top-level `key: value` lines, maps one level deep, comments and quoted scalars.
 */
function readFrontmatter(text: string, file: string): Record<string, string> {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text)
  if (!match) fail(file, 'no YAML frontmatter at the top')
  const fields: Record<string, string> = {}
  let section = ''
  for (const line of match[1].split('\n')) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue
    const entry = /^( *)([A-Za-z][\w-]*):(?: +(.*))?$/.exec(line)
    if (!entry) fail(file, `unsupported frontmatter line: ${line}`)
    const [, indent, key, raw = ''] = entry
    if (!indent) section = raw ? '' : key
    else if (!section) fail(file, `indented line outside a map: ${line}`)
    if (raw) fields[indent ? `${section}.${key}` : key] = unquote(raw)
  }
  return fields
}

/** The newest CHANGELOG.md entry: a '## <version> (YYYY-MM-DD)' heading and its '- ' bullets. */
function newestChanges(text: string, file: string): { version: string; date: string; changes: string[] } {
  const lines = text.split('\n')
  const start = lines.findIndex(line => line.startsWith('## '))
  const heading = /^## (\S+) \((\d{4}-\d{2}-\d{2})\)$/.exec(lines[start] ?? '')
  if (!heading) fail(file, 'the first entry must start with "## <version> (YYYY-MM-DD)"')
  const changes: string[] = []
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith('## ')) break
    if (line.startsWith('- ')) changes.push(line.slice(2).trim())
    else if (line.startsWith('  ') && changes.length) changes[changes.length - 1] += ` ${line.trim()}`
  }
  if (!changes.length) fail(file, `the ${heading[1]} entry lists no changes`)
  return { version: heading[1], date: heading[2], changes }
}

function compareVersions(a: string, b: string): number {
  const [x, y] = [a, b].map(v => v.split('.').map(Number))
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i]
  return 0
}

function listFiles(dir: string, prefix = ''): string[] {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(entry => !entry.name.startsWith('.'))
    .flatMap(entry => entry.isDirectory()
      ? listFiles(path.join(dir, entry.name), `${prefix}${entry.name}/`)
      : [`${prefix}${entry.name}`])
    .sort()
}

function git(cwd: string, ...args: string[]): { status: number | null; out: string } {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' })
  return { status: result.error ? null : result.status, out: (result.stdout ?? '').trim() }
}

/** Where a change is measured from: where this branch left main, or main's previous commit on main. */
function baseCommit(cwd: string): string | undefined {
  const head = git(cwd, 'rev-parse', 'HEAD')
  if (head.status !== 0 || git(cwd, 'rev-parse', '--verify', '--quiet', 'origin/main').status !== 0) return undefined
  const base = git(cwd, 'merge-base', 'HEAD', 'origin/main')
  if (base.status === 0 && base.out !== head.out) return base.out
  const parent = git(cwd, 'rev-parse', '--verify', '--quiet', 'HEAD^1')
  return parent.status === 0 ? parent.out : undefined
}

/** A skill that differs from the base must carry a higher version than the base had. */
function checkVersionRaised(root: string, relative: string, version: string): void {
  const base = baseCommit(root)
  if (!base) {
    console.warn(`agent skills: no origin/main in git; not checking that ${relative} raised its version`)
    return
  }
  if (git(root, 'diff', '--quiet', base, '--', relative).status === 0) return
  const previous = git(root, 'show', `${base}:${relative}/SKILL.md`)
  if (previous.status !== 0) return
  const before = readFrontmatter(`${previous.out}\n`, `${relative}/SKILL.md at ${base.slice(0, 7)}`)['metadata.version']
  if (before && compareVersions(version, before) <= 0) {
    fail(relative, `changed since ${base.slice(0, 7)} but its version is still ${version} (was ${before}); ` +
      'raise metadata.version in SKILL.md and add a CHANGELOG.md entry for it')
  }
}

function readSkill(root: string, name: string): SkillEntry {
  const relative = `skills/${name}`
  const dir = path.join(root, relative)
  const skillFile = `${relative}/SKILL.md`
  const front = readFrontmatter(fs.readFileSync(path.join(dir, 'SKILL.md'), 'utf8'), skillFile)
  if (!NAME.test(name) || name.length > 64) fail(relative, 'the directory name must be lowercase words joined by hyphens')
  if (front.name !== name) fail(skillFile, `name must be "${name}", the directory name`)
  const description = front.description ?? ''
  if (!description || description.length > 1024) fail(skillFile, 'description must have 1 to 1024 characters')
  const version = front['metadata.version'] ?? ''
  const minimumVersion = front['metadata.minimum-version'] ?? version
  for (const [field, value] of [['metadata.version', version], ['metadata.minimum-version', minimumVersion]]) {
    if (!SEMVER.test(value)) fail(skillFile, `${field} must be MAJOR.MINOR.PATCH (got "${value}")`)
  }
  if (compareVersions(minimumVersion, version) > 0) fail(skillFile, 'metadata.minimum-version is above metadata.version')
  const changelog = newestChanges(fs.readFileSync(path.join(dir, 'CHANGELOG.md'), 'utf8'), `${relative}/CHANGELOG.md`)
  if (changelog.version !== version) {
    fail(`${relative}/CHANGELOG.md`, `the newest entry is ${changelog.version}, but SKILL.md says ${version}`)
  }
  checkVersionRaised(root, relative, version)
  return {
    name,
    description,
    version,
    minimumVersion,
    released: changelog.date,
    url: `${SOURCE_RAW}/${name}/SKILL.md`,
    mirror: `${SITE_ROOT}${SKILLS_PATH}/${name}/`,
    source: `${SOURCE_TREE}/${name}`,
    files: listFiles(dir).map(file => {
      const bytes = fs.readFileSync(path.join(dir, file))
      return { path: file, size: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex') }
    }),
    changes: changelog.changes,
  }
}

/** Every skill in the repository's skills/, checked; throws on the first problem so the build fails. */
export function readSkills(srcDir: string): SkillEntry[] {
  const root = path.resolve(srcDir, '..')
  const skills = path.join(root, 'skills')
  if (!fs.existsSync(skills)) return []
  return fs.readdirSync(skills, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && fs.existsSync(path.join(skills, entry.name, 'SKILL.md')))
    .map(entry => entry.name)
    .sort()
    .map(name => readSkill(root, name))
}

/** The mirror: each skill's files and the index, under agents/skills/ in the build output. */
export function writeSkills(srcDir: string, outDir: string, skills: SkillEntry[]): void {
  const dir = path.join(outDir, SKILLS_PATH)
  for (const skill of skills) {
    for (const file of skill.files) {
      const target = path.join(dir, skill.name, file.path)
      fs.mkdirSync(path.dirname(target), { recursive: true })
      fs.copyFileSync(path.resolve(srcDir, '..', 'skills', skill.name, file.path), target)
    }
  }
  fs.mkdirSync(dir, { recursive: true })
  const index = { schema: 'org.openxplay.agent-skills/1', skills }
  fs.writeFileSync(path.join(dir, 'index.json'), `${JSON.stringify(index, null, 2)}\n`)
}
