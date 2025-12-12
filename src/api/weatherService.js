import axios from "axios";
import { WEATHER_API_KEY } from "../config";

const BASE_URL = "https://api.weatherapi.com/v1";

export const searchCities = async (query) => {
    const url = `${BASE_URL}/search.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(
        query
    )}`;
    const response = await axios.get(url);
    return response.data;
};

export const getForecast = async (city, days = 3) => {
    const url = `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(
        city
    )}&days=${days}&aqi=no&alerts=no`;

    const response = await axios.get(url);
    return response.data;
};
