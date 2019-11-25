import { MenuProps } from 'lego-ui/dist/lib/menu';

export type NavTheme = MenuProps['theme'];

export type ContentWidth = 'Fluid' | 'Fixed';

export interface DefaultSettings {
    navTheme: NavTheme;
    primaryColor: string;
    layout: 'sidemenu' | 'topmenu';
    contentWidth: ContentWidth;
    fixedHeader: boolean;
    autoHideHeader: boolean;
    collapse: boolean;
}

const defaultSettings: DefaultSettings = {
    navTheme: 'light',
    primaryColor: '#1890FF',
    layout: 'sidemenu',
    contentWidth: 'Fluid',
    fixedHeader: false,
    autoHideHeader: false,
    collapse: false
};

export default defaultSettings;
