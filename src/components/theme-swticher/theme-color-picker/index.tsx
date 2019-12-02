import React from 'react';
import { Tooltip } from 'lego-ui';

import styles from './theme-color-picker.scss';

export const defaultThemeColors = ['#825AED', '#006D77', '#FF86FF', '#2BF4FB', '#3777FF'];

export interface ColorPickerProps {
    themeColors?: string[];
    onChange?(color: string): void;
}

const ThemeColorItem: React.FC<{ color: string; onClick: (color: string) => void }> = ({ color, onClick }) => (
    <Tooltip trigger={'hover'} title={color}>
        <li onClick={() => onClick(color)} style={{ backgroundColor: color }} className={styles.themeColorPickerItem} />
    </Tooltip>
);

const themeColorPicker: React.FC<ColorPickerProps> = ({
    themeColors = defaultThemeColors,
    onChange = () => undefined
}) => {
    return (
        <ul className={styles.themeColorPicker}>
            {themeColors.map((color: string) => (
                <ThemeColorItem key={color} color={color} onClick={onChange} />
            ))}
        </ul>
    );
};

export default themeColorPicker;
