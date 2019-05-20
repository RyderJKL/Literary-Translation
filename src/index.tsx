import * as React from 'react';
import * as ReactDom from 'react-dom';

import App from './App';

ReactDom.render(
    <App color='red'/>,
    document.getElementById('root') as HTMLElement
);
