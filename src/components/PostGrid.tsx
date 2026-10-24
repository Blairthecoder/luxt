import { Link } from '@tanstack/react-router'
import type { Post } from '@/content/posts'
import { TOPICS_BY_SLUG } from '@/content/topics'
import { formatPostDate } from '@/lib/format'

type PostCard = Pick<Post, 'slug' | 'title' | 'excerpt' | 'readMinutes'> & Partial<Pick<Post, 'topics' | 'publishedAt' | 'updatedAt'>>

/** Topic, date and read time above a guide title. */
export function PostMeta({ post, className = '' }: { post: PostCard; className?: string }) {
  const topic = post.topics?.[0] ? TOPICS_BY_SLUG[post.topics[0]] : undefined
  const date = post.updatedAt ?? post.publishedAt
  return (
    <p className={`text-[0.8125rem] text-graphite ${className}`}>
      {topic && <span className="font-semibold text-signal">{topic.name}</span>}
      {topic && <span className="mx-2 text-silver">·</span>}
      {date && (
        <>
          <time dateTime={date}>{formatPostDate(date)}</time>
          <span className="mx-2 text-silver">·</span>
        </>
      )}
      {post.readMinutes} min read
    </p>
  )
}

/** Editorial list of guides: hairline rules, no cards. */
export function PostGrid({ posts }: { posts: PostCard[] }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-10 border-t border-ink">
      {posts.map((post) => (
        <Link
          key={post.slug}
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="group block py-10 border-b border-line reveal"
        >
          <PostMeta post={post} />
          <h2 className="mt-3 font-display text-[1.625rem] sm:text-[1.875rem] font-bold tracking-[-0.035em] leading-[1.08] group-hover:underline underline-offset-[6px] decoration-2">
            {post.title}
          </h2>
          <p className="mt-4 text-graphite leading-relaxed">{post.excerpt}</p>
        </Link>
      ))}
    </div>
  )
}
