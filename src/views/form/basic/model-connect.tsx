/**
 * ModelConnect 注入 model 和 intent 到 view
 */
import * as React from 'react';
export type ReactComponent = React.FunctionComponent<any>;

export default function ModelConnect<S, I>(WrappedComponent: ReactComponent, store: S, intent?: I): ReactComponent {
    const ConnectComponent: React.FC = (props, ref: React.Ref<any>) => {
        return React.createElement(WrappedComponent, {
            ...props,
            model: store,
            intent,
            ref
        });
    };

    ConnectComponent.displayName = WrappedComponent.name || WrappedComponent.displayName;

    return React.forwardRef(ConnectComponent);
}
