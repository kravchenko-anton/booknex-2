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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import { EbookOutput } from '../models';
// @ts-ignore
import { StoredEBook } from '../models';
/**
 * EbookApi - axios parameter creator
 * @export
 */
export const EbookApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        ebookBySlug: async (slug: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'slug' is not null or undefined
            assertParamExists('ebookBySlug', 'slug', slug)
            const localVarPath = `/ebook/ebook/by-slug/{slug}`
                .replace(`{${"slug"}}`, encodeURIComponent(String(slug)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        fixEBookStructure: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/ebook/admin/fix-ebook-structure`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storedEbookBySlug: async (slug: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'slug' is not null or undefined
            assertParamExists('storedEbookBySlug', 'slug', slug)
            const localVarPath = `/ebook/admin/stored-ebook/{slug}`
                .replace(`{${"slug"}}`, encodeURIComponent(String(slug)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * EbookApi - functional programming interface
 * @export
 */
export const EbookApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = EbookApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async ebookBySlug(slug: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EbookOutput>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.ebookBySlug(slug, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['EbookApi.ebookBySlug']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async fixEBookStructure(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.fixEBookStructure(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['EbookApi.fixEBookStructure']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storedEbookBySlug(slug: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<StoredEBook>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.storedEbookBySlug(slug, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['EbookApi.storedEbookBySlug']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * EbookApi - factory interface
 * @export
 */
export const EbookApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = EbookApiFp(configuration)
    return {
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        ebookBySlug(slug: string, options?: any): AxiosPromise<EbookOutput> {
            return localVarFp.ebookBySlug(slug, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        fixEBookStructure(options?: any): AxiosPromise<void> {
            return localVarFp.fixEBookStructure(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storedEbookBySlug(slug: string, options?: any): AxiosPromise<Array<StoredEBook>> {
            return localVarFp.storedEbookBySlug(slug, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * EbookApi - object-oriented interface
 * @export
 * @class EbookApi
 * @extends {BaseAPI}
 */
export class EbookApi extends BaseAPI {
    /**
     * 
     * @param {string} slug 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EbookApi
     */
    public ebookBySlug(slug: string, options?: RawAxiosRequestConfig) {
        return EbookApiFp(this.configuration).ebookBySlug(slug, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EbookApi
     */
    public fixEBookStructure(options?: RawAxiosRequestConfig) {
        return EbookApiFp(this.configuration).fixEBookStructure(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} slug 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EbookApi
     */
    public storedEbookBySlug(slug: string, options?: RawAxiosRequestConfig) {
        return EbookApiFp(this.configuration).storedEbookBySlug(slug, options).then((request) => request(this.axios, this.basePath));
    }
}

