/**
 * connect 注入 store 和 intent 到 view
 */
import * as React from 'react';
import { useObserver } from 'mobx-react-lite';
export type ReactComponent = React.ComponentClass<any> | React.FunctionComponent<any>;

export interface ConnectStore {
    [index: string]: any;
}

export default function Connect<M, I, Selection>(
    WrappedComponent: ReactComponent,
    store: M,
    dataSelector: (m: M) => ConnectStore,
    intent?: I
): ReactComponent {
    const ConnectComponent: React.FC = (props, ref: React.Ref<any>) => {
        const observableStore = useObserver(() => dataSelector(store));
        return React.createElement(WrappedComponent, {
            viewStore: observableStore,
            intent,
            forwardRef: ref,
            ...props
        });
    };

    ConnectComponent.displayName = WrappedComponent.name || WrappedComponent.displayName;

    return React.forwardRef(ConnectComponent);
}
