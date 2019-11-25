import { Request } from 'express';
import { Response } from '@/utils/request';

export interface MockTpl {
    url: string;
    type: 'post' | 'get' | 'put' | 'delete' | 'update';
    response: (req: Request) => Response;
};

const tpl: MockTpl = {
    url: '/tpl',
    type: 'get',
    response: (req) => {
        if (req.params.id) {
            return {
                code: 20000,
                message: 'get params\'s id success'
            };
        }

        return {
            code: 20000,
            message: 'this is a mock tpl'
        };
    }
};

export const mock = (customTpl: MockTpl) => {
    return {
        ...tpl,
        ...customTpl
    };
};
