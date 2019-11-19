import { Observable } from 'rxjs';
import { finalize, catchError, mergeMap } from 'rxjs/operators';
import { Rjax, HttpResponse } from 'rjax';
import { networkErrorHandler, businessErrorHandler } from './error-handler';
import { requestInterceptor, extractDataFromRequest } from './utils';

// 自定义拦截器
class CustomInterceptor {
    public intercept(req, next) {
        // 拦截请求
        const newReq = requestInterceptor(req);

        // 拦截响应
        return next.handle(newReq).pipe(
            // tap((x) => console.log('拦截响应', x)),
            mergeMap(event => {
                // 这里可根据后台接口约定自行判断

                // for network error
                if (event instanceof HttpResponse && (event.status !== 200 || event.body.errorCode)) {
                    return new Observable(observer => observer.error(event));
                }

                return new Observable(observer =>
                    observer.next(() => extractDataFromRequest(event as HttpResponse<any>))
                );
            }),
            catchError(res => {
                // network error
                if (res.status !== 200) {
                    networkErrorHandler(res);

                    // 将错误信息抛给下个拦截器或者请求调用方
                    return new Observable(observer => observer.error(res));
                }

                // business error
                if (res.body.errorCode) {
                    businessErrorHandler(res);
                    return new Observable(observer => observer.error(res));
                }

                // other error
                return new Observable(observer => observer.error(res));
            }),
            finalize(() => {
                // 无论成功或者失败都会执行
                // 可以记录日志等等
            })
        );
    }
}

// 创建实例
const request$ = new Rjax({
    // 设置请求基路径，可选
    baseURL: '',
    // 设置请求超时时间，可选
    timeout: 100000,
    // 是用作 xsrf token 的值的cookie的名称，默认'XSRF-TOKEN'，可选
    // xsrfCookieName: 'XSRF-TOKEN',
    xsrfCookieName: '',
    // 是承载 xsrf token 的值的 HTTP 头的名称，默认'X-XSRF-TOKEN'，可选
    xsrfHeaderName: '',
    // 添加统一的headers，默认{}，可选
    headers: {},
    // 表示跨域请求时是否需要使用凭证，默认false，可选
    withCredentials: false,
    // 是否添加jsonp请求功能，默认false，可选
    jsonp: false,
    // 设置请求响应拦截器，可设置多组
    interceptors: [new CustomInterceptor()]
});

export default request$;
