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
import { Book } from './book';

/**
 * 
 * @export
 * @interface AdminCatalogOutput
 */
export interface AdminCatalogOutput {
    /**
     * 
     * @type {Array<Book>}
     * @memberof AdminCatalogOutput
     */
    'data': Array<Book>;
    /**
     * can load more
     * @type {boolean}
     * @memberof AdminCatalogOutput
     */
    'canLoadMore': boolean;
    /**
     * total pages
     * @type {number}
     * @memberof AdminCatalogOutput
     */
    'totalPages': number;
}

