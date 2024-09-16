import { defineConfig } from "astro/config"
import honoAstro from "hono-astro-adapter"


// https://astro.build/config
export default defineConfig({
	// Override the default src and public directories
	srcDir: "client/src", 
	publicDir: "client/public",
	adapter: honoAstro(),
	output: "server", // Or Hybrid

	// Proxy the http requests to the server in development
	devServer: {
		proxy: {
			"/api": "http://localhost:3000"
		}
	}
})