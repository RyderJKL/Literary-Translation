declare const userStore: <Selection_1>(dataSelector: (store: {
    auth: import("../../store/login").Login;
    common: import("../../store/common").CommonStore;
    UI: import("../../store/ui").UIStore;
    role: import("../../store/role").RoleStore;
    router: import("mobx-react-router").RouterStore;
    routes: import("../../store/routes").RoutesInStore;
}) => Selection_1) => Selection_1;
export default userStore;
