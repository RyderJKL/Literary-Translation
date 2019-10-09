import { types, Instance } from 'mobx-state-tree';

export const UserModel = types.model('User', {
    id: types.optional(types.string, '123'),
    name: types.optional(types.string, 'jack'),
});

export type UserType = Instance<typeof UserModel>;

