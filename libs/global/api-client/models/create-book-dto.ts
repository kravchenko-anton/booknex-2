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
import { PayloadEBook } from './payload-ebook'
// May contain unused imports in some cases
// @ts-ignore
import { ShortGenre } from './short-genre'

/**
 *
 * @export
 * @interface CreateBookDto
 */
export interface CreateBookDto {
	/**
	 * book title
	 * @type {string}
	 * @memberof CreateBookDto
	 */
	title: string
	/**
	 * book picture
	 * @type {string}
	 * @memberof CreateBookDto
	 */
	picture: string
	/**
	 * book author
	 * @type {string}
	 * @memberof CreateBookDto
	 */
	author: string
	/**
	 * book description
	 * @type {string}
	 * @memberof CreateBookDto
	 */
	description: string
	/**
	 * book rating
	 * @type {number}
	 * @memberof CreateBookDto
	 */
	rating: number
	/**
	 *
	 * @type {Array<ShortGenre>}
	 * @memberof CreateBookDto
	 */
	genres: Array<ShortGenre>
	/**
	 *
	 * @type {Array<PayloadEBook>}
	 * @memberof CreateBookDto
	 */
	ebook: Array<PayloadEBook>
}
