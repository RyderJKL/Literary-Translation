import * as React from 'react';
import * as scriptjs from 'scriptjs';
import {} from 'googlemaps';

import * as styles from './styles.scss';

export interface MapProps {
    getWeather: (lat: number, lng: number) => undefined;
    mapReady: () => void;
}

export default function Map(props?: MapProps) {
    console.log(props, 'props')
    const [map, setMap] = React.useState<google.maps.Map>();

    const onLoaded = () => {
        setMap(new google.maps.Map(document.getElementById('map'), {
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
        }));

        map.addListener('click', (event) => {
            props.getWeather(
                event.latLng.lat(),
                event.latLng.lng(),
            );
        });

        props.mapReady();
    };

    React.useEffect(() => {
        scriptjs('https://maps.googleapis.com/maps/api/js?key=AIzaSyB5o5wtvz2sf_ckQm9rciFuJxc4pp2Sx-o', onLoaded);
    });

    return (
        <div className={styles.mapContainer} id='map'/>
    );
}

