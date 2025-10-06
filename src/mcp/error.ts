/**
 * Converts a non-error into an error or supplements the cause of an error
 * without overriding the original cause.
 *
 * @example
 * const error = await access(absPath).catch(toError("Couldn't access a file"))
 */
export function toError(
	message: string,
	cause?: Record<string, unknown>,
): (error: unknown) => Error {
	return (error: unknown): Error => {
		// Non-errors are converted to errors
		if (!(error instanceof Error))
			return new Error(message, { cause: { ...cause, error } })

		// Anonymous objects can be augmented with additional properties
		if (error.cause?.constructor === Object) {
			error.cause = { ...cause, ...error.cause }
			return error
		}

		// Falsy values don't matter
		if (!error.cause) {
			error.cause = cause
			return error
		}

		// If the cause is already set and has a brittle type, then let's just leave
		// it at that.
		return error
	}
}
