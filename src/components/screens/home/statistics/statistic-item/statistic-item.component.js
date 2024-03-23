import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $A } from '@/core/component/aquery/aquery.lib'
import styles from './statistic-item.module.scss'
import html from './statistic-item.template.html'

/**
 * StatisticItem is a class representing a statistic item component.
 */
export class StatisticItem extends ChildComponent {
	/**
	 * Constructs a StatisticItem instance.
	 *
	 * @param {string} label - The label to be displayed in the statistic item.
	 * @param {string|number} value - The value to be displayed in the statistic item.
	 * @param {('purple'|'green')} variant - The variant that determines the appearance of the statistic item. Allowed values: 'purple' or 'green'.
	 */
	constructor(label, value, variant) {
		if (!label || !value || !variant) {
			throw new Error('Label, value and variant (purple, green)')
		}

		super()

		this.label = label
		this.value = value
		this.variant = variant
	}

	render() {
		this.element = renderService.htmlToElement(html, [], styles)

		$A(this.element).addClass(styles[this.variant]).addClass('fade-in')

		$A(this.element).find('#statistic-label').text(this.label)
		$A(this.element).find('#statistic-value').text(this.value)

		return this.element
	}
}
