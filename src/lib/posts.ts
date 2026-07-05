/** Writing section: every .md file in src/posts/ becomes a post.
 *  import.meta.glob is Vite's way to bundle files matching a pattern. */
const files = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

export type PostMeta = { slug: string; title: string; date: string; teaser: string; body: string }

export const posts: PostMeta[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace('.md', '')
    const lines = raw.trim().split('\n')
    const title = (lines[0] || '').replace(/^#\s*/, '')
    const date = (lines[1] || '').replace(/^_|_$/g, '')
    const body = lines.slice(2).join('\n').trim()
    const teaser = body.replace(/[#>*`]/g, '').split('\n').find((l) => l.trim().length > 40)?.slice(0, 140) ?? ''
    return { slug, title, date, teaser, body: raw.trim() }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))
