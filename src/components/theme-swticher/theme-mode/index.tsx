import React, { useState } from 'react';
import { RadioGroup } from 'lego-ui';
import { NavTheme } from '@/config/default-settings';

export type Theme = NavTheme;

export interface ThemeModeProps {
    theme?: Theme;
    onChange (theme: NavTheme): void;
}

const ThemeMode: React.FC<ThemeModeProps> = ({ theme = 'light', onChange }) => {
    return (
        <div>
            <RadioGroup
                options={[
                    { value: 'light', label: '浅色' },
                    { value: 'dark', label: '深色' },
                    { value: 'primary', label: '主题色' }
                ]}
                defaultValue={theme}
                onChange={v => onChange(v)}
            />
        </div>
    );
};

export default ThemeMode;
