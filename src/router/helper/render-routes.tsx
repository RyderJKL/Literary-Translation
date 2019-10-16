import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { IIRoute } from '@/router/routes';

function renderRoutes(routes: IIRoute [], extraProps?: {}, switchProps?: {}) {
    return routes ? (
        <Switch
            {...switchProps}
        >
            {
                routes.map((route, index) => {
                    if (route.redirect) {
                       return (<Redirect
                           exact={true}
                           key={route.name || index}
                           from={route.path}
                           to={route.redirect}
                           strict={route.strict}
                       />);
                    }

                    return <Route
                        key={route.name || index}
                        path={route.path}
                        exact={route.exact}
                        strict={route.strict}
                        sensitive={route.sensitive}
                        render={(props) => {
                            const childRoutes = renderRoutes(route.routes, extraProps, {
                                location: props.location
                            });

                            if (route.component) {
                                const { component: Component } = route;
                                const newProps =  { ...props, ...extraProps };
                                return <Component {...newProps} route={route}>
                                    {childRoutes}
                                </Component>;
                            } else {
                                return childRoutes;
                            }
                        }}
                    />; })
            }
        </Switch>
    ) : null;
}

export default renderRoutes;
