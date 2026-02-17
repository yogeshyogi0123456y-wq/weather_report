import React from 'react';
import type { WeatherData } from '../../types/weather';
import '../WeatherReport/WeatherReport.css';

interface PastWeatherReportProps {
    data: WeatherData | null;
    date: string;
}

const PastWeatherReport: React.FC<PastWeatherReportProps> = ({ data, date }) => {
    // If no real data is available (common with free API tier), show a graceful message
    if (!data) return (
        <div className="weather-report-section">
            <div className="report-card past-theme">
                <div className="report-header">
                    <h3>📜 Historical Report</h3>
                    <span className="report-date">{date}</span>
                </div>
                <div className="report-summary" style={{ borderLeftColor: '#9b59b6' }}>
                    <h4>Data Unavailable</h4>
                    <p>
                        Historical weather data for <strong>{date}</strong> requires a paid subscription to the OpenWeatherMap "History API".
                        <br /><br />
                        On a production plan, this section would display the recorded temperature, precipitation, and wind conditions for this specific past date.
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="weather-report-section past-theme">
            {/* This block would render if we actually had data from a paid API */}
            <div className="report-card">
                <h3>Historical Weather: {date}</h3>
                {/* Render data fields similar to basic report */}
            </div>
        </div>
    );
};

export default PastWeatherReport;
