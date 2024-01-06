export function stringToBits(str: string) {
	return new TextEncoder().encode(str)
}

export function get128Bits() {
	const bytes = new Uint8ClampedArray(16)
	crypto.getRandomValues(bytes)
	return bytes
}

export function bytesToBigInt(bytes: Uint8ClampedArray) {
	const hexes = bytes.reduce((hexes, byte) => {
		/** A single hexadecimal number. Because the byte is 8 bits, the hex ranges
		 * from `00` to `FF`. */
		const hex = byte.toString(16).padStart(2, "0")

		hexes.push(hex)
		return hexes
	}, new Array<string>(16))

	return BigInt(`0x${hexes.join("")}`)
}

export function bigIntToBytes(bn: bigint) {
	let hexes = bn.toString(16)
	if (hexes.length % 2) hexes = `0${hexes}`

	const length = hexes.length / 2
	const bytes = new Uint8ClampedArray(length)

	for (let index = 0; index < length; index++) {
		const hex = hexes.slice(index * 2, index * 2 + 2)
		bytes[index] = parseInt(hex, 16)
	}

	return bytes
}

export function bigIntToBase36(bigInt: bigint) {
	return bigInt.toString(36)
}

export function base36ToBigInt(base36: string) {
	return Array.from(base36).reduce(
		(bigInt, digit) => bigInt * 36n + BigInt(parseInt(digit, 36)),
		0n,
	)
}

export function base36Uuid() {
	const bytes = get128Bits()
	const bigInt = bytesToBigInt(bytes)
	const base36 = bigIntToBase36(bigInt)
	return base36
}
