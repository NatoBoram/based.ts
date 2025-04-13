import { test } from "vitest"
import { getRandomBytes } from "./bytes.ts"

test("getRandomBytes", ({ expect }) => {
	const bits = getRandomBytes()

	expect(bits).toBeInstanceOf(Uint8ClampedArray)
	expect(bits.length).toBe(16)
})
