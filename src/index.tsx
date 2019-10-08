// import { AppContainer } from 'react-hot-loader';
import * as React from 'react';
import * as ReactDom from 'react-dom';

import { configure as configureMobx } from 'mobx';

import { StoreProvider } from 'hooks/use-store/use-store-context';
import { history } from 'store/routerStore';
import Root from './Root';
import RouterViews from './routes';

import './styles/reset.scss';

configureMobx({ enforceActions: 'always' });

const render = () => {
    ReactDom.render(
        <StoreProvider>
            <Root>
                <RouterViews history={history}/>
            </Root>
        </StoreProvider>,
        document.getElementById('root') as HTMLElement
    );
};

render();

// Hot reloading
// if ((module as any).hot) {
//     // Reload components
//     (module as any).hot.accept('./App', () => {
//         render();
//     });
// }
