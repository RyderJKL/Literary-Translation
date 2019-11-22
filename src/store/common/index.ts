import { observable, action } from 'mobx';

export interface UserInfo {
    account: string;
    role: 1 | 2;
    username: string;
    age: number;
    gender: 'man'| 'womam';
    avatar: string;
    section: string;
};

export class CommonStore {
    @observable public userInfo: UserInfo;

    @action
    public saveUserInfo = (userInfo: UserInfo) => this.userInfo = userInfo;
}

export default new CommonStore();
