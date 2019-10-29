import * as React from 'react';
import * as ReactDom from 'react-dom';

import { configure as configureMobx } from 'mobx';

import { StoreProvider } from '@/hooks/use-store/use-store-context';
import mock from '../mock';
import App from './App';

import './styles/reset.scss';

if (process.env.NODE_ENV === 'development') {
    mock();
}

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
