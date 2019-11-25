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
            res = res.slice(1, -1);
        }

        break;
    }

    return decode(res);
}

export function logined(): boolean {
    return utils.isExist(getToken());
}

export function updateAutoLogin(auto: boolean) {
    localStorage.setItem(config.AUTH_CLEAN_SAVE_NAME, auto.toString());
}

export function updateToken(token: string) {
    if (config.AUTH_SAVE_METHOD === 'cookie') {
        return;
    }

    localStorage.setItem(config.AUTH_SAVE_NAME, token);
}

export function getToken(): string {
    return config.AUTH_SAVE_METHOD === 'storage'
        ? localStorage.getItem(config.AUTH_SAVE_NAME) || ''
        : getCookie(config.AUTH_SAVE_NAME) || '';
}
