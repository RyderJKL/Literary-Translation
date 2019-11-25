export declare const createStore: () => {
    auth: import("./login").Login;
    common: import("./common").CommonStore;
    UI: import("./ui").UIStore;
    role: import("./role").RoleStore;
    router: import("mobx-react-router").RouterStore;
    routes: import("./routes").RoutesInStore;
};
declare const rootStore: {
    auth: import("./login").Login;
    common: import("./common").CommonStore;
    UI: import("./ui").UIStore;
    role: import("./role").RoleStore;
    router: import("mobx-react-router").RouterStore;
    routes: import("./routes").RoutesInStore;
};
export declare type StoreType = typeof rootStore;
export default rootStore;
