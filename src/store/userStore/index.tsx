import { types, Instance } from 'mobx-state-tree';

export const UserStoreModel = types.model('UserStore', {
    id: types.optional(types.string, '123'),
    name: types.optional(types.string, 'jack'),
});

export type UserStoreType = Instance<typeof UserStoreModel>;

