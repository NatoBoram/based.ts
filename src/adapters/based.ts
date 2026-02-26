import type { UUID } from "node:crypto"
import { base64Space } from "../consts/space.ts"
import { toBase, utf8ToBase, uuidToBase } from "./to_base.ts"
import { basedToBigInt } from "./to_bigint.ts"
import { basedToUtf8 } from "./to_utf-8.ts"
import { basedToUuid } from "./to_uuid.ts"

/** Base-encoded string. Use this class if you convert from and to different
 * bases often. Otherwise, just use the provided utilities. You can provide a
 * custom number's space */
export class Based {
	readonly base: bigint
	readonly space: string
	readonly value: string

	constructor(value: string, base: bigint, space: string = base64Space) {
		this.value = value
		this.base = base
		this.space = space
	}

	/** Create a `Based` from a UTF-8 `string`. */
	static fromUtf8(
		value: string,
		base = 10n,
		space: string = base64Space,
	): Based {
		const based = utf8ToBase(value, base, space)
		return new Based(based, base, space)
	}

	/** Create a `Based` from a `UUID`. */
	static fromUuid(uuid: UUID, base = 16n, space: string = base64Space): Based {
		const based = uuidToBase(uuid, base, space)
		return new Based(based, base, space)
	}

	/** Divide this `Based` by another `Based`. */
	divide(based: Based): Based {
		const dividend = basedToBigInt(this.value, this.base, this.space)
		const divisor = basedToBigInt(based.value, based.base, based.space)

		if (divisor === 0n)
			throw new RangeError("Based division by zero", {
				cause: { based, dividend, divisor, this: this },
			})

		const quotient = dividend / divisor
		return new Based(
			toBase(quotient, this.base, this.space),
			this.base,
			this.space,
		)
	}

	/** Subtract another `Based` from this `Based`. */
	minus(based: Based): Based {
		const minuend = basedToBigInt(this.value, this.base, this.space)
		const subtrahend = basedToBigInt(based.value, based.base, based.space)
		const difference = minuend - subtrahend
		return new Based(
			toBase(difference, this.base, this.space),
			this.base,
			this.space,
		)
	}

	/** Multiply this `Based` by another `Based`. */
	multiply(based: Based): Based {
		const multiplier = basedToBigInt(this.value, this.base, this.space)
		const multiplicand = basedToBigInt(based.value, based.base, based.space)
		const product = multiplier * multiplicand
		return new Based(
			toBase(product, this.base, this.space),
			this.base,
			this.space,
		)
	}

	/** Add another `Based` to this `Based`. */
	plus(based: Based): Based {
		const augend = basedToBigInt(this.value, this.base, this.space)
		const addend = basedToBigInt(based.value, based.base, based.space)
		const sum = augend + addend
		return new Based(toBase(sum, this.base, this.space), this.base, this.space)
	}

	/** Convert this `Based` to a different base. */
	to(base: bigint, space: string = this.space): Based {
		const bigInt = basedToBigInt(this.value, this.base, this.space)
		const value = toBase(bigInt, base, space)
		return new Based(value, base, space)
	}

	/** Convert this `Based` to a JSON object. */
	toJSON() {
		return { base: this.base.toString(), space: this.space, value: this.value }
	}

	/** Convert this `Based` to a JSON string. */
	toString() {
		return JSON.stringify(this)
	}

	/** Convert this `Based` to a UTF-8 `string`. */
	toUtf8(): string {
		return basedToUtf8(this.value, this.base, this.space)
	}

	/** Convert this `Based` to a `UUID`. */
	toUuid(): UUID {
		return basedToUuid(this.value, this.base, this.space)
	}
}
