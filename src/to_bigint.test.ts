import { describe, test } from "vitest"
import { base64Space } from "./consts/space.ts"
import { basedToBigInt, bytesToBigInt } from "./to_bigint.ts"

describe.concurrent("bytesToBigInt", () => {
	test("Uint8ClampedArray", ({ expect }) => {
		const bits = new Uint8ClampedArray([1, 0])
		const bigInt = bytesToBigInt(bits)

		expect(bigInt).toBe(256n)
	})

	test("Uint8Array", ({ expect }) => {
		const bits = new Uint8Array([1, 0])
		const bigInt = bytesToBigInt(bits)

		expect(bigInt).toBe(256n)
	})

	test("Uint16Array", ({ expect }) => {
		const bits = new Uint16Array([1, 0])
		const bigInt = bytesToBigInt(bits)

		expect(bigInt).toBe(65536n)
	})

	test("Uint32Array", ({ expect }) => {
		const bits = new Uint32Array([1, 0])
		const bigInt = bytesToBigInt(bits)

		expect(bigInt).toBe(4294967296n)
	})
})

describe.concurrent("basedToBigInt", () => {
	test("base 2", ({ expect }) => {
		expect(basedToBigInt("1", 2n)).toBe(1n)
		expect(basedToBigInt("10", 2n)).toBe(2n)

		expect(basedToBigInt("-1", 2n)).toBe(-1n)
		expect(basedToBigInt("-10", 2n)).toBe(-2n)
	})

	test("base 10", ({ expect }) => {
		expect(basedToBigInt("9", 10n)).toBe(9n)
		expect(basedToBigInt("10", 10n)).toBe(10n)

		expect(basedToBigInt("-9", 10n)).toBe(-9n)
		expect(basedToBigInt("-10", 10n)).toBe(-10n)
	})

	test("base 16", ({ expect }) => {
		expect(basedToBigInt("f", 16n)).toBe(15n)
		expect(basedToBigInt("10", 16n)).toBe(16n)
		expect(basedToBigInt("ABCDEF", 16n)).toBe(11259375n)

		expect(basedToBigInt("-f", 16n)).toBe(-15n)
		expect(basedToBigInt("-10", 16n)).toBe(-16n)
	})

	test("base 36", ({ expect }) => {
		expect(basedToBigInt("z", 36n)).toBe(35n)
		expect(basedToBigInt("10", 36n)).toBe(36n)

		expect(basedToBigInt("-z", 36n)).toBe(-35n)
		expect(basedToBigInt("-10", 36n)).toBe(-36n)
	})

	test("base 62", ({ expect }) => {
		expect(basedToBigInt("Z", 62n)).toBe(61n)
		expect(basedToBigInt("10", 62n)).toBe(62n)

		expect(basedToBigInt("-Z", 62n)).toBe(-61n)
		expect(basedToBigInt("-10", 62n)).toBe(-62n)
	})

	test("base 64", ({ expect }) => {
		expect(basedToBigInt("+", 64n)).toBe(62n)
		expect(basedToBigInt("/", 64n)).toBe(63n)
		expect(basedToBigInt("10", 64n)).toBe(64n)

		expect(basedToBigInt("-+", 64n)).toBe(-62n)
		expect(basedToBigInt("-/", 64n)).toBe(-63n)
		expect(basedToBigInt("-10", 64n)).toBe(-64n)
	})

	test("Invalid space", ({ expect }) => {
		expect(() => basedToBigInt("9", 10n, base64Space.slice(0, 2))).toThrow(
			"Invalid space for this base",
		)
	})

	test("Wrong base", ({ expect }) => {
		expect(() => basedToBigInt("F", 10n, base64Space.slice(0, 16))).toThrow(
			"Invalid digit for this space",
		)
	})
})
