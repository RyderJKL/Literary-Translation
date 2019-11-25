import { MenuProps } from 'lego-ui/dist/lib/menu';
export declare type NavTheme = MenuProps['theme'];
export declare type ContentWidth = 'Fluid' | 'Fixed';
export interface DefaultSettings {
    navTheme: NavTheme;
    primaryColor: string;
    layout: 'sidemenu' | 'topmenu';
    contentWidth: ContentWidth;
    fixedHeader: boolean;
    autoHideHeader: boolean;
    fixSidebar: boolean;
}
declare const theme: DefaultSettings;
export default theme;
