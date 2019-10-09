import * as React from 'react';
import { renderRoutes } from 'react-router-config';
// import routes from 'router/routes';
import RouterViewers from 'router';
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
            {/*{renderRoutes(routes, { history })}*/}
            <RouterViewers history={history}/>
            {/*{renderDevTool()}*/}
        </div>
    );
};

export default App;
