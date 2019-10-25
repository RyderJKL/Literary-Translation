import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
// import useStore from '@/hooks/use-store';
import { getMenusData } from './utils';
import SideBar from './components/side-bar';

import Container from 'lego-ui/dist/lib/container';
import Layout from 'lego-ui/dist/lib/layout';

import { IRoute } from '@/typings';

import { toJS } from 'mobx';

export interface IBasicLayoutProps extends RouteComponentProps {
    route: IRoute;
}

const BasicLayout: React.FC<IBasicLayoutProps> = ({ children, route }) => {
    // const {routes} = useStore(store => ({
    //     routes: store.routes.routes,
    //     currentRole: store.role.role,
    //     changeRole: store.role.changeRole
    // }));

    const sideBarMenusData = getMenusData(toJS(route.routes));

    return (
        <Container>
            <Layout className={''}>
                <Layout.Aside>
                    <SideBar menusData={sideBarMenusData} />
                </Layout.Aside>
                <Layout.Header className={''}>header</Layout.Header>
                <Layout.Content className={''}>{children}</Layout.Content>
                <Layout.Footer className={''}>footer</Layout.Footer>
            </Layout>
        </Container>
    );
};

export default BasicLayout;
