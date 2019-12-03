import { forkJoin, Observable } from 'rxjs';
import * as Services from '@/views/form/basic/serives';
import { first, tap } from 'rxjs/internal/operators';
import store, { SetConfigListProps } from './store';
import { map, path } from 'ramda';

export const getConfigList$: Observable<any> = forkJoin({
    environments: Services.getEnvironments$.pipe(first()),
    updateTypes: Services.getUpdateTypes$.pipe(first()),
    modules: Services.getModules$.pipe(first())
}).pipe(
    tap((res) => {
        const congList: SetConfigListProps = map(path(['data', 'list']), res);
        store.setConfigList(congList);
    })
);

export const submitForm$: (body: any) => Observable<any> = (body) => Services.postFromData$(body);

const intent = {
    getConfigList$,
    submitForm$
};

export type Intent = typeof intent;

export default intent;
