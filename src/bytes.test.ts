import { test } from "vitest"
import { getRandomBytes } from "./bytes.js"

test("getRandomBytes", ({ expect }) => {
	const bits = getRandomBytes()

	expect(bits).toBeInstanceOf(Uint8ClampedArray)
	expect(bits.length).toBe(16)
})
