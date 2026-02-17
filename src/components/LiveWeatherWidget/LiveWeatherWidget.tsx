import React, { useState, useEffect } from 'react';
import { getWeatherDataByCoords } from '../../services/weatherService';
import type { WeatherData } from '../../types/weather';
import './LiveWeatherWidget.css';

const LiveWeatherWidget: React.FC = () => {
    const [liveData, setLiveData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLiveWeather = () => {
        if (!navigator.geolocation) {
            setError('Geo not supported');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const data = await getWeatherDataByCoords(latitude, longitude);
                    setLiveData(data);
                    setError(null);
                } catch (err) {
                    console.error("Live widget fetch error", err);
                    setError('Load failed');
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                console.warn("Live widget permission denied", err);
                setError('Loc denied');
                setLoading(false);
            },
            { enableHighAccuracy: true }
        );
    };

    useEffect(() => {
        // Initial fetch
        fetchLiveWeather();

        // Poll every 60 seconds
        const intervalId = setInterval(fetchLiveWeather, 60000);

        return () => clearInterval(intervalId);
    }, []);

    if (error) return null; // Don't show if failed or denied to keep UI clean
    if (loading) return <div className="live-widget loading">Loading...</div>;
    if (!liveData) return null;

    const { name, main, weather } = liveData;
    const temp = Math.round(main.temp);
    const iconCode = weather[0].icon;

    return (
        <div className="live-widget">
            <div className="live-icon">
                <img src={`https://openweathermap.org/img/wn/${iconCode}.png`} alt="current" />
            </div>
            <div className="live-info">
                <div className="live-temp">{temp}°C</div>
                <div className="live-loc">{name}</div>
            </div>
        </div>
    );
};

export default LiveWeatherWidget;
