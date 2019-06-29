import { ActionType } from 'typesafe-actions';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {mapReadyAction} from 'store/modules/map/actions';
import {weatherSetAction, weatherErrorAction, weatherGetAction} from 'store/modules/weather/actions';
import { RootState } from 'store';

const actions = { mapReadyAction, weatherGetAction, weatherErrorAction, weatherSetAction};
type Action = ActionType<typeof actions>;

import Map from './Map';

// tslint:disable-next-line:no-empty-interface
interface OwnProps {
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<Action>, props: OwnProps) => bindActionCreators({
  getWeather: (lat: number, lng: number) => actions.weatherGetAction(lat, lng),
  mapReady: () => actions.mapReadyAction(),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
