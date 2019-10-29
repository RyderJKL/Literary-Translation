import { Request, Response } from 'express';
import { IUserData } from '@/services/user/typings';

const userList: IUserData[] = [
    {
        id: 1,
        username: 'jack',
        password: 'asdfsaf',
        email: 'adfsfs@qq.com',
        phone: '1990213434',
        avatar: ''
    }
];

export const login = (req: Request, res: Response) => {
    const { username } = req.body;
    for (const user of userList) {
        if (user.username === username) {
            return res.json({
                code: 20000,
                data: {
                    accessToken: username + '-token'
                }
            });
        }
    }
    return res.status(400).json({
        code: 50004,
        message: 'Invalid User'
    });
};
