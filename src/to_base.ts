import { base64Space } from "./space.js"

/** Convert a number to a string in a given base. */
export function toBase(
	value: bigint,
	base: bigint,
	space = base64Space,
): string {
	if (space.length < Number(base))
		throw new Error("Invalid space for this base", {
			cause: { value, base, space },
		})

	if (value < 0n) return `-${toBase(-value, base, space)}`

	let result = ""
	while (value) {
		const digit = Number(value % base)
		value /= base
		result = space[digit] + result
	}

	return result
}
