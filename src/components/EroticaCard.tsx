import { Link } from '@tanstack/react-router'
import type { EroticaEntry } from '@/content/erotica'

type Card = Pick<EroticaEntry, 'slug' | 'kind' | 'title' | 'excerpt' | 'readMinutes' | 'moods'>

/** Mood labels and read time above an Erotica title. */
export function EroticaMeta({ entry, className = '' }: { entry: Card; className?: string }) {
  return (
    <p className={`text-[0.8125rem] text-graphite ${className}`}>
      <span className="font-semibold text-signal">{entry.kind === 'story' ? 'Short Story' : 'Reading List'}</span>
      {entry.moods
        .filter((m) => m !== 'Reading List')
        .map((m) => (
          <span key={m}>
            <span className="mx-2 text-silver">·</span>
            {m}
          </span>
        ))}
      <span className="mx-2 text-silver">·</span>
      {entry.readMinutes} min read
    </p>
  )
}

/** Story and reading-list cards on the Erotica hub, the homepage and story pages. */
export function EroticaGrid({ entries, tone = 'light' }: { entries: Card[]; tone?: 'light' | 'blush' }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
      {entries.map((entry) => (
        <Link
          key={entry.slug}
          to="/erotica/$slug"
          params={{ slug: entry.slug }}
          className={`group flex flex-col justify-between rounded-3xl p-7 sm:p-9 min-h-[17rem] reveal ${tone === 'blush' ? 'bg-canvas' : 'bg-blush'}`}
        >
          <span className="block">
            <EroticaMeta entry={entry} />
            <span className="mt-3 block font-display text-[1.625rem] sm:text-[1.875rem] font-bold tracking-[-0.035em] leading-[1.08] group-hover:underline underline-offset-[6px] decoration-2">
              {entry.title}
            </span>
            <span className="mt-4 block text-graphite leading-relaxed">{entry.excerpt}</span>
          </span>
          <span className="mt-6 more">{entry.kind === 'story' ? 'Read the Story' : 'See the List'}</span>
        </Link>
      ))}
    </div>
  )
}
