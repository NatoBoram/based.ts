import { toBase } from "../to_base.ts"
import { basedToBigInt } from "../to_bigint.ts"

interface ConvertOptions {
	readonly fromBase: string
	readonly fromSpace: string
	readonly toBase: string
	readonly toSpace: string
}

interface ParsedConvertOptions {
	readonly fromBase: bigint
	readonly fromSpace: string
	readonly toBase: bigint
	readonly toSpace: string
}

function parseConvertOptions(options: ConvertOptions): ParsedConvertOptions {
	const fromBase = BigInt(parseInt(options.fromBase))
	const toBase = BigInt(parseInt(options.toBase))
	const fromSpace = options.fromSpace
	const toSpace = options.toSpace

	return { fromBase, fromSpace, toBase, toSpace }
}

export function convert(input: string, options: ConvertOptions): void {
	const parsed = parseConvertOptions(options)

	const bigInt = basedToBigInt(input, parsed.fromBase, parsed.fromSpace)
	const based = toBase(bigInt, parsed.toBase, parsed.toSpace)

	console.log(based)
}
