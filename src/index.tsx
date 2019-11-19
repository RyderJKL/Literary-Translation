import * as React from 'react';
import * as ReactDom from 'react-dom';

import { configure as configureMobx } from 'mobx';

import { StoreProvider } from '@/hooks/use-store/use-store-context';
import App from './App';

import '@/styles/global.scss';
import '@/styles/admin-pro-icons.scss';

configureMobx({ enforceActions: 'always' });

const render = () =>{
    ReactDom.render(
        <StoreProvider>
            <App />
        </StoreProvider>,
        document.getElementById('root') as HTMLElement
    );
};

render();
