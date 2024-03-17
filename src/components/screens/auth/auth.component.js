import { BaseScreen } from '@/core/component/base-screen.component'

export class Auth extends BaseScreen {
	constructor() {
		super({
			title: 'Auth'
		})
	}

	render() {
		return `<h1>Auth</h1>`
	}
}
