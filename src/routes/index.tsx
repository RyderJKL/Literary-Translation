import * as React from 'react';
import { Router, Route, Switch } from 'react-router';
import Home from 'pages/Home';
import Hello from 'pages/hello/Hello';

const RouterViews = ({ history }) => (
    <div>
        <Router history={history}>
            <Switch>
                <Route exact={true} path='/' component={Home}/>
                <Route path='/hello' component={Hello}/>
            </Switch>
        </Router>
    </div>
);

export default RouterViews;
