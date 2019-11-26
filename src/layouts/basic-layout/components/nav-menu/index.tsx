import * as React from 'react';
import { Menu, Icon } from 'lego-ui';
import { NavTheme } from '@/config/default-settings';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { transforToMenu, RouteMenu } from '@/utils/router';
import { rootPath, routes } from '@/config/routes';

export interface NavMenuProps extends RouteComponentProps {
    mode: 'horizontal' | 'vertical';
    theme: NavTheme;
}

const menuData = transforToMenu(routes, rootPath);

const renderRoutes = (items: RouteMenu[]) => {
    return items.map((item, key) => {
        const { icon, title, path, type, items: groupItems } = item;

        if (type === 'group') {
            return (
                <Menu.Submenu
                    key={key}
                    title={
                        <span>
                            <Icon type={icon} /> {title}
                        </span>
                    }
                >
                    {renderRoutes(groupItems)}
                </Menu.Submenu>
            );
        }

        return (
            <Menu.Item key={key} index={path}>
                <Link to={path}>{title}</Link>
            </Menu.Item>
        );
    });
};

const NavMenu: React.SFC<NavMenuProps> = ({ mode, theme, location }) => {
    return (
        <Menu mode={mode} theme={theme} activeIndex={location.pathname}>
            {renderRoutes(menuData)}
        </Menu>
    );
};

export default withRouter(NavMenu);
