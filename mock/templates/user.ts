import { Roles } from '@/typings';
import { postUserLogin } from '@/views/login/services/url';

export interface IToken {
    [index: string]: {
        token: string;
    };
}

export interface IUser {
    [index: string]: {
        roles: Roles;
        avatar: '';
        name: 'Super Admin';
    };
}

const tokens: IToken = {
    lego: {
        token: 'admin-token'
    }
};

export const useInfo = {
    url: '/user/info',
    type: 'get',
    response: () => {
        return {
            code: 60204,
            message: 'Account and password are incorrect.'
        };
    }
};

export const userLogin = {
    url: postUserLogin,
    type: 'post',
    response: config => {
        const { username, password } = config.body;

        // mock error
        if (username !== 'lego' || password !== 'admin') {
            return {
                errorCode: 80001,
                message: '用户名或者密码不正确'
            };
        }

        const token = tokens[username];

        return {
            code: 20000,
            data: token
        };
    }
};

export default [userLogin, useInfo];
