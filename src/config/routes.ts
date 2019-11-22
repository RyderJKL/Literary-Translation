/**
 * 路由配置考虑实际部署情况可能非根路径问题，所以将根路径单独拿出配置
 * 对用路由地址首位应忽略rootPath
 * 如：实际访问地址 /user/login
 * rootPath 为 /
 * 配置的路由path应当为 user/login
 * layout component不能同时存在
 * 不设置path时认为是分组，分组仅支持1层深度
 */

export interface Route {
    path?: string;
    title: string;
    icon?: string;
    redirect?: string;
    layout?: () => Promise<any>;
    component?: () => Promise<any>;
    requiredAuth?: boolean;
    routes?: Route[];
};

export const rootPath = '/';

export const loginPath = 'user/login';

export const routes: Route[] = [
    {
        path: '',
        title: 'main',
        requiredAuth: true,
        layout: () => import('@/layouts/basic-layout'),
        redirect: 'home',
        routes: [
            {
                path: 'home',
                title: '首页',
                component: () => import('@/views/home')
            },
            {
                title: 'Dashboard',
                icon: 'dashboard',
                routes: [
                    {
                        title: 'Chart',
                        path: 'dashboard/chart',
                        component: () => import('@/views/dashboard/chart')
                    },
                    {
                        title: 'Map',
                        path: 'dashboard/map',
                        component: () => import('@/views/dashboard/map')
                    }
                ]
            },
        ]
    },
    {
        path: 'user',
        title: 'user',
        layout: () => import('@/layouts/user-layout'),
        redirect: loginPath,
        routes: [
            {
                path: loginPath,
                title: '登录',
                component: () => import('@/views/user/login')
            }
        ]
    },
    // todo 404 5xx
];
