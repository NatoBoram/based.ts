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

export function convert(input: string, options: ConvertOptions): void {
	const parsed = parseConvertOptions(options)

	const bigInt = basedToBigInt(input, parsed.fromBase, parsed.fromSpace)
	const based = toBase(bigInt, parsed.toBase, parsed.toSpace)

	console.log(based)
}

function parseConvertOptions(options: ConvertOptions): ParsedConvertOptions {
	return {
		fromBase: BigInt(parseInt(options.fromBase)),
		fromSpace: options.fromSpace,
		toBase: BigInt(parseInt(options.toBase)),
		toSpace: options.toSpace,
	}
}
