import {ActionType} from 'typesafe-actions';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {AllActionType} from 'store/actions';
import {RootState} from 'store';
import {Weather} from './Weather';

// tslint:disable-next-line:no-empty-interface
interface OwnProps {

}

const mapStateToProps = (state: RootState) => ({
    weather: state.weather.weather,
});

const mapDispatchToProps = (dispatch: Dispatch<AllActionType>, props: OwnProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
