import { Hono, type Context } from 'hono'
import { existsSync } from 'fs'
import { serveStatic } from 'hono/bun'


const app = new Hono()
const PORT = process.env.PORT ?? 3000

app.get('/api', (c) => {
  return c.json({ message: 'Hello World' })
})



// SSR with Hono <- Set this if statement on the end of the file to avoid collision with other routes
if (existsSync('./dist')) {
  // Import the SSR handler from the server entry file
  // @ts-nocheck
  const { handler: ssrHandler } = await import('../dist/server/entry.mjs')
  // Handle the static files and the SSR
  app.use(serveStatic({ root: './dist/client' }))
  // Handle the SSR
  app.use("/*", ssrHandler)
} else {
  console.warn("The dist folder does not exist ,please build the project first. Server will run without SSR")
}

export default {
  fetch: app.fetch,
  port: PORT
}
