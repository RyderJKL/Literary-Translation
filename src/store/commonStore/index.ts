import { types, Instance } from 'mobx-state-tree';

export const CommonStoreModel = types.model('CommonStore', {
    id: types.string,
    name: types.string
});

export type CommonStoreType = Instance<typeof CommonStoreModel>;

