import { Roles } from '@/typings'

export interface IToken {
    [index: string]: {
        token: string;
    };
}

export interface IUser {
    [index: string]: {
        roles: Roles,
        avatar: '',
        name: 'Super Admin'
    }
}

const tokens: IToken = {
    admin: {
       token: 'admin-token'
    }
};

export const userLogin = {
    url: '/user/login',
    type: 'post',
    response: (config) => {
        const { username } = config.body;
        const token = tokens[username];

        // mock error
        if (!token) {
            return {
                code: 60204,
                message: 'Account and password are incorrect.'
            }
        }

        return {
            code: 20000,
            data: token
        }
    }
};

export default  [userLogin];
