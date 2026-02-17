import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import SearchBar from '../components/SearchBar/SearchBar';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import Forecast from '../components/Forecast/Forecast';
import History from '../components/History/History';
import WeatherReport from '../components/WeatherReport/WeatherReport';
import DateSelector from '../components/DateSelector/DateSelector';
import FutureWeatherReport from '../components/WeatherReport/FutureWeatherReport';
import PastWeatherReport from '../components/WeatherReport/PastWeatherReport';
import LiveWeatherWidget from '../components/LiveWeatherWidget/LiveWeatherWidget';
import Loader from '../components/Common/Loader';
import ErrorMessage from '../components/Common/ErrorMessage';
import { getWeatherData, getForecastData, getWeatherDataByCoords, getForecastDataByCoords, getFutureWeather, getHistoricalWeather } from '../services/weatherService';
import type { WeatherData, ForecastData } from '../types/weather';
import UserProfile from '../components/UserProfile/UserProfile';

const DashboardPage = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [history, setHistory] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('weatherHistory');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Local history parse error:', e);
            return [];
        }
    });

    // State to hold specific report data for past/future
    const [specialReportData, setSpecialReportData] = useState<WeatherData | null>(null);

    // Check for user context on mount
    useEffect(() => {
        const userCity = localStorage.getItem('userCity');
        if (userCity && !weather) {
            fetchWeather(userCity);
        } else {
            // Fallback to geo if no city provided
            handleGeoLocation();
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('weatherHistory', JSON.stringify(history));
    }, [history]);

    // Effect to fetch special data when date changes
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        if (selectedDate === today) {
            setSpecialReportData(null); // Clear special data, show normal current weather
            return;
        }

        if (!weather) return;

        const fetchSpecialData = async () => {
            setLoading(true);
            try {
                if (selectedDate > today) {
                    // Future
                    const data = await getFutureWeather(weather.name, selectedDate);
                    setSpecialReportData(data);
                } else {
                    // Past (Mock logic for now as API is paid)
                    const data = await getHistoricalWeather(weather.coord.lat, weather.coord.lon, new Date(selectedDate).getTime() / 1000);
                    setSpecialReportData(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSpecialData();
    }, [selectedDate, weather]);

    const fetchWeather = async (city: string) => {
        console.log(`Searching weather for: ${city}`);
        setLoading(true);
        setError(null);
        try {
            const weatherData = await getWeatherData(city);
            const forecastData = await getForecastData(city);

            setWeather(weatherData);
            setForecast(forecastData);
            // Reset date to today on new search
            setSelectedDate(new Date().toISOString().split('T')[0]);

            setHistory(prev => {
                const filtered = prev.filter(c => c.toLowerCase() !== city.toLowerCase());
                return [city, ...filtered].slice(0, 5);
            });
        } catch (err: any) {
            console.error('Fetch error:', err);
            setError(err.response?.data?.message || 'Failed to fetch weather data. Please check the city name.');
        } finally {
            setLoading(false);
        }
    };

    const handleGeoLocation = () => {
        if (!navigator.geolocation) {
            if (!weather) fetchWeather('London'); // Default fallback
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const weatherData = await getWeatherDataByCoords(latitude, longitude);
                    const forecastData = await getForecastDataByCoords(latitude, longitude);

                    setWeather(weatherData);
                    setForecast(forecastData);
                    setError(null);
                } catch (err: any) {
                    console.error('Geo fetch error:', err);
                    setError('Failed to fetch weather for your location.');
                    fetchWeather('London');
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                console.warn('Geolocation denied or failed:', err);
                fetchWeather('London');
            },
            { enableHighAccuracy: true }
        );
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('weatherHistory');
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <Layout>
            <LiveWeatherWidget />
            <UserProfile />
            <SearchBar onSearch={fetchWeather} onGeoLocation={handleGeoLocation} />

            <History
                searchedCities={history}
                onCityClick={fetchWeather}
                onClear={clearHistory}
            />

            {loading && <Loader />}

            {error && !loading && (
                <ErrorMessage
                    message={error}
                    onRetry={() => weather ? fetchWeather(weather.name) : handleGeoLocation()}
                />
            )}

            {!loading && !error && !weather && (
                <div style={{ textAlign: 'center', color: 'white', padding: '2rem', opacity: 0.7 }}>
                    <p>Please search for a city or allow location access.</p>
                </div>
            )}

            {weather && !loading && !error && (
                <>
                    <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />

                    {selectedDate === today && (
                        <>
                            <WeatherCard data={weather} />
                            <WeatherReport data={weather} />
                        </>
                    )}

                    {selectedDate > today && (
                        <FutureWeatherReport data={specialReportData} date={selectedDate} />
                    )}

                    {selectedDate < today && (
                        <PastWeatherReport data={specialReportData} date={selectedDate} />
                    )}
                </>
            )}

            {forecast && !loading && !error && (
                <Forecast data={forecast} />
            )}
        </Layout>
    );
};

export default DashboardPage;
