import renderService from '../services/render.service'
import ChildComponent from './child.component'

import styles from './card-info.module.scss'
import html from './card-info.template.html'

export class CardInfo extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(html, [], styles)

		return this.element
	}
}