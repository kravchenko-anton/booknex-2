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
import { CreateBookDtoEbookInner } from './create-book-dto-ebook-inner';
// May contain unused imports in some cases
// @ts-ignore
import { UserCatalogOutputDataInnerSelectedGenresInner } from './user-catalog-output-data-inner-selected-genres-inner';

/**
 * 
 * @export
 * @interface CreateBookDto
 */
export interface CreateBookDto {
    /**
     * 
     * @type {string}
     * @memberof CreateBookDto
     */
    'title': string;
    /**
     * 
     * @type {string}
     * @memberof CreateBookDto
     */
    'author': string;
    /**
     * 
     * @type {string}
     * @memberof CreateBookDto
     */
    'description': string;
    /**
     * 
     * @type {Array<CreateBookDtoEbookInner>}
     * @memberof CreateBookDto
     */
    'ebook': Array<CreateBookDtoEbookInner>;
    /**
     * 
     * @type {number}
     * @memberof CreateBookDto
     */
    'rating': number;
    /**
     * 
     * @type {string}
     * @memberof CreateBookDto
     */
    'picture': string;
    /**
     * 
     * @type {Array<UserCatalogOutputDataInnerSelectedGenresInner>}
     * @memberof CreateBookDto
     */
    'genres': Array<UserCatalogOutputDataInnerSelectedGenresInner>;
}

