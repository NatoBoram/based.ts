import type { UUID } from "node:crypto"
import { base64Space } from "../consts/space.ts"
import { basedToBigInt } from "./to_bigint.ts"

/** Turns a `string` in a given base into a `Uint8ClampedArray`. */
export function basedToBytes(
	based: string,
	base: bigint,
	space: string = base64Space,
): Uint8ClampedArray {
	const bigInt = basedToBigInt(based, base, space)
	return bigIntToBytes(bigInt)
}

/** Turns a `bigint` into a `Uint8ClampedArray` by converting it to a
 * hexadecimal string then turning each digit into a pair of bytes. */
export function bigIntToBytes(bigInt: bigint): Uint8ClampedArray {
	let hexes = bigInt.toString(16)
	if (hexes.length % 2) hexes = `0${hexes}`

	const length = hexes.length / 2
	const bytes = new Uint8ClampedArray(length)

	for (let index = 0; index < length; index++) {
		const hex = hexes.slice(index * 2, index * 2 + 2)
		bytes[index] = parseInt(hex, 16)
	}

	return bytes
}

/** Encode a UTF-8 `string` into a `Uint8Array`. */
export function utf8ToBytes(value: string): Uint8Array {
	const encoder = new TextEncoder()
	return encoder.encode(value)
}

/** Convert a `UUID` to a `Uint8ClampedArray`. */
export function uuidToBytes(uuid: UUID): Uint8ClampedArray {
	const value = uuid.replaceAll("-", "")
	return basedToBytes(value, 16n, base64Space)
}
