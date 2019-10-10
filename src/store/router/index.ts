import * as React from 'react';
import { types, Instance } from 'mobx-state-tree';
// import { dynamicRoutes } from 'router/routes';

// tslint:disable-next-line:interface-name
export interface IRole {
    [index: string]: string;
}

export interface IIExample {
    name: string;
    children: IIExample;
}

export const RouteModel = types.model('route', {
    path: types.string,
    name: types.string,
    title: types.string,
    mata: types.map(types.string),
    component: types.frozen(),
    // maybe 防止无限循环
    children: types.late(() => RouteModel)
});

function filterAsyncRoutes(routes: RouteModelType [], roles: IRole []): RouteModelType[] {
    const res = [];

    return routes;
}

export const RouterModel = types
    .model('router', { routes: types.array(RouteModel) })
    .actions((self) => {

        function generateRoutes(roles: IIExample) {
            const accessedRoutes: RouteModelType [] = [];
            // dynamicRoutes.forEach(route => {})
            // console.log()
        }

        return {
            generateRoutes
        };
    });

export type RouteModelType = Instance<typeof RouteModel>;
