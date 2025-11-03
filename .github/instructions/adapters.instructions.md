---
applyTo: src/adapters/**/*
---

# Adapters Instructions

Core conversion logic for transforming between different number representations.

## Architecture

- **Central concept**: All conversions flow through `bigint` as the universal intermediate format.
- **Pattern**: `source → bigint → target` (e.g., `utf8ToBigInt()` → `toBase()`).
- **Dependencies**: Only depends on `consts` (for `base64Space` and other constants).

## Key Files

- #file:../../src/adapters/based.ts : `Based` class for chaining arithmetic operations on arbitrary bases
- #file:../../src/adapters/to_base.ts : Convert `bigint` to base-N string representation
- #file:../../src/adapters/to_bigint.ts : Convert various formats (string, bytes, UTF-8, UUID) to `bigint`
- #file:../../src/adapters/to_bytes.ts : Convert various formats to `TypedUintArray`
- #file:../../src/adapters/to_utf-8.ts : Convert to UTF-8 strings
- #file:../../src/adapters/to_uuid.ts : Convert to UUID format
- #file:../../src/adapters/bytes.ts : Random byte generation utilities
- #file:../../src/adapters/typed_array.ts : Type definitions for typed arrays

## Conversion Function Pattern

```ts
export function toFormat(
	value: InputType,
	base: bigint,
	space: string = base64Space,
): OutputType {
	// Validate inputs
	if (space.length < Number(base))
		throw new Error("Invalid space for this base", {
			cause: { value, base, space },
		})

	// Convert through bigint if needed
	const bigInt = toBigInt(value)

	// Transform to target format
	return transformToOutput(bigInt, base, space)
}
```

## Error Handling

Always include context in error causes:

```ts
throw new Error("Invalid space for this base", {
	cause: { value, base, space },
})
```

## Testing Requirements

- Test across bases: **2, 10, 16, 36, 62, 64**
- Test both positive and negative values
- Test boundary conditions (e.g., `Number.MAX_SAFE_INTEGER`)
- Test all typed array variants: `Uint8Array`, `Uint16Array`, `Uint32Array`
