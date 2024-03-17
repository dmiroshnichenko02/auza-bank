/**
 * Represents the AuzaQuery class for working with DOM elements.
 */
class AuzaQuery {
	/**
	 * Creates an instance of AuzaQuery.
	 * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement
	 */
	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector)
			if (!this.element) {
				throw new Error(`Element ${selector} not found`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			throw new Error('Invalid selector type')
		}
	}
	/**
	 * Finds the first element that matches the specified selector within the current element.
	 *
	 * @param {string} selector - The CSS selector to match against.
	 * @return {AuzaQuery} The AuzaQuery object representing the first matched element.
	 */
	find(selector) {
		const element = new AuzaQuery(this.element.querySelector(selector))

		if (element) {
			return element
		} else {
			throw new Error(`Element ${selector} not found`)
		}
	}

	/**
	 * Set the CSS style of the selected element.
	 * @param {string} property - The CSS property to set.
	 * @param {string} value - The value to set for the CSS property.
	 * @returns {AuzaQuery} - The current AuzaQuery instance for chaining.
	 */
	css(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error('Property and value must be strings')
		}

		this.element.style[property] = value
		return this
	}
}

/**
 * Creates a new AuzaQuery object based on the provided selector.
 * @param {string|HTMLElement} selector - TA CSS selector string or an HTMLElement.
 * @return {AuzaQuery} A new AuzaQuery instance for the given selector.
 */
export function $A(selector) {
	return new AuzaQuery(selector)
}
