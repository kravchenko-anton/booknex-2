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
import { Book } from './book'

/**
 *
 * @export
 * @interface CatalogOutput
 */
export interface CatalogOutput {
	/**
	 * can load more
	 * @type {boolean}
	 * @memberof CatalogOutput
	 */
	canLoadMore: boolean
	/**
	 * total pages
	 * @type {number}
	 * @memberof CatalogOutput
	 */
	totalPages: number
	/**
	 *
	 * @type {Array<Book>}
	 * @memberof CatalogOutput
	 */
	data: Array<Book>
}
