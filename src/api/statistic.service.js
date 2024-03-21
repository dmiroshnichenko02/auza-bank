import { auzaQuery } from '@/core/auza-query/auza-query.lib'

export class StatisticService {
	#BASE_URL = '/statistics'

	main(onSuccess) {
		return auzaQuery({
			path: this.#BASE_URL,
			onSuccess
		})
	}
}
