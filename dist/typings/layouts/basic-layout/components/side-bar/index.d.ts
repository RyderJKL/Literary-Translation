import * as React from 'react';
import { IMenuItem } from '@/typings';
import { MenuProps } from 'lego-ui/dist/lib/menu';
import { RouteComponentProps } from 'react-router-dom';
export interface SideBarProps extends RouteComponentProps {
    collapse: boolean;
    theme: MenuProps['theme'];
    menusData: IMenuItem[];
    defaultSelectedMenuKeys?: string;
    defaultOpenMenuKeys?: string;
    logo?: string;
    title?: string;
}
declare const _default: React.ComponentClass<Pick<SideBarProps, "title" | "collapse" | "theme" | "menusData" | "defaultSelectedMenuKeys" | "defaultOpenMenuKeys" | "logo">, any> & import("react-router").WithRouterStatics<React.FunctionComponent<SideBarProps>>;
export default _default;
