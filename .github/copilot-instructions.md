# Copilot Instructions

This is a TypeScript library for working with arbitrary numerical bases both as a library and a CLI tool. The core architecture centers around converting between different number representations (strings, bigints, bytes, UUIDs) across custom base systems.

## Key Architecture Patterns

### Base Conversion Flow

- **Central concept**: All conversions flow through `bigint` as the universal intermediate format
- **Pattern**: `source → bigint → target` (e.g., `utf8ToBigInt()` → `toBase()`)
- **Space parameter**: Custom character sets for representing digits (default: `base64Space` with 64 chars)

### Core Components

- `Based` class (`src/based.ts`): Main API for chaining operations and base conversions
- `to_*.ts` files: Conversion utilities organized by target type
- `space.ts`: Defines character spaces for different bases
- `commander`: CLI implementation using Commander.js

### Code Organization

- `src`
  - `based.ts`: Main Based class with arithmetic operations
  - `to_base.ts`: Convert from bigint to base-encoded strings
  - `to_bigint.ts`: Convert to bigint from various formats
  - `to_bytes.ts`: Byte array conversions
  - `to_utf-8.ts`: UTF-8 string conversions
  - `to_uuid.ts`: UUID conversions
  - `commander`: CLI commands (convert, uuid)

## Development Workflow

### Build & Test Commands

```sh
pnpm run build      # Compile TypeScript using tsgo
pnpm run test       # Run Vitest tests
pnpm run test:watch # Watch mode for development
pnpm run lint       # ESLint + MarkdownLint + Prettier
pnpm run docs       # Generate TypeDoc documentation
```

### CLI Testing

```sh
# Run CLI from source
pnpm run dev

# Run built CLI
pnpm run build
pnpm run start
```

## Project-Specific Conventions

### TypeScript Configuration

- **Strict mode**: All strict TypeScript options enabled including `exactOptionalPropertyTypes`
- **Module system**: ESNext with `.ts` extensions in imports
- **Type imports**: Use `type` imports via `consistent-type-imports` ESLint rule
- **No type assertions**: `assertionStyle: "never"` enforced by ESLint

### Error Handling Pattern

```ts
throw new Error("Invalid space for this base", {
	cause: { value, base, space }, // Always include context in cause
})
```

### Testing Patterns

- **File naming**: `*.test.ts` files co-located with source
- **Test structure**: Vitest with coverage in `coverage` directory
- **See**: `.github/instructions/vitest.instructions.md` for detailed testing patterns

### Import Conventions

- Use `.ts` extensions in all imports (required by TypeScript config)
- Separate type-only imports: `import type { UUID } from "node:crypto"`
- Re-export pattern in `index.ts` for clean public API

## Key Dependencies & Integration Points

### Runtime Dependencies

- `commander`: CLI framework (only production dependency)
- `node:crypto`: For UUID type definitions

### Development Ecosystem

- **Build**: Custom `tsgo` (not standard tsc)
- **Linting**: ESLint + TypeScript ESLint with strict rules
- **Testing**: Vitest with V8 coverage
- **Docs**: TypeDoc for API documentation

## Critical Implementation Details

### Space Validation

Always validate that the provided character space has enough characters for the target base:

```ts
if (space.length < Number(base)) throw new Error("Invalid space for this base")
```

### BigInt Arithmetic

All mathematical operations convert to `bigint` first, then back to the target base. The `Based` class preserves the original base and space for chaining operations.

### CLI Architecture

The CLI uses a modular command structure where each command (`convert`, `uuid`) is in its own file under `commander`, imported into `program.ts`, and executed via `main.ts`.
