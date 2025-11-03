import type { UUID } from "node:crypto"
import { describe, test } from "vitest"
import { basedToUuid, trimUuidHexes } from "./to_uuid.ts"

describe.concurrent("basedToUuid", () => {
	test("base 16", ({ expect }) => {
		const uuid: UUID = "702f8c6c-3bad-403b-b639-477de96d6732"
		const based = uuid.replaceAll("-", "")
		const result = basedToUuid(based, 16n)
		expect(result).toBe(uuid)
	})
})

describe.concurrent("trimUuidHexes", () => {
	test("exact", ({ expect }) => {
		const result = trimUuidHexes("e5a01304e24b4480b7ac441c24343a37")
		expect(result).toBe("e5a01304e24b4480b7ac441c24343a37")
	})

	test("short", ({ expect }) => {
		const result = trimUuidHexes("1")
		expect(result).toBe("00000000000000000000000000000001")
	})

	test("long", ({ expect }) => {
		const result = trimUuidHexes(
			"9cd6caba667c40ac8421a5fbc2793f7f3499c30fea9347f2bfb1f19085dc215e",
		)
		expect(result).toBe("3499c30fea9347f2bfb1f19085dc215e")
	})
})
