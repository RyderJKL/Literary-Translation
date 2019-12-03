import { observable, action } from 'mobx';

export interface UserInfo {
    account: string;
    role: 1 | 2;
    username: string;
    age: number;
    gender: 'man' | 'womam';
    avatar: string;
    section: string;
}

export interface Model {
    userInfo: UserInfo;
}

export interface CommonStore extends Model {
    saveUserInfo(userInfo: UserInfo): void;
}

export class Common implements CommonStore {
    @observable public userInfo: UserInfo;

    @action.bound
    public saveUserInfo = (userInfo: UserInfo) => {
        this.userInfo = userInfo;
    };
}

export default new Common();
