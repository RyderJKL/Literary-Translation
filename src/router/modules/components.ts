import { IRoute } from '@/typings';
import * as Loadable from 'react-loadable';
import NotFound from '@/components/not-found/NotFound';

export const components: IRoute = {
    path: '/components',
    name: 'components',
    component: Loadable({
        loader: () => import('@/views/components/Components'),
        loading() {
            return 'Loading';
        }
    }),
    routes: [
        {
            path: '/components',
            redirect: '/components/progress'
        },
        {
            path: '/components/progress',
            name: 'progress',
            exact: true,
            component: Loadable({
                loader: () => import('@/components/progress/Progress'),
                loading() {
                    return 'Loading';
                }
            })
        },
        {
            path: '/components/dynamic/:id',
            name: 'dynamicProgress',
            hiddenInMenu: true,
            exact: true,
            component: Loadable({
                loader: () => import('@/components/progress/Progress'),
                loading() {
                    return 'Loading';
                }
            })
        }
    ]
};

export default components;
