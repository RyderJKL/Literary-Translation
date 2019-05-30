import {createStore, applyMiddleware, compose} from 'redux';
import {createBrowserHistory} from 'history';
// import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import {routerMiddleware} from 'connected-react-router';

// import api from '../middleware/api';
// import thunk from 'redux-thunk';
import createRootReducer from './store';

export const history = createBrowserHistory();

export default function configStore(preloadedState?: any) {
    const useLogger = false;

    const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const middlewares = [routerMiddleware(history)];

    // if (useLogger && process.env.NODE_ENV !== 'production') {
    //     // https://github.com/LogRocket/redux-logger
    //     const logger = createLogger({
    //         collapsed: true
    //     });
    //
    //     middlewares = [...middlewares, logger];
    // }

    const middlewareEnhancer = applyMiddleware(...middlewares);

    // const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeEnhancer(middlewareEnhancer);

    const store = createStore(createRootReducer(history), preloadedState, composedEnhancers);

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
