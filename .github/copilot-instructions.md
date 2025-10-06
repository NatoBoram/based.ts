# Copilot Instructions

This is a TypeScript library for working with arbitrary numerical bases, available as both a library and a CLI tool. The core architecture centers on converting between different number representations (strings, bigints, bytes, UUIDs) across custom base systems. It also includes a Model Context Protocol (MCP) server to expose its functionality as AI tools.

## Key Architecture Patterns

### Base Conversion Flow

- **Central concept**: All conversions flow through `bigint` as the universal intermediate format.
- **Pattern**: `source → bigint → target` (e.g., `utf8ToBigInt()` → `toBase()`).
- **`space` parameter**: Custom character sets for representing digits (default: `base64Space` with 64 chars).

### Core Components

- `Based` class (`src/based.ts`): Main API for chaining arithmetic operations.
- `to_*.ts` files: Conversion utilities organized by target type.
- `space.ts`: Defines character spaces for different bases.
- `commander`: CLI implementation using Commander.js.
- `mcp`: Model Context Protocol server implementation.

### Code Organization

- `src`
  - `based.ts`: Main `Based` class with arithmetic operations.
  - `to_base.ts`, `to_bigint.ts`, etc.: Core conversion logic.
  - `commander/`: CLI commands (`convert`, `uuid`, `http`, `stdio`).
  - `mcp/`: MCP server implementation.
    - `app.ts`: Express server for HTTP transport.
    - `mcp.ts`: `McpServer` instance and tool registration.
    - `convert.ts`, `uuid.ts`: Tool implementation logic.
  - `zod/`: Zod schemas for MCP tool input/output validation.

## Development Workflow

### Build & Test Commands

```sh
pnpm run build      # Compile TypeScript using tsgo
pnpm run test       # Run Vitest tests
pnpm run lint       # ESLint + MarkdownLint + Prettier
pnpm run docs       # Generate TypeDoc documentation
```

### CLI & MCP Server Testing

```sh
# Run CLI from source
pnpm run dev convert 42 --to-base 16

# Start the MCP server (HTTP)
pnpm run dev mcp http

# Start the MCP server (stdio)
pnpm run dev mcp stdio

# MCP Inspector for debugging
pnpm run inspector:http   # HTTP transport
pnpm run inspector:stdio  # stdio transport
```

## Project-Specific Conventions

### TypeScript Configuration

- **Strict mode**: All strict TypeScript options enabled.
- **Module system**: ESNext with `.ts` extensions in imports.
- **Type imports**: Use `type` imports (`import type { ... }`).

### Error Handling Pattern

```ts
throw new Error("Invalid space for this base", {
	cause: { value, base, space }, // Always include context in cause
})
```

### Testing Patterns

- **File naming**: `*.test.ts` files co-located with source files.
- **Test framework**: Uses `vitest` with `describe.concurrent()` for parallel execution.
- **Detailed patterns**: See `.github/instructions/vitest.instructions.md` for comprehensive testing conventions.

### Import Conventions

- Use `.ts` extensions in all relative imports.
- Separate type-only imports: `import type { UUID } from "node:crypto"`.

## Critical Implementation Details

### MCP Server

- The MCP server is built with `@modelcontextprotocol/sdk`.
- `src/mcp/mcp.ts` is where tools are registered with the `McpServer` instance.
- Tool schemas are defined using `zod` in the `src/zod/` directory.
- The server supports both HTTP and stdio transports, configured in `src/commander/http.ts` and `src/commander/stdio.ts`.
- When adding a new tool, you must:
  1. Create a Zod schema in `src/zod/`.
  2. Create the tool's implementation file in `src/mcp/`.
  3. Register the tool in `src/mcp/mcp.ts`.

### MCP Tool Implementation Pattern

```ts
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js"
import type { z } from "zod"

type Callback = ToolCallback<typeof inputSchema.shape>

export const toolName: Callback = (parsed => {
	// Tool logic here
	const output: z.infer<typeof outputSchema> = { result: "value" }
	return {
		content: [{ type: "text", text: JSON.stringify(output) }],
		structuredContent: output,
	}
}) satisfies Callback
```

### BigInt Conversion Pattern

- **Always convert number inputs to BigInt** for MCP tools: `BigInt(parsed.fromBase)`
- **Zod schemas use `z.number()`** but tool implementations convert to `bigint`
- This avoids JSON serialization issues with `bigint` defaults in MCP protocol
