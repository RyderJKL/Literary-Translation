/// <reference types="react" />
import { IRoute } from '@/typings';
export declare function renderRoutes(routes: IRoute[], extraProps?: {}, switchProps?: {}, Exception?: any): JSX.Element;
export declare function matchRoutes(routes: IRoute[], pathname: any, branch?: any[]): any[];
