import { auzaQuery } from '@/core/auza-query/auza-query.lib'

export class TransactionService {
	#BASE_URL = '/transactions'

	getAll(onSuccess) {
		return auzaQuery({
			path: this.#BASE_URL + `?${new URLSearchParams({ orderBy: 'desc' })}`,
			onSuccess
		})
	}
}
