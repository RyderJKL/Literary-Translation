import * as React from 'react';

const Root: React.FC = ({ children }) => {
    // const renderDevTool = () => {
    //     if (process.env.NODE_ENV !== 'production') {
    //         // tslint:disable-next-line:no-implicit-dependencies
    //         const DevTools = require('mobx-react-devtools').default;
    //         return (<DevTools />);
    //     }
    //     return null;
    // };

    return (
        <div>
            {children}
            {/*{renderDevTool()}*/}
        </div>
    );
};

export default Root;
