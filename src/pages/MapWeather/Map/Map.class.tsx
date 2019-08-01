import * as React from 'react';
import * as scriptjs from 'scriptjs';
import * as PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';
import {} from 'googlemaps';

import * as styles from './styles.scss';

// export interface MapProps extends RouteComponentProps<void>{
//   getWeather: (lat: number, lng: number) => undefined;
//   mapReady: () => void;
// }

export interface MapProps {
    getWeather: (lat: number, lng: number) => undefined;
    mapReady: () => void;
}

export default class Map extends React.PureComponent<any> {

    public static propTypes = {
        getWeather: PropTypes.func,
        mapReady: PropTypes.func
    };

    private map: google.maps.Map;

    constructor(props: MapProps) {
        super(props);
        this.onLoaded = this.onLoaded.bind(this);
    }

    public componentWillMount() {
        // remove this key when you run it on your localhost.
        scriptjs('https://maps.googleapis.com/maps/api/js?key=AIzaSyB5o5wtvz2sf_ckQm9rciFuJxc4pp2Sx-o', this.onLoaded);
    }

    public render() {
        return (
            <div className={styles.mapContainer} id='map'/>
        );
    }

    private onLoaded() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 35.6811673, lng: 139.7648629 }, // default is Tokyo station!!
            zoom: 8,
            mapTypeControl: false,
            disableDoubleClickZoom: false,
            fullscreenControl: false,
            keyboardShortcuts: false,
            streetViewControl: false,
            scaleControl: false,
            rotateControl: false,
            panControl: false,
        });

        this.map.addListener('click', (event) => {
            this.props.getWeather(
                event.latLng.lat(),
                event.latLng.lng(),
            );
        });

        this.props.mapReady();
    }
}
