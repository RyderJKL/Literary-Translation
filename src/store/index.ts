import common from './common';
import UI from './ui';

export const createStore = () => {
    return {
        common,
        UI
    };
};

const rootStore = createStore();

export type StoreType = typeof rootStore;
export { default as  connect } from './connect';
export * from './common';
export * from './ui';

export default rootStore;
