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
import { ShortGenre } from './short-genre';

/**
 * 
 * @export
 * @interface Book
 */
export interface Book {
    /**
     * book slug
     * @type {string}
     * @memberof Book
     */
    'slug': string;
    /**
     * book title
     * @type {string}
     * @memberof Book
     */
    'title': string;
    /**
     * book picture
     * @type {string}
     * @memberof Book
     */
    'picture': string;
    /**
     * book author
     * @type {string}
     * @memberof Book
     */
    'author': string;
    /**
     * book description
     * @type {string}
     * @memberof Book
     */
    'description': string;
    /**
     * book readingTime
     * @type {number}
     * @memberof Book
     */
    'readingTime': number;
    /**
     * book chapters count
     * @type {number}
     * @memberof Book
     */
    'chapters': number;
    /**
     * book rating
     * @type {number}
     * @memberof Book
     */
    'rating': number;
    /**
     * book visibility
     * @type {boolean}
     * @memberof Book
     */
    'visible': boolean;
    /**
     * 
     * @type {Array<ShortGenre>}
     * @memberof Book
     */
    'genres': Array<ShortGenre>;
}

