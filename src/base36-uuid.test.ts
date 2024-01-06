import { describe, test } from "vitest"
import {
	base36ToBigInt,
	bigIntToBase36,
	bigIntToBytes,
	bytesToBigInt,
	get128Bits,
} from "./base36-uuid.js"

test("get128Bits", ({ expect }) => {
	const bits = get128Bits()

	expect(bits).toBeInstanceOf(Uint8ClampedArray)
	expect(bits.length).toBe(16)
})

describe("bitsToBigInt", () => {
	test("256n", ({ expect }) => {
		const bits = new Uint8ClampedArray([1, 0])
		const bigInt = bytesToBigInt(bits)

		expect(bigInt).toBe(256n)
	})
})

describe("bigIntToBytes", () => {
	test("256n", ({ expect }) => {
		const bigInt = 256n
		const bytes = bigIntToBytes(bigInt)

		expect(bytes).toMatchObject(new Uint8ClampedArray([1, 0]))
	})
})

describe("bigIntToBase36", () => {
	test("a", ({ expect }) => {
		const bigInt = BigInt(10)
		const base36 = bigIntToBase36(bigInt)

		expect(base36).toBe("a")
	})

	test("uuid", ({ expect }) => {
		const bits = get128Bits()
		const bigInt = bytesToBigInt(bits)
		const base36 = bigIntToBase36(bigInt)

		expect(base36).toBeTypeOf("string")
		expect(base36.length).greaterThanOrEqual(24)
		expect(base36.length).lessThanOrEqual(25)

		console.log("Here's a free base36 UUID for you:", base36)
	})

	test("max safe integer", ({ expect }) => {
		const bigInt = BigInt(Number.MAX_SAFE_INTEGER)
		const base36 = bigIntToBase36(bigInt)
		expect(base36).toBe("2gosa7pa2gv")
	})

	test("max uuid", ({ expect }) => {
		const array = new Array(16).fill(255)
		const bits = new Uint8ClampedArray(array)
		const bigInt = bytesToBigInt(bits)
		const base36 = bigIntToBase36(bigInt)

		expect(base36).toBe("f5lxx1zz5pnorynqglhzmsp33")
		expect(base36).toHaveLength(25)
	})
})

describe("base36ToBigInt", () => {
	test("a", ({ expect }) => {
		const base36 = "a"
		const bigInt = base36ToBigInt(base36)

		expect(bigInt).toBe(10n)
	})

	test("uuid", ({ expect }) => {
		const bits = get128Bits()
		const bigInt = bytesToBigInt(bits)

		const base36 = bigIntToBase36(bigInt)
		const back = base36ToBigInt(base36)

		expect(back).toBe(bigInt)
	})

	test("max safe integer", ({ expect }) => {
		const bigInt = base36ToBigInt("2gosa7pa2gv")
		expect(bigInt).toBe(BigInt(Number.MAX_SAFE_INTEGER))
	})
})
