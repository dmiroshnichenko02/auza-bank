import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { DonutChart } from '@/components/ui/donut-chart/donut-chart.component'
import styles from './circle-chart.module.scss'
import html from './circle-chart.template.html'

export class CircleChart extends ChildComponent {
	constructor(incomePercent, expensesPercent) {
		super()

		this.incomePercent = incomePercent
		this.expensesPercent = expensesPercent
	}
	render() {
		this.element = renderService.htmlToElement(
			html,
			[
				new DonutChart([
					{ value: this.incomePercent, color: '#08f0c8' },
					{ value: this.expensesPercent, color: '#917cff' }
				])
			],
			styles
		)

		return this.element
	}
}
