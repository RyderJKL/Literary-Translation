// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
import React from 'react';
import * as Loadable from 'react-loadable';
import {EERoles} from '@/store/role';
import components from './modules/components';
import NotFound from '@/views/notFound/NotFound';
import {IIRoute} from '@/typings';

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
            component: NotFound
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
            redirect: '/home'
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
