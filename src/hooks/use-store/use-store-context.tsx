import * as React from 'react';
import { createStore, StoreModelType } from 'store';
import { useLocalStore } from 'mobx-react';

export const storeContext = React.createContext<StoreModelType | null>(null);

export const StoreProvider: React.FC = ({ children }) => {
    const store = useLocalStore(createStore);

    return (
        <storeContext.Provider value={store}>
            {children}
        </storeContext.Provider>
    );
};

