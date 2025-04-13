import { describe, test } from "vitest"
import { toBase } from "./to_base.js"

describe("base64Space", () => {
	test("a", ({ expect }) => {
		const reference = (10).toString(36)
		const result = toBase(10n, 36n)
		expect(result).toBe(reference)
	})

	test("z", ({ expect }) => {
		const reference = (35).toString(36)
		const result = toBase(35n, 36n)
		expect(result).toBe(reference)
	})

	test("2gosa7pa2gv", ({ expect }) => {
		const reference = Number.MAX_SAFE_INTEGER.toString(36)
		const result = toBase(BigInt(Number.MAX_SAFE_INTEGER), 36n)
		expect(result).toBe(reference)
	})
})
