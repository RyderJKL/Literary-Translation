// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
import React from 'react';
import * as Loadable from 'react-loadable';
import { Roles } from '@/store/role';
import components from './modules/components';
import NotFound from '@/views/notFound/NotFound';
import { IRoute } from '@/typings';

export const commonRoute: IRoute = {
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
            component: NotFound
        },
        {
            component: NotFound
        }
    ]
};

export const authorityRoute: IRoute = {
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
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                roles: [Roles.admin]
            },
            component: Loadable({
                loader: () => import('@/views/Home'),
                loading() {
                    return 'Loading';
                }
            })
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
                roles: [Roles.admin]
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
