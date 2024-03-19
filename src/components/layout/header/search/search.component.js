import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $A } from '@/core/component/aquery/aquery.lib'
import styles from './search.module.scss'
import html from './search.template.html'

export class Search extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(html, [], styles)

		$A(this.element)
			.find('input')
			.input({
				type: 'search',
				name: 'search',
				placeholder: 'Search contacts...'
			})

		return this.element
	}
}
