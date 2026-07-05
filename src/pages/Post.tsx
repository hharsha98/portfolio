/** One blog post, markdown rendered to HTML with marked. */
import { Link, useParams } from 'react-router-dom'
import { marked } from 'marked'
import { posts } from '../lib/posts'

export default function Post() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="text-zinc-400">Post not found.</p>
        <Link to="/" className="mt-4 inline-block font-mono text-sm text-accent">← back home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-dvh atmosphere">
      <article className="mx-auto max-w-2xl px-5 py-14 sm:px-6 sm:py-20">
        <Link to="/" className="font-mono text-xs text-zinc-500 hover:text-accent">← harsha vardhan</Link>
        <div className="prose-post mt-8"
          dangerouslySetInnerHTML={{ __html: marked.parse(post.body) as string }} />
      </article>
    </div>
  )
}
