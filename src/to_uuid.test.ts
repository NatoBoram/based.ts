import type { UUID } from "node:crypto"
import { describe, test } from "vitest"
import { basedToUuid } from "./to_uuid.ts"

describe("basedToUuid", () => {
	test("base 16", ({ expect }) => {
		const uuid: UUID = "702f8c6c-3bad-403b-b639-477de96d6732"
		const based = uuid.replaceAll("-", "")
		const result = basedToUuid(based, 16n)
		expect(result).toBe(uuid)
	})
})
