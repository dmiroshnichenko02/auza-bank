import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'

import { AuthService } from '@/api/auth.service'
import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'
import { $A } from '@/core/component/aquery/aquery.lib'
import formService from '@/core/services/form.service'
import validationService from '@/core/services/validation.service'
import styles from './auth.module.scss'
import html from './auth.template.html'

export class Auth extends BaseScreen {
	#isTypeLogin = true
	constructor() {
		super({
			title: 'Auth'
		})

		this.authService = new AuthService()
	}

	#validateFields(formValues) {
		const emailLabel = $A(this.element).find('label:first-child')
		const passwordLabel = $A(this.element).find('label:last-child')

		if (!formValues.email) {
			validationService.showError(emailLabel)
		}

		if (!formValues.password) {
			validationService.showError(passwordLabel)
		}

		return formValues.email && formValues.password
	}

	#handleSubmit = e => {
		const formValues = formService.getFormValues(e.target)
		if (!this.#validateFields(formValues)) return

		const type = this.#isTypeLogin ? 'login' : 'register'

		this.authService.main(type, formValues)
	}

	#changeFormType = e => {
		console.log(this, e)
		e.preventDefault()

		$A(this.element)
			.find('h1')
			.text(this.#isTypeLogin ? 'Register' : 'Sign in')
		e.target.innerText = this.#isTypeLogin ? 'Sign in' : 'Register'
		this.#isTypeLogin = !this.#isTypeLogin
	}

	render() {
		this.element = renderService.htmlToElement(
			html,
			[new Button({ children: 'Submit' })],
			styles
		)

		$A(this.element)
			.find('#auth-inputs')
			.append(
				new Field({
					placeholder: 'Enter email',
					name: 'email',
					type: 'email'
				}).render()
			)
			.append(
				new Field({
					placeholder: 'Enter password',
					name: 'password',
					type: 'password'
				}).render()
			)

		$A(this.element).find('#change-form-type').click(this.#changeFormType)

		$A(this.element).find('form').submit(this.#handleSubmit)

		return this.element
	}
}
