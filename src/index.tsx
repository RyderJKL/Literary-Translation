// import { AppContainer } from 'react-hot-loader';
import * as React from 'react';
import * as ReactDom from 'react-dom';

// import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import rootStore from './store';
import { history } from 'store/routerStore';
import Root from './Root';
import RouterViews from './routes';

import App from 'pages/App';
import './styles/reset.scss';

// useStrict(true);

const render = () => {
    ReactDom.render(
        <Provider {...rootStore}>
            <Root>
               <RouterViews history={history}/>
            </Root>
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
