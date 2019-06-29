import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { todoReducer, TodoState } from './modules/todo/reducers';
import { weatherReducer, WeatherState } from './modules/weather/reducers';
import { mapReducer, MapState } from './modules/map/reducers';

export interface RootState {
    router?: any;
    todos: TodoState;
    weather: WeatherState;
    map: MapState;
}

// top reducer
const rootReducer = (history) => combineReducers<RootState>({
    todos: todoReducer as any,
    weather: weatherReducer as any,
    map: mapReducer as any,
    router: connectRouter(history),
});

export default rootReducer;

