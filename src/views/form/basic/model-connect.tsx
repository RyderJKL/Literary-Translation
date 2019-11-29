/**
 * ModelConnect 连接 model 和 intent
 * 由于 mobx-react-lite 本身的限制 observer 只支持 FC 组件
 */
import * as React from 'react';
import { observer } from 'mobx-react-lite';
export type ReactComponent = React.FunctionComponent<any>;

export default function ModelConnect<S, I>(WrappedComponent: ReactComponent, store: S, intent?: I): ReactComponent {
    const ObservableComponent: React.FC = observer((props, ref: React.Ref<any>) => {
        return React.createElement(observer(WrappedComponent, { forwardRef: true }), {
            ...props,
            model: store,
            intent,
            ref
        });
    });

    ObservableComponent.displayName = WrappedComponent.name || WrappedComponent.displayName;

    return ObservableComponent;
}
