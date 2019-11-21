import * as React from 'react';
import { Avatar, Dropdown, Button } from 'lego-ui';
import styles from './account.scss';
import userStore from '@/hooks/use-store';

const { Menu } = Dropdown;
const { Item } = Menu;

export interface AccountProps {
    name?: string;
    avatarUrl?: string;
}

const AccountMenu: React.FC<AccountProps> = ({ name, avatarUrl }) => {
    const { actionLogout } = userStore(store => ({
        actionLogout: store.auth.logout,
    }));

    const AccountContent = (
        <Menu>
            <Item>个人中心</Item>
            <Item>
                <div onClick={actionLogout}>退出</div>
            </Item>
        </Menu>
    );

    return (
        <div>
            <Dropdown content={AccountContent}>
                <Button className={styles.accountButton}>
                    <Avatar theme={'light'} />
                </Button>
            </Dropdown>
        </div>
    );
};

export default AccountMenu;
