import type { z, ZodDefault, ZodNumber, ZodRawShape, ZodString } from "zod/v3"
import { number, object, string } from "zod/v3"
import { base64Space } from "../consts/space.ts"
import type { ObjectType } from "./object_type.ts"

export type UuidInput = z.infer<typeof uuidInputSchema>
export type UuidOutput = z.infer<typeof uuidOutputSchema>

interface UuidInputRawShape extends ZodRawShape {
	readonly base: ZodDefault<ZodNumber>
	readonly space: ZodDefault<ZodString>
}

interface UuidOutputRawShape extends ZodRawShape {
	readonly uuid: ZodString
}

export const uuidInputSchema: ObjectType<UuidInputRawShape> = object({
	base: number().describe("The base of the UUID to generate").default(16),

	space: string()
		.describe("The space of the UUID to generate")
		.default(base64Space),
})
export const uuidInputShape: UuidInputRawShape = uuidInputSchema.shape
export const uuidOutputSchema: ObjectType<UuidOutputRawShape> = object({
	uuid: string(),
})
export const uuidOutputShape: UuidOutputRawShape = uuidOutputSchema.shape
