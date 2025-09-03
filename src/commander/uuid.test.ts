import { afterAll, afterEach, describe, test, vi } from "vitest"
import * as bytesModule from "../bytes.ts"
import { base64Space } from "../space.ts"
import { uuid } from "./uuid.ts"

describe("uuid", () => {
	const console = vi.spyOn(globalThis.console, "log")
	const getRandomBytesSpy = vi.spyOn(bytesModule, "getRandomBytes")

	afterEach(() => {
		console.mockClear()
		getRandomBytesSpy.mockClear()
	})

	afterAll(() => {
		vi.restoreAllMocks()
	})

	test("base 16", ({ expect }) => {
		const bytes = new Uint8ClampedArray(16).fill(255)
		getRandomBytesSpy.mockReturnValue(bytes)

		uuid({
			base: "16",
			space: base64Space,
		})

		expect(console).toHaveBeenCalledWith("ffffffffffffffffffffffffffffffff")
	})

	test("base 64", ({ expect }) => {
		const bytes = new Uint8ClampedArray([
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
		])
		getRandomBytesSpy.mockReturnValue(bytes)

		uuid({
			base: "64",
			space: base64Space,
		})

		expect(console).toHaveBeenCalledWith("g8310k61Mw92wIc3gUf")
	})

	test("base 2", ({ expect }) => {
		const bytes = new Uint8ClampedArray([1, 0])
		getRandomBytesSpy.mockReturnValue(bytes)

		uuid({
			base: "2",
			space: base64Space,
		})

		expect(console).toHaveBeenCalledWith("100000000")
	})
})
