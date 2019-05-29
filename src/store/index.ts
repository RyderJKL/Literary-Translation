import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import RootState from './rootState';
import { todoReducer } from './modules/todo/reducers';

export { RootState };

// top reducer
const rootReducer = (history) => combineReducers<RootState>({
    todos: todoReducer as any,
    router: connectRouter(history),
});

export default rootReducer;
