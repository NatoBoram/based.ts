import { describe, test } from "vitest"
import { base64Space } from "../consts/space.ts"
import { Based } from "./based.ts"

describe.concurrent("Based", () => {
	const base2 = new Based("10", 2n, base64Space.slice(0, 2))
	const base36 = new Based("10", 36n, base64Space.slice(0, 36))
	const zero = new Based("0", 10n, base64Space.slice(0, 10))

	test("divide", ({ expect }) => {
		const result = base36.divide(base2)
		expect(result.value).toBe("i")
	})

	test("divide by zero", ({ expect }) => {
		expect(() => base36.divide(zero)).toThrowError(RangeError)
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

	describe("fromUtf8", () => {
		test("!", ({ expect }) => {
			const based = Based.fromUtf8("!")
			const binary = based.to(2n)
			expect(binary.value).toBe("100001")
		})

		test("Hello", ({ expect }) => {
			const based = Based.fromUtf8("Hello")
			const binary = based.to(2n)
			expect(binary.value).toBe("100100001100101011011000110110001101111")
		})

		test("feature/utf-8", ({ expect }) => {
			const based = Based.fromUtf8("feature/utf-8")
			const base64 = based.to(62n)
			expect(base64.value).toBe("2KaQuupUj78H50K3iw")
		})
	})

	describe("toUtf8", () => {
		test("!", ({ expect }) => {
			const based = new Based("00100001", 2n)
			const utf8 = based.toUtf8()
			expect(utf8).toBe("!")
		})

		test("Hello", ({ expect }) => {
			const based = new Based("0100100001100101011011000110110001101111", 2n)
			const utf8 = based.toUtf8()
			expect(utf8).toBe("Hello")
		})

		test("feature/utf-8", ({ expect }) => {
			const based = new Based("2KaQuupUj78H50K3iw", 62n)
			const utf8 = based.toUtf8()
			expect(utf8).toBe("feature/utf-8")
		})
	})
})
