/**
 * StorageService is a class that provides an interface for working with localStorage
 * in a more convenient and structured way.
 */
export class StorageService {
	/**
	 * Retrieves an item from localStorage by the provided key.
	 *
	 * @param {string} key - The key of the item to be retrieved.
	 * @returns {any} The value of the item, or null if the item doesn't exist.
	 */
	getItem(key) {
		const value = localStorage.getItem(key)
		return value ? JSON.parse(value) : null
	}

	/**
	 * Retrieves an item from localStorage by the provided key.
	 *
	 * @param {string} key - The key of the item to be retrieved.
	 * @returns {any} The value of the item, or null if the item doesn't exist.
	 */
	setItem(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	}

	/**
	 * Removes an item from localStorage by the provided key.
	 *
	 * @param {string} key - The key of the item to be removed.
	 */
	removeItem(key) {
		localStorage.removeItem(key)
	}

	/**
	 * Clears all data from localStorage.
	 */
	clear() {
		localStorage.clear()
	}
}
