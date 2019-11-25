import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { configure as configureMobx } from 'mobx';
import { utils } from 'lego-ui';
import { StoreProvider } from '@/hooks/use-store/use-store-context';
import { rootPath, routes, loginPath } from '@/config/routes';
import { compileRoutes } from '@/utils/router';
import DynamicImport from '@/components/dynamic-import';
import { logined } from '@/utils/auth';
import * as config from '@/config';
import '@/styles/global.scss';
import '@/styles/admin-pro-icons.scss';

configureMobx({ enforceActions: 'always' });

ReactDom.render(
    <StoreProvider>
        <BrowserRouter>
            <Switch>
                {compileRoutes(routes, rootPath).map(route => {
                    const { path, title, redirect, layout, component, requiredAuth } = route;

                    return (
                        <Route
                            key={path}
                            path={path}
                            exact={true}
                            render={props => {
                                document.title = `${title} | ${config.SITE_NAME}`;

                                if (utils.isExist(redirect)) {
                                    return <Redirect to={redirect} from={path} />;
                                }

                                if (requiredAuth && !logined()) {
                                    return <Redirect to={`${rootPath}${loginPath}?redirect=${path}`} from={path} />;
                                }

                                return (
                                    <DynamicImport title={title} layout={layout} router={props} component={component} />
                                );
                            }}
                        />
                    );
                })}
            </Switch>
        </BrowserRouter>
    </StoreProvider>,
    document.getElementById('root') as HTMLElement
);
