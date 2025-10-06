import { z } from "zod"
import { base64Space } from "../space.ts"

export const convertInputSchema: z.ZodObject<{
number: z.ZodString
fromBase: z.ZodDefault<z.ZodBigInt>
fromSpace: z.ZodDefault<z.ZodString>
toBase: z.ZodDefault<z.ZodBigInt>
toSpace: z.ZodDefault<z.ZodString>
},"strip",z.ZodTypeAny,{
number: string
fromBase: bigint
fromSpace: string
toBase: bigint
toSpace: string
},{
number: string
fromBase?: bigint|undefined
fromSpace?: string|undefined
toBase?: bigint|undefined
toSpace?: string|undefined
}> = z.object({
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

export const convertOutputSchema: z.ZodObject<{
result: z.ZodString
},"strip",z.ZodTypeAny,{
result: string
},{
result: string
}> = z.object({
	result: z.string(),
})
