import type { UUID } from "node:crypto"
import { base64Space } from "./space.ts"
import { toBase } from "./to_base.ts"
import { basedToBigInt, bytesToBigInt } from "./to_bigint.ts"

export function basedToUuid(
	based: string,
	base: bigint,
	space: string = base64Space,
): UUID {
	const bigInt = basedToBigInt(based, base, space)
	return bigIntToUuid(bigInt)
}

function trimUuid(hexes: string): string {
	if (hexes.length < 32) return hexes.padStart(32, "0")
	if (hexes.length > 32) hexes.slice(hexes.length - 32, hexes.length)
	return hexes
}

function isUuid(uuid: string): uuid is UUID {
	const regex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

	return regex.test(uuid)
}

export function bigIntToUuid(bigInt: bigint): UUID {
	const base16 = toBase(bigInt, 16n)
	const hexes = trimUuid(base16)

	const uuid = [
		hexes.slice(0, 8),
		hexes.slice(8, 12),
		hexes.slice(12, 16),
		hexes.slice(16, 20),
		hexes.slice(20, 32),
	].join("-")

	if (!isUuid(uuid))
		throw new Error("Invalid UUID", { cause: { base16, bigInt, hexes, uuid } })

	return uuid
}

export function bytesToUuid(bytes: Uint8Array): UUID {
	const bigInt = bytesToBigInt(bytes)
	return bigIntToUuid(bigInt)
}
