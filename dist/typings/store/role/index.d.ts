import { Roles } from '@/typings';
export declare class RoleStore {
    role: Roles;
    constructor();
    changeRole(role: Roles): void;
}
declare const roleStore: RoleStore;
export default roleStore;
