import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { UserService } from '@/api/user.service'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { TRANSFER_FIELD_SELECTOR } from '@/constants/transfer.constants'
import { $A } from '@/core/component/aquery/aquery.lib'
import { debounce } from '@/utils/debounce.util'
import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'
import styles from './search.module.scss'
import html from './search.template.html'

export class Search extends ChildComponent {
	constructor() {
		super()

		this.userService = new UserService()
	}

	#handleSearch = async event => {
		const searchTerm = event.target.value

		const searchResultElement = $A(this.element).find('#search-results')

		if (!searchTerm) {
			searchResultElement.html('')
			return
		}

		await this.userService.getAll(searchTerm, users => {
			searchResultElement.html('')

			users.forEach((user, index) => {
				const userItem = new UserItem(user, true, () => {
					$A(TRANSFER_FIELD_SELECTOR).value(
						formatCardNumberWithDashes(user.card.number)
					)

					searchResultElement.html('')
				}).render()

				$A(userItem)
					.addClass(styles.item)
					.css('transition-delay', `${index * 0.1}s`)

				searchResultElement.append(userItem)

				setTimeout(() => {
					$A(userItem).addClass(styles.visible)
				}, 50)
			})
		})
	}
	render() {
		this.element = renderService.htmlToElement(html, [], styles)

		const debounceHandleSearch = debounce(this.#handleSearch, 300)

		$A(this.element)
			.find('input')
			.input({
				type: 'search',
				name: 'search',
				placeholder: 'Search contacts...'
			})
			.on('input', debounceHandleSearch)

		return this.element
	}
}
