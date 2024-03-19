import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'

import styles from './auth.module.scss'
import html from './auth.template.html'

export class Auth extends BaseScreen {
	constructor() {
		super({
			title: 'Auth'
		})
	}

	render() {
		const element = renderService.htmlToElement(html, [], styles)

		return element
	}
}
