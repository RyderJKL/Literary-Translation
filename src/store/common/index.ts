import { types, Instance } from 'mobx-state-tree';

export const CommonModel = types.model('CommonStore', {
    id: types.string,
    name: types.string
});

export type CommonType = Instance<typeof CommonModel>;

