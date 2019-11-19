import $request from '@/utils/request';
import * as urls from './url';

export interface ILoginState {
    username: string;
    password: string;
}

export const fetchLogin = ({ username, password }: ILoginState) => {
    return $request.post(urls.postUserLogin, { username, password }, { params: { useMock: 'true' } });
};
