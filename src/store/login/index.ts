import { action, computed, observable } from 'mobx';
import { checkIsLogin, removeLoginStatus, saveLoginStatus, getLoginStatus } from './utils';

export interface LoginModel {
    token: string;
}

export interface LoginStore extends LoginModel {
    isLogin: boolean;
    logout(): void;
    initLoginStatus():void;
    setLoginStatus(loginData: LoginModel): void;
}

export class Login implements LoginStore {
    @observable public token = '';

    constructor() {
        this.token = '';
        this.initLoginStatus();
    }

    @computed
    public get isLogin(): boolean {
        return checkIsLogin(this.token);
    }

    @action.bound
    public initLoginStatus() {
        const lastedToken = getLoginStatus();
        if (lastedToken) {
            this.token = lastedToken;
        }
    }

    @action.bound
    public logout(): void {
        this.token = '';
        removeLoginStatus();
    }

    @action.bound
    public setLoginStatus({ token }: LoginModel): void {
        this.token = token;
        saveLoginStatus(token);
    }
}

const login = new Login();

export default login;
