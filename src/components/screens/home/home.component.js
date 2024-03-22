import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'
import { Actions } from './actions/actions.component'
import { CardInfo } from './card-info/card-info.component'
import { Contacts } from './contacts/contacts.component'
import styles from './home.module.scss'
import html from './home.template.html'

export class Home extends BaseScreen {
	constructor() {
		super({
			title: 'Home'
		})
	}

	render() {
		const element = renderService.htmlToElement(
			html,
			[CardInfo, Actions, Contacts],
			styles
		)

		return element
	}
}
