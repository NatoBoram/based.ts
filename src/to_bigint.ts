import { base64Space } from "./space.js"
import type { TypedUintArray } from "./typed_array.js"

/** Turns a `string` in a given `base` into a `bigint` by multiplying each digit
 * by the `base` raised to the power of its position in the `string`. */
export function basedToBigInt(
	based: string,
	base: bigint,
	space = base64Space,
): bigint {
	if (space.length < Number(base))
		throw new Error("Invalid space for this base", {
			cause: { based, base, space },
		})

	if (base <= 36) based = based.toLowerCase()
	if (based.startsWith("-")) return -basedToBigInt(based.slice(1), base, space)

	return Array.from(based).reduce<bigint>((result, digit, index) => {
		return (
			result +
			BigInt(space.indexOf(digit)) * base ** BigInt(based.length - 1 - index)
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
			hexes.push(value.toString(16).padStart(maxLength, "0")), hexes
		),
		new Array<string>(typedArray.length),
	)

	return BigInt(`0x${hexes.join("")}`)
}
