import type { Command } from "commander"
import { createCommand } from "commander"
import pkg from "../../package.json" with { type: "json" }
import { base64Space } from "../space.js"
import { convert } from "./convert.js"
import { uuid } from "./uuid.js"

const { bin, version, description } = pkg

const name = Object.keys(bin).find(Boolean)
if (!name) {
	throw new Error("No executable name found in package.json")
}

export const program: Command = createCommand()
program.name(name).description(description).version(version)

program
	.command("convert")
	.description(
		"Convert a number from a base in a space to another base in another space",
	)
	.argument("<number>", "The number to convert")
	.option("--from-base <base>", "The base of the number", "10")
	.option(
		"--from-space <space>",
		"The space of the number to convert from",
		base64Space,
	)
	.option("--to-base <base>", "The base to convert to", "10")
	.option(
		"--to-space <space>",
		"The space to convert the number to",
		base64Space,
	)
	.action(convert)

program
	.command("uuid")
	.description(
		"Generate a UUID in a different base with a different space than normal UUIDs",
	)
	.option("--base <base>", "The base of the UUID to generate", "16")
	.option("--space <space>", "The space of the UUID to generate", base64Space)
	.action(uuid)
