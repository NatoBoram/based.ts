import { base64Space } from "./space.ts"
import { toBase, utf8ToBase } from "./to_base.ts"
import { basedToBigInt } from "./to_bigint.ts"
import { basedToUtf8 } from "./to_utf-8.ts"

/** Base-encoded string. Use this class if you convert from and to different
 * bases often. Otherwise, just use the provided utilities. You can provide a custom number's space */
export class Based {
	readonly value: string
	readonly base: bigint
	readonly space: string

	constructor(value: string, base: bigint, space: string = base64Space) {
		this.value = value
		this.base = base
		this.space = space
	}

	static fromUtf8(
		value: string,
		base = 10n,
		space: string = base64Space,
	): Based {
		const based = utf8ToBase(value, base, space)
		return new Based(based, base, space)
	}

	toUtf8(): string {
		return basedToUtf8(this.value, this.base, this.space)
	}

	divide(based: Based): Based {
		const dividend = basedToBigInt(this.value, this.base, this.space)
		const divisor = basedToBigInt(based.value, based.base, based.space)
		const quotient = dividend / divisor
		return new Based(toBase(quotient, this.base, this.space), this.base)
	}

	minus(based: Based): Based {
		const minuend = basedToBigInt(this.value, this.base, this.space)
		const subtrahend = basedToBigInt(based.value, based.base, based.space)
		const difference = minuend - subtrahend
		return new Based(toBase(difference, this.base, this.space), this.base)
	}

	multiply(based: Based): Based {
		const multiplier = basedToBigInt(this.value, this.base, this.space)
		const multiplicand = basedToBigInt(based.value, based.base, based.space)
		const product = multiplier * multiplicand
		return new Based(toBase(product, this.base, this.space), this.base)
	}

	plus(based: Based): Based {
		const augend = basedToBigInt(this.value, this.base, this.space)
		const addend = basedToBigInt(based.value, based.base, based.space)
		const sum = augend + addend
		return new Based(toBase(sum, this.base, this.space), this.base)
	}

	to(base: bigint, space?: string): Based {
		const bigInt = basedToBigInt(this.value, this.base, this.space)
		const value = toBase(bigInt, base, space)
		return new Based(value, base, space)
	}
}
