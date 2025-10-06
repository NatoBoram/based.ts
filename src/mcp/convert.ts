import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js"
import type { z } from "zod"
import { toBase } from "../to_base.ts"
import { basedToBigInt } from "../to_bigint.ts"
import type { convertInputSchema, convertOutputSchema } from "../zod/convert.ts"

type Callback = ToolCallback<typeof convertInputSchema.shape>

export const convert: Callback = (parsed => {
	const bigInt = basedToBigInt(parsed.number, parsed.fromBase, parsed.fromSpace)
	const based = toBase(bigInt, parsed.toBase, parsed.toSpace)

	const output: z.infer<typeof convertOutputSchema> = { result: based }
	return {
		content: [{ type: "text", text: JSON.stringify(output) }],
		structuredContent: output,
	}
}) satisfies Callback
