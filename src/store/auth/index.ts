import { computed } from 'mobx';

export class AuthStore {
    public token: string;
    public userName: string;

    constructor () {
       this.userName = '';
    }

    @computed get isLogin () {
        return this.userName;
    }
}

const auth = new AuthStore();

export default auth;
