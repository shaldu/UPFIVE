import { API_URL, JWT_SECRET } from '@env';
import axios from 'axios';

const API = axios.create({
    baseURL: API_URL,
});


API.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = `Bearer ${JWT_SECRET}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;