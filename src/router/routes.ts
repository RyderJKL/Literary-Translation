// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
import * as Loadable from 'react-loadable';
import { EERoles } from '@/store/role';

export interface IIRoute {
    path: string;
    name: string;
    title: string;
    exact?: boolean;
    strict?: boolean;
    meta?: IIRoutesMeta;
    component?: () => any;
    routes?: IIRoute [];
}

export interface IIRoutesMeta {
   roles: EERoles [];
}

export const fixedRoutes: IIRoute [] = [
    {
        path: '/404',
        name: '404',
        title: '404',
        component: Loadable({
            loader: () => import('@/views/notFound/NotFound'),
            loading() {
                return 'Loading';
            }
        }),
    }
];

export const dynamicRoutes: IIRoute [] = [
    {
        path: '/home',
        name: 'home',
        title: '首页',
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
        exact: true,
        component: Loadable({
            loader: () => import('@/views/dashboard/Dashboard'),
            loading() {
                return 'loading';
            }
        }),
        meta: {
            roles: [EERoles.admin]
        }
    }
];

export const rootRoute: IIRoute =  {
    path: '/',
    // exact: true,
    name: 'root',
    title: '根路径',
    component: Loadable({
        loader: () => import('@/views/layout/Layout'),
        loading() {
            return 'loading';
        }
    }),
    routes: [
        ...fixedRoutes
    ]
};

// export const routes = [
//    rootRoute
// ];
