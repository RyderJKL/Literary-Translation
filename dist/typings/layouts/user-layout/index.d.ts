import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IRoute } from '@/typings';
export interface UserLayoutProps extends RouteComponentProps {
    route: IRoute;
}
declare const UserLayout: React.FC<UserLayoutProps>;
export default UserLayout;
