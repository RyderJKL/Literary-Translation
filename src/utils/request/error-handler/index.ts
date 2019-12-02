import { HttpErrorResponse, HttpResponse } from 'packages/rjax/lib';
import { Message } from 'lego-ui';

export interface CodeMessage {
    [index: string]: string;
}

export const codeMessage: CodeMessage = {
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
 * network 异常处理程序
 */
export const networkErrorHandler = (networkResponse: HttpErrorResponse): void => {
    const errorText = codeMessage[networkResponse.status] || networkResponse.statusText;
    const { status, url } = networkResponse;
    console.error(`网络错误: ${errorText}:: ${status}: ${url}`);

    Message.$message({
        content: errorText || '未知错误',
        type: 'error'
    });
};

/**
 * business 异常处理程序
 */
export const businessErrorHandler = (response: HttpResponse<any>): void => {
    const {
        body: { message = '服务器报错了' },
        url
    } = response;

    console.error(`服务错误: ${message}:: ${url}`);
    Message.$message({
        content: message,
        type: 'error'
    });
};
