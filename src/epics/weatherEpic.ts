import {Epic} from 'redux-observable';
import {from, of} from 'rxjs';
import {switchMap, filter, map, catchError} from 'rxjs/operators';
import {isActionOf} from 'typesafe-actions';

import {actions, WeatherActionType} from 'store/modules/weather/actions';
import {RootState} from 'store';
import {getWeather} from 'services/api/weather';

export const weatherGetEpic: Epic<WeatherActionType, WeatherActionType, RootState> = (action$, store) =>
    action$.pipe(
        filter(isActionOf(actions.weatherGetAction)),
        switchMap((action) =>
            from(getWeather(action.payload.lat, action.payload.lng))
                .pipe(
                    map(actions.weatherSetAction),
                    catchError((error) => of(actions.weatherErrorAction(error)))
                )
        )
    );

export default [
    weatherGetEpic,
];
