export default class ChildComponent {
	/**
	 * Render method must be implemented in the child class.
	 *
	 * @returns {HTMLElement}
	 */
	render() {
		throw new Error('Render method must be implemented in the child class')
	}
}
