import { IRoute, Roles } from '@/typings';
export declare class RoutesInStore {
    routes: IRoute[];
    constructor();
    generateRoutes: (role: Roles) => void;
}
declare const routesStore: RoutesInStore;
export default routesStore;
