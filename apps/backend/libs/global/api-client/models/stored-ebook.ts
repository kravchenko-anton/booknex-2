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
import { StoredEBookChaptersInner } from './stored-ebook-chapters-inner';

/**
 * 
 * @export
 * @interface StoredEBook
 */
export interface StoredEBook {
    /**
     * 
     * @type {Array<StoredEBookChaptersInner>}
     * @memberof StoredEBook
     */
    'chapters': Array<StoredEBookChaptersInner>;
    /**
     * 
     * @type {string}
     * @memberof StoredEBook
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof StoredEBook
     */
    'title': string;
}
