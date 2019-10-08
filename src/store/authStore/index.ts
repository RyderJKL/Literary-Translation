import { types, Instance } from 'mobx-state-tree';

export const AuthStoreModel = types.model('AuthStore', {
    token: types.string
});

export type AuthStoreType = Instance<typeof AuthStoreModel>;

