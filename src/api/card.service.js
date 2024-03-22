import { auzaQuery } from '@/core/auza-query/auza-query.lib'
import { NotificationService } from '@/core/services/notification.service'
import { Store } from '@/store/store'

export class CardService {
	#BASE_URL = '/cards'

	constructor() {
		// store
		this.store = Store.getInstance()

		this.notificationService = new NotificationService()
	}

	byUser(onSuccess) {
		return auzaQuery({
			path: `${this.#BASE_URL}/by-user`,
			onSuccess
		})
	}

	/**
	 * A description of the entire function.
	 *
	 * @param {number} amount - The amount to be added or withdrawn from the user's balance
	 * @param {'top-up' | 'withdrawal'} type - The type of the transaction, either 'top-up' or 'withdrawal'
	 * @param {function} onSuccess - The callback function to be executed when the balance update is successful.
	 * @return {Promise} - A promise object that resolves to the response from the API.
	 */
	updateBalance(amount, type, onSuccess) {
		return auzaQuery({
			path: `${this.#BASE_URL}/balance/${type}`,
			method: 'PATCH',
			body: { amount: +amount },
			onSuccess: () => {
				this.notificationService.show('success', 'Balance change successfully')
				onSuccess()
			}
		})
	}

	/**
	 * Transfer money between two card numbers.
	 * @function
	 * @param {object} body - transfer detail
	 * @param {number} body.amount - amount to transfer
	 * @param {number} body.toCardNumber - The recipient's card number
	 * @param {function} onSuccess - callback function to execute on success
	 *
	 * @returns {Promise} - A promise that resolves with the AuzaQuery response
	 */
	transfer({ amount, toCardNumber }, onSuccess) {
		return auzaQuery({
			path: `${this.#BASE_URL}/transfer-money`,
			method: 'PATCH',
			body: {
				amount: +amount,
				fromCardNumber: this.store.card.number,
				toCardNumber
			},
			onSuccess: () => {
				this.notificationService.show('success', 'Transfer successfully')
				onSuccess()
			}
		})
	}
}
