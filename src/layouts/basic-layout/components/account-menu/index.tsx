import * as React from 'react';

import { Avatar, Dropdown, Button } from 'lego-ui';

import ThemeSwitcher from '@/components/theme-swticher';

// import userStore from '@/hooks/use-store';

import styles from './account-menu.scss';

export interface AccountProps {
    name?: string;
    avatarUrl?: string;
}

const { Menu } = Dropdown;
const { Item } = Menu;

const AccountMenu: React.FC<AccountProps> = ({ avatarUrl }) => {
    // const { actionLogout } = userStore(store => ({
    //     actionLogout: store.auth.logout
    // }));

    const AccountContent = (
        <Menu>
            <Item><ThemeSwitcher title={'主题配置'}/></Item>
            <Item>
                {/*<div onClick={actionLogout}>退出</div>*/}
            </Item>
        </Menu>
    );

    return (
        <div>
            <Dropdown content={AccountContent}>
                <Button className={styles.accountButton}>
                    <Avatar theme={'light'} src={avatarUrl} />
                </Button>
            </Dropdown>
        </div>
    );
};

export default AccountMenu;
