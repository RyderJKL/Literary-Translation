import * as React from 'react';
import Copyright from '@/components/copyright';
import styles from './styles.scss';
<<<<<<< HEAD
=======
import { RouteComponentProps } from 'react-router';
import useDocumentTitle from '@/hooks/use-document-title';
import { IRoute } from '@/typings';
>>>>>>> feature/cherong

const UserLayout: React.FC = ({ children }) => {
    return (
        <div className={styles.userContainer}>
            { children }
            <Copyright className={styles.userCopyright}/>
        </div>
    );
};

export default UserLayout;
