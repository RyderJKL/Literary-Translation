import * as React from 'react';
import * as styles from './user-layout.scss';

const UserLayout: React.FC = ({ children }) => {
    return (
        <div className={styles.container}>
            {/*<div className={styles.header}>header</div>*/}
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default UserLayout;
