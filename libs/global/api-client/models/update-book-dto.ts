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
 * @interface UpdateBookDto
 */
export interface UpdateBookDto {
    /**
     * 
     * @type {string}
     * @memberof UpdateBookDto
     */
    'title'?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateBookDto
     */
    'author'?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateBookDto
     */
    'description'?: string;
    /**
     * 
     * @type {Array<CreateBookDtoEbookInner>}
     * @memberof UpdateBookDto
     */
    'ebook'?: Array<CreateBookDtoEbookInner>;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateBookDto
     */
    'isPublic'?: boolean;
    /**
     * 
     * @type {number}
     * @memberof UpdateBookDto
     */
    'rating'?: number;
    /**
     * 
     * @type {string}
     * @memberof UpdateBookDto
     */
    'picture'?: string;
    /**
     * 
     * @type {Array<UserCatalogOutputDataInnerSelectedGenresInner>}
     * @memberof UpdateBookDto
     */
    'genres'?: Array<UserCatalogOutputDataInnerSelectedGenresInner>;
}

