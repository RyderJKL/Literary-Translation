import * as React from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { Observable, throwError as _throw, timer } from 'rxjs';
import { switchMap, tap, debounceTime, retry, retryWhen, catchError, delayWhen } from 'rxjs/operators';
import { useEventCallback } from 'rxjs-hooks';
import { Message, Card, Alert, utils } from 'lego-ui';
import LoginForm, { LoginFormValues } from './components/login-form';
import { updateAutoLogin, updateToken } from '@/utils/auth';
import { parseQueryString } from '@/utils/url-parse';
import $request, { Response } from '@/utils/request';
import useStore from '@/hooks/use-store';
import styles from './styles.scss';

export interface LoginProps extends RouteComponentProps {
    retryCount?: number;
    retryDelayTime?: number;
}

const Login: React.FC<LoginProps> = ({ retryCount, retryDelayTime, history }) => {
    const [loading, setLoading] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState('');
    const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState<boolean>(false);

    const { saveUserInfo } = useStore((store) => ({
        saveUserInfo: store.common.saveUserInfo
    }));

    const [handleLogin] = useEventCallback(
        ($event: Observable<LoginFormValues>) =>
            $event.pipe(
                debounceTime(500),
                tap((payload) => {
                    setLoading(true);
                    updateAutoLogin(payload.auto_login);
                }),
                switchMap((payload) =>
                    $request.post('/user/login', payload, { metas: { mock: true, skipErrorMessage: true } })
                ),
                tap((res: Response) => {
                    setLoading(false);

                    if (res.code !== 20000) {
                        return setErrMsg(res.message);
                    }

                    saveUserInfo(res.data.userInfo);
                    updateToken(res.data.token);

                    history.replace(parseQueryString().redirect || '/');
                }),
                retry(retryCount),
                catchError(() => {
                    Message.$message({
                        type: 'warning',
                        content: `您重试次数已经超过${retryCount}，请稍后再试`
                    });
                    setSubmitButtonDisabled(true);
                    return _throw('错误次数超限');
                }),
                retryWhen((errors) =>
                    errors.pipe(
                        tap(() => {
                            Message.$message({
                                type: 'warning',
                                content: `重试次数已经超过${retryCount}次，${retryDelayTime}后秒再试`
                            });
                        }),
                        delayWhen(() => timer(1000 * retryDelayTime).pipe(tap(() => setSubmitButtonDisabled(false))))
                    )
                )
            ),
        { code: -10001 }
    );

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCardWrapper}>
                <Card className={styles.loginCard}>
                    <div className={styles.loginHeader}>
                        <div className={styles.logo}>
                            <img src={require('@/static/logo/primary.svg')} />
                        </div>
                        <h1>lego-ui AdminPro</h1>
                    </div>
                    <Alert visible={utils.isExist(errMsg)} showIcon={true} type='error' content={errMsg} />
                    <LoginForm
                        onSubmit={(values: LoginFormValues) => handleLogin(values)}
                        submitLoading={loading}
                        submitButtonDisabled={submitButtonDisabled}
                    />
                    <div className={styles.loginFooter}>
                        尚未拥有账号？<Link to='/user/sign-up'>注册</Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

Login.defaultProps = {
    retryCount: 2,
    retryDelayTime: 5
};

export default withRouter(Login);
