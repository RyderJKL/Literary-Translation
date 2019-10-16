// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
import React from 'react';
import * as Loadable from 'react-loadable';
import { EERoles } from '@/store/role';
import components from './modules/components';
import NotFound from '@/views/notFound/NotFound';

export interface IIRoute {
    path?: string;
    name?: string;
    title?: string;
    exact?: boolean;
    strict?: boolean;
    sensitive?: boolean;
    redirect?: string;
    meta?: IIRoutesMeta;
    component?: any;
    routes?: IIRoute [];
}

export interface IIRoutesMeta {
    roles: EERoles [];
}

export const commonRoute: IIRoute = {
    path: '/user',
    name: 'user',
    title: '用户',
    component: Loadable({
        loader: () => import('@/layouts/UserLayout'),
        loading() {
            return 'Loading';
        }
    }),
    routes: [
        {
            path: '/user',
            name: '404',
            title: '404',
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
        loader: () => import('@/layouts/basic-layout/BasicLayout'),
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
            title: '首页',
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
            title: '仪表盘',
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
