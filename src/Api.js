import axios from 'axios';
 
// axios instance with base url and timeout for server endpoint in env file
const customAxios = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    timeout: 5000,
});

// cities api for autocomplete input in event form 
export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
export const geoApiOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_GEO_API_KEY,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
};

// weather api for weather component located in event pages.
export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
export const WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export default customAxios;
