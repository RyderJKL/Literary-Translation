"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
}
/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}
/**
 * `HttpHandler` which applies an `HttpInterceptor` to an `HttpRequest`.
 *
 *
 */
class HttpInterceptorHandler {
    constructor(next, interceptor) {
        this.next = next;
        this.interceptor = interceptor;
    }
    handle(req) {
        return this.interceptor.intercept(req, this.next);
    }
}
exports.HttpInterceptorHandler = HttpInterceptorHandler;
/**
 * A multi-provider token which represents the array of `HttpInterceptor`s that
 * are registered.
 *
 * @publicApi
 */
class NoopInterceptor {
    intercept(req, next) {
        return next.handle(req);
    }
}
exports.NoopInterceptor = NoopInterceptor;
class DefaultInterceptor {
    constructor(config) {
        this.config = config;
    }
    intercept(req, next) {
        let headers;
        if (typeof this.config.headers === 'object') {
            for (const key in this.config.headers) {
                if (this.config.headers.hasOwnProperty(key)) {
                    headers = req.headers.set(key, this.config.headers[key]);
                }
            }
        }
        let url = req.url;
        // Support baseURL config
        if (this.config.baseURL && !isAbsoluteURL(url)) {
            url = combineURLs(this.config.baseURL, url);
        }
        const defaultReq = req.clone({
            url,
            headers,
            withCredentials: this.config.withCredentials
        });
        if (Number(this.config.timeout) > 0) {
            return next.handle(defaultReq).pipe(operators_1.timeout(this.config.timeout));
        }
        return next.handle(defaultReq);
    }
}
exports.DefaultInterceptor = DefaultInterceptor;
