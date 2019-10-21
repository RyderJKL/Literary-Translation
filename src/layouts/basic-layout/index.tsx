import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import useStore from '@/hooks/use-store';
import {getSideBarMenusData} from './utils';
import SideBar from './components/side-bar';

import Container from 'lego-ui/dist/lib/container';
import Layout from 'lego-ui/dist/lib/layout';

const BasicLayout: React.FC<RouteComponentProps> = ({children, history}) => {
    const {location} = history;

    const {routes} = useStore(store => ({
        routes: store.routes.routes,
        currentRole: store.role.role,
        changeRole: store.role.changeRole
    }));

    const sideBarMenusData = getSideBarMenusData(routes, location.pathname);

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
