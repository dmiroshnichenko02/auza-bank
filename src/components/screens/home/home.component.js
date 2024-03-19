import { UserItem } from '@/components/ui/user-item/user-item.component'
import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'
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
			[
				new UserItem({
					avatarPath:
						'https://prisma-blog-ebon.vercel.app/blog/posts/type-safe_js_with_JsDoc.png',
					name: 'Danilo'
				})
			],
			styles
		)

		return element
	}
}
