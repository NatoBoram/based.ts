---
applyTo: src/commander/**/*
---

# Commander Instructions

CLI implementation using Commander.js for the `basedts` executable.

## Architecture

- Uses Commander.js for argument parsing and command structure
- Each command has its own file with implementation logic
- Options parsing separates string inputs from typed internal representations
- Commands output directly to `console.log` (simple stdout pattern)

## Key Files

- #file:../../src/commander/program.ts : Main program definition with all command registrations
- #file:../../src/commander/convert.ts : Base conversion command
- #file:../../src/commander/uuid.ts : UUID generation command
- #file:../../src/commander/http.ts : MCP server HTTP transport
- #file:../../src/commander/stdio.ts : MCP server stdio transport

## Command Implementation Pattern

```ts
interface CommandOptions {
	readonly option1: string
	readonly option2: string
}

interface ParsedCommandOptions {
	readonly option1: bigint
	readonly option2: string
}

export function commandName(input: string, options: CommandOptions): void {
	const parsed = parseCommandOptions(options)

	// Command logic using parsed options
	const result = processInput(input, parsed)

	console.log(result)
}

function parseCommandOptions(options: CommandOptions): ParsedCommandOptions {
	return {
		option1: BigInt(parseInt(options.option1)),
		option2: options.option2,
	}
}
```

## Command Registration Pattern

In #file:../../src/commander/program.ts :

```ts
program
	.command("command-name")
	.description("Command description")
	.argument("<input>", "Input description")
	.option("--option <value>", "Option description", "default")
	.action(commandFunction)
```

## Conventions

- **Options are always strings** from Commander.js, parse them in implementation
- **Use `console.log()` for output** (stdout), not return values
- **Default values** come from `base64Space` constant for space-related options
- **Readonly interfaces** for type safety on options and parsed options
- **Separate parsing functions** for converting string options to typed values
