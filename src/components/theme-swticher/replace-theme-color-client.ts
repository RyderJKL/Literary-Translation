import client from 'webpack-theme-color-replacer/client';
import { from, Observable } from 'rxjs';

export function replaceColor(newColor): Observable<any> {
    console.log('replaceColor');
    const options = {
        newColors: [newColor], // new colors array, one-to-one corresponde with `matchColors`
        changeUrl(cssUrl) {
            return `/${cssUrl}`; // while router is not `hash` mode, it needs absolute path
        }
    };

    return from(client.changer.changeColor(options, Promise));
}
