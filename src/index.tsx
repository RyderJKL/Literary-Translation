import React from 'react';
import ReactDom from 'react-dom';

import { configure as configureMobx } from 'mobx';

import { StoreProvider } from '@/hooks/use-store/use-store-context';
import App from './App';

import './styles/reset.scss';

configureMobx({ enforceActions: 'always' });

const render = () => {
    ReactDom.render(
        <StoreProvider>
            <App />
        </StoreProvider>,
        document.getElementById('root') as HTMLElement
    );
};

render();

