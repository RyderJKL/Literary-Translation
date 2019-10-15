// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
import React from 'react';
import * as Loadable from 'react-loadable';
import { EERoles } from '@/store/role';
import components from './modules/components';

export interface IIRoute {
    path?: string;
    name?: string;
    title?: string;
    exact?: boolean;
    strict?: boolean;
    meta?: IIRoutesMeta;
    component?: React.ReactNode | Promise<any> | (() => any);
    routes?: IIRoute [];
}

export interface IIRoutesMeta {
   roles: EERoles [];
}

export const commonRoutes: IIRoute [] = [
    // {
      // component: import('@/layouts/UserLayout'),
      // routes: [
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
      // ]
    // },
];

// function pickRoutesWithLayouts (topRoute: IIRoute) {
// }

export const authorityRoutes: IIRoute [] = [
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
    },
    components
];

export const rootRoute: IIRoute =  {
    path: '/',
    name: 'root',
    title: '根路径',
    component: Loadable({
        loader: () => import('@/views/layout/Layout'),
        loading() {
            return 'loading';
        }
    }),
    routes: [
        ...commonRoutes
    ]
};

