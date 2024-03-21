import { SERVER_URL } from '@/config/ulr.config'
import { ACCESS_TOKEN_KEY } from '@/constansts/auth.constants'
import { NotificationService } from '../services/notification.service'
import { StorageService } from '../services/storage.service'
import { extractErrorMessage } from './extract-error-message'

/**
 * AuzaQuery is a minimalistic library for handling API requests.
 * Fetch data from the API with provided options.
 *
 * @param {Object} options - Configuration options for the API request.
 * @param {string} options.path - The API endpoint path.
 * @param {('GET'|'POST'|'PATCH'|'DELETE'|'PUT')} [options.method='GET'] - The HTTP method to use for the request.
 * @param {Object} [options.body=null] - The request payload to send as JSON.
 * @param {Object} [options.headers={}] - Additional headers to include with the request.
 * @param {Function} [options.onSuccess=null] - Callback function to be called on successful response.
 * @param {Function} [options.onError=null] - Callback function to be called on error response.
 * @returns {Promise<{isLoading: boolean, error: string|null, data: any|null}>} - An object containing the loading state, error, and data from the response.
 */

export async function auzaQuery({
	path,
	method = 'GET',
	body = null,
	headers = {},
	onSuccess = null,
	onError = null
}) {
	let isLoading = true
	let eror = null
	let data = null
	const url = `${SERVER_URL}/api${path}`

	// ACCESS_TOKEN

	const accessToken = new StorageService().getItem(ACCESS_TOKEN_KEY)

	const requestOptions = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers
		}
	}

	if (accessToken) {
		requestOptions.headers.Authorization = `Bearer ${accessToken}`
	}

	if (body) {
		requestOptions.body = JSON.stringify(body)
	}

	try {
		const response = await fetch(url, requestOptions)

		if (response.ok) {
			data = await response.json()
			if (onSuccess) {
				onSuccess(data)
			}
		} else {
			const errorData = await response.json()

			const errorMessage = extractErrorMessage(errorData)

			if (onError) {
				onError(errorMessage)
			}

			// Notification error

			new NotificationService().show('error', errorMessage)
		}
	} catch (error) {
		const errorMessage = extractErrorMessage(error)

		if (errorMessage) {
			onError(errorMessage)
		}

		new NotificationService().show('error', errorMessage)
	} finally {
		isLoading = false
	}

	return { isLoading, eror, data }
}