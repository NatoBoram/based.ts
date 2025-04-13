import { test } from "vitest"
import { bigIntToBytes } from "./to_bytes.ts"

test("bigIntToBytes", ({ expect }) => {
	const bytes = bigIntToBytes(65536n)
	expect(bytes).toMatchObject(new Uint8ClampedArray([1, 0, 0]))
})
