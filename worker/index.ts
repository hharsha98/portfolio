import { handleContact } from './contact'

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const path = new URL(request.url).pathname.replace(/\/$/, '') || '/'
    if (path === '/api/contact') {
      return handleContact(request, env, ctx)
    }
    return new Response('Not found', { status: 404 })
  },
} satisfies ExportedHandler<Env>
