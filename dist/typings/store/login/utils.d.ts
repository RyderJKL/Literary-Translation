export declare const LOGIN_TOKEN = "local_lego_pro_login_status";
export declare const checkIsLogin: (token: string) => boolean;
export declare const getLoginStatus: () => string;
export declare const saveLoginStatus: (token: string) => void;
export declare const removeLoginStatus: () => void;
