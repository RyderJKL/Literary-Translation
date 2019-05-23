import * as React from 'react';
import {Route, Switch} from 'react-router';
import NavBar from '../views/NavBar';
import Home from '../views/Home';
import Hello from '../views/Hello';

const routes = (
    <div>
        <NavBar/>
        <Switch>
            <Route exact={true} path='/' component={Home}/>
            <Route path='/hello' component={Hello}/>
        </Switch>
    </div>
);

export default routes;
