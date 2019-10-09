import * as React from 'react';
import { renderRoutes } from 'react-router-config';

const Layout: React.FC<{route}> = ({ route }) => {
    return <div>
        layout
        {renderRoutes(route.routes)}
    </div>;
};

export default Layout;
