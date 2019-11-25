import * as React from 'react';
import { storeContext } from '@/hooks/use-store/use-store-context';
import { StoreType } from '@/store';

export interface ConnectStore {
    [key: string]: any;
}

export default function connect(
    component: React.ComponentClass<any> | React.FunctionComponent<any>,
    store: (store: StoreType) => ConnectStore
) {
    const connectComponent: React.SFC<React.Props<ConnectStore>> = (props, ref: React.Ref<any>) => {
        const globalStore = React.useContext(storeContext);

        return React.createElement(component, { ...props, ...store(globalStore), ref });
    };

    connectComponent.displayName = component.name || component.displayName;

    return React.forwardRef(connectComponent);
}
