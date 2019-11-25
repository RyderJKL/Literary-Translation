import * as React from 'react';
import { Layout } from 'lego-ui';
import { NavTheme } from '@/config/default-settings';
import Copyright from '@/components/copyright';
import classNames from 'classnames';
import styles from './index.scss';
import Logo from '../logo';
import NavMenu from '../nav-menu';

export interface SideMenuLayoutPorps {
    theme: NavTheme;
    collapse: boolean;
    updateCollapse: () => void;
}

const SideMenuLayout: React.SFC<SideMenuLayoutPorps> = ({ children, collapse, theme }) => {
    const asideClass = classNames({
        [styles.basicLayoutAside]: true,
        [theme]: true
    });

    return (
        <Layout withAside={true} className={styles.sideLayoutContainer}>
            <Layout.Aside className={asideClass} collapse={collapse}>
                <Logo collapse={collapse} theme={theme}/>

                <NavMenu mode='vertical' theme={theme}/>
            </Layout.Aside>
            <Layout>
                <Layout.Content>
                    { children }
                </Layout.Content>
                <Layout.Footer>
                    <Copyright/>
                </Layout.Footer>
            </Layout>
        </Layout>
    );
};

export default SideMenuLayout;
