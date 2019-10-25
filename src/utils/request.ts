import { Observable, throwError as _throw } from 'rxjs';
import { mergeMap, finalize, catchError } from 'rxjs/operators';
import { Rjax, HttpResponse, HttpErrorResponse } from 'rjax';

// const baseURL = process.env.BASE_API;

// 自定义拦截器
class CustomInterceptor {
    public intercept(req, next) {
        // 拦截请求
        // 一定要用clone的方法进行拦截修改，为了保持请求的不可变性！！！！
        const newReq = req.clone({
            // 修改请求的url
            url: req.url.replace('http://', 'https://'),
            // 修改请求体
            body: { ...req.body }
            // 添加请求头
            // headers: req.headers.set('Authorization', 'authToken'),
        });
        // 拦截响应
        return next.handle(newReq).pipe(
            // tap((x) => console.log('拦截响应', x)),
            mergeMap(event => {
                // 这里可根据后台接口约定自行判断
                if (event instanceof HttpResponse && event.status !== 200) {
                    return new Observable(observer => observer.error(event));
                }
                return new Observable(observer => observer.next(event));
            }),
            catchError(res => {
                errorHandler(res);
                // 将错误信息抛给下个拦截器或者请求调用方
                return _throw(res);
            }),
            finalize(() => {
                // 无论成功或者失败都会执行
                // 可以记录日志等等
            })
        );
    }
}

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};

/**
 * 异常处理程序
 */
const errorHandler = (response: HttpErrorResponse) => {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    console.error(`请求错误: ${errorText}:: ${status}: ${url}`);
    // notification.error({
    //     message: `请求错误 ${status}: ${url}`,
    //     description: errorText,
    // });
};

// 创建实例
const request$ = new Rjax({
    // 设置请求基路径，可选
    baseURL: '',
    // 设置请求超时时间，可选
    timeout: 0,
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
