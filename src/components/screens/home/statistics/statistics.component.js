import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { StatisticService } from '@/api/statistic.service'
import { Heading } from '@/components/ui/heading/heading.component'
import {
	LOADER_SELECTOR,
	Loader
} from '@/components/ui/loader/loader.component'
import { TRANSACTION_COMPLETED } from '@/constants/event.constants'
import { $A } from '@/core/component/aquery/aquery.lib'
import { Store } from '@/store/store'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import { CircleChart } from './circle-chart/circle-chart.component'
import { StatisticItem } from './statistic-item/statistic-item.component'
import styles from './statistics.module.scss'
import html from './statistics.template.html'

export class Statistics extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.statisticService = new StatisticService()
		this.element = renderService.htmlToElement(
			html,
			[new Heading('Statistics')],
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

	renderChart(income, expense) {
		const total = income + expense
		let incomePercent = (income * 100) / total
		let expensesPercent = 100 - incomePercent

		if (income && !expense) {
			incomePercent = 100
			expensesPercent = 0.1
		}

		if (!income && expense) {
			incomePercent = 0.1
			expensesPercent = 100
		}

		return new CircleChart(incomePercent, expensesPercent).render()
	}

	fetchData() {
		this.statisticService.main(data => {
			if (!data) return

			const loaderElement = this.element.querySelector(LOADER_SELECTOR)

			if (loaderElement) loaderElement.remove()

			const statisticItemElement = $A(this.element).find('#statistics-items')
			statisticItemElement.text('')

			const circleChartElement = $A(this.element).find('#circle-chart')
			circleChartElement.text('')

			statisticItemElement
				.append(
					new StatisticItem(
						'Income:',
						formatToCurrency(data[0].value || 0),
						'green'
					).render()
				)
				.append(
					new StatisticItem(
						'Expense:',
						formatToCurrency(data[1].value || 0),
						'purple'
					).render()
				)
			circleChartElement.append(this.renderChart(data[0].value, data[1].value))
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
