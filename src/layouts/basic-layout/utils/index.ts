import {IIMenuItem, IIMenuItems, IIRoute, IIRoutes} from '@/router/routes';
import {matchRoutes} from '@/router/helper';

export function getSideBarMenusData(routes: IIRoutes, pathname: string) {
    const rootMatchRoute = matchRoutes(routes, location.pathname)[0];
    if (!rootMatchRoute) {
        return [];
    }

    const basicLayoutRoute: IIRoute = rootMatchRoute.route as IIRoute;
    const routesData = basicLayoutRoute.routes;

    return getMenusData(routesData);
}

export function getMenusData(routesData: IIRoutes): IIMenuItems {
    const shouldShowMenuItem = (route: IIRoute) => !(!route.path || !route.name || route.hiddenInMenu);
    const menuItems: IIMenuItems = [];

    routesData.forEach(route => {
        if (!shouldShowMenuItem(route)) {
            return;
        }

        const tmpRoute: IIMenuItem = {
            name: route.name,
            icon: route.icon || '',
            path: route.path,
            children: []
        };

        if (route.routes) {
            tmpRoute.children = getMenusData(route.routes);
        }

        menuItems.push(tmpRoute);
    });

    return menuItems;
}
