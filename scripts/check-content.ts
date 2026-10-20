// Dev check: resolves every guide's picks against the synced catalog and
// flags internal links to guides, collections or hubs that don't exist.
// Run with `pnpm check:content`, or pass guide files to check ones not yet
// listed in posts.ts: `pnpm check:content src/content/guides/x.ts`.
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { POSTS, type Post } from '@/content/posts'
import { COLLECTIONS_BY_SLUG } from '@/content/collections'
import { HUBS } from '@/content/hubs'
import { TOPICS } from '@/content/topics'
import { resolvePicks } from '@/server/post-html'
import { allProducts } from '@/server/catalog-store'

const files = process.argv.slice(2)
const extra: Post[] = []
for (const file of files) {
  const mod = await import(pathToFileURL(resolve(file)).href)
  extra.push(...(Object.values(mod) as Post[]).filter((v) => v && typeof v === 'object' && 'slug' in v))
}
const toCheck = files.length ? extra : POSTS
const postSlugs = new Set([...POSTS, ...extra].map((p) => p.slug))
const hubSlugs = new Set(HUBS.map((h) => h.slug))
const topicSlugs = new Set(TOPICS.map((t) => t.slug))
const staticPaths = new Set(['/blog', '/gifts', '/disclosure', '/about', '/glossary', '/quiz', '/'])
let problems = 0
// A failed catalog sync leaves a small stub; picks can only be checked against a real feed.
const realCatalog = allProducts().length >= 100
if (!realCatalog) console.log('Catalog is a stub: skipping pick resolution (run pnpm sync:catalog)')

function linkOk(path: string): boolean {
  const clean = path.split(/[?#]/)[0]
  if (staticPaths.has(clean)) return true
  const [, kind, slug] = clean.split('/')
  if (kind === 'blog' && slug === 'topic') return topicSlugs.has(clean.split('/')[3])
  if (kind === 'blog') return postSlugs.has(slug) || existsSync(`src/content/guides/${slug}.ts`)
  if (kind === 'shop') return slug in COLLECTIONS_BY_SLUG
  if (kind === 'category') return hubSlugs.has(slug)
  if (kind === 'products' || kind === 'quiz') return true
  return false
}

for (const post of toCheck) {
  const used = new Set<string>()
  for (const [id, block] of Object.entries(post.picks ?? {})) {
    if (!post.body.includes(`[[picks:${id}]]`)) {
      console.log(`${post.slug}: picks.${id} is never embedded`)
      problems++
    }
    if (!realCatalog) continue
    const picks = resolvePicks(block, used)
    const filled = new Set(picks.map((p) => p.slot.label))
    for (const slot of block.slots) {
      const hit = picks.find((p) => p.slot.label === slot.label)
      if (!filled.has(slot.label)) {
        console.log(`${post.slug}: picks.${id} "${slot.label}" EMPTY`)
        problems++
      } else if (files.length) console.log(`  ${id} / ${slot.label}: ${hit!.product.title} ($${hit!.product.price})`)
    }
  }
  for (const m of post.body.matchAll(/\[\[picks:([a-z0-9-]+)\]\]/g)) {
    if (!post.picks?.[m[1]]) {
      console.log(`${post.slug}: [[picks:${m[1]}]] has no picks block`)
      problems++
    }
  }
  for (const m of post.body.matchAll(/\[\[(?:from|price):([a-z0-9-]+)\]\]/g)) {
    if (!COLLECTIONS_BY_SLUG[m[1]]) {
      console.log(`${post.slug}: unknown collection in ${m[0]}`)
      problems++
    }
  }
  for (const m of post.body.matchAll(/\]\((\/[^)\s]*)\)/g)) {
    if (!linkOk(m[1])) {
      console.log(`${post.slug}: broken link ${m[1]}`)
      problems++
    }
  }
  if (!post.faqs?.length) {
    console.log(`${post.slug}: no faqs`)
    problems++
  }
}
console.log(problems ? `${problems} problem(s)` : 'All guides OK')
process.exitCode = problems ? 1 : 0
