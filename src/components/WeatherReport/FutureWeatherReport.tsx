import React from 'react';
import type { WeatherData } from '../../types/weather';
import '../WeatherReport/WeatherReport.css'; // Reusing styles

interface FutureWeatherReportProps {
    data: WeatherData | null;
    date: string;
}

const FutureWeatherReport: React.FC<FutureWeatherReportProps> = ({ data, date }) => {
    if (!data) return (
        <div className="weather-report-section">
            <div className="report-card error-card">
                <h3>No Forecast Available</h3>
                <p>Could not find forecast data for {date}. Forecasts are only available for the next 5 days.</p>
            </div>
        </div>
    );

    const { name, main, weather, wind } = data;
    const weatherMain = weather[0];

    return (
        <div className="weather-report-section future-theme">
            <div className="report-card">
                <div className="report-header">
                    <h3>🔮 Future Forecast Report</h3>
                    <span className="report-date">{date}</span>
                </div>

                <div className="report-grid">
                    <div className="report-item">
                        <span className="label">Location</span>
                        <span className="value">{name}</span>
                    </div>
                    <div className="report-item">
                        <span className="label">Expected Temp</span>
                        <span className="value">{Math.round(main.temp)}°C</span>
                    </div>
                    <div className="report-item">
                        <span className="label">Condition</span>
                        <span className="value" style={{ textTransform: 'capitalize' }}>
                            {weatherMain.description}
                            <img src={`https://openweathermap.org/img/wn/${weatherMain.icon}.png`} alt="icon" style={{ verticalAlign: 'middle', height: '30px' }} />
                        </span>
                    </div>
                    <div className="report-item">
                        <span className="label">Wind & Humidity</span>
                        <span className="value">{wind.speed} m/s / {main.humidity}%</span>
                    </div>
                </div>

                <div className="report-summary">
                    <h4>Forecast Summary</h4>
                    <p>On {date}, expect {weatherMain.description} in {name} with temperatures around {Math.round(main.temp)}°C.</p>
                </div>
            </div>
        </div>
    );
};

export default FutureWeatherReport;
