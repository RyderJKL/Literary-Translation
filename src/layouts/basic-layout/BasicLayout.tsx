import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useStore from '@/hooks/use-store';
import { getSideBarMenusData } from './utils';
import { EERoles } from '@/store/role';
import SideBar from './components/SideBar';

const BasicLayout: React.FC<RouteComponentProps> = ({ children, history }) => {
    const { location } = history;

    const { routes, currentRole, changeRole } = useStore((store) => ({
        routes: store.routes.routes,
        currentRole: store.role.role,
        changeRole: store.role.changeRole
    }));

    const sideBarMenusData =  getSideBarMenusData(routes, location.pathname);

    return <div>
        <h2>
            currentRole: {currentRole}
        </h2>
        <button onClick={() => changeRole(EERoles.user)}>changeRole</button>
        <SideBar
            menusData={sideBarMenusData}
        />
        {children}
    </div>;
};

export default BasicLayout;
