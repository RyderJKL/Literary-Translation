import { observable, action, reaction } from 'mobx';
import roleStore, { EERoles } from '@/store/role';
import routerRoutes, { IIRoute } from '@/router/routes';
import { getAccessibleRoutes  } from './helper';

export class RoutesInStore {
    @observable public routes: IIRoute [];

    constructor() {
        this.routes = [];

        reaction(() => roleStore.role, (role, isReaction) => {
            this.generateRoutes(role);
            isReaction.dispose();
            // fireImmediately 系统初始化时立即生成路由表
        }, { fireImmediately: true });
    }

    @action
    public generateRoutes = (role: EERoles) => {
       const accessRoutes: IIRoute [] = getAccessibleRoutes(role, routerRoutes);
       this.routes = accessRoutes;
    }
}

const routesStore = new RoutesInStore();

export default routesStore;
