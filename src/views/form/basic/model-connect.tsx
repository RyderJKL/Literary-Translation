/**
 * ModelConnect 连接 model 和 intent
 */
import * as React from 'react';
import { observer } from 'mobx-react';
export type ReactComponent = React.FunctionComponent<any>;

export default function ModelConnect<S, I>(
    ModelConnectWrappedComponent: ReactComponent,
    store: S,
    intent?: I
): ReactComponent {
    const ObservableComponent: React.FC = (props) => {
        return React.createElement(observer(ModelConnectWrappedComponent), {
            ...props,
            model: store,
            intent
        });
    };

    ObservableComponent.displayName = ModelConnectWrappedComponent.name || ModelConnectWrappedComponent.displayName;

    return ObservableComponent;
}
