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
import { GptExplain } from '../models';
// @ts-ignore
import { TranslateText } from '../models';
/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {GptExplain} gptExplain 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gptExplain: async (gptExplain: GptExplain, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'gptExplain' is not null or undefined
            assertParamExists('gptExplain', 'gptExplain', gptExplain)
            const localVarPath = `/reading/gpt-explain`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(gptExplain, localVarRequestOptions, configuration)

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
        index: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/app-metrics`;
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
         * @param {TranslateText} translateText 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        translate: async (translateText: TranslateText, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'translateText' is not null or undefined
            assertParamExists('translate', 'translateText', translateText)
            const localVarPath = `/reading/translate`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(translateText, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {GptExplain} gptExplain 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gptExplain(gptExplain: GptExplain, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.gptExplain(gptExplain, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.gptExplain']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async index(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.index(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.index']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {TranslateText} translateText 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async translate(translateText: TranslateText, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.translate(translateText, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.translate']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @param {GptExplain} gptExplain 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gptExplain(gptExplain: GptExplain, options?: any): AxiosPromise<void> {
            return localVarFp.gptExplain(gptExplain, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        index(options?: any): AxiosPromise<void> {
            return localVarFp.index(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {TranslateText} translateText 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        translate(translateText: TranslateText, options?: any): AxiosPromise<void> {
            return localVarFp.translate(translateText, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @param {GptExplain} gptExplain 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public gptExplain(gptExplain: GptExplain, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).gptExplain(gptExplain, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public index(options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).index(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {TranslateText} translateText 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public translate(translateText: TranslateText, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).translate(translateText, options).then((request) => request(this.axios, this.basePath));
    }
}

