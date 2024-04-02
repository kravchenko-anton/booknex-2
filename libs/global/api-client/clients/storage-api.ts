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
import { UploadOutputDto } from '../models';
/**
 * StorageApi - axios parameter creator
 * @export
 */
export const StorageApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {UploadFolderEnum} folder 
         * @param {File} [file] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        upload: async (folder: UploadFolderEnum, file?: File, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'folder' is not null or undefined
            assertParamExists('upload', 'folder', folder)
            const localVarPath = `/api/v1/storage/{folder}`
                .replace(`{${"folder"}}`, encodeURIComponent(String(folder)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


            if (file !== undefined) { 
                localVarFormParams.append('file', file as any);
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
 * StorageApi - functional programming interface
 * @export
 */
export const StorageApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = StorageApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {UploadFolderEnum} folder 
         * @param {File} [file] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async upload(folder: UploadFolderEnum, file?: File, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UploadOutputDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.upload(folder, file, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['StorageApi.upload']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * StorageApi - factory interface
 * @export
 */
export const StorageApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = StorageApiFp(configuration)
    return {
        /**
         * 
         * @param {UploadFolderEnum} folder 
         * @param {File} [file] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        upload(folder: UploadFolderEnum, file?: File, options?: any): AxiosPromise<UploadOutputDto> {
            return localVarFp.upload(folder, file, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * StorageApi - object-oriented interface
 * @export
 * @class StorageApi
 * @extends {BaseAPI}
 */
export class StorageApi extends BaseAPI {
    /**
     * 
     * @param {UploadFolderEnum} folder 
     * @param {File} [file] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StorageApi
     */
    public upload(folder: UploadFolderEnum, file?: File, options?: RawAxiosRequestConfig) {
        return StorageApiFp(this.configuration).upload(folder, file, options).then((request) => request(this.axios, this.basePath));
    }
}

/**
 * @export
 */
export const UploadFolderEnum = {
    Ebooks: 'ebooks',
    BooksCovers: 'booksCovers'
} as const;
export type UploadFolderEnum = typeof UploadFolderEnum[keyof typeof UploadFolderEnum];
