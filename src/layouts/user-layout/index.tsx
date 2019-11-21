import * as React from 'react';
import styles from './styles.scss';
import { RouteComponentProps } from 'react-router';
import useDocumentTitle from '@/hooks/use-document-title';
import { IRoute } from '@/typings';

export interface UserLayoutProps extends RouteComponentProps {
    route: IRoute;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children, route, history }) => {
    const {
        location: { pathname }
    } = history;
    useDocumentTitle(route, pathname);

    return <div className={styles.userContainer}>{children}</div>;
};

export default UserLayout;
