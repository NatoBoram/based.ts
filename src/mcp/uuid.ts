import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js"
import type { z } from "zod"
import { getRandomBytes } from "../bytes.ts"
import { bytesToBase } from "../to_base.ts"
import type { uuidInputSchema, uuidOutputSchema } from "../zod/uuid.ts"

type Callback = ToolCallback<typeof uuidInputSchema.shape>

export const uuid: Callback = (({ base, space }) => {
	const bytes = getRandomBytes(16)
	const based = bytesToBase(bytes, BigInt(base), space)

	const output: z.infer<typeof uuidOutputSchema> = { uuid: based }

	return {
		content: [{ type: "text", text: JSON.stringify(output) }],
		structuredContent: output,
	}
}) satisfies Callback
