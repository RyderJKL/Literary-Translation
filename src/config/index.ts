export const API_PREFIX =  process.env.BASE_API || '';

export const createURLWithPrefix = (url: string) => `${API_PREFIX}${url}`;

export const auth_save_method: 'storage' | 'cookie' = 'storage';

export const auth_save_name = 'lego-ui-admin-pro-token';

export const auth_clean_save_name = 'lego-ui-admin-pro-auto-login'; 

export const site_name = 'lego-ui AdminPro';
