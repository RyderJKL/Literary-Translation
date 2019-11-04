import * as React from 'react';
import { IMenuItem } from '@/typings';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { getSelectedMenusKey } from './utils';

import classNames from 'classnames';

// import userStore from '@/hooks/use-store';

import { Layout, Menu } from 'lego-ui';
import { preClass } from 'lego-ui/dist/lib/utils/namespace';

import { MenuProps } from 'lego-ui/dist/lib/menu';

import styles from './side-bar.scss';

const { Submenu, Item } = Menu;

export interface ISideBarProps extends RouteComponentProps {
    collapse: boolean;
    theme: MenuProps['theme'];
    menusData: IMenuItem[];
    defaultSelectedMenuKeys?: string;
    defaultOpenMenuKeys?: string;
}

const Sidebar: React.FC<ISideBarProps> = ({ menusData, history, collapse, theme }) => {
    const [activeMenuIndex, setActiveMenuIndex] = React.useState<string>('home');

    function handleHighlightCurrentPath() {
        const {
            location: { pathname }
        } = history;

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
                    <Link to={menuItem.path}>{menuItem.name}</Link>
                </Item>
            );
        });

    const sidebarCls = classNames({
        [styles[preClass(`pro-side-${theme}`)]]: true,
        [styles.sidebarContainer]: true
    });

    return (
        <Layout.Aside collapse={collapse} className={sidebarCls}>
            <header className={styles.sideBarHeader}>header</header>
            <Menu collapse={collapse} mode='vertical' theme={theme} accordion={false} activeIndex={activeMenuIndex}>
                {renderMenus(menusData)}
            </Menu>
        </Layout.Aside>
    );
};

export default withRouter(Sidebar);
