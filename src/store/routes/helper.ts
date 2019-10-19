import { EERoles } from '@/store/role';
import { IIRoutes, IIRoute } from '@/router/routes';

export function checkPermission(role: EERoles, route: IIRoute): boolean {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(role);
    }

    return true;
}

export function getAccessibleRoutes(role: EERoles, routes: IIRoutes): IIRoutes {
    const res: IIRoutes = [];

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
