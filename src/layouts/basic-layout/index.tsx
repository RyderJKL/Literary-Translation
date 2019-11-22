import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Layout, utils } from 'lego-ui';
import { connect, UserInfo } from '@/store';
import { rootPath, loginPath, routes } from '@/config/routes';
import $request, { Response } from '@/utils/request';
import { transforToMenu } from '@/utils/router';
import Styles from './styles.scss';

export interface BasicLayoutProps  {
    userInfo: UserInfo;
    router: RouteComponentProps;
    saveUserInfo: (userInfo: UserInfo) => void;
}

console.log(transforToMenu(routes, rootPath));

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
    const { children, userInfo, router, saveUserInfo } = props;

    React.useEffect(() => {
        if (utils.isExist(userInfo)) {
            return;
        }

        $request.get('/user/info')
            .subscribe((res: Response) => {
                if (res.code !== 20000) {
                    return router.history.replace(`${rootPath}${loginPath}`);
                }

                saveUserInfo(res.data.userInfo);
            });
    }, []);

    // const { sidebarCollapse, changeSidebarCollapse, isLogin } = useStore(store => ({
    //     changeSidebarCollapse: store.UI.toggleSidebarCollapse,
    //     isLogin: store.auth.isLogin,
    //     sidebarCollapse: store.UI.sidebarCollapse
    // }));
    //
    // const settings = themeDefaultSettings;
    //
    // if (!isLogin) {
    //     return <Redirect to={'/user/login'} />;
    // }

    // const menusData = getMenusData(route.routes);

    return (
        <Layout withAside={true} className={Styles.basicLayoutContainer}>
            {/*<SideBar menusData={menusData} collapse={sidebarCollapse} theme={settings.navTheme} />
            <Layout>
                <Layout.Header>
                    <BasicLayoutHeader
                        sidebarCollapse={sidebarCollapse}
                        onChangeSidebarCollapse={changeSidebarCollapse}
                    />
                </Layout.Header>
                <Layout.Content className={Styles.basicLayoutContent}>
                    <BreadCrumbs menusData={menusData} />
                    {children}
                </Layout.Content>
                <Layout.Footer>
                    <BasicLayoutFooter />
                </Layout.Footer>
            </Layout>*/}
            { children }
        </Layout>
    );
};

export default connect(BasicLayout, (store) => ({
    userInfo: store.common.userInfo,
    saveUserInfo: store.common.saveUserInfo
}));
