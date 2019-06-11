import { createAction, ActionType } from 'typesafe-actions';
import * as MapActionTypes from './actionTypes';

export const mapReadyAction = createAction(MapActionTypes.MAP_READY);

const actions = { mapReadyAction };
export type MapActionType = ActionType<typeof actions>;

