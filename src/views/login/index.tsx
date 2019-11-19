import * as React from 'react';
import { Redirect } from 'react-router-dom';
import UserLogin, { ILoginState } from './components';
import { fetchLogin } from './services';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import useStore from '@/hooks/use-store';
import styles from './styles.scss';

import { Observable, throwError as _throw, timer } from 'rxjs';
import { switchMap, tap, debounceTime, retry, retryWhen, finalize, catchError, delayWhen } from 'rxjs/operators';

import { useEventCallback } from 'rxjs-hooks';
import { AuthModel } from '@/store/auth';

import { Message } from 'lego-ui';

export interface ResponseData {
    code?: number;
    data?: any;
}

export interface LoginSettings {
    retryCount?: number;
    retryDelayTime?: number;
}

const Login: React.FC<LoginSettings> = ({ retryCount = 2, retryDelayTime = 5 }: LoginSettings) => {
    useDocumentTitle('登录-Lego-Pro');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState<boolean>(false);

    const { isLogin, setAuth } = useStore(store => ({
        isLogin: store.auth.isLogin,
        setAuth: store.auth.setAuth
    }));

    const handleSetAuth = (authData: AuthModel) => {
        setAuth(authData);
    };

    const [handleLogin] = useEventCallback(
        ($event: Observable<ILoginState>) =>
            $event.pipe(
                debounceTime(500),
                tap(() => setLoading(true)),
                switchMap(submitData => fetchLogin(submitData)),
                tap((repData: ResponseData) => handleSetAuth(repData.data)),
                finalize(() => {
                    setLoading(false);
                }),
                retry(retryCount),
                catchError(error => {
                    Message.$message({
                        key: 1,
                        type: 'warning',
                        content: `您重试次数已经超过${retryCount}，请稍后再试`
                    });
                    setSubmitButtonDisabled(true);
                    return _throw('错误次数超限');
                }),
                retryWhen(errors =>
                    errors.pipe(
                        tap(() => {
                            Message.$message({
                                key: 2,
                                type: 'warning',
                                content: `重试次数已经超过${retryCount}次，${retryDelayTime}后秒再试`
                            });
                        }),
                        delayWhen(value => timer(1000 * retryDelayTime).pipe(tap(() => setSubmitButtonDisabled(false))))
                    )
                )
            ),
        {}
    );

    if (isLogin) {
        return <Redirect to={'/home'} />;
    }

    return (
        <div className={styles.loginContainer}>
            <UserLogin
                onSubmit={value => handleLogin(value)}
                submitLoading={loading}
                submitButtonDisabled={submitButtonDisabled}
            />
        </div>
    );
};

export default Login;
