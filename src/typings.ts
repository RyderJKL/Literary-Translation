import * as React from 'react';
import {RouteComponentProps, match, RouteProps} from 'react-router-dom';
import {EERoles} from '@/store/role';

export interface IIRouteMeta {
    roles: EERoles[];
}

export interface IIMenuItem {
    icon?: string;
    meta?: IIRouteMeta;
    name?: string;
    hiddenChildrenInMenu?: boolean;
    hiddenInMenu?: boolean;
    children?: IIMenuItem[];
    path?: string;
    [index: string]: any;
}

export interface IIRoute extends Omit<RouteProps, 'path' | 'children' | 'component'>, IIMenuItem {
    routes?: IIRoute[];
    component?: RouteProps['component'] | any;
}

export type WithFalse<T> = T | false;

export interface IIRouter<P> extends Omit<RouteComponentProps, 'location'> {
    computedMatch?: match<P>;
    route?: IIRoute;
    location: RouteComponentProps['location'] | {pathname?: string};
}
