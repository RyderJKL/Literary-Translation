import * as React from 'react';
import Map from './Map/Map.connect';
import Weather from './Weather/Weather.connect';
import * as styles from './styles.scss';

export interface Props {
    loading: boolean;
}

export default class MapWeatherInner extends React.Component<Props, {}> {
    public render() {
        return (
            <div className={styles.app}>
                {this.props.loading && <div className='loading'/>}
                <div className={styles.header}>
                    <h1>Weather Map</h1>
                    <small>(This sample application)</small>
                </div>
                <div className='man'>
                    <Weather/>
                    <Map/>
                </div>
                <div className='footer'>(c) 2019</div>
            </div>
        );
    }
}
