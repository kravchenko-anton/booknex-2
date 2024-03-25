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

import type { AxiosInstance, AxiosPromise, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
import type { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  createRequestFunction,
  serializeDataIfNeeded,
  setBearerAuthToObject,
  setSearchParams,
  toPathString
} from '../common';
// @ts-ignore
import { BASE_PATH, BaseAPI, RequestArgs, RequiredError, operationServerMap } from '../base';
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
     * @param {number} id
     * @param {ReviewBookDto} reviewBookDto Review book
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    review: async (
      id: number,
      reviewBookDto: ReviewBookDto,
      options: RawAxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists('review', 'id', id);
      // verify required parameter 'reviewBookDto' is not null or undefined
      assertParamExists('review', 'reviewBookDto', reviewBookDto);
      const localVarPath = `/api/review/review/{id}`.replace(
        `{${'id'}}`,
        encodeURIComponent(String(id))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearer required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        reviewBookDto,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};

/**
 * ReviewApi - functional programming interface
 * @export
 */
export const ReviewApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = ReviewApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {number} id
     * @param {ReviewBookDto} reviewBookDto Review book
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async review(
      id: number,
      reviewBookDto: ReviewBookDto,
      options?: RawAxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.review(id, reviewBookDto, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap['ReviewApi.review']?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration
        )(axios, localVarOperationServerBasePath || basePath);
    }
  };
};

/**
 * ReviewApi - factory interface
 * @export
 */
export const ReviewApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = ReviewApiFp(configuration);
  return {
    /**
     *
     * @param {number} id
     * @param {ReviewBookDto} reviewBookDto Review book
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    review(id: number, reviewBookDto: ReviewBookDto, options?: any): AxiosPromise<void> {
      return localVarFp
        .review(id, reviewBookDto, options)
        .then((request) => request(axios, basePath));
    }
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
   * @param {number} id
   * @param {ReviewBookDto} reviewBookDto Review book
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ReviewApi
   */
  public review(id: number, reviewBookDto: ReviewBookDto, options?: RawAxiosRequestConfig) {
    return ReviewApiFp(this.configuration)
      .review(id, reviewBookDto, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
