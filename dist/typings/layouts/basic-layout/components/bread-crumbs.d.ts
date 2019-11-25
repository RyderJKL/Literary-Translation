import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IMenuItem } from '@/typings';
export interface IBreadCrumbsProps extends RouteComponentProps {
    menusData: IMenuItem[];
}
declare const _default: React.ComponentClass<Pick<IBreadCrumbsProps, "menusData">, any> & import("react-router").WithRouterStatics<React.FunctionComponent<IBreadCrumbsProps>>;
export default _default;
