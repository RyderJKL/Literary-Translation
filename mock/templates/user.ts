import { mock } from 'root/mock/templates/mock-helper';
import * as config from '@/config';

const adminToken = '666ecb94f2d49cd27ca0e0c48c36666';
const basicToken = '2226ecb94f2d49cd27ca0e0c48c3222';

const userInfo = {
    age: 18,
    gender: 'man',
    avatar: 'http://lego-ui.lvwan-inc.com/assets/avatar.jpg',
    section: '绿湾大前端'
};

const adminUserInfo = {
    username: 'superman',
    accout: 'admin',
    role: 1,
    ...userInfo
};

const basicUserInfo = {
    username: 'batman',
    accout: 'user',
    role: 2,
    ...userInfo
};

// user login interface
export const login = mock({
    url: '/user/login',
    type: 'post',
    response: req => {
        const { username, password } = req.body;

        if (!['admin', 'user'].includes(username) || password !== 'lego-ui') {
            return {
                code: -10001,
                message: '账号不存在或密码错误！'
            };
        }

        return {
            code: 20000,
            data: {
                userInfo: username === 'admin' ? adminUserInfo : basicUserInfo,
                token: username === 'admin' ? adminToken : basicToken
            }
        };
    }
});

// get userInfo interface
export const getUserinfo = mock({
    url: '/user/info',
    type: 'get',
    response: req => {
        const token = req.headers[config.AUTH_SAVE_NAME];

        if (![adminToken, basicToken].includes(token as string)) {
            return {
                code: -10002,
                message: '用户未登录'
            };
        }

        return {
            code: 20000,
            data: {
                userInfo: token === adminToken ? adminUserInfo : basicUserInfo
            }
        };
    }
});
