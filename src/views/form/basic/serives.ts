import { Observable } from 'rxjs';
import $request from '@/utils/request';

export const getEnvironments: Observable<any> = $request.get('/srm/environments', { metas: { mock: true } });

export const getUpdateTypes: Observable<any> = $request.get('/srm/update-types', { metas: { mock: true } });

export const getModules: Observable<any> = $request.get('/srm/modules', { metas: { mock: true } });
