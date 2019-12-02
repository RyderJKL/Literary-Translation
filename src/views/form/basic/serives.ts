import { Observable } from 'rxjs';
import $request from '@/utils/request';

export const getEnvironments$: Observable<any> = $request.get('/form/basic/environments', { metas: { mock: true } });

export const getUpdateTypes$: Observable<any> = $request.get('/form/basic/update-types', { metas: { mock: true } });

export const getModules$: Observable<any> = $request.get('/form/basic/modules', { metas: { mock: true } });

export const postFromData$ = (body: any): Observable<any> =>
    $request.post('/form/basic', body, { metas: { mock: true } });
