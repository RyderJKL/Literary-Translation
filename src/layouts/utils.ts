// import { IRoute, IMenuItem, MenuItemPropertyProps } from '@/typings';
import { clone, equals, last } from 'ramda';
import memoizeOne from 'memoize-one';
import * as pathToRegexp from 'path-to-regexp';

// formatter routes to menus
// function formatter(routesData: IRoute[]): IMenuItem[] {
//     return routesData
//         .filter(item => item.path)
//         .filter(item => item.name)
//         .map(routeItem => {
//             if (routeItem.routes && routeItem.routes.length) {
//                 routeItem.children = formatter(routeItem.routes);
//             }
//
//             return routeItem;
//         });
// }

// const memoizeFormatter = memoizeOne(formatter, equals);

// export function getMenusData(routesData: IRoute[]): IMenuItem[] {
//     // todo
//     return memoizeFormatter(clone(routesData));
// }

/**
 *
 * @param menusData
 * @param key
 * @param children
 * return [{path}, {path}] =>[path, path]
 */
// function flatMenusKeys(
//     menusData: IMenuItem[],
//     { key = 'path', children = 'children' }: Partial<MenuItemPropertyProps> = {}
// ): string[] {
//     let keys = [];
//
//     menusData.forEach(item => {
//         keys.push(item[key]);
//
//         if (item[children]) {
//             keys = keys.concat(getFlatMenuKeys(item[children]));
//         }
//     });
//
//     return keys;
// }

// const memoizeFlatMenusKeys = memoizeOne(flatMenusKeys, equals);
//
// export function getFlatMenuKeys(menusData: IMenuItem[], menuItemPropertyProps?: MenuItemPropertyProps): string[] {
//     return memoizeFlatMenusKeys(menusData, menuItemPropertyProps);
// }

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

// export function _getFlatMenus(menusData: IMenuItem[]): IMenuItem[] {
//     let menusMap = [];
//
//     menusData.forEach(item => {
//         if (item.children && item.children.length) {
//             menusMap = [...menusMap, ..._getFlatMenus(item.children)];
//         }
//
//         menusMap.push(item);
//     });
//
//     return menusMap;
// }

// export const getFlatMenus = memoizeOne(_getFlatMenus, equals);

// export function _matchMenusWithPathname(menusDta: IMenuItem[], pathname: string): IMenuItem[] {
//     const flatMenus = getFlatMenus(menusDta);
//
//     const getMatchMenu = targetPath => flatMenus.filter(item => pathToRegexp(item.path).test(targetPath));
//
//     const pathArr = pathnameToList(pathname);
//     const result = pathArr.map(path => last(getMatchMenu(path))).filter(item => item);
//
//     return result;
// }
//
// export const matchMenusWithPathname = memoizeOne(_matchMenusWithPathname, equals);
//
// export function getCurrentMenuItemWitPathname(route: IRoute, pathname?: string) {
//     const menusData = getMenusData(route.routes);
//     const matchMenus = matchMenusWithPathname(menusData, pathname);
//     return last(matchMenus);
// }
//
// export function getSelectedMenusKey(menusDta: IMenuItem[], pathname: string): string[] {
//     const matchMenus = matchMenusWithPathname(menusDta, pathname);
//     return matchMenus.map(menuItem => menuItem.path).filter(item => item);
// }
