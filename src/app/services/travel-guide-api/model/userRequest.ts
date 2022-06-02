/**
 * TravelGuide API
 * Documentació que correspon a l'API de l'aplicació TravelGuide
 *
 * OpenAPI spec version: 1.0.0-oas3
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * Model per la creacio i edicio de usuaris
 */
export interface UserRequest { 
    userName?: string;
    email?: string;
    password?: string;
    birthDate?: string;
}