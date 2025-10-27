import { describe, test } from "vitest"
import { program } from "./program.ts"

describe.concurrent("program", () => {
	test("name", ({ expect }) => {
		expect(program.name()).toBe("basedts")
	})

	test("version", ({ expect }) => {
		expect(program.version()).toMatch(/^\d+\.\d+\.\d+/)
	})

	test("convert", ({ expect }) => {
		const commands = program.commands.map(cmd => cmd.name())
		expect(commands).toContain("convert")
	})

	test("uuid", ({ expect }) => {
		const commands = program.commands.map(cmd => cmd.name())
		expect(commands).toContain("uuid")
	})

	test("mcp", ({ expect }) => {
		const mcp = program.commands.find(cmd => cmd.name() === "mcp")
		expect(mcp).toBeDefined()
		if (!mcp) throw new Error("mcp command not found")

		const command = mcp.commands.map(cmd => cmd.name())
		expect(command).toContain("http")
		expect(command).toContain("stdio")
	})
})
