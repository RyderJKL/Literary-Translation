import * as React from 'react';
import { createStore, StoreType } from 'store';
import { useLocalStore } from 'mobx-react';

export const storeContext = React.createContext<StoreType | null>(null);

export const StoreProvider: React.FC = ({ children }) => {
    const store = useLocalStore(createStore);

    return (
        <storeContext.Provider value={store}>
            {children}
        </storeContext.Provider>
    );
};

