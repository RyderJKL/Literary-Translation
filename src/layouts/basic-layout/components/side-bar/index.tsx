import * as React from 'react';
import { IMenuItem } from '@/typings';
import { matchRoutes } from '@/router/helper';
import { Link, withRouter, RouteComponentProps, matchPath } from 'react-router-dom';
import { getFlatMenuKeys, getSelectedMenusKey } from './utils';
// import * as pathToRegexp from 'path-to-regexp';

import Menu from 'lego-ui/dist/lib/menu';

const { Submenu, Item } = Menu;

// import {map, multicast} from "rxjs/operators";

export interface ISideBarProps extends RouteComponentProps {
    menusData: IMenuItem[];
}

// export declare type Index = React.ReactText;

// interface IIMenuAtiveState {
//     menuActiveIndex: Index;
//     setMenuActiveIndex: (activeIndex: Index) => any
// }

const Sidebar: React.FC<ISideBarProps> = ({ menusData, history }) => {
    // const [menuActiveIndex, setMenuActiveIndex] = React.useState<IIMenuAtiveState>('home');
    // const [menuCollapse, setMenuCollapse] = React.useState(false);
    function handleHighlightCurrentPath(menuItems: IMenuItem[], pathname) {
        const flatMenuKeys = getFlatMenuKeys(menuItems);
        const selectedMenuKeys = getSelectedMenusKey(flatMenuKeys, pathname);
        console.log(selectedMenuKeys);
    }

    React.useEffect(() => {
        const { location: historyLocation } = history;
        handleHighlightCurrentPath(menusData, historyLocation.pathname);

        history.listen(location => {
            handleHighlightCurrentPath(menusData, location.pathname);
        });
    });

    const renderMenus = (menuData: IMenuItem[]) =>
        menuData.map((menuItem, index) => {
            if (menuItem.children && menuItem.children.length) {
                return (
                    <Submenu key={index} className={''} title={<span>{menuItem.name}</span>}>
                        {renderMenus(menuItem.children)}
                    </Submenu>
                );
            }

            return (
                <Item index={menuItem.name} key={index}>
                    <Link to={menuItem.path}> {menuItem.name} </Link>
                </Item>
            );
        });

    return (
        <div>
            <Menu mode='vertical' theme='dark' activeIndex='home'>
                {renderMenus(menusData)}
            </Menu>
        </div>
    );
};

export default withRouter(Sidebar);
