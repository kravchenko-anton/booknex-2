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
import { ReviewBookDto } from '../models';
/**
 * ReviewApi - axios parameter creator
 * @export
 */
export const ReviewApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} slug 
         * @param {ReviewBookDto} reviewBookDto Review book
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        review: async (slug: string, reviewBookDto: ReviewBookDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'slug' is not null or undefined
            assertParamExists('review', 'slug', slug)
            // verify required parameter 'reviewBookDto' is not null or undefined
            assertParamExists('review', 'reviewBookDto', reviewBookDto)
            const localVarPath = `/review/review/{slug}`
                .replace(`{${"slug"}}`, encodeURIComponent(String(slug)));
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
            localVarRequestOptions.data = serializeDataIfNeeded(reviewBookDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ReviewApi - functional programming interface
 * @export
 */
export const ReviewApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ReviewApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} slug 
         * @param {ReviewBookDto} reviewBookDto Review book
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async review(slug: string, reviewBookDto: ReviewBookDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.review(slug, reviewBookDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ReviewApi.review']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * ReviewApi - factory interface
 * @export
 */
export const ReviewApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ReviewApiFp(configuration)
    return {
        /**
         * 
         * @param {string} slug 
         * @param {ReviewBookDto} reviewBookDto Review book
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        review(slug: string, reviewBookDto: ReviewBookDto, options?: any): AxiosPromise<void> {
            return localVarFp.review(slug, reviewBookDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ReviewApi - object-oriented interface
 * @export
 * @class ReviewApi
 * @extends {BaseAPI}
 */
export class ReviewApi extends BaseAPI {
    /**
     * 
     * @param {string} slug 
     * @param {ReviewBookDto} reviewBookDto Review book
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReviewApi
     */
    public review(slug: string, reviewBookDto: ReviewBookDto, options?: RawAxiosRequestConfig) {
        return ReviewApiFp(this.configuration).review(slug, reviewBookDto, options).then((request) => request(this.axios, this.basePath));
    }
}

