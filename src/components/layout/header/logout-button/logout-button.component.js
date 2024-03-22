import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $A } from '@/core/component/aquery/aquery.lib'
import { Store } from '@/store/store'
import styles from './logout-button.module.scss'
import html from './logout-button.template.html'

export class LogoutButton extends ChildComponent {
	constructor({ router }) {
		super()

		this.router = router
		this.store = Store.getInstance()
		this.user = this.store.state.user
	}
	render() {
		this.element = renderService.htmlToElement(html, [], styles)

		$A(this.element)
			.find('button')
			.click(() => {
				this.store.logout()
				this.router.navigate('/auth')
			})

		return this.element
	}
}
