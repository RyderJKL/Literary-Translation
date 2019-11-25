import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IRoute } from '@/typings';
export interface IBasicLayoutProps extends RouteComponentProps {
    route: IRoute;
}
declare const BasicLayout: React.FC<IBasicLayoutProps>;
export default BasicLayout;
