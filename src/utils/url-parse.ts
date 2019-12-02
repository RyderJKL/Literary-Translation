export interface UrlQuery {
    [key: string]: string;
}

export function parseQueryString(str = window.location.search): UrlQuery {
    const res: UrlQuery = {};
    const queries = str.match(/[?&]([^=&#]+)=([^&#]*)/g);

    if (Array.isArray(queries)) {
        queries.forEach((row) => {
            const [key, value] = decodeURIComponent(row).split('=');

            res[key.substr(1)] = value;
        });
    }

    return res;
}
