import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { CardService } from '@/api/card.service'
import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'
import {
	BALANCE_UPDATED,
	TRANSACTION_COMPLETED
} from '@/constants/event.constants'
import { $A } from '@/core/component/aquery/aquery.lib'
import { NotificationService } from '@/core/services/notification.service'
import validationService from '@/core/services/validation.service'
import { Store } from '@/store/store'
import styles from './transfer-field.module.scss'
import html from './transfer-field.template.html'

export class TransferField extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance.state
		this.notificationService = new NotificationService()
		this.cardService = new CardService()
	}

	handleTransfer = event => {
		event.preventDefault()

		if (!this.store.user) {
			this.notificationService.show('error', 'You need authorization')
		}

		$A(this.element).text('Sending...').attr('disabled', true)

		const inputElement = $A(this.element).find('input')
		const toCardNumber = inputElement.value().replaceAll('-', '')

		const reset = () => {
			$A(this.element).removeAttr('disabled').text('Send')
		}

		if (!toCardNumber) {
			validationService.showError($A(this.element).find('label'))
			reset()
			return
		}

		let amount = prompt('Transfer amount 👇')

		this.cardService.transfer({ amount, toCardNumber }, () => {
			inputElement.value('')
			amount = ''

			document.dispatchEvent(new Event(TRANSACTION_COMPLETED))
			document.dispatchEvent(new Event(BALANCE_UPDATED))
		})

		reset()
	}

	render() {
		this.element = renderService.htmlToElement(
			html,
			[
				new Field({
					name: 'card-number',
					placeholder: 'xxxx-xxxx-xxxx-xxxx',
					variant: 'credit-card'
				}),
				new Button({
					children: 'Send',
					variant: 'purple',
					onClick: this.handleTransfer
				})
			],
			styles
		)

		return this.element
	}
}
