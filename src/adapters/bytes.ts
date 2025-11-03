/** Get a randomized selection of bytes from `crypto`. By default, get 128 bits,
 * a UUID's worth of bytes. */
export function getRandomBytes(length = 16): Uint8ClampedArray {
	const bytes = new Uint8ClampedArray(length)
	crypto.getRandomValues(bytes)
	return bytes
}
