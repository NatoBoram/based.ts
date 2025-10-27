import { describe, test } from "vitest"
import { base64Space } from "./consts/space.ts"
import { toBase } from "./to_base.ts"

describe.concurrent("toBase", () => {
	test("base 2", ({ expect }) => {
		expect(toBase(1n, 2n)).toBe("1")
		expect(toBase(2n, 2n)).toBe("10")

		expect(toBase(-1n, 2n)).toBe("-1")
		expect(toBase(-2n, 2n)).toBe("-10")
	})

	test("base 10", ({ expect }) => {
		expect(toBase(9n, 10n)).toBe("9")
		expect(toBase(10n, 10n)).toBe("10")

		expect(toBase(-9n, 10n)).toBe("-9")
		expect(toBase(-10n, 10n)).toBe("-10")
	})

	test("base 16", ({ expect }) => {
		expect(toBase(15n, 16n)).toBe("f")
		expect(toBase(16n, 16n)).toBe("10")

		expect(toBase(-15n, 16n)).toBe("-f")
		expect(toBase(-16n, 16n)).toBe("-10")
	})

	test("base 36", ({ expect }) => {
		expect(toBase(35n, 36n)).toBe("z")
		expect(toBase(36n, 36n)).toBe("10")

		expect(toBase(-35n, 36n)).toBe("-z")
		expect(toBase(-36n, 36n)).toBe("-10")
	})

	test("base 62", ({ expect }) => {
		expect(toBase(61n, 62n)).toBe("Z")
		expect(toBase(62n, 62n)).toBe("10")

		expect(toBase(-61n, 62n)).toBe("-Z")
		expect(toBase(-62n, 62n)).toBe("-10")
	})

	test("base 64", ({ expect }) => {
		expect(toBase(64n, 64n)).toBe("10")

		expect(toBase(-64n, 64n)).toBe("-10")
	})

	test("Invalid space", ({ expect }) => {
		expect(() => toBase(9n, 10n, base64Space.slice(0, 2))).toThrow(
			"Invalid space for this base",
		)
	})
})
