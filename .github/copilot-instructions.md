# Copilot Instructions

This is a TypeScript library for working with arbitrary numerical bases, available as both a library and a CLI tool. The core architecture centers on converting between different number representations (strings, bigints, bytes, UUIDs) across custom base systems. It also includes a Model Context Protocol (MCP) server to expose its functionality as AI tools.

## Key Architecture Patterns

### Base Conversion Flow

- **Central concept**: All conversions flow through `bigint` as the universal intermediate format.
- **Pattern**: `source → bigint → target` (e.g., `utf8ToBigInt()` → `toBase()`).
- **`space` parameter**: Custom character sets for representing digits (default: `base64Space` with 64 chars).

### Project References Architecture

The project uses **TypeScript project references** for modular builds, mirroring Go's `cmd/*` pattern:

```txt
Root (tsconfig.json)          # Assembles index.ts + main.ts
├── adapters/                 # Core conversion logic
│   └── → consts
├── commander/                # CLI implementation
│   ├── → adapters
│   └── → mcp
└── consts/                   # Constants (leaf, no deps)

Not referenced by root:
├── mcp/                      # MCP server (used by commander)
│   ├── → adapters
│   └── → zod
└── zod/                      # Schemas (used by mcp)
    └── → consts
```

- **Root compiles**: Only #file:../src/index.ts (library) and #file:../src/main.ts (CLI entrypoint)
- **Subprojects**: Each has `tsconfig.json` with `references` array, all emit to shared #file:../dist
- **Build orchestration**: `pnpm run build` uses `tsgo --build` which honors reference graph
- **Individual builds**: Can compile any leaf project independently (e.g., `tsc -b src/adapters`)

### Code Organization & Barrel Exports

- #file:../src/index.ts : Re-exports from #file:../src/adapters/index.ts and #file:../src/consts/index.ts (curated public API)
- #file:../src/main.ts : CLI entrypoint using Commander.js
- #file:../src/adapters : Core conversion functions (#file:../src/adapters/to_base.ts , #file:../src/adapters/to_bigint.ts , #file:../src/adapters/based.ts , etc.)
- #file:../src/commander : CLI commands (#file:../src/commander/convert.ts , #file:../src/commander/uuid.ts , #file:../src/commander/http.ts , #file:../src/commander/stdio.ts )
- #file:../src/mcp : MCP server (#file:../src/mcp/mcp.ts for registration, #file:../src/mcp/convert.ts / #file:../src/mcp/uuid.ts for tool logic)
- #file:../src/zod : Zod schemas with explicit types for `isolatedDeclarations` compatibility
- #file:../src/consts : Constants like `base64Space`

Each subproject has its own `index.ts` to control exports—only what's in the barrel is public.

## Development Workflow

### Build & Test Commands

```sh
pnpm run build # Compile TypeScript using tsgo --build (respects project references)
pnpm run test  # Run Vitest tests
pnpm run lint  # ESLint + MarkdownLint + Prettier (works without build)
pnpm run docs  # Generate TypeDoc documentation (runs predocs build hook)
```

**First-time setup**: After cloning, run `pnpm install && pnpm run build` to generate `.d.ts` files for project references.

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
- **Detailed patterns**: See #file:instructions/vitest.instructions.md for comprehensive testing conventions.

### Import Conventions

- Use `.ts` extensions in all relative imports.
- Separate type-only imports: `import type { UUID } from "node:crypto"`.

## Module-Specific Details

For implementation patterns specific to each module, see:

- #file:instructions/adapters.instructions.md : Core conversion logic patterns
- #file:instructions/commander.instructions.md : CLI command implementation with Commander.js
- #file:instructions/mcp.instructions.md : MCP server and tool implementation
- #file:instructions/zod.instructions.md : Schema definitions with `isolatedDeclarations` support
- #file:instructions/vitest.instructions.md : Testing conventions and patterns
