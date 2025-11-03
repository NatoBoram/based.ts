---
applyTo: src/zod/**/*
---

# Zod Instructions

Zod schemas for MCP tool input/output validation with support for `isolatedDeclarations`.

## Architecture

- Uses `zod/v3` import path for future v4 compatibility
- Explicit type annotations required for `isolatedDeclarations: true`
- `ObjectType<Shape>` helper for type-safe schema definitions
- Dependencies: Only `consts` for default values

## Key Files

- #file:../../src/zod/object_type.ts : `ObjectType<Shape>` helper type
- #file:../../src/zod/convert.ts : Conversion tool schemas
- #file:../../src/zod/uuid.ts : UUID generation tool schemas

## Schema Pattern for `isolatedDeclarations`

```ts
import type { ZodDefault, ZodNumber, ZodString, z } from "zod/v3"
import { number, object, string } from "zod/v3"
import { base64Space } from "../consts/space.ts"
import type { ObjectType } from "./object_type.ts"

export type InputType = z.infer<typeof inputSchema>
export type OutputType = z.infer<typeof outputSchema>

type InputObjectType = ObjectType<{
	field: ZodString
	optionalField: ZodDefault<ZodNumber>
}>

export const inputSchema: InputObjectType = object({
	field: string().describe("Description"),
	optionalField: number().default(10),
})

type OutputObjectType = ObjectType<{ result: ZodString }>

export const outputSchema: OutputObjectType = object({ result: string() })
```

## Why This Pattern?

- **Explicit type annotations** (`InputObjectType`) enable `isolatedDeclarations: true` (required for composite projects)
- **Import from `zod/v3`** is the official pattern for Zod 3.x compatibility with future v4 migration
- **Separate type exports** (`InputType`, `OutputType`) allow consumers to use inferred types without importing schemas
- **`ObjectType<Shape>` helper** provides type-safe schema shape definitions

## Schema Conventions

- Always export type aliases for `z.infer<typeof schema>`
- Use `.describe()` for all fields to provide context in MCP tools
- Use `.default()` for optional fields to simplify tool usage
- Import constants from #file:../../src/consts for default values
