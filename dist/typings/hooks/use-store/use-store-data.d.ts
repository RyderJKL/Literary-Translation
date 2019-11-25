import * as React from 'react';
export declare const useStoreData: <Selection_1, ContextData, Store>(context: React.Context<ContextData>, storeSelector: (context: ContextData) => Store, dataSelector: (store: Store) => Selection_1) => Selection_1;
