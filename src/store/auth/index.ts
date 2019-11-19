import { action, computed, observable } from 'mobx';
import { checkIsLogin } from './utils';
import { AuthModel, AuthStore } from './interface';

export * from './interface';

export class Auth implements AuthStore {
    @observable public token = '';
    @observable public username = '';

    constructor() {
        this.username = '';
        this.token = '';
    }

    @computed
    public get isLogin(): boolean {
        return checkIsLogin(this.token);
    }

    @action.bound
    public setAuth({ username, token }: AuthModel) {
        this.token = token;
        this.username = username;
    }
}

const auth = new Auth();

export default auth;
