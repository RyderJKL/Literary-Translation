
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';

// import api from '../middleware/api';
// import thunk from 'redux-thunk';
import { AppState } from 'store';

export const history = createBrowserHistory();

export default function configStore( preloadedState ) {
    let middlewares = [routerMiddleware(history), thunk, api];

    if (process.env.NODE_ENV !== 'production') {
        // https://github.com/LogRocket/redux-logger
        const logger = createLogger({
            collapsed: true
        })

        middlewares = [...middlewares, logger];
    }

    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    return createStore(AppState(history), preloadedState, composedEnhancers);
}
