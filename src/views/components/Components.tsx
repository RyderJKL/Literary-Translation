import * as React from 'react';

const Components: React.FC<{route}> = ({ route, children }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Components;
