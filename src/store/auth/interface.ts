export interface AuthModel {
    token: string;
    username?: string;
}

export interface AuthStore extends AuthModel {
    isLogin: boolean;
    setAuth(authData: AuthModel): void;
}
