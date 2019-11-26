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
}

export const rootPath = '/';

export const loginPath = 'user/login';

export const routes: Route[] = [
    {
        path: '',
        title: 'main',
        requiredAuth: true,
        layout: () => import('@/layouts/basic-layout'),
        redirect: 'dashboard/analysis',
        routes: [
            {
                title: 'Dashboard',
                icon: 'dashboard',
                routes: [
                    {
                        title: '分析页',
                        path: 'dashboard/analysis',
                        component: () => import('@/views/dashboard/analysis')
                    },
                    {
                        title: '监控页',
                        path: 'dashboard/moniter',
                        component: () => import('@/views/dashboard/moniter')
                    },
                    {
                        title: '工作台',
                        path: 'dashboard/workplace',
                        component: () => import('@/views/dashboard/workplace')
                    }
                ]
            },
            {
                title: '表单页',
                icon: 'form',
                routes: [
                    {
                        title: '基础表单',
                        path: 'form/basic',
                        component: () => import('@/views/form/basic')
                    },
                    {
                        title: '高级表单',
                        path: 'form/advanced',
                        component: () => import('@/views/form/advanced')
                    },
                    {
                        title: '分步表单',
                        path: 'form/steps',
                        component: () => import('@/views/form/steps')
                    }
                ]
            },
            {
                title: '列表页',
                icon: 'list',
                routes: [
                    {
                        title: '查询列表',
                        path: 'list/search',
                        component: () => import('@/views/list/search')
                    },
                    {
                        title: '卡片列表',
                        path: 'list/card',
                        component: () => import('@/views/list/card')
                    },
                    {
                        title: '标准列表',
                        path: 'list/standard',
                        component: () => import('@/views/list/standard')
                    }
                ]
            },
            {
                title: '详情页',
                icon: 'detail',
                routes: [
                    {
                        title: '基础详情页',
                        path: 'detail/basic',
                        component: () => import('@/views/detail/basic')
                    },
                    {
                        title: '列表详情',
                        path: 'detail/list',
                        component: () => import('@/views/detail/list')
                    }
                ]
            },
            {
                title: '结果页',
                icon: 'result',
                routes: [
                    {
                        title: '成功页',
                        path: 'result/success',
                        component: () => import('@/views/result/success')
                    },
                    {
                        title: '失败页面',
                        path: 'result/failed',
                        component: () => import('@/views/result/failed')
                    },
                    {
                        title: '异常页',
                        path: 'result/exception',
                        component: () => import('@/views/result/exception')
                    }
                ]
            },
            {
                title: '异常页',
                icon: 'exception',
                routes: [
                    {
                        title: '403',
                        path: 'exception/403',
                        component: () => import('@/views/exception/403')
                    },
                    {
                        title: '404',
                        path: 'exception/404',
                        component: () => import('@/views/exception/404')
                    },
                    {
                        title: '500',
                        path: 'exception/500',
                        component: () => import('@/views/exception/500')
                    }
                ]
            },
            {
                title: '个人页',
                icon: 'zone',
                routes: [
                    {
                        title: '个人详情',
                        path: 'zone/profile',
                        component: () => import('@/views/zone/profile')
                    },
                    {
                        title: '个人设置',
                        path: 'zone/settings',
                        component: () => import('@/views/zone/settings')
                    }
                ]
            }
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
            },
            {
                path: 'user/sign-up',
                title: '注册',
                component: () => import('@/views/user/sign-up')
            },
            {
                path: 'user/iforgot',
                title: '忘记密码',
                component: () => import('@/views/user/iforgot')
            }
        ]
    }
    // todo 404 5xx
];
