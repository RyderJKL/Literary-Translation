import { LoginModel, LoginStore } from './interface';
export * from './interface';
export declare class Login implements LoginStore {
    token: string;
    constructor();
    readonly isLogin: boolean;
    logout(): void;
    setLoginStatus({ token }: LoginModel): void;
}
declare const login: Login;
export default login;
