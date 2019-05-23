import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
// import { chatReducer } from './chat/reducers';

// top reducer
const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    // chat: chatReducer,
});

export default rootReducer;
