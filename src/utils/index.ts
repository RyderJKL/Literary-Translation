import { parse } from 'qs';

export function param2Obj(url: string) {
    const search = url.split('?')[1];
    if (!search) {
        return {};
    }
    return JSON.parse(
        '{"' +
            decodeURIComponent(search)
                .replace(/"/g, '\\"')
                .replace(/&/g, '","')
                .replace(/=/g, '":"')
                .replace(/\+/g, ' ') +
            '"}'
    );
}

export const getPageQuery = () => {
    return parse(window.location.href.split('?')[1]);
};
