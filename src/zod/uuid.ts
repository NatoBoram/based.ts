import { z } from "zod"
import { base64Space } from "../consts/space.ts"

export const uuidInputSchema = z.object({
	base: z.number().describe("The base of the UUID to generate").default(16),

	space: z
		.string()
		.describe("The space of the UUID to generate")
		.default(base64Space),
})

export const uuidOutputSchema = z.object({ uuid: z.string() })
