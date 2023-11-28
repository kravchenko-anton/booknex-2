import instance from '@/services/api/interceptors'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export const request = async <T>(config: AxiosRequestConfig) => {
	const onSuccess = (response: AxiosResponse<T>) => response.data

	const onError = (error: AxiosError<T>) => {
			// TODO: сделать тут обработку ошибок через тост
		console.error(error)
		return Promise.reject(error)
	}

	return instance(config).then(onSuccess).catch(onError)
}
