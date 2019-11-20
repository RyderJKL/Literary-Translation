import { IRoute } from '@/typings';
import * as Loadable from 'react-loadable';
// import NotFound from '@/components/not-found/NotFound';

export const components: IRoute = {
    path: '/components',
    name: '组件',
    component: Loadable({
        loader: () => import('@/views/components'),
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
            name: '进度条',
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
