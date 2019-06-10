import { createAction, ActionType } from 'typesafe-actions';
import * as MapActionTypes from 'constant/actionTypes/map';

export const mapReadyAction = createAction(MapActionTypes.MAP_READY);

const actions = { mapReadyAction };
export type MapAction = ActionType<typeof actions>;

