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
