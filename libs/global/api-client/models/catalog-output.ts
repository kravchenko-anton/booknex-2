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
import { CatalogOutputDataInner } from './catalog-output-data-inner'

/**
 *
 * @export
 * @interface CatalogOutput
 */
export interface CatalogOutput {
	/**
	 *
	 * @type {Array<CatalogOutputDataInner>}
	 * @memberof CatalogOutput
	 */
	data: Array<CatalogOutputDataInner>
	/**
	 *
	 * @type {boolean}
	 * @memberof CatalogOutput
	 */
	canLoadMore: boolean
	/**
	 *
	 * @type {number}
	 * @memberof CatalogOutput
	 */
	totalPages: number
}
