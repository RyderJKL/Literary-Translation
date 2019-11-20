import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import useStore from '@/hooks/use-store';
import { getMenusData } from '@/layouts/utils';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { Layout, Button, Icon } from 'lego-ui';

import SideBar from './components/side-bar';
import BasicLayoutFooter from './components/footer';
import BreadCrumbs from './components/bread-crumbs';
import Styles from './styles.scss';

import { IRoute } from '@/typings';
import themeDefaultSettings from '@/config/default-settings';

export interface IBasicLayoutProps extends RouteComponentProps {
    route: IRoute;
}

const BasicLayout: React.FC<IBasicLayoutProps> = ({ children, route, history }) => {
    const {
        location: { pathname }
    } = history;
    useDocumentTitle(route, pathname);

    const { sidebarCollapse, changeSidebarCollapse, isLogin } = useStore(store => ({
        changeSidebarCollapse: store.UI.toggleSidebarCollapse,
        isLogin: store.auth.isLogin,
        sidebarCollapse: store.UI.sidebarCollapse
    }));

    const settings = themeDefaultSettings;

    if (!isLogin) {
        return <Redirect to={'/user/login'} />;
    }

    const menusData = getMenusData(route.routes);

    return (
        <Layout withAside={true} className={Styles.basicLayoutContainer}>
            <SideBar menusData={menusData} collapse={sidebarCollapse} theme={settings.navTheme} />
            <Layout>
                <Layout.Header className={Styles.basicLayoutHeader}>
                    <Button size={'small'} onClick={changeSidebarCollapse}>
                        <Icon type={sidebarCollapse ? 'arrow-right-double' : 'arrow-left-double'} />
                    </Button>
                </Layout.Header>
                <Layout.Content className={Styles.basicLayoutContent}>
                    <BreadCrumbs menusData={menusData} />
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
