import { EERoles } from '@/store/role';
import { IIRoute } from '@/router/routes';

export function checkPermission(role: EERoles, route: IIRoute): boolean {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(role);
    }

    return true;
}

export function getAccessibleRoutes(role: EERoles, routes: IIRoute[]): IIRoute [] {
    const res: IIRoute[] = [];

    routes.forEach((route) => {
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
