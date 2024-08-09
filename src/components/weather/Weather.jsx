
import './Weather.css';
import { EventContext } from '../../context/eventContext/EventContext';
import { useContext } from 'react';

const CurrentWeather = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {weather,eventFetching} = useContext(EventContext);
    console.log(weather);

    if(eventFetching) {return <div>Loading...</div>;}


    return (<>{weather &&
        <div className="weather">
            <div className="weatherTop">
                <div>
                    <p className="weatherCity">{weather.name}</p>
                    <p className="weather-description">{weather?.weather[0].description}</p>
                </div>
                <img
                    alt="weather"
                    className="weather-icon"
                    src={PF+`icons/${weather.weather[0].icon}.png`}
                />
            </div>
            <div className="weatherBottom">
                <p className="temperature">{Math.round(weather.main.temp)}°C</p>
                <div className="weatherDetails">
                    <div className="parameter-row">
                        <span className="parameter-label">Details</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Feels like</span>
                        <span className="parameter-value">
                            {Math.round(weather.main.feels_like)}°C
                        </span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-value">{weather.wind.speed} m/s</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value">{weather.main.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Pressure</span>
                        <span className="parameter-value">{weather.main.pressure} hPa</span>
                    </div>
                </div>
            </div>
        </div>
    }</>
    );
};

export default CurrentWeather;