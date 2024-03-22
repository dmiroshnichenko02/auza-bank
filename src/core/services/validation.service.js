import { COLORS } from '@/config/colors.config'

class ValidationService {
	constructor() {
		this.errorBorderTimeOut = {}
	}

	showError(element, timeout = 2500) {
		element.css('border-color', COLORS.error)

		if (this.errorBorderTimeOut[element]) {
			clearTimeout(this.errorBorderTimeOut[element])
		}
		this.errorBorderTimeOut[element] = setTimeout(() => {
			element.css('border-color', '')
		}, timeout)
	}
}

export default new ValidationService()
