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



/**
 * 
 * @export
 * @interface Review
 */
export interface Review {
    /**
     * book-review id
     * @type {number}
     * @memberof Review
     */
    'id': number;
    /**
     * book-review tags
     * @type {Array<string>}
     * @memberof Review
     */
    'tags': Array<string>;
    /**
     * book-review text
     * @type {string}
     * @memberof Review
     */
    'text': string;
    /**
     * book-review rating
     * @type {number}
     * @memberof Review
     */
    'rating': number;
}

