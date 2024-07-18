import { base64Space } from "./space.js"
import { toBase } from "./to_base.js"
import { basedToBigInt } from "./to_bigint.js"

/** Base-encoded string. Use this class if you convert from and to different
 * bases often. Otherwise, just use the provided utilities. You can provide a custom number's space */
export class Based {
	constructor(
		readonly value: string,
		readonly base: bigint,
		readonly space: string = base64Space,
	) {}

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
