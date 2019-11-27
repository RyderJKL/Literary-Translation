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

class BasicLayout extends React.PureComponent<BasicLayoutProps, BasicLayoutState> {
    public constructor(props: BasicLayoutProps) {
        super(props);

        this.state = {
            ...defaultSettings,
            ...JSON.parse(localStorage.getItem(config.SETTINGS_STORAGE_NAME))
        };

        ['updateCollapse'].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    private saveLocalStorage() {
        localStorage.setItem(config.SETTINGS_STORAGE_NAME, JSON.stringify(this.state));
    }

    private updateCollapse() {
        this.setState(
            {
                collapse: !this.state
            },
            () => {
                this.saveLocalStorage();
            }
        );
    }

    public componentDidMount() {
        const { userInfo, saveUserInfo, router } = this.props;

        if (utils.isExist(userInfo)) {
            return;
        }

        $request.get('/user/info', { metas: { mock: true } }).subscribe((res: Response) => {
            if (res.code !== 20000) {
                return router.history.replace(`${rootPath}${loginPath}`);
            }

            saveUserInfo(res.data.userInfo);
        });
    }

    public render() {
        const { children } = this.props;
        const { layout, navTheme, collapse } = this.state;

        return (
            <section className={styles.basicLayoutContainer}>
                {layout === 'sidemenu' && (
                    <SideMenuLayout theme={navTheme} collapse={collapse} updateCollapse={this.updateCollapse}>
                        {children}
                    </SideMenuLayout>
                )}
                {layout === 'topmenu' && <TopMenuLayout>{children}</TopMenuLayout>}
            </section>
        );
    }
}

export default connect(BasicLayout, (store) => ({
    userInfo: store.common.userInfo,
    saveUserInfo: store.common.saveUserInfo
}));
