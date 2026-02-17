import axios from 'axios';
import type { WeatherData, ForecastData } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

if (!API_KEY) {
    console.warn('VITE_OPENWEATHER_API_KEY is missing! Please add it to your .env file.');
}

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherApi = axios.create({
    baseURL: BASE_URL,
    params: {
        appid: API_KEY,
        units: 'metric', // Using metric by default
    },
});

export const getWeatherData = async (city: string): Promise<WeatherData> => {
    const { data } = await weatherApi.get<WeatherData>('/weather', {
        params: { q: city },
    });
    return data;
};

export const getForecastData = async (city: string): Promise<ForecastData> => {
    const { data } = await weatherApi.get<ForecastData>('/forecast', {
        params: { q: city },
    });
    return data;
};

// Function to get weather by coordinates
export const getWeatherDataByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
    const { data } = await weatherApi.get<WeatherData>('/weather', {
        params: { lat, lon },
    });
    return data;
};

export const getForecastDataByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
    const { data } = await weatherApi.get<ForecastData>('/forecast', {
        params: { lat, lon },
    });
    return data;
};

// NOTE: The actual "History API" is a paid feature on OpenWeatherMap. 
// For this demo, we will simulate it or use the "One Call" API if available, 
// but sticking to standard free endpoints means true history is limited.
// We'll set up the structure using a mock approach for demonstration if the API fails.
export const getHistoricalWeather = async (_lat: number, _lon: number, _timestamp: number): Promise<WeatherData | null> => {
    try {
        // Try the timemachine endpoint (requires specific subscription)
        // const { data } = await weatherApi.get('/onecall/timemachine', {
        //     params: { lat, lon, dt: timestamp }
        // });
        // return data;

        // Fallback for demo: Return null or mock data
        console.warn("Historical API requires paid subscription. Returning null.");
        return null;
    } catch (e) {
        console.error("History fetch failed", e);
        return null;
    }
};

export const getFutureWeather = async (city: string, dateStr: string): Promise<WeatherData | null> => {
    const forecast = await getForecastData(city);
    // Find the item closest to noon on the selected date
    const targetItem = forecast.list.find(item => item.dt_txt.startsWith(dateStr) && item.dt_txt.includes("12:00:00"));

    if (!targetItem) return null;

    // Map ForecastItem to WeatherData structure for consistent display
    return {
        coord: forecast.city.coord,
        weather: targetItem.weather,
        base: "stations",
        main: targetItem.main,
        visibility: targetItem.visibility,
        wind: targetItem.wind,
        clouds: targetItem.clouds,
        dt: targetItem.dt,
        sys: {
            type: 1,
            id: 0,
            country: forecast.city.country,
            sunrise: forecast.city.sunrise,
            sunset: forecast.city.sunset
        },
        timezone: forecast.city.timezone,
        id: forecast.city.id,
        name: forecast.city.name,
        cod: 200
    };
};

export default weatherApi;
