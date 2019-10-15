import * as React from 'react';
import { renderRoutes } from 'react-router-config';

const Components: React.FC<{route}> = ({ route }) => {
    return <div>
        Components
        {renderRoutes(route.routes)}
    </div>;
};

export default Components;
