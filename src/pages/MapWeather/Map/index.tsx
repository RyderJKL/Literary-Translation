import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MapInner from './MapInner';
import {RootState} from 'store';
import {ActionType as AppActionType} from 'store/actions';
import {weatherGetAction} from 'store/modules/weather/actions';
import {mapReadyAction} from 'store/modules/map/actions';

export interface OwnProps {
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<AppActionType>, props: OwnProps) => bindActionCreators({
    getWeather: (lat: number, lng: number) => weatherGetAction(lat, lng),
    mapReady: () => mapReadyAction(),
}, dispatch);

// const mapDispatchToProps = (dispatch: Dispatch<AppActionType>, props: OwnProps) => bindActionCreators({
//     getWeather: (lat: number, lng: number) => weatherGetAction(lat, lng),
//     mapReady: () => mapReadyAction(),
//     // getWeather: weatherGetAction,
//     // mapReady: mapReadyAction
// }, dispatch);

console.log(mapDispatchToProps, 'mapDispatchToProps')
export default connect(mapStateToProps, mapDispatchToProps)(MapInner);
