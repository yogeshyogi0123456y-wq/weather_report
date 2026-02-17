import React from 'react';
import type { WeatherData } from '../../types/weather';
import './WeatherCard.css';

interface WeatherCardProps {
    data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
    const { name, main, weather, wind, sys } = data;
    const weatherMain = weather[0];

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="weather-card">
            <div className="card-header">
                <h2 className="city-name">{name}, {sys.country}</h2>
                <p className="current-date">{formatDate(data.dt)}</p>
            </div>

            <div className="card-main">
                <div className="weather-info">
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherMain.icon}@4x.png`}
                        alt={weatherMain.description}
                        className="weather-icon"
                    />
                    <div className="temp-info">
                        <span className="temperature">{Math.round(main.temp)}°C</span>
                        <span className="condition">{weatherMain.main}</span>
                    </div>
                </div>
            </div>

            <div className="card-footer">
                <div className="detail-item">
                    <span className="detail-label">Humidity</span>
                    <span className="detail-value">{main.humidity}%</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Wind Speed</span>
                    <span className="detail-value">{wind.speed} m/s</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Feels Like</span>
                    <span className="detail-value">{Math.round(main.feels_like)}°C</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
