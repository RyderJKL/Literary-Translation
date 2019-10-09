import * as React from 'react';
import RouterViews from '../routes';
import { history } from 'store/routerStore';

const App: React.FC = () => {
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
            <RouterViews history={history}/>
            {/*{renderDevTool()}*/}
        </div>
    );
};

export default App;
