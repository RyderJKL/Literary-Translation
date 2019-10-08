import * as React from 'react';
import { useObserver } from 'mobx-react'; // 6.x or mobx-react-lite@1.4.0

export const useStoreData = <Selection, ContextData, Store>(
    context: React.Context<ContextData>,
    storeSelector: (context: ContextData) => Store,
    dataSelector: (store: Store) => Selection
) => {
    const value = React.useContext(context);
    if (!value) {
        throw new Error();
    }

    const store = storeSelector(value);
    return useObserver(() => dataSelector(store));
};

