import common from './common';

export const createStore = () => {
    return {
        common
    };
};

const rootStore = createStore();

export type StoreType = typeof rootStore;
export { default as connect } from './connect';
export * from './common';

export default rootStore;
