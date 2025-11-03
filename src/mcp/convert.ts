import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js"
import { toBase } from "../adapters/to_base.ts"
import { basedToBigInt } from "../adapters/to_bigint.ts"
import type { convertInputSchema, ConvertOutput } from "../zod/convert.ts"

type Callback = ToolCallback<typeof convertInputSchema.shape>

export const convert: Callback = (parsed => {
	const bigInt = basedToBigInt(
		parsed.number,
		BigInt(parsed.fromBase),
		parsed.fromSpace,
	)
	const based = toBase(bigInt, BigInt(parsed.toBase), parsed.toSpace)

	const output: ConvertOutput = { converted: based }
	return {
		content: [{ type: "text", text: JSON.stringify(output) }],
		structuredContent: output,
	}
}) satisfies Callback
