import {IIRoute, IIMenuItem} from '@/typings';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';

// formatter routes to menus
function formatter(routesData: IIRoute[]): IIMenuItem[] {
    return routesData
        .filter(item => item.path)
        .filter(item => item.name)
        .filter(item => !item.hiddenInMenu)
        .map(routeItem => {
            if (routeItem.routes && !routeItem.hiddenChildrenInMenu) {
                routeItem['children'] = formatter(routeItem.routes);
            }

            return routeItem;
        });
}

const memoizeFormatter = memoizeOne(formatter, isEqual);

export function getMenusData(routesData: IIRoute[]): IIMenuItem[] {
    const originMenusData = memoizeFormatter(routesData);
    return originMenusData;
}
