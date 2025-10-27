import { app } from "../mcp/app.ts"

interface HttpOptions {
	readonly port: string
}

interface ParsedHttpOptions {
	readonly port: number
}

export function http(options: HttpOptions): void {
	const { port } = parseHttpOptions(options)

	app
		.listen(port, () => {
			console.log(`MCP Server running on http://localhost:${port}/mcp`)
		})
		.on("error", error => {
			console.error("Server error:", error)
			process.exit(1)
		})
}

function parseHttpOptions(options: HttpOptions): ParsedHttpOptions {
	return {
		port: parseInt(options.port, 10),
	}
}
