import { HttpHandler, HttpBackend } from './backend';
import { Observable } from 'rxjs';
import { HttpRequest } from './request';
import { HttpInterceptor } from './interceptor';
import { HttpEvent } from './response';
export declare class HttpInterceptingHandler implements HttpHandler {
    private interceptors;
    private chain;
    private backend;
    constructor(interceptors?: HttpInterceptor[]);
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}
/**
 * Constructs an `HttpHandler` that applies interceptors
 * to a request before passing it to the given `HttpBackend`.
 *
 * Use as a factory function within `HttpClientModule`.
 *
 *
 */
export declare function interceptingHandler(backend: HttpBackend, interceptors?: HttpInterceptor[] | null): HttpHandler;
/**
 * Factory function that determines where to store JSONP callbacks.
 *
 * Ordinarily JSONP callbacks are stored on the `window` object, but this may not exist
 * in test environments. In that case, callbacks are stored on an anonymous object instead.
 *
 *
 */
export declare function jsonpCallbackContext(): Object;
