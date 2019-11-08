export function omit<T extends object, K extends keyof T>(target: T, ...omitKeys: K[]): Omit<T, K> {
    return (Object.keys(target) as K[]).reduce(
        (res, key) => {
            if (!omitKeys.includes(key)) {
                res[key] = target[key];
            }
            return res;
        },
        {} as any
    );
}

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

