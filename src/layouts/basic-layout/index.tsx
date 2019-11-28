import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

// 组件
import { utils } from 'lego-ui';
import SideMenuLayout from './components/sidemenu-layout';
import TopMenuLayout from './components/topmenu-layout';
import defaultSettings, { DefaultSettings } from '@/config/default-settings';

// hooks or 工具函数
import { useHighState } from '@/hooks';
import { useObservable } from 'rxjs-hooks';
import { switchMap, takeWhile, tap } from 'rxjs/operators';
import $request from '@/utils/request';

// model or store
import { connect, UserInfo } from '@/store';

// config
import { rootPath, loginPath } from '@/config/routes';
import * as config from '@/config';

// styles
import styles from './styles.scss';

// types
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

    const [basicLayoutState, setBasicLayoutState] = useHighState<BasicLayoutState>(defaultState);
    const { layout, navTheme, collapse } = basicLayoutState;

    const saveLocalStorage = () => {
        localStorage.setItem(config.SETTINGS_STORAGE_NAME, JSON.stringify(basicLayoutState));
    };

    const updateCollapse = () => {
        setBasicLayoutState({ collapse: !basicLayoutState.collapse }, saveLocalStorage);
    };

    useObservable(
        (props$) =>
            props$.pipe(
                takeWhile(([info]) => !utils.isExist(info)),
                switchMap(() => $request.get('/user/info', { metas: { mock: true } })),
                tap((res) => {
                    if (res.code !== 20000) {
                        router.history.replace(`${rootPath}${loginPath}`);
                    }

                    saveUserInfo(res.data.userInfo);
                })
            ),
        undefined,
        [userInfo]
    );

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
