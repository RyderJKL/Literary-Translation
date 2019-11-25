"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_1 = require("./cookie");
/**
 * Retrieves the current XSRF token to use with the next outgoing request.
 *
 * @publicApi
 */
class HttpXsrfTokenExtractor {
}
exports.HttpXsrfTokenExtractor = HttpXsrfTokenExtractor;
/**
 * `HttpXsrfTokenExtractor` which retrieves the token from a cookie.
 */
class HttpXsrfCookieExtractor {
    constructor(cookieName) {
        this.cookieName = cookieName;
        this.lastCookieString = '';
        this.lastToken = null;
        this.doc = document;
        /**
         * @internal for testing
         */
        this.parseCount = 0;
    }
    getToken() {
        if (typeof window === 'undefined' &&
            typeof document === 'undefined') {
            return null;
        }
        const cookieString = this.doc.cookie || '';
        if (cookieString !== this.lastCookieString) {
            this.parseCount++;
            this.lastToken = cookie_1.parseCookieValue(cookieString, this.cookieName);
            this.lastCookieString = cookieString;
        }
        return this.lastToken;
    }
}
exports.HttpXsrfCookieExtractor = HttpXsrfCookieExtractor;
/**
 * `HttpInterceptor` which adds an XSRF token to eligible outgoing requests.
 */
class HttpXsrfInterceptor {
    constructor(headerName, cookieName) {
        this.headerName = headerName;
        this.cookieName = cookieName;
        this.tokenService = new HttpXsrfCookieExtractor(this.cookieName);
    }
    intercept(req, next) {
        const lcUrl = req.url.toLowerCase();
        // Skip both non-mutating requests and absolute URLs.
        // Non-mutating requests don't require a token, and absolute URLs require special handling
        // anyway as the cookie set
        // on our origin is not the same as the token expected by another origin.
        if (req.method === 'GET' || req.method === 'HEAD' || lcUrl.startsWith('http://') ||
            lcUrl.startsWith('https://')) {
            return next.handle(req);
        }
        const token = this.tokenService.getToken();
        // Be careful not to overwrite an existing header of the same name.
        if (token !== null && !req.headers.has(this.headerName)) {
            req = req.clone({ headers: req.headers.set(this.headerName, token) });
        }
        return next.handle(req);
    }
}
exports.HttpXsrfInterceptor = HttpXsrfInterceptor;
