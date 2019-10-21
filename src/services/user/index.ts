import request$ from '@/utils/request';
import {Observable} from 'rxjs';

export function getUser(userUrl: string): Observable<object> {
    return request$.get<object>(`${process.env.BASE_API}/${userUrl}`);
}
