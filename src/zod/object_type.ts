import type { object, ZodRawShape } from "zod"

export type ObjectType<Shape extends ZodRawShape> = ReturnType<
	typeof object<Shape>
>
