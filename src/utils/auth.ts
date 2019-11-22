import * as config from '@/config';
import { utils } from 'lego-ui';

function getCookie(key: string): string {
    const cookies = document.cookie ? document.cookie.split('; ') : [];
    let res: string;
    const decode = (str: string) => str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);

    for (let i = 0; i < cookies.length; i++) {
        const parts = cookies[i].split('=');
        const name = decode(parts[0]);

        if (key !== name) {
            return;
        }

        res = parts.slice(1).join('=');

        if (res.charAt(0) === '"') {
            res = res.slice(1, -1)
        }

        break;
    }

    return decode(res);
}

export function logined(): boolean {
    return utils.isExist(getToken());
}

export function updateAutoLogin(auto: boolean) {
    localStorage.setItem(config.auth_clean_save_name, auto.toString());
}

export function updateToken(token: string) {
    if (config.auth_save_method === 'cookie') {
        return;
    }

    localStorage.setItem(config.auth_save_name, token);
}

export function getToken(): string {
    return config.auth_save_method === 'storage'
        ? localStorage.getItem(config.auth_save_name)
        : getCookie(config.auth_save_name);
}
