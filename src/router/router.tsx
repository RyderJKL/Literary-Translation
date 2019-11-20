import * as React from 'react';
import useStore from '@/hooks/use-store';
import { Router } from 'react-router';
import { renderRoutes } from '@/router/helper';
import { createBrowserHistory } from 'history';
import { RouterStore as MoxReactRouterStore, syncHistoryWithStore } from 'mobx-react-router';

import NotFound from '@/components/exception/not-found';
export const browserHistory = createBrowserHistory();
export const syncRouter = new MoxReactRouterStore();
export const history = syncHistoryWithStore(browserHistory, syncRouter);

export const RouterViewers = () => {
    const { routes  } = useStore(store => ({
        routes: store.routes.routes
    }));

    return <Router history={history}>{renderRoutes(routes, {}, {}, NotFound)}</Router>;
};
