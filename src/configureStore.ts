import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {createBrowserHistory} from 'history';

import {routerMiddleware} from 'connected-react-router';
import {AllActionType as Action} from 'store/actions';

import createRootReducer, { RootState } from './store';
export const history = createBrowserHistory();

export const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();


export default function configStore(preloadedState?: any) {
    const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // configure middlewares
    const middlewares = [ routerMiddleware(history), epicMiddleware];

    // compose enhancers
    const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

    // create store
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composedEnhancers
    );

    // Hot reloading
    /* tslint:disable */
    // if ((module as any).hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     (module as any).hot.accept('./store', () => {
    //         store.replaceReducer(createRootReducer(history));
    //     });
    // }

    return store;
}
