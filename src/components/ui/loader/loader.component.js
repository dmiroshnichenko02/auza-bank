import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $A } from '@/core/component/aquery/aquery.lib'
import styles from './loader.module.scss'
import html from './loader.template.html'

export const LOADER_SELECTOR = ['data-component="loader"]']

export class Loader extends ChildComponent {
	constructor(width = 100, height = 100) {
		super()

		this.width = width
		this.height = height
	}
	render() {
		this.element = renderService.htmlToElement(html, [], styles)

		$A(this.element)
			.css('width', `${this.width}px`)
			.css('height', `${this.height}px`)
			.addClass('bounce')

		return this.element
	}
}
