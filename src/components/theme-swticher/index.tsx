import React, { useState } from 'react';
import { Observable } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

import { Drawer, Divider, Spin } from 'lego-ui';

import ThemeMode from './theme-mode';
import ThemeColorPicker from './theme-color-picker';

import userStore from '@/hooks/use-store';

import { useEventCallback } from 'rxjs-hooks';
import { replaceColor } from './replace-theme-color-client';

import style from './theme-switcher.scss';

export interface ThemeSwitcherProps {
    title?: string;
    drawerWidth?: number;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ title = '主题配置', drawerWidth = 280 }) => {
    const [themeDrawVisible, setThemeDrawVisible] = useState(false);

    const { themeDefault, actionChangeThemeSettings } = userStore(store => ({
        themeDefault: store.UI.themeSettings,
        actionChangeThemeSettings: store.UI.changeThemeSettings
    }));

    const ItemWrapper: React.FC<{ itemTitle: string }> = ({ itemTitle, children }) => (
        <div className={style.itemWrapper}>
            <h4 className={style.itemWrapperTitle}>{itemTitle}</h4>
            <div className={style.itemWrapperBody}>{children}</div>
        </div>
    );

    const [changeColor] = useEventCallback((event$: Observable<string>) =>
        event$.pipe(
            tap(value => console.log(value)),
            switchMap(color => replaceColor(color)),
            catchError(error => {
                console.error(error);
                return new Observable(error);
            })
        )
    );

    return (
        <div>
            <p onClick={() => setThemeDrawVisible(true)}>{title}</p>
            <Drawer
                visible={themeDrawVisible}
                onClose={() => setThemeDrawVisible(false)}
                style={{ width: drawerWidth }}
            >
                <Drawer.Header title={title} onClose={() => setThemeDrawVisible(false)} />
                <Drawer.Body>
                    <ItemWrapper itemTitle={'导航栏主题'}>
                        <ThemeMode
                            theme={themeDefault.navTheme}
                            onChange={navTheme => actionChangeThemeSettings('navTheme', navTheme)}
                        />
                    </ItemWrapper>
                    <Divider />
                    <ItemWrapper itemTitle={'主题色值'}>
                        <ThemeColorPicker onChange={color => changeColor(color)} />
                    </ItemWrapper>
                </Drawer.Body>
            </Drawer>
        </div>
    );
};

export default ThemeSwitcher;
