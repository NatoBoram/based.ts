import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js"
import { getRandomBytes } from "../adapters/bytes.ts"
import { bytesToBase } from "../adapters/to_base.ts"
import type { uuidInputShape, UuidOutput } from "../zod/uuid.ts"

type Callback = ToolCallback<typeof uuidInputShape>

export const uuid: Callback = (({ base, space }) => {
	const bytes = getRandomBytes(16)
	const based = bytesToBase(bytes, BigInt(base), space)

	const output: UuidOutput = { uuid: based }

	return {
		content: [{ type: "text", text: JSON.stringify(output) }],
		structuredContent: output,
	}
}) satisfies Callback
