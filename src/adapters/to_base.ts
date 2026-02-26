import type { UUID } from "node:crypto"
import { base64Space } from "../consts/space.ts"
import { bytesToBigInt, utf8ToBigInt, uuidToBigInt } from "./to_bigint.ts"
import type { TypedUintArray } from "./typed_array.ts"

/** Convert a `TypedUintArray` to a string in a given base. */
export function bytesToBase(
	bytes: TypedUintArray,
	base: bigint,
	space: string = base64Space,
): string {
	const bigInt = bytesToBigInt(bytes)
	return toBase(bigInt, base, space)
}

/** Convert a number to a string in a given base. */
export function toBase(
	value: bigint,
	base: bigint,
	space: string = base64Space,
): string {
	if (space.length < Number(base))
		throw new Error("Invalid space for this base", {
			cause: { value, base, space },
		})

	if (value < 0n) return `-${toBase(-value, base, space)}`

	let result = ""
	while (value) {
		const index = Number(value % base)
		value /= base

		const digit = space[index]
		if (digit === undefined)
			throw new Error("Invalid index", {
				cause: { value, base, space, index, result },
			})

		result = digit + result
	}

	return result
}

/** Convert a UTF-8 string to a number in a given base. */
export function utf8ToBase(
	value: string,
	base: bigint,
	space: string = base64Space,
): string {
	const bigInt = utf8ToBigInt(value)
	return toBase(bigInt, base, space)
}

/** Convert a `UUID` to a string in a given base. */
export function uuidToBase(
	uuid: UUID,
	base: bigint,
	space: string = base64Space,
): string {
	const bigInt = uuidToBigInt(uuid)
	return toBase(bigInt, base, space)
}
