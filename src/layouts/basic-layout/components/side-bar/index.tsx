import * as React from 'react';
import {IIMenuItems} from '@/router/routes';
import {Link} from 'react-router-dom';

import Menu from 'lego-ui/dist/lib/menu';

const {Submenu, Item} = Menu;

// import {map, multicast} from "rxjs/operators";

export interface IISideBarProps {
    menusData: IIMenuItems;
}

// export declare type Index = React.ReactText;

// interface IIMenuAtiveState {
//     menuActiveIndex: Index;
//     setMenuActiveIndex: (activeIndex: Index) => any
// }

const Index: React.FC<IISideBarProps> = ({menusData}) => {
    // const [menuActiveIndex, setMenuActiveIndex] = React.useState<IIMenuAtiveState>('home');
    // const [menuCollapse, setMenuCollapse] = React.useState(false);
    // console.log(menusData);
    console.log(menusData);

    const renderMenus = (menusData: IIMenuItems) =>
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
            <Menu mode="vertical" theme="dark">
                {renderMenus(menusData)}
            </Menu>
        </div>
    );
};

export default Index;
