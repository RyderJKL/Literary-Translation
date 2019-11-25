export const API_PREFIX =  process.env.BASE_API || '';

export const createURLWithPrefix = (url: string) => `${API_PREFIX}${url}`;

export const AUTH_SAVE_METHOD: 'storage' | 'cookie' = 'storage';

export const AUTH_SAVE_NAME = 'lego-ui-admin-pro-token';

export const AUTH_CLEAN_SAVE_NAME = 'lego-ui-admin-pro-auto-login';

export const SITE_NAME = 'lego-ui AdminPro';

