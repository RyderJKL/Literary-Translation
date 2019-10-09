// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

import Layout from 'views/layout/Layout';

import Home from 'views/Home';
import Dashboard from 'views/dashboard/Dashboard';
import NotFound from 'views/notFound/NotFound';

const fixedRoutes = [
    {
        path: '/404',
        component: NotFound,
        roles: ['admin', 'user']
    }
];

const dynamicRoutes = [
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

const routes = () => [
    {
        path: '/',
        extra: true,
        component: Layout,
        routes: [...fixedRoutes, ...dynamicRoutes]
    },
];

export default routes();
