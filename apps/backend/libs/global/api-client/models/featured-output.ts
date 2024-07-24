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
// May contain unused imports in some cases
// @ts-ignore
import { UserLibraryOutputFinishedBooksInner } from './user-library-output-finished-books-inner';

/**
 * 
 * @export
 * @interface FeaturedOutput
 */
export interface FeaturedOutput {
    /**
     * 
     * @type {Array<UserLibraryOutputFinishedBooksInner>}
     * @memberof FeaturedOutput
     */
    'picksOfWeek': Array<UserLibraryOutputFinishedBooksInner>;
    /**
     * 
     * @type {Array<UserCatalogOutputDataInnerSelectedGenresInner>}
     * @memberof FeaturedOutput
     */
    'genres': Array<UserCatalogOutputDataInnerSelectedGenresInner>;
    /**
     * 
     * @type {Array<UserLibraryOutputFinishedBooksInner>}
     * @memberof FeaturedOutput
     */
    'bestSellingBooks': Array<UserLibraryOutputFinishedBooksInner>;
    /**
     * 
     * @type {Array<UserLibraryOutputFinishedBooksInner>}
     * @memberof FeaturedOutput
     */
    'newReleases': Array<UserLibraryOutputFinishedBooksInner>;
    /**
     * 
     * @type {Array<Array<UserLibraryOutputFinishedBooksInner>>}
     * @memberof FeaturedOutput
     */
    'booksBySelectedGenres': Array<Array<UserLibraryOutputFinishedBooksInner>>;
}

