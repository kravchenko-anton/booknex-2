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
import { ReadingHistory } from '../models';
// @ts-ignore
import { UserCatalogOutput } from '../models';
// @ts-ignore
import { UserLibraryOutput } from '../models';
// @ts-ignore
import { UserStatistics } from '../models';
/**
 * UserApi - axios parameter creator
 * @export
 */
export const UserApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} goal 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        adjustGoal: async (goal: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'goal' is not null or undefined
            assertParamExists('adjustGoal', 'goal', goal)
            const localVarPath = `/user/adjust-goal`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (goal !== undefined) {
                localVarQueryParameter['goal'] = goal;
            }


    
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
         * @param {string} searchTerm 
         * @param {number} cursor 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        catalog: async (searchTerm: string, cursor: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'searchTerm' is not null or undefined
            assertParamExists('catalog', 'searchTerm', searchTerm)
            // verify required parameter 'cursor' is not null or undefined
            assertParamExists('catalog', 'cursor', cursor)
            const localVarPath = `/user/admin/catalog`;
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

            if (searchTerm !== undefined) {
                localVarQueryParameter['searchTerm'] = searchTerm;
            }

            if (cursor !== undefined) {
                localVarQueryParameter['cursor'] = cursor;
            }


    
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
        finishReading: async (slug: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'slug' is not null or undefined
            assertParamExists('finishReading', 'slug', slug)
            const localVarPath = `/user/finish-reading/{slug}`
                .replace(`{${"slug"}}`, encodeURIComponent(String(slug)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
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
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        isSaved: async (slug: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'slug' is not null or undefined
            assertParamExists('isSaved', 'slug', slug)
            const localVarPath = `/user/is-saved/{slug}`
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
         * @param {Array<ReadingHistory>} readingHistory 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        library: async (readingHistory: Array<ReadingHistory>, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'readingHistory' is not null or undefined
            assertParamExists('library', 'readingHistory', readingHistory)
            const localVarPath = `/user/library`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(readingHistory, localVarRequestOptions, configuration)

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
            const localVarPath = `/user/admin/remove/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
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
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeFromLibrary: async (slug: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'slug' is not null or undefined
            assertParamExists('removeFromLibrary', 'slug', slug)
            const localVarPath = `/user/remove-from-library/{slug}`
                .replace(`{${"slug"}}`, encodeURIComponent(String(slug)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
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
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        startReading: async (slug: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'slug' is not null or undefined
            assertParamExists('startReading', 'slug', slug)
            const localVarPath = `/user/start-reading/{slug}`
                .replace(`{${"slug"}}`, encodeURIComponent(String(slug)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
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
         * @param {Array<ReadingHistory>} readingHistory 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        statistics: async (readingHistory: Array<ReadingHistory>, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'readingHistory' is not null or undefined
            assertParamExists('statistics', 'readingHistory', readingHistory)
            const localVarPath = `/user/statistics`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(readingHistory, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {Array<ReadingHistory>} readingHistory 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        syncHistory: async (readingHistory: Array<ReadingHistory>, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'readingHistory' is not null or undefined
            assertParamExists('syncHistory', 'readingHistory', readingHistory)
            const localVarPath = `/user/sync-history`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(readingHistory, localVarRequestOptions, configuration)

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
        toggleSave: async (slug: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'slug' is not null or undefined
            assertParamExists('toggleSave', 'slug', slug)
            const localVarPath = `/user/toggle-save/{slug}`
                .replace(`{${"slug"}}`, encodeURIComponent(String(slug)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
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
    }
};

/**
 * UserApi - functional programming interface
 * @export
 */
export const UserApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {number} goal 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async adjustGoal(goal: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.adjustGoal(goal, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserApi.adjustGoal']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} searchTerm 
         * @param {number} cursor 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async catalog(searchTerm: string, cursor: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserCatalogOutput>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.catalog(searchTerm, cursor, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserApi.catalog']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async finishReading(slug: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.finishReading(slug, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserApi.finishReading']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async isSaved(slug: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<boolean>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.isSaved(slug, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserApi.isSaved']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {Array<ReadingHistory>} readingHistory 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async library(readingHistory: Array<ReadingHistory>, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserLibraryOutput>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.library(readingHistory, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserApi.library']?.[localVarOperationServerIndex]?.url;
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
            const localVarOperationServerBasePath = operationServerMap['UserApi.remove']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeFromLibrary(slug: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeFromLibrary(slug, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserApi.removeFromLibrary']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async startReading(slug: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.startReading(slug, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserApi.startReading']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {Array<ReadingHistory>} readingHistory 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async statistics(readingHistory: Array<ReadingHistory>, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserStatistics>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.statistics(readingHistory, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserApi.statistics']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {Array<ReadingHistory>} readingHistory 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async syncHistory(readingHistory: Array<ReadingHistory>, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.syncHistory(readingHistory, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserApi.syncHistory']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async toggleSave(slug: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<boolean>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.toggleSave(slug, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserApi.toggleSave']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * UserApi - factory interface
 * @export
 */
export const UserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserApiFp(configuration)
    return {
        /**
         * 
         * @param {number} goal 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        adjustGoal(goal: number, options?: any): AxiosPromise<void> {
            return localVarFp.adjustGoal(goal, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} searchTerm 
         * @param {number} cursor 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        catalog(searchTerm: string, cursor: number, options?: any): AxiosPromise<UserCatalogOutput> {
            return localVarFp.catalog(searchTerm, cursor, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        finishReading(slug: string, options?: any): AxiosPromise<void> {
            return localVarFp.finishReading(slug, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        isSaved(slug: string, options?: any): AxiosPromise<boolean> {
            return localVarFp.isSaved(slug, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {Array<ReadingHistory>} readingHistory 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        library(readingHistory: Array<ReadingHistory>, options?: any): AxiosPromise<UserLibraryOutput> {
            return localVarFp.library(readingHistory, options).then((request) => request(axios, basePath));
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
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeFromLibrary(slug: string, options?: any): AxiosPromise<void> {
            return localVarFp.removeFromLibrary(slug, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        startReading(slug: string, options?: any): AxiosPromise<void> {
            return localVarFp.startReading(slug, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {Array<ReadingHistory>} readingHistory 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        statistics(readingHistory: Array<ReadingHistory>, options?: any): AxiosPromise<UserStatistics> {
            return localVarFp.statistics(readingHistory, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {Array<ReadingHistory>} readingHistory 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        syncHistory(readingHistory: Array<ReadingHistory>, options?: any): AxiosPromise<void> {
            return localVarFp.syncHistory(readingHistory, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toggleSave(slug: string, options?: any): AxiosPromise<boolean> {
            return localVarFp.toggleSave(slug, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export class UserApi extends BaseAPI {
    /**
     * 
     * @param {number} goal 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public adjustGoal(goal: number, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).adjustGoal(goal, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} searchTerm 
     * @param {number} cursor 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public catalog(searchTerm: string, cursor: number, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).catalog(searchTerm, cursor, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} slug 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public finishReading(slug: string, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).finishReading(slug, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} slug 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public isSaved(slug: string, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).isSaved(slug, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {Array<ReadingHistory>} readingHistory 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public library(readingHistory: Array<ReadingHistory>, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).library(readingHistory, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public remove(id: string, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).remove(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} slug 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public removeFromLibrary(slug: string, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).removeFromLibrary(slug, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} slug 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public startReading(slug: string, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).startReading(slug, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {Array<ReadingHistory>} readingHistory 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public statistics(readingHistory: Array<ReadingHistory>, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).statistics(readingHistory, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {Array<ReadingHistory>} readingHistory 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public syncHistory(readingHistory: Array<ReadingHistory>, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).syncHistory(readingHistory, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} slug 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public toggleSave(slug: string, options?: RawAxiosRequestConfig) {
        return UserApiFp(this.configuration).toggleSave(slug, options).then((request) => request(this.axios, this.basePath));
    }
}

