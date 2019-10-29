import { observable, action, reaction } from 'mobx';
import roleStore from '@/store/role';
import routerRoutes from '@/router/routes';
import { IRoute, Roles } from '@/typings';
import { getAccessibleRoutes } from './helper';

export class RoutesInStore {
    @observable public routes: IRoute[];

    constructor() {
        this.routes = [];

        reaction(
            () => roleStore.role,
            (role, isReaction) => {
                this.generateRoutes(role);
                isReaction.dispose();
                // fireImmediately 系统初始化时立即生成路由表
            },
            { fireImmediately: true }
        );
    }

    @action.bound
    public generateRoutes = (role: Roles) => {
        const accessRoutes: IRoute[] = getAccessibleRoutes(role, routerRoutes);
        this.routes = accessRoutes;
    };
}

const routesStore = new RoutesInStore();

export default routesStore;
