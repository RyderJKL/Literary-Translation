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
// import { useObservable } from 'rxjs-hooks';
// import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

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

        const subscription = $request.get('/user/info', { metas: { mock: true } }).subscribe(
            (res: Response) => {
                console.log('haha');
                // subscription.unsubscribe();

                if (res.code !== 20000) {
                    router.history.replace(`${rootPath}${loginPath}`);
                }

                saveUserInfo(res.data.userInfo);
            },
            (error) => console.log(error)
        );
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

// class BasicLayout extends React.PureComponent<BasicLayoutProps, BasicLayoutState> {
//     public constructor(props: BasicLayoutProps) {
//         super(props);
//
//         this.state = {
//             ...defaultSettings,
//             ...JSON.parse(localStorage.getItem(config.SETTINGS_STORAGE_NAME))
//         };
//
//         ['updateCollapse'].forEach((fn) => {
//             this[fn] = this[fn].bind(this);
//         });
//     }
//
//     private saveLocalStorage() {
//         localStorage.setItem(config.SETTINGS_STORAGE_NAME, JSON.stringify(this.state));
//     }
//
//     private updateCollapse() {
//         this.setState(
//             {
//                 collapse: !this.state
//             },
//             () => {
//                 this.saveLocalStorage();
//             }
//         );
//     }
//
//     public componentDidMount() {
//         const { userInfo, saveUserInfo, router } = this.props;
//
//         if (utils.isExist(userInfo)) {
//             return;
//         }
//
//         const subscription = $request.get('/user/info', { metas: { mock: true } }).subscribe((res: Response) => {
//             if (res.code !== 20000) {
//                 return router.history.replace(`${rootPath}${loginPath}`);
//             }
//
//             saveUserInfo(res.data.userInfo);
//         });
//
//         subscription.unsubscribe();
//     }
//
//     public render() {
//         const { children } = this.props;
//         const { layout, navTheme, collapse } = this.state;
//
//         return (
//             <section className={styles.basicLayoutContainer}>
//                 {layout === 'sidemenu' && (
//                     <SideMenuLayout theme={navTheme} collapse={collapse} updateCollapse={this.updateCollapse}>
//                         {children}
//                     </SideMenuLayout>
//                 )}
//                 {layout === 'topmenu' && <TopMenuLayout>{children}</TopMenuLayout>}
//             </section>
//         );
//     }
// }

export default connect(BasicLayout, (store) => ({
    userInfo: store.common.userInfo,
    saveUserInfo: store.common.saveUserInfo
}));
