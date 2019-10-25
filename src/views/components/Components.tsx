import * as React from 'react';
// import { renderRoutes } from 'react-router-config';
// import renderRoutes from '@/router/utils/renderRoutes';

const Components: React.FC<{route}> = ({ route, children }) => {
    console.log('route props');
    return (
        <div>
            Components
            {children}
            {/*{renderRoutes(route.routes)}*/}
        </div>
    );
};

export default Components;
