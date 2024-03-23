import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './auth-required-message.module.scss'
import html from './auth-required-message.template.html'

export class AuthRequiredMessage extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(html, [], styles)

		return this.element
	}
}