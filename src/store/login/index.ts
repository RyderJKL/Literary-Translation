import { action, computed, observable } from 'mobx';
import { checkIsLogin, removeLoginStatus, saveLoginStatus, getLoginStatus } from './utils';
import { LoginModel, LoginStore } from './interface';
export * from './interface';

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
    private initLoginStatus() {
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
    public setLoginStatus({ token }: LoginModel) {
        this.token = token;
        saveLoginStatus(token);
    }
}

const login = new Login();

export default login;
