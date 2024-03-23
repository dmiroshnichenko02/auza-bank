/**
 * Generates a formatted date string from the input date string.
 *
 * @param {string} dateString - The input date string to be formatted.
 * @returns {string} The formatted date string in the format 'MMM DD, YYYY'.
 */
export function formateDate(dateString) {
	const date = new Date(dateString)
	const options = { month: 'short', day: 'numeric', year: 'numeric' }
	return date.toLocaleDateString('en-US', options)
}
