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
 * @interface BookTemplate
 */
export interface BookTemplate {
    /**
     * book template slug
     * @type {string}
     * @memberof BookTemplate
     */
    'slug': string;
    /**
     * title of the book
     * @type {string}
     * @memberof BookTemplate
     */
    'title': string;
    /**
     * author of the book
     * @type {string}
     * @memberof BookTemplate
     */
    'author': string;
    /**
     * description of the book
     * @type {string}
     * @memberof BookTemplate
     */
    'description': string;
    /**
     * picture of the book
     * @type {string}
     * @memberof BookTemplate
     */
    'picture': string;
    /**
     * rating of the book
     * @type {number}
     * @memberof BookTemplate
     */
    'rating': number;
    /**
     * 
     * @type {Array<ShortGenre>}
     * @memberof BookTemplate
     */
    'genres': Array<ShortGenre>;
}

