---
applyTo: "**/*.test.ts"
---

# Vitest Instructions

## Test Structure & Naming

### Describe Blocks

- **Top-level**: Use function/class names exactly in `describe.concurrent()`: `"toBase"`, `"Based"`, `"basedToBigInt"`
- **Nested**: Use method names without parentheses: `"fromUtf8"`, `"toUtf8"`, `"trimUuidHexes"`

### Test Cases

- Use descriptive input/output or scenario names: `"base 16"`, `"Hello"`, `"!"`, `"binary to decimal"`
- Destructure `expect` from `test` parameter: `test("scenario", ({ expect }) => { ... })`

## Core Testing Pattern

```ts
import { describe, test } from "vitest"

describe.concurrent("functionName", () => {
	test("scenario", ({ expect }) => {
		// Test positive values
		expect(functionName(input)).toBe(expected)

		// Test negative values
		expect(functionName(-input)).toBe(-expected)
	})

	test("Invalid space", ({ expect }) => {
		expect(() => functionName(args)).toThrow("Invalid space for this base")
	})
})
```

## Systematic Testing Requirements

### Base Coverage

Test across these specific bases: **2, 10, 16, 36, 62, 64**

### Typed Array Coverage

Test all variants systematically: `Uint8Array`, `Uint16Array`, `Uint32Array`

### Boundary Testing

- Use `Number.MAX_SAFE_INTEGER` for boundary conditions
- Test both positive and negative values
- Test specific error messages, not just error throwing

## CLI Command Testing

```ts
import { afterAll, afterEach, describe, test, vi } from "vitest"

describe("commandName", () => {
	const console = vi.spyOn(globalThis.console, "log")

	afterEach(() => console.mockClear())
	afterAll(() => vi.restoreAllMocks())

	test("command scenario", ({ expect }) => {
		commandFunction(args, options)
		expect(console).toHaveBeenCalledWith(expectedOutput)
	})
})
```

## Method Testing Pattern (Based class)

```ts
describe("methodName", () => {
	test("operation", ({ expect }) => {
		const result = baseObject.method(argument)
		expect(result.value).toBe("expectedString")
	})
})
```
