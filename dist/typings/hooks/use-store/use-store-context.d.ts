import * as React from 'react';
export declare const storeContext: React.Context<{
    auth: import("../../store/login").Login;
    common: import("../../store/common").CommonStore;
    UI: import("../../store/ui").UIStore;
    role: import("../../store/role").RoleStore;
    router: import("mobx-react-router").RouterStore;
    routes: import("../../store/routes").RoutesInStore;
}>;
export declare const StoreProvider: React.FC;
