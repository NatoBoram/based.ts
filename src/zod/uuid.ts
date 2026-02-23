import type { z, ZodDefault, ZodNumber, ZodString } from "zod"
import { number, object, string } from "zod"
import { base64Space } from "../consts/space.ts"
import type { ObjectType } from "./object_type.ts"

export type UuidInput = z.infer<typeof uuidInputSchema>
export type UuidOutput = z.infer<typeof uuidOutputSchema>

type UuidInputObjectType = ObjectType<{
	base: ZodDefault<ZodNumber>
	space: ZodDefault<ZodString>
}>

export const uuidInputSchema: UuidInputObjectType = object({
	base: number().describe("The base of the UUID to generate").default(16),

	space: string()
		.describe("The space of the UUID to generate")
		.default(base64Space),
})

type UuidOutputObjectType = ObjectType<{ uuid: ZodString }>

export const uuidOutputSchema: UuidOutputObjectType = object({ uuid: string() })
