import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import useStore from '@/hooks/use-store';
import { getMenusData } from './components/side-bar/utils';

import { Layout, Button, Icon } from 'lego-ui';

import SideBar from './components/side-bar';
import BreadCrumbs from './components/bread-crumbs';

import { IRoute } from '@/typings';
import themeDefaultSettings from '@/theme/default-settings';

// import Exception from '@/components/exception';

// import { toJS } from 'mobx';

export interface IBasicLayoutProps extends RouteComponentProps {
    route: IRoute;
}

const BasicLayout: React.FC<IBasicLayoutProps> = ({ children, route }) => {
    const { sidebarCollapse, changeSidebarCollapse, isLogin } = useStore(store => ({
        changeSidebarCollapse: store.UI.toggleSidebarCollapse,
        isLogin: store.auth.isLogin,
        sidebarCollapse: store.UI.sidebarCollapse
    }));

    const settings = themeDefaultSettings;
    // if (!isLogin) {
    //     return <Redirect to={'/user/login'} />;
    // }

    const menusData = getMenusData(route.routes);

    return (
        <Layout withAside={true}>
            <SideBar
                menusData={menusData}
                collapse={sidebarCollapse}
                theme={settings.navTheme}
            />
            <Layout>
                <Layout.Header>
                    <Button onClick={changeSidebarCollapse}>
                        <Icon key={'arrow-left-double'} />
                    </Button>
                </Layout.Header>
                <Layout.Content>
                    <BreadCrumbs menusData={menusData} />
                    {children}
                </Layout.Content>
                <Layout.Footer>footer</Layout.Footer>
            </Layout>
        </Layout>
    );
};

export default BasicLayout;
