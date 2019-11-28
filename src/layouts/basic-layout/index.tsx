import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { utils } from 'lego-ui';
import { connect, UserInfo } from '@/store';
import { rootPath, loginPath } from '@/config/routes';
import * as config from '@/config';
import defaultSettings, { DefaultSettings } from '@/config/default-settings';
import $request, { Response } from '@/utils/request';
import styles from './styles.scss';
import SideMenuLayout from './components/sidemenu-layout';
import TopMenuLayout from './components/topmenu-layout';

export interface BasicLayoutProps {
    userInfo: UserInfo;
    router: RouteComponentProps;
    saveUserInfo: (userInfo: UserInfo) => void;
}

export type BasicLayoutState = DefaultSettings;

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
    const { userInfo, saveUserInfo, router, children } = props;

    const defaultState: BasicLayoutState = {
        ...defaultSettings,
        ...JSON.parse(localStorage.getItem(config.SETTINGS_STORAGE_NAME))
    };

    const [basicLayoutState, setBasicLayoutState] = React.useState<BasicLayoutState>(defaultState);

    const saveLocalStorage = () => {
        localStorage.setItem(config.SETTINGS_STORAGE_NAME, JSON.stringify(basicLayoutState));
    };

    const updateCollapse = () => {
        setBasicLayoutState((prevState) => ({
            ...prevState,
            collapse: !basicLayoutState.collapse
        }));
    };

    React.useEffect(() => {
        saveLocalStorage();
    }, [basicLayoutState.collapse]);

    React.useEffect(() => {
        if (utils.isExist(userInfo)) {
            return;
        }

        const subscription = $request.get('/user/info', { metas: { mock: true } }).subscribe((res: Response) => {
            if (res.code !== 20000) {
                router.history.replace(`${rootPath}${loginPath}`);
            }

            saveUserInfo(res.data.userInfo);
        });

        return () => subscription.unsubscribe;
    });

    const { layout, navTheme, collapse } = basicLayoutState;

    return (
        <section className={styles.basicLayoutContainer}>
            {layout === 'sidemenu' && (
                <SideMenuLayout theme={navTheme} collapse={collapse} updateCollapse={updateCollapse}>
                    {children}
                </SideMenuLayout>
            )}
            {layout === 'topmenu' && <TopMenuLayout>{children}</TopMenuLayout>}
        </section>
    );
};

export default connect(BasicLayout, (store) => ({
    userInfo: store.common.userInfo,
    saveUserInfo: store.common.saveUserInfo
}));
