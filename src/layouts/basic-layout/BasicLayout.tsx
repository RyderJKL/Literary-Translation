import * as React from 'react';
import useStore from '@/hooks/use-store';
import SideBar from './components/SideBar';

const BasicLayout: React.FC = ({ children }) => {
    const { routes } = useStore((store) => ({
        routes: store.routes.routes
    }));

    console.log(routes, 'routes');

    return <div>
        <SideBar />
        {children}
    </div>;
};

export default BasicLayout;
