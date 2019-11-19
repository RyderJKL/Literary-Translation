import $request from '@/utils/request';
import * as urls from './url';

import { ILoginState } from '../components'

export const fetchLogin = ({ username, password }: ILoginState) => {
    return $request.post(urls.postUserLogin, { username, password }, { params: { useMock: 'true' } });
};
