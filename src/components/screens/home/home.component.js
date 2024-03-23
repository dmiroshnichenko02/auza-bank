import { AuthRequiredMessage } from '@/components/ui/auth-required-message/auth-required-message.component'
import { $A } from '@/core/component/aquery/aquery.lib'
import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'
import { Store } from '@/store/store'
import { Actions } from './actions/actions.component'
import { CardInfo } from './card-info/card-info.component'
import { Contacts } from './contacts/contacts.component'
import styles from './home.module.scss'
import html from './home.template.html'
import { Statistics } from './statistics/statistics.component'
import { Transactions } from './transactions/transactions.component'

export class Home extends BaseScreen {
	constructor() {
		super({
			title: 'Home'
		})

		this.store = Store.getInstance()

		this.store.addObserver(this)

		this.components = {
			cardInfo: null,
			transactions: null,
			Statistics: null
		}
	}

	createOrUpdateComponent(component, componentName) {
		if (this.components[componentName]) {
			this.components[componentName].destroy()
		}
		this.components[componentName] = new component()
		return this.components[componentName]
	}

	update() {
		this.user = this.store.state.user

		if (!this.user) {
			$A(this.element).html(new AuthRequiredMessage().render().outerHTML)
		}
	}

	render() {
		const componentsToRender = [
			this.createOrUpdateComponent(CardInfo, 'cardInfo'),
			this.createOrUpdateComponent(Transactions, 'transactions'),
			this.createOrUpdateComponent(Statistics, 'Statistics'),
			Actions,
			Contacts
		]

		this.element = renderService.htmlToElement(html, componentsToRender, styles)

		this.update()

		return this.element
	}
}
