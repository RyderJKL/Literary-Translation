import * as React from 'react';
import { IMenuItem } from '@/typings';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { getSelectedMenusKey } from './utils';
import userStore from '@/hooks/use-store';
import Menu from 'lego-ui/dist/lib/menu';

// import { toJS } from 'mobx';

const { Submenu, Item } = Menu;

export interface ISideBarProps extends RouteComponentProps {
    menusData: IMenuItem[];
    defaultSelectedMenuKeys?: string;
    defaultOpenMenuKeys?: string;
}

const Sidebar: React.FC<ISideBarProps> = ({ menusData, history }) => {
    const [activeMenuIndex, setActiveMenuIndex] = React.useState<string>('home');

    const { menuCollapse } = userStore(store => ({
        menuCollapse: store.UI.menuCollapse
    }));

    function handleHighlightCurrentPath() {
        const { location: { pathname } } = history;

        const menuKeys = getSelectedMenusKey(menusData, pathname);
        const currentActive = menuKeys.pop();
        setActiveMenuIndex(currentActive);
    }

    React.useEffect(() => {
        handleHighlightCurrentPath();

        history.listen(location => {
            handleHighlightCurrentPath();
        });
    }, []);

    const renderMenus = (menuData: IMenuItem[]) =>
        menuData.map((menuItem, index) => {
            if (menuItem.children && menuItem.children.length) {
                return (
                    <Submenu key={index} title={<span>{menuItem.name}</span>}>
                        {renderMenus(menuItem.children)}
                    </Submenu>
                );
            }

            return (
                <Item index={menuItem.path} key={index}>
                    <Link to={menuItem.path}>
                        {menuItem.name}
                    </Link>
                </Item>
            );
        });

    return (
        <div>
            <Menu collapse={menuCollapse} mode='vertical' theme='dark' activeIndex={activeMenuIndex}>
                {renderMenus(menusData)}
            </Menu>
        </div>
    );
};

export default withRouter(Sidebar);
