import { Link } from '@tanstack/react-router'
import type { Post } from '@/content/posts'

/** Editorial list of guides: hairline rules, no cards. */
export function PostGrid({ posts }: { posts: Pick<Post, 'slug' | 'title' | 'excerpt' | 'readMinutes'>[] }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-10 border-t border-ink">
      {posts.map((post) => (
        <Link
          key={post.slug}
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="group block py-10 border-b border-line reveal"
        >
          <p className="text-sm text-graphite">{post.readMinutes} min read</p>
          <h2 className="mt-3 font-display text-[1.625rem] sm:text-[1.875rem] font-bold tracking-[-0.035em] leading-[1.08] group-hover:underline underline-offset-[6px] decoration-2">
            {post.title}
          </h2>
          <p className="mt-4 text-graphite leading-relaxed">{post.excerpt}</p>
        </Link>
      ))}
    </div>
  )
}
