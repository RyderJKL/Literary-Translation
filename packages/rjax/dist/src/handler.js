"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interceptor_1 = require("./interceptor");
const xhr_1 = require("./xhr");
class HttpInterceptingHandler {
    constructor(interceptors = [new interceptor_1.NoopInterceptor()]) {
        this.interceptors = interceptors;
        this.chain = null;
        this.backend = new xhr_1.HttpXhrBackend();
    }
    handle(req) {
        if (this.chain === null) {
            this.chain = this.interceptors.reduceRight((next, interceptor) => new interceptor_1.HttpInterceptorHandler(next, interceptor), this.backend);
        }
        return this.chain.handle(req);
    }
}
exports.HttpInterceptingHandler = HttpInterceptingHandler;
/**
 * Constructs an `HttpHandler` that applies interceptors
 * to a request before passing it to the given `HttpBackend`.
 *
 * Use as a factory function within `HttpClientModule`.
 *
 *
 */
function interceptingHandler(backend, interceptors = []) {
    if (!interceptors) {
        return backend;
    }
    return interceptors.reduceRight((next, interceptor) => new interceptor_1.HttpInterceptorHandler(next, interceptor), backend);
}
exports.interceptingHandler = interceptingHandler;
/**
 * Factory function that determines where to store JSONP callbacks.
 *
 * Ordinarily JSONP callbacks are stored on the `window` object, but this may not exist
 * in test environments. In that case, callbacks are stored on an anonymous object instead.
 *
 *
 */
function jsonpCallbackContext() {
    if (typeof window === 'object') {
        return window;
    }
    return {};
}
exports.jsonpCallbackContext = jsonpCallbackContext;
