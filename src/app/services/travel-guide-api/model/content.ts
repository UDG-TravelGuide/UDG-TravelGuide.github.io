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

 import { Image } from "./image";

export interface Content {
    id?: number;
    type?: string;
    value?: string;
    position?: number;
    image?: Image;
}
