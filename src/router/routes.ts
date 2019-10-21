// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
import React from 'react';
import * as Loadable from 'react-loadable';
import { EERoles } from '@/store/role';
import components from './modules/components';
import NotFound from '@/views/notFound/NotFound';

export interface IIMenuItem {
    path?: string;
    name?: string;
    icon?: string;
    hiddenChildrenInMenu?: boolean;
    hiddenInMenu?: boolean;
    children?: IIMenuItem [];
    [index: string]: any;
}

export interface IIMenuItems extends Array<IIMenuItem> {}

export interface IIRoute extends IIMenuItem {
    exact?: boolean;
    strict?: boolean;
    sensitive?: boolean;
    redirect?: string;
    meta?: IIRoutesMeta;
    component?: any;
    routes?: IIRoute [];
}

export interface IIRoutes extends Array<IIRoute> {}

export interface IIRoutesMeta {
    roles: EERoles [];
}

export const commonRoute: IIRoute = {
    path: '/user',
    name: 'user',
    component: Loadable({
        loader: () => import('@/layouts/user-layout'),
        loading() {
            return 'Loading';
        }
    }),
    routes: [
        {
            path: '/user',
            name: '404',
            component: NotFound,
        },
        {
            component: NotFound
        }
    ]
};

export const authorityRoute: IIRoute = {
    path: '/',
    component: Loadable({
        loader: () => import('@/layouts/basic-layout/index'),
        loading() {
            return 'loading';
        }
    }),
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                roles: [EERoles.admin]
            },
            component: Loadable({
                loader: () => import('@/views/Home'),
                loading() {
                    return 'Loading';
                }
            }),
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Loadable({
                loader: () => import('@/views/dashboard/Dashboard'),
                loading() {
                    return 'loading';
                }
            }),
            meta: {
                roles: [EERoles.admin]
            }
        },
        components,
        {
            component: NotFound
        }
    ]
};

const routes = [commonRoute, authorityRoute];

export default routes;
