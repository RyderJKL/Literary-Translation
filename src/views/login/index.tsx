import * as React from 'react';
import $request from '@/utils/request';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, map, debounceTime, retry, catchError } from 'rxjs/operators';
import { useEventCallback } from 'rxjs-hooks';

const Login: React.FC = () => {
    const [handleLogin, value] = useEventCallback(
        ($event: Observable<React.MouseEvent<HTMLButtonElement>>) =>
            $event.pipe(
                debounceTime(500),
                switchMap(() =>
                    $request.post('/mock-api/user/login', { username: 'jack' }, { params: { useMock: 'true' } })
                ),
                map(res => {
                    console.log(res);
                    return 'jack';
                }),
                retry(),
                catchError(err => EMPTY)
            ),
        []
    );

    return (
        <span>
            <button onClick={handleLogin}>登录</button>
        </span>
    );
};

export default Login;
