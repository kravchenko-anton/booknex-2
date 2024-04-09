/* tslint:disable */
/* eslint-disable */
/**
 * Booknex
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * Contact: Github repository
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { AxiosInstance, AxiosPromise, RawAxiosRequestConfig } from 'axios'
import globalAxios from 'axios'
import type { Configuration } from '../configuration'
// Some imports not used depending on template conditions
// @ts-ignore
import {
	DUMMY_BASE_URL,
	assertParamExists,
	createRequestFunction,
	serializeDataIfNeeded,
	setApiKeyToObject,
	setBasicAuthToObject,
	setBearerAuthToObject,
	setOAuthToObject,
	setSearchParams,
	toPathString
} from '../common'
// @ts-ignore
import {
	BASE_PATH,
	BaseAPI,
	COLLECTION_FORMATS,
	RequestArgs,
	RequiredError,
	operationServerMap
} from '../base'
// @ts-ignore
import { FindOneGenreOutput } from '../models'
// @ts-ignore
import { ShortGenre } from '../models'
/**
 * GenreApi - axios parameter creator
 * @export
 */
export const GenreApiAxiosParamCreator = function (
	configuration?: Configuration
) {
	return {
		/**
		 *
		 * @param {string} slug
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		bySlug: async (
			slug: string,
			options: RawAxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			// verify required parameter 'slug' is not null or undefined
			assertParamExists('bySlug', 'slug', slug)
			const localVarPath = `/genre/by-slug/{slug}`.replace(
				`{${'slug'}}`,
				encodeURIComponent(String(slug))
			)
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
			let baseOptions
			if (configuration) {
				baseOptions = configuration.baseOptions
			}

			const localVarRequestOptions = {
				method: 'GET',
				...baseOptions,
				...options
			}
			const localVarHeaderParameter = {} as any
			const localVarQueryParameter = {} as any

			// authentication bearer required
			// http bearer authentication required
			await setBearerAuthToObject(localVarHeaderParameter, configuration)

			setSearchParams(localVarUrlObj, localVarQueryParameter)
			let headersFromBaseOptions =
				baseOptions && baseOptions.headers ? baseOptions.headers : {}
			localVarRequestOptions.headers = {
				...localVarHeaderParameter,
				...headersFromBaseOptions,
				...options.headers
			}

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions
			}
		},
		/**
		 *
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		catalog: async (
			options: RawAxiosRequestConfig = {}
		): Promise<RequestArgs> => {
			const localVarPath = `/genre`
			// use dummy base URL string because the URL constructor only accepts absolute URLs.
			const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
			let baseOptions
			if (configuration) {
				baseOptions = configuration.baseOptions
			}

			const localVarRequestOptions = {
				method: 'GET',
				...baseOptions,
				...options
			}
			const localVarHeaderParameter = {} as any
			const localVarQueryParameter = {} as any

			// authentication bearer required
			// http bearer authentication required
			await setBearerAuthToObject(localVarHeaderParameter, configuration)

			setSearchParams(localVarUrlObj, localVarQueryParameter)
			let headersFromBaseOptions =
				baseOptions && baseOptions.headers ? baseOptions.headers : {}
			localVarRequestOptions.headers = {
				...localVarHeaderParameter,
				...headersFromBaseOptions,
				...options.headers
			}

			return {
				url: toPathString(localVarUrlObj),
				options: localVarRequestOptions
			}
		}
	}
}

/**
 * GenreApi - functional programming interface
 * @export
 */
export const GenreApiFp = function (configuration?: Configuration) {
	const localVarAxiosParamCreator = GenreApiAxiosParamCreator(configuration)
	return {
		/**
		 *
		 * @param {string} slug
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async bySlug(
			slug: string,
			options?: RawAxiosRequestConfig
		): Promise<
			(
				axios?: AxiosInstance,
				basePath?: string
			) => AxiosPromise<FindOneGenreOutput>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.bySlug(
				slug,
				options
			)
			const localVarOperationServerIndex = configuration?.serverIndex ?? 0
			const localVarOperationServerBasePath =
				operationServerMap['GenreApi.bySlug']?.[localVarOperationServerIndex]
					?.url
			return (axios, basePath) =>
				createRequestFunction(
					localVarAxiosArgs,
					globalAxios,
					BASE_PATH,
					configuration
				)(axios, localVarOperationServerBasePath || basePath)
		},
		/**
		 *
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		async catalog(
			options?: RawAxiosRequestConfig
		): Promise<
			(
				axios?: AxiosInstance,
				basePath?: string
			) => AxiosPromise<Array<ShortGenre>>
		> {
			const localVarAxiosArgs = await localVarAxiosParamCreator.catalog(options)
			const localVarOperationServerIndex = configuration?.serverIndex ?? 0
			const localVarOperationServerBasePath =
				operationServerMap['GenreApi.catalog']?.[localVarOperationServerIndex]
					?.url
			return (axios, basePath) =>
				createRequestFunction(
					localVarAxiosArgs,
					globalAxios,
					BASE_PATH,
					configuration
				)(axios, localVarOperationServerBasePath || basePath)
		}
	}
}

/**
 * GenreApi - factory interface
 * @export
 */
export const GenreApiFactory = function (
	configuration?: Configuration,
	basePath?: string,
	axios?: AxiosInstance
) {
	const localVarFp = GenreApiFp(configuration)
	return {
		/**
		 *
		 * @param {string} slug
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		bySlug(slug: string, options?: any): AxiosPromise<FindOneGenreOutput> {
			return localVarFp
				.bySlug(slug, options)
				.then(request => request(axios, basePath))
		},
		/**
		 *
		 * @param {*} [options] Override http request option.
		 * @throws {RequiredError}
		 */
		catalog(options?: any): AxiosPromise<Array<ShortGenre>> {
			return localVarFp
				.catalog(options)
				.then(request => request(axios, basePath))
		}
	}
}

/**
 * GenreApi - object-oriented interface
 * @export
 * @class GenreApi
 * @extends {BaseAPI}
 */
export class GenreApi extends BaseAPI {
	/**
	 *
	 * @param {string} slug
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof GenreApi
	 */
	public bySlug(slug: string, options?: RawAxiosRequestConfig) {
		return GenreApiFp(this.configuration)
			.bySlug(slug, options)
			.then(request => request(this.axios, this.basePath))
	}

	/**
	 *
	 * @param {*} [options] Override http request option.
	 * @throws {RequiredError}
	 * @memberof GenreApi
	 */
	public catalog(options?: RawAxiosRequestConfig) {
		return GenreApiFp(this.configuration)
			.catalog(options)
			.then(request => request(this.axios, this.basePath))
	}
}
