import { IRoute, Roles } from '@/typings';

export function checkPermission(role: Roles, route: IRoute): boolean {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(role);
    }

    return true;
}

export function getAccessibleRoutes(role: Roles, routes: IRoute[]): IRoute[] {
    const res: IRoute[] = [];

    routes.forEach(route => {
        const hasPermission = checkPermission(role, route);

        if (!hasPermission) {
            return;
        }

        if (route.routes) {
            route.routes = getAccessibleRoutes(role, route.routes);
        }

        res.push(route);
    });

    return res;
}
