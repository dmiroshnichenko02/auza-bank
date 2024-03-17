import { getTitle } from '@/config/eo.config'

export class BaseScreen {
	/**
	 * Constructor for setting the document title.
	 * @param {Object} options - The options for the BaseScreen
	 * @param {string} options.title - The title to set for the document
	 */
	constructor({ title }) {
		document.title = getTitle(title)
	}

	/**
	 * Render the child components content.
	 * @returns {HTMLElement}
	 */
	render() {
		throw new Error('Render method must be implemented in the child class')
	}
}
