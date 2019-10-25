import { IRoute, IMenuItem } from '@/typings';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';

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
    const originMenusData = memoizeFormatter(routesData);
    return originMenusData;
}
