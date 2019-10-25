import { observable, action } from 'mobx';

export enum Roles {
    admin = 'admin',
    user = 'user'
}

export type EERolesArrType = Array<keyof typeof Roles>;

export class RoleStore {
    @observable public role: Roles;

    constructor() {
        this.role = Roles.admin;
    }

    @action.bound
    public changeRole(role: Roles) {
        console.log('change role', role);
        this.role = role;
    }
}

const roleStore = new RoleStore();

export default roleStore;
