export interface UrlQuery {
    [key: string]: string;
}

export function parseQueryString(str = window.location.search): UrlQuery {
    const res = {};
    const querys = str.match(/[?&]([^=&#]+)=([^&#]*)/g);

    if (Array.isArray(querys)) {
        querys.forEach((row) => {
            const [key, value] = decodeURIComponent(row).split('=');

            res[key.substr(1)] = value;
        });
    }

    return res;
}
