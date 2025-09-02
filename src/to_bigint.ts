import type { UUID } from "node:crypto"
import { base64Space } from "./space.ts"
import { utf8ToBytes } from "./to_bytes.ts"
import type { TypedUintArray } from "./typed_array.ts"

/** Turns a `string` in a given `base` into a `bigint` by multiplying each digit
 * by the `base` raised to the power of its position in the `string`. */
export function basedToBigInt(
	based: string,
	base: bigint,
	space: string = base64Space,
): bigint {
	space = space.slice(0, Number(base))

	if (space.length < Number(base))
		throw new Error("Invalid space for this base", {
			cause: { based, base, space },
		})

	if (base <= 36) based = based.toLowerCase()
	if (based.startsWith("-")) return -basedToBigInt(based.slice(1), base, space)

	return Array.from(based).reduce<bigint>((result, digit, digitIndex) => {
		const spaceIndex = space.indexOf(digit)
		if (spaceIndex == -1)
			throw new Error("Invalid digit for this space", {
				cause: { based, base, space, result, digit, digitIndex, spaceIndex },
			})

		return (
			result +
			BigInt(spaceIndex) * base ** BigInt(based.length - 1 - digitIndex)
		)
	}, 0n)
}

/** Turns a typed `uint` array into a `bigint` by converting each `uint` into a
 * hexadecimal string then concatenating the resulting digits using JavaScript's
 * `0x` notation. */
export function bytesToBigInt(typedArray: TypedUintArray): bigint {
	const maxLength = typedArray.BYTES_PER_ELEMENT * 2
	const hexes = Array.from(typedArray).reduce(
		(hexes, value) => (
			hexes.push(value.toString(16).padStart(maxLength, "0")),
			hexes
		),
		new Array<string>(typedArray.length),
	)

	return BigInt(`0x${hexes.join("")}`)
}

export function utf8ToBigInt(value: string): bigint {
	const bytes = utf8ToBytes(value)
	return bytesToBigInt(bytes)
}

export function uuidToBigInt(uuid: UUID): bigint {
	const value = uuid.replaceAll("-", "")
	return basedToBigInt(value, 16n, base64Space)
}
