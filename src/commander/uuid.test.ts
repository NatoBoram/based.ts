import { afterAll, afterEach, describe, test, vi } from "vitest"
import * as bytesModule from "../bytes.ts"
import { base64Space } from "../consts/space.ts"
import { uuid } from "./uuid.ts"

describe("uuid", () => {
	const console = vi.spyOn(globalThis.console, "log")
	const getRandomBytes = vi.spyOn(bytesModule, "getRandomBytes")

	afterEach(() => vi.clearAllMocks())
	afterAll(() => vi.restoreAllMocks())

	test("base 16", ({ expect }) => {
		const bytes = new Uint8ClampedArray(16).fill(255)
		getRandomBytes.mockReturnValue(bytes)

		uuid({ base: "16", space: base64Space })

		expect(getRandomBytes).toHaveBeenCalledOnce()
		expect(getRandomBytes).toHaveBeenCalledWith(16)

		expect(console).toHaveBeenCalledOnce()
		expect(console).toHaveBeenCalledWith("ffffffffffffffffffffffffffffffff")
	})

	test("base 64", ({ expect }) => {
		const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
		const bytes = new Uint8ClampedArray(array)
		getRandomBytes.mockReturnValue(bytes)

		uuid({ base: "64", space: base64Space })

		expect(getRandomBytes).toHaveBeenCalledOnce()
		expect(getRandomBytes).toHaveBeenCalledWith(16)

		expect(console).toHaveBeenCalledOnce()
		expect(console).toHaveBeenCalledWith("g8310k61Mw92wIc3gUf")
	})

	test("base 2", ({ expect }) => {
		const bytes = new Uint8ClampedArray([1, 0])
		getRandomBytes.mockReturnValue(bytes)

		uuid({ base: "2", space: base64Space })

		expect(getRandomBytes).toHaveBeenCalledOnce()
		expect(getRandomBytes).toHaveBeenCalledWith(16)

		expect(console).toHaveBeenCalledOnce()
		expect(console).toHaveBeenCalledWith("100000000")
	})
})
