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
 * @interface UserStatisticsProgressByCurrentWeekInner
 */
export interface UserStatisticsProgressByCurrentWeekInner {
    /**
     * 
     * @type {string}
     * @memberof UserStatisticsProgressByCurrentWeekInner
     */
    'day': string;
    /**
     * 
     * @type {boolean}
     * @memberof UserStatisticsProgressByCurrentWeekInner
     */
    'isCurrentDay': boolean;
    /**
     * 
     * @type {number}
     * @memberof UserStatisticsProgressByCurrentWeekInner
     */
    'readingTimeMs': number;
    /**
     * 
     * @type {number}
     * @memberof UserStatisticsProgressByCurrentWeekInner
     */
    'dayProgress': number;
}

