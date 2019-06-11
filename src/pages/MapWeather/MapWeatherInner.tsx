import * as React from 'react';
import Map from './Map';

export interface Props {
    loading: boolean;
}

const MapWeatherInner = (props: Props) => {
    return (
        <div>
            <Map/>
        </div>
    );
};

export default MapWeatherInner;
