import * as React from 'react';
export interface ResponseData {
    code?: number;
    data?: any;
}
export interface LoginSettings {
    retryCount?: number;
    retryDelayTime?: number;
}
declare const Login: React.FC<LoginSettings>;
export default Login;
