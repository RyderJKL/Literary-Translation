import * as React from 'react';
import { Button, Icon } from 'lego-ui';
import styles from './header.scss';

export interface HeaderProps {
    sidebarCollapse: boolean;
    onChangeSidebarCollapse(): void;
}

const BasicLayoutHeader: React.FC<HeaderProps> = ({ onChangeSidebarCollapse, sidebarCollapse, children }) => {
    return (
        <div className={styles.basicLayoutHeaderContainer}>
            <div className={styles.basicLayoutHeaderTrigger}>
                <Button size={'small'} onClick={onChangeSidebarCollapse}>
                    <Icon type={sidebarCollapse ? 'arrow-right-double' : 'arrow-left-double'} />
                </Button>
            </div>
            <div className={styles.basicLayoutRight}>{children}</div>
        </div>
    );
};

export default BasicLayoutHeader;
