import { observable, action, reaction } from 'mobx';
import roleStore, { EERoles } from '@/store/role';
// import { cloneDeep } from 'lodash';
import { rootRoute, dynamicRoutes, fixedRoutes, IIRoute, } from '@/router/routes';

function checkPermission(role: EERoles, route: IIRoute): boolean {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(role);
    }

    return true;
}

function getAccessibleRoutes(role: EERoles, routes: IIRoute[]): IIRoute [] {
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

export class RoutesInStore {
    @observable public routes: IIRoute [];

    constructor() {
        this.routes = [rootRoute];

        reaction(() => roleStore.role, (role, isReaction) => {
            this.generateRoutes(role);
            isReaction.dispose();
            // fireImmediately 系统初始化时立即生成路由表
        }, { fireImmediately: true });
    }

    @action
    public generateRoutes = (role: EERoles) => {
       const accessRoutes: IIRoute [] = getAccessibleRoutes(role, dynamicRoutes);
       // const shallowRootRoute = cloneDeep(rootRoute);
       rootRoute.routes.concat(accessRoutes);
       this.routes = [rootRoute];
    }
}

const routesStore = new RoutesInStore();

export default routesStore;
