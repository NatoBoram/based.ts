import { z } from "zod/v3"
import { base64Space } from "../consts/space.ts"

export type UuidInput = z.infer<typeof uuidInputSchema>
export type UuidOutput = z.infer<typeof uuidOutputSchema>

export const uuidInputSchema = z.object({
	base: z.number().describe("The base of the UUID to generate").default(16),

	space: z
		.string()
		.describe("The space of the UUID to generate")
		.default(base64Space),
})
export const uuidInputShape = uuidInputSchema.shape

export const uuidOutputSchema = z.object({ uuid: z.string() })
export const uuidOutputShape = uuidOutputSchema.shape
