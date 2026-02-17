import React from 'react';
import type { ForecastData, ForecastItem } from '../../types/weather';
import './Forecast.css';

interface ForecastProps {
    data: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
    // Filter forecast to get one data point per day (around noon)
    const dailyForecast = data.list.filter((item) => item.dt_txt.includes('12:00:00'));

    const getDayName = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
        });
    };

    return (
        <div className="forecast-container">
            <h3 className="forecast-title">5-Day Forecast</h3>
            <div className="forecast-grid">
                {dailyForecast.map((item: ForecastItem) => (
                    <div key={item.dt} className="forecast-item">
                        <span className="forecast-day">{getDayName(item.dt)}</span>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                            alt={item.weather[0].description}
                            className="forecast-icon"
                        />
                        <div className="forecast-temp">
                            <span className="temp-max">{Math.round(item.main.temp_max)}°</span>
                            <span className="temp-min">{Math.round(item.main.temp_min)}°</span>
                        </div>
                        <span className="forecast-condition">{item.weather[0].main}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
