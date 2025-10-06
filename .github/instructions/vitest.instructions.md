---
applyTo: "**/*.test.ts"
---

# Vitest Instructions

## Naming Conventions

- Use function/class names exactly in `describe.concurrent()`: `"toBase"`, `"Based"`, `"basedToBigInt"`
- Use method names without parentheses in nested `describe()`: `"fromUtf8"`, `"trimUuidHexes"`
- Use the input, the result or a very short name for scenarios in `test()`: `"base 16"`, `"Hello"`, `"!"`, `"binary to decimal"`

## Testing Patterns

- All tests use `describe.concurrent()`
- Destructure `expect` from `test`
- Test positive/negative values systematically across common bases (2, 10, 16, 36, 62, 64)
- Test all typed array variants (`Uint8Array`, `Uint16Array`, `Uint32Array`) systematically
- Use `Number.MAX_SAFE_INTEGER` to test boundaries
- Test specific error text, not just that errors are thrown

## CLI Testing

- Mock side-effects.
- Create immutable mocks.

```ts
import { afterAll, afterEach, describe, test, vi } from "vitest"
import { base64Space } from "../space.ts"
import { convert } from "./convert.ts"

describe("convert", () => {
	const console = vi.spyOn(globalThis.console, "log")

	afterEach(() => console.mockClear())

	afterAll(() => {
		vi.restoreAllMocks()
	})
})
```
