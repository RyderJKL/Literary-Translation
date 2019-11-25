import { RouteComponentProps, match, RouteProps } from 'react-router-dom';
export declare enum Roles {
    admin = "admin",
    user = "user"
}
export interface IRouteMeta {
    roles: Roles[];
}
export interface IMenuItem {
    icon?: string;
    meta?: IRouteMeta;
    name?: string;
    hiddenChildrenInMenu?: boolean;
    hiddenInMenu?: boolean;
    children?: IMenuItem[];
    path?: string;
    [index: string]: any;
}
export declare type PickKeyToString<T> = {
    [P in keyof T]: string;
};
export declare type MenuItemPropertyProps = PickKeyToString<IMenuItem>;
export interface IRoute extends Omit<RouteProps, 'path' | 'children' | 'component'>, IMenuItem {
    routes?: IRoute[];
    component?: RouteProps['component'] | any;
}
export interface IRouter<P> extends Omit<RouteComponentProps, 'location'> {
    computedMatch?: match<P>;
    route?: IRoute;
    location: RouteComponentProps['location'] | {
        pathname?: string;
    };
}
