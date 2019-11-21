import * as React from 'react';
import { IMenuItem } from '@/typings';
import { MenuProps } from 'lego-ui/dist/lib/menu';

import { useHistory, Link } from 'react-router-dom';
import { getSelectedMenusKey } from '@/layouts/utils';
import upperFirst from '@/utils/string/upper-first';
import useHistoryListener from '@/hooks/use-history-listener';
import { Layout, Menu } from 'lego-ui';

import classNames from 'classnames';
import styles from './side-bar.scss';

const { Submenu, Item } = Menu;

export interface SideBarProps {
    collapse: boolean;
    theme: MenuProps['theme'];
    menusData: IMenuItem[];
    defaultSelectedMenuKeys?: string;
    defaultOpenMenuKeys?: string;
    logo?: string;
    title?: string;
}

const Sidebar: React.FC<SideBarProps> = ({
    menusData,
    collapse,
    theme,
    logo = '@/static/logo.svg',
    title = 'lego-pro'
}) => {
    const [activeMenuIndex, setActiveMenuIndex] = React.useState<string>('home');
    const {
        location: { pathname }
    } = useHistory();

    function handleHighlightCurrentPath() {
        const menuKeys = getSelectedMenusKey(menusData, pathname);
        const currentActive = menuKeys.pop();
        setActiveMenuIndex(currentActive);
    }

    useHistoryListener(handleHighlightCurrentPath);

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
        [styles[`legoProSidebar${upperFirst(theme)}`]]: true,
        [styles.legoProSidebarContainer]: true
    });

    return (
        <Layout.Aside collapse={collapse} className={sidebarCls}>
            <div className={styles.legoProSidebarLogo}>
                <a href='/'>
                    <img className={styles.legoProSidebarLogoIcon} src={require('@/static/logo.svg')} alt='logo' />
                    {/*<h1 className={styles.legoProSidebarLogoTitle}>{title}</h1>*/}
                </a>
            </div>
            <Menu collapse={collapse} mode='vertical' theme={theme} accordion={false} activeIndex={activeMenuIndex}>
                {renderMenus(menusData)}
            </Menu>
        </Layout.Aside>
    );
};

export default Sidebar;
