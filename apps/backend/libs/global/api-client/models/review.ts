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
 * @interface Review
 */
export interface Review {
  /**
   * review id
   * @type {number}
   * @memberof Review
   */
  id: number;
  /**
   * review tags
   * @type {Array<string>}
   * @memberof Review
   */
  tags: Array<string>;
  /**
   * review text
   * @type {string}
   * @memberof Review
   */
  text: string;
  /**
   * review rating
   * @type {number}
   * @memberof Review
   */
  rating: number;
}
