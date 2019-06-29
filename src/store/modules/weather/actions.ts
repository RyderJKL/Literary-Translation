import { createAction, ActionType } from 'typesafe-actions';
import * as WeatherActionTypes from './actionTypes';

export const weatherGetAction = createAction(
    WeatherActionTypes.WEATHER_GET,
    (resolve) => (lat: number, lng: number) => resolve({ lat, lng })
);

export const weatherSetAction = createAction(
    WeatherActionTypes.WEATHER_SET,
    (resolve) => (weather: Response) => resolve(weather)
);

export const weatherErrorAction = createAction(
    WeatherActionTypes.WEATHER_ERROR,
    (resolve) => (error: Error) => resolve(error)
);

export const actions = {
    weatherGetAction,
    weatherSetAction,
    weatherErrorAction
};

export type WeatherActionType = ActionType<typeof actions>;
