// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
import { RouteModelType } from 'store/router';
import Layout from 'views/layout/Layout';

import Home from 'views/Home';
import Dashboard from 'views/dashboard/Dashboard';
import NotFound from 'views/notFound/NotFound';

const fixedRoutes: RouteModelType [] = [
    {
        path: '/404',
        component: NotFound,
    }
];

const dynamicRoutes: RouteModelType [] = [
    {
        path: '/home',
        component: Home,
        roles: ['admin', 'user']
    },
    {
        path: '/dashboard',
        exact: true,
        component: Dashboard,
        roles: ['admin', 'user']
    }
];

const routes: RouteModelType [] = [
    {
        path: '/',
        extra: true,
        component: Layout,
        routes: [...fixedRoutes, ...dynamicRoutes]
    },
];

export default routes;
