import { Route } from '@/config/routes';
import { OmitProps } from 'lego-ui/dist/lib/utils';
import { utils } from 'lego-ui';

export type RealRoute = OmitProps<Route, 'routes' | 'icon'>;

export function compileRoutes(routes: Route[], rootPath: string): RealRoute[] {
    let realRoutes: RealRoute[] = [];

    routes.forEach((route) => {
        const { path, title, redirect, layout, component, requiredAuth, routes } = route;

        if (utils.isExist(component) || utils.isExist(redirect)) {
            realRoutes.push({
                path: `${rootPath}${path}`,
                title,
                redirect: utils.isExist(redirect) ?  `${rootPath}${redirect}` : undefined,
                layout,
                component,
                requiredAuth
            });
        }

        if (utils.isExist(routes)) {
            const childRealRoutes = compileRoutes(routes, rootPath)
                .map((childRoute) => Object.assign(childRoute, {
                    layout,
                    requiredAuth: requiredAuth || childRoute.requiredAuth
                }));

            realRoutes = realRoutes.concat(childRealRoutes);
        }
    });

    return realRoutes;
}

export interface RouteMenu extends OmitProps<Route, 'routes' | 'layout' | 'component' | 'routes'> {
    type: 'item' | 'group';
}

export function transforToMenu(routes: Route[], rootPath: string): RouteMenu[] {
    const mainIndex = routes.findIndex((route) => route.path === '');

    const pickItems = (childRoutes: Route[]): RouteMenu[] => {
        const collect = [];

        childRoutes.forEach((route) => {
            const { path, title, icon, routes } = route;

            if (utils.isExist(path)) {
                collect.push({
                    path: `${rootPath}${path}`,
                    title,
                    icon,
                    type: 'item'
                });
            }
            else {
                collect.push({
                    title,
                    icon,
                    type: 'group',
                    items: pickItems(routes)
                })
            }
        });

        return collect;
    }

    return pickItems(routes[mainIndex].routes);
}
