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
    fixSidebar: boolean;
    title: string;
}

const theme: DefaultSettings = {
    navTheme: 'dark',
    primaryColor: '#1890FF',
    layout: 'sidemenu',
    contentWidth: 'Fluid',
    fixedHeader: false,
    autoHideHeader: false,
    fixSidebar: false,
    title: 'lego Pro'
};

export default theme;
