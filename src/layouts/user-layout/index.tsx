import * as React from 'react';
import styles from './styles.scss';

console.log(styles);

const UserLayout: React.FC = ({ children }) => {
    return (
        <div className={styles.container}>
            {/*<div className={styles.header}>header</div>*/}
            user layout
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default UserLayout;
