import { describe, test } from "vitest"
import { Based } from "./based.js"
import { base64Space } from "./space.js"

describe("Based", () => {
	const base2 = new Based("10", 2n, base64Space.slice(0, 2))
	const base36 = new Based("10", 36n, base64Space.slice(0, 36))

	test("divide", ({ expect }) => {
		const result = base36.divide(base2)
		expect(result.value).toBe("i")
	})

	test("minus", ({ expect }) => {
		const result = base36.minus(base2)
		expect(result.value).toBe("y")
	})

	test("multiply", ({ expect }) => {
		const result = base36.multiply(base2)
		expect(result.value).toBe("20")
	})

	test("plus", ({ expect }) => {
		const result = base36.plus(base2)
		expect(result.value).toBe("12")
	})

	test("to", ({ expect }) => {
		const result = base36.to(2n)
		expect(result.value).toBe("100100")
	})
})
