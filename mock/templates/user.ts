export interface IToken {
    [index: string]: {
        token: string;
        username: string;
    };
}

const tokens: IToken = {
    lego: {
        token: 'admin-token',
        username: 'lego'
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
    url: '/user/login',
    type: 'post',
    response: config => {
        const { username, password } = config.body;

        // mock error
        if (username !== 'lego' || password !== 'admin') {
            return {
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
