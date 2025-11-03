import { getRandomBytes } from "../adapters/bytes.ts"
import { bytesToBase } from "../adapters/to_base.ts"

interface ParsedUuidOptions {
	readonly base: bigint
	readonly space: string
}

interface UuidOptions {
	readonly base: string
	readonly space: string
}

function parseUuidOptions(options: UuidOptions): ParsedUuidOptions {
	const base = BigInt(parseInt(options.base))
	const space = options.space
	return { base, space }
}

export function uuid(options: UuidOptions): void {
	const parsed = parseUuidOptions(options)

	const bytes = getRandomBytes(16)
	const based = bytesToBase(bytes, parsed.base, parsed.space)

	console.log(based)
}
