import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { errorToast } from '../../utils/toast'
import instance from './interceptors'

export const request = async <T>(config: AxiosRequestConfig) => {
	const onSuccess = (response: AxiosResponse<T>) => response.data

	const onError = (error: AxiosError<T>) => {
		errorToast(error)
		return Promise.reject(error)
	}

	return instance(config).then(onSuccess).catch(onError)
}
