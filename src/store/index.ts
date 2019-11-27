import common from './common';
import ui from './UI';

export const createStore = () => {
    return {
        common,
        ui
    };
};

const rootStore = createStore();

export type StoreType = typeof rootStore;
export { default as connect } from './connect';
export * from './common';

export default rootStore;
