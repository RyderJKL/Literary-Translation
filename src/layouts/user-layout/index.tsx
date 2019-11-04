import * as React from 'react';
import styles from './styles.scss';

const UserLayout: React.FC = ({ children }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Lego-Pro
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default UserLayout;
