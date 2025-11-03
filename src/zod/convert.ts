import type { ZodDefault, ZodNumber, ZodRawShape, ZodString, z } from "zod/v3"
import { number, object, string } from "zod/v3"
import { base64Space } from "../consts/space.ts"
import type { ObjectType } from "./object_type.ts"

export type ConvertInput = z.infer<typeof convertInputSchema>
export type ConvertOutput = z.infer<typeof convertOutputSchema>

interface ConvertInputRawShape extends ZodRawShape {
	readonly fromBase: ZodDefault<ZodNumber>
	readonly fromSpace: ZodDefault<ZodString>
	readonly number: ZodString
	readonly toBase: ZodDefault<ZodNumber>
	readonly toSpace: ZodDefault<ZodString>
}

interface ConvertOutputRawShape extends ZodRawShape {
	readonly converted: ZodString
}

export const convertInputSchema: ObjectType<ConvertInputRawShape> = object({
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
export const convertInputShape: ConvertInputRawShape = convertInputSchema.shape
export const convertOutputSchema: ObjectType<ConvertOutputRawShape> = object({
	converted: string(),
})
export const convertOutputShape: ConvertOutputRawShape =
	convertOutputSchema.shape
