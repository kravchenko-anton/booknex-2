import instance from '@/services/api/interceptors'
import { errorCatch } from '@/utils/catch-error'
import { errorToast } from '@/utils/error-toast'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export const request = async <T>(config: AxiosRequestConfig) => {
	const onSuccess = (response: AxiosResponse<T>) => response.data

	const onError = (error: AxiosError<T>) => {
		errorToast(errorCatch(error))
		return Promise.reject(error)
	}

	return instance(config).then(onSuccess).catch(onError)
}
