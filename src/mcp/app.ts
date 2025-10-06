import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import cors from "cors"
import type { Express } from "express"
import express from "express"
import morgan from "morgan"
import { toError } from "./error.ts"
import { mcp } from "./mcp.ts"

export const app: Express = express()

app.use(express.json())
app.use(morgan("combined"))

app.use(
	cors({
		allowedHeaders: ["Content-Type", "mcp-session-id"],
		exposedHeaders: ["Mcp-Session-Id"],
		origin: "*",
	}),
)

app.post("/mcp", async (req, res) => {
	const transport = new StreamableHTTPServerTransport({
		enableJsonResponse: true,
		sessionIdGenerator: undefined,
	})

	res.on("close", () => void transport.close())

	const connected = await mcp
		.connect(transport)
		.catch(toError("Failed to connect to the MCP server", { req, res }))
	if (connected instanceof Error) {
		console.error("Internal error:", connected)
		return void res.sendStatus(500)
	}

	const handled = await transport
		.handleRequest(req, res, req.body)
		.catch(toError("Failed to handle the MCP request", { req, res }))
	if (handled instanceof Error) {
		console.error("Internal error:", handled)
		return void res.sendStatus(500)
	}
})
