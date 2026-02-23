import type { ZodDefault, ZodNumber, ZodString, z } from "zod"
import { number, object, string } from "zod"
import { base64Space } from "../consts/space.ts"
import type { ObjectType } from "./object_type.ts"

export type ConvertInput = z.infer<typeof convertInputSchema>
export type ConvertOutput = z.infer<typeof convertOutputSchema>

type ConvertInputObjectType = ObjectType<{
	number: ZodString
	fromBase: ZodDefault<ZodNumber>
	fromSpace: ZodDefault<ZodString>
	toBase: ZodDefault<ZodNumber>
	toSpace: ZodDefault<ZodString>
}>

type ConvertOutputObjectType = ObjectType<{ converted: ZodString }>

export const convertInputSchema: ConvertInputObjectType = object({
	number: string().describe("The number to convert"),

	fromBase: number().describe("The base of the number").default(10),

	fromSpace: string()
		.describe("The space of the number to convert from")
		.default(base64Space),

	toBase: number().describe("The base to convert to").default(10),

	toSpace: string()
		.describe("The space to convert the number to")
		.default(base64Space),
})

export const convertOutputSchema: ConvertOutputObjectType = object({
	converted: string(),
})
