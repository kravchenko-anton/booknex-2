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
import { PayloadEBook } from './payload-ebook';

/**
 * 
 * @export
 * @interface UpdateBookDto
 */
export interface UpdateBookDto {
    /**
     * book title
     * @type {string}
     * @memberof UpdateBookDto
     */
    'title'?: string;
    /**
     * book picture
     * @type {string}
     * @memberof UpdateBookDto
     */
    'picture'?: string;
    /**
     * book author
     * @type {string}
     * @memberof UpdateBookDto
     */
    'author'?: string;
    /**
     * book description
     * @type {string}
     * @memberof UpdateBookDto
     */
    'description'?: string;
    /**
     * book rating
     * @type {number}
     * @memberof UpdateBookDto
     */
    'rating'?: number;
    /**
     * book visibility
     * @type {boolean}
     * @memberof UpdateBookDto
     */
    'visible'?: boolean;
    /**
     * Array of genres
     * @type {Array<number>}
     * @memberof UpdateBookDto
     */
    'genres'?: Array<number>;
    /**
     * 
     * @type {Array<PayloadEBook>}
     * @memberof UpdateBookDto
     */
    'ebook'?: Array<PayloadEBook>;
}

