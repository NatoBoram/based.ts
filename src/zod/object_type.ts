import type { object, ZodRawShape } from "zod/v3"

export type ObjectType<Shape extends ZodRawShape> = ReturnType<
	typeof object<Shape>
>
