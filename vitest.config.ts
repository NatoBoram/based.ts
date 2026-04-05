import type { ViteUserConfig } from "vitest/config"
import { defineConfig } from "vitest/config"

const config: ViteUserConfig = defineConfig({
	test: {
		coverage: {
			include: ["src/**/*.ts"],
			reporter: ["html-spa", "json-summary", "text"],
		},
		include: ["src/**/*.test.ts"],
	},
})

export default config
