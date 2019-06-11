import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';

export interface MapState {
    readonly ready: boolean;
}

export const mapInitialState = {
    ready: false
};

export const mapReducer = (state: MapState = mapInitialState, action: actions.MapActionType): MapState => {
    switch (action.type) {
        case getType(actions.mapReadyAction):
            return {...state, ready: true};
        default:
            return state;
    }
};


