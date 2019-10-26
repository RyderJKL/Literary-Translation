import { IRoute, IMenuItem, MenuItemPropertyProps } from '@/typings';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import * as pathToRegexp from 'path-to-regexp';

// formatter routes to menus
function formatter(routesData: IRoute[]): IMenuItem[] {
    return routesData
        .filter(item => item.path)
        .filter(item => item.name)
        .filter(item => !item.hiddenInMenu)
        .map(routeItem => {
            if (routeItem.routes && !routeItem.hiddenChildrenInMenu) {
                routeItem.children = formatter(routeItem.routes);
            }

            return routeItem;
        });
}

const memoizeFormatter = memoizeOne(formatter, isEqual);

export function getMenusData(routesData: IRoute[]): IMenuItem[] {
    // todo
    const originMenusData = memoizeFormatter(routesData);
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
export function pathnameToList(pathname: string): string [] {

    const pathSplitArr: string[] = pathname.split('/').filter(item => item);

    const tmp = [''];
    pathSplitArr.forEach((item, index) => {
        tmp.push(`${tmp[index]}/${item}`)
    });

    return tmp.filter(item => item);
}

export function getSelectedMenusKey(flatMenuKeys: string[], pathname: string): string[] {
    return pathnameToList(pathname).map(path => flatMenuKeys.filter((menuKey) =>
        menuKey && pathToRegexp(menuKey).test(path)).pop()
    ).filter(item => item);
}
