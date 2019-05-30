import * as React from 'react';
import {Route, Switch} from 'react-router';
import NavBar from '../pages/NavBar';
import Home from '../pages/Home';
import Hello from '../pages/Hello';
import Index from '../pages/Todo';

const routes = (
    <div>
        <NavBar/>
        <Switch>
            <Route exact={true} path='/' component={Home}/>
            <Route path='/hello' component={Hello}/>
            <Route path='/todo' component={Index}/>
        </Switch>
    </div>
);

export default routes;
