import { Layout } from '@/components/layout/layout.component'
import { NotFound } from '@/components/screens/not-found/not-found.component'
import { ROUTES } from './routes.data'

export class Router {
	#routes = ROUTES
	#currentRoute = null
	#layoutInstance = null
	constructor() {
		window.addEventListener('popstate', () => {
			this.#handleRouteChange()
		})

		this.#handleRouteChange()
		this.#handleLinks()
	}

	getCurrentPath() {
		return window.location.pathname
	}

	#handleLinks() {
		document.addEventListener('click', event => {
			const target = event.target.closest('a')

			if (target) {
				event.preventDefault()
				this.navigate(target.href)
			}
		})
	}

	navigate(path) {
		if (path !== this.getCurrentPath()) {
			window.history.pushState({}, '', path)
			this.#handleRouteChange()
		}
	}

	#handleRouteChange() {
		const path = this.getCurrentPath() || '/'
		let route = this.#routes.find(route => route.path === path)

		if (!route) {
			route = {
				path: '404',
				component: NotFound
			}
		}

		this.#currentRoute = route
		this.#render()
	}

	#render() {
		const component = new this.#currentRoute.component()

		if (!this.#layoutInstance) {
			this.#layoutInstance = new Layout({
				router: this,
				children: component.render()
			})
			document.querySelector('#app').innerHTML = this.#layoutInstance.render()
		} else {
			document.querySelector('main').innerHTML = component.render()
		}
	}
}
