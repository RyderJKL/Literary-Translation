import * as React from 'react';
import Copyright from '@/components/copyright';
import styles from './styles.scss';

const UserLayout: React.FC = ({ children }) => {
    return (
        <div className={styles.userContainer}>
            {children}
            <Copyright className={styles.userCopyright} />
        </div>
    );
};

export default UserLayout;
