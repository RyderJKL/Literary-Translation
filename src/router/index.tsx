import * as React from 'react';
import { Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { RouterModel, syncHistoryWithStore } from 'mst-react-router';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

export const routerModel = RouterModel.create();
export const browserHistory = createBrowserHistory();
export const history = syncHistoryWithStore(browserHistory, routerModel);

export const RouterViewers = () => (
    <div>
        <Router history={history}>
            <Switch>
                {renderRoutes(routes)}
            </Switch>
        </Router>
    </div>
);

