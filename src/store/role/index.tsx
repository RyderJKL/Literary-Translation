import { observable, action } from 'mobx';

export enum EERoles {
    admin = 'admin',
    user = 'user'
}

export type EERolesArrType = Array<keyof typeof EERoles>;

export class RoleStore {
    @observable public role: EERoles;

    constructor() {
        this.role = EERoles.admin;
    }

    @action.bound
    public changeRole(role: EERoles) {
        console.log('change role', role);
        this.role = role;
    }
}

const roleStore = new RoleStore();

export default roleStore;

