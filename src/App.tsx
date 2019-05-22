import * as React from 'react';
import {ChatState} from 'store/chat/types';
import {sedMessage} from 'store/chat/actions';

interface AppProps {
    sedMessage: typeof sedMessage
    chat: ChatState
}

class App extends React.Component<AppProps> {
    public render() {
        return (<div>
                <h1>Welcome to React with Typescript</h1>
                <p>
                    The color of this page is:
                    {
                        this.props.chat.messages.map(text => text)
                    }
                </p>
                <h2>hello world!</h2>
            </div>
        );
    }
}

export default App;
