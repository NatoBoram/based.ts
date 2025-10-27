import { afterAll, afterEach, describe, test, vi } from "vitest"
import { base64Space } from "../consts/space.ts"
import { convert } from "./convert.ts"

describe("convert", () => {
	const console = vi.spyOn(globalThis.console, "log")

	afterEach(() => console.mockClear())

	afterAll(() => {
		vi.restoreAllMocks()
	})

	test("binary to decimal", ({ expect }) => {
		convert("1010", {
			fromBase: "2",
			fromSpace: base64Space,
			toBase: "10",
			toSpace: base64Space,
		})
		expect(console).toHaveBeenCalledWith("10")
	})

	test("decimal to hexadecimal", ({ expect }) => {
		convert("255", {
			fromBase: "10",
			fromSpace: base64Space,
			toBase: "16",
			toSpace: base64Space,
		})
		expect(console).toHaveBeenCalledWith("ff")
	})

	test("hexadecimal to binary", ({ expect }) => {
		convert("f", {
			fromBase: "16",
			fromSpace: base64Space,
			toBase: "2",
			toSpace: base64Space,
		})
		expect(console).toHaveBeenCalledWith("1111")
	})

	test("decimal to base62", ({ expect }) => {
		convert("12345", {
			fromBase: "10",
			fromSpace: base64Space,
			toBase: "62",
			toSpace: base64Space,
		})
		expect(console).toHaveBeenCalledWith("3d7")
	})
})
