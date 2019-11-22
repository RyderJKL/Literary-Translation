import { HttpResponse } from 'rjax';
import * as config from '@/config';
import { getToken } from '@/utils/auth';

const isDevelopment = process.env.NODE_ENV === 'development';

export const requestInterceptor = req => {
    const {
        params: { map: paramsMap }
    } = req;

    let useMockApi = false;
    let url = req.url;

    // 任何环境下，只有检测到 useMock，都要过滤掉
    if (paramsMap.get('useMock')) {
        if (paramsMap.get('useMock')[0] === 'true') {
            useMockApi = true;
        }

        paramsMap.delete('useMock');
    }

    // 如果是在开发环境，并且该请求开启了 mock，则将该次请求处理成 mock-api
    if (isDevelopment && useMockApi) {
        // "/api/user/login" => "/mock-api/v1/user/login"
        url = url.replace(`${config.API_PREFIX}`, `${process.env.MOCK_API}`);
    }

    // 一定要用clone的方法进行拦截修改，为了保持请求的不可变性！！！！
    const newReq = req.clone({
        // 修改请求的url
        url,
        // 修改请求体
        body: { ...req.body },
        // 添加请求头
        headers: config.auth_save_method === 'storage'
            ? req.headers.set(config.auth_save_name, getToken())
            : req.headers
    });
    return newReq;
};

// 对 response 中的 data 进行提取，解压
export const extractDataFromRequest = (response: HttpResponse<any>, rawResponse = false) => {
    if (rawResponse) { return response; }
    const { body: data } = response;
    // todo: extract data or do something
    return data;
};
