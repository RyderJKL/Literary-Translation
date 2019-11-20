// todo: 需要保证每个系统构建时只会有一个 key token 常量
export const LOGIN_TOKEN = 'local_lego_pro_login_status';

export const checkIsLogin = (token: string): boolean => {
    if (token.length > 0) {
        return true
    }

    const localStatus = getLoginStatus();
    return localStatus && localStatus.length > 0;
};

export const getLoginStatus = (): string => {
    return localStorage.getItem(LOGIN_TOKEN);
};

export const saveLoginStatus = (token: string): void => {
    localStorage.setItem(LOGIN_TOKEN, token);
};

export const removeLoginStatus = (): void => {
    localStorage.removeItem(LOGIN_TOKEN);
};
