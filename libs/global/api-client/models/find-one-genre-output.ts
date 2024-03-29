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

// May contain unused imports in some cases
// @ts-ignore
import { ShortBook } from './short-book'

/**
 *
 * @export
 * @interface FindOneGenreOutput
 */
export interface FindOneGenreOutput {
	/**
	 * genre slug
	 * @type {string}
	 * @memberof FindOneGenreOutput
	 */
	slug: string
	/**
	 * genre name
	 * @type {string}
	 * @memberof FindOneGenreOutput
	 */
	name: string
	/**
	 *
	 * @type {Array<ShortBook>}
	 * @memberof FindOneGenreOutput
	 */
	mainBooks: Array<ShortBook>
}
