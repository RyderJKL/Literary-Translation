import { types, Instance } from 'mobx-state-tree';
import { UserModel } from './user';
import { routerModel } from './router';
import { RouterModel } from 'mst-react-router';

export const StoreModel = types.model('StoreModel', {
    user: types.optional(UserModel, {}),
    router: RouterModel
});

export type StoreType = Instance<typeof StoreModel>;

export const createStore = () => StoreModel.create({ router: routerModel });
