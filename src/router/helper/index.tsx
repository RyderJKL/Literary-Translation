import * as React from 'react';
import { Switch, Route, Redirect, matchPath } from 'react-router-dom';
import { IIRoutes } from '@/router/routes';

export function renderRoutes(routes: IIRoutes, extraProps?: {}, switchProps?: {}) {
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

const computeRootMatch = (pathname) => {
    return { path: '/', url: '/', params: {}, isExact: pathname === '/' };
};

export function matchRoutes(routes: IIRoutes, pathname, /*not public API*/ branch = []) {
    routes.some((route) => {
        const match = route.path
            ? matchPath(pathname, route)
            : branch.length
                ? branch[branch.length - 1].match // use parent match
                : computeRootMatch; // use default "root" match

        if (match) {
            branch.push({ route, match });

            if (route.routes) {
                matchRoutes(route.routes, pathname, branch);
            }
        }

        return match;
    });

    return branch;
}

