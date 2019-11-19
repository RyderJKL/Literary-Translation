export const API_PREFIX =  process.env.BASE_API || '';

export const createURLWithPrefix = (url: string) => `${API_PREFIX}${url}`;
