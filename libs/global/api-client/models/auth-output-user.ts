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
 * @interface AuthOutputUser
 */
export interface AuthOutputUser {
    /**
     * 
     * @type {string}
     * @memberof AuthOutputUser
     */
    'email'?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthOutputUser
     */
    'role'?: RoleEnum;
}

export const RoleEnum = {
    User: 'user',
    Admin: 'admin'
} as const;

export type RoleEnum = typeof RoleEnum[keyof typeof RoleEnum];

