import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { CardService } from '@/api/card.service'
import { BALANCE_UPDATED } from '@/constants/event.constants'
import { $A } from '@/core/component/aquery/aquery.lib'
import { Store } from '@/store/store'
import { formatCardNumber } from '@/utils/format/format-card-number'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import styles from './card-info.module.scss'
import html from './card-info.template.html'

const CODE = '*****'

export class CardInfo extends ChildComponent {
	constructor() {
		super()

		this.cardService = new CardService()
		this.store = Store.getInstance()

		this.element = renderService.htmlToElement(html, [], styles)

		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(BALANCE_UPDATED, this.#onBalanceUpdated)
	}

	#removeListeners() {
		document.removeEventListener(BALANCE_UPDATED, this.#onBalanceUpdated)
	}

	#onBalanceUpdated = () => {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	#copyCardNumber(e) {
		navigator.clipboard.writeText(e.target.innerText).then(() => {
			e.target.innerText = 'Card number copied!'
			setTimeout(() => {
				e.target.innerText = formatCardNumber(this.card.number)
			}, 2000)
		})
	}

	#toggleCvc(cardCvcElement) {
		const text = cardCvcElement.text()

		text === CODE
			? cardCvcElement.text(this.card.cvc)
			: cardCvcElement.text(CODE)
	}

	fillElements() {
		$A(this.element).html(
			renderService.htmlToElement(html, [], styles).innerHTML
		)

		$A(this.element)
			.findAll(':scope > div')
			.forEach(child => child.addClass('fade-in'))

		$A(this.element)
			.find('#card-number')
			.text(formatCardNumber(this.card.number))
			.click(this.#copyCardNumber.bind(this))

		$A(this.element).find('#card-expire-date').text(this.card.expireDate)

		const cardCvcElement = $A(this.element).find('#card-cvc')

		cardCvcElement.text(CODE).css('width', '44px')

		$A(this.element)
			.find('#toggle-cvc')
			.click(this.#toggleCvc.bind(this, cardCvcElement))

		$A(this.element)
			.find('#card-balance')
			.text(formatToCurrency(this.card.balance))
	}

	fetchData() {
		this.cardService.byUser(data => {
			if (data?.id) {
				this.card = data
				this.fillElements()
				this.store.updateCard(data)
			} else {
				this.store.updateCard(null)
			}
		})
	}

	render() {
		if (this.store.state.user) this.fetchData()

		return this.element
	}
}
