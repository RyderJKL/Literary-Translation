/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Observable } from 'rxjs';
import { HttpHandler } from './backend';
import { HttpInterceptor } from './interceptor';
import { HttpRequest } from './request';
import { HttpEvent } from './response';
/**
 * Retrieves the current XSRF token to use with the next outgoing request.
 *
 * @publicApi
 */
export declare abstract class HttpXsrfTokenExtractor {
    /**
     * Get the XSRF token to use with an outgoing request.
     *
     * Will be called for every request, so the token may change between requests.
     */
    abstract getToken(): string | null;
}
/**
 * `HttpXsrfTokenExtractor` which retrieves the token from a cookie.
 */
export declare class HttpXsrfCookieExtractor implements HttpXsrfTokenExtractor {
    private cookieName;
    private lastCookieString;
    private lastToken;
    private doc;
    /**
     * @internal for testing
     */
    parseCount: number;
    constructor(cookieName: string);
    getToken(): string | null;
}
/**
 * `HttpInterceptor` which adds an XSRF token to eligible outgoing requests.
 */
export declare class HttpXsrfInterceptor implements HttpInterceptor {
    private headerName;
    private cookieName;
    private tokenService;
    constructor(headerName: string, cookieName: string);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
