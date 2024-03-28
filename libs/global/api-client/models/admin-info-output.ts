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
import { Activity } from './activity';
// May contain unused imports in some cases
// @ts-ignore
import { BookCount } from './book-count';
// May contain unused imports in some cases
// @ts-ignore
import { Review } from './review';
// May contain unused imports in some cases
// @ts-ignore
import { ShortGenre } from './short-genre';

/**
 * 
 * @export
 * @interface AdminInfoOutput
 */
export interface AdminInfoOutput {
    /**
     * book id
     * @type {number}
     * @memberof AdminInfoOutput
     */
    'id': number;
    /**
     * book title
     * @type {string}
     * @memberof AdminInfoOutput
     */
    'title': string;
    /**
     * book picture
     * @type {string}
     * @memberof AdminInfoOutput
     */
    'picture': string;
    /**
     * book author
     * @type {string}
     * @memberof AdminInfoOutput
     */
    'author': string;
    /**
     * book description
     * @type {string}
     * @memberof AdminInfoOutput
     */
    'description': string;
    /**
     * book readingTime
     * @type {number}
     * @memberof AdminInfoOutput
     */
    'readingTime': number;
    /**
     * book chapters count
     * @type {number}
     * @memberof AdminInfoOutput
     */
    'chapters': number;
    /**
     * book rating
     * @type {number}
     * @memberof AdminInfoOutput
     */
    'rating': number;
    /**
     * book visibility
     * @type {boolean}
     * @memberof AdminInfoOutput
     */
    'visible': boolean;
    /**
     * 
     * @type {Array<ShortGenre>}
     * @memberof AdminInfoOutput
     */
    'genres': Array<ShortGenre>;
    /**
     * book created at
     * @type {string}
     * @memberof AdminInfoOutput
     */
    'createdAt': string;
    /**
     * book updated at
     * @type {string}
     * @memberof AdminInfoOutput
     */
    'updatedAt': string;
    /**
     * book ebook
     * @type {string}
     * @memberof AdminInfoOutput
     */
    'ebook': string;
    /**
     * book count
     * @type {BookCount}
     * @memberof AdminInfoOutput
     */
    '_count': BookCount;
    /**
     * book activities
     * @type {Array<Activity>}
     * @memberof AdminInfoOutput
     */
    'activities': Array<Activity>;
    /**
     * book review
     * @type {Array<Review>}
     * @memberof AdminInfoOutput
     */
    'review': Array<Review>;
}

