import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

export const browserHistory = createBrowserHistory();
export const routerStore = new RouterStore();
export const history = syncHistoryWithStore(browserHistory, routerStore);

export default routerStore;
