import * as React from 'react';
import { Router, Switch } from 'react-router';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

const RouterViewers = ({ history }) => (
    <div>
        <Router history={history}>
            <Switch>
                {renderRoutes(routes)}
            </Switch>
        </Router>
    </div>
);

export default RouterViewers;
