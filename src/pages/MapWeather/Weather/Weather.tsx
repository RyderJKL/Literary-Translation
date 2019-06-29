import * as React from 'react';
import { WeatherModel } from 'store/modules/weather/model';

export interface WeatherProps {
    weather: WeatherModel;
}

export const Weather: React.FC<Partial<WeatherProps>> = ({ weather }) => {
    if (!weather) {
        return null;
    }

    return (
        <div>
            <h2>{weather.name}</h2>
            <dl>
                <dt>Weather</dt>
                <dd>
                    {weather.weather[0].main}
                    <small>
                        {weather.weather[0].description}
                    </small>
                </dd>
                <dt>Temperature(Max/Min)</dt>
                <dd>
                    {weather.main.temp_max}℃ / {weather.main.temp_min}℃
                </dd>
            </dl>
        </div>
    );
};

