import axios from 'axios';
    
const customAxios = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    timeout: 5000,
});

export default customAxios;
