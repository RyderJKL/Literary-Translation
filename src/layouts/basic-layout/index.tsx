import * as React from 'react';
import { useHistory, Redirect, RouteComponentProps } from 'react-router-dom';

import useStore from '@/hooks/use-store';
import useDocumentTitle from '@/hooks/use-document-title';

import { Layout } from 'lego-ui';

import SideBar from './components/side-bar';
import BasicLayoutFooter from './components/footer';
import BasicLayoutHeader from './components/header';
import AccountMenu from './components/account-menu';
import BreadCrumbs from './components/bread-crumbs';

import themeDefaultSettings from '@/config/default-settings';
import { getMenusData, matchMenusWithPathname } from '@/layouts/utils';
import pathToRegexp from 'path-to-regexp';

import styles from './styles.scss';

import { IRoute } from '@/typings';

export interface IBasicLayoutProps extends RouteComponentProps {
    route: IRoute;
}

const BasicLayout: React.FC<IBasicLayoutProps> = ({ children, route }) => {
    const {
        location: { pathname }
    } = useHistory();

    useDocumentTitle(route, pathname);

    const { sidebarCollapse, changeSidebarCollapse, isLogin } = useStore(store => ({
        changeSidebarCollapse: store.UI.toggleSidebarCollapse,
        isLogin: store.auth.isLogin,
        sidebarCollapse: store.UI.sidebarCollapse
    }));

    const settings = themeDefaultSettings;

    const menusData = getMenusData(route.routes);

    const getBreadCrumbsItems = () => {
        const matchMenus = matchMenusWithPathname(menusData, pathname);
        const homeMenu = matchMenusWithPathname(menusData, '/home')[0];

        if (pathToRegexp('/home').test(pathname)) {
            return matchMenus;
        }

        return [homeMenu, ...matchMenus];
    };

    if (!isLogin) {
        return <Redirect to={'/user/login'} />;
    }

    return (
        <Layout withAside={true} className={styles.basicLayoutContainer}>
            <SideBar menusData={menusData} collapse={sidebarCollapse} theme={settings.navTheme} />
            <Layout>
                <Layout.Header className={styles.basicLayoutRightBlockHeader}>
                    <BasicLayoutHeader
                        sidebarCollapse={sidebarCollapse}
                        onChangeSidebarCollapse={changeSidebarCollapse}
                    >
                        <AccountMenu />
                    </BasicLayoutHeader>
                </Layout.Header>
                <Layout.Content className={styles.basicLayoutRightBlockContent}>
                    <BreadCrumbs breadCrumbsData={getBreadCrumbsItems()} />
                    {children}
                </Layout.Content>
                <Layout.Footer>
                    <BasicLayoutFooter />
                </Layout.Footer>
            </Layout>
        </Layout>
    );
};

export default BasicLayout;
