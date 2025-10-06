import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { toError } from "../mcp/error.ts"
import { mcp } from "../mcp/mcp.ts"

export async function stdio(): Promise<void> {
	const transport = new StdioServerTransport()
	const connected = await mcp
		.connect(transport)
		.catch(toError("Failed to connect to the MCP server"))
	if (connected instanceof Error) console.error("Internal error:", connected)
}
