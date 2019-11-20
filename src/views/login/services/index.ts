import $request from '@/utils/request';

import { ILoginState } from '../components'

export const fetchLogin = ({ username, password }: ILoginState) => {
    return $request.post('/user/login', { username, password }, { params: { useMock: 'true' } });
};
