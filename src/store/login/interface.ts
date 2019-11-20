export interface LoginModel {
    token: string;
}

export interface LoginStore extends LoginModel {
    isLogin: boolean;
    // login(): void;
    logout(): void;
    setLoginStatus(loginData: LoginModel): void;
}
