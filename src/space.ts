/** Default number space for this package. It should match `Number.toString` for
 * the first 36 characters. The rest is filled with the uppercase alphabet then
 * the standard, most common base64 letters, `+` and `/`. */
export const base64Space =
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/"
