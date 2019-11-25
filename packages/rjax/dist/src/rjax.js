"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const interceptor_1 = require("./interceptor");
const handler_1 = require("./handler");
const xsrf_1 = require("./xsrf");
const jsonp_1 = require("./jsonp");
class Rjax extends client_1.HttpClient {
    constructor(config) {
        super();
        this.config = {
            baseURL: '',
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            headers: {},
            withCredentials: false,
            jsonp: false,
        };
        if (config) {
            this.config = Object.assign({}, this.config, config);
            const interceptors = [new interceptor_1.DefaultInterceptor(config), new xsrf_1.HttpXsrfInterceptor(config.xsrfHeaderName, config.xsrfCookieName)];
            if (config.jsonp) {
                interceptors.push(new jsonp_1.JsonpInterceptor());
            }
            if (config.interceptors && config.interceptors instanceof Array && config.interceptors.length) {
                interceptors.push(...config.interceptors);
            }
            this.handler = new handler_1.HttpInterceptingHandler(interceptors);
        }
    }
}
exports.Rjax = Rjax;
