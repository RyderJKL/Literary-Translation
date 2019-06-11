import * as React from 'react';
import {Route, Switch} from 'react-router';
import NavBar from 'pages/NavBar';
import Home from 'pages/Home';
import Hello from 'pages/Hello';
import Todo from 'pages/Todo';
import MapWeatherInner from 'pages/MapWeather';

const routes = (
    <div>
        {/*<NavBar/>*/}
        <Switch>
            <Route exact={true} path='/' component={Home}/>
            <Route path='/hello' component={Hello}/>
            <Route path='/todo' component={Todo}/>
            <Route path='/map' component={MapWeatherInner}/>
        </Switch>
    </div>
);

export default routes;
