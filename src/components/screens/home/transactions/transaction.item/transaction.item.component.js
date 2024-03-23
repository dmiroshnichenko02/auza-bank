import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $A } from '@/core/component/aquery/aquery.lib'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import { formateDate } from '@/utils/format/format-to-date'
import styles from './transaction.item.module.scss'
import html from './transaction.item.template.html'

export class TransactionItem extends ChildComponent {
	constructor(transaction) {
		super()

		this.transaction = transaction
	}

	render() {
		this.element = renderService.htmlToElement(html, [], styles)

		const isIncome = this.transaction.type === 'TOP_UP'
		const name = isIncome ? 'Income' : 'Expense'

		if (isIncome) {
			$A(this.element).addClass(styles.income)
		}

		$A(this.element).find('#transaction-name').text(name)

		$A(this.element)
			.find('#transaction-date')
			.text(formateDate(this.transaction.createdAt))

		$A(this.element)
			.find('#transaction-amount')
			.text(formatToCurrency(this.transaction.amount))

		return this.element
	}
}
