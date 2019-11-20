import { IRoute } from '@/typings';
import * as Loadable from 'react-loadable';

export const Exception: IRoute = {
    path: '/exception',
    name: '异常页',
    component: Loadable({
        loader: () => import('@/views/exception'),
        loading() {
            return 'Loading';
        }
    }),
    routes: [
        {
            path: '/exception',
            redirect: '/exception/not-found'
        },
        {
            path: '/exception/not-found',
            name: '404',
            exact: true,
            component: Loadable({
                loader: () => import('@/components/exception/not-found'),
                loading() {
                    return 'Loading';
                }
            })
        },
        {
            path: '/exception/unauthorized',
            name: '403',
            exact: true,
            component: Loadable({
                loader: () => import('@/components/exception/unauthorized'),
                loading() {
                    return 'Loading';
                }
            })
        },
        {
            path: '/exception/server-error',
            name: '500',
            exact: true,
            component: Loadable({
                loader: () => import('@/components/exception/server-error'),
                loading() {
                    return 'Loading';
                }
            })
        }
    ]
};

export default Exception;
