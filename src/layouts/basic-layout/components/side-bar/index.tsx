import * as React from 'react';
import {IIMenuItem} from '@/typings';
import {matchRoutes} from '@/router/helper';
import {Link, withRouter, RouteComponentProps, matchPath} from 'react-router-dom';

import Menu from 'lego-ui/dist/lib/menu';

const {Submenu, Item} = Menu;

// import {map, multicast} from "rxjs/operators";

export interface IISideBarProps extends RouteComponentProps {
    menusData: IIMenuItem[];
}

// export declare type Index = React.ReactText;

// interface IIMenuAtiveState {
//     menuActiveIndex: Index;
//     setMenuActiveIndex: (activeIndex: Index) => any
// }

const Sidebar: React.FC<IISideBarProps> = ({menusData, history}) => {
    // const [menuActiveIndex, setMenuActiveIndex] = React.useState<IIMenuAtiveState>('home');
    // const [menuCollapse, setMenuCollapse] = React.useState(false);
    // console.log(menusData);
    function findMenuAccordingPathFromMenusData(menusData: IIMenuItem[], pathname: string) {
        const mathRoute = matchRoutes(menusData, pathname);
        // console.log(mathRoute);
        // let tmpPath: string = '';
        // menusData.forEach((item) => {
        //     if (item.path === pathname) {
        //         tmpPath = pathname;
        //     }
        // })
    }

    function handleHighlightCurrentPath(menusData: IIMenuItem[], pathname) {
        findMenuAccordingPathFromMenusData(menusData, pathname);
    }

    React.useEffect(() => {
        const {location} = history;
        handleHighlightCurrentPath(menusData, location.pathname);

        history.listen(location => {
            handleHighlightCurrentPath(menusData, location.pathname);
        });
    });

    const renderMenus = (menusData: IIMenuItem[]) =>
        menusData.map((menuItem, index) => {
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
            <Menu mode="vertical" theme="dark" activeIndex="home">
                {renderMenus(menusData)}
            </Menu>
        </div>
    );
};

export default withRouter(Sidebar);
