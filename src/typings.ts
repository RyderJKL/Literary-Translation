import { RouteComponentProps, match, RouteProps } from 'react-router-dom';
import { Roles } from '@/store/role';

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

export type PickKeyToString<T> = {
    [P in keyof T]: string;
}

export type MenuItemPropertyProps = PickKeyToString<IMenuItem>

export interface IRoute extends Omit<RouteProps, 'path' | 'children' | 'component'>, IMenuItem {
    routes?: IRoute[];
    component?: RouteProps['component'] | any;
}

export type WithFalse<T> = T | false;

export interface IRouter<P> extends Omit<RouteComponentProps, 'location'> {
    computedMatch?: match<P>;
    route?: IRoute;
    location: RouteComponentProps['location'] | { pathname?: string };
}
