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
import { AdminInfoByIdOutput } from '../models';
// @ts-ignore
import { CatalogOutput } from '../models';
// @ts-ignore
import { CreateBookDto } from '../models';
// @ts-ignore
import { InfoByIdOutput } from '../models';
// @ts-ignore
import { PayloadEBook } from '../models';
// @ts-ignore
import { UpdateBookDto } from '../models';
// @ts-ignore
import { UpdateGenreDto } from '../models';
/**
 * BookApi - axios parameter creator
 * @export
 */
export const BookApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        adminInfoById: async (id: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('adminInfoById', 'id', id)
            const localVarPath = `/api/book/admin-info/by-id/{id}`
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
            const localVarPath = `/api/book/admin/catalog`;
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
            const localVarPath = `/api/book/admin/create`;
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
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        infoById: async (id: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('infoById', 'id', id)
            const localVarPath = `/api/book/info/by-id/{id}`
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
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remove: async (id: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('remove', 'id', id)
            const localVarPath = `/api/book/admin/remove/{id}`
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
         * @param {number} id 
         * @param {UpdateBookDto} updateBookDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        update: async (id: number, updateBookDto: UpdateBookDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('update', 'id', id)
            // verify required parameter 'updateBookDto' is not null or undefined
            assertParamExists('update', 'updateBookDto', updateBookDto)
            const localVarPath = `/api/book/admin/update/{id}`
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
        /**
         * 
         * @param {number} id 
         * @param {Array<PayloadEBook>} payloadEBook 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateEbook: async (id: number, payloadEBook: Array<PayloadEBook>, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateEbook', 'id', id)
            // verify required parameter 'payloadEBook' is not null or undefined
            assertParamExists('updateEbook', 'payloadEBook', payloadEBook)
            const localVarPath = `/api/book/admin/update-ebook/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
            localVarRequestOptions.data = serializeDataIfNeeded(payloadEBook, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {UpdateGenreDto} updateGenreDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateGenre: async (id: number, updateGenreDto: UpdateGenreDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateGenre', 'id', id)
            // verify required parameter 'updateGenreDto' is not null or undefined
            assertParamExists('updateGenre', 'updateGenreDto', updateGenreDto)
            const localVarPath = `/api/book/admin/update-genre/{id}`
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


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateGenreDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {File} picture picture
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePicture: async (id: number, picture: File, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updatePicture', 'id', id)
            // verify required parameter 'picture' is not null or undefined
            assertParamExists('updatePicture', 'picture', picture)
            const localVarPath = `/api/book/admin/update-picture/{id}`
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
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


            if (picture !== undefined) { 
                localVarFormParams.append('picture', picture as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

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
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async adminInfoById(id: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AdminInfoByIdOutput>> {
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
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async infoById(id: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InfoByIdOutput>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.infoById(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BookApi.infoById']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async remove(id: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.remove(id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BookApi.remove']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {number} id 
         * @param {UpdateBookDto} updateBookDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async update(id: number, updateBookDto: UpdateBookDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.update(id, updateBookDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BookApi.update']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {number} id 
         * @param {Array<PayloadEBook>} payloadEBook 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateEbook(id: number, payloadEBook: Array<PayloadEBook>, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateEbook(id, payloadEBook, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BookApi.updateEbook']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {number} id 
         * @param {UpdateGenreDto} updateGenreDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateGenre(id: number, updateGenreDto: UpdateGenreDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateGenre(id, updateGenreDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BookApi.updateGenre']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {number} id 
         * @param {File} picture picture
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updatePicture(id: number, picture: File, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updatePicture(id, picture, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BookApi.updatePicture']?.[localVarOperationServerIndex]?.url;
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
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        adminInfoById(id: number, options?: any): AxiosPromise<AdminInfoByIdOutput> {
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
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        infoById(id: number, options?: any): AxiosPromise<InfoByIdOutput> {
            return localVarFp.infoById(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        remove(id: number, options?: any): AxiosPromise<void> {
            return localVarFp.remove(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {UpdateBookDto} updateBookDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        update(id: number, updateBookDto: UpdateBookDto, options?: any): AxiosPromise<void> {
            return localVarFp.update(id, updateBookDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {Array<PayloadEBook>} payloadEBook 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateEbook(id: number, payloadEBook: Array<PayloadEBook>, options?: any): AxiosPromise<void> {
            return localVarFp.updateEbook(id, payloadEBook, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {UpdateGenreDto} updateGenreDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateGenre(id: number, updateGenreDto: UpdateGenreDto, options?: any): AxiosPromise<void> {
            return localVarFp.updateGenre(id, updateGenreDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {File} picture picture
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePicture(id: number, picture: File, options?: any): AxiosPromise<void> {
            return localVarFp.updatePicture(id, picture, options).then((request) => request(axios, basePath));
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
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookApi
     */
    public adminInfoById(id: number, options?: RawAxiosRequestConfig) {
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
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookApi
     */
    public infoById(id: number, options?: RawAxiosRequestConfig) {
        return BookApiFp(this.configuration).infoById(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookApi
     */
    public remove(id: number, options?: RawAxiosRequestConfig) {
        return BookApiFp(this.configuration).remove(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} id 
     * @param {UpdateBookDto} updateBookDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookApi
     */
    public update(id: number, updateBookDto: UpdateBookDto, options?: RawAxiosRequestConfig) {
        return BookApiFp(this.configuration).update(id, updateBookDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} id 
     * @param {Array<PayloadEBook>} payloadEBook 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookApi
     */
    public updateEbook(id: number, payloadEBook: Array<PayloadEBook>, options?: RawAxiosRequestConfig) {
        return BookApiFp(this.configuration).updateEbook(id, payloadEBook, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} id 
     * @param {UpdateGenreDto} updateGenreDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookApi
     */
    public updateGenre(id: number, updateGenreDto: UpdateGenreDto, options?: RawAxiosRequestConfig) {
        return BookApiFp(this.configuration).updateGenre(id, updateGenreDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} id 
     * @param {File} picture picture
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BookApi
     */
    public updatePicture(id: number, picture: File, options?: RawAxiosRequestConfig) {
        return BookApiFp(this.configuration).updatePicture(id, picture, options).then((request) => request(this.axios, this.basePath));
    }
}

