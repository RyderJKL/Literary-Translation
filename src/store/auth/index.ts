import { types, Instance } from 'mobx-state-tree';

export const AuthModel = types.model('Auth', {
    token: types.string
});

export type AuthType = Instance<typeof AuthModel>;

