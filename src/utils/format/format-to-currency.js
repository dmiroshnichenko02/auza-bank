/**
 * Formats a number to a currency string.
 *
 * @param {number} number - The number to be formatted to currency.
 * @return {string} The currency string representation of the input number.
 */
export function formatToCurrency(number) {
	return new Intl.NumberFormat('en-US', {
		currency: 'UAH',
		style: 'currency'
	}).format(number)
}
