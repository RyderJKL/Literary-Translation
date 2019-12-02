import client from 'webpack-theme-color-replacer/client';
import { from, Observable } from 'rxjs';

export function replaceColor(newColor: string): Observable<any> {
    const options = {
        newColors: [newColor], // new colors array, one-to-one corresponde with `matchColors`
        changeUrl(cssUrl: string) {
            return `/${cssUrl}`; // while router is not `hash` mode, it needs absolute path
        }
    };

    return from(client.changer.changeColor(options, Promise));
}
