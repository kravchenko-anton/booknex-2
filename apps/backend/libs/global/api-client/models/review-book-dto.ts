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
 * @interface ReviewBookDto
 */
export interface ReviewBookDto {
    /**
     * rating
     * @type {number}
     * @memberof ReviewBookDto
     */
    'rating': number;
    /**
     * tags
     * @type {Array<string>}
     * @memberof ReviewBookDto
     */
    'tags': Array<string>;
    /**
     * comment
     * @type {string}
     * @memberof ReviewBookDto
     */
    'comment'?: string;
}

