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
import { UserStatisticsProgressByCurrentWeekInner } from './user-statistics-progress-by-current-week-inner';

/**
 * 
 * @export
 * @interface UserStatistics
 */
export interface UserStatistics {
    /**
     * 
     * @type {Array<UserStatisticsProgressByCurrentWeekInner>}
     * @memberof UserStatistics
     */
    'progressByCurrentWeek': Array<UserStatisticsProgressByCurrentWeekInner>;
    /**
     * 
     * @type {string}
     * @memberof UserStatistics
     */
    'pepTalk': string;
    /**
     * 
     * @type {number}
     * @memberof UserStatistics
     */
    'goalMinutes': number;
    /**
     * 
     * @type {number}
     * @memberof UserStatistics
     */
    'userSteak': number;
}

