import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { mcp } from "../mcp/mcp.ts"

export async function stdio(): Promise<void> {
	const transport = new StdioServerTransport()
	await mcp.connect(transport)
}
