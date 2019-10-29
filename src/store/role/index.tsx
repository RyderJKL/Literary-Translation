import { observable, action } from 'mobx';
import { Roles } from '@/typings';

export class RoleStore {
    @observable public role: Roles;

    constructor() {
        this.role = Roles.admin;
    }

    @action.bound
    public changeRole(role: Roles) {
        this.role = role;
    }
}

const roleStore = new RoleStore();

export default roleStore;
