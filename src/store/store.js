import { ACCESS_TOKEN_KEY, USER_STORAGE_KEY } from '@/constansts/auth.constants'
import { StorageService } from '@/core/services/storage.service'

export class Store {
	constructor(initialState) {
		this.observers = []

		this.storageService = new StorageService()
		const savedUser = this.storageService.getItem(USER_STORAGE_KEY)

		const state = savedUser ? { user: savedUser } : initialState

		this.state = new Proxy(state, {
			set: (target, prop, value) => {
				target[prop] = value

				this.notify()
				return true
			}
		})
	}

	/**
	 * Get the singleton instance of the Store
	 *	@returns {Store} instance
	 */
	static getInstance() {
		if (!Store.instance) {
			Store.instance = new Store({ user: null })
		}
		return Store.instance
	}

	/**
	 * Adds an observer to the list of observers.
	 *
	 * @param {Object} observer - The observer object to be added.
	 * @return {void} This function does not return a value.
	 */
	addObserver(observer) {
		this.observers.push(observer)
	}

	/**
	 * Removes the specified observer from the list of observers.
	 *
	 * @param {Object} observer - the observer to be removed
	 * @return {type}
	 */
	removeObserver(observer) {
		TouchList.observers = this.observers.filter(obs => obs !== observer)
	}

	notify() {
		for (const observer of this.observers) {
			observer.update()
		}
	}

	login(user, accessToken) {
		this.state.user = user
		this.storageService.setItem(USER_STORAGE_KEY, user)
		this.storageService.setItem(ACCESS_TOKEN_KEY, accessToken)
	}

	logout() {
		this.state.user = null
		this.storageService.removeItem(USER_STORAGE_KEY)
		this.storageService.removeItem(ACCESS_TOKEN_KEY)
	}

	updateCard(card) {
		const oldUser = this.state.user
		const newUser = { ...oldUser, card }

		this.state.user = newUser
		this.storageService.setItem(USER_STORAGE_KEY, newUser)
	}
}
