import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $A } from '@/core/component/aquery/aquery.lib'
import styles from './user-item.module.scss'
import html from './user-item.template.html'

export class UserItem extends ChildComponent {
	constructor(user, isGrey = false, onClick) {
		super()

		if (!user) throw new Error('User should be passed!')
		if (!user?.name) throw new Error('User must have a "name"!')
		if (!user?.avatarPath) throw new Error('User must have a "avatarpath"!')

		this.user = user
		this.isGrey = isGrey
		this.onClick = onClick
	}

	#preventDefault(e) {
		e.preventDefault()
	}

	update({ avatarPath, name }) {
		if (avatarPath && name) {
			$A(this.element).find('img').attr('src', avatarPath).attr('alt', name)

			$A(this.element).find('span').text(name)
		}
	}
	render() {
		this.element = renderService.htmlToElement(html, [], styles)

		this.update(this.user)

		$A(this.element).click(this.onClick || this.#preventDefault.bind(this))

		if (!this.onClick) $A(this.element).attr('disabled', '')
		if (this.isGrey) $A(this.element).addClass(styles.gray)

		return this.element
	}
}
