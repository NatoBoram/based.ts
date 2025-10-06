import { z } from "zod"
import { base64Space } from "../space.ts"

export const uuidInputSchema: z.ZodObject<{
base: z.ZodDefault<z.ZodBigInt>
space: z.ZodDefault<z.ZodString>
},"strip",z.ZodTypeAny,{
base: bigint
space: string
},{
base?: bigint|undefined
space?: string|undefined
}> = z.object({
	base: z.bigint().describe("The base of the UUID to generate").default(16n),
	space: z
		.string()
		.describe("The space of the UUID to generate")
		.default(base64Space),
})

export const uuidOutputSchema: z.ZodObject<{
uuid: z.ZodString
},"strip",z.ZodTypeAny,{
uuid: string
},{
uuid: string
}> = z.object({
	uuid: z.string(),
})
