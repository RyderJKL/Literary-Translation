// import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import App from './App';
import configureStore, { history, epicMiddleware } from './configureStore';
import epics from './epics';

const store = configureStore();

epicMiddleware.run(epics);
const render = () => {
    ReactDom.render(
            <Provider store={store}>
                <App history={history}/>
            </Provider>,
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
