import { IRoute, IMenuItem, MenuItemPropertyProps } from '@/typings';
import { clone } from 'ramda';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import * as pathToRegexp from 'path-to-regexp';

// formatter routes to menus
function formatter(routesData: IRoute[]): IMenuItem[] {
    return routesData
        .filter(item => item.path)
        .filter(item => item.name)
       .map(routeItem => {
            if (routeItem.routes && routeItem.routes.length) {
                routeItem.children = formatter(routeItem.routes);
            }

            return routeItem;
        });
}

const memoizeFormatter = memoizeOne(formatter, isEqual);

export function getMenusData(routesData: IRoute[]): IMenuItem[] {
    // todo
    const originMenusData = memoizeFormatter(clone(routesData));
    return originMenusData;
}

/**
 *
 * @param menusData
 * @param key
 * @param children
 * return [{path}, {path}] =>[path, path]
 */
function flatMenusKeys(
    menusData: IMenuItem[],
    { key = 'path', children = 'children' }: Partial<MenuItemPropertyProps> = {}
): string[] {
    let keys = [];

    menusData.forEach(item => {
        keys.push(item[key]);

        if (item[children]) {
            keys = keys.concat(getFlatMenuKeys(item[children]));
        }
    });

    return keys;
}

const memoizeFlatMenusKeys = memoizeOne(flatMenusKeys, isEqual);

export function getFlatMenuKeys(menusData: IMenuItem[], menuItemPropertyProps?: MenuItemPropertyProps): string[] {
    return memoizeFlatMenusKeys(menusData, menuItemPropertyProps);
}

/**
 *
 * @param pathname
 * '/user/settings/111' => ['/user', '/user/settings', '/user/settings/111']
 */
export function pathnameToList(pathname: string): string[] {
    const pathSplitArr: string[] = pathname.split('/').filter(item => item);

    const tmp = [''];
    pathSplitArr.forEach((item, index) => {
        tmp.push(`${tmp[index]}/${item}`);
    });

    return tmp.filter(item => item);
}

export function _getFlatMenus(menusData: IMenuItem[]): IMenuItem[] {
    let menusMap = [];

    menusData.forEach(item => {
        if (item.children && item.children.length) {
            menusMap = [...menusMap, ..._getFlatMenus(item.children)];
        }

        menusMap.push(item);
    });

    return menusMap;
}
export const getFlatMenus = memoizeOne(_getFlatMenus, isEqual);

export function _matchMenusWithPathname(menusDta: IMenuItem[], pathname: string): IMenuItem[] {
    const flatMenus = getFlatMenus(menusDta);
    return pathnameToList(pathname)
        .map(path => flatMenus.filter(menuItem => menuItem.path && pathToRegexp(menuItem.path).test(path)).pop())
        .filter(item => item);
}

export const matchMenusWithPathname = memoizeOne(_matchMenusWithPathname, isEqual);

export function getCurrentMenuItemWitPathname (route: IRoute, pathname?: string) {
    const menusData = getMenusData(route.routes);
    const matchMenus = matchMenusWithPathname(menusData, pathname).filter(item => item.path);
    return matchMenus.pop();
}

export function getSelectedMenusKey(menusDta: IMenuItem[], pathname: string): string[] {
    const matchMenus = matchMenusWithPathname(menusDta, pathname);
    return matchMenus.map(menuItem => menuItem.path).filter(item => item);
}
