import { describe, test } from "vitest"
import { base64Space } from "./space.ts"

describe.concurrent("base64Space", () => {
	test("0 to 35", ({ expect }) => {
		for (let i = 0; i < 36; i++) {
			const reference = i.toString(36)
			const result = base64Space[i]
			expect(result).toBe(reference)
		}
	})

	test("36 to 61", ({ expect }) => {
		for (let i = 36; i < 62; i++) {
			const reference = (i - 26).toString(36).toUpperCase()
			const result = base64Space[i]
			expect(result).toBe(reference)
		}
	})
})
