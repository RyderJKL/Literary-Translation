import * as React from 'react';
import useStore from '@/hooks/use-store';
import { Router, Switch } from 'react-router';
import { renderRoutes } from 'react-router-config';

import { createBrowserHistory } from 'history';
import { RouterStore as MoxReactRouterStore, syncHistoryWithStore } from 'mobx-react-router';

export const browserHistory = createBrowserHistory();
export const syncRouter = new MoxReactRouterStore();
export const history = syncHistoryWithStore(browserHistory, syncRouter);

import { toJS } from 'mobx';
export const RouterViewers = () => {
    const { routes } = useStore((store) => ({
        routes: store.routes.routes
    }));

    console.log(toJS(routes));

    return (
        <div>
            <Router history={history}>
                <Switch>
                    {renderRoutes(routes)}
                </Switch>
            </Router>
        </div>
    );
};

