import { $A } from '@/core/component/aquery/aquery.lib'
import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './layout.module.scss'
import template from './layout.template.html'

import { Header } from './header/header.component'

export class Layout extends ChildComponent {
	constructor({ router, children }) {
		super()

		this.router = router
		this.children = children
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const mainElement = $A(this.element).find('main')

		const contentContainer = $A(this.element).find('#content')
		contentContainer.append(this.children)

		mainElement.before(new Header().render()).append(contentContainer.element)

		return this.element
	}
}
