import { z } from "zod"
import { base64Space } from "../consts/space.ts"

export const convertInputSchema: z.ZodObject<
	{
		number: z.ZodString
		fromBase: z.ZodDefault<z.ZodNumber>
		fromSpace: z.ZodDefault<z.ZodString>
		toBase: z.ZodDefault<z.ZodNumber>
		toSpace: z.ZodDefault<z.ZodString>
	},
	z.core.$strip
> = z.object({
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

export const convertOutputSchema: z.ZodObject<
	{
		converted: z.ZodString
	},
	z.core.$strip
> = z.object({ converted: z.string() })
