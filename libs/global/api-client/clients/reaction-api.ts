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
import { CreateReaction } from '../models';
// @ts-ignore
import { ReactionByBookOutput } from '../models';
// @ts-ignore
import { ReactionListOutput } from '../models';
// @ts-ignore
import { UpdateReaction } from '../models';
/**
 * ReactionApi - axios parameter creator
 * @export
 */
export const ReactionApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CreateReaction} createReaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        create: async (createReaction: CreateReaction, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createReaction' is not null or undefined
            assertParamExists('create', 'createReaction', createReaction)
            const localVarPath = `/reaction/create`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createReaction, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} bookSlug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        reactionByBook: async (bookSlug: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'bookSlug' is not null or undefined
            assertParamExists('reactionByBook', 'bookSlug', bookSlug)
            const localVarPath = `/reaction/reaction-by-bookId/{id}`
                .replace(`{${"bookSlug"}}`, encodeURIComponent(String(bookSlug)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
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
        reactionList: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/reaction/reaction-list`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
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
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remove: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('remove', 'id', id)
            const localVarPath = `/reaction/delete/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
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
         * @param {UpdateReaction} updateReaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        update: async (updateReaction: UpdateReaction, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'updateReaction' is not null or undefined
            assertParamExists('update', 'updateReaction', updateReaction)
            const localVarPath = `/reaction/update`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateReaction, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ReactionApi - functional programming interface
 * @export
 */
export const ReactionApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ReactionApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {CreateReaction} createReaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async create(createReaction: CreateReaction, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.create(createReaction, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ReactionApi.create']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} bookSlug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async reactionByBook(bookSlug: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ReactionByBookOutput>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.reactionByBook(bookSlug, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ReactionApi.reactionByBook']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async reactionList(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ReactionListOutput>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.reactionList(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ReactionApi.reactionList']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remove(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remove(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ReactionApi.remove']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {UpdateReaction} updateReaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async update(updateReaction: UpdateReaction, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.update(updateReaction, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ReactionApi.update']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * ReactionApi - factory interface
 * @export
 */
export const ReactionApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ReactionApiFp(configuration)
    return {
        /**
         * 
         * @param {CreateReaction} createReaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        create(createReaction: CreateReaction, options?: any): AxiosPromise<void> {
            return localVarFp.create(createReaction, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} bookSlug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        reactionByBook(bookSlug: string, options?: any): AxiosPromise<Array<ReactionByBookOutput>> {
            return localVarFp.reactionByBook(bookSlug, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        reactionList(options?: any): AxiosPromise<Array<ReactionListOutput>> {
            return localVarFp.reactionList(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remove(id: string, options?: any): AxiosPromise<void> {
            return localVarFp.remove(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {UpdateReaction} updateReaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        update(updateReaction: UpdateReaction, options?: any): AxiosPromise<void> {
            return localVarFp.update(updateReaction, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ReactionApi - object-oriented interface
 * @export
 * @class ReactionApi
 * @extends {BaseAPI}
 */
export class ReactionApi extends BaseAPI {
    /**
     * 
     * @param {CreateReaction} createReaction 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReactionApi
     */
    public create(createReaction: CreateReaction, options?: RawAxiosRequestConfig) {
        return ReactionApiFp(this.configuration).create(createReaction, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} bookSlug 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReactionApi
     */
    public reactionByBook(bookSlug: string, options?: RawAxiosRequestConfig) {
        return ReactionApiFp(this.configuration).reactionByBook(bookSlug, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReactionApi
     */
    public reactionList(options?: RawAxiosRequestConfig) {
        return ReactionApiFp(this.configuration).reactionList(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReactionApi
     */
    public remove(id: string, options?: RawAxiosRequestConfig) {
        return ReactionApiFp(this.configuration).remove(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {UpdateReaction} updateReaction 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReactionApi
     */
    public update(updateReaction: UpdateReaction, options?: RawAxiosRequestConfig) {
        return ReactionApiFp(this.configuration).update(updateReaction, options).then((request) => request(this.axios, this.basePath));
    }
}

