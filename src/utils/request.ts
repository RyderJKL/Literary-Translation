import { Rjax } from 'rjax';

const baseURL = 'https://some-domain.com/api/';

// 创建实例
const request$ = new Rjax({
    baseURL, // 设置请求基路径，可选
    timeout: 1000, // 设置请求超时时间，可选
    interceptors: [], // 设置请求响应拦截器，可设置多组，可选
    xsrfCookieName: 'XSRF-TOKEN', // 是用作 xsrf token 的值的cookie的名称，默认'XSRF-TOKEN'，可选
    xsrfHeaderName: 'X-XSRF-TOKEN', // 是承载 xsrf token 的值的 HTTP 头的名称，默认'X-XSRF-TOKEN'，可选
    headers: {}, // 添加统一的headers，默认{}，可选
    withCredentials: false, // 表示跨域请求时是否需要使用凭证，默认false，可选
    jsonp: false, // 是否添加jsonp请求功能，默认false，可选
});

interface ResponseError<D = any> extends Error {
    name: string;
    data: D;
    response: Response;
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
    504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
    const { response = {} as any as Response } = error;
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    console.error('请求错误', errorText);
    // notification.error({
    //     message: `请求错误 ${status}: ${url}`,
    //     description: errorText,
    // });
};

/**
 * 配置request请求时的默认参数
 */
// const request = extend({
//     errorHandler, // 默认错误处理
//     credentials: 'include', // 默认请求是否带上cookie
// });

export default request$;

// // 发起GET请求
// rjax.get(`/user/12345`).subscribe(response => {
//     // 请求成功回调
//     console.log(response);
// }, error => {
//     // 请求失败回调
//     console.log(error);
// });
