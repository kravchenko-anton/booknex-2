import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { errorCatch } from '../../../apps/mobile/src/utils/catch-error'
import { errorToast } from '../../../apps/mobile/src/utils/error-toast'
import instance from './interceptors'

export const request = async <T>(config: AxiosRequestConfig) => {
	const onSuccess = (response: AxiosResponse<T>) => response.data

	const onError = (error: AxiosError<T>) => {
		errorToast(errorCatch(error))
		return Promise.reject(error)
	}

	return instance(config).then(onSuccess).catch(onError)
}
