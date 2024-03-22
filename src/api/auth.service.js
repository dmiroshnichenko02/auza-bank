import { auzaQuery } from '@/core/auza-query/auza-query.lib'
import { NotificationService } from '@/core/services/notification.service'
import { Store } from '@/store/store'

export class AuthService {
	#BASE_URL = '/auth'

	constructor() {
		// store

		this.store = Store.getInstance()

		this.notificationService = new NotificationService()
	}

	main(type, body) {
		return auzaQuery({
			path: `${this.#BASE_URL}/${type}`,
			body,
			onSuccess: data => {
				//login store
				this.store.login(data.user, data.accessToken)

				this.notificationService.show(
					'success',
					'You have successfully logged in'
				)
			},
			method: 'POST'
		})
	}
}
