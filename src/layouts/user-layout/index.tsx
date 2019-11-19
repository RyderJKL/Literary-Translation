import * as React from 'react';
import styles from './styles.scss';

const UserLayout: React.FC = ({ children }) => {
    return (
        <div className={styles.userContainer}>
            { children }
        </div>
    );
};

export default UserLayout;
