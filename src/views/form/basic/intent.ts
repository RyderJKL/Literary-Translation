import { forkJoin, Observable } from 'rxjs';
import * as Services from '@/views/form/basic/serives';
import { first } from 'rxjs/internal/operators';

export const getConfigList$: Observable<any> = forkJoin([
    Services.getEnvironments.pipe(first()),
    Services.getUpdateTypes.pipe(first()),
    Services.getModules.pipe(first())
]);

const intent = {
    getConfigList$
};

export type Intent = typeof intent;

export default intent;
