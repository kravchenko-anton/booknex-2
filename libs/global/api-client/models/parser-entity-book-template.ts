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
import { UserCatalogOutputDataInnerSelectedGenresInner } from './user-catalog-output-data-inner-selected-genres-inner';

/**
 * 
 * @export
 * @interface ParserEntityBookTemplate
 */
export interface ParserEntityBookTemplate {
    /**
     * 
     * @type {string}
     * @memberof ParserEntityBookTemplate
     */
    'slug': string;
    /**
     * 
     * @type {string}
     * @memberof ParserEntityBookTemplate
     */
    'title': string;
    /**
     * 
     * @type {string}
     * @memberof ParserEntityBookTemplate
     */
    'author': string;
    /**
     * 
     * @type {string}
     * @memberof ParserEntityBookTemplate
     */
    'description': string;
    /**
     * 
     * @type {string}
     * @memberof ParserEntityBookTemplate
     */
    'picture': string;
    /**
     * 
     * @type {number}
     * @memberof ParserEntityBookTemplate
     */
    'rating': number;
    /**
     * 
     * @type {Array<UserCatalogOutputDataInnerSelectedGenresInner>}
     * @memberof ParserEntityBookTemplate
     */
    'genres': Array<UserCatalogOutputDataInnerSelectedGenresInner>;
}
