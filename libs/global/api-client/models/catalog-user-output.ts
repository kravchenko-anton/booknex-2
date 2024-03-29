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
import { ShortGenre } from './short-genre'
// May contain unused imports in some cases
// @ts-ignore
import { UserCountOutput } from './user-count-output'

/**
 *
 * @export
 * @interface CatalogUserOutput
 */
export interface CatalogUserOutput {
	/**
	 * user id
	 * @type {number}
	 * @memberof CatalogUserOutput
	 */
	id: number
	/**
	 * user created at
	 * @type {string}
	 * @memberof CatalogUserOutput
	 */
	createdAt: string
	/**
	 * user email
	 * @type {string}
	 * @memberof CatalogUserOutput
	 */
	email: string
	/**
	 * user social id
	 * @type {string}
	 * @memberof CatalogUserOutput
	 */
	socialId: string
	/**
	 * user password
	 * @type {string}
	 * @memberof CatalogUserOutput
	 */
	password: string
	/**
	 * user picture
	 * @type {string}
	 * @memberof CatalogUserOutput
	 */
	picture: string
	/**
	 * user full name
	 * @type {string}
	 * @memberof CatalogUserOutput
	 */
	fullName: string
	/**
	 * user location
	 * @type {string}
	 * @memberof CatalogUserOutput
	 */
	location: string
	/**
	 *
	 * @type {Array<ShortGenre>}
	 * @memberof CatalogUserOutput
	 */
	selectedGenres: Array<ShortGenre>
	/**
	 *
	 * @type {Array<Activity>}
	 * @memberof CatalogUserOutput
	 */
	activities: Array<Activity>
	/**
	 * Count of books finished, reading and saved by the user
	 * @type {UserCountOutput}
	 * @memberof CatalogUserOutput
	 */
	_count: UserCountOutput
}
