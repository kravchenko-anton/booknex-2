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
import { ChapterChild } from './chapter-child';

/**
 * 
 * @export
 * @interface Chapter
 */
export interface Chapter {
    /**
     * chapter title
     * @type {string}
     * @memberof Chapter
     */
    'title': string;
    /**
     * chapter children
     * @type {Array<ChapterChild>}
     * @memberof Chapter
     */
    'children': Array<ChapterChild>;
}
