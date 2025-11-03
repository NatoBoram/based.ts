import { base64Space } from "../consts/space.ts"
import { basedToBytes, bigIntToBytes } from "./to_bytes.ts"
import type { TypedUintArray } from "./typed_array.ts"

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
