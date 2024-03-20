import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './notification.module.scss'
import html from './notification.template.html'

export class Notification extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(html, [], styles)

		return this.element
	}
}
