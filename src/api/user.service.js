import { auzaQuery } from '@/core/auza-query/auza-query.lib'

export class UserService {
	#BASE_URL = '/users'

	getAll(searchTerm, onSuccess) {
		return auzaQuery({
			path: `${this.#BASE_URL}${
				searchTerm
					? `?${new URLSearchParams({
							searchTerm
						})}`
					: ''
			}`,
			onSuccess
		})
	}
}
