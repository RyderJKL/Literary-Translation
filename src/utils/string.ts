export function lowerFirst(word: string): string {
    return word.charAt(0).toLowerCase() + word.substring(1);
}

export function upperFirst(word: string): string {
    return word.charAt(0).toUpperCase() + word.substring(1)
}
