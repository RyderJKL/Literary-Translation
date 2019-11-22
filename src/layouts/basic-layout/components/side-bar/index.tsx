import * as React from 'react';
import { IMenuItem } from '@/typings';
import { MenuProps } from 'lego-ui/dist/lib/menu';
import { last } from 'ramda';
import { useLocation, Link } from 'react-router-dom';
import { getSelectedMenusKey } from '@/layouts/utils';
import upperFirst from '@/utils/string/upper-first';
import useHistoryListener from '@/hooks/use-history-listener';
import { Layout, Menu } from 'lego-ui';

import classNames from 'classnames';
import styles from './side-bar.scss';

const { Submenu, Item } = Menu;

export interface SideBarProps extends MenuProps {
    collapse: boolean;
    menusData: IMenuItem[];
    defaultSelectedMenuKeys?: string;
    defaultOpenMenuKeys?: string;
    logo?: string;
    title?: string;
}

const Sidebar: React.FC<SideBarProps> = ({
    logo = '@/static/logo.svg',
    title = 'lego-pro',
    menusData,
    collapse,
    theme,
    accordion = false,
    mode = 'vertical'
}) => {
    const [activeMenuIndex, setActiveMenuIndex] = React.useState<string>('home');
    const location = useLocation();

    function handleHighlightCurrentPath() {
        const menuKeys = getSelectedMenusKey(menusData, location.pathname);
        const currentActive = last(menuKeys);
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
            <Menu collapse={collapse} mode={mode} theme={theme} accordion={accordion} activeIndex={activeMenuIndex}>
                {renderMenus(menusData)}
            </Menu>
        </Layout.Aside>
    );
};

export default Sidebar;
