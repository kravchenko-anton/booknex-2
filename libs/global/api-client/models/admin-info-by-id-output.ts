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
import { Activity } from './activity'
// May contain unused imports in some cases
// @ts-ignore
import { BookCount } from './book-count'
// May contain unused imports in some cases
// @ts-ignore
import { Review } from './review'
// May contain unused imports in some cases
// @ts-ignore
import { ShortGenre } from './short-genre'

/**
 *
 * @export
 * @interface AdminInfoByIdOutput
 */
export interface AdminInfoByIdOutput {
	/**
	 * book id
	 * @type {number}
	 * @memberof AdminInfoByIdOutput
	 */
	id: number
	/**
	 * book title
	 * @type {string}
	 * @memberof AdminInfoByIdOutput
	 */
	title: string
	/**
	 * book picture
	 * @type {string}
	 * @memberof AdminInfoByIdOutput
	 */
	picture: string
	/**
	 * book author
	 * @type {string}
	 * @memberof AdminInfoByIdOutput
	 */
	author: string
	/**
	 * book description
	 * @type {string}
	 * @memberof AdminInfoByIdOutput
	 */
	description: string
	/**
	 * book readingTime
	 * @type {number}
	 * @memberof AdminInfoByIdOutput
	 */
	readingTime: number
	/**
	 * book chapters count
	 * @type {number}
	 * @memberof AdminInfoByIdOutput
	 */
	chapters: number
	/**
	 * book rating
	 * @type {number}
	 * @memberof AdminInfoByIdOutput
	 */
	rating: number
	/**
	 * book visibility
	 * @type {boolean}
	 * @memberof AdminInfoByIdOutput
	 */
	visible: boolean
	/**
	 *
	 * @type {Array<ShortGenre>}
	 * @memberof AdminInfoByIdOutput
	 */
	genres: Array<ShortGenre>
	/**
	 * book created at
	 * @type {string}
	 * @memberof AdminInfoByIdOutput
	 */
	createdAt: string
	/**
	 * book updated at
	 * @type {string}
	 * @memberof AdminInfoByIdOutput
	 */
	updatedAt: string
	/**
	 * book ebook
	 * @type {string}
	 * @memberof AdminInfoByIdOutput
	 */
	ebook: string
	/**
	 * book count
	 * @type {BookCount}
	 * @memberof AdminInfoByIdOutput
	 */
	_count: BookCount
	/**
	 * book activities
	 * @type {Array<Activity>}
	 * @memberof AdminInfoByIdOutput
	 */
	activities: Array<Activity>
	/**
	 * book review
	 * @type {Array<Review>}
	 * @memberof AdminInfoByIdOutput
	 */
	review: Array<Review>
}
