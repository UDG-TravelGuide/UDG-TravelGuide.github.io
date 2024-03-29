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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Publication } from '../model/publication';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { environment } from 'src/environments/environment';


@Injectable()
export class PublicationsService {

    protected basePath = environment.api;
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     * Afageix com a favorits una publicació a partir de la seva id
     * @param publicationId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public publicationsForBo(page?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public publicationsForBo(page?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public publicationsForBo(page?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public publicationsForBo(page?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        if (page != null && page != undefined) {

            return this.httpClient.request<any>('get',`${this.basePath}/publications/backoffice?page=${ page }`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );

        }

        return this.httpClient.request<any>('get',`${this.basePath}/publications/backoffice`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

  /**
   *
   * Afageix com a favorits una publicació a partir de la seva id
   * @param publicationId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
    public deletePublicationBo(publicationId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deletePublicationBo(publicationId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deletePublicationBo(publicationId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deletePublicationBo(publicationId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/publications/deleteBo/${encodeURIComponent(String(publicationId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
}
