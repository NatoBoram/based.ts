import { z } from "zod/v3"
import { base64Space } from "../consts/space.ts"

export type ConvertInput = z.infer<typeof convertInputSchema>
export type ConvertOutput = z.infer<typeof convertOutputSchema>

export const convertInputSchema = z.object({
	number: z.string().describe("The number to convert"),

	fromBase: z.number().describe("The base of the number").default(10),

	fromSpace: z
		.string()
		.describe("The space of the number to convert from")
		.default(base64Space),

	toBase: z.number().describe("The base to convert to").default(10),

	toSpace: z
		.string()
		.describe("The space to convert the number to")
		.default(base64Space),
})
export const convertInputShape = convertInputSchema.shape

export const convertOutputSchema = z.object({ converted: z.string() })
export const convertOutputShape = convertOutputSchema.shape
