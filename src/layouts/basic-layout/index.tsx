import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import useStore from '@/hooks/use-store';
import { getMenusData } from './components/side-bar/utils';

import Container from 'lego-ui/dist/lib/container';
import Layout from 'lego-ui/dist/lib/layout';

import SideBar from './components/side-bar';
import BreadCrumbs from './components/bread-crumbs';

// import Exception from '@/components/exception';

import { IRoute } from '@/typings';

// import { toJS } from 'mobx';

export interface IBasicLayoutProps extends RouteComponentProps {
    route: IRoute;
}

const BasicLayout: React.FC<IBasicLayoutProps> = ({ children, route }) => {
    const { changeMenuCollapse, isLogin } = useStore(store => ({
        changeMenuCollapse: store.UI.toggleMenuCollapse,
        isLogin: store.auth.isLogin
    }));

    // if (!isLogin) {
    //     return <Redirect to={'/user/login'} />;
    // }

    const menusData = getMenusData(route.routes);

    return (
        <Container>
            <Layout>
                <Layout.Aside>
                    <SideBar menusData={menusData} />
                </Layout.Aside>
                <Layout.Content>
                    <Layout.Header>
                        <BreadCrumbs menusData={menusData} />
                        <button onClick={changeMenuCollapse}>toggle menu collapse</button>
                    </Layout.Header>
                    <Layout.Content>{children}</Layout.Content>
                    <Layout.Footer>footer</Layout.Footer>
                </Layout.Content>
            </Layout>
        </Container>
    );
};

export default BasicLayout;
