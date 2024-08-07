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
import { CatalogOutput } from '../models';
// @ts-ignore
import { CreateBookDto } from '../models';
// @ts-ignore
import { FullBook } from '../models';
// @ts-ignore
import { InfoBySlug } from '../models';
// @ts-ignore
import { UpdateBookDto } from '../models';
/**
 * BookApi - axios parameter creator
 * @export
 */
export const BookApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        adminInfoById: async (id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('adminInfoById', 'id', id)
            const localVarPath = `/book/admin-info/by-id/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
         * @param {string} searchTerm 
         * @param {number} page 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        catalog: async (searchTerm: string, page: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'searchTerm' is not null or undefined
            assertParamExists('catalog', 'searchTerm', searchTerm)
            // verify required parameter 'page' is not null or undefined
            assertParamExists('catalog', 'page', page)
            const localVarPath = `/book/admin/catalog`;
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

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
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
         * @param {CreateBookDto} createBookDto Create book
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        create: async (createBookDto: CreateBookDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createBookDto' is not null or undefined
            assertParamExists('create', 'createBookDto', createBookDto)
            const localVarPath = `/book/admin/create`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createBookDto, localVarRequestOptions, configuration)

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
        infoBySlug: async (slug: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'slug' is not null or undefined
            assertParamExists('infoBySlug', 'slug', slug)
            const localVarPath = `/book/info/by-slug/{slug}`
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
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remove: async (slug: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'slug' is not null or undefined
            assertParamExists('remove', 'slug', slug)
            const localVarPath = `/book/admin/remove/{slug}`
                .replace(`{${"slug"}}`, encodeURIComponent(String(slug)));
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
         * @param {UpdateBookDto} updateBookDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        update: async (slug: string, updateBookDto: UpdateBookDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'slug' is not null or undefined
            assertParamExists('update', 'slug', slug)
            // verify required parameter 'updateBookDto' is not null or undefined
            assertParamExists('update', 'updateBookDto', updateBookDto)
            const localVarPath = `/book/admin/update/{slug}`
                .replace(`{${"slug"}}`, encodeURIComponent(String(slug)));
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


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateBookDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * BookApi - functional programming interface
 * @export
 */
export const BookApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = BookApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async adminInfoById(id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FullBook>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.adminInfoById(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BookApi.adminInfoById']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} searchTerm 
         * @param {number} page 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async catalog(searchTerm: string, page: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CatalogOutput>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.catalog(searchTerm, page, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BookApi.catalog']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {CreateBookDto} createBookDto Create book
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async create(createBookDto: CreateBookDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.create(createBookDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BookApi.create']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async infoBySlug(slug: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InfoBySlug>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.infoBySlug(slug, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BookApi.infoBySlug']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remove(slug: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remove(slug, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BookApi.remove']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {string} slug 
         * @param {UpdateBookDto} updateBookDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async update(slug: string, updateBookDto: UpdateBookDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.update(slug, updateBookDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BookApi.update']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * BookApi - factory interface
 * @export
 */
export const BookApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = BookApiFp(configuration)
    return {
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        adminInfoById(id: string, options?: any): AxiosPromise<FullBook> {
            return localVarFp.adminInfoById(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} searchTerm 
         * @param {number} page 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        catalog(searchTerm: string, page: number, options?: any): AxiosPromise<CatalogOutput> {
            return localVarFp.catalog(searchTerm, page, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {CreateBookDto} createBookDto Create book
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        create(createBookDto: CreateBookDto, options?: any): AxiosPromise<void> {
            return localVarFp.create(createBookDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        infoBySlug(slug: string, options?: any): AxiosPromise<InfoBySlug> {
            return localVarFp.infoBySlug(slug, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} slug 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remove(slug: string, options?: any): AxiosPromise<void> {
            return localVarFp.remove(slug, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} slug 
         * @param {UpdateBookDto} updateBookDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        update(slug: string, updateBookDto: UpdateBookDto, options?: any): AxiosPromise<void> {
            return localVarFp.update(slug, updateBookDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * BookApi - object-oriented interface
 * @export
 * @class BookApi
 * @extends {BaseAPI}
 */
export class BookApi extends BaseAPI {
    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookApi
     */
    public adminInfoById(id: string, options?: RawAxiosRequestConfig) {
        return BookApiFp(this.configuration).adminInfoById(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} searchTerm 
     * @param {number} page 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookApi
     */
    public catalog(searchTerm: string, page: number, options?: RawAxiosRequestConfig) {
        return BookApiFp(this.configuration).catalog(searchTerm, page, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {CreateBookDto} createBookDto Create book
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookApi
     */
    public create(createBookDto: CreateBookDto, options?: RawAxiosRequestConfig) {
        return BookApiFp(this.configuration).create(createBookDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} slug 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookApi
     */
    public infoBySlug(slug: string, options?: RawAxiosRequestConfig) {
        return BookApiFp(this.configuration).infoBySlug(slug, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} slug 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookApi
     */
    public remove(slug: string, options?: RawAxiosRequestConfig) {
        return BookApiFp(this.configuration).remove(slug, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} slug 
     * @param {UpdateBookDto} updateBookDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookApi
     */
    public update(slug: string, updateBookDto: UpdateBookDto, options?: RawAxiosRequestConfig) {
        return BookApiFp(this.configuration).update(slug, updateBookDto, options).then((request) => request(this.axios, this.basePath));
    }
}

