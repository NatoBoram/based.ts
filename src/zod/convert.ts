import { z } from "zod"
import { base64Space } from "../space.ts"

export const convertInputSchema = z.object({
	number: z.string().describe("The number to convert"),

	fromBase: z.bigint().describe("The base of the number").default(10n),
	fromSpace: z
		.string()
		.describe("The space of the number to convert from")
		.default(base64Space),

	toBase: z.bigint().describe("The base to convert to").default(10n),
	toSpace: z
		.string()
		.describe("The space to convert the number to")
		.default(base64Space),
})

export const convertOutputSchema = z.object({
	result: z.string(),
})
