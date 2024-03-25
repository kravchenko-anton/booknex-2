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
  setSearchParams,
  toPathString
} from '../common';
// @ts-ignore
import { BASE_PATH, BaseAPI, RequestArgs, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import { AuthDto } from '../models';
// @ts-ignore
import { AuthOutput } from '../models';
// @ts-ignore
import { GoogleAuthDto } from '../models';
// @ts-ignore
import { RefreshDto } from '../models';
/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     *
     * @param {GoogleAuthDto} googleAuthDto Sign in with google account
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    googleSign: async (
      googleAuthDto: GoogleAuthDto,
      options: RawAxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'googleAuthDto' is not null or undefined
      assertParamExists('googleSign', 'googleAuthDto', googleAuthDto);
      const localVarPath = `/api/auth/google-sign`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        googleAuthDto,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     *
     * @param {AuthDto} authDto Login user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    mailLogin: async (
      authDto: AuthDto,
      options: RawAxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'authDto' is not null or undefined
      assertParamExists('mailLogin', 'authDto', authDto);
      const localVarPath = `/api/auth/mail-login`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        authDto,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     *
     * @param {AuthDto} authDto Register new user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    mailRegister: async (
      authDto: AuthDto,
      options: RawAxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'authDto' is not null or undefined
      assertParamExists('mailRegister', 'authDto', authDto);
      const localVarPath = `/api/auth/mail-register`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        authDto,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     *
     * @param {RefreshDto} refreshDto Refresh access token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    refreshToken: async (
      refreshDto: RefreshDto,
      options: RawAxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'refreshDto' is not null or undefined
      assertParamExists('refreshToken', 'refreshDto', refreshDto);
      const localVarPath = `/api/auth/refresh`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        refreshDto,
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
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {GoogleAuthDto} googleAuthDto Sign in with google account
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async googleSign(
      googleAuthDto: GoogleAuthDto,
      options?: RawAxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthOutput>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.googleSign(googleAuthDto, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap['AuthApi.googleSign']?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {AuthDto} authDto Login user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async mailLogin(
      authDto: AuthDto,
      options?: RawAxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthOutput>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.mailLogin(authDto, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap['AuthApi.mailLogin']?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {AuthDto} authDto Register new user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async mailRegister(
      authDto: AuthDto,
      options?: RawAxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthOutput>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.mailRegister(authDto, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap['AuthApi.mailRegister']?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {RefreshDto} refreshDto Refresh access token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async refreshToken(
      refreshDto: RefreshDto,
      options?: RawAxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthOutput>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.refreshToken(refreshDto, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap['AuthApi.refreshToken']?.[localVarOperationServerIndex]?.url;
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
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = AuthApiFp(configuration);
  return {
    /**
     *
     * @param {GoogleAuthDto} googleAuthDto Sign in with google account
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    googleSign(googleAuthDto: GoogleAuthDto, options?: any): AxiosPromise<AuthOutput> {
      return localVarFp
        .googleSign(googleAuthDto, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {AuthDto} authDto Login user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    mailLogin(authDto: AuthDto, options?: any): AxiosPromise<AuthOutput> {
      return localVarFp.mailLogin(authDto, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {AuthDto} authDto Register new user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    mailRegister(authDto: AuthDto, options?: any): AxiosPromise<AuthOutput> {
      return localVarFp.mailRegister(authDto, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {RefreshDto} refreshDto Refresh access token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    refreshToken(refreshDto: RefreshDto, options?: any): AxiosPromise<AuthOutput> {
      return localVarFp
        .refreshToken(refreshDto, options)
        .then((request) => request(axios, basePath));
    }
  };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
  /**
   *
   * @param {GoogleAuthDto} googleAuthDto Sign in with google account
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthApi
   */
  public googleSign(googleAuthDto: GoogleAuthDto, options?: RawAxiosRequestConfig) {
    return AuthApiFp(this.configuration)
      .googleSign(googleAuthDto, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {AuthDto} authDto Login user
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthApi
   */
  public mailLogin(authDto: AuthDto, options?: RawAxiosRequestConfig) {
    return AuthApiFp(this.configuration)
      .mailLogin(authDto, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {AuthDto} authDto Register new user
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthApi
   */
  public mailRegister(authDto: AuthDto, options?: RawAxiosRequestConfig) {
    return AuthApiFp(this.configuration)
      .mailRegister(authDto, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {RefreshDto} refreshDto Refresh access token
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthApi
   */
  public refreshToken(refreshDto: RefreshDto, options?: RawAxiosRequestConfig) {
    return AuthApiFp(this.configuration)
      .refreshToken(refreshDto, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
