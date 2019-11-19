import * as React from 'react';
import { Observable, throwError as _throw } from 'rxjs';
import {
    switchMap,
    // take,
    map,
    tap,
    debounceTime,
    // delay,
    retry,
    // retryWhen,
    // finalize,
    catchError,
    // delayWhen
} from 'rxjs/operators';
import { useEventCallback } from 'rxjs-hooks';

import UserLogin, { ILoginState } from './components';
import { fetchLogin } from './services';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import styles from './styles.scss';

const Login: React.FC = () => {
    useDocumentTitle('登录-Lego-Pro');
    const [loading, setLoading] = React.useState<boolean>(false);
    // const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState<boolean>(false);

    const [handleLogin, [result]] = useEventCallback(
        ($event: Observable<ILoginState>) =>
            $event.pipe(
                debounceTime(500),
                tap(() => setLoading(true)),
                tap(value => console.log(value)),
                switchMap((submitData) => fetchLogin(submitData)),
                map(res => {
                    console.log(res);
                    return ['jack'];
                }),
                // finalize(() => {
                //     setLoading(false);
                //     return [];
                // }),
                retry(2),
                catchError(error => {
                    console.log('你您重试次数已经超过两次，请稍后再试');
                    // setSubmitButtonDisabled(true);
                    return _throw([]);
                })
                // retryWhen(errors =>
                //     errors.pipe(
                //         tap(value => console.log(`你您重试次数已经超过${value}次，请${value * 5}秒再试`)),
                //         delayWhen(value =>
                //             interval(1000).pipe(
                //                 tap(spaceTime => console.log(spaceTime)),
                //                 take(value * 5)
                //             )
                //         ),
                //         tap(() => setSubmitButtonDisabled(false))
                //     )
                // )
            ),
        ['']
    );

    return (
        <div className={styles.loginContainer}>
            <span>{result}</span>
            <UserLogin
                onSubmit={value => handleLogin(value)}
                submitLoading={loading}
                // submitButtonDisabled={submitButtonDisabled}
            />
        </div>
    );
};

export default Login;
