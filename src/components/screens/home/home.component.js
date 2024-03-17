import { $A } from '@/core/component/aquery/aquery.lib'
import { BaseScreen } from '@/core/component/base-screen.component'
import RenderService from '@/core/services/render.service'
import styles from './home.module.scss'
import html from './home.template.html'

export class Home extends BaseScreen {
	constructor() {
		super({
			title: 'Home'
		})
	}

	render() {
		const element = RenderService.htmlToElement(html, [], styles)

		$A(element).find('h1').css('color', 'red')

		return element.outerHTML
		// return `<h1>Home</h1>`
	}
}
