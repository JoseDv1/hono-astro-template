import { Hono } from 'hono'
import { existsSync } from 'fs'

const app = new Hono()


app.get('/api', (c) => {
  return c.json({ message: 'Hello World' })
})



// SSR with Hono <- Set this if statement on the end of the file to avoid collision with other routes
if (existsSync('./dist')) {

  // Import the serveStatic funtion acording to your runtime
  const { serveStatic } = await import('hono/bun')

  // Import the SSR handler from the server entry file
  const { handler: ssrHandler } = await import('../dist/server/entry.mjs')

  // Handle the static files and the SSR
  app.use(serveStatic({ root: './dist/client' }))

  // Handle the SSR
  app.use("/*", ssrHandler)
} else {
  console.log('The dist folder does not exist. Please run build command or only use the API')
}

export default app
