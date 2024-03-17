export class Layout {
	constructor({ router, children }) {
		this.children = children
		this.router = router
	}

	render() {
		const headerElement = `<header class="header">
		Header
		<nav>
			<a href="/">Home</a>
			<a href="/auth">Auth</a>
			<a href="/about-us">About Us</a>
		</nav>
		</header>`

		return `
			${headerElement}
			<main class="main">
			${this.children}
			</main>
		`
	}
}
