import $request from '@/utils/request';

export interface ILoginState {
    username: string;
    password: string;
}

export const fetchLogin = ({ username, password }: ILoginState) => {
    return $request.post('/user/login', { username, password }, { params: { useMock: 'true' } });
};
