import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $A } from '@/core/component/aquery/aquery.lib'
import styles from './heading.module.scss'
import html from './heading.template.html'

export class Heading extends ChildComponent {
	constructor(title) {
		super()

		this.title = title
	}
	render() {
		this.element = renderService.htmlToElement(html, [], styles)

		$A(this.element).text(this.title)

		return this.element
	}
}
