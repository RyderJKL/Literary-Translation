import * as React from 'react';

import PageInterface from './PageInterface';

class App extends React.Component<PageInterface, {}> {
    public render() {
        return (<div>
                <h1>Welcome to React with Typescript</h1>
                <p>The color of this page is: {this.props.color}</p>
                <h2>hello world!</h2>
            </div>
        );
    }
}

export default App;
