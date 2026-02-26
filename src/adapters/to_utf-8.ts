import { base64Space } from "../consts/space.ts"
import { basedToBytes, bigIntToBytes } from "./to_bytes.ts"
import type { TypedUintArray } from "./typed_array.ts"

/** Turns a `string` in a given base into a UTF-8 `string`. */
export function basedToUtf8(
	based: string,
	base: bigint,
	space: string = base64Space,
): string {
	const bytes = basedToBytes(based, base, space)
	const decoder = new TextDecoder()
	return decoder.decode(bytes)
}

/** Convert a `bigint` to a UTF-8 `string`. */
export function bigIntToUtf8(bigInt: bigint): string {
	const bytes = bigIntToBytes(bigInt)
	const decoder = new TextDecoder()
	return decoder.decode(bytes)
}

/** Decode a `TypedUintArray` into a UTF-8 `string`. */
export function bytesToUtf8(bytes: TypedUintArray): string {
	const decoder = new TextDecoder()
	return decoder.decode(bytes)
}
