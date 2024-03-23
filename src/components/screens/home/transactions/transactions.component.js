import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { TransactionService } from '@/api/transaction.service'
import { Heading } from '@/components/ui/heading/heading.component'
import {
	LOADER_SELECTOR,
	Loader
} from '@/components/ui/loader/loader.component'
import { TRANSACTION_COMPLETED } from '@/constants/event.constants'
import { $A } from '@/core/component/aquery/aquery.lib'
import { Store } from '@/store/store'
import { TransactionItem } from './transaction.item/transaction.item.component'
import styles from './transactions.module.scss'
import html from './transactions.template.html'

export class Transactions extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state

		this.transactionsService = new TransactionService()

		this.element = renderService.htmlToElement(
			html,
			[new Heading('Recent transactions')],
			styles
		)

		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionComplete
		)
	}

	#removeListeners() {
		document.removeEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionComplete
		)
	}

	#onTransactionComplete = () => {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	fetchData() {
		this.transactionsService.getAll(data => {
			if (!data) return

			const loaderElement = this.element.querySelector(LOADER_SELECTOR)
			if (loaderElement) loaderElement.remove()

			const transactionList = $A(this.element).find('#transactions-list')
			transactionList.text('')

			if (data.length) {
				for (const transaction of data.transactions) {
					transactionList.append(new TransactionItem(transaction).render())
				}
			} else {
				transactionList.text('Transactions not found')
			}
		})
	}

	render() {
		if (this.store.user) {
			$A(this.element).append(new Loader().render())
			setTimeout(() => {
				this.fetchData()
			}, 500)
		}

		return this.element
	}
}
