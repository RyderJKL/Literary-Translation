import { types, Instance } from 'mobx-state-tree';
import { UserStoreModel } from './userStore';
import { routerModel } from './routerStore';
import { RouterModel } from 'mst-react-router';

export const StoreModel = types.model('StoreModel', {
    user: types.optional(UserStoreModel, {}),
    router: RouterModel
});

export type StoreModelType = Instance<typeof StoreModel>;

export const createStore = () => StoreModel.create({ router: routerModel });
