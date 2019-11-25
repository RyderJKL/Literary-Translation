import React from 'react';
import { Tooltip } from 'lego-ui';

import styles from './theme-color-picker.scss';

export const defaultThemeColors = ['#825AED', '#006D77', '#FF86FF', '#2BF4FB', '#3777FF'];

export interface ColorPickerProps {
    themeColors?: string[];
    onChange?(color: string): void;
}

const ThemeColorItem = ({ color, onClick }) => (
    <Tooltip key={color} trigger={'hover'} title={color}>
        <li onClick={() => onClick(color)} style={{ backgroundColor: color }} className={styles.themeColorPickerItem} />
    </Tooltip>
);

const themeColorPicker: React.FC<ColorPickerProps> = ({
    themeColors = defaultThemeColors,
    onChange = () => undefined
}) => {
    return (
        <ul className={styles.themeColorPicker}>
            {themeColors.map(color => (
                <ThemeColorItem key={color} color={color} onClick={() => onChange(color)} />
            ))}
        </ul>
    );
};

export default themeColorPicker;
