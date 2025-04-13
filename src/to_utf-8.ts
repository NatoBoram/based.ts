import { base64Space } from "./space.js"
import { basedToBytes, bigIntToBytes } from "./to_bytes.js"
import type { TypedUintArray } from "./typed_array.js"

export function basedToUtf8(
	based: string,
	base: bigint,
	space: string = base64Space,
): string {
	const bytes = basedToBytes(based, base, space)
	const decoder = new TextDecoder()
	return decoder.decode(bytes)
}

export function bigIntToUtf8(bigInt: bigint): string {
	const bytes = bigIntToBytes(bigInt)
	const decoder = new TextDecoder()
	return decoder.decode(bytes)
}

export function bytesToUtf8(bytes: TypedUintArray): string {
	const decoder = new TextDecoder()
	return decoder.decode(bytes)
}
