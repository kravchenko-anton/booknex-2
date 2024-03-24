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
import { ShortBook } from './short-book';

/**
 * 
 * @export
 * @interface GenreByIdOutput
 */
export interface GenreByIdOutput {
    /**
     * genre id
     * @type {number}
     * @memberof GenreByIdOutput
     */
    'id': number;
    /**
     * genre name
     * @type {string}
     * @memberof GenreByIdOutput
     */
    'name': string;
    /**
     * 
     * @type {Array<ShortBook>}
     * @memberof GenreByIdOutput
     */
    'mainBooks': Array<ShortBook>;
}

