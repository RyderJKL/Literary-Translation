import auth from './auth';
import common from './common';
import role from './role';
import { syncRouter } from '@/router';
import routesStore from './routes';

export const createStore = () => {
    return {
        auth,
        common,
        role,
        router: syncRouter,
        routes: routesStore
    };
};

const rootStore = createStore();

export type StoreType = typeof rootStore;

export default rootStore;
