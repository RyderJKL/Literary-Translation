import {getType} from 'typesafe-actions';

import * as WeatherActions from './actions';
import { WeatherModel } from './model';

export interface WeatherState {
    readonly loading: boolean;
    readonly weather?: WeatherModel;
}

const initialState = {
    loading: false
};

export const weatherReducer = (
    state: WeatherState = initialState,
    action: WeatherActions.WeatherActionType
): WeatherState => {
    switch (action.type) {
        case getType(WeatherActions.weatherSetAction):
            return {...state, weather: { ...state.weather, ...action.payload }};

        case getType(WeatherActions.weatherErrorAction):
            console.error(action.payload.message);
            return state;

        default:
            return state;
    }
};
