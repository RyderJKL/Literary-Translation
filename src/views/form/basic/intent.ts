import { forkJoin, Observable } from 'rxjs';
import * as Services from '@/views/form/basic/serives';
import { first, tap } from 'rxjs/internal/operators';
import store, { SetConfigListProps } from './store';
import { map, path } from 'ramda';

export const getConfigList$: Observable<any> = forkJoin({
    environments: Services.getEnvironments.pipe(first()),
    updateType: Services.getUpdateTypes.pipe(first()),
    modules: Services.getModules.pipe(first())
}).pipe(
    tap((res) => {
        const congList: SetConfigListProps = map(path(['data', 'list']), res);
        store.setConfigList(congList);
    })
);

const intent = {
    getConfigList$
};

export type Intent = typeof intent;

export default intent;
