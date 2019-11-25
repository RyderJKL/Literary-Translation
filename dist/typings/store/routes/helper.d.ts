import { IRoute, Roles } from '@/typings';
export declare function checkPermission(role: Roles, route: IRoute): boolean;
export declare function getAccessibleRoutes(role: Roles, routes: IRoute[]): IRoute[];
