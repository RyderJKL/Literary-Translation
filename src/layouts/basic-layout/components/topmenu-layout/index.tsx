import * as React from 'react';
import Copyright from '@/components/copyright';
// import { DefaultSettings } from '@/config/default-settings';
import { Layout } from 'lego-ui';
import styles from './index.scss';

const TopMenuLayout: React.FC = ({ children }) => {
    return (
        <Layout withAside={true} className={styles.basicLayoutContainer}>
            <Layout.Aside className={styles.basicLayoutAside} />
            <Layout>
                <Layout.Content>{children}</Layout.Content>
                <Layout.Footer>
                    <Copyright />
                </Layout.Footer>
            </Layout>
        </Layout>
    );
};

export default TopMenuLayout;
