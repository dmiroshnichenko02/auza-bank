import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'
import { CardInfo } from './card-info/card-info.component'
import styles from './home.module.scss'
import html from './home.template.html'

export class Home extends BaseScreen {
	constructor() {
		super({
			title: 'Home'
		})
	}

	render() {
		const element = renderService.htmlToElement(html, [CardInfo], styles)

		return element
	}
}
