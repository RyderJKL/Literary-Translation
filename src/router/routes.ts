import * as Loadable from 'react-loadable';
import components from './modules/components';
import exception from './modules/exception';
import NotFound from '@/components/exception/not-found';
import { IRoute, Roles } from '@/typings';

export const commonRoute: IRoute = {
    path: '/user',
    name: 'user',
    component: Loadable({
        loader: () => import('@/layouts/user-layout/index'),
        loading() {
            return 'Loading';
        }
    }),
    routes: [
        {
            path: '/user/login',
            name: '登录',
            component: Loadable({
                loader: () => import('@/views/login'),
                loading() {
                    return 'Loading';
                }
            })
        },
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
            name: '首页',
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
            name: '监控页',
            component: Loadable({
                loader: () => import('@/views/dashboard'),
                loading() {
                    return 'loading';
                }
            }),
            meta: {
                roles: [Roles.admin]
            }
        },
        components,
        exception
    ]
};

const routes = [commonRoute, authorityRoute];

export default routes;
