import * as React from 'react';
import { Observable, interval, throwError as _throw } from 'rxjs';
import {
    switchMap,
    take,
    map,
    tap,
    debounceTime,
    delay,
    retry,
    retryWhen,
    finalize,
    catchError,
    delayWhen
} from 'rxjs/operators';
import { useEventCallback } from 'rxjs-hooks';

import UserLogin from './components';
import { fetchLogin } from './services';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import styles from './styles.scss';

const Login: React.FC = () => {
    useDocumentTitle('登录页-Lego-Pro');
    const [loading, setLoading] = React.useState<boolean>(false);

    const [handleLogin, [result]] = useEventCallback(
        ($event: Observable<React.MouseEvent<HTMLButtonElement>>) =>
            $event.pipe(
                debounceTime(500),
                tap(() => setLoading(true)),
                delay(500),
                switchMap(() => fetchLogin({ username: 'jack', password: '123' })),
                map(res => {
                    console.log(res);
                    return ['jack'];
                }),
                finalize(() => {
                    setLoading(false);
                }),
                retry(2),
                catchError(error => {
                    console.log('你您重试次数已经超过两次，请稍后再试');
                    return _throw(2);
                }),
                retryWhen(errors =>
                    errors.pipe(
                        tap(value => console.log(`你您重试次数已经超过${value}次，请${value}秒再试`)),
                        delayWhen(value =>
                            interval(1000).pipe(
                                tap(spaceTime => console.log(spaceTime)),
                                take(value)
                            )
                        )
                    )
                )
            ),
        []
    );

    return (
        <div className={styles.container}>
            {/*{loading && 'loading'}*/}
            fuck denglu
            <button onClick={handleLogin}>登录</button>
            <span>result {result}</span>
            <UserLogin />
        </div>
    );
};

export default Login;
