import {createAction, ActionType} from 'typesafe-actions';
import * as WeatherActionTypes from 'constant/actionTypes/weather';

export const weatherGetAction = createAction(
    WeatherActionTypes.WEATHER_GET,
    (resolve) => (lat: number, lng: number) => resolve({lat, lng})
);

export const weatherSetAction = createAction(
    WeatherActionTypes.WEATHER_SET,
    (resolve) => (weather: Response) => resolve(weather)
);

export const weatherErrorAction = createAction(
    WeatherActionTypes.WEATHER_ERROR,
    (resolve) => (error: Error) => resolve(error)
);

const actions = {
    weatherGetAction,
    weatherSetAction,
    weatherErrorAction
};

export type WeatherAction = ActionType<typeof actions>;
