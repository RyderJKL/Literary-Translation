import * as React from 'react';
import { RouterViewers } from '@/router/router';

import useDocumentTitle from '@/hooks/useDocumentTitle'

const App: React.FC = () => {
    useDocumentTitle('');
    // const renderDevTool = () => {
    //     if (process.env.NODE_ENV !== 'production') {
    //         // tslint:disable-next-line:no-implicit-dependencies
    //         const DevTools = require('mobx-react-devtools').default;
    //         return (<DevTools />);
    //     }
    //     return null;
    // };

    return <RouterViewers />;
    // {/*{renderDevTool()}*/}
};

export default App;
