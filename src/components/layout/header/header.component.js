import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { UserItem } from '@/components/ui/user-item/user-item.component'
import { Logo } from './logo/logo.component'
import { LogoutButton } from './logout-button/logout-button.component'
import { Search } from './search/search.component'

import { $A } from '@/core/component/aquery/aquery.lib'
import { Store } from '@/store/store'
import styles from './header.module.scss'
import template from './header.template.html'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()
		this.router = router
		this.store = Store.getInstance()
		this.store.addObserver(this)

		this.userItem = new UserItem({
			avatarPath: '/',
			name: 'Name'
		})
	}

	update() {
		this.user = this.store.state.user

		const authSideElement = $A(this.element).find('#auth-side')

		if (this.user) {
			authSideElement.show()
			this.userItem.update(this.user)
			this.router.navigate('/')
		} else {
			authSideElement.hide()
		}
	}
	render() {
		this.element = renderService.htmlToElement(
			template,
			[Logo, Search, this.userItem, new LogoutButton({ router: this.router })],
			styles
		)

		this.update()

		return this.element
	}
}
