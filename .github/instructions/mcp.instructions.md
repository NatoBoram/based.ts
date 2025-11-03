---
applyTo: src/mcp/**/*
---

# MCP Instructions

Model Context Protocol server implementation for exposing based.ts functionality as AI tools.

## Architecture

- Built with `@modelcontextprotocol/sdk`
- Supports both HTTP and stdio transports
- Tool schemas defined in #file:../../src/zod
- Implementation logic separated by tool

## Key Files

- #file:../../src/mcp/mcp.ts : Server instance and tool registration
- #file:../../src/mcp/app.ts : Express server for HTTP transport
- #file:../../src/mcp/convert.ts : Number base conversion tool implementation
- #file:../../src/mcp/uuid.ts : UUID generation tool implementation
- #file:../../src/mcp/error.ts : Error handling utilities

## Tool Registration Pattern

In #file:../../src/mcp/mcp.ts , register tools using schemas from #file:../../src/zod :

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { convertInputSchema, convertOutputSchema } from "../zod/convert.ts"
import { convert } from "./convert.ts"

mcp.registerTool(
	"convert",
	{
		title: "Convert",
		description:
			"Convert a number from a base in a space to another base in another space",
		inputSchema: convertInputSchema.shape,
		outputSchema: convertOutputSchema.shape,
	},
	convert,
)
```

## Tool Implementation Pattern

```ts
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js"
import type { inputSchema, OutputType } from "../zod/tool.ts"

type Callback = ToolCallback<typeof inputSchema.shape>

export const toolName: Callback = (parsed => {
	// Tool logic here
	const output: OutputType = { result: "value" }
	return {
		content: [{ type: "text", text: JSON.stringify(output) }],
		structuredContent: output,
	}
}) satisfies Callback
```

## BigInt Conversion Pattern

- **Always convert number inputs to BigInt**: `BigInt(parsed.fromBase)`
- **Zod schemas use `z.number()`** but tool implementations convert to `bigint`
- This avoids JSON serialization issues with `bigint` defaults in MCP protocol

## Adding a New Tool

1. Create a Zod schema in #file:../../src/zod with explicit `ObjectType<Shape>` annotations
2. Create the tool's implementation file in #file:../../src/mcp
3. Register the tool in #file:../../src/mcp/mcp.ts
