import { HttpClient } from './client';
import { DefaultConfig } from './interceptor';
export declare class Rjax extends HttpClient {
    private config;
    constructor(config?: DefaultConfig);
}
