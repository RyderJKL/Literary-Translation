import * as React from 'react';
import { RouterViewers } from '@/router';
// import useStore from 'hooks/use-store';
// import { EERoles } from 'store/role';

const App: React.FC = () => {
    // const renderDevTool = () => {
    //     if (process.env.NODE_ENV !== 'production') {
    //         // tslint:disable-next-line:no-implicit-dependencies
    //         const DevTools = require('mobx-react-devtools').default;
    //         return (<DevTools />);
    //     }
    //     return null;
    // };

    // const { changeRole } = useStore((store) => ({
    //     changeRole: store.role.changeRole
    // }));
    //
    // React.useEffect(() => {
    //     setTimeout(() => changeRole([EERoles.admin]), 1000);
    // });

    return (
        <div>
            <RouterViewers />
            {/*{renderDevTool()}*/}
        </div>
    );
};

export default App;
