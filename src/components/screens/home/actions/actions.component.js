import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { CardService } from '@/api/card.service'
import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'
import { BALANCE_UPDATED } from '@/constants/event.constants'
import { $A } from '@/core/component/aquery/aquery.lib'
import { NotificationService } from '@/core/services/notification.service'
import validationService from '@/core/services/validation.service'
import { Store } from '@/store/store'
import styles from './actions.module.scss'
import html from './actions.template.html'

export class Actions extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.cardService = new CardService()
		this.notificationService = new NotificationService()
	}

	updateBalance(event, type) {
		event.preventDefault()

		if (!this.store.user) {
			this.notificationService.show('error', 'You need Authorization')
		}

		$A(event.target).text('Sending...').attr('disabled', true)

		const inputElement = $A(this.element).find('input')
		const amount = inputElement.value()

		if (!amount) {
			validationService.showError($A(this.element).find('label'))
			return
		}

		this.cardService.updateBalance(amount, type, () => {
			inputElement.value('')

			const balanceUpdateEvent = new Event(BALANCE_UPDATED)
			document.dispatchEvent(balanceUpdateEvent)
		})

		$A(event.target).text(type).removeAttr('disabled')
	}

	render() {
		this.element = renderService.htmlToElement(
			html,
			[
				new Field({
					name: 'Amount',
					placeholder: 'Enter amount',
					type: 'number'
				})
			],
			styles
		)

		$A(this.element)
			.find('#action-buttons')
			.append(
				new Button({
					children: 'Top-up',
					variant: 'green',
					onClick: e => this.updateBalance(e, 'Top-up')
				}).render()
			)
			.append(
				new Button({
					children: 'Withdrawal',
					variant: 'purple',
					onClick: e => this.updateBalance(e, 'Withdrawal')
				}).render()
			)

		return this.element
	}
}
