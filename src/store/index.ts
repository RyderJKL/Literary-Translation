import auth from './auth';
import common from './common';
import UI from './ui';
import role from './role';
import { syncRouter } from '@/router/router';
import routesStore from './routes';

export const createStore = () => {
    return {
        auth,
        common,
        UI,
        role,
        router: syncRouter,
        routes: routesStore
    };
};

const rootStore = createStore();

export type StoreType = typeof rootStore;

export default rootStore;
